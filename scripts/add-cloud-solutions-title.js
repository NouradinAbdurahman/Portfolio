require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const cloudSolutionsTitle = {
  key: 'services.cloudSolutions.title',
  en: 'Cloud Solutions',
  ar: 'الحلول السحابية',
  tr: 'Bulut Çözümleri',
  it: 'Soluzioni Cloud',
  fr: 'Solutions Cloud',
  de: 'Cloud-Lösungen'
};

async function addCloudSolutionsTitle() {
  console.log('Adding cloud solutions title translation...');
  const { key, en, ar, tr, it, fr, de } = cloudSolutionsTitle;
  const { error } = await supabase.rpc('upsert_translation', {
    p_key: key,
    p_en: en,
    p_ar: ar,
    p_tr: tr,
    p_it: it,
    p_fr: fr,
    p_de: de,
  });

  if (error) {
    console.error(`Error adding translation for key ${key}:`, error.message);
  } else {
    console.log(`✅ Added translation for key: ${key}`);
  }
  console.log('✅ Cloud solutions title translation added successfully!');
}

addCloudSolutionsTitle();
