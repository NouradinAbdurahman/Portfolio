"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "next-themes"
import { Github, ExternalLink, Eye, Cloud, Smartphone, Database, Code, ChevronDown, ArrowLeft } from "lucide-react"
import { FaReact } from "react-icons/fa"
import { SiTypescript, SiNextdotjs, SiPostgresql, SiFlutter, SiDart, SiFirebase } from "react-icons/si"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Loading from "@/components/loading"
import Image from "next/image"

export default function ProjectsPage() {
  const [visibleCount, setVisibleCount] = useState(4)

  return (
    <div className="min-h-screen dark:text-white light:text-foreground">
      {/* Navigation */}
      <Navbar basePath="/" />

      {/* Content */}
      <section className="dark:bg-[#060010] bg-gray-50 pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-2 text-foreground">All Projects</h1>
            <p className="text-muted-foreground">Explore additional projects beyond the featured ones.</p>
          </motion.div>

          {(() => {
            const allCards = [
            (
            <motion.div key="github-analyzer" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} viewport={{ once: true }}>
              <Card className="overflow-hidden group hover:shadow-2xl transition-all duration-500 border-primary/20 hover:border-primary/40">
                <div className="relative w-full aspect-video">
                  <Image src="/projects/GitHubProfileAnalyzer.png" alt="GitHub Profile Analyzer" fill sizes="(max-width: 768px) 100vw, 50vw" priority className="object-cover" />
                  {/* Desktop hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 hidden md:flex">
                    <div className="flex space-x-4">
                      <a href="/projects/github-profile-analyzer">
                        <Button size="sm" variant="secondary" className="bg-white/95 hover:bg-white text-slate-900 shadow-lg cursor-pointer"><Eye className="w-4 h-4 mr-2" /> Details</Button>
                      </a>
                      <a href="https://github-profile-analyzer-five.vercel.app/" target="_blank" rel="noopener noreferrer">
                        <Button size="sm" className="bg-primary hover:bg-primary/90 shadow-lg cursor-pointer"><ExternalLink className="w-4 h-4 mr-2" /> Live Demo</Button>
                      </a>
                    </div>
                  </div>
                </div>
                
                {/* Mobile buttons - visible on small screens */}
                <div className="flex justify-center space-x-4 p-4 md:hidden">
                  <a href="/projects/github-profile-analyzer">
                    <Button size="sm" variant="secondary" className="bg-white/95 hover:bg-white text-slate-900 shadow-lg cursor-pointer">
                      <Eye className="w-4 h-4 mr-2" /> Details
                    </Button>
                  </a>
                  <a href="https://github-profile-analyzer-five.vercel.app/" target="_blank" rel="noopener noreferrer">
                    <Button size="sm" className="bg-primary hover:bg-primary/90 shadow-lg cursor-pointer">
                      <ExternalLink className="w-4 h-4 mr-2" /> Live Demo
                    </Button>
                  </a>
                </div>

                <motion.div className="p-6" initial={{ y: 20 }} whileInView={{ y: 0 }} transition={{ duration: 0.4, delay: 0.2 }} viewport={{ once: true }}>
                  <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">GitHub Profile Analyzer</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">AI‑powered insights for GitHub developers. Real‑time analytics, AI‑generated summaries, profile optimization, and personalized dashboards. Built with Next.js, TypeScript, Tailwind CSS, and Firebase. Integrated with DAKAEi AI API and the GitHub API.</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary" className="text-xs flex items-center gap-1"><SiNextdotjs className="w-3 h-3 text-black dark:text-white" /> Next.js</Badge>
                    <Badge variant="secondary" className="text-xs flex items-center gap-1"><SiTypescript className="w-3 h-3 text-blue-500" /> TypeScript</Badge>
                    <Badge variant="secondary" className="text-xs flex items-center gap-1"><SiFirebase className="w-3 h-3 text-orange-500" /> Firebase</Badge>
                    <Badge variant="secondary" className="text-xs flex items-center gap-1"><Github className="w-3 h-3" /> GitHub API</Badge>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground"><Database className="w-3 h-3 mr-1" /> AI Analytics • Developer Tools</div>
                </motion.div>
              </Card>
            </motion.div>
            ),
            (
            <motion.div key="intellistudy" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true }}>
              <Card className="overflow-hidden group hover:shadow-2xl transition-all duration-500 border-primary/20 hover:border-primary/40">
                <div className="relative w-full aspect-video">
                  <Image src="/projects/IntelliStudy.png" alt="IntelliStudy" fill sizes="(max-width: 768px) 100vw, 50vw" priority className="object-cover" />
                  {/* Desktop hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 hidden md:flex">
                    <div className="flex space-x-4">
                      <a href="/projects/intellistudy">
                        <Button size="sm" variant="secondary" className="bg-white/95 hover:bg-white text-slate-900 shadow-lg cursor-pointer"><Eye className="w-4 h-4 mr-2" /> Details</Button>
                      </a>
                      <a href="https://intellistudy.vercel.app/" target="_blank" rel="noopener noreferrer">
                        <Button size="sm" className="bg-primary hover:bg-primary/90 shadow-lg cursor-pointer"><ExternalLink className="w-4 h-4 mr-2" /> Live Demo</Button>
                      </a>
                    </div>
                  </div>
                </div>
                
                {/* Mobile buttons - visible on small screens */}
                <div className="flex justify-center space-x-4 p-4 md:hidden">
                  <a href="/projects/intellistudy">
                    <Button size="sm" variant="secondary" className="bg-white/95 hover:bg-white text-slate-900 shadow-lg cursor-pointer">
                      <Eye className="w-4 h-4 mr-2" /> Details
                    </Button>
                  </a>
                  <a href="https://intellistudy.vercel.app/" target="_blank" rel="noopener noreferrer">
                    <Button size="sm" className="bg-primary hover:bg-primary/90 shadow-lg cursor-pointer">
                      <ExternalLink className="w-4 h-4 mr-2" /> Live Demo
                    </Button>
                  </a>
                </div>

                <motion.div className="p-6" initial={{ y: 20 }} whileInView={{ y: 0 }} transition={{ duration: 0.4, delay: 0.3 }} viewport={{ once: true }}>
                  <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-accent transition-colors">IntelliStudy</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">AI‑powered learning assistant for students. Features text summarization, content rewriting, academic Q&A chatbot, and a quiz generator. Built with Next.js, React, Tailwind CSS, and shadcn/ui. Integrated with DAKAEi AI API.</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary" className="text-xs flex items-center gap-1"><SiNextdotjs className="w-3 h-3 text-black dark:text-white" /> Next.js</Badge>
                    <Badge variant="secondary" className="text-xs flex items-center gap-1"><FaReact className="w-3 h-3 text-cyan-400" /> React</Badge>
                    <Badge variant="secondary" className="text-xs flex items-center gap-1"><SiTypescript className="w-3 h-3 text-blue-500" /> TailwindCSS</Badge>
                    <Badge variant="secondary" className="text-xs flex items-center gap-1"><Code className="w-3 h-3" /> shadcn/ui</Badge>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground"><Code className="w-3 h-3 mr-1" /> Full-Stack • AI Integration</div>
                </motion.div>
              </Card>
            </motion.div>
            ),
            (
            <motion.div key="ohay" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} viewport={{ once: true }}>
              <Card className="overflow-hidden group hover:shadow-2xl transition-all duration-500 border-primary/20 hover:border-primary/40">
                <div className="relative w-full aspect-video">
                  <Image src="/projects/ohay.png" alt="Ohay App" fill sizes="(max-width: 768px) 100vw, 50vw" priority className="object-cover" />
                  {/* Desktop hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 hidden md:flex">
                    <div className="flex space-x-4">
                      <a href="/projects/ohay">
                        <Button size="sm" variant="secondary" className="bg-white/95 hover:bg-white text-slate-900 shadow-lg cursor-pointer"><Eye className="w-4 h-4 mr-2" /> Details</Button>
                      </a>
                      <a href="https://admincontrol.ohayapp.com/" target="_blank" rel="noopener noreferrer">
                        <Button size="sm" className="bg-primary hover:bg-primary/90 shadow-lg cursor-pointer"><ExternalLink className="w-4 h-4 mr-2" /> Live Demo</Button>
                      </a>
                    </div>
                  </div>
                </div>
                
                {/* Mobile buttons - visible on small screens */}
                <div className="flex justify-center space-x-4 p-4 md:hidden">
                  <a href="/projects/ohay">
                    <Button size="sm" variant="secondary" className="bg-white/95 hover:bg-white text-slate-900 shadow-lg cursor-pointer">
                      <Eye className="w-4 h-4 mr-2" /> Details
                    </Button>
                  </a>
                  <a href="https://admincontrol.ohayapp.com/" target="_blank" rel="noopener noreferrer">
                    <Button size="sm" className="bg-primary hover:bg-primary/90 shadow-lg cursor-pointer">
                      <ExternalLink className="w-4 h-4 mr-2" /> Live Demo
                    </Button>
                  </a>
                </div>

                <motion.div className="p-6" initial={{ y: 20 }} whileInView={{ y: 0 }} transition={{ duration: 0.4, delay: 0.4 }} viewport={{ once: true }}>
                  <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">Ohay App</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">A modern, multi‑vendor food delivery platform for iOS and Android. Customers can order from multiple restaurants in one checkout, track couriers in real time, and receive itemized digital receipts. Built with Flutter and Firebase with payment gateway integrations. Supports iOS background fetch, push notifications, and full internationalization for a localized, premium experience.</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary" className="text-xs flex items-center gap-1"><SiFlutter className="w-3 h-3 text-blue-500" /> Flutter</Badge>
                    <Badge variant="secondary" className="text-xs flex items-center gap-1"><SiDart className="w-3 h-3 text-blue-400" /> Dart</Badge>
                    <Badge variant="secondary" className="text-xs flex items-center gap-1"><SiFirebase className="w-3 h-3 text-orange-500" /> Firebase</Badge>
                    <Badge variant="secondary" className="text-xs flex items-center gap-1"><Database className="w-3 h-3" /> Real-time</Badge>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground"><Smartphone className="w-3 h-3 mr-1" /> Mobile Development • Real-time Systems</div>
                </motion.div>
              </Card>
            </motion.div>
            ),
            (
            <motion.div key="viaggi" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} viewport={{ once: true }}>
              <Card className="overflow-hidden group hover:shadow-2xl transition-all duration-500 border-primary/20 hover:border-primary/40">
                <div className="relative w-full aspect-video">
                  <Image src="/projects/viaggi-qatar.png" alt="Viaggi del Qatar Tour Booking System" fill sizes="(max-width: 768px) 100vw, 50vw" priority className="object-cover" />
                  {/* Desktop hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 hidden md:flex">
                    <div className="flex space-x-4">
                      <a href="/projects/viaggi-qatar-booking">
                        <Button size="sm" variant="secondary" className="bg-white/95 hover:bg-white text-slate-900 shadow-lg cursor-pointer"><Eye className="w-4 h-4 mr-2" /> Details</Button>
                      </a>
                    </div>
                  </div>
                </div>
                
                {/* Mobile buttons - visible on small screens */}
                <div className="flex justify-center space-x-4 p-4 md:hidden">
                  <a href="/projects/viaggi-qatar-booking">
                    <Button size="sm" variant="secondary" className="bg-white/95 hover:bg-white text-slate-900 shadow-lg cursor-pointer">
                      <Eye className="w-4 h-4 mr-2" /> Details
                    </Button>
                  </a>
                </div>

                <motion.div className="p-6" initial={{ y: 20 }} whileInView={{ y: 0 }} transition={{ duration: 0.4, delay: 0.5 }} viewport={{ once: true }}>
                  <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-accent transition-colors">Viaggi del Qatar Tour Booking System</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">An advanced booking management platform supporting multi‑tour reservations, receipt generation, and real‑time operational dashboards. Built with Next.js 14+ and PostgreSQL (Neon) using server‑ side rendering for speed and SEO. Includes an agent portal, mobile‑first UI, and PDF preview with export and filtering for itineraries and invoices.</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary" className="text-xs flex items-center gap-1"><SiNextdotjs className="w-3 h-3 text-black dark:text-white" /> Next.js</Badge>
                    <Badge variant="secondary" className="text-xs flex items-center gap-1"><SiTypescript className="w-3 h-3 text-blue-500" /> TypeScript</Badge>
                    <Badge variant="secondary" className="text-xs flex items-center gap-1"><SiPostgresql className="w-3 h-3 text-blue-600" /> PostgreSQL</Badge>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground"><Cloud className="w-3 h-3 mr-1" /> Full‑Stack • Next.js 14 • PostgreSQL (Neon)</div>
                </motion.div>
              </Card>
            </motion.div>
            )]

            const visibleCards = allCards.slice(0, visibleCount)
            const hasMore = allCards.length > visibleCount
            return (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">{visibleCards}</div>
                <div className="mt-10 flex justify-center">
                  {hasMore ? (
                    <Button size="lg" variant="outline" className="group bg-transparent cursor-pointer gap-2" onClick={() => setVisibleCount((c) => c + 4)}>
                      <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                      Load More
                    </Button>
                  ) : (
                    <a href="/#portfolio">
                      <Button size="lg" variant="outline" className="group bg-transparent cursor-pointer gap-2">
                        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        Go Back
                      </Button>
                    </a>
                  )}
                </div>
              </>
            )
          })()}
        </div>
      </section>

      {/* Social Links Footer */}
      <Footer />
    </div>
  )
}


