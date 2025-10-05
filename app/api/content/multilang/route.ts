import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { services as defaultServices } from '@/lib/data'
import { skills as defaultSkills } from '@/lib/data'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
const service = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(url, service)

const SUPPORTED_LOCALES = ['en', 'ar', 'tr', 'it', 'fr', 'de']

// Helper to normalize section names to translation namespaces
function normalizeSection(section: string): string {
  // Align admin 'navbar' UI section with frontend 'navigation' namespace
  if (section === 'navbar') return 'navigation'
  return section
}

// Helper function to get translation key for a field
function getTranslationKey(section: string, field: string): string {
  const normalized = normalizeSection(section)
  return `${normalized}.${field}`
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
    const normalizedSection = normalizeSection(section)

    // Fetch all translations for the section
    const { data: translations, error: translationError } = await supabase
      .from('translations')
      .select('key, en, ar, tr, it, fr, de')
      .like('key', `${normalizedSection}.%`)

    if (translationError) {
      return NextResponse.json({ error: translationError.message }, { status: 500 })
    }

    // Fetch legacy content from site_content table
    const { data: legacyContent, error: legacyError } = await supabase
      .from('site_content')
      .select('tag, value')
      .eq('section', normalizedSection)

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

    // Synthesize services.items when missing by reading well-known keys
    if (normalizedSection === 'services' && !multilangContent['items']) {
      const SERVICE_KEYS = ['webDevelopment','dataEngineering','mobileDevelopment','cloudSolutions']
      const byLocale: Record<string, string> = {}
      SUPPORTED_LOCALES.forEach(locale => {
        const items = SERVICE_KEYS.map((k, idx) => {
          const titleKey = `${k}.title`
          const descKey = `${k}.description`
          const titleVal = multilangContent[titleKey]?.[locale] || ''
          const descVal = multilangContent[descKey]?.[locale] || ''
          const fallbackService = defaultServices[idx]
          const enTitle = multilangContent[titleKey]?.en || fallbackService?.title || ''
          const enDesc = multilangContent[descKey]?.en || fallbackService?.description || ''
          return {
            id: `service_${k}`,
            // For non-English locales, keep empty if not translated (no auto-fill with EN)
            title: { [locale]: locale === 'en' ? (enTitle || '') : (titleVal || ''), en: enTitle },
            description: { [locale]: locale === 'en' ? (enDesc || '') : (descVal || ''), en: enDesc },
            icon: fallbackService?.icon || 'Code',
            technologies: fallbackService?.technologies || [],
            hidden: false,
            hiddenTranslations: {}
          }
        })
        byLocale[locale] = JSON.stringify(items)
      })
      multilangContent['items'] = byLocale
    }

    // Synthesize technical skills to the original three cards if missing
    if (normalizedSection === 'technical_skills' && !multilangContent['categories']) {
      const byLocale: Record<string, string> = {}
      // Desired three cards
      const fullStack = {
        id: 'cat_fullstack',
        name: 'Full-Stack Development',
        description: 'React, Next.js, Flutter, Node.js',
        skills: [
          { name: 'React', icon: 'SiReact', color: 'text-cyan-400', category: 'framework' },
          { name: 'Next.js', icon: 'SiNextdotjs', color: 'text-black dark:text-white', category: 'framework' },
          { name: 'Flutter', icon: 'SiFlutter', color: 'text-blue-500', category: 'framework' },
          { name: 'Node.js', icon: 'FaNodeJs', color: 'text-green-500', category: 'framework' },
          { name: 'Express', icon: 'SiExpress', color: 'text-gray-600 dark:text-gray-300', category: 'framework' },
          { name: 'React Native', icon: 'FaReact', color: 'text-cyan-400', category: 'framework' },
        ]
      }
      const dataEng = {
        id: 'cat_data',
        name: 'Data Engineering',
        description: 'ETL Pipelines, SQL, Python, Analytics',
        skills: [
          { name: 'Python', icon: 'FaPython', color: 'text-yellow-500', category: 'language' },
          { name: 'SQL', icon: 'Database', color: 'text-blue-500', category: 'language' },
          { name: 'PostgreSQL', icon: 'SiPostgresql', color: 'text-blue-600', category: 'tool' },
        ]
      }
      const cloudDevOps = {
        id: 'cat_cloud',
        name: 'Cloud & DevOps',
        description: 'AWS, Firebase, Automation, CI/CD',
        skills: [
          { name: 'AWS', icon: 'FaAws', color: 'text-orange-400', category: 'cloud' },
          { name: 'Firebase', icon: 'SiFirebase', color: 'text-orange-500', category: 'cloud' },
          { name: 'Docker', icon: 'FaDocker', color: 'text-blue-500', category: 'tool' },
          { name: 'Git', icon: 'FaGitAlt', color: 'text-orange-500', category: 'tool' },
        ]
      }

      SUPPORTED_LOCALES.forEach(locale => {
        const cats = [fullStack, dataEng, cloudDevOps].map(c => ({
          id: c.id,
          name: locale === 'en' ? c.name : '',
          description: locale === 'en' ? c.description : '',
          skills: c.skills,
          hidden: false,
          hiddenTranslations: {}
        }))
        byLocale[locale] = JSON.stringify(cats)
      })
      multilangContent['categories'] = byLocale
      // Also ensure section title/subtitle
      if (!multilangContent['title']) multilangContent['title'] = {}
      if (!multilangContent['subtitle']) multilangContent['subtitle'] = {}
      SUPPORTED_LOCALES.forEach(locale => {
        if (!multilangContent['title'][locale]) multilangContent['title'][locale] = locale === 'en' ? 'Technical Skills' : ''
        if (!multilangContent['subtitle'][locale]) multilangContent['subtitle'][locale] = locale === 'en' ? 'Technologies and tools I work with' : ''
      })
    }

    // Ensure technical_skills title/subtitle exist with sensible defaults
    if (normalizedSection === 'technical_skills') {
      const ensureMulti = (key: string, enDefault: string) => {
        if (!multilangContent[key]) multilangContent[key] = {}
        SUPPORTED_LOCALES.forEach(locale => {
          if (!multilangContent[key][locale]) {
            multilangContent[key][locale] = locale === 'en' ? enDefault : ''
          }
        })
      }
      ensureMulti('title', 'Technical Skills')
      ensureMulti('subtitle', 'Technologies and tools I work with')
    }

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
        multilangContent[row.tag].en = typeof parsedValue === 'string' ? parsedValue : JSON.stringify(parsedValue)
      }
    })

    return NextResponse.json({ 
      content: multilangContent,
      section: normalizedSection,
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

    const normalizedSection = normalizeSection(section)

    // Prepare translations to upsert
    const translationsToUpsert: any[] = []
    
    Object.entries(content).forEach(([field, translations]) => {
      if (typeof translations === 'object' && translations !== null) {
        const translationKey = getTranslationKey(normalizedSection, field)
        
        // Create translation row
        const translationRow: any = {
          key: translationKey,
          auto_translated: false,
          needs_review: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
        
        // Add translations for each locale
        const isGlobalHiddenFlag = field.endsWith('_hidden')
        SUPPORTED_LOCALES.forEach(locale => {
          const localeValue = (translations as any)[locale]
          let value = localeValue
          // For global hidden flags, apply the same value to all locales
          if (isGlobalHiddenFlag) {
            const fallback = (translations as any).en
            value = typeof fallback === 'string' ? fallback : (localeValue || '')
          }
          if (value && typeof value === 'string' && value.trim()) {
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

    // Derive global hidden flags from per-locale hidden maps
    Object.entries(content).forEach(([field, translations]) => {
      if (field.endsWith('_translations_hidden') && typeof translations === 'object' && translations !== null) {
        const baseField = field.replace('_translations_hidden', '')
        const anyHidden = SUPPORTED_LOCALES.some((loc) => {
          const v = (translations as Record<string, string>)[loc]
          return String(v).toLowerCase() === 'true'
        })
        const globalKey = getTranslationKey(normalizedSection, `${baseField}_hidden`)
        const row: any = { key: globalKey }
        SUPPORTED_LOCALES.forEach((loc) => { row[loc] = anyHidden ? 'true' : 'false' })
        translationsToUpsert.push(row)
      }
    })

    // Upsert translations: skip empty strings to avoid hiding content unintentionally
    for (const translation of translationsToUpsert) {
      const payload = {
        p_key: translation.key,
        p_en: typeof translation.en === 'string' && translation.en.trim() ? translation.en : null,
        p_ar: typeof translation.ar === 'string' && translation.ar.trim() ? translation.ar : null,
        p_tr: typeof translation.tr === 'string' && translation.tr.trim() ? translation.tr : null,
        p_it: typeof translation.it === 'string' && translation.it.trim() ? translation.it : null,
        p_fr: typeof translation.fr === 'string' && translation.fr.trim() ? translation.fr : null,
        p_de: typeof translation.de === 'string' && translation.de.trim() ? translation.de : null,
        p_auto_translated: translation.auto_translated || false,
        p_needs_review: translation.needs_review || false
      }
      const { error } = await supabase.rpc('upsert_translation', payload as any)
      if (error) {
        console.error('Error upserting translation:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
      }
    }

    // Also update legacy site_content table for backward compatibility
    const legacyRows = Object.entries(content).map(([field, translations]) => ({
      section: normalizedSection,
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
