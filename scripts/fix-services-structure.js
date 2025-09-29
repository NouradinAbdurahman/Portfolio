const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function fixServicesStructure() {
  try {
    console.log('🔧 Fixing Services data structure...');

    // First, let's get all the current service-related translations
    const { data: serviceData, error: fetchError } = await supabase
      .from('translations')
      .select('key, en, ar, tr, it, fr, de')
      .like('key', 'services.%');

    if (fetchError) {
      console.error('❌ Error fetching service data:', fetchError);
      return;
    }

    console.log('📝 Current service data:', serviceData);

    // Create proper service items structure
    const serviceItems = [
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
          en: 'Custom web applications using modern technologies like React, Next.js, and TypeScript',
          ar: 'تطبيقات ويب مخصصة باستخدام التقنيات الحديثة مثل React و Next.js و TypeScript',
          tr: 'React, Next.js ve TypeScript gibi modern teknolojiler kullanarak özel web uygulamaları',
          it: 'Applicazioni web personalizzate utilizzando tecnologie moderne come React, Next.js e TypeScript',
          fr: 'Applications web personnalisées utilisant des technologies modernes comme React, Next.js et TypeScript',
          de: 'Maßgeschneiderte Webanwendungen mit modernen Technologien wie React, Next.js und TypeScript'
        }
      },
      {
        id: 'mobileDevelopment',
        title: {
          en: 'Mobile Development',
          ar: 'تطوير المحمول',
          tr: 'Mobil Geliştirme',
          it: 'Sviluppo Mobile',
          fr: 'Développement Mobile',
          de: 'Mobile Entwicklung'
        },
        description: {
          en: 'Cross-platform mobile apps with Flutter and React Native for iOS and Android',
          ar: 'تطبيقات محمولة متعددة المنصات مع Flutter و React Native لـ iOS و Android',
          tr: 'iOS ve Android için Flutter ve React Native ile çapraz platform mobil uygulamaları',
          it: 'App mobili multipiattaforma con Flutter e React Native per iOS e Android',
          fr: 'Applications mobiles multiplateformes avec Flutter et React Native pour iOS et Android',
          de: 'Plattformübergreifende mobile Apps mit Flutter und React Native für iOS und Android'
        }
      },
      {
        id: 'cloudSolutions',
        title: {
          en: 'Cloud Solutions',
          ar: 'الحلول السحابية',
          tr: 'Bulut Çözümleri',
          it: 'Soluzioni Cloud',
          fr: 'Solutions Cloud',
          de: 'Cloud-Lösungen'
        },
        description: {
          en: 'Scalable cloud infrastructure and deployment solutions using AWS and Firebase',
          ar: 'حلول البنية التحتية السحابية القابلة للتوسع والنشر باستخدام AWS و Firebase',
          tr: 'AWS ve Firebase kullanarak ölçeklenebilir bulut altyapısı ve dağıtım çözümleri',
          it: 'Soluzioni di infrastruttura cloud scalabili e di deployment utilizzando AWS e Firebase',
          fr: 'Solutions d\'infrastructure cloud évolutives et de déploiement utilisant AWS et Firebase',
          de: 'Skalierbare Cloud-Infrastruktur und Bereitstellungslösungen mit AWS und Firebase'
        }
      },
      {
        id: 'dataEngineering',
        title: {
          en: 'Data Engineering',
          ar: 'هندسة البيانات',
          tr: 'Veri Mühendisliği',
          it: 'Ingegneria dei Dati',
          fr: 'Ingénierie des Données',
          de: 'Datenverarbeitung'
        },
        description: {
          en: 'ETL pipelines, data processing, and analytics solutions using Python and cloud technologies',
          ar: 'خطوط أنابيب ETL ومعالجة البيانات وحلول التحليلات باستخدام Python والتقنيات السحابية',
          tr: 'Python ve bulut teknolojileri kullanarak ETL boru hatları, veri işleme ve analitik çözümler',
          it: 'Pipeline ETL, elaborazione dati e soluzioni analitiche utilizzando Python e tecnologie cloud',
          fr: 'Pipelines ETL, traitement de données et solutions d\'analyse utilisant Python et les technologies cloud',
          de: 'ETL-Pipelines, Datenverarbeitung und Analyselösungen mit Python und Cloud-Technologien'
        }
      }
    ];

    // Convert the service items to the format expected by the API
    const serviceItemsTranslations = {
      en: JSON.stringify(serviceItems),
      ar: JSON.stringify(serviceItems),
      tr: JSON.stringify(serviceItems),
      it: JSON.stringify(serviceItems),
      fr: JSON.stringify(serviceItems),
      de: JSON.stringify(serviceItems)
    };

    // Update the items field
    const { error: updateError } = await supabase
      .from('translations')
      .upsert({
        key: 'services.items',
        ...serviceItemsTranslations,
        updated_at: new Date().toISOString()
      });

    if (updateError) {
      console.error('❌ Error updating service items:', updateError);
    } else {
      console.log('✅ Service items structure updated successfully');
    }

    // Remove the old individual service fields
    const oldServiceKeys = [
      'services.webDevelopment.title',
      'services.webDevelopment.description',
      'services.mobileDevelopment.title',
      'services.mobileDevelopment.description',
      'services.cloudSolutions.title',
      'services.cloudSolutions.description',
      'services.dataEngineering.title',
      'services.dataEngineering.description'
    ];

    for (const key of oldServiceKeys) {
      const { error: deleteError } = await supabase
        .from('translations')
        .delete()
        .eq('key', key);

      if (deleteError) {
        console.error(`❌ Error deleting ${key}:`, deleteError);
      } else {
        console.log(`✅ Deleted old field: ${key}`);
      }
    }

    console.log('🎉 Services data structure fixed successfully!');

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

// Run the script
fixServicesStructure();
