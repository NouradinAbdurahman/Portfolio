import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const service = process.env.SUPABASE_SERVICE_ROLE_KEY || anon

const supabase = createClient(url, anon)
const admin = createClient(url, service)

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('site_content')
      .select('section, tag, value')
      .order('section')

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    const content: Record<string, Record<string, any>> = {}
    for (const row of data || []) {
      if (!content[row.section]) content[row.section] = {}
      const v = row.value
      let parsed: any = v
      if (typeof v === 'string') {
        const t = v.trim().toLowerCase()
        if (t === 'true') parsed = true
        else if (t === 'false') parsed = false
        else if (t.startsWith('{') || t.startsWith('[')) {
          try { parsed = JSON.parse(v) } catch { parsed = v }
        }
      }
      content[row.section][row.tag] = parsed
    }
    return NextResponse.json({ content })
  } catch (e: any) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    // Two modes:
    // - legacy: { section, content: {...} }
    // - kv: { section, tag, value }
    if (body && typeof body === 'object' && 'tag' in body) {
      const { section, tag, value } = body as { section: string, tag: string, value: string }
      if (!section || !tag) return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
      const { error } = await admin
        .from('site_content')
        .upsert({ section, tag, value, updated_at: new Date().toISOString() }, { onConflict: 'section,tag' })
      if (error) return NextResponse.json({ error: error.message }, { status: 500 })
      return NextResponse.json({ ok: true })
    }

    const { section, content } = body || {}
    if (!section || typeof content !== 'object') return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })

    // Expand object into multiple rows
    const rows = Object.entries(content).map(([tag, value]) => ({ section, tag, value: (value !== null && typeof value === 'object') ? JSON.stringify(value) : String(value), updated_at: new Date().toISOString() }))
    const { error } = await admin
      .from('site_content')
      .upsert(rows as any, { onConflict: 'section,tag' })

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}


