"use client"

import * as React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Section } from "@/components/ui/section"
import { SectionHeader } from "@/components/ui/section-header"
import { ProjectCard } from "@/components/ui/project-card"
import { Grid } from "@/components/ui/grid"
import { ArrowLeft } from "lucide-react"
import { projects } from "@/lib/data"


export default function ProjectsPage() {
  return (
    <div className="min-h-screen">
      <Section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Go Back
              </Link>
                    </Button>
            </motion.div>

          {/* Header */}
          <SectionHeader 
            title="All Projects"
            description="A comprehensive showcase of my work and technical expertise"
          />

          {/* Projects Grid */}
          <Grid cols={2} gap="lg">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                showButtons={true}
              />
            ))}
          </Grid>
        </div>
      </Section>
    </div>
  )
}
