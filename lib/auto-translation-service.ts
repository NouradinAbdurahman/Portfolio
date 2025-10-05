/**
 * Auto Translation Service
 * Handles automatic translation of content with RTL/LTR processing
 */

import { createTranslationEngine, TranslationRequest, TranslationResult } from './translation-engine'
import { processMixedContent } from './rtl-utils'
import { getSupabaseServerClient } from './supabaseServerClient'

export interface AutoTranslationOptions {
  forceRetranslate?: boolean
  skipExisting?: boolean
  targetLanguages?: string[]
}

export class AutoTranslationService {
  private translationEngine: any = null
  private supabase: any = null

  constructor() {
    try {
      this.translationEngine = createTranslationEngine()
      this.supabase = getSupabaseServerClient()
    } catch (error) {
      console.warn('Translation service initialization failed:', error)
    }
  }

  /**
   * Translate content and save to database
   */
  async translateAndSave(
    key: string,
    englishText: string,
    options: AutoTranslationOptions = {}
  ): Promise<TranslationResult> {
    if (!this.translationEngine || !this.supabase) {
      return {
        key,
        translations: { en: englishText },
        processedTranslations: { en: processMixedContent(englishText, false) },
        success: false,
        errors: ['Translation service not available']
      }
    }

    const {
      forceRetranslate = false,
      skipExisting = true,
      targetLanguages = ['ar', 'tr', 'it', 'fr', 'de']
    } = options

    // Check if translations already exist
    if (skipExisting && !forceRetranslate) {
      const existing = await this.getExistingTranslations(key)
      if (existing && this.hasAllTranslations(existing, targetLanguages)) {
        return {
          key,
          translations: existing,
          processedTranslations: this.processExistingTranslations(existing),
          success: true
        }
      }
    }

    // Translate content
    const result = await this.translationEngine.translateContent({
      text: englishText,
      sourceLanguage: 'en',
      targetLanguages,
      key
    })

    // Save to database (always include EN to avoid null constraint issues)
    if (result.success) {
      const payload = {
        en: englishText,
        ...result.processedTranslations,
      }
      await this.saveTranslations(key, payload)
    }

    return result
  }

  /**
   * Translate multiple content items in batch
   */
  async translateBatch(
    items: Array<{ key: string; text: string }>,
    options: AutoTranslationOptions = {}
  ): Promise<TranslationResult[]> {
    const results: TranslationResult[] = []

    for (const item of items) {
      try {
        const result = await this.translateAndSave(item.key, item.text, options)
        results.push(result)
      } catch (error) {
        console.error(`Failed to translate ${item.key}:`, error)
        results.push({
          key: item.key,
          translations: { en: item.text },
          processedTranslations: { en: processMixedContent(item.text, false) },
          success: false,
          errors: [error instanceof Error ? error.message : 'Unknown error']
        })
      }
    }

    return results
  }

  /**
   * Get existing translations from database
   */
  private async getExistingTranslations(key: string): Promise<Record<string, string> | null> {
    if (!this.supabase) return null
    
    try {
      const { data, error } = await this.supabase
        .from('translations')
        .select('*')
        .eq('key', key)
        .single()

      if (error || !data) return null

      return {
        en: data.en || '',
        ar: data.ar || '',
        tr: data.tr || '',
        it: data.it || '',
        fr: data.fr || '',
        de: data.de || ''
      }
    } catch (error) {
      console.error('Error fetching existing translations:', error)
      return null
    }
  }

  /**
   * Save translations to database
   */
  private async saveTranslations(key: string, translations: Record<string, string>): Promise<void> {
    if (!this.supabase) return
    
    try {
      const { error } = await this.supabase
        .from('translations')
        .upsert([
          {
            key,
            ...translations,
            updated_at: new Date().toISOString(),
          },
        ], { onConflict: 'key' })

      if (error) throw error
    } catch (error) {
      console.error('Error saving translations:', error)
      throw error
    }
  }

  /**
   * Check if all required translations exist
   */
  private hasAllTranslations(
    translations: Record<string, string>,
    targetLanguages: string[]
  ): boolean {
    return targetLanguages.every(lang => 
      translations[lang] && translations[lang].trim().length > 0
    )
  }

  /**
   * Process existing translations with RTL/LTR rules
   */
  private processExistingTranslations(translations: Record<string, string>): Record<string, string> {
    const processed: Record<string, string> = {}
    
    Object.entries(translations).forEach(([lang, text]) => {
      const isRTL = lang === 'ar'
      processed[lang] = processMixedContent(text, isRTL)
    })

    return processed
  }

