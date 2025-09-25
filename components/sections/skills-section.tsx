import * as React from "react"
import { Section } from "@/components/ui/section"
import { SectionHeader } from "@/components/ui/section-header"
import { SkillCard } from "@/components/ui/skill-card"
import { Grid } from "@/components/ui/grid"
import { Code, Database, Cloud, Smartphone } from "lucide-react"
import { skills as defaultSkills } from "@/lib/data"
import { useSectionContent } from "@/hooks/use-content"

interface SkillsSectionProps {
  className?: string
}

function SkillsSection({ className }: SkillsSectionProps) {
  const content = useSectionContent('skills', {
    title: 'Technical Skills',
    lead: 'Technologies and tools I work with',
    items: defaultSkills,
    hidden: false,
    title_hidden: false,
    lead_hidden: false,
    catFullTitle: 'Full-Stack Development',
    catFullDesc: 'React, Next.js, Flutter, Node.js',
    catDataTitle: 'Data Engineering',
    catDataDesc: 'ETL Pipelines, SQL, Python, Analytics',
    catCloudTitle: 'Cloud & DevOps',
    catCloudDesc: 'AWS, Firebase, Automation, CI/CD',
    itemsFull: defaultSkills.filter(s => ["React","Next.js","Flutter","Node.js","Express","React Native"].includes(s.name)),
    itemsData: defaultSkills.filter(s => ["Python","SQL","PostgreSQL"].includes(s.name)),
    itemsCloud: defaultSkills.filter(s => ["AWS","Firebase","Docker","Git"].includes(s.name))
  })
  if ((content as any).hidden) return null
  // Group skills by category using per-category arrays when provided
  const skillsByCategory = {
    [content.catFullTitle]: {
      description: content.catFullDesc,
      icon: Code,
      skills: (content.itemsFull || defaultSkills.filter((s)=>["React","Next.js","Flutter","Node.js","Express","React Native"].includes(s.name))).filter((s: any) => !s.hidden)
    },
    [content.catDataTitle]: {
      description: content.catDataDesc,
      icon: Database,
      skills: (content.itemsData || defaultSkills.filter((s)=>["Python","SQL","PostgreSQL"].includes(s.name))).filter((s: any) => !s.hidden)
    },
    [content.catCloudTitle]: {
      description: content.catCloudDesc,
      icon: Cloud,
      skills: (content.itemsCloud || defaultSkills.filter((s)=>["AWS","Firebase","Docker","Git"].includes(s.name))).filter((s: any) => !s.hidden)
    }
  }

  return (
    <Section id="skills" variant="light" className={className}>
      <SectionHeader 
        title={content.title}
        description={content.lead}
        titleHidden={content.title_hidden}
        descriptionHidden={content.lead_hidden}
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
