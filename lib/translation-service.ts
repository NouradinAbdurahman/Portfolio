import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

export interface TranslationResult {
  success: boolean
  translations?: Record<string, string>
  error?: string
}

export interface TranslationOptions {
  sourceLanguage?: string
  targetLanguages: string[]
  autoTranslate?: boolean
  needsReview?: boolean
}

const SUPPORTED_LANGUAGES = {
  en: 'English',
  ar: 'Arabic',
  tr: 'Turkish',
  it: 'Italian',
  fr: 'French',
  de: 'German'
} as const

type SupportedLanguage = keyof typeof SUPPORTED_LANGUAGES

export class TranslationService {
  private deeplApiKey: string | null = null

  constructor() {
    this.deeplApiKey = process.env.DEEPL_API_KEY || null
  }

  /**
   * Get translation for a specific key and locale
   */
  async getTranslation(key: string, locale: string = 'en'): Promise<string> {
    try {
      const { data, error } = await supabase
        .from('translations')
        .select('*')
        .eq('key', key)
        .single()

      if (error || !data) {
        console.warn(`Translation not found for key: ${key}`)
        return ''
      }

      // Return the translation for the requested locale, fallback to English
      const translation = data[locale as SupportedLanguage] || data.en || ''
      return translation
    } catch (error) {
      console.error('Error fetching translation:', error)
      return ''
    }
  }

  /**
   * Get all translations for a specific locale
   */
  async getTranslationsForLocale(locale: string = 'en'): Promise<Record<string, string>> {
    try {
      const { data, error } = await supabase
        .from('translations')
        .select('key, en, ar, tr, it, fr, de')

      if (error || !data) {
        console.error('Error fetching translations:', error)
        return {}
      }

      const translations: Record<string, string> = {}
      
      data.forEach(row => {
        const translation = row[locale as SupportedLanguage] || row.en || ''
        if (translation) {
          translations[row.key] = translation
        }
      })

      return translations
    } catch (error) {
      console.error('Error fetching translations for locale:', error)
      return {}
    }
  }

