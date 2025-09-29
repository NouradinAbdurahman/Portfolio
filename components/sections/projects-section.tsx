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
  
  // Apply title overrides if provided
  const titles = (settings?.featured_titles || {}) as Record<string,string>
  const withTitles = source
    .filter((p: Project) => (p.title || '').toLowerCase() !== 'sample project' && !(String(p.id||'').toLowerCase().startsWith('sample')))
    .map((p: Project) => {
    const key = (p.slug || p.id || p.title).toLowerCase()
    const title = titles[key]
    return title ? { ...p, title } : p
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
          title={labels.title}
          description={labels.subtitle}
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
                {labels.allProjects}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </Section>
  )
}

export { ProjectsSection }
