"use client"

import { useEffect, useState, useCallback } from "react"
import { useTranslations } from "next-intl"
// import { getSupabaseBrowserClient } from "@/lib/supabaseClient" // Not used

type ContentMap = Record<string, unknown>

interface Project {
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

interface TranslatedProject {
  title: string
  description: string
  category?: string
  problem?: string
  solution?: string
  outcome?: string
  features?: string[]
  architecture?: string
  challenges?: string[]
  learnings?: string[]
  impact?: string
  image?: string
  cover?: string
  technologies?: string[]
  githubUrl?: string
  liveUrl?: string
  repo?: string
  demo?: string
}

interface CMSProject {
  id?: string
  slug?: string
  title?: string
  description?: string
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

export function useTranslatedContent() {
  const [content, setContent] = useState<ContentMap | null>(null)
  const [lastFetch, setLastFetch] = useState<number>(0)

  const loadContent = useCallback(async () => {
    try {
      const response = await fetch('/api/content', { 
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setContent(data?.content || {})
        setLastFetch(Date.now())
      }
    } catch (error) {
      console.error('Failed to fetch content:', error)
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      if (cancelled) return
      try {
        const response = await fetch('/api/content', { 
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        })
        
        if (response.ok && !cancelled) {
          const data = await response.json()
          setContent(data?.content || {})
          setLastFetch(Date.now())
        }
      } catch (error) {
        console.error('Failed to fetch content:', error)
      }
    }

    // Initial load only - NO automatic refreshes
    load()

    return () => { 
      cancelled = true
    }
  }, []) // Empty dependency array - only runs once on mount

  return { content, refreshContent: loadContent, lastFetch }
}

export function useTranslatedSectionContent<T=unknown>(section: string, fallback: T): T {
  const { content } = useTranslatedContent()
  const stored = (content?.[section] as Record<string, unknown>) || {}
  return { ...(fallback as Record<string, unknown>), ...stored } as T
}

// Hook that prioritizes translations over Supabase content
export function useLocalizedContent(section: string, translationKeys: string[]) {
  const t = useTranslations(section)
  const supabaseContent = useTranslatedSectionContent(section, {})
  
  // Create content object that prioritizes translations
  const localizedContent: Record<string, unknown> = {}
  
  // Add translated content first
  translationKeys.forEach(key => {
    try {
      const translation = t(key)
      // Only use translation if it's not empty and not the key itself (fallback)
      localizedContent[key] = translation && translation !== key ? translation : (supabaseContent as Record<string, unknown>)[key] || ''
    } catch {
      // Fallback to Supabase content if translation fails
      console.warn(`Translation missing for key: ${key}, using fallback`)
      localizedContent[key] = (supabaseContent as Record<string, unknown>)[key] || ''
    }
  })
  
  // Add all other Supabase content (non-translatable fields)
  Object.keys(supabaseContent).forEach(key => {
    if (!translationKeys.includes(key)) {
      localizedContent[key] = (supabaseContent as Record<string, unknown>)[key]
    }
  })
  
  return localizedContent
}

// Hook specifically for project data with translation support
export function useLocalizedProjects() {
  const t = useTranslations('projects')
  const supabaseContent = useTranslatedSectionContent('projects', {})
  
  // Get project items from translations for current locale using raw access
  const translatedProjects: Record<string, TranslatedProject> = {}
  
  try {
    // Prefer raw object if available (next-intl >= 3)
    const maybeRaw = (t as unknown as { raw?: (k: string) => unknown }).raw
    const items = typeof maybeRaw === 'function' ? maybeRaw('items') : null
    if (items && typeof items === 'object') {
      const record = items as Record<string, unknown>
      Object.keys(record).forEach((key) => {
        const value = record[key]
        if (value && typeof value === 'object') translatedProjects[key] = value as TranslatedProject
      })
    } else {
      // Fallback: attempt common known keys without failing
      const fallbackKeys = ['github-profile-analyzer', 'intellistudy', 'ohay', 'viaggi-qatar-booking']
      fallbackKeys.forEach((key) => {
        try {
          const val = t(`items.${key}`) as unknown as TranslatedProject
          if (val && typeof val === 'object') translatedProjects[key] = val
        } catch {}
      })
    }
  } catch (error) {
    console.warn('Failed to read translated projects for locale:', error)
  }
  
  // Get project items from Supabase (admin overrides)
  const cmsProjects = (supabaseContent as Record<string, unknown>)?.items as CMSProject[] || []
  
  // Initialize mergedProjects array
  const mergedProjects: Project[] = []
  
  // If we have translated projects, use them as the base
  if (translatedProjects && typeof translatedProjects === 'object' && Object.keys(translatedProjects).length > 0) {
    
    // Add all translated projects
    Object.keys(translatedProjects).forEach(projectKey => {
      const translatedProject = translatedProjects[projectKey]
      const cmsProject = cmsProjects.find((p: CMSProject) => 
        (p.slug || p.id || p.title)?.toLowerCase() === projectKey.toLowerCase()
      )
      
      // Merge translated content with CMS overrides
      const mergedProject = {
        id: projectKey,
        slug: projectKey,
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
      
      mergedProjects.push(mergedProject)
    })
    
    // Add any CMS-only projects that don't have translations
    cmsProjects.forEach((cmsProject: CMSProject) => {
      const projectKey = (cmsProject.slug || cmsProject.id || cmsProject.title)?.toLowerCase()
      const hasTranslation = projectKey && translatedProjects && translatedProjects[projectKey]
      
      if (!hasTranslation && !cmsProject.hidden) {
        mergedProjects.push({
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
          // Include all other CMS fields
          ...cmsProject
        })
      }
    })
    
  const result = {
    projects: mergedProjects,
    labels: {
      title: t('title'),
      subtitle: t('subtitle'),
      viewDetails: t('viewDetails'),
      viewRepository: t('viewRepository'),
      viewLiveDemo: t('viewLiveDemo'),
      technologies: t('technologies'),
      problem: t('problem'),
      solution: t('solution'),
      outcome: t('outcome'),
      keyFeatures: t('keyFeatures'),
      architecture: t('architecture'),
      technicalChallenges: t('technicalChallenges'),
      keyLearnings: t('keyLearnings'),
      impact: t('impact'),
    }
  }
  
  console.log('useLocalizedProjects result:', result)
  return result
  } else {
    // Fallback to CMS projects only if no translations
    cmsProjects
      .filter((p: CMSProject) => !p.hidden)
      .forEach((cmsProject: CMSProject) => {
        mergedProjects.push({
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
      })
  }
  
  return {
    projects: mergedProjects,
    labels: {
      title: t('title'),
      subtitle: t('subtitle'),
      viewDetails: t('viewDetails'),
      viewRepository: t('viewRepository'),
      viewLiveDemo: t('viewLiveDemo'),
      technologies: t('technologies'),
      problem: t('problem'),
      solution: t('solution'),
      outcome: t('outcome'),
      keyFeatures: t('keyFeatures'),
      architecture: t('architecture'),
      technicalChallenges: t('technicalChallenges'),
      keyLearnings: t('keyLearnings'),
      impact: t('impact'),
    }
  }
}
