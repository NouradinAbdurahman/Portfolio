-- Run in Supabase SQL Editor
-- New KV-style schema
DROP TABLE IF EXISTS site_content;
CREATE TABLE IF NOT EXISTS site_content (
  id BIGSERIAL PRIMARY KEY,
  section TEXT NOT NULL,
  tag TEXT NOT NULL,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(section, tag)
);

-- Insert defaults (edit as needed)
-- Upsert helper
CREATE OR REPLACE FUNCTION upsert_site_content(p_section TEXT, p_tag TEXT, p_value TEXT)
RETURNS VOID AS $$
BEGIN
  INSERT INTO site_content(section, tag, value)
  VALUES (p_section, p_tag, p_value)
  ON CONFLICT (section, tag)
  DO UPDATE SET value = EXCLUDED.value, updated_at = NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Seed defaults
SELECT upsert_site_content('hero','title','Software Engineer • Full-Stack Developer • Data Engineer');
SELECT upsert_site_content('hero','subtitle','Building scalable applications, cloud-driven systems, and data-powered solutions.');
SELECT upsert_site_content('hero','ctaPrimaryLabel','View Portfolio');
SELECT upsert_site_content('hero','ctaPrimaryHref','#portfolio');
SELECT upsert_site_content('hero','ctaSecondaryLabel','Contact Me');
SELECT upsert_site_content('hero','ctaSecondaryHref','#contact');

SELECT upsert_site_content('about','title','About Me');
SELECT upsert_site_content('about','subtitle','Nouraddin - Software Engineering Student & Developer');
SELECT upsert_site_content('about','name','Nouraddin Abdurahman Aden');
SELECT upsert_site_content('about','role','Software Engineering Student & Developer');

SELECT upsert_site_content('services','title','Services');
SELECT upsert_site_content('services','subtitle','Comprehensive solutions for your digital needs');

SELECT upsert_site_content('projects','title','Featured Projects');
SELECT upsert_site_content('projects','subtitle','A showcase of my recent work and technical expertise');

SELECT upsert_site_content('skills','title','Technical Skills');
SELECT upsert_site_content('skills','lead','Technologies and tools I work with');

SELECT upsert_site_content('contact','title','Get In Touch');
SELECT upsert_site_content('contact','lead','Let''s discuss your next project or collaboration opportunity');
SELECT upsert_site_content('contact','email','n.aden1208@gmail.com');
SELECT upsert_site_content('contact','phone','+90 552 875 97 71');
SELECT upsert_site_content('contact','location','Ankara, Turkey');
SELECT upsert_site_content('contact','github','https://github.com/NouradinAbdurahman');
SELECT upsert_site_content('contact','linkedin','https://linkedin.com/in/nouraddin');
SELECT upsert_site_content('contact','instagram','https://instagram.com/nouradiin_');
SELECT upsert_site_content('contact','twitter','https://x.com/Nouradin1208');

SELECT upsert_site_content('resume','title','Resume');
SELECT upsert_site_content('resume','lead','My professional journey and technical expertise');

-- Footer now has no small text
DELETE FROM site_content WHERE section='footer' AND tag='small';


