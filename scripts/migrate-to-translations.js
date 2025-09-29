#!/usr/bin/env node

/**
 * Migration script to populate the translations table with existing content
 * Run this after creating the translations table schema
 */

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing required environment variables: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Translation data from existing JSON files
const translations = [
  // Hero section
  { key: 'hero.title', en: 'Software Engineer • Full-Stack Developer • Data Engineer' },
  { key: 'hero.subtitle', en: 'Building scalable applications, cloud-driven systems, and data-powered solutions. Passionate about creating efficient ETL pipelines, modern web experiences, and automated workflows.' },
  { key: 'hero.ctaPrimary', en: 'View My LinkedIn' },
  { key: 'hero.ctaSecondary', en: 'Contact Me' },
  { key: 'hero.ctaPrimaryLabel', en: 'View My LinkedIn' },
  { key: 'hero.ctaSecondaryLabel', en: 'Contact Me' },

  // About section
  { key: 'about.title', en: 'About Me' },
  { key: 'about.subtitle', en: 'Nouraddin - Software Engineering Student & Developer' },
  { key: 'about.name', en: 'Nouraddin Abdurahman Aden' },
  { key: 'about.role', en: 'Software Engineering Student & Developer' },
  { key: 'about.body', en: 'Hi, I\'m Nouraddin! Currently pursuing Software Engineering at OSTİM Teknik University, I specialize in building scalable applications and data-driven solutions. My passion lies in creating efficient systems that bridge the gap between complex data and user-friendly interfaces.' },
  { key: 'about.fullstackExpertise', en: 'Proficient in React, Next.js, Flutter, and modern web technologies for creating responsive, performant applications.' },
  { key: 'about.dataEngineering', en: 'Experienced in ETL pipeline development, SQL optimization, and cloud-based data processing solutions.' },
  { key: 'about.cloudAutomation', en: 'Skilled in AWS, Firebase, and building automated workflows that scale with business needs.' },
  { key: 'about.fullstackExpertiseHeader', en: 'Full-Stack Development:' },
  { key: 'about.dataEngineeringHeader', en: 'Data Engineering:' },
  { key: 'about.cloudAutomationHeader', en: 'Cloud & Automation:' },

  // Services section
  { key: 'services.title', en: 'Services' },
  { key: 'services.subtitle', en: 'Comprehensive solutions for your digital needs' },
  { key: 'services.webDevelopment.title', en: 'Web Development' },
  { key: 'services.webDevelopment.description', en: 'Custom web applications using modern technologies like React, Next.js, and TypeScript' },
  { key: 'services.mobileDevelopment.title', en: 'Mobile Development' },
  { key: 'services.mobileDevelopment.description', en: 'Cross-platform mobile apps with Flutter and React Native for iOS and Android' },
  { key: 'services.dataEngineering.title', en: 'Data Engineering' },
  { key: 'services.dataEngineering.description', en: 'ETL pipelines, data processing, and analytics solutions using Python and cloud technologies' },
  { key: 'services.cloudSolutions.title', en: 'Cloud Solutions' },
  { key: 'services.cloudSolutions.description', en: 'Scalable cloud infrastructure and deployment solutions using AWS and Firebase' },

  // Skills section
  { key: 'skills.title', en: 'Technical Skills' },
  { key: 'skills.lead', en: 'Technologies and tools I work with' },
  { key: 'skills.catFullTitle', en: 'Full-Stack Development' },
  { key: 'skills.catFullDesc', en: 'React, Next.js, Flutter, Node.js' },
  { key: 'skills.catDataTitle', en: 'Data Engineering' },
  { key: 'skills.catDataDesc', en: 'ETL Pipelines, SQL, Python, Analytics' },
  { key: 'skills.catCloudTitle', en: 'Cloud & DevOps' },
  { key: 'skills.catCloudDesc', en: 'AWS, Firebase, Automation, CI/CD' },
  { key: 'skills.fullStack.title', en: 'Full-Stack Development' },
  { key: 'skills.fullStack.description', en: 'React, Next.js, Flutter, Node.js' },
  { key: 'skills.dataEngineering.title', en: 'Data Engineering' },
  { key: 'skills.dataEngineering.description', en: 'ETL Pipelines, SQL, Python, Analytics' },
  { key: 'skills.cloudTools.title', en: 'Cloud & Tools' },
  { key: 'skills.cloudTools.description', en: 'AWS, Firebase, Docker, Git' },

  // Projects section
  { key: 'projects.title', en: 'Featured Projects' },
  { key: 'projects.subtitle', en: 'A showcase of my recent work and technical expertise' },
  { key: 'projects.viewDetails', en: 'View Details' },
  { key: 'projects.viewRepository', en: 'Repository' },
  { key: 'projects.viewLiveDemo', en: 'Live Demo' },
  { key: 'projects.technologies', en: 'Technologies' },
  { key: 'projects.problem', en: 'Problem' },
  { key: 'projects.solution', en: 'Solution' },
  { key: 'projects.outcome', en: 'Outcome' },
  { key: 'projects.keyFeatures', en: 'Key Features' },
  { key: 'projects.architecture', en: 'Architecture' },
  { key: 'projects.technicalChallenges', en: 'Technical Challenges' },
  { key: 'projects.keyLearnings', en: 'Key Learnings' },
  { key: 'projects.impact', en: 'Impact' },
  { key: 'projects.backToProjects', en: 'Back to Projects' },
  { key: 'projects.allProjects', en: 'All Projects' },

  // Contact section
  { key: 'contact.title', en: 'Get In Touch' },
  { key: 'contact.subtitle', en: 'Let\'s discuss your next project or just say hello' },
  { key: 'contact.letsConnect', en: 'Let\'s Connect' },
  { key: 'contact.introText', en: 'I\'m always interested in new opportunities, challenging projects, and meaningful collaborations. Whether you have a specific project in mind or just want to explore possibilities, I\'d love to hear from you.' },
  { key: 'contact.name', en: 'Name' },
  { key: 'contact.email', en: 'Email' },
  { key: 'contact.subject', en: 'Subject' },
  { key: 'contact.message', en: 'Message' },
  { key: 'contact.sendMessage', en: 'Send Message' },
  { key: 'contact.sending', en: 'Sending...' },
  { key: 'contact.success', en: 'Message sent successfully!' },
  { key: 'contact.error', en: 'Failed to send message. Please try again.' },
  { key: 'contact.firstName', en: 'First Name' },
  { key: 'contact.lastName', en: 'Last Name' },
  { key: 'contact.emailAddress', en: 'Email Address' },
  { key: 'contact.phone', en: 'Phone' },
  { key: 'contact.location', en: 'Location' },

  // Resume section
  { key: 'resume.title', en: 'Resume' },
  { key: 'resume.subtitle', en: 'My professional journey and achievements' },
  { key: 'resume.education.title', en: 'Education' },
  { key: 'resume.education.degree', en: 'Bachelor of Science in Software Engineering' },
  { key: 'resume.education.university', en: 'OSTİM Teknik University' },
  { key: 'resume.education.period', en: '2022 - Present' },
  { key: 'resume.certifications.title', en: 'Certifications' },
  { key: 'resume.certifications.dataEngineer', en: 'Associate Data Engineer in SQL' },
  { key: 'resume.certifications.dataScientist', en: 'Data Scientist in Python' },
  { key: 'resume.certifications.dataAnalyst', en: 'Data Analyst in SQL' },
  { key: 'resume.experience.title', en: 'Experience' },
  { key: 'resume.experience.freelance.title', en: 'Freelance Developer' },
  { key: 'resume.experience.freelance.period', en: '2022 - Present' },
  { key: 'resume.experience.freelance.description', en: 'Developing web and mobile applications for various clients' },
  { key: 'resume.technicalSkills.title', en: 'Technical Skills' },
  { key: 'resume.technicalSkills.languages', en: 'Programming Languages' },
  { key: 'resume.technicalSkills.frameworks', en: 'Frameworks & Libraries' },
  { key: 'resume.technicalSkills.tools', en: 'Tools & Technologies' },
  { key: 'resume.downloadResume', en: 'Download Resume' },

  // Footer section
  { key: 'footer.rights', en: 'All rights reserved' },
  { key: 'footer.builtWith', en: 'Built with Next.js and Tailwind CSS' },

  // Navigation
  { key: 'navigation.home', en: 'Home' },
  { key: 'navigation.about', en: 'About' },
  { key: 'navigation.services', en: 'Services' },
  { key: 'navigation.skills', en: 'Skills' },
  { key: 'navigation.projects', en: 'Projects' },
  { key: 'navigation.contact', en: 'Contact' },
  { key: 'navigation.resume', en: 'Resume' },

  // Common
  { key: 'common.loading', en: 'Loading...' },
  { key: 'common.error', en: 'Error' },
  { key: 'common.retry', en: 'Retry' },
  { key: 'common.close', en: 'Close' },
  { key: 'common.open', en: 'Open' },
  { key: 'common.readMore', en: 'Read More' },
  { key: 'common.showLess', en: 'Show Less' },

  // Admin
  { key: 'admin.title', en: 'Admin Panel' },
  { key: 'admin.dashboard', en: 'Dashboard' },
  { key: 'admin.content', en: 'Content' },
  { key: 'admin.settings', en: 'Settings' },
  { key: 'admin.login', en: 'Login' },
  { key: 'admin.logout', en: 'Logout' },
  { key: 'admin.save', en: 'Save' },
  { key: 'admin.cancel', en: 'Cancel' },
  { key: 'admin.edit', en: 'Edit' },
  { key: 'admin.delete', en: 'Delete' },
  { key: 'admin.add', en: 'Add' },
  { key: 'admin.hide', en: 'Hide' },
  { key: 'admin.show', en: 'Show' },
  { key: 'admin.default', en: 'Default' },
  { key: 'admin.undo', en: 'Undo' },

  // Languages
  { key: 'languages.en', en: 'English' },
  { key: 'languages.ar', en: 'العربية' },
  { key: 'languages.tr', en: 'Türkçe' },
  { key: 'languages.it', en: 'Italiano' },
  { key: 'languages.fr', en: 'Français' },
  { key: 'languages.de', en: 'Deutsch' },

  // Project details (GitHub Profile Analyzer)
  { key: 'projects.items.github-profile-analyzer.title', en: 'GitHub Profile Analyzer' },
  { key: 'projects.items.github-profile-analyzer.description', en: 'AI‑powered insights for GitHub developers. Real‑time analytics, AI‑generated summaries, profile optimization, and personalized dashboards. Built with Next.js, TypeScript, Tailwind CSS, and Firebase. Integrated with DAKAEi AI API and the GitHub API.' },
  { key: 'projects.items.github-profile-analyzer.category', en: 'AI Analytics • Developer Tools' },
  { key: 'projects.items.github-profile-analyzer.problem', en: 'Developers and recruiters struggle to extract meaningful insights from GitHub profiles, making it difficult to assess coding patterns, productivity trends, and technical expertise from raw repository data.' },
  { key: 'projects.items.github-profile-analyzer.solution', en: 'Built an AI-powered analytics platform that connects to GitHub APIs to analyze coding patterns, generate natural language summaries, and provide comprehensive visualizations of developer activity and growth patterns.' },
  { key: 'projects.items.github-profile-analyzer.outcome', en: 'Increased profile optimization speed by ~60% in user tests, with 85% of users reporting better understanding of their coding patterns.' },
  { key: 'projects.items.github-profile-analyzer.architecture', en: 'Frontend built with Next.js and TypeScript for type safety, Tailwind CSS for responsive design, Firebase for authentication and data storage, OpenAI API for natural language processing, and GitHub REST/GraphQL APIs for data retrieval. The application uses server-side rendering for optimal performance and SEO.' },
  { key: 'projects.items.github-profile-analyzer.impact', en: 'Helped developers understand their coding patterns and improve their GitHub presence, with over 100+ profile analyses completed.' },

  // Project details (IntelliStudy)
  { key: 'projects.items.intellistudy.title', en: 'IntelliStudy Platform' },
  { key: 'projects.items.intellistudy.description', en: 'AI‑powered learning assistant for students. Features text summarization, content rewriting, academic Q&A chatbot, and a quiz generator. Built with Next.js, React, Tailwind CSS, and shadcn/ui. Integrated with DAKAEi AI API.' },
  { key: 'projects.items.intellistudy.category', en: 'Full-Stack • AI Integration' },
  { key: 'projects.items.intellistudy.problem', en: 'Students struggle with information overload and need efficient tools to summarize, understand, and retain academic content across various subjects and formats.' },
  { key: 'projects.items.intellistudy.solution', en: 'Developed an AI-powered learning platform that provides text summarization, content rewriting, academic Q&A chatbot, and quiz generation to help students process and retain information more effectively.' },
  { key: 'projects.items.intellistudy.outcome', en: 'Improved study efficiency by 40% in user testing, with 90% of students reporting better content comprehension.' },
  { key: 'projects.items.intellistudy.architecture', en: 'Built with Next.js 14 and App Router, React for UI components, Tailwind CSS for styling, shadcn/ui for component library, and OpenAI API for all AI functionalities. Deployed on Vercel with edge functions for optimal performance.' },
  { key: 'projects.items.intellistudy.impact', en: 'Provided students with powerful AI tools for academic success, improving study efficiency and content comprehension.' },

  // Project details (Ohay)
  { key: 'projects.items.ohay.title', en: 'Ohay Mobile App' },
  { key: 'projects.items.ohay.description', en: 'A modern, multi‑vendor food delivery platform for iOS and Android. Customers can order from multiple restaurants in one checkout, track couriers in real time, and receive itemized digital receipts. Built with Flutter and Firebase with payment gateway integrations. Supports iOS background fetch, push notifications, and full internationalization for a localized, premium experience.' },
  { key: 'projects.items.ohay.category', en: 'Mobile Development • Real-time Systems' },
  { key: 'projects.items.ohay.problem', en: 'Food delivery apps typically limit users to ordering from one restaurant at a time, creating inconvenience when users want items from multiple restaurants in a single order.' },
  { key: 'projects.items.ohay.solution', en: 'Created a multi-vendor food delivery platform that allows customers to order from multiple restaurants in one checkout, with real-time courier tracking and comprehensive order management.' },
  { key: 'projects.items.ohay.outcome', en: 'Achieved 4.8/5 app store rating with 1000+ downloads and 95% user satisfaction in beta testing.' },
  { key: 'projects.items.ohay.architecture', en: 'Cross-platform mobile app built with Flutter, Firebase for backend services including authentication, real-time database, and cloud functions. Integrated with Stripe for payments and Google Maps for tracking.' },
  { key: 'projects.items.ohay.impact', en: 'Delivered a premium food delivery experience with multi-vendor support and real-time tracking, enhancing customer satisfaction and operational efficiency.' },

  // Project details (Viaggi Qatar)
  { key: 'projects.items.viaggi-qatar-booking.title', en: 'Viaggi del Qatar Tour Booking System' },
  { key: 'projects.items.viaggi-qatar-booking.description', en: 'An advanced booking management platform supporting multi‑tour reservations, receipt generation, and real‑time operational dashboards. Built with Next.js 14+ and PostgreSQL (Neon) using server‑ side rendering for speed and SEO. Includes an agent portal, mobile‑first UI, and PDF preview with export and filtering for itineraries and invoices.' },
  { key: 'projects.items.viaggi-qatar-booking.category', en: 'Full‑Stack • Next.js 14 • PostgreSQL (Neon)' },
  { key: 'projects.items.viaggi-qatar-booking.problem', en: 'Travel agencies need a comprehensive booking management system that can handle multiple tour reservations, generate receipts, and provide real-time operational dashboards for efficient business management.' },
  { key: 'projects.items.viaggi-qatar-booking.solution', en: 'Developed an advanced booking platform with multi-tour reservation capabilities, automated receipt generation, real-time dashboards, and comprehensive administrative tools for travel agencies.' },
  { key: 'projects.items.viaggi-qatar-booking.outcome', en: 'Streamlined booking operations by 70%, reduced manual work by 80%, and improved customer satisfaction scores by 25%.' },
  { key: 'projects.items.viaggi-qatar-booking.architecture', en: 'Next.js 14 with App Router, TypeScript for type safety, PostgreSQL with Prisma ORM for database management, server-side rendering for performance, and integrated PDF generation services.' },
  { key: 'projects.items.viaggi-qatar-booking.impact', en: 'Streamlined tour booking operations for travel agencies, improving booking efficiency and providing comprehensive administrative tools for tour management.' }
]

async function migrateTranslations() {
  console.log('Starting translation migration...')
  
  try {
    // Clear existing translations
    console.log('Clearing existing translations...')
    const { error: deleteError } = await supabase
      .from('translations')
      .delete()
      .neq('id', 0) // Delete all rows
    
    if (deleteError) {
      console.warn('Warning: Could not clear existing translations:', deleteError.message)
    }

    // Insert new translations
    console.log(`Inserting ${translations.length} translations...`)
    
    const { data, error } = await supabase
      .from('translations')
      .insert(translations.map(t => ({
        key: t.key,
        en: t.en,
        auto_translated: false,
        needs_review: false
      })))

    if (error) {
      throw new Error(`Failed to insert translations: ${error.message}`)
    }

    console.log('✅ Translation migration completed successfully!')
    console.log(`Inserted ${translations.length} translation keys`)
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message)
    process.exit(1)
  }
}

// Run migration
migrateTranslations()
