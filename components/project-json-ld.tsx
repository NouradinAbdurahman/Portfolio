"use client"

import { generateProjectSchema } from "@/lib/seo"
import { Project } from "@/lib/data"

interface ProjectJsonLdProps {
  project: Project
  slug: string
}

export function ProjectJsonLd({ project, slug }: ProjectJsonLdProps) {
  const projectSchema = generateProjectSchema({
    ...project,
    slug
  })

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(projectSchema),
      }}
    />
  )
}
