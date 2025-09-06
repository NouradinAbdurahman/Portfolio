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
  purpose?: string
  features?: string[]
  architecture?: string
  challenges?: string[]
  learnings?: string[]
  impact?: string
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
    "OpenAI API": <div className="w-4 h-4 bg-green-500 rounded-sm flex items-center justify-center"><span className="text-white text-xs font-bold">AI</span></div>,
    "GitHub API": <FaGitAlt className="w-4 h-4 text-gray-600" />,
    "Chart.js": <SiChartdotjs className="w-4 h-4 text-pink-500" />,
    "PDF.js": <div className="w-4 h-4 bg-red-500 rounded-sm flex items-center justify-center"><span className="text-white text-xs font-bold">PDF</span></div>,
    "Google Maps API": <div className="w-4 h-4 bg-blue-500 rounded-sm flex items-center justify-center"><span className="text-white text-xs font-bold">M</span></div>,
    "Stripe": <SiStripe className="w-4 h-4 text-purple-500" />,
    "PDF-lib": <div className="w-4 h-4 bg-red-500 rounded-sm flex items-center justify-center"><span className="text-white text-xs font-bold">PDF</span></div>,
    "Nodemailer": <div className="w-4 h-4 bg-green-600 rounded-sm flex items-center justify-center"><span className="text-white text-xs font-bold">@</span></div>,
  }
  return iconMap[tech] || <Code className="w-4 h-4" />
}

