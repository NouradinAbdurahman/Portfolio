-- Check what tables exist in your database
SELECT 
    table_name,
    table_type
FROM information_schema.tables 
WHERE table_schema = 'public'
ORDER BY table_name;

-- Check if specific tables exist
SELECT 
    CASE WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'translations') 
         THEN 'EXISTS' 
         ELSE 'NOT EXISTS' 
    END as translations_table;

SELECT 
    CASE WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'projects') 
         THEN 'EXISTS' 
         ELSE 'NOT EXISTS' 
    END as projects_table;

SELECT 
    CASE WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'services') 
         THEN 'EXISTS' 
         ELSE 'NOT EXISTS' 
    END as services_table;
