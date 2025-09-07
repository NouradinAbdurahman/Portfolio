"use client"

import * as React from "react"
import { Suspense, lazy } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Loading from "@/components/loading"
import { HeroSection } from "@/components/sections/hero-section"
import { AboutSection } from "@/components/sections/about-section"
import { ServicesSection } from "@/components/sections/services-section"
import { SkillsSection } from "@/components/sections/skills-section"
import { ProjectsSection } from "@/components/sections/projects-section"
// Lazy load heavy components
const ContactForm = lazy(() => import("@/components/contact-form"))
const ResumeSection = lazy(() => import("@/components/resume-section"))

export default function Portfolio() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <SkillsSection />
        <ProjectsSection />

      {/* Contact Section - Lazy Loaded */}
      <Suspense fallback={<Loading />}>
        <ContactForm />
      </Suspense>

      {/* Resume Section - Lazy Loaded */}
      <Suspense fallback={<Loading />}>
        <ResumeSection />
      </Suspense>
      </main>

      <Footer />
    </div>
  )
}
