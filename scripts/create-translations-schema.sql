-- Create translations table for centralized multi-language support
-- Run in Supabase SQL Editor

-- Drop existing translations table if it exists
DROP TABLE IF EXISTS translations CASCADE;

-- Create translations table
CREATE TABLE translations (
  id BIGSERIAL PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  en TEXT NOT NULL, -- English is the base language
  ar TEXT, -- Arabic
  tr TEXT, -- Turkish
  it TEXT, -- Italian
  fr TEXT, -- French
  de TEXT, -- German
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  auto_translated BOOLEAN DEFAULT FALSE, -- Track if translation was auto-generated
  needs_review BOOLEAN DEFAULT FALSE -- Flag for manual review
);

-- Create index for faster lookups
CREATE INDEX idx_translations_key ON translations(key);
CREATE INDEX idx_translations_auto_translated ON translations(auto_translated);
CREATE INDEX idx_translations_needs_review ON translations(needs_review);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_translations_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
CREATE TRIGGER trigger_update_translations_updated_at
  BEFORE UPDATE ON translations
  FOR EACH ROW
  EXECUTE FUNCTION update_translations_updated_at();

-- Create function to upsert translations
CREATE OR REPLACE FUNCTION upsert_translation(
  p_key TEXT,
  p_en TEXT,
  p_ar TEXT DEFAULT NULL,
  p_tr TEXT DEFAULT NULL,
  p_it TEXT DEFAULT NULL,
  p_fr TEXT DEFAULT NULL,
  p_de TEXT DEFAULT NULL,
  p_auto_translated BOOLEAN DEFAULT FALSE,
  p_needs_review BOOLEAN DEFAULT FALSE
)
RETURNS VOID AS $$
BEGIN
  INSERT INTO translations(key, en, ar, tr, it, fr, de, auto_translated, needs_review)
  VALUES (p_key, p_en, p_ar, p_tr, p_it, p_fr, p_de, p_auto_translated, p_needs_review)
  ON CONFLICT (key)
  DO UPDATE SET 
    en = EXCLUDED.en,
    ar = COALESCE(EXCLUDED.ar, translations.ar),
    tr = COALESCE(EXCLUDED.tr, translations.tr),
    it = COALESCE(EXCLUDED.it, translations.it),
    fr = COALESCE(EXCLUDED.fr, translations.fr),
    de = COALESCE(EXCLUDED.de, translations.de),
    auto_translated = EXCLUDED.auto_translated,
    needs_review = EXCLUDED.needs_review,
    updated_at = NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to get translation with fallback
CREATE OR REPLACE FUNCTION get_translation(
  p_key TEXT,
  p_locale TEXT DEFAULT 'en'
)
RETURNS TEXT AS $$
DECLARE
  result TEXT;
BEGIN
  SELECT CASE p_locale
    WHEN 'ar' THEN COALESCE(ar, en)
    WHEN 'tr' THEN COALESCE(tr, en)
    WHEN 'it' THEN COALESCE(it, en)
    WHEN 'fr' THEN COALESCE(fr, en)
    WHEN 'de' THEN COALESCE(de, en)
    ELSE en
  END INTO result
  FROM translations
  WHERE key = p_key;
  
  RETURN COALESCE(result, '');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to get all translations for a locale
CREATE OR REPLACE FUNCTION get_translations_for_locale(p_locale TEXT DEFAULT 'en')
RETURNS TABLE(key TEXT, value TEXT) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    t.key,
    CASE p_locale
      WHEN 'ar' THEN COALESCE(t.ar, t.en)
      WHEN 'tr' THEN COALESCE(t.tr, t.en)
      WHEN 'it' THEN COALESCE(t.it, t.en)
      WHEN 'fr' THEN COALESCE(t.fr, t.en)
      WHEN 'de' THEN COALESCE(t.de, t.en)
      ELSE t.en
    END as value
  FROM translations t
  ORDER BY t.key;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Insert initial translations from existing JSON structure
-- Hero section
SELECT upsert_translation('hero.title', 'Software Engineer • Full-Stack Developer • Data Engineer');
SELECT upsert_translation('hero.subtitle', 'Building scalable applications, cloud-driven systems, and data-powered solutions. Passionate about creating efficient ETL pipelines, modern web experiences, and automated workflows.');
SELECT upsert_translation('hero.ctaPrimary', 'View My LinkedIn');
SELECT upsert_translation('hero.ctaSecondary', 'Contact Me');
SELECT upsert_translation('hero.ctaPrimaryLabel', 'View My LinkedIn');
SELECT upsert_translation('hero.ctaSecondaryLabel', 'Contact Me');

