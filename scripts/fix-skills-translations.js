require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const skillsTranslations = [
  // Skills Section - Fixed with proper Arabic translations and LTR wrapping
  { 
    key: 'skills.title', 
    en: 'Technical Skills',
    ar: 'المهارات التقنية',
    tr: 'Teknik Beceriler',
    it: 'Competenze Tecniche',
    fr: 'Compétences Techniques',
    de: 'Technische Fähigkeiten'
  },
  { 
    key: 'skills.lead', 
    en: 'Technologies and tools I work with',
    ar: 'التقنيات والأدوات التي أعمل بها',
    tr: 'Çalıştığım teknolojiler ve araçlar',
    it: 'Tecnologie e strumenti con cui lavoro',
    fr: 'Technologies et outils avec lesquels je travaille',
    de: 'Technologien und Tools, mit denen ich arbeite'
  },
  { 
    key: 'skills.catFullTitle', 
    en: 'Full-Stack Development',
    ar: 'التطوير المتكامل',
    tr: 'Full-Stack Geliştirme',
    it: 'Sviluppo Full-Stack',
    fr: 'Développement Full-Stack',
    de: 'Full-Stack-Entwicklung'
  },
  { 
    key: 'skills.catFullDesc', 
    en: 'React, Next.js, Flutter, Node.js',
    ar: '<span dir="ltr">React</span> و <span dir="ltr">Next.js</span> و <span dir="ltr">Flutter</span> و <span dir="ltr">Node.js</span>',
    tr: 'React, Next.js, Flutter, Node.js',
    it: 'React, Next.js, Flutter, Node.js',
    fr: 'React, Next.js, Flutter, Node.js',
    de: 'React, Next.js, Flutter, Node.js'
  },
  { 
    key: 'skills.catDataTitle', 
    en: 'Data Engineering',
    ar: 'هندسة البيانات',
    tr: 'Veri Mühendisliği',
    it: 'Ingegneria dei Dati',
    fr: 'Ingénierie des Données',
    de: 'Datenverarbeitung'
  },
  { 
    key: 'skills.catDataDesc', 
    en: 'ETL Pipelines, SQL, Python, Analytics',
    ar: 'خطوط أنابيب <span dir="ltr">ETL</span> و <span dir="ltr">SQL</span> و <span dir="ltr">Python</span> والتحليلات',
    tr: 'ETL Pipeline\'ları, SQL, Python, Analitik',
    it: 'Pipeline ETL, SQL, Python, Analytics',
    fr: 'Pipelines ETL, SQL, Python, Analytics',
    de: 'ETL-Pipelines, SQL, Python, Analytics'
  },
  { 
    key: 'skills.catCloudTitle', 
    en: 'Cloud & DevOps',
    ar: 'السحابة وعمليات التطوير',
    tr: 'Bulut ve DevOps',
    it: 'Cloud e DevOps',
    fr: 'Cloud et DevOps',
    de: 'Cloud und DevOps'
  },
  { 
    key: 'skills.catCloudDesc', 
    en: 'AWS, Firebase, Automation, CI/CD',
    ar: '<span dir="ltr">AWS</span> و <span dir="ltr">Firebase</span> والأتمتة و <span dir="ltr">CI/CD</span>',
    tr: 'AWS, Firebase, Otomasyon, CI/CD',
    it: 'AWS, Firebase, Automazione, CI/CD',
    fr: 'AWS, Firebase, Automatisation, CI/CD',
    de: 'AWS, Firebase, Automatisierung, CI/CD'
  },
  { 
    key: 'skills.catMobileTitle', 
    en: 'Mobile Development',
    ar: 'تطوير التطبيقات المحمولة',
    tr: 'Mobil Geliştirme',
    it: 'Sviluppo Mobile',
    fr: 'Développement Mobile',
    de: 'Mobile Entwicklung'
  },
  { 
    key: 'skills.catMobileDesc', 
    en: 'Flutter, React Native, iOS, Android',
    ar: '<span dir="ltr">Flutter</span> و <span dir="ltr">React Native</span> و <span dir="ltr">iOS</span> و <span dir="ltr">Android</span>',
    tr: 'Flutter, React Native, iOS, Android',
    it: 'Flutter, React Native, iOS, Android',
    fr: 'Flutter, React Native, iOS, Android',
    de: 'Flutter, React Native, iOS, Android'
  }
];

async function fixSkillsTranslations() {
  console.log('Fixing skills translations with proper RTL/LTR handling...');
  
  for (const translation of skillsTranslations) {
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
  
  console.log('✅ All skills translations fixed successfully!');
}

fixSkillsTranslations();
