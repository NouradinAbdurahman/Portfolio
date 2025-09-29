const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function populateServicesTechnologies() {
  try {
    console.log('🔧 Populating Services with Technologies...');

    // Define the services with their technologies based on the images
    const servicesWithTechnologies = [
      {
        id: 'webDevelopment',
        title: {
          en: 'Web Development',
          ar: 'تطوير الويب',
          tr: 'Web Geliştirme',
          it: 'Sviluppo Web',
          fr: 'Développement Web',
          de: 'Web-Entwicklung'
        },
        description: {
          en: 'Modern web applications using React, Next.js, and Flutter. Responsive design with optimal performance.',
          ar: 'تطبيقات ويب حديثة باستخدام React و Next.js و Flutter. تصميم متجاوب مع أداء مثالي.',
          tr: 'React, Next.js ve Flutter kullanarak modern web uygulamaları. Optimal performansla duyarlı tasarım.',
          it: 'Applicazioni web moderne utilizzando React, Next.js e Flutter. Design responsive con prestazioni ottimali.',
          fr: 'Applications web modernes utilisant React, Next.js et Flutter. Design responsive avec des performances optimales.',
          de: 'Moderne Webanwendungen mit React, Next.js und Flutter. Responsive Design mit optimaler Leistung.'
        },
        icon: 'Code',
        technologies: ['React', 'Next.js', 'TypeScript', 'Flutter', 'Tailwind CSS']
      },
      {
        id: 'dataEngineering',
        title: {
          en: 'Data Engineering',
          ar: 'هندسة البيانات',
          tr: 'Veri Mühendisliği',
          it: 'Ingegneria dei Dati',
          fr: 'Ingénierie des Données',
          de: 'Datenengineering'
        },
        description: {
          en: 'ETL pipeline development, SQL optimization, and cloud-based data processing solutions.',
          ar: 'تطوير خطوط أنابيب ETL وتحسين SQL وحلول معالجة البيانات المستندة إلى السحابة.',
          tr: 'ETL pipeline geliştirme, SQL optimizasyonu ve bulut tabanlı veri işleme çözümleri.',
          it: 'Sviluppo di pipeline ETL, ottimizzazione SQL e soluzioni di elaborazione dati basate su cloud.',
          fr: 'Développement de pipelines ETL, optimisation SQL et solutions de traitement de données basées sur le cloud.',
          de: 'ETL-Pipeline-Entwicklung, SQL-Optimierung und cloudbasierte Datenverarbeitungslösungen.'
        },
        icon: 'Database',
        technologies: ['Python', 'SQL', 'ETL', 'PostgreSQL', 'AWS']
      },
      {
        id: 'mobileDevelopment',
        title: {
          en: 'Mobile Development',
          ar: 'تطوير التطبيقات المحمولة',
          tr: 'Mobil Geliştirme',
          it: 'Sviluppo Mobile',
          fr: 'Développement Mobile',
          de: 'Mobile Entwicklung'
        },
        description: {
          en: 'Cross-platform mobile applications with Flutter and React Native. Native performance with shared codebase.',
          ar: 'تطبيقات محمولة متعددة المنصات مع Flutter و React Native. أداء أصلي مع قاعدة كود مشتركة.',
          tr: 'Flutter ve React Native ile çoklu platform mobil uygulamaları. Paylaşılan kod tabanı ile yerel performans.',
          it: 'Applicazioni mobili multipiattaforma con Flutter e React Native. Prestazioni native con codebase condivisa.',
          fr: 'Applications mobiles multiplateformes avec Flutter et React Native. Performances natives avec codebase partagée.',
          de: 'Plattformübergreifende mobile Anwendungen mit Flutter und React Native. Native Leistung mit gemeinsamer Codebasis.'
        },
        icon: 'Smartphone',
        technologies: ['Flutter', 'React Native', 'Dart', 'JavaScript', 'Firebase']
      },
      {
        id: 'cloudSolutions',
        title: {
          en: 'Cloud Solutions',
          ar: 'حلول السحابة',
          tr: 'Bulut Çözümleri',
          it: 'Soluzioni Cloud',
          fr: 'Solutions Cloud',
          de: 'Cloud-Lösungen'
        },
        description: {
          en: 'Scalable cloud infrastructure, deployment automation, and DevOps practices for modern applications.',
          ar: 'بنية تحتية سحابية قابلة للتوسع وأتمتة النشر وممارسات DevOps للتطبيقات الحديثة.',
          tr: 'Modern uygulamalar için ölçeklenebilir bulut altyapısı, dağıtım otomasyonu ve DevOps uygulamaları.',
          it: 'Infrastruttura cloud scalabile, automazione del deployment e pratiche DevOps per applicazioni moderne.',
          fr: 'Infrastructure cloud évolutive, automatisation du déploiement et pratiques DevOps pour applications modernes.',
          de: 'Skalierbare Cloud-Infrastruktur, Deployment-Automatisierung und DevOps-Praktiken für moderne Anwendungen.'
        },
        icon: 'Cloud',
        technologies: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform']
      }
    ];

    // Update the services.items field with the new structure
    const servicesTranslations = Object.fromEntries(
      ['en', 'ar', 'tr', 'it', 'fr', 'de'].map(locale => [
        locale,
        JSON.stringify(servicesWithTechnologies)
      ])
    );

    const { error } = await supabase
      .from('translations')
      .upsert({
        key: 'services.items',
        ...servicesTranslations,
        updated_at: new Date().toISOString()
      }, { onConflict: 'key' });

    if (error) {
      console.error('❌ Error updating services.items:', error);
    } else {
      console.log('✅ Updated services.items successfully');
    }

    console.log('🎉 Services with Technologies populated successfully!');

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

// Run the script
populateServicesTechnologies();