-- About section
SELECT upsert_translation('about.title', 'About Me');
SELECT upsert_translation('about.subtitle', 'Nouraddin - Software Engineering Student & Developer');
SELECT upsert_translation('about.name', 'Nouraddin Abdurahman Aden');
SELECT upsert_translation('about.role', 'Software Engineering Student & Developer');
SELECT upsert_translation('about.body', 'Hi, I''m Nouraddin! Currently pursuing Software Engineering at OSTİM Teknik University, I specialize in building scalable applications and data-driven solutions. My passion lies in creating efficient systems that bridge the gap between complex data and user-friendly interfaces.');
SELECT upsert_translation('about.fullstackExpertise', 'Proficient in React, Next.js, Flutter, and modern web technologies for creating responsive, performant applications.');
SELECT upsert_translation('about.dataEngineering', 'Experienced in ETL pipeline development, SQL optimization, and cloud-based data processing solutions.');
SELECT upsert_translation('about.cloudAutomation', 'Skilled in AWS, Firebase, and building automated workflows that scale with business needs.');
SELECT upsert_translation('about.fullstackExpertiseHeader', 'Full-Stack Development:');
SELECT upsert_translation('about.dataEngineeringHeader', 'Data Engineering:');
SELECT upsert_translation('about.cloudAutomationHeader', 'Cloud & Automation:');

-- Services section
SELECT upsert_translation('services.title', 'Services');
SELECT upsert_translation('services.subtitle', 'Comprehensive solutions for your digital needs');
SELECT upsert_translation('services.webDevelopment.title', 'Web Development');
SELECT upsert_translation('services.webDevelopment.description', 'Custom web applications using modern technologies like React, Next.js, and TypeScript');
SELECT upsert_translation('services.mobileDevelopment.title', 'Mobile Development');
SELECT upsert_translation('services.mobileDevelopment.description', 'Cross-platform mobile apps with Flutter and React Native for iOS and Android');
SELECT upsert_translation('services.dataEngineering.title', 'Data Engineering');
SELECT upsert_translation('services.dataEngineering.description', 'ETL pipelines, data processing, and analytics solutions using Python and cloud technologies');
SELECT upsert_translation('services.cloudSolutions.title', 'Cloud Solutions');
SELECT upsert_translation('services.cloudSolutions.description', 'Scalable cloud infrastructure and deployment solutions using AWS and Firebase');

-- Skills section
SELECT upsert_translation('skills.title', 'Technical Skills');
SELECT upsert_translation('skills.lead', 'Technologies and tools I work with');
SELECT upsert_translation('skills.catFullTitle', 'Full-Stack Development');
SELECT upsert_translation('skills.catFullDesc', 'React, Next.js, Flutter, Node.js');
SELECT upsert_translation('skills.catDataTitle', 'Data Engineering');
SELECT upsert_translation('skills.catDataDesc', 'ETL Pipelines, SQL, Python, Analytics');
SELECT upsert_translation('skills.catCloudTitle', 'Cloud & DevOps');
SELECT upsert_translation('skills.catCloudDesc', 'AWS, Firebase, Automation, CI/CD');
SELECT upsert_translation('skills.fullStack.title', 'Full-Stack Development');
SELECT upsert_translation('skills.fullStack.description', 'React, Next.js, Flutter, Node.js');
SELECT upsert_translation('skills.dataEngineering.title', 'Data Engineering');
SELECT upsert_translation('skills.dataEngineering.description', 'ETL Pipelines, SQL, Python, Analytics');
SELECT upsert_translation('skills.cloudTools.title', 'Cloud & Tools');
SELECT upsert_translation('skills.cloudTools.description', 'AWS, Firebase, Docker, Git');

