import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Section } from "@/components/ui/section"
import { Typography } from "@/components/ui/typography"
import { TechBadge } from "@/components/ui/tech-badge"
import Image from "next/image"
import { ArrowLeft, Github, ExternalLink } from "lucide-react"
import { Project } from "@/lib/data"
import { getServerTranslations } from '@/lib/server-translations'
import { MixedContent } from "@/lib/rtl-utils"

interface ProjectDetailsClientProps {
  project: Project
  locale: string
}

export async function ProjectDetailsClient({ project, locale }: ProjectDetailsClientProps) {
  const translations = await getServerTranslations(locale)
  const t = (key: string, fallback?: string) => translations[key] || fallback || key
  const isRTL = locale === 'ar'
  return (
    <Section className="pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-8">
          <Button 
            asChild
            variant="outline"
            className="group neumorphic-button dark:text-white text-black hover:text-black dark:bg-transparent bg-white/90 cursor-pointer border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/60"
          >
            <Link href="/projects">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              <MixedContent text={t('projects.backToProjects', 'Back to Projects')} isRTL={isRTL} />
            </Link>
          </Button>
        </div>

        {/* Project Header */}
        <div className="text-center mb-12">
          <Typography variant="h1" className="mb-4">
            <MixedContent text={project.title} isRTL={isRTL} />
          </Typography>
          <Typography variant="lead" className="mb-6">
            <MixedContent text={project.solution || project.description} isRTL={isRTL} />
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
                  <MixedContent text={t('projects.viewRepository', 'Repository')} isRTL={isRTL} />
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
                  <MixedContent text={t('projects.viewLiveDemo', 'Live Demo')} isRTL={isRTL} />
                </Link>
              </Button>
            )}
          </div>
        </div>

        {/* Project Image */}
        <div className="mb-12">
          <div className="relative w-full aspect-video rounded-lg overflow-hidden">
            <Image
              src={project.cover || project.image || '/placeholder.jpg'}
              alt={`${project.title} - ${(project.description || '').substring(0, 100)}...`}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            />
          </div>
        </div>

        {/* Project Details */}
        <div className={`space-y-8 ${isRTL ? 'text-right' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
          <div>
            <Typography variant="h3" className="mb-4">
              <MixedContent text={t('projects.problem', 'Problem')} isRTL={isRTL} />
            </Typography>
            <Typography variant="p" className="text-muted-foreground">
              <MixedContent text={project.problem || ''} isRTL={isRTL} />
            </Typography>
          </div>

          <div>
            <Typography variant="h3" className="mb-4">
              <MixedContent text={t('projects.solution', 'Solution')} isRTL={isRTL} />
            </Typography>
            <Typography variant="p" className="text-muted-foreground">
              <MixedContent text={project.solution || ''} isRTL={isRTL} />
            </Typography>
          </div>

          {project.outcome && (
            <div>
              <Typography variant="h3" className="mb-4">
                <MixedContent text={t('projects.outcome', 'Outcome')} isRTL={isRTL} />
              </Typography>
              <Typography variant="p" className="text-muted-foreground">
                <MixedContent text={project.outcome || ''} isRTL={isRTL} />
              </Typography>
            </div>
          )}

          {project.features && project.features.length > 0 && (
            <div>
              <Typography variant="h3" className="mb-4">
                <MixedContent text={t('projects.keyFeatures', 'Key Features')} isRTL={isRTL} />
              </Typography>
              <ul className="space-y-2">
                {project.features.map((feature, index) => (
                  <li key={index} className={`flex items-start ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
                    <span className="text-primary mt-1">•</span>
                    <Typography variant="p" className="text-muted-foreground">
                      <MixedContent text={feature || ''} isRTL={isRTL} />
                    </Typography>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.architecture && (
            <div>
              <Typography variant="h3" className="mb-4">
                <MixedContent text={t('projects.architecture', 'Architecture')} isRTL={isRTL} />
              </Typography>
              <Typography variant="p" className="text-muted-foreground">
                <MixedContent text={project.architecture || ''} isRTL={isRTL} />
              </Typography>
            </div>
          )}

          {project.challenges && project.challenges.length > 0 && (
            <div>
              <Typography variant="h3" className="mb-4">
                <MixedContent text={t('projects.technicalChallenges', 'Technical Challenges')} isRTL={isRTL} />
              </Typography>
              <ul className="space-y-2">
                {project.challenges.map((challenge, index) => (
                  <li key={index} className={`flex items-start ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
                    <span className="text-primary mt-1">•</span>
                    <Typography variant="p" className="text-muted-foreground">
                      <MixedContent text={challenge || ''} isRTL={isRTL} />
                    </Typography>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.learnings && project.learnings.length > 0 && (
            <div>
              <Typography variant="h3" className="mb-4">
                <MixedContent text={t('projects.keyLearnings', 'Key Learnings')} isRTL={isRTL} />
              </Typography>
              <ul className="space-y-2">
                {project.learnings.map((learning, index) => (
                  <li key={index} className={`flex items-start ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
                    <span className="text-primary mt-1">•</span>
                    <Typography variant="p" className="text-muted-foreground">
                      <MixedContent text={learning || ''} isRTL={isRTL} />
                    </Typography>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.impact && (
            <div>
              <Typography variant="h3" className="mb-4">
                <MixedContent text={t('projects.impact', 'Impact')} isRTL={isRTL} />
              </Typography>
              <Typography variant="p" className="text-muted-foreground">
                <MixedContent text={project.impact || ''} isRTL={isRTL} />
              </Typography>
            </div>
          )}
        </div>
      </div>
    </Section>
  )
}
