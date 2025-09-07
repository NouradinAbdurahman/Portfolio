import * as React from "react"
import { Section } from "@/components/ui/section"
import { SectionHeader } from "@/components/ui/section-header"
import { SkillCard } from "@/components/ui/skill-card"
import { Grid } from "@/components/ui/grid"
import { Code, Database, Cloud, Smartphone } from "lucide-react"
import { skills } from "@/lib/data"

interface SkillsSectionProps {
  className?: string
}

function SkillsSection({ className }: SkillsSectionProps) {
  // Group skills by category
  const skillsByCategory = {
    "Full-Stack Development": {
      description: "React, Next.js, Flutter, Node.js",
      icon: Code,
      skills: skills.filter(skill => 
        ["React", "Next.js", "Flutter", "Node.js", "Express", "React Native"].includes(skill.name)
      )
    },
    "Data Engineering": {
      description: "ETL Pipelines, SQL, Python, Analytics",
      icon: Database,
      skills: skills.filter(skill => 
        ["Python", "SQL", "PostgreSQL"].includes(skill.name)
      )
    },
    "Cloud & DevOps": {
      description: "AWS, Firebase, Automation, CI/CD",
      icon: Cloud,
      skills: skills.filter(skill => 
        ["AWS", "Firebase", "Docker", "Git"].includes(skill.name)
      )
    }
  }

  return (
    <Section className={className}>
      <SectionHeader 
        title="Technical Skills"
        description="Technologies and tools I work with"
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