-- Projects section
SELECT upsert_translation('projects.title', 'Featured Projects');
SELECT upsert_translation('projects.subtitle', 'A showcase of my recent work and technical expertise');
SELECT upsert_translation('projects.viewDetails', 'View Details');
SELECT upsert_translation('projects.viewRepository', 'Repository');
SELECT upsert_translation('projects.viewLiveDemo', 'Live Demo');
SELECT upsert_translation('projects.technologies', 'Technologies');
SELECT upsert_translation('projects.problem', 'Problem');
SELECT upsert_translation('projects.solution', 'Solution');
SELECT upsert_translation('projects.outcome', 'Outcome');
SELECT upsert_translation('projects.keyFeatures', 'Key Features');
SELECT upsert_translation('projects.architecture', 'Architecture');
SELECT upsert_translation('projects.technicalChallenges', 'Technical Challenges');
SELECT upsert_translation('projects.keyLearnings', 'Key Learnings');
SELECT upsert_translation('projects.impact', 'Impact');
SELECT upsert_translation('projects.backToProjects', 'Back to Projects');
SELECT upsert_translation('projects.allProjects', 'All Projects');

-- Contact section
SELECT upsert_translation('contact.title', 'Get In Touch');
SELECT upsert_translation('contact.subtitle', 'Let''s discuss your next project or just say hello');
SELECT upsert_translation('contact.letsConnect', 'Let''s Connect');
SELECT upsert_translation('contact.introText', 'I''m always interested in new opportunities, challenging projects, and meaningful collaborations. Whether you have a specific project in mind or just want to explore possibilities, I''d love to hear from you.');
SELECT upsert_translation('contact.name', 'Name');
SELECT upsert_translation('contact.email', 'Email');
SELECT upsert_translation('contact.subject', 'Subject');
SELECT upsert_translation('contact.message', 'Message');
SELECT upsert_translation('contact.sendMessage', 'Send Message');
SELECT upsert_translation('contact.sending', 'Sending...');
SELECT upsert_translation('contact.success', 'Message sent successfully!');
SELECT upsert_translation('contact.error', 'Failed to send message. Please try again.');
SELECT upsert_translation('contact.firstName', 'First Name');
SELECT upsert_translation('contact.lastName', 'Last Name');
SELECT upsert_translation('contact.emailAddress', 'Email Address');
SELECT upsert_translation('contact.phone', 'Phone');
SELECT upsert_translation('contact.location', 'Location');

-- Resume section
SELECT upsert_translation('resume.title', 'Resume');
SELECT upsert_translation('resume.subtitle', 'My professional journey and achievements');
SELECT upsert_translation('resume.education.title', 'Education');
SELECT upsert_translation('resume.education.degree', 'Bachelor of Science in Software Engineering');
SELECT upsert_translation('resume.education.university', 'OSTİM Teknik University');
SELECT upsert_translation('resume.education.period', '2022 - Present');
SELECT upsert_translation('resume.certifications.title', 'Certifications');
SELECT upsert_translation('resume.certifications.dataEngineer', 'Associate Data Engineer in SQL');
SELECT upsert_translation('resume.certifications.dataScientist', 'Data Scientist in Python');
SELECT upsert_translation('resume.certifications.dataAnalyst', 'Data Analyst in SQL');
SELECT upsert_translation('resume.experience.title', 'Experience');
SELECT upsert_translation('resume.experience.freelance.title', 'Freelance Developer');
SELECT upsert_translation('resume.experience.freelance.period', '2022 - Present');
SELECT upsert_translation('resume.experience.freelance.description', 'Developing web and mobile applications for various clients');
SELECT upsert_translation('resume.technicalSkills.title', 'Technical Skills');
SELECT upsert_translation('resume.technicalSkills.languages', 'Programming Languages');
SELECT upsert_translation('resume.technicalSkills.frameworks', 'Frameworks & Libraries');
SELECT upsert_translation('resume.technicalSkills.tools', 'Tools & Technologies');
SELECT upsert_translation('resume.downloadResume', 'Download Resume');

-- Footer section
SELECT upsert_translation('footer.rights', 'All rights reserved');
SELECT upsert_translation('footer.builtWith', 'Built with Next.js and Tailwind CSS');

-- Navigation
SELECT upsert_translation('navigation.home', 'Home');
SELECT upsert_translation('navigation.about', 'About');
SELECT upsert_translation('navigation.services', 'Services');
SELECT upsert_translation('navigation.skills', 'Skills');
SELECT upsert_translation('navigation.projects', 'Projects');
SELECT upsert_translation('navigation.contact', 'Contact');
SELECT upsert_translation('navigation.resume', 'Resume');

