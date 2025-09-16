import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseAdminKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)
const supabaseAdmin = createClient(supabaseUrl, supabaseAdminKey)

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('setting_key, setting_value')
      .order('setting_key')

    if (error) {
      console.error('Error fetching settings:', error)
      return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 })
    }

    // Convert array to object for easier use
    const settings: Record<string, any> = {}
    data?.forEach((item) => {
      settings[item.setting_key] = item.setting_value
    })

    return NextResponse.json({ settings })
  } catch (error) {
    console.error('Error in GET /api/settings:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { settings } = body

    if (!settings || typeof settings !== 'object') {
      return NextResponse.json({ error: 'Invalid settings data' }, { status: 400 })
    }

    console.log('Settings to update:', settings)

    // Use direct SQL query to update settings
    for (const [key, value] of Object.entries(settings)) {
      console.log(`Updating setting: ${key} = ${value}`)
      
      const { error } = await supabaseAdmin
        .rpc('update_site_setting', {
          p_setting_key: key,
          p_setting_value: value
        })

      if (error) {
        console.error(`Error updating setting ${key}:`, error)
        return NextResponse.json({ error: `Failed to update setting ${key}: ${error.message}` }, { status: 500 })
      } else {
        console.log(`Successfully updated ${key}`)
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in POST /api/settings:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
