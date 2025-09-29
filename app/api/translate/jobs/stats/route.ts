import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {
  try {
    const { data, error } = await supabase.rpc('get_translation_job_stats')

    if (error) {
      console.error('Error fetching job stats:', error)
      return NextResponse.json(
        { error: 'Failed to fetch job statistics' },
        { status: 500 }
      )
    }

    return NextResponse.json(data[0] || {
      total_jobs: 0,
      pending_jobs: 0,
      processing_jobs: 0,
      completed_jobs: 0,
      failed_jobs: 0,
      avg_processing_time: null
    })
  } catch (error) {
    console.error('Job stats API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
