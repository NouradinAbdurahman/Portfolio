"use client"

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface TranslationResult {
  success: boolean
  translations?: Record<string, string>
  error?: string
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

export class ClientTranslationService {
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
export const clientTranslationService = new ClientTranslationService()
