"use client"

import * as React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Section } from "@/components/ui/section"
import { SectionHeader } from "@/components/ui/section-header"
import { ProjectCard } from "@/components/ui/project-card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { Grid } from "@/components/ui/grid"
import { Spotlight } from "@/components/ui/spotlight-new"
// import { projects as staticProjects } from "@/lib/data" // No longer needed with translation system
import { cn } from "@/lib/utils"
import { useSupabaseProjects } from "@/hooks/use-supabase-projects"
import { useSettings } from "@/contexts/settings-context"
import { useSupabaseTranslations } from "@/hooks/use-supabase-translations"
import { useLocale } from "next-intl"
import { MixedContent } from "@/lib/rtl-utils"

// Define the Project type from the hook
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

interface ProjectsSectionProps {
  className?: string
  showAll?: boolean
  maxItems?: number
}

function ProjectsSection({ 
  className, 
  showAll = false
}: ProjectsSectionProps) {
  const { projects, labels } = useSupabaseProjects()
  const { settings } = useSettings()
  const { t } = useSupabaseTranslations()
  const locale = useLocale()
  const isRTL = locale === 'ar'
  
  // Filter out hidden projects
  const filteredProjects = projects.filter((p: Project) => !p.hidden)
  let source = filteredProjects
  
  // If featured_projects is set in settings, honor that exact order and limit
  const order = (settings?.featured_projects || []) as string[]
  if (!showAll && order.length) {
    const mapByKey = new Map(source.map((p: Project) => [(p.slug || p.id || p.title).toLowerCase(), p]))
    const ordered = order
      .map(k => mapByKey.get((k||'').toLowerCase()))
      .filter(Boolean) as typeof source
    // Show exactly the starred items (allow fewer than 4) - but only if they're not hidden
    source = ordered.filter((p: Project) => !p.hidden)
  }
  
  // Apply title overrides if provided and translate project content
  const titles = (settings?.featured_titles || {}) as Record<string,string>
  const withTitles = source
    .filter((p: Project) => (p.title || '').toLowerCase() !== 'sample project' && !(String(p.id||'').toLowerCase().startsWith('sample')))
    .map((p: Project) => {
    const key = (p.slug || p.id || p.title).toLowerCase()
    const title = titles[key]
    
    // Get translated content for each project
    const translatedProject = {
      ...p,
      title: title || t(`projects.items.${p.slug}.title`, p.title),
      description: t(`projects.items.${p.slug}.description`, p.description),
      problem: t(`projects.items.${p.slug}.problem`, p.problem || ''),
      solution: t(`projects.items.${p.slug}.solution`, p.solution || ''),
      outcome: t(`projects.items.${p.slug}.outcome`, p.outcome || ''),
      architecture: t(`projects.items.${p.slug}.architecture`, p.architecture || ''),
      impact: t(`projects.items.${p.slug}.impact`, p.impact || ''),
      features: p.features?.map((feature: string, index: number) => 
        t(`projects.items.${p.slug}.features.${index}`, feature)
      ) || [],
      challenges: p.challenges?.map((challenge: string, index: number) => 
        t(`projects.items.${p.slug}.challenges.${index}`, challenge)
      ) || [],
      learnings: p.learnings?.map((learning: string, index: number) => 
        t(`projects.items.${p.slug}.learnings.${index}`, learning)
      ) || []
    }
    
    return translatedProject
  })
  const displayProjects = showAll ? withTitles : withTitles.slice(0, 4)

  // Hide the entire section if there are no projects to display
  if (displayProjects.length === 0) {
    return null
  }

  return (
    <Section id="portfolio" className={cn("relative overflow-hidden", className)}>
      <Spotlight />
      <div className="relative z-10">
        <SectionHeader 
          title={<MixedContent text={labels.title} isRTL={isRTL} />}
          description={<MixedContent text={labels.subtitle} isRTL={isRTL} />}
        />

        <Grid cols={2} gap="lg">
          {displayProjects.map((project: Project) => (
            <ProjectCard
              key={project.id}
              project={project}
              showButtons={true}
            />
          ))}
        </Grid>

        {!showAll && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/projects">
              <Button 
                size="lg"
                className="group neumorphic-button dark:text-white text-black hover:text-black dark:bg-transparent bg-white/90 cursor-pointer border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/60"
              >
                <MixedContent text={labels.allProjects} isRTL={isRTL} />
                <ArrowRight className={`${isRTL ? 'mr-2' : 'ml-2'} h-4 w-4 group-hover:translate-x-1 transition-transform`} />
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </Section>
  )
}

export { ProjectsSection }
