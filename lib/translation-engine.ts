/**
 * Automated Translation Engine
 * Handles automatic translation of content with RTL/LTR processing
 */

import { processMixedContent } from './rtl-utils'

export interface TranslationRequest {
  text: string
  sourceLanguage: string
  targetLanguages: string[]
  key: string
  context?: string
}

export interface TranslationResult {
  key: string
  translations: Record<string, string>
  processedTranslations: Record<string, string>
  success: boolean
  errors?: string[]
}

export interface TranslationProvider {
  name: string
  translate(text: string, from: string, to: string): Promise<string>
  isAvailable(): boolean
}

// DeepL Translation Provider
export class DeepLProvider implements TranslationProvider {
  name = 'DeepL'
  private apiKey: string
  private baseUrl: string

  constructor(apiKey: string, isPro: boolean = false) {
    this.apiKey = apiKey
    this.baseUrl = isPro ? 'https://api.deepl.com/v2' : 'https://api-free.deepl.com/v2'
  }

  async translate(text: string, from: string, to: string): Promise<string> {
    if (!this.isAvailable()) {
      throw new Error('DeepL API key not configured')
    }

    const response = await fetch(`${this.baseUrl}/translate`, {
      method: 'POST',
      headers: {
        'Authorization': `DeepL-Auth-Key ${this.apiKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        text,
        source_lang: from.toUpperCase(),
        target_lang: to.toUpperCase(),
        preserve_formatting: '1',
        tag_handling: 'html'
      })
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`DeepL API error: ${response.status} - ${error}`)
    }

    const data = await response.json()
    return data.translations[0]?.text || text
  }

  isAvailable(): boolean {
    return !!this.apiKey
  }
}

// Google Translate Provider
export class GoogleTranslateProvider implements TranslationProvider {
  name = 'Google Translate'
  private apiKey: string
  private baseUrl: string = 'https://translation.googleapis.com/language/translate/v2'

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  async translate(text: string, from: string, to: string): Promise<string> {
    if (!this.isAvailable()) {
      throw new Error('Google Translate API key not configured')
    }

    const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: text,
        source: from,
        target: to,
        format: 'html'
      })
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Google Translate API error: ${response.status} - ${error}`)
    }

    const data = await response.json()
    return data.data.translations[0]?.translatedText || text
  }

  isAvailable(): boolean {
    return !!this.apiKey
  }
}

// Language mapping for different providers
export const LANGUAGE_MAPPING = {
  'en': 'en',
  'ar': 'ar',
  'tr': 'tr',
  'it': 'it',
  'fr': 'fr',
  'de': 'de'
} as const

export type SupportedLanguage = keyof typeof LANGUAGE_MAPPING

export class TranslationEngine {
  private providers: TranslationProvider[]
  private fallbackProvider: TranslationProvider | null = null

  constructor(providers: TranslationProvider[]) {
    this.providers = providers.filter(p => p.isAvailable())
    this.fallbackProvider = this.providers[0] || null
  }

  /**
   * Translate text to multiple languages with RTL/LTR processing
   */
  async translateContent(request: TranslationRequest): Promise<TranslationResult> {
    const { text, sourceLanguage, targetLanguages, key, context } = request
    const translations: Record<string, string> = {}
    const processedTranslations: Record<string, string> = {}
    const errors: string[] = []

    // If source language is already in target languages, use original text
    if (targetLanguages.includes(sourceLanguage)) {
      translations[sourceLanguage] = text
      processedTranslations[sourceLanguage] = this.processTranslation(text, sourceLanguage)
    }

    // Translate to each target language
    for (const targetLang of targetLanguages) {
      if (targetLang === sourceLanguage) continue

      try {
        const translatedText = await this.translateText(text, sourceLanguage, targetLang)
        translations[targetLang] = translatedText
        processedTranslations[targetLang] = this.processTranslation(translatedText, targetLang)
      } catch (error) {
        const errorMessage = `Failed to translate to ${targetLang}: ${error instanceof Error ? error.message : 'Unknown error'}`
        errors.push(errorMessage)
        console.error(errorMessage)
        
        // Fallback to original text with proper processing
        translations[targetLang] = text
        processedTranslations[targetLang] = this.processTranslation(text, targetLang)
      }
    }

    return {
      key,
      translations,
      processedTranslations,
      success: errors.length === 0,
      errors: errors.length > 0 ? errors : undefined
    }
  }

  /**
   * Translate text using available providers
   */
  private async translateText(text: string, from: string, to: string): Promise<string> {
    if (!text || text.trim().length === 0) {
      return text
    }

    // Try each provider in order
    for (const provider of this.providers) {
      try {
        return await provider.translate(text, from, to)
      } catch (error) {
        console.warn(`Provider ${provider.name} failed:`, error)
        continue
      }
    }

    // If all providers fail, use fallback
    if (this.fallbackProvider) {
      try {
        return await this.fallbackProvider.translate(text, from, to)
      } catch (error) {
        console.error('All translation providers failed:', error)
        throw new Error(`Translation failed for ${from} -> ${to}`)
      }
    }

    throw new Error('No translation providers available')
  }

  /**
   * Process translation with RTL/LTR rules
   */
  private processTranslation(text: string, language: string): string {
    const isRTL = language === 'ar'
    return processMixedContent(text, isRTL)
  }

  /**
   * Get available providers
   */
  getAvailableProviders(): string[] {
    return this.providers.map(p => p.name)
  }

  /**
   * Check if any providers are available
   */
  isAvailable(): boolean {
    return this.providers.length > 0
  }
}

// Factory function to create translation engine
export function createTranslationEngine(): TranslationEngine {
  const providers: TranslationProvider[] = []

  // Add DeepL provider if API key is available
  const deeplApiKey = process.env.DEEPL_API_KEY
  if (deeplApiKey) {
    const isPro = process.env.DEEPL_PRO === 'true'
    providers.push(new DeepLProvider(deeplApiKey, isPro))
  }

  // Add Google Translate provider if API key is available
  const googleApiKey = process.env.GOOGLE_TRANSLATE_API_KEY
  if (googleApiKey) {
    providers.push(new GoogleTranslateProvider(googleApiKey))
  }

  return new TranslationEngine(providers)
}

// Utility function to detect if text needs translation
export function needsTranslation(text: string): boolean {
  if (!text || text.trim().length === 0) return false
  
  // Check if text is already processed (contains HTML tags)
  if (text.includes('<span dir=') || text.includes('<bdi>')) return false
  
  // Check if text contains meaningful content (not just technical terms)
  const hasMeaningfulContent = /[a-zA-Z]{3,}/.test(text.trim())
  if (!hasMeaningfulContent) return false
  
  // Always translate if it contains translatable terms or meaningful content
  return true
}

// Utility function to extract translatable content from HTML
export function extractTranslatableContent(html: string): string {
  // Remove HTML tags but preserve content
  return html.replace(/<[^>]*>/g, '').trim()
}

// Utility function to restore HTML structure after translation
export function restoreHtmlStructure(originalHtml: string, translatedText: string): string {
  // Simple implementation - in production, you might want more sophisticated HTML parsing
  return translatedText
}
