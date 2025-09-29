"use client"

import * as React from "react"
import { Section } from "@/components/ui/section"
import { SectionHeader } from "@/components/ui/section-header"
import { SkillCard } from "@/components/ui/skill-card"
import { Grid } from "@/components/ui/grid"
import { Code, Database, Cloud, Smartphone } from "lucide-react"
import { skills as defaultSkills } from "@/lib/data"
import { useSupabaseTranslations } from "@/hooks/use-supabase-translations"
import { useLocale } from "next-intl"
import { MixedContent } from "@/lib/rtl-utils"

interface SkillsSectionProps {
  className?: string
}

function SkillsSection({ className }: SkillsSectionProps) {
  const { t } = useSupabaseTranslations()
  const locale = useLocale()
  const isRTL = locale === 'ar'
  
  // Get translations with fallbacks
  const title = t('skills.title', 'Technical Skills')
  const lead = t('skills.lead', 'Technologies and tools I work with')
  const catFullTitle = t('skills.catFullTitle', 'Full-Stack Development')
  const catFullDesc = t('skills.catFullDesc', 'React, Next.js, Flutter, Node.js')
  const catDataTitle = t('skills.catDataTitle', 'Data Engineering')
  const catDataDesc = t('skills.catDataDesc', 'ETL Pipelines, SQL, Python, Analytics')
  const catCloudTitle = t('skills.catCloudTitle', 'Cloud & DevOps')
  const catCloudDesc = t('skills.catCloudDesc', 'AWS, Firebase, Automation, CI/CD')
  
  // Group skills by category
  const skillsByCategory = {
    [catFullTitle]: {
      description: catFullDesc,
      icon: Code,
      skills: defaultSkills.filter(s => ["React","Next.js","Flutter","Node.js","Express","React Native"].includes(s.name))
    },
    [catDataTitle]: {
      description: catDataDesc,
      icon: Database,
      skills: defaultSkills.filter(s => ["Python","SQL","PostgreSQL"].includes(s.name))
    },
    [catCloudTitle]: {
      description: catCloudDesc,
      icon: Cloud,
      skills: defaultSkills.filter(s => ["AWS","Firebase","Docker","Git"].includes(s.name))
    }
  }

  return (
    <Section id="skills" variant="light" className={className}>
      <SectionHeader 
        title={title}
        description={lead}
      />

      <Grid cols={3} gap="lg">
        {Object.entries(skillsByCategory).map(([title, category], index) => (
          <SkillCard
            key={title}
            title={title}
            description={category.description}
            icon={category.icon}
            skills={category.skills}
            delay={index * 0.1}
          />
        ))}
      </Grid>
    </Section>
  )
}

export { SkillsSection }
