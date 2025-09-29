"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useSupabaseTranslations } from "@/hooks/use-supabase-translations"
import { Typography } from "@/components/ui/typography"
import { useLocale } from "next-intl"
import { MixedContent } from "@/lib/rtl-utils"
import { TechStackLoop } from "@/components/ui/tech-stack-loop"
import { TechBadge } from "@/components/ui/tech-badge"
import Aurora from "@/components/ui/aurora"
import { ArrowRight, ArrowLeft, Mail } from "lucide-react"
import { cn } from "@/lib/utils"

interface HeroSectionProps {
  className?: string
}

function HeroSection({ className }: HeroSectionProps) {
  const locale = useLocale()
  const isRTL = locale === 'ar'
  const { t } = useSupabaseTranslations()
  
  // Get translations with fallbacks
  const title = t('hero.title', 'Software Engineer • Full-Stack Developer • Data Engineer')
  const subtitle = t('hero.subtitle', 'Building scalable applications, cloud-driven systems, and data-powered solutions. Passionate about creating efficient ETL pipelines, modern web experiences, and automated workflows.')
  const ctaPrimaryLabel = t('hero.ctaPrimaryLabel', 'View My LinkedIn')
  const ctaSecondaryLabel = t('hero.ctaSecondaryLabel', 'Contact Me')
  const ctaPrimaryHref = t('hero.ctaPrimaryHref', 'https://linkedin.com/in/nouraddin')
  const ctaSecondaryHref = t('hero.ctaSecondaryHref', '#contact')
  
  // Get hero skills from admin
  const heroSkillsString = t('hero.skills', '[]')
  let heroSkills = []
  
  try {
    heroSkills = JSON.parse(heroSkillsString)
  } catch (error) {
    console.error('Error parsing hero skills:', error)
    heroSkills = ["React", "Next.js", "Python", "Flutter", "AWS", "Docker"] // Fallback to default
  }
  
  // If no skills from API, fallback to default skills
  if (!Array.isArray(heroSkills) || heroSkills.length === 0) {
    heroSkills = ["React", "Next.js", "Python", "Flutter", "AWS", "Docker"]
  }
  return (
    <section className={cn("relative pt-23 sm:pt-32 md:pt-40 lg:pt-50 pb-20 overflow-hidden bg-gray-50 dark:bg-[#060010]", className)}>
      {/* Gradient/Aurora only in dark mode */}
      <div className="absolute inset-0 w-full h-full hidden dark:block">
        <Aurora
          colorStops={["#060010", "#B19EEF", "#5227FF"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="space-y-8 text-center">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <Typography variant="h1" className="font-bold dark:text-white text-black hero-title">
              <MixedContent text={title} isRTL={isRTL} />
            </Typography>
            <Typography variant="lead" className="text-xl max-w-4xl mx-auto dark:text-white text-black">
              <MixedContent text={subtitle} isRTL={isRTL} />
            </Typography>
          </motion.div>

          {/* Tech Stack Preview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            <div className="flex flex-wrap justify-center gap-3">
              {heroSkills.map((skill: any) => {
                const skillName = typeof skill === 'string' ? skill : skill.name || skill.title?.en || 'Unknown'
                return (
                  <TechBadge
                    key={skillName}
                    name={skillName}
                    size="md"
                    variant="outline"
                    className="px-4 py-2 rounded-full"
                  />
                )
              })}
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button 
              asChild
              size="lg" 
              className="group neumorphic-button dark:text-white text-black hover:text-black dark:bg-transparent bg-white/90 cursor-pointer border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/60"
            >
              <a href={ctaPrimaryHref} target="_blank" rel="noopener noreferrer">
                {isRTL ? (
                  <>
                    <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                    <MixedContent text={ctaPrimaryLabel} isRTL={isRTL} />
                  </>
                ) : (
                  <>
                    <MixedContent text={ctaPrimaryLabel} isRTL={isRTL} />
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </a>
            </Button>
            
            {/* Download Resume button hidden as requested */}
            
            <Button 
              asChild
              size="lg" 
              variant="outline"
              className="group neumorphic-button dark:text-white text-black hover:text-black dark:bg-transparent bg-white/90 cursor-pointer border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/60"
            >
              <a href={ctaSecondaryHref}>
                <Mail className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                <MixedContent text={ctaSecondaryLabel} isRTL={isRTL} />
              </a>
            </Button>
          </motion.div>

          {/* Tech Stack Animation - Positioned at bottom */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="pt-8"
          >
            <TechStackLoop 
              speed={120}
              direction="left"
              logoHeight={48}
              gap={40}
              pauseOnHover={false}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export { HeroSection }
