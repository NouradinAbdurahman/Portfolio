import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {
  try {
    const { data, error } = await supabase.rpc('get_translation_status')

    if (error) {
      console.error('Error fetching translation status:', error)
      return NextResponse.json(
        { error: 'Failed to fetch translation status' },
        { status: 500 }
      )
    }

    return NextResponse.json(data[0] || {
      total_keys: 0,
      complete_translations: 0,
      incomplete_translations: 0,
      missing_arabic: 0,
      missing_turkish: 0,
      missing_italian: 0,
      missing_french: 0,
      missing_german: 0
    })
  } catch (error) {
    console.error('Translation status API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
