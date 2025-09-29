require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const serviceDescriptions = [
  { 
    key: 'services.webDevelopment.description', 
    en: 'Custom web applications using modern technologies like React, Next.js, and TypeScript',
    ar: 'تطبيقات ويب مخصصة باستخدام التقنيات الحديثة مثل React و Next.js و TypeScript',
    tr: 'React, Next.js ve TypeScript gibi modern teknolojiler kullanarak özel web uygulamaları',
    it: 'Applicazioni web personalizzate utilizzando tecnologie moderne come React, Next.js e TypeScript',
    fr: 'Applications web personnalisées utilisant des technologies modernes comme React, Next.js et TypeScript',
    de: 'Maßgeschneiderte Webanwendungen mit modernen Technologien wie React, Next.js und TypeScript'
  },
  { 
    key: 'services.mobileDevelopment.description', 
    en: 'Cross-platform mobile apps with Flutter and React Native for iOS and Android',
    ar: 'تطبيقات محمولة متعددة المنصات مع Flutter و React Native لـ iOS و Android',
    tr: 'iOS ve Android için Flutter ve React Native ile çapraz platform mobil uygulamaları',
    it: 'App mobili multipiattaforma con Flutter e React Native per iOS e Android',
    fr: 'Applications mobiles multiplateformes avec Flutter et React Native pour iOS et Android',
    de: 'Plattformübergreifende mobile Apps mit Flutter und React Native für iOS und Android'
  },
  { 
    key: 'services.dataEngineering.description', 
    en: 'ETL pipelines, data processing, and analytics solutions using Python and cloud technologies',
    ar: 'خطوط أنابيب ETL ومعالجة البيانات وحلول التحليلات باستخدام Python والتقنيات السحابية',
    tr: 'Python ve bulut teknolojileri kullanarak ETL boru hatları, veri işleme ve analitik çözümler',
    it: 'Pipeline ETL, elaborazione dati e soluzioni analitiche utilizzando Python e tecnologie cloud',
    fr: 'Pipelines ETL, traitement de données et solutions d\'analyse utilisant Python et les technologies cloud',
    de: 'ETL-Pipelines, Datenverarbeitung und Analyselösungen mit Python und Cloud-Technologien'
  },
  { 
    key: 'services.cloudSolutions.description', 
    en: 'Scalable cloud infrastructure and deployment solutions using AWS and Firebase',
    ar: 'حلول البنية التحتية السحابية القابلة للتوسع والنشر باستخدام AWS و Firebase',
    tr: 'AWS ve Firebase kullanarak ölçeklenebilir bulut altyapısı ve dağıtım çözümleri',
    it: 'Soluzioni di infrastruttura cloud scalabili e di deployment utilizzando AWS e Firebase',
    fr: 'Solutions d\'infrastructure cloud évolutives et de déploiement utilisant AWS et Firebase',
    de: 'Skalierbare Cloud-Infrastruktur und Bereitstellungslösungen mit AWS und Firebase'
  }
];

async function addServiceDescriptions() {
  console.log('Adding service descriptions to Supabase...');
  for (const translation of serviceDescriptions) {
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
      console.error(`Error adding translation for key ${key}:`, error.message);
    } else {
      console.log(`✅ Added translation for key: ${key}`);
    }
  }
  console.log('✅ All service descriptions added successfully!');
}

addServiceDescriptions();
