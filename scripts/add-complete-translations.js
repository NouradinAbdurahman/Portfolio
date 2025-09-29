require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing required environment variables: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// Complete translation keys with all languages
const completeTranslations = [
  // Hero section
  { 
    key: 'hero.title', 
    en: 'Software Engineer • Full-Stack Developer • Data Engineer',
    ar: 'مهندس برمجيات • مطور Full-Stack • مهندس بيانات',
    tr: 'Yazılım Mühendisi • Full-Stack Geliştirici • Veri Mühendisi',
    it: 'Ingegnere del Software • Sviluppatore Full-Stack • Ingegnere dei Dati',
    fr: 'Ingénieur Logiciel • Développeur Full-Stack • Ingénieur de Données',
    de: 'Software-Ingenieur • Full-Stack-Entwickler • Daten-Ingenieur'
  },
  { 
    key: 'hero.subtitle', 
    en: 'Building scalable applications, cloud-driven systems, and data-powered solutions. Passionate about creating efficient ETL pipelines, modern web experiences, and automated workflows.',
    ar: 'بناء تطبيقات قابلة للتوسع، وأنظمة مدفوعة بالحوسبة السحابية، وحلول مدعومة بالبيانات. شغوف بإنشاء خطوط أنابيب ETL فعالة، وتجارب ويب حديثة، وسير عمل مؤتمتة.',
    tr: 'Ölçeklenebilir uygulamalar, bulut tabanlı sistemler ve veri destekli çözümler geliştiriyorum. Verimli ETL pipeline\'ları, modern web deneyimleri ve otomatik iş akışları oluşturmaya tutkulu.',
    it: 'Costruisco applicazioni scalabili, sistemi cloud-driven e soluzioni basate sui dati. Appassionato di creare pipeline ETL efficienti, esperienze web moderne e flussi di lavoro automatizzati.',
    fr: 'Je construis des applications évolutives, des systèmes basés sur le cloud et des solutions alimentées par les données. Passionné par la création de pipelines ETL efficaces, d\'expériences web modernes et de flux de travail automatisés.',
    de: 'Ich entwickle skalierbare Anwendungen, cloud-gesteuerte Systeme und datengetriebene Lösungen. Leidenschaftlich für die Erstellung effizienter ETL-Pipelines, moderner Web-Erfahrungen und automatisierter Workflows.'
  },
  { 
    key: 'hero.ctaPrimaryLabel', 
    en: 'View My LinkedIn',
    ar: 'عرض LinkedIn الخاص بي',
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
    fr: 'Me Contacter',
    de: 'Kontaktieren Sie mich'
  },

  // About section
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
    de: 'Nouraddin - Software Engineering Student und Entwickler'
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
    de: 'Software Engineering Student und Entwickler'
  },
  { 
    key: 'about.body', 
    en: "Hi, I'm Nouraddin! Currently pursuing Software Engineering at OSTİM Teknik University, I specialize in building scalable applications and data-driven solutions. My passion lies in creating efficient systems that bridge the gap between complex data and user-friendly interfaces.",
    ar: "مرحباً، أنا نور الدين! أتابع حالياً دراسة هندسة البرمجيات في جامعة أوستيم التقنية، أتخصص في بناء التطبيقات القابلة للتوسع والحلول المدعومة بالبيانات. شغفي يكمن في إنشاء أنظمة فعالة تربط بين البيانات المعقدة والواجهات سهلة الاستخدام.",
    tr: "Merhaba, ben Nouraddin! Şu anda OSTİM Teknik Üniversitesi'nde Yazılım Mühendisliği okuyorum, ölçeklenebilir uygulamalar ve veri destekli çözümler geliştirmede uzmanlaşıyorum. Tutkum, karmaşık veriler ile kullanıcı dostu arayüzler arasındaki boşluğu kapatan verimli sistemler yaratmaktadır.",
    it: "Ciao, sono Nouraddin! Attualmente studio Ingegneria del Software all'Università Tecnica OSTİM, mi specializzo nella costruzione di applicazioni scalabili e soluzioni basate sui dati. La mia passione è creare sistemi efficienti che colmano il divario tra dati complessi e interfacce user-friendly.",
    fr: "Salut, je suis Nouraddin ! Actuellement en Génie Logiciel à l'Université Technique OSTİM, je me spécialise dans la construction d'applications évolutives et de solutions basées sur les données. Ma passion réside dans la création de systèmes efficaces qui comblent l'écart entre les données complexes et les interfaces conviviales.",
    de: "Hallo, ich bin Nouraddin! Derzeit studiere ich Software Engineering an der OSTİM Technischen Universität, ich spezialisiere mich auf den Aufbau skalierbarer Anwendungen und datengetriebener Lösungen. Meine Leidenschaft liegt darin, effiziente Systeme zu schaffen, die die Lücke zwischen komplexen Daten und benutzerfreundlichen Schnittstellen schließen."
  },
  { 
    key: 'about.fullstackExpertise', 
    en: 'Proficient in React, Next.js, Flutter, and modern web technologies for creating responsive, performant applications.',
    ar: 'متمكن في React و Next.js و Flutter وتقنيات الويب الحديثة لإنشاء تطبيقات سريعة الاستجابة وعالية الأداء.',
    tr: 'React, Next.js, Flutter ve modern web teknolojilerinde yetkin, duyarlı ve performanslı uygulamalar oluşturmak için.',
    it: 'Competente in React, Next.js, Flutter e tecnologie web moderne per creare applicazioni responsive e performanti.',
    fr: 'Compétent en React, Next.js, Flutter et technologies web modernes pour créer des applications réactives et performantes.',
    de: 'Bewandert in React, Next.js, Flutter und modernen Web-Technologien zur Erstellung responsiver, leistungsstarker Anwendungen.'
  },
  { 
    key: 'about.dataEngineering', 
    en: 'Experienced in ETL pipeline development, SQL optimization, and cloud-based data processing solutions.',
    ar: 'خبير في تطوير خطوط أنابيب ETL وتحسين SQL وحلول معالجة البيانات السحابية.',
    tr: 'ETL pipeline geliştirme, SQL optimizasyonu ve bulut tabanlı veri işleme çözümlerinde deneyimli.',
    it: 'Esperto nello sviluppo di pipeline ETL, ottimizzazione SQL e soluzioni di elaborazione dati basate su cloud.',
    fr: 'Expérimenté dans le développement de pipelines ETL, l\'optimisation SQL et les solutions de traitement de données basées sur le cloud.',
    de: 'Erfahren in der Entwicklung von ETL-Pipelines, SQL-Optimierung und cloud-basierten Datenverarbeitungslösungen.'
  },
  { 
    key: 'about.cloudAutomation', 
    en: 'Skilled in AWS, Firebase, and building automated workflows that scale with business needs.',
    ar: 'ماهر في AWS و Firebase وبناء سير العمل المؤتمتة التي تتوسع مع احتياجات الأعمال.',
    tr: 'AWS, Firebase ve iş ihtiyaçlarıyla ölçeklenen otomatik iş akışları oluşturmada yetenekli.',
    it: 'Abile in AWS, Firebase e nella costruzione di flussi di lavoro automatizzati che si adattano alle esigenze aziendali.',
    fr: 'Compétent en AWS, Firebase et dans la construction de flux de travail automatisés qui s\'adaptent aux besoins de l\'entreprise.',
    de: 'Geschickt in AWS, Firebase und dem Aufbau automatisierter Workflows, die mit den Geschäftsanforderungen skalieren.'
  },
  { 
    key: 'about.fullstackExpertiseHeader', 
    en: 'Full-Stack Development:',
    ar: 'تطوير Full-Stack:',
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
    de: 'Datenengineering:'
  },
  { 
    key: 'about.cloudAutomationHeader', 
    en: 'Cloud & Automation:',
    ar: 'السحابة والأتمتة:',
    tr: 'Bulut ve Otomasyon:',
    it: 'Cloud e Automazione:',
    fr: 'Cloud et Automatisation:',
    de: 'Cloud & Automatisierung:'
  },

  // Projects section
  { 
    key: 'projects.title', 
    en: 'Featured Projects',
    ar: 'المشاريع المميزة',
    tr: 'Öne Çıkan Projeler',
    it: 'Progetti in Evidenza',
    fr: 'Projets en Vedette',
    de: 'Ausgewählte Projekte'
  },
  { 
    key: 'projects.subtitle', 
    en: 'A showcase of my recent work and side projects',
    ar: 'عرض لأعمالي الأخيرة ومشاريعي الجانبية',
    tr: 'Son çalışmalarımın ve yan projelerimin vitrin',
    it: 'Una vetrina dei miei lavori recenti e progetti collaterali',
    fr: 'Une vitrine de mes travaux récents et projets secondaires',
    de: 'Eine Showcase meiner neuesten Arbeiten und Nebenprojekte'
  },
  { 
    key: 'projects.allProjects', 
    en: 'View All Projects',
    ar: 'عرض جميع المشاريع',
    tr: 'Tüm Projeleri Görüntüle',
    it: 'Visualizza Tutti i Progetti',
    fr: 'Voir Tous les Projets',
    de: 'Alle Projekte Anzeigen'
  }
];

async function addCompleteTranslations() {
  console.log('Adding complete translations to Supabase...');
  
  try {
    for (const translation of completeTranslations) {
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
    
    console.log('✅ All complete translations added successfully!');
  } catch (error) {
    console.error('Error adding complete translations:', error);
  }
}

addCompleteTranslations();
