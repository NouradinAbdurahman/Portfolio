const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function populateHeroSkills() {
  console.log('🔧 Populating Hero Skills...');

  try {
    const defaultHeroSkills = [
      { name: 'React', icon: 'SiReact', color: 'text-blue-500' },
      { name: 'Next.js', icon: 'SiNextdotjs', color: 'text-black dark:text-white' },
      { name: 'Python', icon: 'SiPython', color: 'text-yellow-500' },
      { name: 'Flutter', icon: 'SiFlutter', color: 'text-blue-400' },
      { name: 'AWS', icon: 'SiAmazonaws', color: 'text-orange-500' },
      { name: 'Docker', icon: 'SiDocker', color: 'text-blue-600' }
    ];

    const skillsTranslation = {
      key: 'hero.skills',
      en: JSON.stringify(defaultHeroSkills),
      ar: JSON.stringify(defaultHeroSkills), // Same structure for all languages
      tr: JSON.stringify(defaultHeroSkills),
      it: JSON.stringify(defaultHeroSkills),
      fr: JSON.stringify(defaultHeroSkills),
      de: JSON.stringify(defaultHeroSkills),
      updated_at: new Date().toISOString()
    };

    const { error } = await supabase
      .from('translations')
      .upsert(skillsTranslation, { onConflict: 'key' });

    if (error) throw error;
    console.log('✅ Updated hero.skills successfully');

    console.log('🎉 Hero Skills populated successfully!');

  } catch (error) {
    console.error('❌ Error populating hero skills:', error.message);
    process.exit(1);
  }
}

populateHeroSkills();