-- Common
SELECT upsert_translation('common.loading', 'Loading...');
SELECT upsert_translation('common.error', 'Error');
SELECT upsert_translation('common.retry', 'Retry');
SELECT upsert_translation('common.close', 'Close');
SELECT upsert_translation('common.open', 'Open');
SELECT upsert_translation('common.readMore', 'Read More');
SELECT upsert_translation('common.showLess', 'Show Less');

-- Admin
SELECT upsert_translation('admin.title', 'Admin Panel');
SELECT upsert_translation('admin.dashboard', 'Dashboard');
SELECT upsert_translation('admin.content', 'Content');
SELECT upsert_translation('admin.settings', 'Settings');
SELECT upsert_translation('admin.login', 'Login');
SELECT upsert_translation('admin.logout', 'Logout');
SELECT upsert_translation('admin.save', 'Save');
SELECT upsert_translation('admin.cancel', 'Cancel');
SELECT upsert_translation('admin.edit', 'Edit');
SELECT upsert_translation('admin.delete', 'Delete');
SELECT upsert_translation('admin.add', 'Add');
SELECT upsert_translation('admin.hide', 'Hide');
SELECT upsert_translation('admin.show', 'Show');
SELECT upsert_translation('admin.default', 'Default');
SELECT upsert_translation('admin.undo', 'Undo');

-- Languages
SELECT upsert_translation('languages.en', 'English');
SELECT upsert_translation('languages.ar', 'العربية');
SELECT upsert_translation('languages.tr', 'Türkçe');
SELECT upsert_translation('languages.it', 'Italiano');
SELECT upsert_translation('languages.fr', 'Français');
SELECT upsert_translation('languages.de', 'Deutsch');

-- Project details (GitHub Profile Analyzer)
SELECT upsert_translation('projects.items.github-profile-analyzer.title', 'GitHub Profile Analyzer');
SELECT upsert_translation('projects.items.github-profile-analyzer.description', 'AI‑powered insights for GitHub developers. Real‑time analytics, AI‑generated summaries, profile optimization, and personalized dashboards. Built with Next.js, TypeScript, Tailwind CSS, and Firebase. Integrated with DAKAEi AI API and the GitHub API.');
SELECT upsert_translation('projects.items.github-profile-analyzer.category', 'AI Analytics • Developer Tools');
SELECT upsert_translation('projects.items.github-profile-analyzer.problem', 'Developers and recruiters struggle to extract meaningful insights from GitHub profiles, making it difficult to assess coding patterns, productivity trends, and technical expertise from raw repository data.');
SELECT upsert_translation('projects.items.github-profile-analyzer.solution', 'Built an AI-powered analytics platform that connects to GitHub APIs to analyze coding patterns, generate natural language summaries, and provide comprehensive visualizations of developer activity and growth patterns.');
SELECT upsert_translation('projects.items.github-profile-analyzer.outcome', 'Increased profile optimization speed by ~60% in user tests, with 85% of users reporting better understanding of their coding patterns.');
SELECT upsert_translation('projects.items.github-profile-analyzer.architecture', 'Frontend built with Next.js and TypeScript for type safety, Tailwind CSS for responsive design, Firebase for authentication and data storage, OpenAI API for natural language processing, and GitHub REST/GraphQL APIs for data retrieval. The application uses server-side rendering for optimal performance and SEO.');
SELECT upsert_translation('projects.items.github-profile-analyzer.impact', 'Helped developers understand their coding patterns and improve their GitHub presence, with over 100+ profile analyses completed.');

-- Project details (IntelliStudy)
SELECT upsert_translation('projects.items.intellistudy.title', 'IntelliStudy Platform');
SELECT upsert_translation('projects.items.intellistudy.description', 'AI‑powered learning assistant for students. Features text summarization, content rewriting, academic Q&A chatbot, and a quiz generator. Built with Next.js, React, Tailwind CSS, and shadcn/ui. Integrated with DAKAEi AI API.');
SELECT upsert_translation('projects.items.intellistudy.category', 'Full-Stack • AI Integration');
SELECT upsert_translation('projects.items.intellistudy.problem', 'Students struggle with information overload and need efficient tools to summarize, understand, and retain academic content across various subjects and formats.');
SELECT upsert_translation('projects.items.intellistudy.solution', 'Developed an AI-powered learning platform that provides text summarization, content rewriting, academic Q&A chatbot, and quiz generation to help students process and retain information more effectively.');
SELECT upsert_translation('projects.items.intellistudy.outcome', 'Improved study efficiency by 40% in user testing, with 90% of students reporting better content comprehension.');
SELECT upsert_translation('projects.items.intellistudy.architecture', 'Built with Next.js 14 and App Router, React for UI components, Tailwind CSS for styling, shadcn/ui for component library, and OpenAI API for all AI functionalities. Deployed on Vercel with edge functions for optimal performance.');
SELECT upsert_translation('projects.items.intellistudy.impact', 'Provided students with powerful AI tools for academic success, improving study efficiency and content comprehension.');

