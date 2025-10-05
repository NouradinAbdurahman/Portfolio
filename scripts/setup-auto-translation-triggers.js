/**
 * Setup Auto Translation Triggers
 * Creates triggers and functions in Supabase for automatic translation
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

async function setupAutoTranslationTriggers() {
  console.log('🔧 Setting up auto translation triggers...');

  try {
    // Create the auto translation function
    const { error: functionError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE OR REPLACE FUNCTION handle_auto_translation()
        RETURNS TRIGGER AS $$
        DECLARE
          translation_key TEXT;
          english_text TEXT;
          target_languages TEXT[] := ARRAY['ar', 'tr', 'it', 'fr', 'de'];
          lang TEXT;
        BEGIN
          -- Only process if this is an INSERT or UPDATE with new English content
          IF TG_OP = 'INSERT' OR (TG_OP = 'UPDATE' AND OLD.en IS DISTINCT FROM NEW.en) THEN
            -- Get the key and English text
            translation_key := NEW.key;
            english_text := NEW.en;
            
            -- Skip if no English text or if it's already processed
            IF english_text IS NULL OR english_text = '' OR english_text LIKE '%<span dir=%' THEN
              RETURN NEW;
            END IF;
            
            -- For each target language, check if translation exists
            FOREACH lang IN ARRAY target_languages
            LOOP
              -- Only translate if the target language field is empty or null
              IF (lang = 'ar' AND (NEW.ar IS NULL OR NEW.ar = '')) OR
                 (lang = 'tr' AND (NEW.tr IS NULL OR NEW.tr = '')) OR
                 (lang = 'it' AND (NEW.it IS NULL OR NEW.it = '')) OR
                 (lang = 'fr' AND (NEW.fr IS NULL OR NEW.fr = '')) OR
                 (lang = 'de' AND (NEW.de IS NULL OR NEW.de = '')) THEN
                
                -- For now, we'll set a placeholder that indicates translation is needed
                -- The actual translation will be handled by the API
                CASE lang
                  WHEN 'ar' THEN NEW.ar := '[TRANSLATE_NEEDED]';
                  WHEN 'tr' THEN NEW.tr := '[TRANSLATE_NEEDED]';
                  WHEN 'it' THEN NEW.it := '[TRANSLATE_NEEDED]';
                  WHEN 'fr' THEN NEW.fr := '[TRANSLATE_NEEDED]';
                  WHEN 'de' THEN NEW.de := '[TRANSLATE_NEEDED]';
                END CASE;
              END IF;
            END LOOP;
          END IF;
          
          RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
      `
    });

    if (functionError) {
      console.error('Error creating function:', functionError);
    } else {
      console.log('✅ Created handle_auto_translation function');
    }

    // Create the trigger
    const { error: triggerError } = await supabase.rpc('exec_sql', {
      sql: `
        DROP TRIGGER IF EXISTS auto_translation_trigger ON translations;
        CREATE TRIGGER auto_translation_trigger
          AFTER INSERT OR UPDATE ON translations
          FOR EACH ROW
          EXECUTE FUNCTION handle_auto_translation();
      `
    });

    if (triggerError) {
      console.error('Error creating trigger:', triggerError);
    } else {
      console.log('✅ Created auto_translation_trigger');
    }

    // Create translation status function
    const { error: statusFunctionError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE OR REPLACE FUNCTION get_translation_status()
        RETURNS TABLE(
          total_keys BIGINT,
          translated_keys BIGINT,
          pending_translations BIGINT,
          completion_percentage NUMERIC
        ) AS $$
        BEGIN
          RETURN QUERY
          SELECT 
            COUNT(*) as total_keys,
            COUNT(CASE WHEN ar != '[TRANSLATE_NEEDED]' AND ar IS NOT NULL AND ar != '' AND
                          tr != '[TRANSLATE_NEEDED]' AND tr IS NOT NULL AND tr != '' AND
                          it != '[TRANSLATE_NEEDED]' AND it IS NOT NULL AND it != '' AND
                          fr != '[TRANSLATE_NEEDED]' AND fr IS NOT NULL AND fr != '' AND
                          de != '[TRANSLATE_NEEDED]' AND de IS NOT NULL AND de != '' THEN 1 END) as translated_keys,
            COUNT(CASE WHEN ar = '[TRANSLATE_NEEDED]' OR tr = '[TRANSLATE_NEEDED]' OR 
                          it = '[TRANSLATE_NEEDED]' OR fr = '[TRANSLATE_NEEDED]' OR 
                          de = '[TRANSLATE_NEEDED]' THEN 1 END) as pending_translations,
            ROUND(
              (COUNT(CASE WHEN ar != '[TRANSLATE_NEEDED]' AND ar IS NOT NULL AND ar != '' AND
                             tr != '[TRANSLATE_NEEDED]' AND tr IS NOT NULL AND tr != '' AND
                             it != '[TRANSLATE_NEEDED]' AND it IS NOT NULL AND it != '' AND
                             fr != '[TRANSLATE_NEEDED]' AND fr IS NOT NULL AND fr != '' AND
                             de != '[TRANSLATE_NEEDED]' AND de IS NOT NULL AND de != '' THEN 1 END)::NUMERIC / 
               COUNT(*)::NUMERIC) * 100, 2
            ) as completion_percentage
          FROM translations;
        END;
        $$ LANGUAGE plpgsql;
      `
    });

    if (statusFunctionError) {
      console.error('Error creating status function:', statusFunctionError);
    } else {
      console.log('✅ Created get_translation_status function');
    }

    // Create index for better performance
    const { error: indexError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE INDEX IF NOT EXISTS idx_translations_translate_needed 
        ON translations (key) 
        WHERE ar = '[TRANSLATE_NEEDED]' OR tr = '[TRANSLATE_NEEDED]' OR 
              it = '[TRANSLATE_NEEDED]' OR fr = '[TRANSLATE_NEEDED]' OR 
              de = '[TRANSLATE_NEEDED]';
      `
    });

    if (indexError) {
      console.error('Error creating index:', indexError);
    } else {
      console.log('✅ Created performance index');
    }

    console.log('🎉 Auto translation triggers setup complete!');

  } catch (error) {
    console.error('❌ Error setting up auto translation triggers:', error.message);
    process.exit(1);
  }
}

setupAutoTranslationTriggers();
