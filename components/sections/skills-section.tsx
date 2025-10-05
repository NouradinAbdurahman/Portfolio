"use client"

import * as React from "react"
import { Section } from "@/components/ui/section"
import { SectionHeader } from "@/components/ui/section-header"
import { SkillCard } from "@/components/ui/skill-card"
import { Grid } from "@/components/ui/grid"
import { Code, Database, Cloud } from "lucide-react"
import { skills as defaultSkills } from "@/lib/data"
import { useSupabaseTranslations } from "@/hooks/use-supabase-translations"
import { useLocale } from "next-intl"

interface SkillsSectionProps {
  className?: string
}

function SkillsSection({ className }: SkillsSectionProps) {
  const { t } = useSupabaseTranslations()
  const _locale = useLocale()

  // Get translations with fallbacks (align with Hero: read section keys directly)
  const title = t('skills.title', 'Technical Skills')
  const lead = t('skills.lead', 'Technologies and tools I work with')
  const sectionHidden = (t('technical_skills.hidden', 'false') || 'false').toString().toLowerCase() === 'true'
  
  // Use the same translation-driven approach as Services/Hero, no API fetch
  const catFullHidden = (t('skills.catFullHidden', 'false') || 'false').toString().toLowerCase() === 'true'
  const catDataHidden = (t('skills.catDataHidden', 'false') || 'false').toString().toLowerCase() === 'true'
  const catCloudHidden = (t('skills.catCloudHidden', 'false') || 'false').toString().toLowerCase() === 'true'

  const catFullTitle = t('skills.catFullTitle', 'Full-Stack Development')
  const catFullDesc = t('skills.catFullDesc', 'React, Next.js, Flutter, Node.js')
  const catDataTitle = t('skills.catDataTitle', 'Data Engineering')
  const catDataDesc = t('skills.catDataDesc', 'ETL Pipelines, SQL, Python, Analytics')
  const catCloudTitle = t('skills.catCloudTitle', 'Cloud & DevOps')
  const catCloudDesc = t('skills.catCloudDesc', 'AWS, Firebase, Automation, CI/CD')

  // Build categories combining translations for names/descriptions with CMS items
  const skillsByCategory = [
    !catFullHidden && {
      id: 'cat_full',
      name: catFullTitle,
      description: catFullDesc,
      icon: Code,
      skills: defaultSkills.filter(s => ["React","Next.js","Flutter","Node.js","Express","React Native"].includes(s.name))
    },
    !catDataHidden && {
      id: 'cat_data',
      name: catDataTitle,
      description: catDataDesc,
      icon: Database,
      skills: defaultSkills.filter(s => ["Python","SQL","PostgreSQL"].includes(s.name))
    },
    !catCloudHidden && {
      id: 'cat_cloud',
      name: catCloudTitle,
      description: catCloudDesc,
      icon: Cloud,
      skills: defaultSkills.filter(s => ["AWS","Firebase","Docker","Git"].includes(s.name))
    }
  ].filter(Boolean) as Array<{ id: string; name: string; description: string; icon: React.ComponentType<{ className?: string }>; skills: typeof defaultSkills }>

  if (sectionHidden) return null
  return (
    <Section id="skills" variant="light" className={className}>
      <SectionHeader 
        title={title}
        description={lead}
      />

      <Grid cols={3} gap="lg">
        {skillsByCategory.map((category, index) => (
          <SkillCard
            key={category.id}
            title={category.name}
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
