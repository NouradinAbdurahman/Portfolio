const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// About section translations
const aboutTranslations = [
  { key: 'about.name', en: 'Nouraddin Abdurahman Aden', ar: 'نور الدين عبد الرحمن عدن', tr: 'Nouraddin Abdurahman Aden', it: 'Nouraddin Abdurahman Aden', fr: 'Nouraddin Abdurahman Aden', de: 'Nouraddin Abdurahman Aden' },
  { key: 'about.role', en: 'Software Engineering Student & Developer', ar: 'طالب هندسة البرمجيات ومطور', tr: 'Yazılım Mühendisliği Öğrencisi ve Geliştirici', it: 'Studente di Ingegneria del Software e Sviluppatore', fr: 'Étudiant en Génie Logiciel et Développeur', de: 'Software-Engineering-Student und Entwickler' },
  { key: 'about.short_bio', en: 'Currently pursuing Software Engineering at OSTİM Teknik University, specializing in scalable applications and data-driven solutions.', ar: 'أتابع حالياً هندسة البرمجيات في جامعة أوستيم التقنية، متخصص في التطبيقات القابلة للتوسع والحلول المدفوعة بالبيانات.', tr: 'Şu anda OSTİM Teknik Üniversitesi\'nde Yazılım Mühendisliği okuyorum, ölçeklenebilir uygulamalar ve veri odaklı çözümler konusunda uzmanlaşıyorum.', it: 'Attualmente sto studiando Ingegneria del Software presso l\'Università Tecnica OSTİM, specializzandomi in applicazioni scalabili e soluzioni basate sui dati.', fr: 'Actuellement en cours d\'Ingénierie Logicielle à l\'Université Technique OSTİM, spécialisé dans les applications évolutives et les solutions basées sur les données.', de: 'Derzeit studiere ich Software-Engineering an der OSTİM Technischen Universität und spezialisiere mich auf skalierbare Anwendungen und datengetriebene Lösungen.' },
  { key: 'about.detailed_bio', en: 'Hi, I\'m Nouraddin! Currently pursuing Software Engineering at OSTİM Teknik University, I specialize in building scalable applications and data-driven solutions. My passion lies in creating efficient systems that bridge the gap between complex data and user-friendly interfaces.', ar: 'مرحباً، أنا نور الدين! أتابع حالياً هندسة البرمجيات في جامعة أوستيم التقنية، أتخصص في بناء التطبيقات القابلة للتوسع والحلول المدفوعة بالبيانات. شغفي يكمن في إنشاء أنظمة فعالة تربط بين البيانات المعقدة والواجهات سهلة الاستخدام.', tr: 'Merhaba, ben Nouraddin! Şu anda OSTİM Teknik Üniversitesi\'nde Yazılım Mühendisliği okuyorum, ölçeklenebilir uygulamalar ve veri odaklı çözümler geliştirme konusunda uzmanlaşıyorum. Tutkum, karmaşık veriler ile kullanıcı dostu arayüzler arasındaki boşluğu kapatacak verimli sistemler yaratmaktır.', it: 'Ciao, sono Nouraddin! Attualmente sto studiando Ingegneria del Software presso l\'Università Tecnica OSTİM, mi specializzo nella creazione di applicazioni scalabili e soluzioni basate sui dati. La mia passione risiede nella creazione di sistemi efficienti che colmano il divario tra dati complessi e interfacce user-friendly.', fr: 'Salut, je suis Nouraddin! Actuellement en cours d\'Ingénierie Logicielle à l\'Université Technique OSTİM, je me spécialise dans la création d\'applications évolutives et de solutions basées sur les données. Ma passion réside dans la création de systèmes efficaces qui comblent l\'écart entre les données complexes et les interfaces conviviales.', de: 'Hallo, ich bin Nouraddin! Derzeit studiere ich Software-Engineering an der OSTİM Technischen Universität und spezialisiere mich auf die Entwicklung skalierbarer Anwendungen und datengetriebener Lösungen. Meine Leidenschaft liegt darin, effiziente Systeme zu schaffen, die die Lücke zwischen komplexen Daten und benutzerfreundlichen Schnittstellen schließen.' },
  { key: 'about.expertise_highlights', en: 'Proficient in React, Next.js, Flutter, and modern web technologies for creating responsive, performant applications.', ar: 'متمكن في React و Next.js و Flutter وتقنيات الويب الحديثة لإنشاء تطبيقات سريعة الاستجابة وعالية الأداء.', tr: 'React, Next.js, Flutter ve modern web teknolojilerinde uzman, duyarlı ve performanslı uygulamalar oluşturmak için.', it: 'Competente in React, Next.js, Flutter e tecnologie web moderne per creare applicazioni reattive e performanti.', fr: 'Compétent en React, Next.js, Flutter et technologies web modernes pour créer des applications réactives et performantes.', de: 'Kompetent in React, Next.js, Flutter und modernen Web-Technologien zur Erstellung responsiver und leistungsstarker Anwendungen.' }
];

// Services section translations
const servicesTranslations = [
  { key: 'services.title', en: 'Services', ar: 'الخدمات', tr: 'Hizmetler', it: 'Servizi', fr: 'Services', de: 'Dienstleistungen' },
  { key: 'services.subtitle', en: 'Comprehensive solutions for your digital needs', ar: 'حلول شاملة لاحتياجاتك الرقمية', tr: 'Dijital ihtiyaçlarınız için kapsamlı çözümler', it: 'Soluzioni complete per le tue esigenze digitali', fr: 'Solutions complètes pour vos besoins numériques', de: 'Umfassende Lösungen für Ihre digitalen Bedürfnisse' }
];

// Technical Skills section translations
const technicalSkillsTranslations = [
  { key: 'technical_skills.title', en: 'Technical Skills', ar: 'المهارات التقنية', tr: 'Teknik Beceriler', it: 'Competenze Tecniche', fr: 'Compétences Techniques', de: 'Technische Fähigkeiten' },
  { key: 'technical_skills.subtitle', en: 'Technologies and tools I work with', ar: 'التقنيات والأدوات التي أعمل بها', tr: 'Çalıştığım teknolojiler ve araçlar', it: 'Tecnologie e strumenti con cui lavoro', fr: 'Technologies et outils avec lesquels je travaille', de: 'Technologien und Tools, mit denen ich arbeite' }
];

async function addTranslations() {
  try {
    console.log('🚀 Adding translations for new sections...');

    // Add About section translations
    console.log('📝 Adding About section translations...');
    const { error: aboutError } = await supabase
      .from('translations')
      .upsert(aboutTranslations, { onConflict: 'key' });

    if (aboutError) {
      console.error('❌ Error adding About translations:', aboutError);
    } else {
      console.log('✅ About section translations added successfully');
    }

    // Add Services section translations
    console.log('📝 Adding Services section translations...');
    const { error: servicesError } = await supabase
      .from('translations')
      .upsert(servicesTranslations, { onConflict: 'key' });

    if (servicesError) {
      console.error('❌ Error adding Services translations:', servicesError);
    } else {
      console.log('✅ Services section translations added successfully');
    }

    // Add Technical Skills section translations
    console.log('📝 Adding Technical Skills section translations...');
    const { error: skillsError } = await supabase
      .from('translations')
      .upsert(technicalSkillsTranslations, { onConflict: 'key' });

    if (skillsError) {
      console.error('❌ Error adding Technical Skills translations:', skillsError);
    } else {
      console.log('✅ Technical Skills section translations added successfully');
    }

    console.log('🎉 All new section translations added successfully!');

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

// Run the script
addTranslations();
