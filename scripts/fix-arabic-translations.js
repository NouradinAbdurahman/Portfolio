require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const fixedArabicTranslations = [
  // Hero Section - Fixed with proper Arabic translations and LTR wrapping
  { 
    key: 'hero.title', 
    en: 'Software Engineer • Full-Stack Developer • Data Engineer',
    ar: 'مهندس برمجيات • مطور متكامل • مهندس بيانات',
    tr: 'Yazılım Mühendisi • Full-Stack Geliştirici • Veri Mühendisi',
    it: 'Ingegnere del Software • Sviluppatore Full-Stack • Ingegnere dei Dati',
    fr: 'Ingénieur Logiciel • Développeur Full-Stack • Ingénieur de Données',
    de: 'Software-Ingenieur • Full-Stack-Entwickler • Daten-Ingenieur'
  },
  { 
    key: 'hero.subtitle', 
    en: 'Building scalable applications, cloud-driven systems, and data-powered solutions. Passionate about creating efficient ETL pipelines, modern web experiences, and automated workflows.',
    ar: 'بناء تطبيقات قابلة للتوسع، وأنظمة مدفوعة بالحوسبة السحابية، وحلول مدعومة بالبيانات. شغوف بإنشاء خطوط أنابيب <span dir="ltr">ETL</span> فعالة، وتجارب ويب حديثة، وسير عمل مؤتمتة.',
    tr: 'Ölçeklenebilir uygulamalar, bulut tabanlı sistemler ve veri destekli çözümler oluşturuyorum. Verimli ETL pipeline\'ları, modern web deneyimleri ve otomatik iş akışları oluşturmaya tutkulu.',
    it: 'Costruisco applicazioni scalabili, sistemi basati sul cloud e soluzioni basate sui dati. Appassionato di creare pipeline ETL efficienti, esperienze web moderne e flussi di lavoro automatizzati.',
    fr: 'Je construis des applications évolutives, des systèmes basés sur le cloud et des solutions basées sur les données. Passionné par la création de pipelines ETL efficaces, d\'expériences web modernes et de flux de travail automatisés.',
    de: 'Ich entwickle skalierbare Anwendungen, cloud-basierte Systeme und datengestützte Lösungen. Leidenschaftlich für die Erstellung effizienter ETL-Pipelines, moderner Web-Erfahrungen und automatisierter Workflows.'
  },
  { 
    key: 'hero.ctaPrimaryLabel', 
    en: 'View My LinkedIn',
    ar: 'عرض <span dir="ltr">LinkedIn</span> الخاص بي',
    tr: 'LinkedIn\'imi Görüntüle',
    it: 'Visualizza il mio LinkedIn',
    fr: 'Voir mon LinkedIn',
    de: 'Mein LinkedIn anzeigen'
  },
  { 
    key: 'hero.ctaSecondaryLabel', 
    en: 'Contact Me',
    ar: 'تواصل معي',
    tr: 'Benimle İletişime Geç',
    it: 'Contattami',
    fr: 'Contactez-moi',
    de: 'Kontaktieren Sie mich'
  },

  // About Section - Fixed with proper Arabic translations
  { 
    key: 'about.title', 
    en: 'About Me',
    ar: 'نبذة عني',
    tr: 'Hakkımda',
    it: 'Chi Sono',
    fr: 'À Propos de Moi',
    de: 'Über Mich'
  },
  { 
    key: 'about.subtitle', 
    en: 'Nouraddin - Software Engineering Student & Developer',
    ar: 'نور الدين - طالب هندسة برمجيات ومطور',
    tr: 'Nouraddin - Yazılım Mühendisliği Öğrencisi ve Geliştirici',
    it: 'Nouraddin - Studente di Ingegneria del Software e Sviluppatore',
    fr: 'Nouraddin - Étudiant en Génie Logiciel et Développeur',
    de: 'Nouraddin - Software-Engineering-Student und Entwickler'
  },
  { 
    key: 'about.name', 
    en: 'Nouraddin Abdurahman Aden',
    ar: 'نور الدين عبد الرحمن عدن',
    tr: 'Nouraddin Abdurahman Aden',
    it: 'Nouraddin Abdurahman Aden',
    fr: 'Nouraddin Abdurahman Aden',
    de: 'Nouraddin Abdurahman Aden'
  },
  { 
    key: 'about.role', 
    en: 'Software Engineering Student & Developer',
    ar: 'طالب هندسة برمجيات ومطور',
    tr: 'Yazılım Mühendisliği Öğrencisi ve Geliştirici',
    it: 'Studente di Ingegneria del Software e Sviluppatore',
    fr: 'Étudiant en Génie Logiciel et Développeur',
    de: 'Software-Engineering-Student und Entwickler'
  },
  { 
    key: 'about.body', 
    en: "Hello, I'm Nouraddin! I'm currently pursuing Software Engineering at OSTİM Technical University, specializing in building scalable applications and data-powered solutions. My passion lies in creating efficient systems that bridge complex data with user-friendly interfaces.",
    ar: "مرحباً، أنا نور الدين! أدرس حالياً هندسة البرمجيات في جامعة أوستيم التقنية، متخصص في بناء التطبيقات القابلة للتوسع والحلول المدعومة بالبيانات. شغفي يكمن في إنشاء أنظمة فعالة تربط البيانات المعقدة بواجهات سهلة الاستخدام.",
    tr: "Merhaba, ben Nouraddin! Şu anda OSTİM Teknik Üniversitesi'nde Yazılım Mühendisliği okuyorum ve ölçeklenebilir uygulamalar ve veri destekli çözümler geliştirme konusunda uzmanlaşıyorum. Tutkum, karmaşık verileri kullanıcı dostu arayüzlerle birleştiren verimli sistemler oluşturmak.",
    it: "Ciao, sono Nouraddin! Attualmente sto studiando Ingegneria del Software all'Università Tecnica OSTİM, specializzandomi nella costruzione di applicazioni scalabili e soluzioni basate sui dati. La mia passione è creare sistemi efficienti che collegano dati complessi con interfacce user-friendly.",
    fr: "Bonjour, je suis Nouraddin! J'étudie actuellement le Génie Logiciel à l'Université Technique OSTİM, me spécialisant dans la construction d'applications évolutives et de solutions basées sur les données. Ma passion est de créer des systèmes efficaces qui relient des données complexes avec des interfaces conviviales.",
    de: "Hallo, ich bin Nouraddin! Ich studiere derzeit Software-Engineering an der OSTİM Technischen Universität und spezialisiere mich auf den Aufbau skalierbarer Anwendungen und datengestützter Lösungen. Meine Leidenschaft liegt darin, effiziente Systeme zu schaffen, die komplexe Daten mit benutzerfreundlichen Schnittstellen verbinden."
  },
  { 
    key: 'about.fullstackExpertise', 
    en: 'Proficient in React, Next.js, Flutter, and modern web technologies to create responsive and high-performance applications.',
    ar: 'متمكن في <span dir="ltr">React</span> و <span dir="ltr">Next.js</span> و <span dir="ltr">Flutter</span> والتقنيات الحديثة لإنشاء تطبيقات متجاوبة وعالية الأداء.',
    tr: 'React, Next.js, Flutter ve modern web teknolojilerinde uzman, duyarlı ve yüksek performanslı uygulamalar oluşturmak için.',
    it: 'Competente in React, Next.js, Flutter e tecnologie web moderne per creare applicazioni responsive e ad alte prestazioni.',
    fr: 'Compétent en React, Next.js, Flutter et technologies web modernes pour créer des applications réactives et hautes performances.',
    de: 'Erfahren in React, Next.js, Flutter und modernen Web-Technologien zur Erstellung responsiver und leistungsstarker Anwendungen.'
  },
  { 
    key: 'about.dataEngineering', 
    en: 'Expert in developing ETL pipelines, optimizing SQL, and cloud-based data processing solutions.',
    ar: 'خبير في تطوير خطوط أنابيب <span dir="ltr">ETL</span> وتحسين <span dir="ltr">SQL</span> وحلول معالجة البيانات السحابية.',
    tr: 'ETL pipeline\'ları geliştirme, SQL optimizasyonu ve bulut tabanlı veri işleme çözümlerinde uzman.',
    it: 'Esperto nello sviluppo di pipeline ETL, ottimizzazione SQL e soluzioni di elaborazione dati basate sul cloud.',
    fr: 'Expert en développement de pipelines ETL, optimisation SQL et solutions de traitement de données basées sur le cloud.',
    de: 'Experte in der Entwicklung von ETL-Pipelines, SQL-Optimierung und cloud-basierten Datenverarbeitungslösungen.'
  },
  { 
    key: 'about.cloudAutomation', 
    en: 'Skilled in AWS, Firebase, and building automated workflows that scale with business needs.',
    ar: 'ماهر في <span dir="ltr">AWS</span> و <span dir="ltr">Firebase</span> وبناء سير العمل المؤتمتة التي تتوسع مع احتياجات العمل.',
    tr: 'AWS, Firebase ve iş ihtiyaçlarıyla ölçeklenen otomatik iş akışları oluşturmada yetenekli.',
    it: 'Abile in AWS, Firebase e nella costruzione di flussi di lavoro automatizzati che si adattano alle esigenze aziendali.',
    fr: 'Compétent en AWS, Firebase et dans la construction de flux de travail automatisés qui évoluent avec les besoins de l\'entreprise.',
    de: 'Geschickt in AWS, Firebase und dem Aufbau automatisierter Workflows, die mit den Geschäftsanforderungen skalieren.'
  },
  { 
    key: 'about.fullstackExpertiseHeader', 
    en: 'Full-Stack Development:',
    ar: 'التطوير المتكامل:',
    tr: 'Full-Stack Geliştirme:',
    it: 'Sviluppo Full-Stack:',
    fr: 'Développement Full-Stack:',
    de: 'Full-Stack-Entwicklung:'
  },
  { 
    key: 'about.dataEngineeringHeader', 
    en: 'Data Engineering:',
    ar: 'هندسة البيانات:',
    tr: 'Veri Mühendisliği:',
    it: 'Ingegneria dei Dati:',
    fr: 'Ingénierie des Données:',
    de: 'Datenverarbeitung:'
  },
  { 
    key: 'about.cloudAutomationHeader', 
    en: 'Cloud & Automation:',
    ar: 'السحابة والأتمتة:',
    tr: 'Bulut ve Otomasyon:',
    it: 'Cloud e Automazione:',
    fr: 'Cloud et Automatisation:',
    de: 'Cloud und Automatisierung:'
  }
];

async function fixArabicTranslations() {
  console.log('Fixing Arabic translations with proper RTL/LTR handling...');
  
  for (const translation of fixedArabicTranslations) {
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
  
  console.log('✅ All Arabic translations fixed successfully!');
}

fixArabicTranslations();
