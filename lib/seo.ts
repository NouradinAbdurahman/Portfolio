import { Metadata } from 'next'

export interface SEOConfig {
  title: string
  description: string
  url?: string
  image?: string
  type?: 'website' | 'article' | 'profile'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  keywords?: string[]
  noIndex?: boolean
}

export function generateMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    url,
    image = '/favicon.png',
    type = 'website',
    publishedTime,
    modifiedTime,
    author = 'Nouraddin Abdurahman Aden',
    keywords = [],
    noIndex = false
  } = config

  const fullTitle = title.includes('Nouraddin') ? title : `${title} – Nouraddin`
  const fullUrl = url ? `https://nouradin.com${url}` : 'https://nouradin.com'
  const fullImage = image.startsWith('http') ? image : `https://nouradin.com${image}`

  const metadata: Metadata = {
    title: fullTitle,
    description: description.length > 160 ? description.substring(0, 157) + '...' : description,
    keywords: keywords.join(', '),
    robots: noIndex ? 'noindex,nofollow' : 'index,follow',
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: fullUrl,
      siteName: 'Nouraddin Portfolio',
      images: [
        {
          url: fullImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(author && { authors: [author] }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      creator: '@nouradiin_',
      images: [fullImage],
    },
  }

  return metadata
}

export function generateProjectSchema(project: {
  title: string
  description: string
  slug: string
  cover?: string
  image?: string
  tech?: string[]
  technologies?: string[]
  repo?: string
  githubUrl?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Project',
    name: project.title,
    description: project.description,
    url: `https://nouradin.com/projects/${project.slug}`,
    image: `https://nouradin.com${project.cover || project.image}`,
    author: {
      '@type': 'Person',
      name: 'Nouraddin Abdurahman Aden',
      url: 'https://nouradin.com',
      jobTitle: 'Software Engineer',
    },
    programmingLanguage: project.tech || project.technologies || [],
    codeRepository: project.repo || project.githubUrl || '',
    applicationCategory: 'SoftwareApplication',
    operatingSystem: 'Web, Mobile',
    dateCreated: '2024',
    dateModified: new Date().toISOString().split('T')[0],
    keywords: (project.tech || project.technologies || []).join(', '),
    license: 'MIT',
    creator: {
      '@type': 'Person',
      name: 'Nouraddin Abdurahman Aden',
      jobTitle: 'Software Engineer',
      url: 'https://nouradin.com',
    },
  }
}

export function generatePersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Nouraddin Abdurahman Aden',
    url: 'https://nouradin.com',
    image: 'https://nouradin.com/favicon.png',
    jobTitle: 'Software Engineer',
    description: 'Full-Stack Developer, Data Engineer, and Cloud Solutions Architect. Building scalable applications and data-driven systems.',
    sameAs: [
      'https://github.com/NouradinAbdurahman',
      'https://linkedin.com/in/nouraddin',
      'https://instagram.com/nouradiin_',
      'https://x.com/Nouradin1208',
    ],
    knowsAbout: [
      'JavaScript',
      'TypeScript',
      'React',
      'Next.js',
      'Python',
      'Flutter',
      'Node.js',
      'AWS',
      'Firebase',
      'PostgreSQL',
    ],
    alumniOf: 'Software Engineering Student',
    worksFor: {
      '@type': 'Organization',
      name: 'Freelance',
    },
  }
}
