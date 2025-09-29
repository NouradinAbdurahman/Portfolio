import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseAnonKey)

const SUPPORTED_LOCALES = ['en', 'ar', 'tr', 'it', 'fr', 'de']

class ServerTranslationService {
  async getTranslationsForLocale(locale: string = 'en'): Promise<Record<string, string>> {
    try {
      const { data, error } = await supabase
        .from('translations')
        .select('key, en, ar, tr, it, fr, de')

      if (error) {
        console.error('Error fetching translations:', error)
        return {}
      }

      const translations: Record<string, string> = {}
      data?.forEach(row => {
        const translation = row[locale as keyof typeof row] || row.en || ''
        if (translation) {
          translations[row.key] = translation
        }
      })

      return translations
    } catch (error) {
      console.error('Error fetching server translations:', error)
      return {}
    }
  }

  async getTranslation(key: string, locale: string = 'en'): Promise<string> {
    try {
      const { data, error } = await supabase
        .from('translations')
        .select('key, en, ar, tr, it, fr, de')
        .eq('key', key)
        .single()

      if (error) {
        console.error('Error fetching translation:', error)
        return key
      }

      const translation = data[locale as keyof typeof data] || data.en || key
      return translation
    } catch (error) {
      console.error('Error fetching server translation:', error)
      return key
    }
  }
}

export const serverTranslationService = new ServerTranslationService()