-- Project details (Ohay)
SELECT upsert_translation('projects.items.ohay.title', 'Ohay Mobile App');
SELECT upsert_translation('projects.items.ohay.description', 'A modern, multi‑vendor food delivery platform for iOS and Android. Customers can order from multiple restaurants in one checkout, track couriers in real time, and receive itemized digital receipts. Built with Flutter and Firebase with payment gateway integrations. Supports iOS background fetch, push notifications, and full internationalization for a localized, premium experience.');
SELECT upsert_translation('projects.items.ohay.category', 'Mobile Development • Real-time Systems');
SELECT upsert_translation('projects.items.ohay.problem', 'Food delivery apps typically limit users to ordering from one restaurant at a time, creating inconvenience when users want items from multiple restaurants in a single order.');
SELECT upsert_translation('projects.items.ohay.solution', 'Created a multi-vendor food delivery platform that allows customers to order from multiple restaurants in one checkout, with real-time courier tracking and comprehensive order management.');
SELECT upsert_translation('projects.items.ohay.outcome', 'Achieved 4.8/5 app store rating with 1000+ downloads and 95% user satisfaction in beta testing.');
SELECT upsert_translation('projects.items.ohay.architecture', 'Cross-platform mobile app built with Flutter, Firebase for backend services including authentication, real-time database, and cloud functions. Integrated with Stripe for payments and Google Maps for tracking.');
SELECT upsert_translation('projects.items.ohay.impact', 'Delivered a premium food delivery experience with multi-vendor support and real-time tracking, enhancing customer satisfaction and operational efficiency.');

-- Project details (Viaggi Qatar)
SELECT upsert_translation('projects.items.viaggi-qatar-booking.title', 'Viaggi del Qatar Tour Booking System');
SELECT upsert_translation('projects.items.viaggi-qatar-booking.description', 'An advanced booking management platform supporting multi‑tour reservations, receipt generation, and real‑time operational dashboards. Built with Next.js 14+ and PostgreSQL (Neon) using server‑ side rendering for speed and SEO. Includes an agent portal, mobile‑first UI, and PDF preview with export and filtering for itineraries and invoices.');
SELECT upsert_translation('projects.items.viaggi-qatar-booking.category', 'Full‑Stack • Next.js 14 • PostgreSQL (Neon)');
SELECT upsert_translation('projects.items.viaggi-qatar-booking.problem', 'Travel agencies need a comprehensive booking management system that can handle multiple tour reservations, generate receipts, and provide real-time operational dashboards for efficient business management.');
SELECT upsert_translation('projects.items.viaggi-qatar-booking.solution', 'Developed an advanced booking platform with multi-tour reservation capabilities, automated receipt generation, real-time dashboards, and comprehensive administrative tools for travel agencies.');
SELECT upsert_translation('projects.items.viaggi-qatar-booking.outcome', 'Streamlined booking operations by 70%, reduced manual work by 80%, and improved customer satisfaction scores by 25%.');
SELECT upsert_translation('projects.items.viaggi-qatar-booking.architecture', 'Next.js 14 with App Router, TypeScript for type safety, PostgreSQL with Prisma ORM for database management, server-side rendering for performance, and integrated PDF generation services.');
SELECT upsert_translation('projects.items.viaggi-qatar-booking.impact', 'Streamlined tour booking operations for travel agencies, improving booking efficiency and providing comprehensive administrative tools for tour management.');

-- Grant permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON translations TO authenticated;
GRANT USAGE ON SEQUENCE translations_id_seq TO authenticated;
GRANT EXECUTE ON FUNCTION upsert_translation TO authenticated;
GRANT EXECUTE ON FUNCTION get_translation TO authenticated;
GRANT EXECUTE ON FUNCTION get_translations_for_locale TO authenticated;
