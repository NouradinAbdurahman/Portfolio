import * as React from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TechBadge } from "@/components/ui/tech-badge"
import { Typography } from "@/components/ui/typography"
import { ExternalLink, Eye } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Project } from "@/lib/data"

interface ProjectCardProps {
  project: Project
  className?: string
  showButtons?: boolean
}

function ProjectCard({ 
  project, 
  className,
  showButtons = true 
}: ProjectCardProps) {
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
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <Typography variant="h4" className="mb-2">
              {project.title}
            </Typography>
            <Typography variant="muted" className="leading-relaxed">
              {project.description}
            </Typography>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <TechBadge 
                key={tech} 
                name={tech} 
                size="sm"
              />
            ))}
          </div>
          
          {showButtons && (
            <div className="flex gap-3 pt-2">
              <Button 
                asChild
                variant="outline"
                className="flex-1 neumorphic-button dark:text-white text-black hover:text-black dark:bg-transparent bg-white/90 cursor-pointer border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/60"
              >
                <Link href={`/projects/${project.id}`} className="cursor-pointer">
                  <Eye className="w-4 h-4 mr-2" />
                  Details
                </Link>
              </Button>
              
              {project.liveUrl && (
                <Button 
                  asChild
                  className="flex-1 neumorphic-button dark:text-white text-black hover:text-black dark:bg-transparent bg-white/90 cursor-pointer border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/60"
                >
                  <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="cursor-pointer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
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
