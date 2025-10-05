const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

async function run() {
  console.log('🔄 Resetting Resume translations to known-good defaults (EN baseline)...')

  const rows = [
    { key: 'resume.title', en: 'Resume' },
    { key: 'resume.subtitle', en: 'My professional journey and achievements' },
    { key: 'resume.downloadResume', en: 'Download Resume' },
    // Section titles
    { key: 'resume.education.title', en: 'Education' },
    { key: 'resume.certifications.title', en: 'Certifications' },
    { key: 'resume.experience.title', en: 'Experience' },
    { key: 'resume.technicalSkills.title', en: 'Technical Skills' },
    { key: 'resume.technicalSkills.languages', en: 'Programming Languages' },
    { key: 'resume.technicalSkills.frameworks', en: 'Frameworks & Libraries' },
    { key: 'resume.technicalSkills.tools', en: 'Tools & Technologies' },
    // Education - Bachelor
    { key: 'resume.educationDetails.bachelor.degree', en: 'Bachelor of Science in Software Engineering' },
    { key: 'resume.educationDetails.bachelor.school', en: 'OSTIM Technical University' },
    { key: 'resume.educationDetails.bachelor.date', en: '2021 - 2025' },
    { key: 'resume.educationDetails.bachelor.location', en: 'Ankara, Turkey' },
    { key: 'resume.educationDetails.bachelor.description', en: 'Focused on full-stack development, data structures, algorithms, and software engineering principles' },
    // Education - High School
    { key: 'resume.educationDetails.highSchool.degree', en: 'High School Diploma' },
    { key: 'resume.educationDetails.highSchool.school', en: 'Al-Noor International School' },
    { key: 'resume.educationDetails.highSchool.date', en: '2017 - 2021' },
    { key: 'resume.educationDetails.highSchool.location', en: 'Doha, Qatar' },
    { key: 'resume.educationDetails.highSchool.description', en: 'Graduated with honors, focusing on mathematics and science' },
    // Experience - Full-Stack
    { key: 'resume.experienceDetails.fullStack.role', en: 'Full-Stack Developer' },
    { key: 'resume.experienceDetails.fullStack.company', en: 'Freelance' },
    { key: 'resume.experienceDetails.fullStack.employmentType', en: 'Contract' },
    { key: 'resume.experienceDetails.fullStack.date', en: '2022 - Present' },
    { key: 'resume.experienceDetails.fullStack.location', en: 'Remote' },
    { key: 'resume.experienceDetails.fullStack.summary', en: 'Developing full-stack applications using modern technologies including React, Next.js, Node.js, and cloud platforms' },
    // Certifications
    { key: 'resume.certificationDetails.dataEngineer.title', en: 'Data Engineer Professional Certificate' },
    { key: 'resume.certificationDetails.dataEngineer.issuer', en: 'DataCamp' },
    { key: 'resume.certificationDetails.dataEngineer.date', en: '2024' },
    { key: 'resume.certificationDetails.dataScientist.title', en: 'Data Scientist Professional Certificate' },
    { key: 'resume.certificationDetails.dataScientist.issuer', en: 'DataCamp' },
    { key: 'resume.certificationDetails.dataScientist.date', en: '2024' },
    { key: 'resume.certificationDetails.dataAnalyst.title', en: 'Data Analyst Professional Certificate' },
    { key: 'resume.certificationDetails.dataAnalyst.issuer', en: 'DataCamp' },
    { key: 'resume.certificationDetails.dataAnalyst.date', en: '2024' },
  ]

  // Upsert all rows with EN and leave other locales as-is
  const payload = rows.map(r => ({ key: r.key, en: r.en }))
  const { error } = await supabase.from('translations').upsert(payload, { onConflict: 'key' })
  if (error) {
    console.error('❌ Upsert failed:', error)
    process.exit(1)
  }

  console.log(`✅ Reset ${rows.length} Resume keys to EN defaults`)
}

run()


