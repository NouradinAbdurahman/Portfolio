-- Auto Translation Triggers for Supabase
-- This script creates triggers to automatically translate content when it's updated

-- Create a function to handle auto-translation
CREATE OR REPLACE FUNCTION handle_auto_translation()
RETURNS TRIGGER AS $$
DECLARE
  translation_key TEXT;
  english_text TEXT;
  target_languages TEXT[] := ARRAY['ar', 'tr', 'it', 'fr', 'de'];
  lang TEXT;
  translated_text TEXT;
  processed_text TEXT;
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
    
    -- Update the record with placeholders
    UPDATE translations 
    SET 
      ar = CASE WHEN NEW.ar = '[TRANSLATE_NEEDED]' THEN NEW.ar ELSE NEW.ar END,
      tr = CASE WHEN NEW.tr = '[TRANSLATE_NEEDED]' THEN NEW.tr ELSE NEW.tr END,
      it = CASE WHEN NEW.it = '[TRANSLATE_NEEDED]' THEN NEW.it ELSE NEW.it END,
      fr = CASE WHEN NEW.fr = '[TRANSLATE_NEEDED]' THEN NEW.fr ELSE NEW.fr END,
      de = CASE WHEN NEW.de = '[TRANSLATE_NEEDED]' THEN NEW.de ELSE NEW.de END,
      updated_at = NOW()
    WHERE key = translation_key;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger
DROP TRIGGER IF EXISTS auto_translation_trigger ON translations;
CREATE TRIGGER auto_translation_trigger
  AFTER INSERT OR UPDATE ON translations
  FOR EACH ROW
  EXECUTE FUNCTION handle_auto_translation();

-- Create a function to process translation queue
CREATE OR REPLACE FUNCTION process_translation_queue()
RETURNS void AS $$
DECLARE
  translation_record RECORD;
  translation_key TEXT;
  english_text TEXT;
  target_languages TEXT[] := ARRAY['ar', 'tr', 'it', 'fr', 'de'];
  lang TEXT;
BEGIN
  -- Find records that need translation
  FOR translation_record IN 
    SELECT key, en, ar, tr, it, fr, de
    FROM translations 
    WHERE (ar = '[TRANSLATE_NEEDED]' OR tr = '[TRANSLATE_NEEDED]' OR 
           it = '[TRANSLATE_NEEDED]' OR fr = '[TRANSLATE_NEEDED]' OR 
           de = '[TRANSLATE_NEEDED]')
    LIMIT 10
  LOOP
    translation_key := translation_record.key;
    english_text := translation_record.en;
    
    -- This is where you would call your translation API
    -- For now, we'll just log the need for translation
    RAISE NOTICE 'Translation needed for key: %, text: %', translation_key, english_text;
    
    -- In a real implementation, you would:
    -- 1. Call your translation service (DeepL, Google Translate, etc.)
    -- 2. Process the results with RTL/LTR rules
    -- 3. Update the translations table with the results
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Create a function to manually trigger translation for a specific key
CREATE OR REPLACE FUNCTION trigger_translation(key_to_translate TEXT)
RETURNS void AS $$
DECLARE
  english_text TEXT;
BEGIN
  -- Get the English text for the key
  SELECT en INTO english_text
  FROM translations
  WHERE key = key_to_translate;
  
  IF english_text IS NOT NULL AND english_text != '' THEN
    -- Mark all target languages as needing translation
    UPDATE translations
    SET 
      ar = CASE WHEN ar IS NULL OR ar = '' THEN '[TRANSLATE_NEEDED]' ELSE ar END,
      tr = CASE WHEN tr IS NULL OR tr = '' THEN '[TRANSLATE_NEEDED]' ELSE tr END,
      it = CASE WHEN it IS NULL OR it = '' THEN '[TRANSLATE_NEEDED]' ELSE it END,
      fr = CASE WHEN fr IS NULL OR fr = '' THEN '[TRANSLATE_NEEDED]' ELSE fr END,
      de = CASE WHEN de IS NULL OR de = '' THEN '[TRANSLATE_NEEDED]' ELSE de END,
      updated_at = NOW()
    WHERE key = key_to_translate;
    
    RAISE NOTICE 'Translation triggered for key: %', key_to_translate;
  ELSE
    RAISE NOTICE 'No English text found for key: %', key_to_translate;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Create a function to get translation status
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

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION handle_auto_translation() TO authenticated;
GRANT EXECUTE ON FUNCTION process_translation_queue() TO authenticated;
GRANT EXECUTE ON FUNCTION trigger_translation(TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION get_translation_status() TO authenticated;

-- Create an index for better performance
CREATE INDEX IF NOT EXISTS idx_translations_translate_needed 
ON translations (key) 
WHERE ar = '[TRANSLATE_NEEDED]' OR tr = '[TRANSLATE_NEEDED]' OR 
      it = '[TRANSLATE_NEEDED]' OR fr = '[TRANSLATE_NEEDED]' OR 
      de = '[TRANSLATE_NEEDED]';
