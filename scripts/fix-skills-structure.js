const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Import the skills data
const { skills } = require('../lib/data.ts');

async function fixSkillsStructure() {
  try {
    console.log('🔧 Fixing Skills data structure...');

    // Create proper skills structure for each category
    const fullStackSkills = skills.filter(s => ["React","Next.js","Flutter","Node.js","Express","React Native"].includes(s.name));
    const dataSkills = skills.filter(s => ["Python","SQL","PostgreSQL"].includes(s.name));
    const cloudSkills = skills.filter(s => ["AWS","Firebase","Docker","Git"].includes(s.name));

    // Convert skills to the format expected by the API
    const skillsTranslations = {
      en: JSON.stringify(fullStackSkills),
      ar: JSON.stringify(fullStackSkills),
      tr: JSON.stringify(fullStackSkills),
      it: JSON.stringify(fullStackSkills),
      fr: JSON.stringify(fullStackSkills),
      de: JSON.stringify(fullStackSkills)
    };

    const dataSkillsTranslations = {
      en: JSON.stringify(dataSkills),
      ar: JSON.stringify(dataSkills),
      tr: JSON.stringify(dataSkills),
      it: JSON.stringify(dataSkills),
      fr: JSON.stringify(dataSkills),
      de: JSON.stringify(dataSkills)
    };

    const cloudSkillsTranslations = {
      en: JSON.stringify(cloudSkills),
      ar: JSON.stringify(cloudSkills),
      tr: JSON.stringify(cloudSkills),
      it: JSON.stringify(cloudSkills),
      fr: JSON.stringify(cloudSkills),
      de: JSON.stringify(cloudSkills)
    };

    // Update the skills items
    const updates = [
      {
        key: 'skills.itemsFull',
        ...skillsTranslations,
        updated_at: new Date().toISOString()
      },
      {
        key: 'skills.itemsData',
        ...dataSkillsTranslations,
        updated_at: new Date().toISOString()
      },
      {
        key: 'skills.itemsCloud',
        ...cloudSkillsTranslations,
        updated_at: new Date().toISOString()
      }
    ];

    for (const update of updates) {
      const { error } = await supabase
        .from('translations')
        .upsert(update, { onConflict: 'key' });

      if (error) {
        console.error(`❌ Error updating ${update.key}:`, error);
      } else {
        console.log(`✅ Updated ${update.key} successfully`);
      }
    }

    console.log('🎉 Skills data structure fixed successfully!');

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

// Run the script
fixSkillsStructure();
