"use client"

import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Github, ExternalLink, ArrowLeft, Code, Database, Cloud, Smartphone } from "lucide-react"
import { FaReact, FaNodeJs, FaPython, FaAws, FaGitAlt, FaDocker, FaInstagram } from "react-icons/fa"
import {
  SiTypescript,
  SiNextdotjs,
  SiFlutter,
  SiDart,
  SiFirebase,
  SiPostgresql,
  SiChartdotjs,
  SiStripe,
  SiJavascript,
  SiExpress,
} from "react-icons/si"

interface ProjectMeta {
  slug: string
  title: string
  cover: string
  problem: string
  solution: string
  tech: string[]
  outcome?: string
  repo?: string
  demo?: string
}

// Tech stack icon mapping
const getTechIcon = (tech: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    "Next.js": <SiNextdotjs className="w-4 h-4 text-black dark:text-white" />,
    "TypeScript": <SiTypescript className="w-4 h-4 text-blue-500" />,
    "Tailwind": <div className="w-4 h-4 bg-cyan-500 rounded-sm flex items-center justify-center"><span className="text-white text-xs font-bold">T</span></div>,
    "Firebase": <SiFirebase className="w-4 h-4 text-orange-500" />,
    "React": <FaReact className="w-4 h-4 text-cyan-400" />,
    "shadcn/ui": <Code className="w-4 h-4" />,
    "Flutter": <SiFlutter className="w-4 h-4 text-blue-500" />,
    "Dart": <SiDart className="w-4 h-4 text-blue-400" />,
    "PostgreSQL": <SiPostgresql className="w-4 h-4 text-blue-600" />,
    "Tailwind CSS": <div className="w-4 h-4 bg-cyan-500 rounded-sm flex items-center justify-center"><span className="text-white text-xs font-bold">T</span></div>,
    "Prisma": <Database className="w-4 h-4 text-indigo-500" />,
    "JavaScript": <SiJavascript className="w-4 h-4 text-yellow-500" />,
    "Node.js": <FaNodeJs className="w-4 h-4 text-green-500" />,
    "Express": <SiExpress className="w-4 h-4" />,
    "Python": <FaPython className="w-4 h-4 text-yellow-400" />,
    "AWS": <FaAws className="w-4 h-4 text-orange-400" />,
    "Docker": <FaDocker className="w-4 h-4 text-blue-500" />,
    "Git": <FaGitAlt className="w-4 h-4 text-orange-500" />,
  }
  return iconMap[tech] || <Code className="w-4 h-4" />
}

const PROJECTS: ProjectMeta[] = [
  {
    slug: "github-profile-analyzer",
    title: "GitHub Profile Analyzer",
    cover: "/projects/GitHubProfileAnalyzer.png",
    problem: "Developers lack actionable insights from their GitHub activity.",
    solution: "Built an AI‑assisted dashboard summarizing repos, languages, and contributions.",
    tech: ["Next.js", "TypeScript", "Tailwind", "Firebase"],
    outcome: "Increased profile optimization speed by ~60% in user tests.",
    repo: "https://github.com/NouradinAbdurahman/GitHub-Profile-Analyzer",
    demo: "https://github-profile-analyzer-five.vercel.app/",
  },
  {
    slug: "intellistudy",
    title: "IntelliStudy",
    cover: "/projects/IntelliStudy.png",
    problem: "Students spend time reformatting study materials.",
    solution: "AI summarization, rewriting, Q&A chatbot, and quiz generator in one UI.",
    tech: ["Next.js", "React", "Tailwind", "shadcn/ui"],
    outcome: "Reduced prep time by ~40% for pilot users.",
    repo: "https://github.com/NouradinAbdurahman/IntelliStudy",
    demo: "https://intellistudy.vercel.app/",
  },
  {
    slug: "ohay",
    title: "Ohay App",
    cover: "/projects/ohay.png",
    problem: "Multi‑vendor food delivery with consolidated checkout.",
    solution: "Flutter app with real‑time tracking, push notifications, and i18n.",
    tech: ["Flutter", "Dart", "Firebase"],
    outcome: "Supported launch with 10+ vendors and real‑time logistics.",
    demo: "https://ohayapp.com/",
  },
  {
    slug: "viaggi-qatar-booking",
    title: "Viaggi del Qatar Tour Booking System",
    cover: "/projects/viaggi-qatar.png",
    problem: "Tour operators need a comprehensive booking management platform for multi-tour reservations and operational oversight.",
    solution: "Built an advanced booking management platform with multi-tour reservations, receipt generation, real-time operational dashboards, agent portal, and mobile-first UI with PDF preview and export capabilities.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS", "Prisma"],
    outcome: "Streamlined booking operations with real-time dashboards and automated receipt generation, improving operational efficiency by ~50%.",
  },
]

// Note: generateStaticParams removed since this is now a client component
// Static generation will be handled at build time

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const project = PROJECTS.find((p) => p.slug === slug)
  if (!project) return notFound()

  return (
    <div className="min-h-screen dark:bg-[#060010] bg-gray-50 pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-foreground mb-6"
        >
          {project.title}
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative w-full aspect-video rounded-xl overflow-hidden mb-8"
        >
          <Image src={project.cover} alt={project.title} fill sizes="(max-width: 768px) 100vw, 768px" priority className="object-cover" />
        </motion.div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold mb-2">Problem</h2>
              <p className="text-muted-foreground">{project.problem}</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold mb-2">Solution</h2>
              <p className="text-muted-foreground">{project.solution}</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold mb-4">Tech Stack</h2>
              <div className="flex flex-wrap gap-3">
                {project.tech.map((tech) => (
                  <motion.div
                    key={tech}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Badge 
                      variant="secondary" 
                      className="flex items-center gap-2 px-3 py-2 hover:bg-primary/10 transition-colors cursor-default"
                    >
                      {getTechIcon(tech)}
                      {tech}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {project.outcome && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <h2 className="text-xl font-semibold mb-2">Outcome</h2>
                <p className="text-muted-foreground">{project.outcome}</p>
              </Card>
            </motion.div>
          )}

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            {project.repo && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Button
                  asChild
                  variant="outline"
                  className="group border-2 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
                >
                  <Link href={project.repo} target="_blank" className="flex items-center gap-2">
                    <Github className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                    Repository
                    <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </Button>
              </motion.div>
            )}
            
            {project.demo && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Button
                  asChild
                  variant="outline"
                  className="group border-2 hover:border-accent/50 hover:bg-accent/5 transition-all duration-300"
                >
                  <Link href={project.demo} target="_blank" className="flex items-center gap-2">
                    <ExternalLink className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                    Live Demo
                    <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </Button>
              </motion.div>
            )}
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Button
                asChild
                variant="outline"
                className="group border-2 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
              >
                <Link href="/projects" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  Back to Projects
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}


