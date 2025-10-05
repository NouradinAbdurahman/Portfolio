import { getRequestConfig } from 'next-intl/server'
import { serverTranslationService } from '@/lib/server-translation-service'

const locales = ['en', 'ar', 'tr', 'it', 'fr', 'de']

export default getRequestConfig(async ({ locale }) => {
  // Always fallback to 'en' if locale is undefined, invalid, or missing
  const validLocale = (locale && locales.includes(locale)) ? locale : 'en'
  
  // Load English messages as fallback
  const fallbackMessages = (await import('./messages/en.json')).default
  
  try {
    // Try to load the requested locale messages
    const requestedMessages = (await import(`./messages/${validLocale}.json`)).default
    
    // Merge with English fallback to ensure all keys are present
    const mergedMessages: Record<string, unknown> = {
      ...fallbackMessages,
      ...requestedMessages
    }

    // Overlay latest Supabase translations (flat dot-path keys)
    try {
      const supabaseTranslations = await serverTranslationService.getTranslationsForLocale(validLocale)
      const setDeep = (obj: Record<string, unknown>, path: string, value: unknown) => {
        const parts = path.split('.')
        let curr: Record<string, unknown> = obj
        for (let i = 0; i < parts.length - 1; i++) {
          const p = parts[i]
          const nextVal = curr[p]
          if (typeof nextVal !== 'object' || nextVal === null) curr[p] = {}
          curr = curr[p] as Record<string, unknown>
        }
        curr[parts[parts.length - 1]] = value
      }
      Object.entries(supabaseTranslations).forEach(([key, val]) => setDeep(mergedMessages, key, val))
    } catch {}
    
    return {
      locale: validLocale,
      messages: mergedMessages
    }
  } catch {
    // If loading fails, use English as fallback
    console.warn(`Failed to load messages for locale ${validLocale}, falling back to English`)
    return {
      locale: 'en',
      messages: fallbackMessages
    }
  }
})
