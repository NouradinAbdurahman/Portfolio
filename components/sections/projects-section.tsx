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
import { projects as staticProjects } from "@/lib/data"
import { cn } from "@/lib/utils"
import { useContent } from "@/hooks/use-content"
import { useSettings } from "@/contexts/settings-context"

interface ProjectsSectionProps {
  className?: string
  showAll?: boolean
  maxItems?: number
}

function ProjectsSection({ 
  className, 
  showAll = false, 
  maxItems = 4 
}: ProjectsSectionProps) {
  const { content } = useContent()
  const projectsContent = (content?.projects as any) || {
    title: 'Featured Projects',
    subtitle: 'A showcase of my recent work and technical expertise',
    hidden: false,
    title_hidden: false,
    subtitle_hidden: false,
    items: []
  }
  if (projectsContent.hidden) return null
  const cmsItems = projectsContent.items as Array<any> | undefined
  const { settings } = useSettings()
  const mapped = (cmsItems || []).filter((p)=>!p?.hidden).map((p)=>({
    id: p.id || p.slug || p.title,
    slug: p.slug || p.id || p.title?.toLowerCase().replace(/\s+/g,'-'),
    title: p.title || '',
    description: p.description || '',
    image: p.image || p.cover || '/placeholder.jpg',
    technologies: (p.technologies || []) as string[],
    liveUrl: p.liveUrl || p.demo || '',
    githubUrl: p.repo || p.githubUrl || '',
    category: p.category || '',
    cover: p.cover || p.image,
    showDetails: p.showDetails !== false,
    showLive: p.showLive !== false,
    showRepo: p.showRepo !== false,
    hidden: p.hidden || false,
  }))
  // Only use CMS projects - don't merge with static projects to avoid showing hidden static projects
  const merged = [...mapped] // Use only CMS projects
  // Filter out hidden projects
  const filteredMerged = merged.filter(p => !p.hidden)
  let source = filteredMerged
  // If featured_projects is set in settings, honor that exact order and limit
  const order = (settings?.featured_projects || []) as string[]
  if (!showAll && order.length) {
    const mapByKey = new Map(source.map(p => [(p.slug || p.id || p.title).toLowerCase(), p]))
    const ordered = order
      .map(k => mapByKey.get((k||'').toLowerCase()))
      .filter(Boolean) as typeof source
    // Show exactly the starred items (allow fewer than 4) - but only if they're not hidden
    source = ordered.filter(p => !p.hidden)
  }
  // Apply title overrides if provided
  const titles = (settings?.featured_titles || {}) as Record<string,string>
  const withTitles = source
    .filter(p => (p.title || '').toLowerCase() !== 'sample project' && !(String(p.id||'').toLowerCase().startsWith('sample')))
    .map(p => {
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
          title={projectsContent.title}
          description={projectsContent.subtitle}
          titleHidden={projectsContent.title_hidden}
          descriptionHidden={projectsContent.subtitle_hidden}
        />

        <Grid cols={2} gap="lg">
          {displayProjects.map((project) => (
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
                View All Projects
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
