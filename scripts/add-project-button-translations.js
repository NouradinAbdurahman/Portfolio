require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing required environment variables: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// Project button translation keys
const projectButtonTranslations = [
  { 
    key: 'projects.viewDetails', 
    en: 'Details',
    ar: 'التفاصيل',
    tr: 'Detaylar',
    it: 'Dettagli',
    fr: 'Détails',
    de: 'Details'
  },
  { 
    key: 'projects.viewRepository', 
    en: 'Repository',
    ar: 'المستودع',
    tr: 'Depo',
    it: 'Repository',
    fr: 'Dépôt',
    de: 'Repository'
  },
  { 
    key: 'projects.viewLiveDemo', 
    en: 'Live Demo',
    ar: 'عرض مباشر',
    tr: 'Canlı Demo',
    it: 'Demo Live',
    fr: 'Démo en Direct',
    de: 'Live-Demo'
  }
];

async function addProjectButtonTranslations() {
  console.log('Adding project button translations to Supabase...');
  
  try {
    for (const translation of projectButtonTranslations) {
      const { error } = await supabase.rpc('upsert_translation', {
        p_key: translation.key,
        p_en: translation.en,
        p_ar: translation.ar,
        p_tr: translation.tr,
        p_it: translation.it,
        p_fr: translation.fr,
        p_de: translation.de
      });

      if (error) {
        console.error(`Error adding translation for key ${translation.key}:`, error);
      } else {
        console.log(`✅ Added translation for key: ${translation.key}`);
      }
    }
    
    console.log('✅ All project button translations added successfully!');
  } catch (error) {
    console.error('Error adding project button translations:', error);
  }
}

addProjectButtonTranslations();
