#!/usr/bin/env node
// Update Supabase translations for Resume content (EN baseline)

import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!url || !serviceKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(url, serviceKey)

async function run() {
  console.log('📝 Updating Resume translations from admin-provided content (EN baseline)...')

  const rows = [
    // Header
    { key: 'resume.title', en: 'Resume' },
    { key: 'resume.subtitle', en: 'My professional journey and technical expertise' },

    // Education - Bachelor (rename semantics kept to existing keys)
    { key: 'resume.educationDetails.bachelor.degree', en: 'Bachelor of Engineering - BE, Software Engineering' },
    { key: 'resume.educationDetails.bachelor.school', en: 'OSTİM Teknik Üniversitesi' },
    { key: 'resume.educationDetails.bachelor.date', en: 'Sep 2022 - Jun 2026' },
    { key: 'resume.educationDetails.bachelor.location', en: 'Ankara Türkiye' },
    { key: 'resume.educationDetails.bachelor.description', en: 'Comprehensive study in Python, C, Web Development, Databases, Data Mining, Software Project Management, C++, Java, SQL, JavaScript, and Machine Learning.' },

    // Education - High School
    { key: 'resume.educationDetails.highSchool.degree', en: 'High School Diploma, Information Technology - Engineering' },
    { key: 'resume.educationDetails.highSchool.school', en: 'Omar bin Abdul Aziz Secondary Independent School for Boys' },
    { key: 'resume.educationDetails.highSchool.date', en: 'Sep 2018 - Jun 2021' },
    { key: 'resume.educationDetails.highSchool.location', en: 'Doha/Qatar' },
    { key: 'resume.educationDetails.highSchool.description', en: 'Foundation in CSS, Python, JavaScript, Information Technology, and HTML programming.' },

    // Certifications (reusing existing keys)
    { key: 'resume.certificationDetails.dataEngineer.title', en: 'Associate Data Engineer in SQL' },
    { key: 'resume.certificationDetails.dataEngineer.issuer', en: 'DataCamp' },
    { key: 'resume.certificationDetails.dataEngineer.date', en: 'Jan 2025' },

    { key: 'resume.certificationDetails.dataScientist.title', en: 'Data Scientist in Python' },
    { key: 'resume.certificationDetails.dataScientist.issuer', en: 'DataCamp' },
    { key: 'resume.certificationDetails.dataScientist.date', en: 'Jun 2024' },

    { key: 'resume.certificationDetails.dataAnalyst.title', en: 'Data Analyst in SQL' },
    { key: 'resume.certificationDetails.dataAnalyst.issuer', en: 'DataCamp' },
    { key: 'resume.certificationDetails.dataAnalyst.date', en: 'Jan 2024' },

    // Experience (full stack role updated)
    { key: 'resume.experienceDetails.fullStack.role', en: 'Full-Stack Developer' },
    { key: 'resume.experienceDetails.fullStack.company', en: 'DAKAEI AI' },
    { key: 'resume.experienceDetails.fullStack.employmentType', en: 'Part-time' },
    { key: 'resume.experienceDetails.fullStack.date', en: 'Apr 2025 - Present' },
    { key: 'resume.experienceDetails.fullStack.location', en: 'London Area, United Kingdom • Remote' },
    { key: 'resume.experienceDetails.fullStack.summary', en: 'Developing full-stack applications using React.js, TypeScript, Node.js, Next.js, JavaScript, SQL, HTML, CSS, Firebase, PostgreSQL, and Databases.' },
  ]

  const payload = rows.map(r => ({ key: r.key, en: r.en }))
  const { error } = await supabase.from('translations').upsert(payload, { onConflict: 'key' })
  if (error) {
    console.error('❌ Upsert failed:', error)
    process.exit(1)
  }

  console.log(`✅ Updated ${rows.length} Resume keys with new EN content`)

  // Ensure employmentType is set for all locales
  const etKey = 'resume.experienceDetails.fullStack.employmentType'
  const rpcPayload = {
    p_key: etKey,
    p_en: 'Part-time',
    p_ar: 'دوام جزئي',
    p_tr: 'Yarı zamanlı',
    p_it: 'Part-time',
    p_fr: 'Temps partiel',
    p_de: 'Teilzeit',
    p_auto_translated: false,
    p_needs_review: false,
  }
  const { error: rpcError } = await supabase.rpc('upsert_translation', rpcPayload)
  if (rpcError) {
    console.error('❌ upsert_translation failed:', rpcError)
    process.exit(1)
  }
  console.log('✅ Set employment type for all locales → Part-time')
}

run()
