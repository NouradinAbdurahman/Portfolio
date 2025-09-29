const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const navbarTranslations = [
  {
    key: 'navbar.about',
    en: 'About Me',
    ar: 'نبذة عني',
    tr: 'Hakkımda',
    it: 'Chi Sono',
    fr: 'À Propos',
    de: 'Über Mich'
  },
  {
    key: 'navbar.projects',
    en: 'Projects',
    ar: 'المشاريع',
    tr: 'Projeler',
    it: 'Progetti',
    fr: 'Projets',
    de: 'Projekte'
  },
  {
    key: 'navbar.services',
    en: 'Services',
    ar: 'الخدمات',
    tr: 'Hizmetler',
    it: 'Servizi',
    fr: 'Services',
    de: 'Dienstleistungen'
  },
  {
    key: 'navbar.contact',
    en: 'Contact Me',
    ar: 'تواصل معي',
    tr: 'Benimle İletişime Geç',
    it: 'Contattami',
    fr: 'Contactez-moi',
    de: 'Kontaktieren Sie mich'
  },
  {
    key: 'navbar.resume',
    en: 'Resume',
    ar: 'السيرة الذاتية',
    tr: 'Özgeçmiş',
    it: 'Curriculum',
    fr: 'CV',
    de: 'Lebenslauf'
  }
];

async function addNavbarTranslations() {
  console.log('Adding navbar translations...');
  
  for (const translation of navbarTranslations) {
    const { error } = await supabase.rpc('upsert_translation', {
      p_key: translation.key,
      p_en: translation.en,
      p_ar: translation.ar,
      p_tr: translation.tr,
      p_it: translation.it,
      p_fr: translation.fr,
      p_de: translation.de,
      p_auto_translated: false,
      p_needs_review: false
    });

    if (error) {
      console.error(`Error adding ${translation.key}:`, error);
    } else {
      console.log(`✅ Added ${translation.key}`);
    }
  }
  
  console.log('Navbar translations added successfully!');
}

addNavbarTranslations().catch(console.error);
