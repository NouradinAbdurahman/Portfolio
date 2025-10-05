/**
 * Populate Multilingual Content Script
 * Populates the database with default translations for Projects, Resume, and Contact sections
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Default content for Projects section
const projectsContent = {
  title: 'Featured Projects',
  subtitle: 'A showcase of my recent work and side projects',
  viewDetails: 'Details',
  viewRepository: 'Repository',
  viewLiveDemo: 'Live Demo'
};

// Default content for Resume section
const resumeContent = {
  title: 'Resume',
  subtitle: 'My professional journey and achievements',
  downloadResume: 'Download Resume',
  education: {
    title: 'Education'
  },
  experience: {
    title: 'Experience'
  },
  certifications: {
    title: 'Certifications'
  },
  technicalSkills: {
    title: 'Technical Skills',
    languages: 'Programming Languages',
    frameworks: 'Frameworks & Libraries',
    tools: 'Tools & Technologies'
  },
  educationDetails: {
    bachelor: {
      degree: 'Bachelor of Science in Software Engineering',
      school: 'OSTIM Technical University',
      date: '2021 - 2025',
      location: 'Ankara, Turkey',
      description: 'Focused on full-stack development, data structures, algorithms, and software engineering principles'
    },
    highSchool: {
      degree: 'High School Diploma',
      school: 'Al-Noor International School',
      date: '2017 - 2021',
      location: 'Doha, Qatar',
      description: 'Graduated with honors, focusing on mathematics and science'
    }
  },
  experienceDetails: {
    fullStack: {
      role: 'Full-Stack Developer',
      company: 'Freelance',
      employmentType: 'Contract',
      date: '2022 - Present',
      location: 'Remote',
      summary: 'Developing full-stack applications using modern technologies including React, Next.js, Node.js, and cloud platforms'
    }
  },
  certificationDetails: {
    dataEngineer: {
      title: 'Data Engineer Professional Certificate',
      issuer: 'DataCamp',
      date: '2024'
    },
    dataScientist: {
      title: 'Data Scientist Professional Certificate',
      issuer: 'DataCamp',
      date: '2024'
    },
    dataAnalyst: {
      title: 'Data Analyst Professional Certificate',
      issuer: 'DataCamp',
      date: '2024'
    }
  }
};

// Default content for Contact section
const contactContent = {
  title: 'Get In Touch',
  subtitle: "Let's discuss your next project or just say hello",
  letsConnect: "Let's Connect",
  introText: "I'm always interested in new opportunities, challenging projects, and meaningful collaborations. Whether you have a specific project in mind or just want to explore possibilities, I'd love to hear from you.",
  email: 'Email',
  phone: 'Phone',
  location: 'Location',
  firstName: 'First Name',
  lastName: 'Last Name',
  subject: 'Subject',
  message: 'Message',
  sendMessage: 'Send Message',
  sending: 'Sending...',
  placeholder: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    subject: 'Project Discussion',
    message: 'Tell me about your project, timeline, and requirements...'
  }
};

// Arabic translations
const arabicTranslations = {
  projects: {
    title: 'المشاريع المميزة',
    subtitle: 'عرض لأعمالي الأخيرة ومشاريعي الجانبية',
    viewDetails: 'التفاصيل',
    viewRepository: 'المستودع',
    viewLiveDemo: 'عرض مباشر'
  },
  resume: {
    title: 'السيرة الذاتية',
    subtitle: 'رحلتي المهنية وإنجازاتي',
    downloadResume: 'تحميل السيرة الذاتية',
    education: {
      title: 'التعليم'
    },
    experience: {
      title: 'الخبرة'
    },
    certifications: {
      title: 'الشهادات'
    },
    technicalSkills: {
      title: 'المهارات التقنية',
      languages: 'لغات البرمجة',
      frameworks: 'الأطر والمكتبات',
      tools: 'الأدوات والتقنيات'
    },
    educationDetails: {
      bachelor: {
        degree: 'بكالوريوس في هندسة البرمجيات',
        school: 'جامعة أوستيم التقنية',
        date: '2021 - 2025',
        location: 'أنقرة، تركيا',
        description: 'التركيز على التطوير المتكامل وهياكل البيانات والخوارزميات ومبادئ هندسة البرمجيات'
      },
      highSchool: {
        degree: 'شهادة الثانوية العامة',
        school: 'مدرسة النور الدولية',
        date: '2017 - 2021',
        location: 'الدوحة، قطر',
        description: 'تخرجت بامتياز، مع التركيز على الرياضيات والعلوم'
      }
    },
    experienceDetails: {
      fullStack: {
        role: 'مطور متكامل',
        company: 'عمل حر',
        employmentType: 'عقد',
        date: '2022 - الحاضر',
        location: 'عن بُعد',
        summary: 'تطوير تطبيقات متكاملة باستخدام التقنيات الحديثة بما في ذلك React و Next.js و Node.js ومنصات السحابة'
      }
    },
    certificationDetails: {
      dataEngineer: {
        title: 'شهادة مهندس بيانات محترف',
        issuer: 'DataCamp',
        date: '2024'
      },
      dataScientist: {
        title: 'شهادة عالم بيانات محترف',
        issuer: 'DataCamp',
        date: '2024'
      },
      dataAnalyst: {
        title: 'شهادة محلل بيانات محترف',
        issuer: 'DataCamp',
        date: '2024'
      }
    }
  },
  contact: {
    title: 'تواصل معي',
    subtitle: 'دعنا نناقش مشروعك القادم أو فقط قل مرحبا',
    letsConnect: 'دعنا نتصل',
    introText: 'أنا مهتم دائماً بالفرص الجديدة والمشاريع الصعبة والتعاونات ذات المعنى. سواء كان لديك مشروع محدد في الاعتبار أو تريد فقط استكشاف الاحتمالات، أود أن أسمع منك.',
    email: 'البريد الإلكتروني',
    phone: 'الهاتف',
    location: 'الموقع',
    firstName: 'الاسم الأول',
    lastName: 'اسم العائلة',
    subject: 'الموضوع',
    message: 'الرسالة',
    sendMessage: 'إرسال الرسالة',
    sending: 'جاري الإرسال...',
    placeholder: {
      firstName: 'أحمد',
      lastName: 'محمد',
      email: 'ahmed.mohamed@example.com',
      subject: 'مناقشة المشروع',
      message: 'أخبرني عن مشروعك والجدول الزمني والمتطلبات...'
    }
  }
};

// Turkish translations
const turkishTranslations = {
  projects: {
    title: 'Öne Çıkan Projeler',
    subtitle: 'Son çalışmalarımın ve yan projelerimin vitrini',
    viewDetails: 'Detaylar',
    viewRepository: 'Depo',
    viewLiveDemo: 'Canlı Demo'
  },
  resume: {
    title: 'Özgeçmiş',
    subtitle: 'Profesyonel yolculuğum ve başarılarım',
    downloadResume: 'Özgeçmişi İndir',
    education: {
      title: 'Eğitim'
    },
    experience: {
      title: 'Deneyim'
    },
    certifications: {
      title: 'Sertifikalar'
    },
    technicalSkills: {
      title: 'Teknik Beceriler',
      languages: 'Programlama Dilleri',
      frameworks: 'Çerçeveler ve Kütüphaneler',
      tools: 'Araçlar ve Teknolojiler'
    }
  },
  contact: {
    title: 'İletişime Geçin',
    subtitle: 'Bir sonraki projenizi tartışalım veya sadece merhaba deyin',
    letsConnect: 'Bağlanalım',
    introText: 'Her zaman yeni fırsatlar, zorlu projeler ve anlamlı işbirlikleriyle ilgileniyorum. Aklınızda belirli bir proje olsun veya sadece olasılıkları keşfetmek isteyin, sizden haber almayı çok isterim.',
    email: 'E-posta',
    phone: 'Telefon',
    location: 'Konum',
    firstName: 'Ad',
    lastName: 'Soyad',
    subject: 'Konu',
    message: 'Mesaj',
    sendMessage: 'Mesaj Gönder',
    sending: 'Gönderiliyor...',
    placeholder: {
      firstName: 'Ahmet',
      lastName: 'Yılmaz',
      email: 'ahmet.yilmaz@example.com',
      subject: 'Proje Tartışması',
      message: 'Projeniz, zaman çizelgeniz ve gereksinimleriniz hakkında bana bilgi verin...'
    }
  }
};

// Italian translations
const italianTranslations = {
  projects: {
    title: 'Progetti in Evidenza',
    subtitle: 'Una vetrina dei miei lavori recenti e progetti collaterali',
    viewDetails: 'Dettagli',
    viewRepository: 'Repository',
    viewLiveDemo: 'Demo Live'
  },
  resume: {
    title: 'Curriculum',
    subtitle: 'Il mio percorso professionale e i miei successi',
    downloadResume: 'Scarica Curriculum',
    education: {
      title: 'Istruzione'
    },
    experience: {
      title: 'Esperienza'
    },
    certifications: {
      title: 'Certificazioni'
    },
    technicalSkills: {
      title: 'Competenze Tecniche',
      languages: 'Linguaggi di Programmazione',
      frameworks: 'Framework e Librerie',
      tools: 'Strumenti e Tecnologie'
    }
  },
  contact: {
    title: 'Mettiti in Contatto',
    subtitle: 'Discutiamo del tuo prossimo progetto o semplicemente saluta',
    letsConnect: 'Connettiamoci',
    introText: 'Sono sempre interessato a nuove opportunità, progetti stimolanti e collaborazioni significative. Che tu abbia un progetto specifico in mente o voglia solo esplorare le possibilità, mi piacerebbe sentirti.',
    email: 'Email',
    phone: 'Telefono',
    location: 'Posizione',
    firstName: 'Nome',
    lastName: 'Cognome',
    subject: 'Oggetto',
    message: 'Messaggio',
    sendMessage: 'Invia Messaggio',
    sending: 'Invio in corso...',
    placeholder: {
      firstName: 'Marco',
      lastName: 'Rossi',
      email: 'marco.rossi@example.com',
      subject: 'Discussione Progetto',
      message: 'Parlami del tuo progetto, tempistiche e requisiti...'
    }
  }
};

// French translations
const frenchTranslations = {
  projects: {
    title: 'Projets en Vedette',
    subtitle: 'Une vitrine de mes travaux récents et projets secondaires',
    viewDetails: 'Détails',
    viewRepository: 'Dépôt',
    viewLiveDemo: 'Démo Live'
  },
  resume: {
    title: 'CV',
    subtitle: 'Mon parcours professionnel et mes réalisations',
    downloadResume: 'Télécharger CV',
    education: {
      title: 'Éducation'
    },
    experience: {
      title: 'Expérience'
    },
    certifications: {
      title: 'Certifications'
    },
    technicalSkills: {
      title: 'Compétences Techniques',
      languages: 'Langages de Programmation',
      frameworks: 'Frameworks et Bibliothèques',
      tools: 'Outils et Technologies'
    }
  },
  contact: {
    title: 'Entrer en Contact',
    subtitle: 'Discutons de votre prochain projet ou dites simplement bonjour',
    letsConnect: 'Connectons-nous',
    introText: 'Je suis toujours intéressé par de nouvelles opportunités, des projets stimulants et des collaborations significatives. Que vous ayez un projet spécifique en tête ou que vous souhaitiez simplement explorer les possibilités, j\'aimerais avoir de vos nouvelles.',
    email: 'Email',
    phone: 'Téléphone',
    location: 'Localisation',
    firstName: 'Prénom',
    lastName: 'Nom de famille',
    subject: 'Sujet',
    message: 'Message',
    sendMessage: 'Envoyer Message',
    sending: 'Envoi en cours...',
    placeholder: {
      firstName: 'Jean',
      lastName: 'Dupont',
      email: 'jean.dupont@example.com',
      subject: 'Discussion Projet',
      message: 'Parlez-moi de votre projet, calendrier et exigences...'
    }
  }
};

// German translations
const germanTranslations = {
  projects: {
    title: 'Ausgewählte Projekte',
    subtitle: 'Eine Ausstellung meiner neuesten Arbeiten und Nebenprojekte',
    viewDetails: 'Details',
    viewRepository: 'Repository',
    viewLiveDemo: 'Live Demo'
  },
  resume: {
    title: 'Lebenslauf',
    subtitle: 'Mein beruflicher Werdegang und meine Erfolge',
    downloadResume: 'Lebenslauf Herunterladen',
    education: {
      title: 'Bildung'
    },
    experience: {
      title: 'Erfahrung'
    },
    certifications: {
      title: 'Zertifizierungen'
    },
    technicalSkills: {
      title: 'Technische Fähigkeiten',
      languages: 'Programmiersprachen',
      frameworks: 'Frameworks und Bibliotheken',
      tools: 'Werkzeuge und Technologien'
    }
  },
  contact: {
    title: 'Kontakt aufnehmen',
    subtitle: 'Lassen Sie uns über Ihr nächstes Projekt sprechen oder sagen Sie einfach Hallo',
    letsConnect: 'Lassen Sie uns verbinden',
    introText: 'Ich bin immer an neuen Möglichkeiten, herausfordernden Projekten und bedeutungsvollen Zusammenarbeiten interessiert. Ob Sie ein bestimmtes Projekt im Sinn haben oder nur die Möglichkeiten erkunden möchten, ich würde gerne von Ihnen hören.',
    email: 'E-Mail',
    phone: 'Telefon',
    location: 'Standort',
    firstName: 'Vorname',
    lastName: 'Nachname',
    subject: 'Betreff',
    message: 'Nachricht',
    sendMessage: 'Nachricht Senden',
    sending: 'Wird gesendet...',
    placeholder: {
      firstName: 'Hans',
      lastName: 'Müller',
      email: 'hans.mueller@example.com',
      subject: 'Projektdiskussion',
      message: 'Erzählen Sie mir von Ihrem Projekt, Zeitplan und Anforderungen...'
    }
  }
};

async function populateTranslations() {
  console.log('🌍 Populating multilingual content...');

  try {
    // Helper function to create translation entries
    const createTranslationEntry = (key, content, translations) => {
      return {
        key,
        en: JSON.stringify(content),
        ar: JSON.stringify(translations.ar || content),
        tr: JSON.stringify(translations.tr || content),
        it: JSON.stringify(translations.it || content),
        fr: JSON.stringify(translations.fr || content),
        de: JSON.stringify(translations.de || content),
        updated_at: new Date().toISOString()
      };
    };

    // Projects translations
    const projectsTranslations = [
      createTranslationEntry('projects.title', projectsContent.title, arabicTranslations.projects),
      createTranslationEntry('projects.subtitle', projectsContent.subtitle, arabicTranslations.projects),
      createTranslationEntry('projects.viewDetails', projectsContent.viewDetails, arabicTranslations.projects),
      createTranslationEntry('projects.viewRepository', projectsContent.viewRepository, arabicTranslations.projects),
      createTranslationEntry('projects.viewLiveDemo', projectsContent.viewLiveDemo, arabicTranslations.projects)
    ];

    // Resume translations
    const resumeTranslations = [
      createTranslationEntry('resume.title', resumeContent.title, arabicTranslations.resume),
      createTranslationEntry('resume.subtitle', resumeContent.subtitle, arabicTranslations.resume),
      createTranslationEntry('resume.downloadResume', resumeContent.downloadResume, arabicTranslations.resume),
      createTranslationEntry('resume.education.title', resumeContent.education.title, arabicTranslations.resume.education),
      createTranslationEntry('resume.experience.title', resumeContent.experience.title, arabicTranslations.resume.experience),
      createTranslationEntry('resume.certifications.title', resumeContent.certifications.title, arabicTranslations.resume.certifications),
      createTranslationEntry('resume.technicalSkills.title', resumeContent.technicalSkills.title, arabicTranslations.resume.technicalSkills),
      createTranslationEntry('resume.technicalSkills.languages', resumeContent.technicalSkills.languages, arabicTranslations.resume.technicalSkills),
      createTranslationEntry('resume.technicalSkills.frameworks', resumeContent.technicalSkills.frameworks, arabicTranslations.resume.technicalSkills),
      createTranslationEntry('resume.technicalSkills.tools', resumeContent.technicalSkills.tools, arabicTranslations.resume.technicalSkills),
      // Education details
      createTranslationEntry('resume.educationDetails.bachelor.degree', resumeContent.educationDetails.bachelor.degree, arabicTranslations.resume.educationDetails.bachelor),
      createTranslationEntry('resume.educationDetails.bachelor.school', resumeContent.educationDetails.bachelor.school, arabicTranslations.resume.educationDetails.bachelor),
      createTranslationEntry('resume.educationDetails.bachelor.date', resumeContent.educationDetails.bachelor.date, arabicTranslations.resume.educationDetails.bachelor),
      createTranslationEntry('resume.educationDetails.bachelor.location', resumeContent.educationDetails.bachelor.location, arabicTranslations.resume.educationDetails.bachelor),
      createTranslationEntry('resume.educationDetails.bachelor.description', resumeContent.educationDetails.bachelor.description, arabicTranslations.resume.educationDetails.bachelor),
      createTranslationEntry('resume.educationDetails.highSchool.degree', resumeContent.educationDetails.highSchool.degree, arabicTranslations.resume.educationDetails.highSchool),
      createTranslationEntry('resume.educationDetails.highSchool.school', resumeContent.educationDetails.highSchool.school, arabicTranslations.resume.educationDetails.highSchool),
      createTranslationEntry('resume.educationDetails.highSchool.date', resumeContent.educationDetails.highSchool.date, arabicTranslations.resume.educationDetails.highSchool),
      createTranslationEntry('resume.educationDetails.highSchool.location', resumeContent.educationDetails.highSchool.location, arabicTranslations.resume.educationDetails.highSchool),
      createTranslationEntry('resume.educationDetails.highSchool.description', resumeContent.educationDetails.highSchool.description, arabicTranslations.resume.educationDetails.highSchool),
      // Experience details
      createTranslationEntry('resume.experienceDetails.fullStack.role', resumeContent.experienceDetails.fullStack.role, arabicTranslations.resume.experienceDetails.fullStack),
      createTranslationEntry('resume.experienceDetails.fullStack.company', resumeContent.experienceDetails.fullStack.company, arabicTranslations.resume.experienceDetails.fullStack),
      createTranslationEntry('resume.experienceDetails.fullStack.employmentType', resumeContent.experienceDetails.fullStack.employmentType, arabicTranslations.resume.experienceDetails.fullStack),
      createTranslationEntry('resume.experienceDetails.fullStack.date', resumeContent.experienceDetails.fullStack.date, arabicTranslations.resume.experienceDetails.fullStack),
      createTranslationEntry('resume.experienceDetails.fullStack.location', resumeContent.experienceDetails.fullStack.location, arabicTranslations.resume.experienceDetails.fullStack),
      createTranslationEntry('resume.experienceDetails.fullStack.summary', resumeContent.experienceDetails.fullStack.summary, arabicTranslations.resume.experienceDetails.fullStack),
      // Certification details
      createTranslationEntry('resume.certificationDetails.dataEngineer.title', resumeContent.certificationDetails.dataEngineer.title, arabicTranslations.resume.certificationDetails.dataEngineer),
      createTranslationEntry('resume.certificationDetails.dataEngineer.issuer', resumeContent.certificationDetails.dataEngineer.issuer, arabicTranslations.resume.certificationDetails.dataEngineer),
      createTranslationEntry('resume.certificationDetails.dataEngineer.date', resumeContent.certificationDetails.dataEngineer.date, arabicTranslations.resume.certificationDetails.dataEngineer),
      createTranslationEntry('resume.certificationDetails.dataScientist.title', resumeContent.certificationDetails.dataScientist.title, arabicTranslations.resume.certificationDetails.dataScientist),
      createTranslationEntry('resume.certificationDetails.dataScientist.issuer', resumeContent.certificationDetails.dataScientist.issuer, arabicTranslations.resume.certificationDetails.dataScientist),
      createTranslationEntry('resume.certificationDetails.dataScientist.date', resumeContent.certificationDetails.dataScientist.date, arabicTranslations.resume.certificationDetails.dataScientist),
      createTranslationEntry('resume.certificationDetails.dataAnalyst.title', resumeContent.certificationDetails.dataAnalyst.title, arabicTranslations.resume.certificationDetails.dataAnalyst),
      createTranslationEntry('resume.certificationDetails.dataAnalyst.issuer', resumeContent.certificationDetails.dataAnalyst.issuer, arabicTranslations.resume.certificationDetails.dataAnalyst),
      createTranslationEntry('resume.certificationDetails.dataAnalyst.date', resumeContent.certificationDetails.dataAnalyst.date, arabicTranslations.resume.certificationDetails.dataAnalyst)
    ];

    // Contact translations
    const contactTranslations = [
      createTranslationEntry('contact.title', contactContent.title, arabicTranslations.contact),
      createTranslationEntry('contact.subtitle', contactContent.subtitle, arabicTranslations.contact),
      createTranslationEntry('contact.letsConnect', contactContent.letsConnect, arabicTranslations.contact),
      createTranslationEntry('contact.introText', contactContent.introText, arabicTranslations.contact),
      createTranslationEntry('contact.email', contactContent.email, arabicTranslations.contact),
      createTranslationEntry('contact.phone', contactContent.phone, arabicTranslations.contact),
      createTranslationEntry('contact.location', contactContent.location, arabicTranslations.contact),
      createTranslationEntry('contact.firstName', contactContent.firstName, arabicTranslations.contact),
      createTranslationEntry('contact.lastName', contactContent.lastName, arabicTranslations.contact),
      createTranslationEntry('contact.subject', contactContent.subject, arabicTranslations.contact),
      createTranslationEntry('contact.message', contactContent.message, arabicTranslations.contact),
      createTranslationEntry('contact.sendMessage', contactContent.sendMessage, arabicTranslations.contact),
      createTranslationEntry('contact.sending', contactContent.sending, arabicTranslations.contact),
      createTranslationEntry('contact.placeholder.firstName', contactContent.placeholder.firstName, arabicTranslations.contact.placeholder),
      createTranslationEntry('contact.placeholder.lastName', contactContent.placeholder.lastName, arabicTranslations.contact.placeholder),
      createTranslationEntry('contact.placeholder.email', contactContent.placeholder.email, arabicTranslations.contact.placeholder),
      createTranslationEntry('contact.placeholder.subject', contactContent.placeholder.subject, arabicTranslations.contact.placeholder),
      createTranslationEntry('contact.placeholder.message', contactContent.placeholder.message, arabicTranslations.contact.placeholder)
    ];

    // Combine all translations
    const allTranslations = [...projectsTranslations, ...resumeTranslations, ...contactTranslations];

    // Insert all translations
    const { error } = await supabase
      .from('translations')
      .upsert(allTranslations, { onConflict: 'key' });

    if (error) throw error;

    console.log('✅ Successfully populated multilingual content!');
    console.log(`📊 Inserted ${allTranslations.length} translation entries`);

  } catch (error) {
    console.error('❌ Error populating multilingual content:', error.message);
    process.exit(1);
  }
}

populateTranslations();
