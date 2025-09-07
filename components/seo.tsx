import { generateMetadata, generateProjectSchema, generatePersonSchema } from '@/lib/seo'

interface SEOProps {
  type: 'page' | 'project'
  config?: {
    title: string
    description: string
    url?: string
    image?: string
    keywords?: string[]
  }
  project?: {
    title: string
    description: string
    slug: string
    cover?: string
    image?: string
    tech?: string[]
    technologies?: string[]
    repo?: string
    githubUrl?: string
  }
}

export function SEO({ type, config, project }: SEOProps) {
  if (type === 'project' && project) {
    const schema = generateProjectSchema(project)
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />
    )
  }

  if (type === 'page' && config) {
    const schema = generatePersonSchema()
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />
    )
  }

  return null
}

// Helper function to generate metadata for any page
export function createPageMetadata(config: {
  title: string
  description: string
  url?: string
  image?: string
  keywords?: string[]
  noIndex?: boolean
}) {
  return generateMetadata(config)
}

// Helper function to generate project metadata
export function createProjectMetadata(project: {
  title: string
  description: string
  slug: string
  cover?: string
  image?: string
  tech?: string[]
  technologies?: string[]
}) {
  return generateMetadata({
    title: project.title,
    description: project.description,
    url: `/projects/${project.slug}`,
    image: project.cover || project.image,
    keywords: project.tech || project.technologies,
    type: 'article',
  })
}
