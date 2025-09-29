import { serverTranslationService } from './server-translation-service'

// Server-side function to get all translations for a locale
export async function getServerTranslations(locale: string = 'en'): Promise<Record<string, string>> {
  try {
    return await serverTranslationService.getTranslationsForLocale(locale)
  } catch (error) {
    console.error('Error fetching server translations:', error)
    return {}
  }
}

// Server-side function to get a single translation
export async function getServerTranslation(key: string, locale: string = 'en'): Promise<string> {
  try {
    return await serverTranslationService.getTranslation(key, locale)
  } catch (error) {
    console.error('Error fetching server translation:', error)
    return key
  }
}