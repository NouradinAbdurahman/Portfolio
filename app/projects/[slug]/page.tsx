import * as React from "react"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import { createClient } from '@supabase/supabase-js'
import { ProjectDetailsClient } from "./project-details-client"
import { ProjectJsonLd } from "@/components/project-json-ld"
import { getTranslations } from 'next-intl/server'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface ProjectDetailsPageProps {
  params: Promise<{ slug: string }>
}

// Server-side function to get localized project data
async function getLocalizedProject(slug: string) {
  const t = await getTranslations('projects')
  
  // Get project items from translations - access each project individually
  const projectKeys = ['github-profile-analyzer', 'intellistudy', 'portfolio-website', 'task-manager', 'weather-app']
  const translatedProjects: Record<string, any> = {}
  
  projectKeys.forEach(key => {
    try {
      const project = t(`items.${key}`) as any
      if (project && typeof project === 'object') {
        translatedProjects[key] = project
      }
    } catch (error) {
      console.warn(`Failed to get translated project ${key}:`, error)
    }
  })
  
  // Get CMS data
  let cmsProjects: any[] = []
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    
    const { data, error } = await supabase
      .from('site_content')
      .select('section, tag, value')
      .eq('section', 'projects')
      .order('tag')

    if (!error && data) {
      const projectsData = data.find(row => row.tag === 'items')
      if (projectsData?.value) {
        cmsProjects = typeof projectsData.value === 'string' 
          ? JSON.parse(projectsData.value) 
          : projectsData.value
      }
    }
  } catch (error) {
    console.error('Failed to fetch CMS data:', error)
  }
  
  // Find the project by slug
  let project = null
  
  // First, try to find in translated projects
  if (translatedProjects && typeof translatedProjects === 'object') {
    const translatedProject = translatedProjects[slug]
    if (translatedProject) {
      const cmsProject = cmsProjects.find((p: any) => 
        (p.slug || p.id || p.title)?.toLowerCase() === slug.toLowerCase()
      )
      
      // Merge translated content with CMS overrides
      project = {
        id: slug,
        slug: slug,
        ...translatedProject,
        ...cmsProject, // CMS overrides take precedence
        // Ensure non-translatable fields are preserved
        image: cmsProject?.image || translatedProject?.image || '/placeholder.jpg',
        cover: cmsProject?.cover || translatedProject?.cover || cmsProject?.image || translatedProject?.image || '/placeholder.jpg',
        technologies: cmsProject?.technologies || translatedProject?.technologies || [],
        githubUrl: cmsProject?.githubUrl || cmsProject?.repo || translatedProject?.githubUrl || translatedProject?.repo || '',
        liveUrl: cmsProject?.liveUrl || cmsProject?.demo || translatedProject?.liveUrl || translatedProject?.demo || '',
        repo: cmsProject?.repo || cmsProject?.githubUrl || translatedProject?.repo || translatedProject?.githubUrl || '',
        demo: cmsProject?.liveUrl || cmsProject?.demo || translatedProject?.liveUrl || translatedProject?.demo || '',
        hidden: cmsProject?.hidden || false,
        showDetails: cmsProject?.showDetails !== false,
        showLive: cmsProject?.showLive !== false,
        showRepo: cmsProject?.showRepo !== false,
      }
    }
  }
  
  // If not found in translations, try CMS-only projects
  if (!project) {
    const cmsProject = cmsProjects.find((p: any) => 
      (p.slug || p.id || p.title)?.toLowerCase() === slug.toLowerCase()
    )
    
    if (cmsProject && !cmsProject.hidden) {
      project = {
        id: cmsProject.id || cmsProject.slug || cmsProject.title,
        slug: cmsProject.slug || cmsProject.id,
        title: cmsProject.title || 'Project',
        description: cmsProject.description || '',
        image: cmsProject.image || cmsProject.cover || '/placeholder.jpg',
        cover: cmsProject.cover || cmsProject.image || '/placeholder.jpg',
        technologies: cmsProject.technologies || [],
        githubUrl: cmsProject.githubUrl || cmsProject.repo || '',
        liveUrl: cmsProject.liveUrl || cmsProject.demo || '',
        repo: cmsProject.repo || cmsProject.githubUrl || '',
        demo: cmsProject.liveUrl || cmsProject.demo || '',
        category: cmsProject.category || '',
        hidden: cmsProject.hidden || false,
        showDetails: cmsProject.showDetails !== false,
        showLive: cmsProject.showLive !== false,
        showRepo: cmsProject.showRepo !== false,
        // Include all other CMS fields
        ...cmsProject
      }
    }
  }
  
  return project
}

// Generate metadata for each project page
export async function generateMetadata({ params }: ProjectDetailsPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = await getLocalizedProject(slug)

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found."
    }
  }

  const title = `${project.title} – Nouraddin`
  const description = project.description.length > 160 
    ? project.description.substring(0, 157) + "..."
    : project.description

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://nouradin.com/projects/${slug}`,
      siteName: "Nouraddin Portfolio",
      images: [
        {
          url: `https://nouradin.com${project.cover || project.image}`,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@nouradiin_",
      images: [`https://nouradin.com${project.cover || project.image}`],
    },
    alternates: {
      canonical: `https://nouradin.com/projects/${slug}`,
    },
  }
}

export default async function ProjectDetailsPage({ params }: ProjectDetailsPageProps) {
  const { slug } = await params
  
  // Get localized project data
  const project = await getLocalizedProject(slug)

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <ProjectJsonLd project={project} slug={slug} />
      <ProjectDetailsClient project={project} slug={slug} />
    </div>
  )
}
