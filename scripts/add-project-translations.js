require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing required environment variables: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// Project translations for all languages
const projectTranslations = [
  // GitHub Profile Analyzer
  { 
    key: 'projects.items.github-profile-analyzer.title', 
    en: 'GitHub Profile Analyzer',
    ar: 'محلل ملف GitHub الشخصي',
    tr: 'GitHub Profil Analizcisi',
    it: 'Analizzatore Profilo GitHub',
    fr: 'Analyseur de Profil GitHub',
    de: 'GitHub-Profil-Analysator'
  },
  { 
    key: 'projects.items.github-profile-analyzer.description', 
    en: 'AI‑powered insights for GitHub developers. Real‑time analytics, AI‑generated summaries, profile optimization, and personalized dashboards. Built with Next.js, TypeScript, Tailwind CSS, and Firebase. Integrated with DAKAEi AI API and the GitHub API.',
    ar: 'رؤى مدعومة بالذكاء الاصطناعي لمطوري GitHub. تحليلات في الوقت الفعلي، ملخصات مولدة بالذكاء الاصطناعي، تحسين الملف الشخصي، ولوحات تحكم مخصصة. مبني بـ Next.js و TypeScript و Tailwind CSS و Firebase. متكامل مع DAKAEi AI API و GitHub API.',
    tr: 'GitHub geliştiricileri için AI destekli içgörüler. Gerçek zamanlı analitik, AI tarafından oluşturulan özetler, profil optimizasyonu ve kişiselleştirilmiş paneller. Next.js, TypeScript, Tailwind CSS ve Firebase ile oluşturuldu. DAKAEi AI API ve GitHub API ile entegre.',
    it: 'Insights alimentati da AI per sviluppatori GitHub. Analisi in tempo reale, riassunti generati da AI, ottimizzazione del profilo e dashboard personalizzate. Costruito con Next.js, TypeScript, Tailwind CSS e Firebase. Integrato con DAKAEi AI API e GitHub API.',
    fr: 'Insights alimentés par l\'IA pour les développeurs GitHub. Analytiques en temps réel, résumés générés par l\'IA, optimisation de profil et tableaux de bord personnalisés. Construit avec Next.js, TypeScript, Tailwind CSS et Firebase. Intégré avec DAKAEi AI API et GitHub API.',
    de: 'KI-gestützte Einblicke für GitHub-Entwickler. Echtzeit-Analysen, KI-generierte Zusammenfassungen, Profiloptimierung und personalisierte Dashboards. Erstellt mit Next.js, TypeScript, Tailwind CSS und Firebase. Integriert mit DAKAEi AI API und GitHub API.'
  },
  { 
    key: 'projects.items.github-profile-analyzer.category', 
    en: 'AI Analytics • Developer Tools',
    ar: 'تحليلات الذكاء الاصطناعي • أدوات المطور',
    tr: 'AI Analitik • Geliştirici Araçları',
    it: 'Analisi AI • Strumenti per Sviluppatori',
    fr: 'Analytiques IA • Outils de Développement',
    de: 'KI-Analytik • Entwicklertools'
  },

  // IntelliStudy Platform
  { 
    key: 'projects.items.intellistudy.title', 
    en: 'IntelliStudy Platform',
    ar: 'منصة IntelliStudy',
    tr: 'IntelliStudy Platformu',
    it: 'Piattaforma IntelliStudy',
    fr: 'Plateforme IntelliStudy',
    de: 'IntelliStudy-Plattform'
  },
  { 
    key: 'projects.items.intellistudy.description', 
    en: 'AI‑powered learning assistant for students. Features text summarization, content rewriting, academic Q&A chatbot, and a quiz generator. Built with Next.js, React, Tailwind CSS, and shadcn/ui. Integrated with DAKAEi AI API.',
    ar: 'مساعد تعلم مدعوم بالذكاء الاصطناعي للطلاب. يتضمن تلخيص النصوص، إعادة كتابة المحتوى، روبوت محادثة أكاديمي، ومولد الاختبارات. مبني بـ Next.js و React و Tailwind CSS و shadcn/ui. متكامل مع DAKAEi AI API.',
    tr: 'Öğrenciler için AI destekli öğrenme asistanı. Metin özetleme, içerik yeniden yazma, akademik soru-cevap sohbet botu ve quiz oluşturucu özellikleri. Next.js, React, Tailwind CSS ve shadcn/ui ile oluşturuldu. DAKAEi AI API ile entegre.',
    it: 'Assistente di apprendimento alimentato da AI per studenti. Caratteristiche: riassunto del testo, riscrittura del contenuto, chatbot Q&A accademico e generatore di quiz. Costruito con Next.js, React, Tailwind CSS e shadcn/ui. Integrato con DAKAEi AI API.',
    fr: 'Assistant d\'apprentissage alimenté par l\'IA pour les étudiants. Fonctionnalités: résumé de texte, réécriture de contenu, chatbot Q&A académique et générateur de quiz. Construit avec Next.js, React, Tailwind CSS et shadcn/ui. Intégré avec DAKAEi AI API.',
    de: 'KI-gestützter Lernassistent für Studenten. Funktionen: Textzusammenfassung, Inhaltsumschreibung, akademischer Q&A-Chatbot und Quiz-Generator. Erstellt mit Next.js, React, Tailwind CSS und shadcn/ui. Integriert mit DAKAEi AI API.'
  },
  { 
    key: 'projects.items.intellistudy.category', 
    en: 'Full-Stack • AI Integration',
    ar: 'Full-Stack • تكامل الذكاء الاصطناعي',
    tr: 'Full-Stack • AI Entegrasyonu',
    it: 'Full-Stack • Integrazione AI',
    fr: 'Full-Stack • Intégration IA',
    de: 'Full-Stack • KI-Integration'
  },

  // Ohay Mobile App
  { 
    key: 'projects.items.ohay.title', 
    en: 'Ohay Mobile App',
    ar: 'تطبيق Ohay المحمول',
    tr: 'Ohay Mobil Uygulaması',
    it: 'App Mobile Ohay',
    fr: 'Application Mobile Ohay',
    de: 'Ohay Mobile App'
  },
  { 
    key: 'projects.items.ohay.description', 
    en: 'A modern, multi‑vendor food delivery platform for iOS and Android. Customers can order from multiple restaurants in one checkout, track couriers in real time, and receive itemized digital receipts. Built with Flutter and Firebase with payment gateway integrations. Supports iOS background fetch, push notifications, and full internationalization for a localized, premium experience.',
    ar: 'منصة توصيل طعام حديثة متعددة البائعين لـ iOS و Android. يمكن للعملاء الطلب من عدة مطاعم في عملية دفع واحدة، وتتبع السعاة في الوقت الفعلي، واستلام فواتير رقمية مفصلة. مبني بـ Flutter و Firebase مع تكامل بوابات الدفع. يدعم iOS background fetch والإشعارات الفورية والتدويل الكامل لتجربة محلية متميزة.',
    tr: 'iOS ve Android için modern, çok satıcılı yemek teslimat platformu. Müşteriler tek ödeme ile birden fazla restorandan sipariş verebilir, kuryeleri gerçek zamanlı takip edebilir ve detaylı dijital fişler alabilir. Flutter ve Firebase ile ödeme ağ geçidi entegrasyonları ile oluşturuldu. iOS background fetch, push bildirimleri ve yerelleştirilmiş premium deneyim için tam uluslararasılaştırma desteği.',
    it: 'Una piattaforma moderna di delivery cibo multi-vendor per iOS e Android. I clienti possono ordinare da più ristoranti in un singolo checkout, tracciare corrieri in tempo reale e ricevere ricevute digitali dettagliate. Costruito con Flutter e Firebase con integrazioni payment gateway. Supporta iOS background fetch, push notifications e piena internazionalizzazione per esperienza localizzata premium.',
    fr: 'Une plateforme moderne de livraison de nourriture multi-vendeurs pour iOS et Android. Les clients peuvent commander de plusieurs restaurants en un seul checkout, suivre les coursiers en temps réel et recevoir des reçus numériques détaillés. Construit avec Flutter et Firebase avec intégrations de passerelles de paiement. Supporte iOS background fetch, notifications push et internationalisation complète pour une expérience localisée premium.',
    de: 'Eine moderne, multi-vendor Lebensmittellieferplattform für iOS und Android. Kunden können von mehreren Restaurants in einem Checkout bestellen, Kurierfahrer in Echtzeit verfolgen und detaillierte digitale Quittungen erhalten. Erstellt mit Flutter und Firebase mit Payment-Gateway-Integrationen. Unterstützt iOS Background Fetch, Push-Benachrichtigungen und vollständige Internationalisierung für eine lokalisierte Premium-Erfahrung.'
  },
  { 
    key: 'projects.items.ohay.category', 
    en: 'Mobile Development • Real-time Systems',
    ar: 'تطوير المحمول • أنظمة الوقت الفعلي',
    tr: 'Mobil Geliştirme • Gerçek Zamanlı Sistemler',
    it: 'Sviluppo Mobile • Sistemi Tempo Reale',
    fr: 'Développement Mobile • Systèmes Temps Réel',
    de: 'Mobile Entwicklung • Echtzeitsysteme'
  },

  // Viaggi Qatar Booking
  { 
    key: 'projects.items.viaggi-qatar-booking.title', 
    en: 'Viaggi del Qatar Tour Booking System',
    ar: 'نظام حجز جولات Viaggi del Qatar',
    tr: 'Viaggi del Qatar Tur Rezervasyon Sistemi',
    it: 'Sistema di Prenotazione Tour Viaggi del Qatar',
    fr: 'Système de Réservation de Tours Viaggi del Qatar',
    de: 'Viaggi del Qatar Tour-Buchungssystem'
  },
  { 
    key: 'projects.items.viaggi-qatar-booking.description', 
    en: 'An advanced booking management platform supporting multi‑tour reservations, receipt generation, and real‑time operational dashboards. Built with Next.js 14+ and PostgreSQL (Neon) using server‑ side rendering for speed and SEO. Includes an agent portal, mobile‑first UI, and PDF preview with export and filtering for itineraries and invoices.',
    ar: 'منصة إدارة حجوزات متقدمة تدعم حجوزات متعددة الجولات، وإنتاج الإيصالات، ولوحات تحكم تشغيلية في الوقت الفعلي. مبني بـ Next.js 14+ و PostgreSQL (Neon) باستخدام server-side rendering للسرعة و SEO. يتضمن بوابة وكيل، واجهة مستخدم محمولة، ومعاينة PDF مع التصدير والتصفية للجداول الزمنية والفواتير.',
    tr: 'Çoklu tur rezervasyonları, makbuz oluşturma ve gerçek zamanlı operasyonel panelleri destekleyen gelişmiş rezervasyon yönetim platformu. Hız ve SEO için server-side rendering kullanarak Next.js 14+ ve PostgreSQL (Neon) ile oluşturuldu. Acenta portalı, mobil öncelikli UI ve güzergahlar ve faturalar için dışa aktarma ve filtreleme ile PDF önizleme içerir.',
    it: 'Una piattaforma avanzata di gestione prenotazioni che supporta prenotazioni multi-tour, generazione ricevute e dashboard operative in tempo reale. Costruito con Next.js 14+ e PostgreSQL (Neon) utilizzando server-side rendering per velocità e SEO. Include un portale agente, UI mobile-first e anteprima PDF con esportazione e filtraggio per itinerari e fatture.',
    fr: 'Une plateforme de gestion de réservation avancée supportant les réservations multi-tours, la génération de reçus et les tableaux de bord opérationnels en temps réel. Construit avec Next.js 14+ et PostgreSQL (Neon) utilisant le rendu côté serveur pour la vitesse et le SEO. Inclut un portail agent, une UI mobile-first et un aperçu PDF avec exportation et filtrage pour les itinéraires et factures.',
    de: 'Eine fortschrittliche Buchungsverwaltungsplattform, die Multi-Tour-Reservierungen, Quittungserstellung und Echtzeit-Betriebsdashboards unterstützt. Erstellt mit Next.js 14+ und PostgreSQL (Neon) unter Verwendung von Server-Side-Rendering für Geschwindigkeit und SEO. Enthält ein Agentenportal, mobile-first UI und PDF-Vorschau mit Export und Filterung für Reiserouten und Rechnungen.'
  },
  { 
    key: 'projects.items.viaggi-qatar-booking.category', 
    en: 'Full‑Stack • Next.js 14 • PostgreSQL (Neon)',
    ar: 'Full-Stack • Next.js 14 • PostgreSQL (Neon)',
    tr: 'Full-Stack • Next.js 14 • PostgreSQL (Neon)',
    it: 'Full-Stack • Next.js 14 • PostgreSQL (Neon)',
    fr: 'Full-Stack • Next.js 14 • PostgreSQL (Neon)',
    de: 'Full-Stack • Next.js 14 • PostgreSQL (Neon)'
  }
];

async function addProjectTranslations() {
  console.log('Adding project translations to Supabase...');
  
  try {
    for (const translation of projectTranslations) {
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
    
    console.log('✅ All project translations added successfully!');
  } catch (error) {
    console.error('Error adding project translations:', error);
  }
}

addProjectTranslations();
