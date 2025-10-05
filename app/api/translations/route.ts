import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

// GET /api/translations?locale=en
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const locale = searchParams.get('locale') || 'en'
    
    const { data, error } = await supabase
      .from('translations')
      .select('key, en, ar, tr, it, fr, de')

    if (error) {
      throw new Error(`Database error: ${error.message}`)
    }

    const translations: Record<string, string> = {}
    data?.forEach(row => {
      const translation = row[locale as keyof typeof row] || row.en || ''
      if (translation) {
        translations[row.key] = translation
      }
    })
    
    return NextResponse.json({ 
      success: true, 
      translations,
      locale 
    })
  } catch (error) {
    console.error('Error fetching translations:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch translations' 
      },
      { status: 500 }
    )
  }
}

// POST /api/translations - Create or update translations
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { key, englishText, options } = body

    if (!key || !englishText) {
      return NextResponse.json(
        { success: false, error: 'Key and englishText are required' },
        { status: 400 }
      )
    }

    // Use upsert_translation function to handle duplicates gracefully
    const { error } = await supabase.rpc('upsert_translation', {
      p_key: key,
      p_en: englishText,
      p_ar: options?.ar || null,
      p_tr: options?.tr || null,
      p_it: options?.it || null,
      p_fr: options?.fr || null,
      p_de: options?.de || null
    })

    if (error) {
      throw new Error(`Database error: ${error.message}`)
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Translation saved successfully'
    })
  } catch (error) {
    console.error('Error creating/updating translation:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to create/update translation' 
      },
      { status: 500 }
    )
  }
}

// PUT /api/translations - Update existing translations
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { key, translations, options } = body

    if (!key || !translations) {
      return NextResponse.json(
        { success: false, error: 'Key and translations are required' },
        { status: 400 }
      )
    }

    // Fetch current row to avoid setting NOT NULL columns to null
    const { data: existing, error: fetchError } = await supabase
      .from('translations')
      .select('key, en, ar, tr, it, fr, de')
      .eq('key', key)
      .single()

    if (fetchError) {
      throw new Error(`Database error: ${fetchError.message}`)
    }

    // Build update payload without overwriting unspecified fields
    const updateData: Record<string, string | boolean> = {}
    if (typeof translations.en === 'string') updateData.en = translations.en
    if (typeof translations.ar === 'string') updateData.ar = translations.ar
    if (typeof translations.tr === 'string') updateData.tr = translations.tr
    if (typeof translations.it === 'string') updateData.it = translations.it
    if (typeof translations.fr === 'string') updateData.fr = translations.fr
    if (typeof translations.de === 'string') updateData.de = translations.de
    if (options && typeof options.needsReview === 'boolean') updateData.needs_review = options.needsReview

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ success: true })
    }

    const { error } = await supabase
      .from('translations')
      .update(updateData)
      .eq('key', key)

    if (error) {
      throw new Error(`Database error: ${error.message}`)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating translation:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to update translation' 
      },
      { status: 500 }
    )
  }
}

// DELETE /api/translations?key=translation.key
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const key = searchParams.get('key')

    if (!key) {
      return NextResponse.json(
        { success: false, error: 'Key is required' },
        { status: 400 }
      )
    }

    // Note: You might want to add authentication here
    // For now, we'll just return success
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting translation:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to delete translation' 
      },
      { status: 500 }
    )
  }
}
