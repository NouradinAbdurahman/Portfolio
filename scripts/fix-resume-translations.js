require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const resumeTranslations = [
  // Resume main section
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

  // Education section
  { 
    key: 'resume.education.title', 
    en: 'Education',
    ar: 'التعليم الأكاديمي',
    tr: 'Eğitim',
    it: 'Istruzione',
    fr: 'Éducation',
    de: 'Bildung'
  },
  { 
    key: 'resume.educationDetails.bachelor.degree', 
    en: 'Bachelor of Science in Software Engineering',
    ar: 'بكالوريوس في <span dir="ltr">Software Engineering</span>',
    tr: 'Yazılım Mühendisliği Lisans',
    it: 'Laurea in Ingegneria del Software',
    fr: 'Licence en Génie Logiciel',
    de: 'Bachelor in Softwaretechnik'
  },
  { 
    key: 'resume.educationDetails.bachelor.school', 
    en: 'Ostim Technical University',
    ar: 'جامعة <span dir="ltr">Ostim</span> التقنية',
    tr: 'Ostim Teknik Üniversitesi',
    it: 'Università Tecnica Ostim',
    fr: 'Université Technique Ostim',
    de: 'Ostim Technische Universität'
  },
  { 
    key: 'resume.educationDetails.bachelor.date', 
    en: 'September 2022 - June 2026',
    ar: 'سبتمبر 2022 - يونيو 2026',
    tr: 'Eylül 2022 - Haziran 2026',
    it: 'Settembre 2022 - Giugno 2026',
    fr: 'Septembre 2022 - Juin 2026',
    de: 'September 2022 - Juni 2026'
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
    en: 'Comprehensive study in Python, C, web development, databases, data extraction, project management, JavaScript, SQL, machine learning, Java, and C++ programming.',
    ar: 'دراسة شاملة في <span dir="ltr">Python</span> و <span dir="ltr">C</span> وتطوير المواقع وقواعد البيانات واستخراج البيانات وإدارة المشاريع و <span dir="ltr">JavaScript</span> و <span dir="ltr">SQL</span> والتعلم الآلي و <span dir="ltr">Java</span> وبرمجة <span dir="ltr">C++</span>.',
    tr: 'Python, C, web geliştirme, veritabanları, veri çıkarma, proje yönetimi, JavaScript, SQL, makine öğrenmesi, Java ve C++ programlama konularında kapsamlı eğitim.',
    it: 'Studio completo in Python, C, sviluppo web, database, estrazione dati, gestione progetti, JavaScript, SQL, machine learning, Java e programmazione C++.',
    fr: 'Étude complète en Python, C, développement web, bases de données, extraction de données, gestion de projet, JavaScript, SQL, apprentissage automatique, Java et programmation C++.',
    de: 'Umfassendes Studium in Python, C, Webentwicklung, Datenbanken, Datenextraktion, Projektmanagement, JavaScript, SQL, maschinelles Lernen, Java und C++ Programmierung.'
  },
  { 
    key: 'resume.educationDetails.highSchool.degree', 
    en: 'High School Diploma, Information Technology - Engineering',
    ar: 'دبلوم المدرسة الثانوية، تقنية المعلومات - الهندسة',
    tr: 'Lise Diploması, Bilişim Teknolojileri - Mühendislik',
    it: 'Diploma di Scuola Superiore, Tecnologie Informatiche - Ingegneria',
    fr: 'Diplôme d\'Études Secondaires, Technologies de l\'Information - Ingénierie',
    de: 'Abitur, Informationstechnologie - Ingenieurwesen'
  },
  { 
    key: 'resume.educationDetails.highSchool.school', 
    en: 'Omar Bin Al-Khattab Independent Secondary School for Boys',
    ar: 'مدرسة <span dir="ltr">Omar Bin Al-Khattab</span> الثانوية المستقلة للبنين',
    tr: 'Omar Bin Al-Khattab Bağımsız Erkek Lisesi',
    it: 'Scuola Secondaria Indipendente Omar Bin Al-Khattab per Ragazzi',
    fr: 'École Secondaire Indépendante Omar Bin Al-Khattab pour Garçons',
    de: 'Omar Bin Al-Khattab Unabhängige Sekundarschule für Jungen'
  },
  { 
    key: 'resume.educationDetails.highSchool.date', 
    en: 'September 2018 - June 2021',
    ar: 'سبتمبر 2018 - يونيو 2021',
    tr: 'Eylül 2018 - Haziran 2021',
    it: 'Settembre 2018 - Giugno 2021',
    fr: 'Septembre 2018 - Juin 2021',
    de: 'September 2018 - Juni 2021'
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
    en: 'Fundamentals in HTML, Python, JavaScript, information technology, and CSS programming.',
    ar: 'أساسيات <span dir="ltr">HTML</span> و <span dir="ltr">Python</span> و <span dir="ltr">JavaScript</span> وتقنية المعلومات وبرمجة <span dir="ltr">CSS</span>.',
    tr: 'HTML, Python, JavaScript, bilişim teknolojileri ve CSS programlama temelleri.',
    it: 'Fondamenti di HTML, Python, JavaScript, tecnologie informatiche e programmazione CSS.',
    fr: 'Fondamentaux en HTML, Python, JavaScript, technologies de l\'information et programmation CSS.',
    de: 'Grundlagen in HTML, Python, JavaScript, Informationstechnologie und CSS Programmierung.'
  },

  // Experience section
  { 
    key: 'resume.experience.title', 
    en: 'Work Experience',
    ar: 'الخبرة العملية',
    tr: 'İş Deneyimi',
    it: 'Esperienza Lavorativa',
    fr: 'Expérience Professionnelle',
    de: 'Berufserfahrung'
  },
  { 
    key: 'resume.experienceDetails.fullStack.role', 
    en: 'Full-stack Developer',
    ar: 'مطور متكامل',
    tr: 'Full-stack Geliştirici',
    it: 'Sviluppatore Full-stack',
    fr: 'Développeur Full-stack',
    de: 'Full-stack Entwickler'
  },
  { 
    key: 'resume.experienceDetails.fullStack.company', 
    en: 'DAKAEI AI',
    ar: '<span dir="ltr">DAKAEI AI</span>',
    tr: 'DAKAEI AI',
    it: 'DAKAEI AI',
    fr: 'DAKAEI AI',
    de: 'DAKAEI AI'
  },
  { 
    key: 'resume.experienceDetails.fullStack.employmentType', 
    en: 'Full-time',
    ar: 'دوام كامل',
    tr: 'Tam Zamanlı',
    it: 'Tempo Pieno',
    fr: 'Temps Plein',
    de: 'Vollzeit'
  },
  { 
    key: 'resume.experienceDetails.fullStack.date', 
    en: 'April 2025 - Present',
    ar: 'أبريل 2025 - الحاضر',
    tr: 'Nisan 2025 - Şu An',
    it: 'Aprile 2025 - Presente',
    fr: 'Avril 2025 - Présent',
    de: 'April 2025 - Gegenwart'
  },
  { 
    key: 'resume.experienceDetails.fullStack.location', 
    en: 'London area, United Kingdom - Remote',
    ar: 'منطقة لندن، المملكة المتحدة - عن بعد',
    tr: 'Londra bölgesi, Birleşik Krallık - Uzaktan',
    it: 'Area di Londra, Regno Unito - Remoto',
    fr: 'Région de Londres, Royaume-Uni - À Distance',
    de: 'London Bereich, Vereinigtes Königreich - Remote'
  },
  { 
    key: 'resume.experienceDetails.fullStack.summary', 
    en: 'Developing full-stack applications using React.js, Next.js, Node.js, TypeScript, JavaScript, SQL, HTML, CSS, PostgreSQL databases, and Firebase.',
    ar: 'تطوير تطبيقات متكاملة باستخدام <span dir="ltr">React.js</span> و <span dir="ltr">Next.js</span> و <span dir="ltr">Node.js</span> و <span dir="ltr">TypeScript</span> و <span dir="ltr">JavaScript</span> و <span dir="ltr">SQL</span> و <span dir="ltr">HTML</span> و <span dir="ltr">CSS</span> وقواعد بيانات <span dir="ltr">PostgreSQL</span> و <span dir="ltr">Firebase</span>.',
    tr: 'React.js, Next.js, Node.js, TypeScript, JavaScript, SQL, HTML, CSS, PostgreSQL veritabanları ve Firebase kullanarak full-stack uygulamalar geliştirme.',
    it: 'Sviluppo di applicazioni full-stack utilizzando React.js, Next.js, Node.js, TypeScript, JavaScript, SQL, HTML, CSS, database PostgreSQL e Firebase.',
    fr: 'Développement d\'applications full-stack utilisant React.js, Next.js, Node.js, TypeScript, JavaScript, SQL, HTML, CSS, bases de données PostgreSQL et Firebase.',
    de: 'Entwicklung von Full-stack Anwendungen mit React.js, Next.js, Node.js, TypeScript, JavaScript, SQL, HTML, CSS, PostgreSQL Datenbanken und Firebase.'
  },

  // Certifications section
  { 
    key: 'resume.certifications.title', 
    en: 'Professional Certifications',
    ar: 'الشهادات المهنية',
    tr: 'Profesyonel Sertifikalar',
    it: 'Certificazioni Professionali',
    fr: 'Certifications Professionnelles',
    de: 'Berufliche Zertifizierungen'
  },
  { 
    key: 'resume.certificationDetails.dataEngineer.title', 
    en: 'Associate Data Engineer in SQL',
    ar: 'مهندس بيانات مساعد في <span dir="ltr">SQL</span>',
    tr: 'SQL\'de Yardımcı Veri Mühendisi',
    it: 'Ingegnere Dati Associato in SQL',
    fr: 'Ingénieur Données Associé en SQL',
    de: 'Associate Dateningenieur in SQL'
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
    en: 'January 2025',
    ar: 'يناير 2025',
    tr: 'Ocak 2025',
    it: 'Gennaio 2025',
    fr: 'Janvier 2025',
    de: 'Januar 2025'
  },
  { 
    key: 'resume.certificationDetails.dataScientist.title', 
    en: 'Data Scientist in Python',
    ar: 'عالم بيانات في <span dir="ltr">Python</span>',
    tr: 'Python\'da Veri Bilimci',
    it: 'Data Scientist in Python',
    fr: 'Scientifique des Données en Python',
    de: 'Datenwissenschaftler in Python'
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
    en: 'June 2024',
    ar: 'يونيو 2024',
    tr: 'Haziran 2024',
    it: 'Giugno 2024',
    fr: 'Juin 2024',
    de: 'Juni 2024'
  },
  { 
    key: 'resume.certificationDetails.dataAnalyst.title', 
    en: 'Data Analyst in SQL',
    ar: 'محلل بيانات في <span dir="ltr">SQL</span>',
    tr: 'SQL\'de Veri Analisti',
    it: 'Analista Dati in SQL',
    fr: 'Analyste de Données en SQL',
    de: 'Datenanalyst in SQL'
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
    en: 'January 2024',
    ar: 'يناير 2024',
    tr: 'Ocak 2024',
    it: 'Gennaio 2024',
    fr: 'Janvier 2024',
    de: 'Januar 2024'
  },

  // Technical Skills section
  { 
    key: 'resume.technicalSkills.title', 
    en: 'Advanced Technical Skills',
    ar: 'المهارات التقنية المتقدمة',
    tr: 'İleri Teknik Beceriler',
    it: 'Competenze Tecniche Avanzate',
    fr: 'Compétences Techniques Avancées',
    de: 'Fortgeschrittene Technische Fähigkeiten'
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
    tr: 'Çerçeveler ve Kütüphaneler',
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
  }
];

async function addResumeTranslations() {
  console.log('Adding comprehensive resume translations with proper RTL/LTR handling...');
  
  for (const translation of resumeTranslations) {
    try {
      const { data, error } = await supabase.rpc('upsert_translation', {
        p_key: translation.key,
        p_en: translation.en,
        p_ar: translation.ar,
        p_tr: translation.tr,
        p_it: translation.it,
        p_fr: translation.fr,
        p_de: translation.de
      });

      if (error) {
        console.error(`Error adding translation for ${translation.key}:`, error);
      } else {
        console.log(`✅ Added translation for ${translation.key}`);
      }
    } catch (err) {
      console.error(`Error processing ${translation.key}:`, err);
    }
  }
  
  console.log('Resume translations update completed!');
}

addResumeTranslations().catch(console.error);
