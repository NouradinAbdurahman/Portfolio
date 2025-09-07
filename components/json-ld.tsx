"use client"

import { generatePersonSchema } from "@/lib/seo"

export function JsonLd() {
  const personSchema = generatePersonSchema()
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Nouraddin Portfolio",
    "url": "https://nouradin.com",
    "description": "Portfolio of Nouraddin Abdurahman Aden - Software Engineer, Full-Stack Developer, and Data Engineer",
    "author": {
      "@type": "Person",
      "name": "Nouraddin Abdurahman Aden"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://nouradin.com/?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }
  
  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Nouraddin Abdurahman Aden - Software Development Services",
    "description": "Full-Stack Development, Mobile App Development, Data Engineering, and Cloud Solutions",
    "provider": {
      "@type": "Person",
      "name": "Nouraddin Abdurahman Aden"
    },
    "serviceType": [
      "Web Development",
      "Mobile Development", 
      "Data Engineering",
      "Cloud Solutions"
    ],
    "areaServed": "Worldwide",
    "url": "https://nouradin.com"
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify([personSchema, websiteSchema, professionalServiceSchema]),
      }}
    />
  )
}
