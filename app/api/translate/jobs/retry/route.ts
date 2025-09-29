import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST() {
  try {
    const { data, error } = await supabase.rpc('retry_failed_translation_jobs')

    if (error) {
      console.error('Error retrying failed jobs:', error)
      return NextResponse.json(
        { error: 'Failed to retry failed jobs' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      retried: data,
      message: `Retried ${data} failed jobs`
    })
  } catch (error) {
    console.error('Retry jobs API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
