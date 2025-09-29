import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
const service = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(url, service)

const SUPPORTED_LOCALES = ['en', 'ar', 'tr', 'it', 'fr', 'de']

// Helper function to get translation key for a field
function getTranslationKey(section: string, field: string): string {
  return `${section}.${field}`
}

// Helper function to extract field name from translation key
function getFieldFromKey(key: string): string {
  const parts = key.split('.')
  return parts.slice(1).join('.')
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const section = searchParams.get('section')
    
    if (!section) {
      return NextResponse.json({ error: 'Section parameter is required' }, { status: 400 })
    }

    // Fetch all translations for the section
    const { data: translations, error: translationError } = await supabase
      .from('translations')
      .select('key, en, ar, tr, it, fr, de')
      .like('key', `${section}.%`)

    if (translationError) {
      return NextResponse.json({ error: translationError.message }, { status: 500 })
    }

    // Fetch legacy content from site_content table
    const { data: legacyContent, error: legacyError } = await supabase
      .from('site_content')
      .select('tag, value')
      .eq('section', section)

    if (legacyError) {
      return NextResponse.json({ error: legacyError.message }, { status: 500 })
    }

    // Build the multi-language content structure
    const multilangContent: Record<string, Record<string, string>> = {}
    
    // Process translations
    translations?.forEach(row => {
      const field = getFieldFromKey(row.key)
      if (!multilangContent[field]) {
        multilangContent[field] = {}
      }
      
      SUPPORTED_LOCALES.forEach(locale => {
        const value = row[locale as keyof typeof row] as string
        if (value && value.trim()) {
          multilangContent[field][locale] = value
        }
      })
    })

    // Process legacy content (fallback to English)
    legacyContent?.forEach(row => {
      if (!multilangContent[row.tag]) {
        multilangContent[row.tag] = {}
      }
      
      // Parse legacy value
      let parsedValue = row.value
      if (typeof row.value === 'string') {
        try {
          parsedValue = JSON.parse(row.value)
        } catch {
          parsedValue = row.value
        }
      }
      
      // Set as English default if no translation exists
      if (!multilangContent[row.tag].en && parsedValue) {
        multilangContent[row.tag].en = String(parsedValue)
      }
    })

    return NextResponse.json({ 
      content: multilangContent,
      section,
      locales: SUPPORTED_LOCALES
    })
  } catch (e: any) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { section, content } = body
    
    if (!section || !content || typeof content !== 'object') {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
    }

    // Prepare translations to upsert
    const translationsToUpsert: any[] = []
    
    Object.entries(content).forEach(([field, translations]) => {
      if (typeof translations === 'object' && translations !== null) {
        const translationKey = getTranslationKey(section, field)
        
        // Create translation row
        const translationRow: any = {
          key: translationKey,
          auto_translated: false,
          needs_review: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
        
        // Add translations for each locale
        SUPPORTED_LOCALES.forEach(locale => {
          const value = (translations as any)[locale]
          if (value && value.trim()) {
            translationRow[locale] = value
          }
        })
        
        // Ensure at least English is present
        if (!translationRow.en && (translations as any).en) {
          translationRow.en = (translations as any).en
        }
        
        translationsToUpsert.push(translationRow)
      }
    })

    // Upsert translations using the upsert_translation function
    for (const translation of translationsToUpsert) {
      const { error } = await supabase.rpc('upsert_translation', {
        p_key: translation.key,
        p_en: translation.en || '',
        p_ar: translation.ar || '',
        p_tr: translation.tr || '',
        p_it: translation.it || '',
        p_fr: translation.fr || '',
        p_de: translation.de || '',
        p_auto_translated: translation.auto_translated || false,
        p_needs_review: translation.needs_review || false
      })
      
      if (error) {
        console.error('Error upserting translation:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
      }
    }

    // Also update legacy site_content table for backward compatibility
    const legacyRows = Object.entries(content).map(([field, translations]) => ({
      section,
      tag: field,
      value: JSON.stringify(translations),
      updated_at: new Date().toISOString()
    }))

    const { error: legacyError } = await supabase
      .from('site_content')
      .upsert(legacyRows as any, { onConflict: 'section,tag' })

    if (legacyError) {
      console.error('Error updating legacy content:', legacyError)
      // Don't fail the request, just log the error
    }

    return NextResponse.json({ 
      success: true, 
      message: `${section} content saved successfully`,
      translationsUpdated: translationsToUpsert.length
    })
  } catch (e: any) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
