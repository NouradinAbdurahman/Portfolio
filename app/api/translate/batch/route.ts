import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { createTranslationEngine, TranslationRequest, needsTranslation } from '@/lib/translation-engine'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const SUPPORTED_LANGUAGES = ['en', 'ar', 'tr', 'it', 'fr', 'de']

interface BatchTranslationRequest {
  key: string
  text: string
  sourceLanguage?: string
  context?: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { translations, sourceLanguage = 'en', targetLanguages } = body

    if (!Array.isArray(translations) || translations.length === 0) {
      return NextResponse.json(
        { error: 'Missing or invalid translations array' },
        { status: 400 }
      )
    }

    // Create translation engine
    const translationEngine = createTranslationEngine()
    
    if (!translationEngine.isAvailable()) {
      return NextResponse.json(
        { error: 'No translation providers available. Please configure API keys.' },
        { status: 503 }
      )
    }

    const results = []
    const errors = []

    // Process each translation request
    for (const translationRequest of translations as BatchTranslationRequest[]) {
      try {
        const { key, text, context } = translationRequest

        if (!key || !text) {
          errors.push(`Invalid request: missing key or text for ${key}`)
          continue
        }

        // Check if text needs translation
        if (!needsTranslation(text)) {
          results.push({
            key,
            success: true,
            message: 'Text does not require translation',
            translations: { [sourceLanguage]: text }
          })
          continue
        }

        // Determine target languages
        const languagesToTranslate = targetLanguages || SUPPORTED_LANGUAGES.filter(lang => lang !== sourceLanguage)

        // Create translation request
        const request: TranslationRequest = {
          text,
          sourceLanguage,
          targetLanguages: languagesToTranslate,
          key,
          context
        }

        // Perform translation
        const result = await translationEngine.translateContent(request)

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
          console.error(`Error saving translation for key ${key}:`, upsertError)
          errors.push(`Failed to save translation for key ${key}`)
          continue
        }

        results.push({
          key,
          success: true,
          translations: result.processedTranslations,
          errors: result.errors
        })

      } catch (error) {
        const errorMessage = `Failed to translate key ${translationRequest.key}: ${error instanceof Error ? error.message : 'Unknown error'}`
        errors.push(errorMessage)
        console.error(errorMessage)
      }
    }

    return NextResponse.json({
      success: errors.length === 0,
      results,
      errors: errors.length > 0 ? errors : undefined,
      providers: translationEngine.getAvailableProviders()
    })

  } catch (error) {
    console.error('Batch translation API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
