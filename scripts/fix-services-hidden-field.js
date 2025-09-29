const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function fixServicesHiddenField() {
  try {
    console.log('🔧 Fixing Services hidden field...');

    // Fix the services.hidden field to have proper boolean values
    const hiddenTranslations = {
      en: 'false',
      ar: 'false',
      tr: 'false',
      it: 'false',
      fr: 'false',
      de: 'false'
    };

    const { error } = await supabase
      .from('translations')
      .upsert({
        key: 'services.hidden',
        ...hiddenTranslations,
        updated_at: new Date().toISOString()
      }, { onConflict: 'key' });

    if (error) {
      console.error('❌ Error updating services.hidden:', error);
    } else {
      console.log('✅ Updated services.hidden successfully');
    }

    console.log('🎉 Services hidden field fixed successfully!');

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

// Run the script
fixServicesHiddenField();
