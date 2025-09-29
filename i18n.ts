import { getRequestConfig } from 'next-intl/server'

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
    const mergedMessages = {
      ...fallbackMessages,
      ...requestedMessages
    }
    
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
