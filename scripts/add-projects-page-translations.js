require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing required environment variables: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// Projects page translation keys
const projectsPageTranslations = [
  { 
    key: 'projects.backToProjects', 
    en: 'Back to Projects',
    ar: 'العودة إلى المشاريع',
    tr: 'Projelere Geri Dön',
    it: 'Torna ai Progetti',
    fr: 'Retour aux Projets',
    de: 'Zurück zu den Projekten'
  },
  { 
    key: 'projects.technologies', 
    en: 'Technologies',
    ar: 'التقنيات',
    tr: 'Teknolojiler',
    it: 'Tecnologie',
    fr: 'Technologies',
    de: 'Technologien'
  },
  { 
    key: 'projects.problem', 
    en: 'Problem',
    ar: 'المشكلة',
    tr: 'Sorun',
    it: 'Problema',
    fr: 'Problème',
    de: 'Problem'
  },
  { 
    key: 'projects.solution', 
    en: 'Solution',
    ar: 'الحل',
    tr: 'Çözüm',
    it: 'Soluzione',
    fr: 'Solution',
    de: 'Lösung'
  },
  { 
    key: 'projects.outcome', 
    en: 'Outcome',
    ar: 'النتيجة',
    tr: 'Sonuç',
    it: 'Risultato',
    fr: 'Résultat',
    de: 'Ergebnis'
  },
  { 
    key: 'projects.keyFeatures', 
    en: 'Key Features',
    ar: 'الميزات الرئيسية',
    tr: 'Temel Özellikler',
    it: 'Caratteristiche Principali',
    fr: 'Fonctionnalités Clés',
    de: 'Hauptfunktionen'
  },
  { 
    key: 'projects.architecture', 
    en: 'Architecture',
    ar: 'الهندسة المعمارية',
    tr: 'Mimari',
    it: 'Architettura',
    fr: 'Architecture',
    de: 'Architektur'
  },
  { 
    key: 'projects.technicalChallenges', 
    en: 'Technical Challenges',
    ar: 'التحديات التقنية',
    tr: 'Teknik Zorluklar',
    it: 'Sfide Tecniche',
    fr: 'Défis Techniques',
    de: 'Technische Herausforderungen'
  },
  { 
    key: 'projects.keyLearnings', 
    en: 'Key Learnings',
    ar: 'التعلمات الرئيسية',
    tr: 'Temel Öğrenimler',
    it: 'Apprendimenti Chiave',
    fr: 'Apprentissages Clés',
    de: 'Wichtige Erkenntnisse'
  },
  { 
    key: 'projects.impact', 
    en: 'Impact',
    ar: 'التأثير',
    tr: 'Etki',
    it: 'Impatto',
    fr: 'Impact',
    de: 'Auswirkung'
  }
];

async function addProjectsPageTranslations() {
  console.log('Adding projects page translations to Supabase...');
  
  try {
    for (const translation of projectsPageTranslations) {
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
    
    console.log('✅ All projects page translations added successfully!');
  } catch (error) {
    console.error('Error adding projects page translations:', error);
  }
}

addProjectsPageTranslations();
