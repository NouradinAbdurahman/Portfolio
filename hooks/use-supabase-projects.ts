"use client"

import { useEffect, useState, useCallback } from "react"
import { useLocale } from "next-intl"
import { useSupabaseTranslations } from "./use-supabase-translations"
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface Project {
  id: string
  slug: string
  title: string
  description: string
  image?: string
  cover?: string
  technologies?: string[]
  githubUrl?: string
  liveUrl?: string
  repo?: string
  demo?: string
  category?: string
  hidden?: boolean
  showDetails?: boolean
  showLive?: boolean
  showRepo?: boolean
  problem?: string
  solution?: string
  outcome?: string
  features?: string[]
  architecture?: string
  challenges?: string[]
  learnings?: string[]
  impact?: string
}

interface UseSupabaseProjectsOptions {
  autoRefresh?: boolean
  refreshInterval?: number
}

export function useSupabaseProjects(options: UseSupabaseProjectsOptions = {}) {
  const { autoRefresh = false, refreshInterval = 30000 } = options
  const locale = useLocale()
  const { t } = useSupabaseTranslations()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProjects = useCallback(async () => {
    try {
      setError(null)
      setLoading(true)

      // Get projects from Supabase
      const { data: cmsData, error: cmsError } = await supabase
        .from('site_content')
        .select('section, tag, value')
        .eq('section', 'projects')
        .order('tag')

      if (cmsError) {
        throw new Error(`Failed to fetch projects: ${cmsError.message}`)
      }

      // Parse projects from CMS data
      let cmsProjects: Project[] = []
      const projectsData = cmsData?.find(row => row.tag === 'items')
      if (projectsData?.value) {
        const items = typeof projectsData.value === 'string' 
          ? JSON.parse(projectsData.value) 
          : projectsData.value
        cmsProjects = Array.isArray(items) ? items : []
      }

      // Get project translations
      const projectKeys = [
        'github-profile-analyzer',
        'intellistudy', 
        'ohay',
        'viaggi-qatar-booking'
      ]

      const translatedProjects: Project[] = []

      for (const projectKey of projectKeys) {
        // Get base project data from CMS
        const cmsProject = cmsProjects.find(p => 
          (p.slug || p.id || p.title)?.toLowerCase() === projectKey.toLowerCase()
        )

        // Get translated content
        const title = t(`projects.items.${projectKey}.title`, cmsProject?.title || 'Project')
        const description = t(`projects.items.${projectKey}.description`, cmsProject?.description || '')
        const category = t(`projects.items.${projectKey}.category`, cmsProject?.category || '')
        const problem = t(`projects.items.${projectKey}.problem`, cmsProject?.problem || '')
        const solution = t(`projects.items.${projectKey}.solution`, cmsProject?.solution || '')
        const outcome = t(`projects.items.${projectKey}.outcome`, cmsProject?.outcome || '')
        const architecture = t(`projects.items.${projectKey}.architecture`, cmsProject?.architecture || '')
        const impact = t(`projects.items.${projectKey}.impact`, cmsProject?.impact || '')

        // Get features array
        const features = cmsProject?.features || []
        const translatedFeatures = features.map((feature: string, index: number) => 
          t(`projects.items.${projectKey}.features.${index}`, feature)
        )

        // Get challenges array
        const challenges = cmsProject?.challenges || []
        const translatedChallenges = challenges.map((challenge: string, index: number) => 
          t(`projects.items.${projectKey}.challenges.${index}`, challenge)
        )

        // Get learnings array
        const learnings = cmsProject?.learnings || []
        const translatedLearnings = learnings.map((learning: string, index: number) => 
          t(`projects.items.${projectKey}.learnings.${index}`, learning)
        )

        const translatedProject: Project = {
          id: projectKey,
          slug: projectKey,
          title,
          description,
          category,
          problem,
          solution,
          outcome,
          features: translatedFeatures,
          architecture,
          challenges: translatedChallenges,
          learnings: translatedLearnings,
          impact,
          // Non-translatable fields from CMS
          image: cmsProject?.image || '/placeholder.jpg',
          cover: cmsProject?.cover || cmsProject?.image || '/placeholder.jpg',
          technologies: cmsProject?.technologies || [],
          githubUrl: cmsProject?.githubUrl || cmsProject?.repo || '',
          liveUrl: cmsProject?.liveUrl || cmsProject?.demo || '',
          repo: cmsProject?.repo || cmsProject?.githubUrl || '',
          demo: cmsProject?.liveUrl || cmsProject?.demo || '',
          hidden: cmsProject?.hidden || false,
          showDetails: cmsProject?.showDetails !== false,
          showLive: cmsProject?.showLive !== false,
          showRepo: cmsProject?.showRepo !== false,
          // Include all other CMS fields
          ...cmsProject
        }

        translatedProjects.push(translatedProject)
      }

      // Add any CMS-only projects that don't have translations
      cmsProjects.forEach((cmsProject: Project) => {
        const projectKey = (cmsProject.slug || cmsProject.id || cmsProject.title)?.toLowerCase()
        const hasTranslation = projectKey && projectKeys.includes(projectKey)
        
        if (!hasTranslation && !cmsProject.hidden) {
          translatedProjects.push({
            id: cmsProject.id || cmsProject.slug || cmsProject.title || 'project',
            slug: cmsProject.slug || cmsProject.id || 'project',
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
            ...cmsProject
          })
        }
      })

      setProjects(translatedProjects)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch projects'
      setError(errorMessage)
      console.error('Error fetching projects:', err)
    } finally {
      setLoading(false)
    }
  }, [locale, t])

  // Initial fetch
  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  // Auto-refresh if enabled
  useEffect(() => {
    if (!autoRefresh) return

    const interval = setInterval(() => {
      fetchProjects()
    }, refreshInterval)

    return () => clearInterval(interval)
  }, [autoRefresh, refreshInterval, fetchProjects])

  // Get project labels
  const labels = {
    title: t('projects.title', 'Featured Projects'),
    subtitle: t('projects.subtitle', 'A showcase of my recent work and technical expertise'),
    viewDetails: t('projects.viewDetails', 'View Details'),
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
    allProjects: t('projects.allProjects', 'All Projects'),
  }

  return {
    projects,
    labels,
    loading,
    error,
    refresh: fetchProjects
  }
}
