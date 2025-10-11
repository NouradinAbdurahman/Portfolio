#!/usr/bin/env node

/**
 * Script to fix hero CTA links in the database
 * This ensures the href values are stored as proper strings, not objects
 */

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function fixHeroCtaLinks() {
  try {
    console.log('🔧 Fixing hero CTA links...')
    
    // Define the correct CTA link values
    const ctaLinks = {
      'hero.ctaPrimaryHref': 'https://linkedin.com/in/nouraddin',
      'hero.ctaSecondaryHref': '#contact'
    }
    
    // Update each CTA link
    for (const [key, value] of Object.entries(ctaLinks)) {
      console.log(`📝 Updating ${key} to: ${value}`)
      
      const { error } = await supabase
        .from('translations')
        .upsert({
          key,
          en: value,
          ar: value, // Same value for all locales for now
          tr: value,
          it: value,
          fr: value,
          de: value,
          updated_at: new Date().toISOString()
        }, { onConflict: 'key' })
      
      if (error) {
        console.error(`❌ Error updating ${key}:`, error)
      } else {
        console.log(`✅ Successfully updated ${key}`)
      }
    }
    
    console.log('🎉 Hero CTA links fixed successfully!')
    console.log('💡 You may need to refresh your browser to see the changes.')
    
  } catch (error) {
    console.error('❌ Error fixing hero CTA links:', error)
    process.exit(1)
  }
}

// Run the script
fixHeroCtaLinks()