  /**
   * Translate project content
   */
  async translateProject(project: any): Promise<void> {
    const translations = [
      { key: `projects.${project.slug}.title`, text: project.title },
      { key: `projects.${project.slug}.description`, text: project.description },
      { key: `projects.${project.slug}.problem`, text: project.problem || '' },
      { key: `projects.${project.slug}.solution`, text: project.solution || '' },
      { key: `projects.${project.slug}.outcome`, text: project.outcome || '' },
      { key: `projects.${project.slug}.architecture`, text: project.architecture || '' },
      { key: `projects.${project.slug}.impact`, text: project.impact || '' }
    ]

    // Translate features array
    if (project.features && Array.isArray(project.features)) {
      project.features.forEach((feature: string, index: number) => {
        translations.push({
          key: `projects.${project.slug}.features.${index}`,
          text: feature
        })
      })
    }

    // Translate challenges array
    if (project.challenges && Array.isArray(project.challenges)) {
      project.challenges.forEach((challenge: string, index: number) => {
        translations.push({
          key: `projects.${project.slug}.challenges.${index}`,
          text: challenge
        })
      })
    }

    // Translate learnings array
    if (project.learnings && Array.isArray(project.learnings)) {
      project.learnings.forEach((learning: string, index: number) => {
        translations.push({
          key: `projects.${project.slug}.learnings.${index}`,
          text: learning
        })
      })
    }

    await this.translateBatch(translations)
  }

  /**
   * Translate resume content
   */
  async translateResume(resumeData: any): Promise<void> {
    const translations = [
      { key: 'resume.title', text: resumeData.title },
      { key: 'resume.subtitle', text: resumeData.subtitle },
      { key: 'resume.downloadResume', text: 'Download Resume' }
    ]

    // Translate education
    if (resumeData.education) {
      resumeData.education.forEach((edu: any, index: number) => {
        translations.push(
          { key: `resume.educationDetails.${edu.id || index}.degree`, text: edu.degree },
          { key: `resume.educationDetails.${edu.id || index}.school`, text: edu.school },
          { key: `resume.educationDetails.${edu.id || index}.date`, text: edu.date },
          { key: `resume.educationDetails.${edu.id || index}.location`, text: edu.location || '' },
          { key: `resume.educationDetails.${edu.id || index}.description`, text: edu.description || '' }
        )
      })
    }

    // Translate experience
    if (resumeData.experience) {
      resumeData.experience.forEach((exp: any, index: number) => {
        translations.push(
          { key: `resume.experienceDetails.${exp.id || index}.role`, text: exp.role },
          { key: `resume.experienceDetails.${exp.id || index}.company`, text: exp.company },
          { key: `resume.experienceDetails.${exp.id || index}.employmentType`, text: exp.employmentType || '' },
          { key: `resume.experienceDetails.${exp.id || index}.date`, text: exp.date },
          { key: `resume.experienceDetails.${exp.id || index}.location`, text: exp.location || '' },
          { key: `resume.experienceDetails.${exp.id || index}.summary`, text: exp.summary || '' }
        )
      })
    }

    // Translate certifications
    if (resumeData.certifications) {
      resumeData.certifications.forEach((cert: any, index: number) => {
        translations.push(
          { key: `resume.certificationDetails.${cert.id || index}.title`, text: cert.title },
          { key: `resume.certificationDetails.${cert.id || index}.issuer`, text: cert.issuer },
          { key: `resume.certificationDetails.${cert.id || index}.date`, text: cert.date }
        )
      })
    }

    await this.translateBatch(translations)
  }

  /**
   * Translate contact content
   */
  async translateContact(contactData: any): Promise<void> {
    const translations = [
      { key: 'contact.title', text: contactData.title },
      { key: 'contact.subtitle', text: contactData.subtitle },
      { key: 'contact.letsConnect', text: contactData.letsConnect },
      { key: 'contact.introText', text: contactData.introText },
      { key: 'contact.email', text: 'Email' },
      { key: 'contact.phone', text: 'Phone' },
      { key: 'contact.location', text: 'Location' },
      { key: 'contact.firstName', text: 'First Name' },
      { key: 'contact.lastName', text: 'Last Name' },
      { key: 'contact.subject', text: 'Subject' },
      { key: 'contact.message', text: 'Message' },
      { key: 'contact.sendMessage', text: 'Send Message' },
      { key: 'contact.sending', text: 'Sending...' },
      { key: 'contact.placeholder.firstName', text: 'John' },
      { key: 'contact.placeholder.lastName', text: 'Doe' },
      { key: 'contact.placeholder.email', text: 'john.doe@example.com' },
      { key: 'contact.placeholder.subject', text: 'Project Discussion' },
      { key: 'contact.placeholder.message', text: 'Tell me about your project, timeline, and requirements...' }
    ]

    await this.translateBatch(translations)
  }
}

// Export singleton instance
export const autoTranslationService = new AutoTranslationService()
