"use client"

import * as React from "react"

export const dynamic = 'force-dynamic'
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Section } from "@/components/ui/section"
import { SectionHeader } from "@/components/ui/section-header"
import { ProjectCard } from "@/components/ui/project-card"
import { Grid } from "@/components/ui/grid"
import { ArrowLeft } from "lucide-react"
import { projects as staticProjects } from "@/lib/data"
import { useContent } from "@/hooks/use-content"
import type { Project } from "@/lib/data"


export default function ProjectsPage() {
  const { content, refreshContent } = useContent()
  const projectsContent = (content?.projects as any) || { items: [] }
  const cmsItems = (projectsContent?.items || []) as CMSProject[]
  type CMSProject = Partial<Project> & { id?: string; slug?: string; showDetails?: boolean; showLive?: boolean; showRepo?: boolean }
  // Merge static projects with CMS overrides; CMS may add new projects too
  const staticMap = new Map(staticProjects.map(p => [(p.slug || p.id || p.title).toLowerCase(), p]))
  const merged: (Project & { showDetails?: boolean; showLive?: boolean; showRepo?: boolean })[] = [...staticProjects]
  cmsItems.forEach((p) => {
    const key = (p.slug || p.id || p.title || '').toLowerCase()
    const base = staticMap.get(key)
    if (base) {
      const overlay = {
        ...base,
        title: p.title ?? base.title,
        description: p.description ?? base.description,
        image: (p.image || p.cover) ?? base.image,
        cover: (p.cover || p.image) ?? base.cover,
        technologies: p.technologies ?? base.technologies,
        githubUrl: (p.repo || p.githubUrl) ?? base.githubUrl,
        liveUrl: (p.liveUrl || p.demo) ?? base.liveUrl,
        category: p.category ?? base.category,
        id: p.slug || p.id || base.id,
        slug: p.slug || base.slug || base.id,
        hidden: p.hidden ?? false,
        showDetails: p.showDetails !== false,
        showLive: p.showLive !== false,
        showRepo: p.showRepo !== false,
      }
      const idx = merged.findIndex(m => (m.slug || m.id || m.title).toLowerCase() === key)
      if (idx >= 0) merged[idx] = overlay
    } else {
      merged.push({
        id: (p.id || p.slug || p.title || 'project'),
        slug: p.slug || p.id || ((p.title||'') as string).toLowerCase().replace(/\s+/g,'-'),
        title: p.title || '',
        description: p.description || '',
        image: p.image || p.cover || '/placeholder.jpg',
        technologies: p.technologies || [],
        githubUrl: p.repo || p.githubUrl || '',
        liveUrl: p.liveUrl || p.demo || '',
        category: p.category || '',
        cover: p.cover || p.image,
        hidden: p.hidden || false,
        showDetails: p.showDetails !== false,
        showLive: p.showLive !== false,
        showRepo: p.showRepo !== false,
      })
    }
  })
  const projects = merged.filter(p => {
    const title = (p.title || '').toLowerCase()
    const id = (p.id || '').toString().toLowerCase()
    return !(title === 'sample project' || id.startsWith('sample')) && !p.hidden
  })
  return (
    <motion.div 
      className="min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Button 
              asChild
              variant="outline"
              className="group neumorphic-button dark:text-white text-black hover:text-black dark:bg-transparent bg-white/90 cursor-pointer border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/60"
            >
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Go Back
              </Link>
            </Button>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <SectionHeader 
              title="All Projects"
              description="A comprehensive showcase of my work and technical expertise"
            />
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Grid cols={2} gap="lg">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                >
                  <ProjectCard
                    project={project}
                    showButtons={true}
                  />
                </motion.div>
              ))}
            </Grid>
          </motion.div>
        </div>
      </Section>
    </motion.div>
  )
}
