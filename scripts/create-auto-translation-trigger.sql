-- Create function to handle automatic translation triggers
CREATE OR REPLACE FUNCTION handle_content_translation()
RETURNS TRIGGER AS $$
DECLARE
    translation_data JSONB;
    webhook_url TEXT;
    api_key TEXT;
BEGIN
    -- Get webhook URL and API key from environment or settings
    webhook_url := COALESCE(
        current_setting('app.webhook_url', true),
        'http://localhost:3000/api/translate/webhook'
    );
    
    api_key := COALESCE(
        current_setting('app.api_key', true),
        'your-api-key-here'
    );

    -- Prepare translation data based on the table being modified
    IF TG_TABLE_NAME = 'translations' THEN
        -- Handle translation table updates
        translation_data := jsonb_build_object(
            'key', NEW.key,
            'text', COALESCE(NEW.en, ''),
            'sourceLanguage', 'en',
            'context', 'translation_update',
            'timestamp', NOW()
        );
    ELSIF TG_TABLE_NAME = 'projects' THEN
        -- Handle project updates
        translation_data := jsonb_build_object(
            'key', 'projects.items.' || COALESCE(NEW.slug, NEW.id::text),
            'text', COALESCE(NEW.title, ''),
            'sourceLanguage', 'en',
            'context', 'project_title',
            'timestamp', NOW()
        );
    ELSIF TG_TABLE_NAME = 'services' THEN
        -- Handle service updates
        translation_data := jsonb_build_object(
            'key', 'services.items.' || COALESCE(NEW.slug, NEW.id::text),
            'text', COALESCE(NEW.title, ''),
            'sourceLanguage', 'en',
            'context', 'service_title',
            'timestamp', NOW()
        );
    ELSE
        -- Skip other tables
        RETURN COALESCE(NEW, OLD);
    END IF;

    -- Only process if there's actual text content
    IF (translation_data->>'text') IS NOT NULL AND (translation_data->>'text') != '' THEN
        -- Call webhook asynchronously (this is a simplified version)
        -- In production, you might want to use pg_cron or a queue system
        PERFORM pg_notify('translation_webhook', translation_data::text);
    END IF;

    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Create trigger for translations table
DROP TRIGGER IF EXISTS translation_trigger ON translations;
CREATE TRIGGER translation_trigger
    AFTER INSERT OR UPDATE ON translations
    FOR EACH ROW
    EXECUTE FUNCTION handle_content_translation();

-- Create trigger for projects table
DROP TRIGGER IF EXISTS project_translation_trigger ON projects;
CREATE TRIGGER project_translation_trigger
    AFTER INSERT OR UPDATE ON projects
    FOR EACH ROW
    EXECUTE FUNCTION handle_content_translation();

-- Create trigger for services table
DROP TRIGGER IF EXISTS service_translation_trigger ON services;
CREATE TRIGGER service_translation_trigger
    AFTER INSERT OR UPDATE ON services
    FOR EACH ROW
    EXECUTE FUNCTION handle_content_translation();

-- Create a function to manually trigger translations for existing content
CREATE OR REPLACE FUNCTION trigger_bulk_translation()
RETURNS TABLE(key TEXT, status TEXT) AS $$
DECLARE
    rec RECORD;
    translation_data JSONB;
BEGIN
    -- Process all translation keys that need updating
    FOR rec IN 
        SELECT t.key, t.en as text
        FROM translations t
        WHERE t.en IS NOT NULL 
        AND t.en != ''
        AND (
            t.ar IS NULL OR t.ar = '' OR
            t.tr IS NULL OR t.tr = '' OR
            t.it IS NULL OR t.it = '' OR
            t.fr IS NULL OR t.fr = '' OR
            t.de IS NULL OR t.de = ''
        )
    LOOP
        translation_data := jsonb_build_object(
            'key', rec.key,
            'text', rec.text,
            'sourceLanguage', 'en',
            'context', 'bulk_translation',
            'timestamp', NOW()
        );
        
        PERFORM pg_notify('translation_webhook', translation_data::text);
        
        key := rec.key;
        status := 'triggered';
        RETURN NEXT;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Create a function to check translation status
CREATE OR REPLACE FUNCTION get_translation_status()
RETURNS TABLE(
    total_keys INTEGER,
    complete_translations INTEGER,
    incomplete_translations INTEGER,
    missing_arabic INTEGER,
    missing_turkish INTEGER,
    missing_italian INTEGER,
    missing_french INTEGER,
    missing_german INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COUNT(*)::INTEGER as total_keys,
        COUNT(CASE WHEN ar IS NOT NULL AND ar != '' AND tr IS NOT NULL AND tr != '' 
                   AND it IS NOT NULL AND it != '' AND fr IS NOT NULL AND fr != '' 
                   AND de IS NOT NULL AND de != '' THEN 1 END)::INTEGER as complete_translations,
        COUNT(CASE WHEN ar IS NULL OR ar = '' OR tr IS NULL OR tr = '' 
                   OR it IS NULL OR it = '' OR fr IS NULL OR fr = '' 
                   OR de IS NULL OR de = '' THEN 1 END)::INTEGER as incomplete_translations,
        COUNT(CASE WHEN ar IS NULL OR ar = '' THEN 1 END)::INTEGER as missing_arabic,
        COUNT(CASE WHEN tr IS NULL OR tr = '' THEN 1 END)::INTEGER as missing_turkish,
        COUNT(CASE WHEN it IS NULL OR it = '' THEN 1 END)::INTEGER as missing_italian,
        COUNT(CASE WHEN fr IS NULL OR fr = '' THEN 1 END)::INTEGER as missing_french,
        COUNT(CASE WHEN de IS NULL OR de = '' THEN 1 END)::INTEGER as missing_german
    FROM translations;
END;
$$ LANGUAGE plpgsql;

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION handle_content_translation() TO authenticated;
GRANT EXECUTE ON FUNCTION trigger_bulk_translation() TO authenticated;
