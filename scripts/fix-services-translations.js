require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const servicesTranslations = [
  // Services Section - Fixed with proper Arabic translations and LTR wrapping
  { 
    key: 'services.title', 
    en: 'Services',
    ar: 'الخدمات',
    tr: 'Hizmetler',
    it: 'Servizi',
    fr: 'Services',
    de: 'Dienstleistungen'
  },
  { 
    key: 'services.subtitle', 
    en: 'Comprehensive solutions for your digital needs',
    ar: 'حلول شاملة لاحتياجاتك الرقمية',
    tr: 'Dijital ihtiyaçlarınız için kapsamlı çözümler',
    it: 'Soluzioni complete per le tue esigenze digitali',
    fr: 'Solutions complètes pour vos besoins numériques',
    de: 'Umfassende Lösungen für Ihre digitalen Bedürfnisse'
  },
  { 
    key: 'webDevelopment', 
    en: 'Web Development',
    ar: 'تطوير المواقع',
    tr: 'Web Geliştirme',
    it: 'Sviluppo Web',
    fr: 'Développement Web',
    de: 'Web-Entwicklung'
  },
  { 
    key: 'webDevelopmentDesc', 
    en: 'Modern, responsive websites built with React, Next.js, and cutting-edge technologies for optimal performance and user experience.',
    ar: 'مواقع ويب حديثة ومتجاوبة مبنية باستخدام <span dir="ltr">React</span> و <span dir="ltr">Next.js</span> وتقنيات متطورة للحصول على أفضل أداء وتجربة مستخدم.',
    tr: 'React, Next.js ve son teknoloji ile modern, duyarlı web siteleri optimal performans ve kullanıcı deneyimi için.',
    it: 'Siti web moderni e responsive costruiti con React, Next.js e tecnologie all\'avanguardia per prestazioni e esperienza utente ottimali.',
    fr: 'Sites web modernes et responsives construits avec React, Next.js et des technologies de pointe pour des performances et une expérience utilisateur optimales.',
    de: 'Moderne, responsive Websites mit React, Next.js und modernsten Technologien für optimale Leistung und Benutzererfahrung.'
  },
  { 
    key: 'mobileDevelopment', 
    en: 'Mobile Development',
    ar: 'تطوير التطبيقات المحمولة',
    tr: 'Mobil Geliştirme',
    it: 'Sviluppo Mobile',
    fr: 'Développement Mobile',
    de: 'Mobile Entwicklung'
  },
  { 
    key: 'mobileDevelopmentDesc', 
    en: 'Cross-platform mobile applications using Flutter and React Native, delivering native performance across iOS and Android devices.',
    ar: 'تطبيقات محمولة متعددة المنصات باستخدام <span dir="ltr">Flutter</span> و <span dir="ltr">React Native</span>، توفر أداءً أصلياً عبر أجهزة <span dir="ltr">iOS</span> و <span dir="ltr">Android</span>.',
    tr: 'Flutter ve React Native kullanarak çapraz platform mobil uygulamalar, iOS ve Android cihazlarda yerel performans sunar.',
    it: 'Applicazioni mobili multipiattaforma utilizzando Flutter e React Native, offrendo prestazioni native su dispositivi iOS e Android.',
    fr: 'Applications mobiles multiplateformes utilisant Flutter et React Native, offrant des performances natives sur les appareils iOS et Android.',
    de: 'Plattformübergreifende mobile Anwendungen mit Flutter und React Native, die native Leistung auf iOS- und Android-Geräten bieten.'
  },
  { 
    key: 'dataEngineering', 
    en: 'Data Engineering',
    ar: 'هندسة البيانات',
    tr: 'Veri Mühendisliği',
    it: 'Ingegneria dei Dati',
    fr: 'Ingénierie des Données',
    de: 'Datenverarbeitung'
  },
  { 
    key: 'dataEngineeringDesc', 
    en: 'Robust ETL pipelines, data warehousing solutions, and analytics platforms using Python, SQL, and cloud technologies.',
    ar: 'خطوط أنابيب <span dir="ltr">ETL</span> قوية وحلول مستودعات البيانات ومنصات التحليلات باستخدام <span dir="ltr">Python</span> و <span dir="ltr">SQL</span> وتقنيات السحابة.',
    tr: 'Python, SQL ve bulut teknolojileri kullanarak sağlam ETL pipeline\'ları, veri ambarı çözümleri ve analitik platformları.',
    it: 'Pipeline ETL robusti, soluzioni di data warehousing e piattaforme analitiche utilizzando Python, SQL e tecnologie cloud.',
    fr: 'Pipelines ETL robustes, solutions de data warehousing et plateformes d\'analyse utilisant Python, SQL et technologies cloud.',
    de: 'Robuste ETL-Pipelines, Data-Warehousing-Lösungen und Analytics-Plattformen mit Python, SQL und Cloud-Technologien.'
  },
  { 
    key: 'cloudSolutions', 
    en: 'Cloud Solutions',
    ar: 'الحلول السحابية',
    tr: 'Bulut Çözümleri',
    it: 'Soluzioni Cloud',
    fr: 'Solutions Cloud',
    de: 'Cloud-Lösungen'
  },
  { 
    key: 'cloudSolutionsDesc', 
    en: 'Scalable cloud infrastructure, serverless applications, and automated deployments using AWS, Firebase, and modern DevOps practices.',
    ar: 'بنية تحتية سحابية قابلة للتوسع وتطبيقات خادم أقل ونشر مؤتمت باستخدام <span dir="ltr">AWS</span> و <span dir="ltr">Firebase</span> وممارسات <span dir="ltr">DevOps</span> حديثة.',
    tr: 'AWS, Firebase ve modern DevOps uygulamaları kullanarak ölçeklenebilir bulut altyapısı, sunucusuz uygulamalar ve otomatik dağıtımlar.',
    it: 'Infrastruttura cloud scalabile, applicazioni serverless e deployment automatizzati utilizzando AWS, Firebase e pratiche DevOps moderne.',
    fr: 'Infrastructure cloud évolutive, applications serverless et déploiements automatisés utilisant AWS, Firebase et des pratiques DevOps modernes.',
    de: 'Skalierbare Cloud-Infrastruktur, serverlose Anwendungen und automatisierte Bereitstellungen mit AWS, Firebase und modernen DevOps-Praktiken.'
  }
];

async function fixServicesTranslations() {
  console.log('Fixing services translations with proper RTL/LTR handling...');
  
  for (const translation of servicesTranslations) {
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
  
  console.log('✅ All services translations fixed successfully!');
}

fixServicesTranslations();
