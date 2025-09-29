const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Import the skills data
const { skills } = require('../lib/data.ts');

async function populateTechnicalSkills() {
  try {
    console.log('🔧 Populating Technical Skills section...');

    // Create the categories structure as defined in DEFAULTS
    const categories = [
      {
        id: 'fullstack',
        name: 'Full-Stack Development',
        description: 'React, Next.js, Flutter, Node.js',
        skills: skills.filter(s => ["React","Next.js","Flutter","Node.js","Express","React Native"].includes(s.name))
      },
      {
        id: 'data',
        name: 'Data Engineering', 
        description: 'ETL Pipelines, SQL, Python, Analytics',
        skills: skills.filter(s => ["Python","SQL","PostgreSQL"].includes(s.name))
      },
      {
        id: 'cloud',
        name: 'Cloud & DevOps',
        description: 'AWS, Firebase, Automation, CI/CD', 
        skills: skills.filter(s => ["AWS","Firebase","Docker","Git"].includes(s.name))
      }
    ];

    // Create translations for the categories
    const categoriesTranslations = {
      en: JSON.stringify(categories),
      ar: JSON.stringify(categories),
      tr: JSON.stringify(categories),
      it: JSON.stringify(categories),
      fr: JSON.stringify(categories),
      de: JSON.stringify(categories)
    };

    // Update the technical_skills.categories field
    const { error } = await supabase
      .from('translations')
      .upsert({
        key: 'technical_skills.categories',
        ...categoriesTranslations,
        updated_at: new Date().toISOString()
      }, { onConflict: 'key' });

    if (error) {
      console.error('❌ Error updating technical_skills.categories:', error);
    } else {
      console.log('✅ Updated technical_skills.categories successfully');
    }

    // Also ensure we have the title and subtitle
    const titleTranslations = {
      en: 'Technical Skills',
      ar: 'المهارات التقنية',
      tr: 'Teknik Beceriler',
      it: 'Competenze Tecniche',
      fr: 'Compétences Techniques',
      de: 'Technische Fähigkeiten'
    };

    const subtitleTranslations = {
      en: 'Technologies and tools I work with',
      ar: 'التقنيات والأدوات التي أعمل بها',
      tr: 'Çalıştığım teknolojiler ve araçlar',
      it: 'Tecnologie e strumenti con cui lavoro',
      fr: 'Technologies et outils avec lesquels je travaille',
      de: 'Technologien und Tools, mit denen ich arbeite'
    };

    // Update title
    const { error: titleError } = await supabase
      .from('translations')
      .upsert({
        key: 'technical_skills.title',
        ...titleTranslations,
        updated_at: new Date().toISOString()
      }, { onConflict: 'key' });

    if (titleError) {
      console.error('❌ Error updating technical_skills.title:', titleError);
    } else {
      console.log('✅ Updated technical_skills.title successfully');
    }

    // Update subtitle
    const { error: subtitleError } = await supabase
      .from('translations')
      .upsert({
        key: 'technical_skills.subtitle',
        ...subtitleTranslations,
        updated_at: new Date().toISOString()
      }, { onConflict: 'key' });

    if (subtitleError) {
      console.error('❌ Error updating technical_skills.subtitle:', subtitleError);
    } else {
      console.log('✅ Updated technical_skills.subtitle successfully');
    }

    console.log('🎉 Technical Skills section populated successfully!');

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

// Run the script
populateTechnicalSkills();