  /**
   * Translate text using DeepL API
   */
  private async translateWithDeepL(
    text: string, 
    sourceLang: string, 
    targetLang: string
  ): Promise<string> {
    if (!this.deeplApiKey) {
      throw new Error('DeepL API key not configured')
    }

    const response = await fetch('https://api-free.deepl.com/v2/translate', {
      method: 'POST',
      headers: {
        'Authorization': `DeepL-Auth-Key ${this.deeplApiKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        text,
        source_lang: sourceLang.toUpperCase(),
        target_lang: targetLang.toUpperCase(),
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`DeepL API error: ${error}`)
    }

    const data = await response.json()
    return data.translations[0]?.text || text
  }

  /**
   * Translate text using Google Translate API (fallback)
   */
  private async translateWithGoogle(
    text: string, 
    sourceLang: string, 
    targetLang: string
  ): Promise<string> {
    const googleApiKey = process.env.GOOGLE_TRANSLATE_API_KEY
    if (!googleApiKey) {
      throw new Error('Google Translate API key not configured')
    }

    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${googleApiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: text,
          source: sourceLang,
          target: targetLang,
        }),
      }
    )

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Google Translate API error: ${error}`)
    }

    const data = await response.json()
    return data.data.translations[0]?.translatedText || text
  }

  /**
   * Translate text using available translation services
   */
  private async translateText(
    text: string, 
    sourceLang: string, 
    targetLang: string
  ): Promise<string> {
    if (sourceLang === targetLang) {
      return text
    }

    try {
      // Try DeepL first
      if (this.deeplApiKey) {
        return await this.translateWithDeepL(text, sourceLang, targetLang)
      }
    } catch (error) {
      console.warn('DeepL translation failed, trying Google Translate:', error)
    }

    try {
      // Fallback to Google Translate
      return await this.translateWithGoogle(text, sourceLang, targetLang)
    } catch (error) {
      console.error('All translation services failed:', error)
      return text // Return original text if all services fail
    }
  }

  /**
   * Create or update a translation key with automatic translation
   */
  async upsertTranslation(
    key: string,
    englishText: string,
    options: TranslationOptions = {
      targetLanguages: ['ar', 'tr', 'it', 'fr', 'de'],
      autoTranslate: true,
      needsReview: true
    }
  ): Promise<TranslationResult> {
    try {
      // Start with English text
      const translations: Record<string, string> = {
        en: englishText
      }

      // Auto-translate to other languages if enabled
      if (options.autoTranslate && this.deeplApiKey) {
        for (const targetLang of options.targetLanguages) {
          if (targetLang !== 'en') {
            try {
              const translatedText = await this.translateText(
                englishText, 
                'en', 
                targetLang
              )
              translations[targetLang] = translatedText
            } catch (error) {
              console.warn(`Failed to translate to ${targetLang}:`, error)
              // Keep the field empty if translation fails
            }
          }
        }
      }

      // Upsert the translation
      const { error } = await supabase
        .from('translations')
        .upsert({
          key,
          en: translations.en,
          ar: translations.ar || null,
          tr: translations.tr || null,
          it: translations.it || null,
          fr: translations.fr || null,
          de: translations.de || null,
          auto_translated: options.autoTranslate || false,
          needs_review: options.needsReview || false
        })

      if (error) {
        throw new Error(`Database error: ${error.message}`)
      }

      return {
        success: true,
        translations
      }
    } catch (error) {
      console.error('Error upserting translation:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }

  /**
   * Update translations for a specific key
   */
  async updateTranslation(
    key: string,
    translations: Partial<Record<SupportedLanguage, string>>,
    options: { needsReview?: boolean } = {}
  ): Promise<TranslationResult> {
    try {
      const updateData: any = {
        ...translations,
        updated_at: new Date().toISOString()
      }

      if (options.needsReview !== undefined) {
        updateData.needs_review = options.needsReview
      }

      const { error } = await supabase
        .from('translations')
        .update(updateData)
        .eq('key', key)

      if (error) {
        throw new Error(`Database error: ${error.message}`)
      }

      return { success: true }
    } catch (error) {
      console.error('Error updating translation:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }
      }
  }

  /**
   * Get translations that need review
   */
  async getTranslationsNeedingReview(): Promise<Array<{
    key: string
    en: string
    [key: string]: any
  }>> {
    try {
      const { data, error } = await supabase
        .from('translations')
        .select('*')
        .eq('needs_review', true)
        .order('updated_at', { ascending: false })

      if (error) {
        throw new Error(`Database error: ${error.message}`)
      }

      return data || []
    } catch (error) {
      console.error('Error fetching translations needing review:', error)
      return []
    }
  }

  /**
   * Mark translation as reviewed
   */
  async markAsReviewed(key: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('translations')
        .update({ needs_review: false })
        .eq('key', key)

      if (error) {
        throw new Error(`Database error: ${error.message}`)
      }

      return true
    } catch (error) {
      console.error('Error marking translation as reviewed:', error)
      return false
    }
  }

  /**
   * Batch translate multiple keys
   */
  async batchTranslate(
    translations: Array<{ key: string; englishText: string }>,
    options: TranslationOptions = {
      targetLanguages: ['ar', 'tr', 'it', 'fr', 'de'],
      autoTranslate: true,
      needsReview: true
    }
  ): Promise<TranslationResult> {
    try {
      const results = await Promise.allSettled(
        translations.map(({ key, englishText }) =>
          this.upsertTranslation(key, englishText, options)
        )
      )

      const successful = results.filter(r => r.status === 'fulfilled').length
      const failed = results.filter(r => r.status === 'rejected').length

      return {
        success: failed === 0,
        error: failed > 0 ? `${failed} translations failed` : undefined
      }
    } catch (error) {
      console.error('Error in batch translation:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }

  /**
   * Get supported languages
   */
  getSupportedLanguages(): typeof SUPPORTED_LANGUAGES {
    return SUPPORTED_LANGUAGES
  }

  /**
   * Check if a language is supported
   */
  isLanguageSupported(lang: string): lang is SupportedLanguage {
    return lang in SUPPORTED_LANGUAGES
  }
}

// Export singleton instance
export const translationService = new TranslationService()
