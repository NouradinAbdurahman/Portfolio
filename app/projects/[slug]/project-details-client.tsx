"use client"

import * as React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Section } from "@/components/ui/section"
import { Typography } from "@/components/ui/typography"
import { TechBadge } from "@/components/ui/tech-badge"
import { SafeImage } from "@/components/ui/safe-image"
import { ArrowLeft, Github, ExternalLink } from "lucide-react"
import { Project } from "@/lib/data"

interface ProjectDetailsClientProps {
  project: Project
  slug: string
}

export function ProjectDetailsClient({ project, slug }: ProjectDetailsClientProps) {
  return (
    <Section className="pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <Link href="/projects">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Projects
            </Link>
          </Button>
        </motion.div>

        {/* Project Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Typography variant="h1" className="mb-4">
            {project.title}
          </Typography>
          <Typography variant="lead" className="mb-6">
            {project.solution || project.description}
          </Typography>
          
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {(project.tech || project.technologies || []).map((tech) => (
              <TechBadge 
                  key={tech}
                name={tech} 
                size="md"
                variant="outline"
                className="px-3 py-1.5 rounded-full"
              />
              ))}
            </div>

          <div className="flex gap-4 justify-center">
            {(project.repo || project.githubUrl) && (
              <Button
                asChild
                variant="outline"
                className="group neumorphic-button dark:text-white text-black hover:text-black dark:bg-transparent bg-white/90 cursor-pointer border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/60"
              >
                <Link href={project.repo || project.githubUrl || "#"} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  Repository
                </Link>
              </Button>
            )}
            
            {(project.demo || project.liveUrl) && (
              <Button
                asChild
                className="group neumorphic-button dark:text-white text-black hover:text-black dark:bg-transparent bg-white/90 cursor-pointer border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/60"
              >
                <Link href={project.demo || project.liveUrl || "#"} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Live Demo
                </Link>
              </Button>
            )}
          </div>
        </motion.div>

        {/* Project Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="relative w-full aspect-video rounded-lg overflow-hidden">
            <SafeImage
              src={project.cover || project.image}
              alt={`${project.title} - ${project.description.substring(0, 100)}...`}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            />
          </div>
        </motion.div>

        {/* Project Details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-8"
        >
          <div>
            <Typography variant="h3" className="mb-4">
              Problem
            </Typography>
            <Typography variant="p" className="text-muted-foreground">
              {project.problem}
            </Typography>
          </div>

          <div>
            <Typography variant="h3" className="mb-4">
              Solution
            </Typography>
            <Typography variant="p" className="text-muted-foreground">
              {project.solution}
            </Typography>
          </div>

          {project.outcome && (
            <div>
              <Typography variant="h3" className="mb-4">
                Outcome
              </Typography>
              <Typography variant="p" className="text-muted-foreground">
                {project.outcome}
              </Typography>
            </div>
          )}

          {project.features && project.features.length > 0 && (
            <div>
              <Typography variant="h3" className="mb-4">
                Key Features
              </Typography>
              <ul className="space-y-2">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-primary mt-1">•</span>
                    <Typography variant="p" className="text-muted-foreground">
                      {feature}
                    </Typography>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.architecture && (
            <div>
              <Typography variant="h3" className="mb-4">
                Architecture
              </Typography>
              <Typography variant="p" className="text-muted-foreground">
                {project.architecture}
              </Typography>
            </div>
          )}

          {project.challenges && project.challenges.length > 0 && (
            <div>
              <Typography variant="h3" className="mb-4">
                Technical Challenges
              </Typography>
              <ul className="space-y-2">
                {project.challenges.map((challenge, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-primary mt-1">•</span>
                    <Typography variant="p" className="text-muted-foreground">
                      {challenge}
                    </Typography>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.learnings && project.learnings.length > 0 && (
            <div>
              <Typography variant="h3" className="mb-4">
                Key Learnings
              </Typography>
              <ul className="space-y-2">
                {project.learnings.map((learning, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-primary mt-1">•</span>
                    <Typography variant="p" className="text-muted-foreground">
                      {learning}
                    </Typography>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.impact && (
            <div>
              <Typography variant="h3" className="mb-4">
                Impact
              </Typography>
              <Typography variant="p" className="text-muted-foreground">
                {project.impact}
              </Typography>
            </div>
          )}
        </motion.div>
      </div>
    </Section>
  )
}
