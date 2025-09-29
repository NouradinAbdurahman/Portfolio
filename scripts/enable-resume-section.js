const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function enableResumeSection() {
  console.log('Enabling resume section...');
  
  try {
    // Get current settings
    const { data: currentSettings, error: getError } = await supabase
      .from('site_settings')
      .select('*')
      .single();

    if (getError && getError.code !== 'PGRST116') {
      console.error('Error getting settings:', getError);
      return;
    }

    // Ensure section_order includes resume
    const defaultSectionOrder = ["hero", "about", "services", "skills", "projects", "contact", "resume"];
    const currentSectionOrder = currentSettings?.section_order || defaultSectionOrder;
    
    // Add resume to section order if it's not already there
    if (!currentSectionOrder.includes('resume')) {
      currentSectionOrder.push('resume');
    }

    // Update settings
    const settingsData = {
      section_order: currentSectionOrder,
      show_resume: true, // Add explicit resume visibility flag
      updated_at: new Date().toISOString()
    };

    const { error: updateError } = await supabase
      .from('site_settings')
      .upsert(settingsData, { onConflict: 'id' });

    if (updateError) {
      console.error('Error updating settings:', updateError);
      return;
    }

    console.log('Resume section enabled successfully!');
    console.log('Section order:', currentSectionOrder);

    // Also ensure resume translations exist
    const resumeKeys = [
      'resume.title',
      'resume.subtitle',
      'resume.downloadResume'
    ];

    for (const key of resumeKeys) {
      const { error: translationError } = await supabase.rpc('upsert_translation', {
        p_key: key,
        p_en: getDefaultTranslation(key),
        p_ar: getArabicTranslation(key),
        p_tr: getTurkishTranslation(key),
        p_it: getItalianTranslation(key),
        p_fr: getFrenchTranslation(key),
        p_de: getGermanTranslation(key)
      });

      if (translationError) {
        console.error(`Error upserting translation for ${key}:`, translationError);
      } else {
        console.log(`✓ Translation for ${key} ensured`);
      }
    }

  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

function getDefaultTranslation(key) {
  const translations = {
    'resume.title': 'Resume',
    'resume.subtitle': 'My Professional Journey',
    'resume.downloadResume': 'Download Resume'
  };
  return translations[key] || key;
}

function getArabicTranslation(key) {
  const translations = {
    'resume.title': 'السيرة الذاتية',
    'resume.subtitle': 'رحلتي المهنية',
    'resume.downloadResume': 'تحميل السيرة الذاتية'
  };
  return translations[key] || getDefaultTranslation(key);
}

function getTurkishTranslation(key) {
  const translations = {
    'resume.title': 'Özgeçmiş',
    'resume.subtitle': 'Profesyonel Yolculuğum',
    'resume.downloadResume': 'Özgeçmişi İndir'
  };
  return translations[key] || getDefaultTranslation(key);
}

function getItalianTranslation(key) {
  const translations = {
    'resume.title': 'Curriculum',
    'resume.subtitle': 'Il Mio Percorso Professionale',
    'resume.downloadResume': 'Scarica Curriculum'
  };
  return translations[key] || getDefaultTranslation(key);
}

function getFrenchTranslation(key) {
  const translations = {
    'resume.title': 'CV',
    'resume.subtitle': 'Mon Parcours Professionnel',
    'resume.downloadResume': 'Télécharger CV'
  };
  return translations[key] || getDefaultTranslation(key);
}

function getGermanTranslation(key) {
  const translations = {
    'resume.title': 'Lebenslauf',
    'resume.subtitle': 'Meine Berufliche Laufbahn',
    'resume.downloadResume': 'Lebenslauf Herunterladen'
  };
  return translations[key] || getDefaultTranslation(key);
}

enableResumeSection();