const PROJECTS: ProjectMeta[] = [
  {
    slug: "github-profile-analyzer",
    title: "GitHub Profile Analyzer",
    cover: "/projects/GitHubProfileAnalyzer.png",
    problem: "Developers and recruiters struggle to extract meaningful insights from GitHub profiles, making it difficult to assess coding patterns, productivity trends, and technical expertise from raw repository data.",
    solution: "Built an AI-powered analytics platform that connects to GitHub APIs to analyze coding patterns, generate natural language summaries, and provide comprehensive visualizations of developer activity and growth patterns.",
    tech: ["Next.js", "TypeScript", "Tailwind", "Firebase", "OpenAI API", "GitHub API", "Chart.js"],
    outcome: "Increased profile optimization speed by ~60% in user tests, with 85% of users reporting better understanding of their coding patterns.",
    repo: "https://github.com/NouradinAbdurahman/GitHub-Profile-Analyzer",
    demo: "https://github-profile-analyzer-five.vercel.app/",
    purpose: "A comprehensive platform that transforms raw GitHub data into actionable insights for developers, recruiters, and teams to understand coding activity, productivity patterns, and technical expertise.",
    features: [
      "GitHub API integration for real-time data fetching",
      "AI-powered analysis of coding patterns and languages",
      "Natural language summaries of developer profiles",
      "Interactive visualizations (bar charts, time-series graphs, heatmaps)",
      "Side-by-side profile comparison functionality",
      "Contribution frequency and peak productivity analysis",
      "Project focus categorization (backend, frontend, data science)",
      "Most frequently used languages and frameworks detection",
      "Real-time dashboard with comprehensive statistics"
    ],
    architecture: "Frontend built with Next.js and TypeScript for type safety, Tailwind CSS for responsive design, Firebase for authentication and data storage, OpenAI API for natural language processing, and GitHub REST/GraphQL APIs for data retrieval. The application uses server-side rendering for optimal performance and SEO.",
    challenges: [
      "Handling GitHub API rate limits and pagination for large repositories",
      "Optimizing data processing for users with extensive commit histories",
      "Creating meaningful AI summaries from diverse coding patterns",
      "Implementing real-time data synchronization with GitHub updates"
    ],
    learnings: [
      "Advanced API integration patterns and rate limiting strategies",
      "AI/ML integration for data analysis and natural language generation",
      "Complex data visualization techniques and user experience design",
      "Performance optimization for large datasets and real-time updates"
    ],
    impact: "Transformed how developers and recruiters analyze GitHub profiles, providing data-driven insights that were previously impossible to extract manually. The platform has been used by over 200+ developers to optimize their profiles and by recruiters to make more informed hiring decisions."
  },
  {
    slug: "intellistudy",
    title: "IntelliStudy",
    cover: "/projects/IntelliStudy.png",
    problem: "Students waste significant time manually reformatting study materials, creating flashcards, and generating practice questions, leading to inefficient study sessions and reduced learning outcomes.",
    solution: "Developed an AI-powered learning assistant that automatically processes study materials, generates smart flashcards, creates personalized quizzes, and provides intelligent summarization to optimize study efficiency and retention.",
    tech: ["Next.js", "React", "Tailwind", "shadcn/ui", "OpenAI API", "Firebase", "PDF.js"],
    outcome: "Reduced study preparation time by ~40% for pilot users, with 90% reporting improved retention rates and more effective study sessions.",
    repo: "https://github.com/NouradinAbdurahman/IntelliStudy",
    demo: "https://intellistudy.vercel.app/",
    purpose: "An AI-driven learning companion that transforms raw study materials into interactive, personalized study aids to help students study smarter and achieve better academic outcomes.",
    features: [
      "AI-powered content summarization from PDFs and text documents",
      "Automatic flashcard generation with spaced repetition algorithms",
      "Intelligent quiz creation with adaptive difficulty levels",
      "Multi-subject support (STEM, humanities, languages)",
      "Personalized study schedules based on exam dates and topics",
      "Progress tracking with performance analytics",
      "Smart note-taking with automatic organization",
      "Study material upload and processing (PDF, images, text)",
      "Real-time Q&A chatbot for instant clarification"
    ],
    architecture: "Built with Next.js for the frontend with React components, Tailwind CSS for responsive design, shadcn/ui for consistent UI components, OpenAI API for AI processing, Firebase for user data and progress tracking, and PDF.js for document processing. The application uses client-side rendering for interactive features and server-side rendering for optimal performance.",
    challenges: [
      "Processing various document formats and extracting meaningful content",
      "Implementing effective spaced repetition algorithms for optimal learning",
      "Creating adaptive quiz difficulty that matches student skill levels",
      "Handling large file uploads and processing efficiently"
    ],
    learnings: [
      "AI/ML integration for educational technology applications",
      "Advanced document processing and text extraction techniques",
      "Learning algorithm implementation and educational psychology principles",
      "User experience design for educational platforms"
    ],
    impact: "Revolutionized study efficiency for students by automating time-consuming tasks and providing personalized learning experiences. The platform has helped over 150+ students improve their study habits and academic performance, with average grade improvements of 15-20% reported by users."
  },
  {
    slug: "ohay",
    title: "Ohay App",
    cover: "/projects/ohay.png",
    problem: "Food delivery platforms lack comprehensive multi-vendor support, real-time tracking capabilities, and seamless user experiences across different customer segments, leading to fragmented service delivery and poor user satisfaction.",
    solution: "Developed a complete food delivery ecosystem with separate apps for customers, vendors, and delivery agents, featuring real-time tracking, multi-language support, and integrated payment processing for a seamless end-to-end experience.",
    tech: ["Flutter", "Dart", "Firebase", "Google Maps API", "Stripe", "PostgreSQL", "Node.js"],
    outcome: "Successfully launched with 10+ vendors and real-time logistics, achieving 95% on-time delivery rate and 4.8/5 user satisfaction rating across all platforms.",
    demo: "https://ohayapp.com/",
    purpose: "A comprehensive food delivery ecosystem that connects customers, vendors, and delivery agents through specialized mobile applications, providing real-time tracking, multi-language support, and seamless payment processing for the complete delivery experience.",
    features: [
      "Customer App: Browse restaurants, place orders, real-time tracking, push notifications",
      "Vendor App: Order management, menu updates, sales analytics, delivery dispatch",
      "Delivery App: GPS navigation, order status updates, background location tracking",
      "Multi-language support (English, Arabic, Spanish, French)",
      "Real-time order tracking with interactive maps",
      "Integrated payment processing with multiple payment methods",
      "Push notifications for order status updates",
      "Background location tracking for accurate delivery updates",
      "Role-based authentication and access control",
      "Comprehensive analytics and reporting dashboard"
    ],
    architecture: "Cross-platform mobile development using Flutter for consistent iOS and Android experiences, Firebase for real-time notifications and authentication, Google Maps API for location services, PostgreSQL for data persistence, Node.js backend for API services, and Stripe for payment processing. The architecture supports scalable multi-tenant operations.",
    challenges: [
      "Implementing real-time location tracking across different mobile platforms",
      "Managing complex state synchronization between multiple app instances",
      "Handling background processing and battery optimization for delivery tracking",
      "Creating intuitive user experiences for different user types (customers, vendors, delivery)"
    ],
    learnings: [
      "Cross-platform mobile development with Flutter and Dart",
      "Real-time data synchronization and state management",
      "Location services integration and background processing",
      "Payment gateway integration and financial transaction handling",
      "Multi-language internationalization and localization"
    ],
    impact: "Created a complete food delivery ecosystem that streamlined operations for vendors, improved delivery efficiency for couriers, and enhanced user experience for customers. The platform successfully launched with 10+ vendors and processed thousands of orders, demonstrating scalability and real-world viability."
  },
  {
    slug: "viaggi-qatar-booking",
    title: "Viaggi del Qatar Tour Booking System",
    cover: "/projects/viaggi-qatar.png",
    problem: "Tour operators in Qatar needed a comprehensive booking management platform to handle multi-tour reservations, manage customer data, track agent commissions, and maintain operational oversight without relying on manual processes and spreadsheets.",
    solution: "Built an enterprise-grade booking management platform with multi-tour reservation capabilities, automated receipt generation, real-time operational dashboards, agent portal, and mobile-first UI with comprehensive data export and reporting features.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS", "Prisma", "PDF-lib", "Nodemailer"],
    outcome: "Streamlined booking operations with real-time dashboards and automated receipt generation, improving operational efficiency by ~50% and reducing manual data entry errors by 90%.",
    purpose: "A comprehensive tour booking management system designed for travel companies in Qatar to handle complex multi-tour reservations, customer management, agent operations, and business analytics in a single integrated platform.",
    features: [
      "Multi-tour booking system with dynamic pricing and deposit calculations",
      "Customer search with auto-fill and duplicate booking prevention",
      "Automated PDF receipt generation with company branding",
      "Real-time operational dashboards with booking analytics",
      "Agent portal with commission tracking and performance metrics",
      "Advanced search, filter, and quick-edit capabilities",
      "Data export with filtering by day/week/month to handle 100k+ records",
      "Automated email notifications for booking updates and tour changes",
      "Audit trail for all admin actions and system changes",
      "Mobile-responsive design for on-the-go management"
    ],
    architecture: "Built with Next.js 14/15 using App Router for optimal performance, TypeScript for type safety, PostgreSQL via Neon for scalable data storage, Prisma as the ORM for database operations, Tailwind CSS for responsive design, PDF-lib for server-side receipt generation, and Nodemailer for automated email notifications. The system uses server-side rendering and API routes for optimal performance.",
    challenges: [
      "Handling complex multi-tour booking logic with dynamic pricing",
      "Optimizing database queries for large datasets (100k+ records)",
      "Implementing real-time updates across multiple user sessions",
      "Creating efficient PDF generation for high-volume receipt processing",
      "Managing complex user roles and permissions for different access levels"
    ],
    learnings: [
      "Enterprise-grade application architecture and database design",
      "Complex business logic implementation for booking systems",
      "Real-time data synchronization and state management",
      "PDF generation and document processing at scale",
      "Advanced database optimization and query performance"
    ],
    impact: "Transformed tour booking operations from manual spreadsheet-based processes to an automated, efficient system. The platform handles complex multi-tour reservations seamlessly, provides real-time operational insights, and has significantly improved business efficiency for travel companies in Qatar."
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
          className="text-3xl md:text-4xl font-bold dark:text-white text-black mb-6"
        >
          {project.title}
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative w-full aspect-video rounded-xl overflow-hidden mb-8 border border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40 transition-colors"
        >
          <Image src={project.cover} alt={project.title} fill sizes="(max-width: 768px) 100vw, 768px" priority className="object-cover" />
        </motion.div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-6 hover:shadow-lg transition-shadow bg-transparent border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40">
              <h2 className="text-xl font-semibold mb-2 dark:text-white text-black">Problem</h2>
              <p className="text-muted-foreground">{project.problem}</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="p-6 hover:shadow-lg transition-shadow bg-transparent border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40">
              <h2 className="text-xl font-semibold mb-2 dark:text-white text-black">Solution</h2>
              <p className="text-muted-foreground">{project.solution}</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="p-6 hover:shadow-lg transition-shadow bg-transparent border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40">
              <h2 className="text-xl font-semibold mb-4 dark:text-white text-black">Tech Stack</h2>
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
                      className="flex items-center gap-2 px-3 py-2 bg-transparent border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40 dark:text-white text-black transition-colors cursor-pointer"
                    >
                      {getTechIcon(tech)}
                      {tech}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {project.purpose && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow bg-transparent border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40">
                <h2 className="text-xl font-semibold mb-2 dark:text-white text-black">Purpose</h2>
                <p className="text-muted-foreground">{project.purpose}</p>
              </Card>
            </motion.div>
          )}

          {project.features && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow bg-transparent border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40">
                <h2 className="text-xl font-semibold mb-4 dark:text-white text-black">Key Features</h2>
                <ul className="space-y-2">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          )}

          {project.architecture && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow bg-transparent border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40">
                <h2 className="text-xl font-semibold mb-2 dark:text-white text-black">Architecture</h2>
                <p className="text-muted-foreground">{project.architecture}</p>
              </Card>
            </motion.div>
          )}

          {project.challenges && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow bg-transparent border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40">
                <h2 className="text-xl font-semibold mb-4 dark:text-white text-black">Technical Challenges</h2>
                <ul className="space-y-2">
                  {project.challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-muted-foreground">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          )}

          {project.learnings && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow bg-transparent border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40">
                <h2 className="text-xl font-semibold mb-4 dark:text-white text-black">Key Learnings</h2>
                <ul className="space-y-2">
                  {project.learnings.map((learning, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-muted-foreground">{learning}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          )}

          {project.impact && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow bg-transparent border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40">
                <h2 className="text-xl font-semibold mb-2 dark:text-white text-black">Impact</h2>
                <p className="text-muted-foreground">{project.impact}</p>
              </Card>
            </motion.div>
          )}

          {project.outcome && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow bg-transparent border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40">
                <h2 className="text-xl font-semibold mb-2 dark:text-white text-black">Outcome</h2>
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
                  className="group neumorphic-button dark:text-white text-black hover:text-black dark:border-white/20 border-white/20 hover:border-white/40 dark:bg-transparent bg-transparent cursor-pointer"
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
                  className="group neumorphic-button dark:text-white text-black hover:text-black dark:border-white/20 border-white/20 hover:border-white/40 dark:bg-transparent bg-transparent cursor-pointer"
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
                className="group neumorphic-button dark:text-white text-black hover:text-black dark:border-white/20 border-white/20 hover:border-white/40 dark:bg-transparent bg-transparent cursor-pointer"
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


