-- Add hide flags to site_content table
-- Run in Supabase SQL Editor

-- Add hide flags for field-level hiding
SELECT upsert_site_content('hero','title_hidden','false');
SELECT upsert_site_content('hero','subtitle_hidden','false');
SELECT upsert_site_content('hero','ctaPrimaryLabel_hidden','false');
SELECT upsert_site_content('hero','ctaPrimaryHref_hidden','false');
SELECT upsert_site_content('hero','ctaSecondaryLabel_hidden','false');
SELECT upsert_site_content('hero','ctaSecondaryHref_hidden','false');

SELECT upsert_site_content('about','title_hidden','false');
SELECT upsert_site_content('about','subtitle_hidden','false');
SELECT upsert_site_content('about','name_hidden','false');
SELECT upsert_site_content('about','role_hidden','false');
SELECT upsert_site_content('about','body_hidden','false');

SELECT upsert_site_content('services','title_hidden','false');
SELECT upsert_site_content('services','subtitle_hidden','false');

SELECT upsert_site_content('projects','title_hidden','false');
SELECT upsert_site_content('projects','subtitle_hidden','false');

SELECT upsert_site_content('skills','title_hidden','false');
SELECT upsert_site_content('skills','lead_hidden','false');

SELECT upsert_site_content('contact','title_hidden','false');
SELECT upsert_site_content('contact','lead_hidden','false');
SELECT upsert_site_content('contact','email_hidden','false');
SELECT upsert_site_content('contact','phone_hidden','false');
SELECT upsert_site_content('contact','location_hidden','false');
SELECT upsert_site_content('contact','github_hidden','false');
SELECT upsert_site_content('contact','linkedin_hidden','false');
SELECT upsert_site_content('contact','instagram_hidden','false');
SELECT upsert_site_content('contact','twitter_hidden','false');

SELECT upsert_site_content('resume','title_hidden','false');
SELECT upsert_site_content('resume','lead_hidden','false');

SELECT upsert_site_content('footer','github_hidden','false');
SELECT upsert_site_content('footer','linkedin_hidden','false');
SELECT upsert_site_content('footer','instagram_hidden','false');
SELECT upsert_site_content('footer','twitter_hidden','false');
