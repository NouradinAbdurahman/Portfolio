import * as React from "react"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import { projects } from "@/lib/data"
import { ProjectDetailsClient } from "./project-details-client"
import { ProjectJsonLd } from "@/components/project-json-ld"

interface ProjectDetailsPageProps {
  params: Promise<{ slug: string }>
}

// Generate metadata for each project page
export async function generateMetadata({ params }: ProjectDetailsPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find(p => p.slug === slug)

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found."
    }
  }

  const title = `${project.title} – Nouraddin`
  const description = project.description.length > 160 
    ? project.description.substring(0, 157) + "..."
    : project.description

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://nouradin.com/projects/${slug}`,
      siteName: "Nouraddin Portfolio",
      images: [
        {
          url: `https://nouradin.com${project.cover || project.image}`,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@nouradiin_",
      images: [`https://nouradin.com${project.cover || project.image}`],
    },
    alternates: {
      canonical: `https://nouradin.com/projects/${slug}`,
    },
  }
}

export default async function ProjectDetailsPage({ params }: ProjectDetailsPageProps) {
  const { slug } = await params
  const project = projects.find(p => p.slug === slug)

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <ProjectJsonLd project={project} slug={slug} />
      <ProjectDetailsClient project={project} slug={slug} />
    </div>
  )
}
