require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing required environment variables: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// Missing translation keys that need to be added
const missingTranslations = [
  // Services section
  { key: 'services.title', en: 'Services', ar: 'الخدمات', tr: 'Hizmetler', it: 'Servizi', fr: 'Services', de: 'Dienstleistungen' },
  { key: 'services.subtitle', en: 'Comprehensive solutions for your digital needs', ar: 'حلول شاملة لاحتياجاتك الرقمية', tr: 'Dijital ihtiyaçlarınız için kapsamlı çözümler', it: 'Soluzioni complete per le tue esigenze digitali', fr: 'Solutions complètes pour vos besoins numériques', de: 'Umfassende Lösungen für Ihre digitalen Bedürfnisse' },
  
  // Skills section
  { key: 'skills.title', en: 'Technical Skills', ar: 'المهارات التقنية', tr: 'Teknik Beceriler', it: 'Competenze Tecniche', fr: 'Compétences Techniques', de: 'Technische Fähigkeiten' },
  { key: 'skills.lead', en: 'Technologies and tools I work with', ar: 'التقنيات والأدوات التي أعمل بها', tr: 'Çalıştığım teknolojiler ve araçlar', it: 'Tecnologie e strumenti con cui lavoro', fr: 'Technologies et outils avec lesquels je travaille', de: 'Technologien und Tools, mit denen ich arbeite' },
  { key: 'skills.catFullTitle', en: 'Full-Stack Development', ar: 'تطوير الواجهات الكاملة', tr: 'Tam Yığın Geliştirme', it: 'Sviluppo Full-Stack', fr: 'Développement Full-Stack', de: 'Full-Stack-Entwicklung' },
  { key: 'skills.catFullDesc', en: 'React, Next.js, Flutter, Node.js', ar: 'React، Next.js، Flutter، Node.js', tr: 'React, Next.js, Flutter, Node.js', it: 'React, Next.js, Flutter, Node.js', fr: 'React, Next.js, Flutter, Node.js', de: 'React, Next.js, Flutter, Node.js' },
  { key: 'skills.catDataTitle', en: 'Data Engineering', ar: 'هندسة البيانات', tr: 'Veri Mühendisliği', it: 'Ingegneria dei Dati', fr: 'Ingénierie des Données', de: 'Datenengineering' },
  { key: 'skills.catDataDesc', en: 'ETL Pipelines, SQL, Python, Analytics', ar: 'خطوط أنابيب ETL، SQL، Python، التحليلات', tr: 'ETL Pipeline\'ları, SQL, Python, Analitik', it: 'Pipeline ETL, SQL, Python, Analytics', fr: 'Pipelines ETL, SQL, Python, Analytics', de: 'ETL-Pipelines, SQL, Python, Analytics' },
  { key: 'skills.catCloudTitle', en: 'Cloud & DevOps', ar: 'السحابة و DevOps', tr: 'Bulut ve DevOps', it: 'Cloud e DevOps', fr: 'Cloud et DevOps', de: 'Cloud & DevOps' },
  { key: 'skills.catCloudDesc', en: 'AWS, Firebase, Automation, CI/CD', ar: 'AWS، Firebase، الأتمتة، CI/CD', tr: 'AWS, Firebase, Otomasyon, CI/CD', it: 'AWS, Firebase, Automazione, CI/CD', fr: 'AWS, Firebase, Automatisation, CI/CD', de: 'AWS, Firebase, Automatisierung, CI/CD' },
  
  // Contact section
  { key: 'contact.title', en: 'Get In Touch', ar: 'تواصل معي', tr: 'İletişime Geçin', it: 'Mettiti in Contatto', fr: 'Entrer en Contact', de: 'Kontakt aufnehmen' },
  { key: 'contact.subtitle', en: "Let's discuss your next project or just say hello", ar: 'دعنا نناقش مشروعك القادم أو فقط قل مرحبا', tr: 'Bir sonraki projenizi tartışalım veya sadece merhaba deyin', it: 'Discutiamo il tuo prossimo progetto o semplicemente saluta', fr: 'Discutons de votre prochain projet ou dites simplement bonjour', de: 'Lassen Sie uns über Ihr nächstes Projekt sprechen oder sagen Sie einfach Hallo' },
  { key: 'contact.letsConnect', en: "Let's Connect", ar: 'دعنا نتصل', tr: 'Bağlanalım', it: 'Connettiamoci', fr: 'Connectons-nous', de: 'Lassen Sie uns verbinden' },
  { key: 'contact.introText', en: "I'm always interested in new opportunities, challenging projects, and meaningful collaborations. Whether you have a specific project in mind or just want to explore possibilities, I'd love to hear from you.", ar: 'أنا مهتم دائمًا بالفرص الجديدة والمشاريع الصعبة والتعاونات الهادفة. سواء كان لديك مشروع محدد في الاعتبار أو تريد فقط استكشاف الاحتمالات، أود أن أسمع منك.', tr: 'Her zaman yeni fırsatlar, zorlu projeler ve anlamlı işbirlikleriyle ilgileniyorum. Belirli bir projeniz olsun veya sadece olasılıkları keşfetmek isteyin, sizden haber almayı çok isterim.', it: 'Sono sempre interessato a nuove opportunità, progetti impegnativi e collaborazioni significative. Che tu abbia un progetto specifico in mente o voglia solo esplorare le possibilità, mi piacerebbe sentirti.', fr: 'Je suis toujours intéressé par de nouvelles opportunités, des projets stimulants et des collaborations significatives. Que vous ayez un projet spécifique en tête ou que vous souhaitiez simplement explorer les possibilités, j\'aimerais avoir de vos nouvelles.', de: 'Ich bin immer an neuen Möglichkeiten, herausfordernden Projekten und bedeutungsvollen Kooperationen interessiert. Ob Sie ein bestimmtes Projekt im Sinn haben oder nur die Möglichkeiten erkunden möchten, ich würde gerne von Ihnen hören.' },
  { key: 'contact.email', en: 'Email', ar: 'البريد الإلكتروني', tr: 'E-posta', it: 'Email', fr: 'Email', de: 'E-Mail' },
  { key: 'contact.phone', en: 'Phone', ar: 'الهاتف', tr: 'Telefon', it: 'Telefono', fr: 'Téléphone', de: 'Telefon' },
  { key: 'contact.location', en: 'Location', ar: 'الموقع', tr: 'Konum', it: 'Posizione', fr: 'Localisation', de: 'Standort' },
  { key: 'contact.firstName', en: 'First Name', ar: 'الاسم الأول', tr: 'Ad', it: 'Nome', fr: 'Prénom', de: 'Vorname' },
  { key: 'contact.lastName', en: 'Last Name', ar: 'اسم العائلة', tr: 'Soyad', it: 'Cognome', fr: 'Nom de famille', de: 'Nachname' },
  { key: 'contact.subject', en: 'Subject', ar: 'الموضوع', tr: 'Konu', it: 'Oggetto', fr: 'Sujet', de: 'Betreff' },
  { key: 'contact.message', en: 'Message', ar: 'الرسالة', tr: 'Mesaj', it: 'Messaggio', fr: 'Message', de: 'Nachricht' },
  { key: 'contact.sendMessage', en: 'Send Message', ar: 'إرسال الرسالة', tr: 'Mesaj Gönder', it: 'Invia Messaggio', fr: 'Envoyer le Message', de: 'Nachricht Senden' },
  { key: 'contact.sending', en: 'Sending...', ar: 'جاري الإرسال...', tr: 'Gönderiliyor...', it: 'Invio in corso...', fr: 'Envoi en cours...', de: 'Wird gesendet...' }
];

async function addMissingTranslations() {
  console.log('Adding missing translations to Supabase...');
  
  try {
    for (const translation of missingTranslations) {
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
    
    console.log('✅ All missing translations added successfully!');
  } catch (error) {
    console.error('Error adding missing translations:', error);
  }
}

addMissingTranslations();
