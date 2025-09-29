import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST() {
  try {
    const { data, error } = await supabase.rpc('trigger_bulk_translation')

    if (error) {
      console.error('Error triggering bulk translation:', error)
      return NextResponse.json(
        { error: 'Failed to trigger bulk translation' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      triggered: data.length,
      message: `Triggered translation for ${data.length} keys`
    })
  } catch (error) {
    console.error('Bulk translation API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
