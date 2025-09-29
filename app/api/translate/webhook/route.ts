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
    const { key, text, sourceLanguage = 'en', context, timestamp } = body

    console.log('Translation webhook triggered:', { key, context, timestamp })

    if (!key || !text) {
      return NextResponse.json(
        { error: 'Missing required fields: key, text' },
        { status: 400 }
      )
    }

    // Check if text needs translation
    if (!needsTranslation(text)) {
      console.log(`Text for key ${key} does not require translation`)
      return NextResponse.json({
        success: true,
        message: 'Text does not require translation',
        key
      })
    }

    // Check if translation already exists and is complete
    const { data: existingTranslation } = await supabase
      .from('translations')
      .select('*')
      .eq('key', key)
      .single()

    if (existingTranslation) {
      const hasAllTranslations = SUPPORTED_LANGUAGES.every(lang => 
        existingTranslation[lang] && existingTranslation[lang].trim() !== ''
      )
      
      if (hasAllTranslations) {
        console.log(`Translation for key ${key} already exists and is complete`)
        return NextResponse.json({
          success: true,
          message: 'Translation already exists and is complete',
          key
        })
      }
    }

    // Create translation engine
    const translationEngine = createTranslationEngine()
    
    if (!translationEngine.isAvailable()) {
      console.error('No translation providers available')
      return NextResponse.json(
        { error: 'No translation providers available' },
        { status: 503 }
      )
    }

    // Determine target languages
    const targetLanguages = SUPPORTED_LANGUAGES.filter(lang => lang !== sourceLanguage)

    // Create translation request
    const translationRequest: TranslationRequest = {
      text,
      sourceLanguage,
      targetLanguages,
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

    console.log(`Successfully translated key ${key}`)

    return NextResponse.json({
      success: true,
      key,
      translations: result.processedTranslations,
      errors: result.errors,
      providers: translationEngine.getAvailableProviders()
    })

  } catch (error) {
    console.error('Translation webhook error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Handle GET requests for webhook verification
export async function GET() {
  return NextResponse.json({
    status: 'active',
    message: 'Translation webhook is running',
    supportedLanguages: SUPPORTED_LANGUAGES
  })
}
