/**
 * Process Translation Queue API
 * Handles automatic translation of content marked for translation
 */

import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabaseServerClient'
import { autoTranslationService } from '@/lib/auto-translation-service'

export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabaseServerClient()
    
    // Get translations that need processing
    const { data: pendingTranslations, error } = await supabase
      .from('translations')
      .select('*')
      .or('ar.eq.[TRANSLATE_NEEDED],tr.eq.[TRANSLATE_NEEDED],it.eq.[TRANSLATE_NEEDED],fr.eq.[TRANSLATE_NEEDED],de.eq.[TRANSLATE_NEEDED]')
      .limit(50)

    if (error) {
      console.error('Error fetching pending translations:', error)
      return NextResponse.json({ error: 'Failed to fetch pending translations' }, { status: 500 })
    }

    if (!pendingTranslations || pendingTranslations.length === 0) {
      return NextResponse.json({ 
        message: 'No translations pending',
        processed: 0 
      })
    }

    const results = []
    let processed = 0
    let errors = 0

    for (const translation of pendingTranslations) {
      try {
        // Skip if no English text
        if (!translation.en || translation.en.trim() === '') {
          continue
        }

        // Translate the content
        const result = await autoTranslationService.translateAndSave(
          translation.key,
          translation.en,
          { forceRetranslate: true }
        )

        if (result.success) {
          processed++
          results.push({
            key: translation.key,
            status: 'success',
            translations: Object.keys(result.translations)
          })
        } else {
          errors++
          results.push({
            key: translation.key,
            status: 'error',
            errors: result.errors
          })
        }
      } catch (error) {
        errors++
        console.error(`Error processing translation for key ${translation.key}:`, error)
        results.push({
          key: translation.key,
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error'
        })
      }
    }

    return NextResponse.json({
      message: `Processed ${processed} translations with ${errors} errors`,
      processed,
      errors,
      results
    })

  } catch (error) {
    console.error('Error processing translation queue:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabaseServerClient()
    
    // Get translation status
    const { data: status, error } = await supabase
      .rpc('get_translation_status')

    if (error) {
      console.error('Error fetching translation status:', error)
      return NextResponse.json({ error: 'Failed to fetch translation status' }, { status: 500 })
    }

    return NextResponse.json({
      status: status[0] || {
        total_keys: 0,
        translated_keys: 0,
        pending_translations: 0,
        completion_percentage: 0
      }
    })

  } catch (error) {
    console.error('Error fetching translation status:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
