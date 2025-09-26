import * as React from "react"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import { projects as staticProjects } from "@/lib/data"
import { createClient } from '@supabase/supabase-js'
// cleaned unused imports
import { ProjectDetailsClient } from "./project-details-client"
import { ProjectJsonLd } from "@/components/project-json-ld"

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface ProjectDetailsPageProps {
  params: Promise<{ slug: string }>
}

// Generate metadata for each project page
export async function generateMetadata({ params }: ProjectDetailsPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = staticProjects.find(p => p.slug === slug)

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
  
  // Always fetch fresh data from CMS first
  let project = null
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
      // Parse the projects data
      const projectsData = data.find(row => row.tag === 'items')
      if (projectsData?.value) {
        const items = typeof projectsData.value === 'string' 
          ? JSON.parse(projectsData.value) 
          : projectsData.value
      const fromCms = items.find((p:any)=> (p.slug||p.id||p.title)?.toLowerCase() === slug.toLowerCase())
      
      if (fromCms && !fromCms.hidden) {
        // Use CMS data as primary source (only if not hidden)
        project = {
          id: fromCms.slug || fromCms.id || fromCms.title,
          slug: fromCms.slug || fromCms.id,
          title: fromCms.title || 'Project',
          description: fromCms.description || '',
          image: fromCms.image || fromCms.cover || '/placeholder.jpg',
          cover: fromCms.cover || fromCms.image || fromCms.image,
          technologies: fromCms.technologies || [],
          tech: fromCms.technologies || [], // For compatibility
          githubUrl: fromCms.repo || fromCms.githubUrl || '',
          repo: fromCms.repo || fromCms.githubUrl || '',
          liveUrl: fromCms.liveUrl || fromCms.demo || '',
          demo: fromCms.liveUrl || fromCms.demo || '', // For compatibility
          category: fromCms.category || '',
          // Detailed content from admin
          problem: fromCms.problem || '',
          solution: fromCms.solution || '',
          outcome: fromCms.outcome || '',
          features: fromCms.features || [],
          architecture: fromCms.architecture || '',
          challenges: fromCms.challenges || [],
          learnings: fromCms.learnings || [],
          impact: fromCms.impact || '',
        } as any
      }
    }
  }
  } catch (error) {
    // Only log error in development, don't spam production logs
    if (process.env.NODE_ENV === 'development') {
      console.error('Failed to fetch CMS data:', error)
    }
    // Silently fall back to static data
  }
  
  // Fallback to static data if CMS data not found
  if (!project) {
    project = staticProjects.find(p => p.slug === slug)
  }

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
