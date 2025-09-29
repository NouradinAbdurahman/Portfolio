"use client"

import * as React from "react"
import { Suspense, lazy } from "react"
import { motion } from "framer-motion"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Loading from "@/components/loading"
import { DynamicTheme } from "@/components/dynamic-theme"
import { useSettings } from "@/contexts/settings-context"
import { HeroSection } from "@/components/sections/hero-section"
import { AboutSection } from "@/components/sections/about-section"
import { ServicesSection } from "@/components/sections/services-section"
import { SkillsSection } from "@/components/sections/skills-section"
import { ProjectsSection } from "@/components/sections/projects-section"
import ResumeSection from "@/components/resume-section"
// Lazy load heavy components
const ContactForm = lazy(() => import("@/components/contact-form"))

interface PortfolioClientProps {
  locale: string
}

export function PortfolioClient({ locale }: PortfolioClientProps) {
  const { settings } = useSettings()

  // Section mapping
  const sectionComponents = {
    hero: <HeroSection />,
    about: <AboutSection />,
    services: <ServicesSection />,
    skills: <SkillsSection />,
    projects: <ProjectsSection />,
    contact: (
      <Suspense fallback={<Loading />}>
        <ContactForm />
      </Suspense>
    ),
    resume: <ResumeSection />
  }

  // Get section order from settings or use default
  const sectionOrder = settings?.section_order || ["hero", "about", "services", "skills", "projects", "contact", "resume"]

  return (
    <motion.div 
      className="min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <DynamicTheme />
      <Navbar />

      <main>
        {sectionOrder.map((sectionId, index) => {
          const section = sectionComponents[sectionId as keyof typeof sectionComponents]
          if (!section) return null

          return (
            <motion.div
              key={sectionId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + (index * 0.2) }}
            >
              {section}
            </motion.div>
          )
        })}
      </main>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.6 }}
      >
        <Footer />
      </motion.div>
    </motion.div>
  )
}
