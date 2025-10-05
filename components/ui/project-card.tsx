"use client"

import * as React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TechBadge } from "@/components/ui/tech-badge"
import { Typography } from "@/components/ui/typography"
import { SafeImage } from "@/components/ui/safe-image"
import { ExternalLink, Eye, Github } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Project } from "@/lib/data"
import { useSupabaseTranslations } from "@/hooks/use-supabase-translations"
import { MixedContent } from "@/lib/rtl-utils"
import { useLocale } from "next-intl"

interface ProjectWithFlags extends Omit<Project, 'image' | 'technologies' | 'category'> {
  image?: string
  technologies?: string[]
  category?: string
  showDetails?: boolean
  showLive?: boolean
  showRepo?: boolean
}

interface ProjectCardProps {
  project: ProjectWithFlags
  className?: string
  showButtons?: boolean
}

function ProjectCard({ 
  project, 
  className,
  showButtons = true 
}: ProjectCardProps) {
  const { t } = useSupabaseTranslations()
  const locale = useLocale()
  const isRTL = locale === 'ar'
  
  // Get project key for translations
  const projectKey = project.slug || project.id || project.title?.toLowerCase().replace(/\s+/g, '-')
  
  // Get translated content with fallbacks (messages and DB use projects.items.<slug>.*)
  const translatedTitle = t(`projects.items.${projectKey}.title`, project.title)
  const translatedDescription = t(`projects.items.${projectKey}.description`, project.description)
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      transition={{ 
        duration: 0.6, 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }}
      className={cn("cursor-pointer", className)}
    >
      <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40 bg-transparent">
        <div className="relative w-full aspect-video">
          <SafeImage
            src={project.image || '/placeholder.jpg'}
            alt={translatedTitle}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        
        <div className={`p-6 space-y-4 ${isRTL ? 'text-right' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
          <div>
            <Typography variant="h4" className="mb-2">
              <MixedContent text={translatedTitle} isRTL={isRTL} />
            </Typography>
            <Typography variant="muted" className="leading-relaxed">
              <MixedContent text={translatedDescription} isRTL={isRTL} />
            </Typography>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {(project.technologies || []).map((tech) => (
              <TechBadge 
                key={tech} 
                name={tech} 
                size="sm"
              />
            ))}
          </div>
          
          {showButtons && (
            <div className={`flex gap-2 sm:gap-3 pt-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              {(project.showDetails !== false) && (
                <Button 
                  asChild
                  variant="outline"
                  size="sm"
                  className="flex-1 neumorphic-button dark:text-white text-black hover:text-black dark:bg-transparent bg-white/90 cursor-pointer border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/60 px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm"
                >
                  <Link href={`/projects/${(project.slug || project.id)}`} className="cursor-pointer">
                    <Eye className={`w-3 h-3 sm:w-4 sm:h-4 ${isRTL ? 'ml-1 sm:ml-2' : 'mr-1 sm:mr-2'}`} />
                    <span className="hidden sm:inline"><MixedContent text={t('projects.viewDetails', 'Details')} isRTL={isRTL} /></span>
                    <span className="sm:hidden"><MixedContent text={t('projects.viewDetails', 'View')} isRTL={isRTL} /></span>
                  </Link>
                </Button>
              )}
              {(project.githubUrl && project.showRepo !== false) && (
                <Button 
                  asChild
                  variant="outline"
                  size="sm"
                  className="flex-1 neumorphic-button dark:text-white text-black hover:text-black dark:bg-transparent bg-white/90 cursor-pointer border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/60 px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm"
                >
                  <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="cursor-pointer">
                    <Github className={`w-3 h-3 sm:w-4 sm:h-4 ${isRTL ? 'ml-1 sm:ml-2' : 'mr-1 sm:mr-2'}`} />
                    <span className="hidden sm:inline"><MixedContent text={t('projects.viewRepository', 'Repository')} isRTL={isRTL} /></span>
                    <span className="sm:hidden"><MixedContent text={t('projects.viewRepository', 'Repo')} isRTL={isRTL} /></span>
                  </Link>
                </Button>
              )}
              
              {(project.liveUrl && project.showLive !== false) && (
                <Button 
                  asChild
                  size="sm"
                  className="flex-1 neumorphic-button dark:text-white text-black hover:text-black dark:bg-transparent bg-white/90 cursor-pointer border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/60 px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm"
                >
                  <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="cursor-pointer">
                    <ExternalLink className={`w-3 h-3 sm:w-4 sm:h-4 ${isRTL ? 'ml-1 sm:ml-2' : 'mr-1 sm:mr-2'}`} />
                    <span className="hidden sm:inline"><MixedContent text={t('projects.viewLiveDemo', 'Live Demo')} isRTL={isRTL} /></span>
                    <span className="sm:hidden"><MixedContent text={t('projects.viewLiveDemo', 'Demo')} isRTL={isRTL} /></span>
                  </Link>
                </Button>
              )}
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  )
}

export { ProjectCard }
