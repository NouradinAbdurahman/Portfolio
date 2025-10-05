const fs = require('fs')
const path = require('path')
const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const ROOT = path.resolve(__dirname, '..')
const MSG_DIR = path.join(ROOT, 'messages')
const SUPPORTED = ['en', 'ar', 'tr', 'it', 'fr', 'de']

function flatten(obj, prefix = '') {
  const out = {}
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      Object.assign(out, flatten(v, key))
    } else {
      out[key] = v
    }
  }
  return out
}

async function run() {
  console.log('🔄 Syncing messages/*.json into Supabase translations...')
  const perLocale = {}
  for (const lang of SUPPORTED) {
    const file = path.join(MSG_DIR, `${lang}.json`)
    if (!fs.existsSync(file)) continue
    const json = JSON.parse(fs.readFileSync(file, 'utf-8'))
    perLocale[lang] = flatten(json)
    console.log(`• Loaded ${lang}: ${Object.keys(perLocale[lang]).length} keys`)
  }

  const allKeys = new Set()
  for (const lang of Object.keys(perLocale)) {
    Object.keys(perLocale[lang]).forEach(k => allKeys.add(k))
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

  const batch = []
  for (const key of allKeys) {
    const row = { key }
    for (const lang of SUPPORTED) {
      const val = perLocale[lang]?.[key]
      if (typeof val === 'string') row[lang] = val
    }
    // Ensure EN baseline exists to satisfy NOT NULL constraint
    if (!row.en) row.en = perLocale.en?.[key] || ''
    batch.push(row)
  }

  // Chunked upserts to avoid payload too large
  const chunkSize = 500
  let upserted = 0
  for (let i = 0; i < batch.length; i += chunkSize) {
    const chunk = batch.slice(i, i + chunkSize)
    const { error } = await supabase
      .from('translations')
      .upsert(chunk, { onConflict: 'key' })
    if (error) {
      console.error('❌ Upsert failed at chunk', i / chunkSize, error)
      process.exit(1)
    }
    upserted += chunk.length
  }

  console.log(`✅ Synced ${upserted} keys from messages to translations`)
}

run()


