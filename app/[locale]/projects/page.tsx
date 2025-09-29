import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Section } from "@/components/ui/section"
import { SectionHeader } from "@/components/ui/section-header"
import { ProjectCard } from "@/components/ui/project-card"
import { Grid } from "@/components/ui/grid"
import { ArrowLeft } from "lucide-react"
import { createClient } from '@supabase/supabase-js'
import { getServerTranslations } from '@/lib/server-translations'

// Server-side function to get localized project data
async function getLocalizedProjects(locale: string = 'en') {
  const translations = await getServerTranslations(locale)
  
  // Helper function to get translations with fallback
  const t = (key: string, fallback?: string): string => {
    return translations[key] || fallback || key
  }
  
  // Get project items from translations for current locale
  const translatedProjects: Record<string, { title: string; description: string; category: string; image?: string; cover?: string; technologies?: string[]; githubUrl?: string; liveUrl?: string; repo?: string; demo?: string; [key: string]: unknown }> = {}
  try {
    // Try to get all project translations
    const fallbackKeys = ['github-profile-analyzer', 'intellistudy', 'ohay', 'viaggi-qatar-booking']
    for (const key of fallbackKeys) {
      try {
        const title = t(`projects.items.${key}.title`, '')
        const description = t(`projects.items.${key}.description`, '')
        const category = t(`projects.items.${key}.category`, '')
        if (title) {
          translatedProjects[key] = {
            title,
            description,
            category
          }
        }
      } catch {}
    }
  } catch (error) {
    console.warn('Failed to read translated projects for locale:', error)
  }
  
  // Get project items from Supabase (admin overrides)
  let cmsProjects: Array<{ id: string; slug?: string; title?: string; description?: string; category?: string; [key: string]: unknown }> = []
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
        const items = typeof projectsData.value === 'string' 
          ? JSON.parse(projectsData.value) 
          : projectsData.value
        cmsProjects = Array.isArray(items) ? items : []
      }
    }
  } catch (error) {
    console.warn('Failed to fetch CMS projects:', error)
  }
  
  // Initialize mergedProjects array
  const mergedProjects: Array<{ id: string; slug?: string; title: string; description: string; category?: string; [key: string]: unknown }> = []
  
  // If we have translated projects, use them as the base
  if (translatedProjects && typeof translatedProjects === 'object' && Object.keys(translatedProjects).length > 0) {
    
    // Add all translated projects
    Object.keys(translatedProjects).forEach(projectKey => {
      const translatedProject = translatedProjects[projectKey]
      const cmsProject = cmsProjects.find((p) => 
        (p.slug || p.id || p.title)?.toLowerCase() === projectKey.toLowerCase()
      )
      
      // Merge translated content with CMS overrides
      const mergedProject = {
        ...translatedProject,
        ...cmsProject, // CMS overrides take precedence
        id: projectKey,
        slug: projectKey,
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
      
      mergedProjects.push(mergedProject)
    })
    
    // Add any CMS-only projects that don't have translations
    cmsProjects.forEach((cmsProject) => {
      const projectKey = (cmsProject.slug || cmsProject.id || cmsProject.title)?.toLowerCase()
      const hasTranslation = projectKey && translatedProjects && translatedProjects[projectKey]
      
      if (!hasTranslation && !cmsProject.hidden) {
        mergedProjects.push({
          ...cmsProject,
          id: cmsProject.id || cmsProject.slug || cmsProject.title || 'project',
          slug: cmsProject.slug || cmsProject.id || 'project',
          title: cmsProject.title || 'Project',
          description: cmsProject.description || '',
        } as typeof mergedProjects[0])
      }
    })
    
  } else {
    // Fallback to CMS projects only if no translations
    cmsProjects
      .filter((p) => !p.hidden)
      .forEach((cmsProject) => {
        mergedProjects.push({
          ...cmsProject,
          id: cmsProject.id || cmsProject.slug || cmsProject.title || 'project',
          slug: cmsProject.slug || cmsProject.id || 'project',
        } as typeof mergedProjects[0])
      })
  }
  
  return {
    projects: mergedProjects,
    labels: {
      title: t('projects.title', 'Featured Projects'),
      subtitle: t('projects.subtitle', 'A showcase of my recent work and technical expertise'),
      viewDetails: t('projects.viewDetails', 'Details'),
      viewRepository: t('projects.viewRepository', 'Repository'),
      viewLiveDemo: t('projects.viewLiveDemo', 'Live Demo'),
      technologies: t('projects.technologies', 'Technologies'),
      problem: t('projects.problem', 'Problem'),
      solution: t('projects.solution', 'Solution'),
      outcome: t('projects.outcome', 'Outcome'),
      keyFeatures: t('projects.keyFeatures', 'Key Features'),
      architecture: t('projects.architecture', 'Architecture'),
      technicalChallenges: t('projects.technicalChallenges', 'Technical Challenges'),
      keyLearnings: t('projects.keyLearnings', 'Key Learnings'),
      impact: t('projects.impact', 'Impact'),
      backToProjects: t('projects.backToProjects', 'Back to Projects'),
    }
  }
}

interface ProjectsPageProps {
  params: Promise<{ locale: string }>
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { locale } = await params
  const { projects, labels } = await getLocalizedProjects(locale)

  // Filter out sample projects and hidden projects
  const filteredProjects = projects.filter(p => {
    const title = (p.title || '').toLowerCase()
    const id = (p.id || '').toString().toLowerCase()
    return !(title === 'sample project' || id.startsWith('sample')) && !p.hidden
  })

  return (
    <div className="min-h-screen">
      <Section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <div className="mb-8">
            <Button 
              asChild
              variant="outline"
              className="group neumorphic-button dark:text-white text-black hover:text-black dark:bg-transparent bg-white/90 cursor-pointer border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/60"
            >
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                {labels.backToProjects}
              </Link>
            </Button>
          </div>

          {/* Header */}
          <div>
            <SectionHeader 
              title={labels.title}
              description={labels.subtitle}
            />
          </div>

          {/* Projects Grid */}
          <div>
            <Grid cols={2} gap="lg">
              {filteredProjects.map((project) => (
                <div key={project.id}>
                  <ProjectCard
                    project={project}
                    showButtons={true}
                  />
                </div>
              ))}
            </Grid>
          </div>
        </div>
      </Section>
    </div>
  )
}