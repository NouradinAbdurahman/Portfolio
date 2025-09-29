const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function testResumeSection() {
  console.log('Testing resume section data...');
  
  try {
    // Check if resume translations exist
    const { data: translations, error: translationsError } = await supabase
      .from('translations')
      .select('key, ar')
      .like('key', 'resume.%')
      .limit(10);

    if (translationsError) {
      console.error('Error fetching resume translations:', translationsError);
    } else {
      console.log('Resume translations found:', translations?.length || 0);
      translations?.forEach(t => {
        console.log(`  ${t.key}: ${t.ar ? 'Has Arabic' : 'No Arabic'}`);
      });
    }

    // Check section order
    const { data: sectionOrder, error: settingsError } = await supabase
      .from('site_settings')
      .select('setting_value')
      .eq('setting_key', 'section_order')
      .single();

    if (settingsError) {
      console.error('Error fetching section order:', settingsError);
    } else {
      console.log('Section order:', sectionOrder?.setting_value);
      const hasResume = sectionOrder?.setting_value?.includes('resume');
      console.log('Resume section included:', hasResume);
    }

    // Add some essential resume translations if missing
    const essentialKeys = [
      { key: 'resume.title', en: 'Resume', ar: 'السيرة الذاتية' },
      { key: 'resume.subtitle', en: 'My Professional Journey', ar: 'رحلتي المهنية' },
      { key: 'resume.downloadResume', en: 'Download Resume', ar: 'تحميل السيرة الذاتية' },
      { key: 'resume.education.title', en: 'Education', ar: 'التعليم' },
      { key: 'resume.experience.title', en: 'Experience', ar: 'الخبرة' },
      { key: 'resume.skills.title', en: 'Skills', ar: 'المهارات' }
    ];

    for (const item of essentialKeys) {
      const { error } = await supabase.rpc('upsert_translation', {
        p_key: item.key,
        p_en: item.en,
        p_ar: item.ar,
        p_tr: item.en, // Keep English for other languages for now
        p_it: item.en,
        p_fr: item.en,
        p_de: item.en
      });

      if (error) {
        console.error(`Error upserting ${item.key}:`, error);
      } else {
        console.log(`✓ Ensured translation for ${item.key}`);
      }
    }

    console.log('Resume section test completed!');

  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

testResumeSection();
