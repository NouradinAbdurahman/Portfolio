require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const comprehensiveTranslations = [
  // Navigation translations
  { 
    key: 'navigation.about', 
    en: 'About',
    ar: 'نبذة عني',
    tr: 'Hakkımda',
    it: 'Chi Sono',
    fr: 'À Propos',
    de: 'Über Mich'
  },
  { 
    key: 'navigation.projects', 
    en: 'Projects',
    ar: 'المشاريع',
    tr: 'Projeler',
    it: 'Progetti',
    fr: 'Projets',
    de: 'Projekte'
  },
  { 
    key: 'navigation.services', 
    en: 'Services',
    ar: 'الخدمات',
    tr: 'Hizmetler',
    it: 'Servizi',
    fr: 'Services',
    de: 'Dienstleistungen'
  },
  { 
    key: 'navigation.contact', 
    en: 'Contact',
    ar: 'تواصل معي',
    tr: 'İletişim',
    it: 'Contatto',
    fr: 'Contact',
    de: 'Kontakt'
  },
  { 
    key: 'navigation.resume', 
    en: 'Resume',
    ar: 'السيرة الذاتية',
    tr: 'Özgeçmiş',
    it: 'Curriculum',
    fr: 'CV',
    de: 'Lebenslauf'
  },

  // Resume section translations
  { 
    key: 'resume.title', 
    en: 'Resume',
    ar: 'السيرة الذاتية',
    tr: 'Özgeçmiş',
    it: 'Curriculum',
    fr: 'CV',
    de: 'Lebenslauf'
  },
  { 
    key: 'resume.subtitle', 
    en: 'My professional journey and achievements',
    ar: 'رحلتي المهنية وإنجازاتي',
    tr: 'Profesyonel yolculuğum ve başarılarım',
    it: 'Il mio percorso professionale e i miei successi',
    fr: 'Mon parcours professionnel et mes réalisations',
    de: 'Mein beruflicher Werdegang und meine Erfolge'
  },
  { 
    key: 'resume.downloadResume', 
    en: 'Download Resume',
    ar: 'تحميل السيرة الذاتية',
    tr: 'Özgeçmişi İndir',
    it: 'Scarica Curriculum',
    fr: 'Télécharger CV',
    de: 'Lebenslauf Herunterladen'
  },
  { 
    key: 'resume.education.title', 
    en: 'Education',
    ar: 'التعليم',
    tr: 'Eğitim',
    it: 'Istruzione',
    fr: 'Éducation',
    de: 'Bildung'
  },
  { 
    key: 'resume.educationDetails.bachelor.degree', 
    en: 'Bachelor of Science in Software Engineering',
    ar: 'بكالوريوس في هندسة البرمجيات',
    tr: 'Yazılım Mühendisliği Lisans Derecesi',
    it: 'Laurea in Ingegneria del Software',
    fr: 'Licence en Génie Logiciel',
    de: 'Bachelor in Software-Engineering'
  },
  { 
    key: 'resume.educationDetails.bachelor.school', 
    en: 'OSTİM Technical University',
    ar: 'جامعة أوستيم التقنية',
    tr: 'OSTİM Teknik Üniversitesi',
    it: 'Università Tecnica OSTİM',
    fr: 'Université Technique OSTİM',
    de: 'OSTİM Technische Universität'
  },
  { 
    key: 'resume.educationDetails.bachelor.date', 
    en: '2022 - Present',
    ar: '2022 - حتى الآن',
    tr: '2022 - Devam Ediyor',
    it: '2022 - Presente',
    fr: '2022 - Présent',
    de: '2022 - Gegenwart'
  },
  { 
    key: 'resume.educationDetails.bachelor.location', 
    en: 'Ankara, Turkey',
    ar: 'أنقرة، تركيا',
    tr: 'Ankara, Türkiye',
    it: 'Ankara, Turchia',
    fr: 'Ankara, Turquie',
    de: 'Ankara, Türkei'
  },
  { 
    key: 'resume.educationDetails.bachelor.description', 
    en: 'Specializing in full-stack development, data engineering, and cloud technologies.',
    ar: 'متخصص في التطوير المتكامل وهندسة البيانات وتقنيات السحابة.',
    tr: 'Full-stack geliştirme, veri mühendisliği ve bulut teknolojilerinde uzmanlaşıyor.',
    it: 'Specializzato in sviluppo full-stack, ingegneria dei dati e tecnologie cloud.',
    fr: 'Spécialisé dans le développement full-stack, l\'ingénierie des données et les technologies cloud.',
    de: 'Spezialisiert auf Full-Stack-Entwicklung, Datenverarbeitung und Cloud-Technologien.'
  },
  { 
    key: 'resume.educationDetails.highSchool.degree', 
    en: 'High School Diploma',
    ar: 'شهادة الثانوية العامة',
    tr: 'Lise Diploması',
    it: 'Diploma di Scuola Superiore',
    fr: 'Diplôme d\'Études Secondaires',
    de: 'Abitur'
  },
  { 
    key: 'resume.educationDetails.highSchool.school', 
    en: 'Al-Noor International School',
    ar: 'مدرسة النور الدولية',
    tr: 'Al-Noor Uluslararası Okulu',
    it: 'Scuola Internazionale Al-Noor',
    fr: 'École Internationale Al-Noor',
    de: 'Al-Noor Internationale Schule'
  },
  { 
    key: 'resume.educationDetails.highSchool.date', 
    en: '2018 - 2022',
    ar: '2018 - 2022',
    tr: '2018 - 2022',
    it: '2018 - 2022',
    fr: '2018 - 2022',
    de: '2018 - 2022'
  },
  { 
    key: 'resume.educationDetails.highSchool.location', 
    en: 'Doha, Qatar',
    ar: 'الدوحة، قطر',
    tr: 'Doha, Katar',
    it: 'Doha, Qatar',
    fr: 'Doha, Qatar',
    de: 'Doha, Katar'
  },
  { 
    key: 'resume.educationDetails.highSchool.description', 
    en: 'Graduated with honors, focusing on mathematics and computer science.',
    ar: 'تخرجت بامتياز، مع التركيز على الرياضيات وعلوم الحاسوب.',
    tr: 'Matematik ve bilgisayar bilimlerine odaklanarak onur derecesiyle mezun oldu.',
    it: 'Laureato con lode, concentrandosi su matematica e informatica.',
    fr: 'Diplômé avec mention, en se concentrant sur les mathématiques et l\'informatique.',
    de: 'Mit Auszeichnung abgeschlossen, mit Schwerpunkt auf Mathematik und Informatik.'
  },

  // Certifications
  { 
    key: 'resume.certifications.title', 
    en: 'Certifications',
    ar: 'الشهادات',
    tr: 'Sertifikalar',
    it: 'Certificazioni',
    fr: 'Certifications',
    de: 'Zertifizierungen'
  },
  { 
    key: 'resume.certificationDetails.dataEngineer.title', 
    en: 'Data Engineer Professional Certificate',
    ar: 'شهادة مهندس بيانات محترف',
    tr: 'Veri Mühendisi Profesyonel Sertifikası',
    it: 'Certificato Professionale di Ingegnere dei Dati',
    fr: 'Certificat Professionnel d\'Ingénieur de Données',
    de: 'Professionelles Zertifikat für Datenverarbeitung'
  },
  { 
    key: 'resume.certificationDetails.dataEngineer.issuer', 
    en: 'DataCamp',
    ar: '<span dir="ltr">DataCamp</span>',
    tr: 'DataCamp',
    it: 'DataCamp',
    fr: 'DataCamp',
    de: 'DataCamp'
  },
  { 
    key: 'resume.certificationDetails.dataEngineer.date', 
    en: '2024',
    ar: '2024',
    tr: '2024',
    it: '2024',
    fr: '2024',
    de: '2024'
  },
  { 
    key: 'resume.certificationDetails.dataScientist.title', 
    en: 'Data Scientist Professional Certificate',
    ar: 'شهادة عالم بيانات محترف',
    tr: 'Veri Bilimci Profesyonel Sertifikası',
    it: 'Certificato Professionale di Scienziato dei Dati',
    fr: 'Certificat Professionnel de Scientifique des Données',
    de: 'Professionelles Zertifikat für Datenwissenschaftler'
  },
  { 
    key: 'resume.certificationDetails.dataScientist.issuer', 
    en: 'DataCamp',
    ar: '<span dir="ltr">DataCamp</span>',
    tr: 'DataCamp',
    it: 'DataCamp',
    fr: 'DataCamp',
    de: 'DataCamp'
  },
  { 
    key: 'resume.certificationDetails.dataScientist.date', 
    en: '2024',
    ar: '2024',
    tr: '2024',
    it: '2024',
    fr: '2024',
    de: '2024'
  },
  { 
    key: 'resume.certificationDetails.dataAnalyst.title', 
    en: 'Data Analyst Professional Certificate',
    ar: 'شهادة محلل بيانات محترف',
    tr: 'Veri Analisti Profesyonel Sertifikası',
    it: 'Certificato Professionale di Analista dei Dati',
    fr: 'Certificat Professionnel d\'Analyste de Données',
    de: 'Professionelles Zertifikat für Datenanalyst'
  },
  { 
    key: 'resume.certificationDetails.dataAnalyst.issuer', 
    en: 'DataCamp',
    ar: '<span dir="ltr">DataCamp</span>',
    tr: 'DataCamp',
    it: 'DataCamp',
    fr: 'DataCamp',
    de: 'DataCamp'
  },
  { 
    key: 'resume.certificationDetails.dataAnalyst.date', 
    en: '2024',
    ar: '2024',
    tr: '2024',
    it: '2024',
    fr: '2024',
    de: '2024'
  },

  // Experience
  { 
    key: 'resume.experience.title', 
    en: 'Experience',
    ar: 'الخبرة',
    tr: 'Deneyim',
    it: 'Esperienza',
    fr: 'Expérience',
    de: 'Erfahrung'
  },
  { 
    key: 'resume.experienceDetails.fullStack.role', 
    en: 'Full-Stack Developer',
    ar: 'مطور متكامل',
    tr: 'Full-Stack Geliştirici',
    it: 'Sviluppatore Full-Stack',
    fr: 'Développeur Full-Stack',
    de: 'Full-Stack-Entwickler'
  },
  { 
    key: 'resume.experienceDetails.fullStack.company', 
    en: 'Freelance',
    ar: 'مستقل',
    tr: 'Serbest',
    it: 'Freelance',
    fr: 'Freelance',
    de: 'Freiberuflich'
  },
  { 
    key: 'resume.experienceDetails.fullStack.employmentType', 
    en: 'Self-Employed',
    ar: 'العمل الحر',
    tr: 'Kendi İşi',
    it: 'Autonomo',
    fr: 'Indépendant',
    de: 'Selbstständig'
  },
  { 
    key: 'resume.experienceDetails.fullStack.date', 
    en: '2022 - Present',
    ar: '2022 - حتى الآن',
    tr: '2022 - Devam Ediyor',
    it: '2022 - Presente',
    fr: '2022 - Présent',
    de: '2022 - Gegenwart'
  },
  { 
    key: 'resume.experienceDetails.fullStack.location', 
    en: 'Remote',
    ar: 'عن بُعد',
    tr: 'Uzaktan',
    it: 'Remoto',
    fr: 'À Distance',
    de: 'Remote'
  },
  { 
    key: 'resume.experienceDetails.fullStack.summary', 
    en: 'Developing modern web applications using <span dir="ltr">React</span>, <span dir="ltr">Next.js</span>, and <span dir="ltr">Node.js</span>. Building scalable backend systems and creating responsive user interfaces.',
    ar: 'تطوير تطبيقات ويب حديثة باستخدام <span dir="ltr">React</span> و <span dir="ltr">Next.js</span> و <span dir="ltr">Node.js</span>. بناء أنظمة خوادم قابلة للتوسع وإنشاء واجهات مستخدم متجاوبة.',
    tr: '<span dir="ltr">React</span>, <span dir="ltr">Next.js</span> ve <span dir="ltr">Node.js</span> kullanarak modern web uygulamaları geliştiriyorum. Ölçeklenebilir backend sistemleri oluşturuyorum ve duyarlı kullanıcı arayüzleri tasarlıyorum.',
    it: 'Sviluppo applicazioni web moderne utilizzando <span dir="ltr">React</span>, <span dir="ltr">Next.js</span> e <span dir="ltr">Node.js</span>. Costruisco sistemi backend scalabili e creo interfacce utente responsive.',
    fr: 'Développement d\'applications web modernes avec <span dir="ltr">React</span>, <span dir="ltr">Next.js</span> et <span dir="ltr">Node.js</span>. Construction de systèmes backend évolutifs et création d\'interfaces utilisateur réactives.',
    de: 'Entwicklung moderner Webanwendungen mit <span dir="ltr">React</span>, <span dir="ltr">Next.js</span> und <span dir="ltr">Node.js</span>. Aufbau skalierbarer Backend-Systeme und Erstellung responsiver Benutzeroberflächen.'
  },

  // Technical Skills
  { 
    key: 'resume.technicalSkills.title', 
    en: 'Technical Skills',
    ar: 'المهارات التقنية',
    tr: 'Teknik Beceriler',
    it: 'Competenze Tecniche',
    fr: 'Compétences Techniques',
    de: 'Technische Fähigkeiten'
  },
  { 
    key: 'resume.technicalSkills.languages', 
    en: 'Programming Languages',
    ar: 'لغات البرمجة',
    tr: 'Programlama Dilleri',
    it: 'Linguaggi di Programmazione',
    fr: 'Langages de Programmation',
    de: 'Programmiersprachen'
  },
  { 
    key: 'resume.technicalSkills.frameworks', 
    en: 'Frameworks & Libraries',
    ar: 'الأطر والمكتبات',
    tr: 'Framework\'ler ve Kütüphaneler',
    it: 'Framework e Librerie',
    fr: 'Frameworks et Bibliothèques',
    de: 'Frameworks und Bibliotheken'
  },
  { 
    key: 'resume.technicalSkills.tools', 
    en: 'Tools & Technologies',
    ar: 'الأدوات والتقنيات',
    tr: 'Araçlar ve Teknolojiler',
    it: 'Strumenti e Tecnologie',
    fr: 'Outils et Technologies',
    de: 'Werkzeuge und Technologien'
  },

  // Project details page
  { 
    key: 'projects.backToProjects', 
    en: 'Back to Projects',
    ar: 'العودة إلى المشاريع',
    tr: 'Projelere Dön',
    it: 'Torna ai Progetti',
    fr: 'Retour aux Projets',
    de: 'Zurück zu den Projekten'
  },
  { 
    key: 'projects.viewLive', 
    en: 'View Live',
    ar: 'عرض مباشر',
    tr: 'Canlı Görüntüle',
    it: 'Visualizza Live',
    fr: 'Voir en Direct',
    de: 'Live Ansehen'
  },
  { 
    key: 'projects.viewCode', 
    en: 'View Code',
    ar: 'عرض الكود',
    tr: 'Kodu Görüntüle',
    it: 'Visualizza Codice',
    fr: 'Voir le Code',
    de: 'Code Ansehen'
  },
  { 
    key: 'projects.technologies', 
    en: 'Technologies Used',
    ar: 'التقنيات المستخدمة',
    tr: 'Kullanılan Teknolojiler',
    it: 'Tecnologie Utilizzate',
    fr: 'Technologies Utilisées',
    de: 'Verwendete Technologien'
  },
  { 
    key: 'projects.features', 
    en: 'Key Features',
    ar: 'الميزات الرئيسية',
    tr: 'Ana Özellikler',
    it: 'Caratteristiche Principali',
    fr: 'Fonctionnalités Clés',
    de: 'Hauptfunktionen'
  },
  { 
    key: 'projects.challenges', 
    en: 'Challenges & Solutions',
    ar: 'التحديات والحلول',
    tr: 'Zorluklar ve Çözümler',
    it: 'Sfide e Soluzioni',
    fr: 'Défis et Solutions',
    de: 'Herausforderungen und Lösungen'
  },
  { 
    key: 'projects.learnings', 
    en: 'Key Learnings',
    ar: 'التعلمات الرئيسية',
    tr: 'Ana Öğrenimler',
    it: 'Apprendimenti Chiave',
    fr: 'Apprentissages Clés',
    de: 'Hauptlernpunkte'
  }
];

async function updateComprehensiveTranslations() {
  console.log('Updating comprehensive RTL/LTR translations...');
  
  for (const translation of comprehensiveTranslations) {
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
  
  console.log('✅ All comprehensive translations updated successfully!');
}

updateComprehensiveTranslations();
