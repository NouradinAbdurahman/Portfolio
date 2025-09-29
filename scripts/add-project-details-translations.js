require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const projectDetailsTranslations = [
  { 
    key: 'projects.viewRepository', 
    en: 'View Repository',
    ar: 'عرض المستودع',
    tr: 'Depoyu Görüntüle',
    it: 'Visualizza Repository',
    fr: 'Voir le Dépôt',
    de: 'Repository Ansehen'
  },
  { 
    key: 'projects.viewLiveDemo', 
    en: 'View Live Demo',
    ar: 'عرض العرض التوضيحي المباشر',
    tr: 'Canlı Demo Görüntüle',
    it: 'Visualizza Demo Live',
    fr: 'Voir la Démo en Direct',
    de: 'Live-Demo Ansehen'
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
    tr: 'Ana Özellikler',
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
    tr: 'Ana Öğrenimler',
    it: 'Apprendimenti Chiave',
    fr: 'Apprentissages Clés',
    de: 'Hauptlernpunkte'
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

async function addProjectDetailsTranslations() {
  console.log('Adding project details translations...');
  
  for (const translation of projectDetailsTranslations) {
    const { key, en, ar, tr, it, fr, de } = translation;
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
      console.error(`Error updating translation for key ${key}:`, error.message);
    } else {
      console.log(`✅ Updated translation for key: ${key}`);
    }
  }
  
  console.log('✅ All project details translations added successfully!');
}

addProjectDetailsTranslations();
