import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { createTranslationEngine, TranslationRequest, needsTranslation } from '@/lib/translation-engine'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const SUPPORTED_LANGUAGES = ['en', 'ar', 'tr', 'it', 'fr', 'de']

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { key, text, sourceLanguage = 'en', targetLanguages, context } = body

    if (!key || !text) {
      return NextResponse.json(
        { error: 'Missing required fields: key, text' },
        { status: 400 }
      )
    }

    // Check if text needs translation
    if (!needsTranslation(text)) {
      return NextResponse.json({
        success: true,
        message: 'Text does not require translation',
        key,
        translations: { [sourceLanguage]: text }
      })
    }

    // Create translation engine
    const translationEngine = createTranslationEngine()
    
    if (!translationEngine.isAvailable()) {
      return NextResponse.json(
        { error: 'No translation providers available. Please configure API keys.' },
        { status: 503 }
      )
    }

    // Determine target languages
    const languagesToTranslate = targetLanguages || SUPPORTED_LANGUAGES.filter(lang => lang !== sourceLanguage)

    // Create translation request
    const translationRequest: TranslationRequest = {
      text,
      sourceLanguage,
      targetLanguages: languagesToTranslate,
      key,
      context
    }

    // Perform translation
    const result = await translationEngine.translateContent(translationRequest)

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
      console.error('Error saving translations:', upsertError)
      return NextResponse.json(
        { error: 'Failed to save translations to database' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      key,
      translations: result.processedTranslations,
      errors: result.errors,
      providers: translationEngine.getAvailableProviders()
    })

  } catch (error) {
    console.error('Translation API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const translationEngine = createTranslationEngine()
    
    return NextResponse.json({
      available: translationEngine.isAvailable(),
      providers: translationEngine.getAvailableProviders(),
      supportedLanguages: SUPPORTED_LANGUAGES
    })
  } catch (error) {
    console.error('Translation status error:', error)
    return NextResponse.json(
      { error: 'Failed to get translation status' },
      { status: 500 }
    )
  }
}
