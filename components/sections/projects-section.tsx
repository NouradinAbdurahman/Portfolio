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
import { projects } from "@/lib/data"
import { cn } from "@/lib/utils"
import { useSectionContent } from "@/hooks/use-content"

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
  const content = useSectionContent('projects', {
    title: 'Featured Projects',
    subtitle: 'A showcase of my recent work and technical expertise',
    hidden: false,
    title_hidden: false,
    subtitle_hidden: false
  })
  if ((content as any).hidden) return null
  const displayProjects = showAll ? projects : projects.slice(0, maxItems)

  return (
    <Section id="portfolio" className={cn("relative overflow-hidden", className)}>
      <Spotlight />
      <div className="relative z-10">
        <SectionHeader 
          title={content.title}
          description={content.subtitle}
          titleHidden={content.title_hidden}
          descriptionHidden={content.subtitle_hidden}
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
