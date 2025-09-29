/**
 * Background Translation Processor
 * Handles queued translation jobs and ensures consistency
 */

import { createClient } from '@supabase/supabase-js'
import { createTranslationEngine, TranslationRequest, needsTranslation } from './translation-engine'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const SUPPORTED_LANGUAGES = ['en', 'ar', 'tr', 'it', 'fr', 'de']

export interface TranslationJob {
  id: string
  key: string
  text: string
  sourceLanguage: string
  context?: string
  priority: number
  attempts: number
  maxAttempts: number
  createdAt: Date
  updatedAt: Date
  status: 'pending' | 'processing' | 'completed' | 'failed'
  error?: string
}

export class TranslationProcessor {
  private isProcessing = false
  private processingInterval: NodeJS.Timeout | null = null
  private translationEngine = createTranslationEngine()

  constructor() {
    if (!this.translationEngine.isAvailable()) {
      console.warn('Translation engine not available - processor will not start')
    }
  }

  /**
   * Start the background processor
   */
  start(intervalMs: number = 30000) {
    if (this.isProcessing) {
      console.log('Translation processor is already running')
      return
    }

    if (!this.translationEngine.isAvailable()) {
      console.error('Cannot start translation processor - no providers available')
      return
    }

    this.isProcessing = true
    console.log('Starting translation processor...')

    this.processingInterval = setInterval(async () => {
      await this.processNextJob()
    }, intervalMs)
  }

  /**
   * Stop the background processor
   */
  stop() {
    if (this.processingInterval) {
      clearInterval(this.processingInterval)
      this.processingInterval = null
    }
    this.isProcessing = false
    console.log('Translation processor stopped')
  }

  /**
   * Add a translation job to the queue
   */
  async addJob(job: Omit<TranslationJob, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'attempts'>): Promise<string> {
    const { data, error } = await supabase
      .from('translation_jobs')
      .insert({
        key: job.key,
        text: job.text,
        source_language: job.sourceLanguage,
        context: job.context,
        priority: job.priority,
        max_attempts: job.maxAttempts,
        status: 'pending',
        attempts: 0
      })
      .select('id')
      .single()

    if (error) {
      console.error('Error adding translation job:', error)
      throw new Error(`Failed to add translation job: ${error.message}`)
    }

    console.log(`Added translation job for key: ${job.key}`)
    return data.id
  }

  /**
   * Process the next job in the queue
   */
  private async processNextJob() {
    try {
      // Get the next pending job
      const { data: job, error } = await supabase
        .from('translation_jobs')
        .select('*')
        .eq('status', 'pending')
        .lt('attempts', supabase.raw('max_attempts'))
        .order('priority', { ascending: false })
        .order('created_at', { ascending: true })
        .limit(1)
        .single()

      if (error || !job) {
        // No jobs to process
        return
      }

      console.log(`Processing translation job: ${job.id} for key: ${job.key}`)

      // Mark job as processing
      await supabase
        .from('translation_jobs')
        .update({ 
          status: 'processing',
          updated_at: new Date().toISOString()
        })
        .eq('id', job.id)

      // Process the translation
      await this.processJob(job)

    } catch (error) {
      console.error('Error processing translation job:', error)
    }
  }

  /**
   * Process a single translation job
   */
  private async processJob(job: any) {
    try {
      const { key, text, source_language, context } = job

      // Check if text needs translation
      if (!needsTranslation(text)) {
        await this.markJobCompleted(job.id, 'Text does not require translation')
        return
      }

      // Check if translation already exists and is complete
      const { data: existingTranslation } = await supabase
        .from('translations')
        .select('*')
        .eq('key', key)
        .single()

      if (existingTranslation) {
        const hasAllTranslations = SUPPORTED_LANGUAGES.every(lang => 
          existingTranslation[lang] && existingTranslation[lang].trim() !== ''
        )
        
        if (hasAllTranslations) {
          await this.markJobCompleted(job.id, 'Translation already exists and is complete')
          return
        }
      }

      // Create translation request
      const translationRequest: TranslationRequest = {
        text,
        sourceLanguage: source_language,
        targetLanguages: SUPPORTED_LANGUAGES.filter(lang => lang !== source_language),
        key,
        context
      }

      // Perform translation
      const result = await this.translationEngine.translateContent(translationRequest)

      // Save translations to Supabase
      const { error: upsertError } = await supabase.rpc('upsert_translation', {
        p_key: key,
        p_en: result.processedTranslations.en || text,
        p_ar: result.processedTranslations.ar || text,
        p_tr: result.processedTranslations.tr || text,
        p_it: result.processedTranslations.it || text,
        p_fr: result.processedTranslations.fr || text,
        p_de: result.processedTranslations.de || text
      })

      if (upsertError) {
        throw new Error(`Failed to save translations: ${upsertError.message}`)
      }

      await this.markJobCompleted(job.id, 'Translation completed successfully', result.errors)

    } catch (error) {
      console.error(`Error processing job ${job.id}:`, error)
      await this.markJobFailed(job.id, error instanceof Error ? error.message : 'Unknown error')
    }
  }

  /**
   * Mark a job as completed
   */
  private async markJobCompleted(jobId: string, message: string, errors?: string[]) {
    await supabase
      .from('translation_jobs')
      .update({
        status: 'completed',
        updated_at: new Date().toISOString(),
        error: errors ? errors.join('; ') : null
      })
      .eq('id', jobId)

    console.log(`Job ${jobId} completed: ${message}`)
  }

  /**
   * Mark a job as failed
   */
  private async markJobFailed(jobId: string, errorMessage: string) {
    await supabase
      .from('translation_jobs')
      .update({
        status: 'failed',
        attempts: supabase.raw('attempts + 1'),
        updated_at: new Date().toISOString(),
        error: errorMessage
      })
      .eq('id', jobId)

    console.log(`Job ${jobId} failed: ${errorMessage}`)
  }

  /**
   * Get processor status
   */
  getStatus() {
    return {
      isProcessing: this.isProcessing,
      isAvailable: this.translationEngine.isAvailable(),
      providers: this.translationEngine.getAvailableProviders()
    }
  }

  /**
   * Get job statistics
   */
  async getJobStats() {
    const { data: stats, error } = await supabase
      .from('translation_jobs')
      .select('status')
      .then(result => {
        if (result.error) throw result.error
        
        const stats = result.data.reduce((acc, job) => {
          acc[job.status] = (acc[job.status] || 0) + 1
          return acc
        }, {} as Record<string, number>)

        return { data: stats, error: null }
      })

    if (error) {
      throw new Error(`Failed to get job stats: ${error.message}`)
    }

    return stats
  }
}

// Create singleton instance
export const translationProcessor = new TranslationProcessor()

// Auto-start processor if environment allows
if (process.env.NODE_ENV === 'production' && process.env.AUTO_START_TRANSLATION_PROCESSOR === 'true') {
  translationProcessor.start()
}
