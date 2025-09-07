"use client"

import type React from "react"
import { Suspense, lazy } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Spotlight } from "@/components/ui/spotlight-new"
import Aurora from "@/components/ui/aurora"
import LogoLoop from "@/components/LogoLoop"
import {
  ArrowRight,
  Download,
  Mail,
  Code,
  Database,
  Cloud,
  Smartphone,
  Github,
  ExternalLink,
  Eye,
} from "lucide-react"
import { FaReact, FaPython, FaAws, FaDocker, FaGitAlt, FaNodeJs } from "react-icons/fa"
import {
  SiTypescript,
  SiNextdotjs,
  SiFlutter,
  SiDart,
  SiFirebase,
  SiPostgresql,
  SiReact,
  SiTailwindcss,
  SiJavascript,
  SiExpress,
} from "react-icons/si"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Loading from "@/components/loading"

// Lazy load heavy components
const ContactForm = lazy(() => import("@/components/contact-form"))
const ResumeSection = lazy(() => import("@/components/resume-section"))

export default function Portfolio() {

  return (
    <div className="min-h-screen dark:text-white light:text-foreground">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-50 pb-20 overflow-hidden dark:bg-[#060010] bg-gray-50">
        <div className="absolute inset-0 w-full h-full">
          <Aurora
            colorStops={["#060010", "#B19EEF", "#5227FF"]}
            blend={0.5}
            amplitude={1.0}
            speed={0.5}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-2xl md:text-3xl lg:text-4xl dark:text-white/80 text-black mb-4 font-semibold"
              >
                Software Engineer • Full-Stack Developer • Data Engineer
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-lg dark:text-white/70 text-black max-w-3xl mx-auto mb-8 text-pretty"
              >
                Building scalable applications, cloud-driven systems, and data-powered solutions. Passionate about
                creating efficient ETL pipelines, modern web experiences, and automated workflows.
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-wrap justify-center gap-4 mb-8"
            >
              <div className="flex items-center gap-2 px-3 py-2 bg-transparent rounded-full border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40 backdrop-blur-sm">
                <FaReact className="w-5 h-5 text-cyan-400" />
                <span className="text-sm font-medium dark:text-white text-black">React</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-transparent rounded-full border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40 backdrop-blur-sm">
                <SiNextdotjs className="w-5 h-5 text-black dark:text-white" />
                <span className="text-sm font-medium dark:text-white text-black">Next.js</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-transparent rounded-full border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40 backdrop-blur-sm">
                <FaPython className="w-5 h-5 text-yellow-400" />
                <span className="text-sm font-medium dark:text-white text-black">Python</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-transparent rounded-full border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40 backdrop-blur-sm">
                <SiFlutter className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-medium dark:text-white text-black">Flutter</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-transparent rounded-full border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40 backdrop-blur-sm">
                <FaAws className="w-5 h-5 text-orange-400" />
                <span className="text-sm font-medium dark:text-white text-black">AWS</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-transparent rounded-full border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40 backdrop-blur-sm">
                <FaDocker className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-medium dark:text-white text-black">Docker</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            >
              <a href="https://github.com/NouradinAbdurahman" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="group neumorphic-button dark:text-white text-black hover:text-black dark:bg-transparent bg-white/90 cursor-pointer border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/60">
                View Portfolio
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              </a>
              <Button
                variant="outline"
                size="lg"
                      className="group neumorphic-button dark:text-white text-black hover:text-black dark:border-white/20 border-white/20 hover:border-white/40 dark:bg-transparent bg-gray-100 hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer"
                onClick={() => window.open('/resume/nouraddin-resume.pdf', '_blank')}
              >
                <Download className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                Download Resume
              </Button>
              <Button 
                variant="ghost" 
                size="lg" 
                      className="group neumorphic-button dark:text-white text-black hover:text-black dark:border-white/20 border-white/20 hover:border-white/40 dark:bg-transparent bg-gray-100 hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer"
                onClick={() => window.open('mailto:n.aden1208@gmail.com', '_blank')}
              >
                <Mail className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                Contact Me
              </Button>
            </motion.div>

            {/* Tech Stack Preview */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
            >
              <Card className="p-6 hover:shadow-lg transition-shadow bg-transparent border-white/20 hover:border-white/40 cursor-pointer">
                <motion.div className="text-center">
                  <Code className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2 dark:text-white text-black">Full-Stack Development</h3>
                  <p className="text-muted-foreground text-sm mb-4">React, Next.js, Flutter, Node.js</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <Badge variant="secondary" className="flex items-center gap-1 bg-transparent border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40 dark:text-white text-black">
                      <FaReact className="w-3 h-3 text-cyan-400" />
                      React
                    </Badge>
                    <Badge variant="secondary" className="flex items-center gap-1 bg-transparent border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40 dark:text-white text-black">
                      <SiNextdotjs className="w-3 h-3 text-black dark:text-white" />
                      Next.js
                    </Badge>
                    <Badge variant="secondary" className="flex items-center gap-1 bg-transparent border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40 dark:text-white text-black">
                      <SiFlutter className="w-3 h-3 text-blue-500" />
                      Flutter
                    </Badge>
                  </div>
                </motion.div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow bg-transparent border-white/20 hover:border-white/40 cursor-pointer">
                <motion.div className="text-center">
                  <Database className="h-12 w-12 text-accent mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2 dark:text-white text-black">Data Engineering</h3>
                  <p className="text-muted-foreground text-sm mb-4">ETL Pipelines, SQL, Python, Analytics</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <Badge variant="secondary" className="flex items-center gap-1 bg-transparent border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40 dark:text-white text-black">
                      <FaPython className="w-3 h-3 text-yellow-400" />
                      Python
                    </Badge>
                    <Badge variant="secondary" className="flex items-center gap-1 bg-transparent border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40 dark:text-white text-black">
                      <SiPostgresql className="w-3 h-3 text-blue-600" />
                      SQL
                    </Badge>
                    <Badge variant="secondary" className="flex items-center gap-1 bg-transparent border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40 dark:text-white text-black">
                      <Database className="w-3 h-3" />
                      ETL
                    </Badge>
                  </div>
                </motion.div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow bg-transparent border-white/20 hover:border-white/40 cursor-pointer">
                <motion.div className="text-center">
                  <Cloud className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2 dark:text-white text-black">Cloud & DevOps</h3>
                  <p className="text-muted-foreground text-sm mb-4">AWS, Firebase, Automation, CI/CD</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <Badge variant="secondary" className="flex items-center gap-1 bg-transparent border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40 dark:text-white text-black">
                      <FaAws className="w-3 h-3 text-orange-400" />
                      AWS
                    </Badge>
                    <Badge variant="secondary" className="flex items-center gap-1 bg-transparent border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40 dark:text-white text-black">
                      <SiFirebase className="w-3 h-3 text-orange-500" />
                      Firebase
                    </Badge>
                    <Badge variant="secondary" className="flex items-center gap-1 bg-transparent border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40 dark:text-white text-black">
                      <FaDocker className="w-3 h-3 text-blue-500" />
                      Docker
                    </Badge>
                  </div>
                </motion.div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tech Stack Logos */}
      <section className="py-6 dark:bg-[#060010] bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div style={{ height: '80px', position: 'relative', overflow: 'hidden' }}>
            <LogoLoop
              logos={[
                { node: <SiReact className="text-cyan-400" />, title: "React", href: "https://react.dev" },
                { node: <SiNextdotjs className="text-black dark:text-white" />, title: "Next.js", href: "https://nextjs.org" },
                { node: <SiTypescript className="text-blue-500" />, title: "TypeScript", href: "https://www.typescriptlang.org" },
                { node: <SiJavascript className="text-yellow-400" />, title: "JavaScript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
                { node: <FaPython className="text-yellow-500" />, title: "Python", href: "https://www.python.org" },
                { node: <SiDart className="text-blue-400" />, title: "Dart", href: "https://dart.dev" },
                { node: <SiTailwindcss className="text-cyan-500" />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
                { node: <FaReact className="text-cyan-400" />, title: "React Native", href: "https://reactnative.dev" },
                { node: <SiFlutter className="text-blue-500" />, title: "Flutter", href: "https://flutter.dev" },
                { node: <FaNodeJs className="text-green-500" />, title: "Node.js", href: "https://nodejs.org" },
                { node: <SiFirebase className="text-orange-500" />, title: "Firebase", href: "https://firebase.google.com" },
                { node: <FaAws className="text-orange-400" />, title: "AWS", href: "https://aws.amazon.com" },
                { node: <FaDocker className="text-blue-500" />, title: "Docker", href: "https://www.docker.com" },
                { node: <FaGitAlt className="text-orange-500" />, title: "Git", href: "https://git-scm.com" },
                { node: <SiExpress className="text-gray-600 dark:text-gray-300" />, title: "Express", href: "https://expressjs.com" },
                { node: <Database className="text-blue-500" />, title: "SQL", href: "https://www.w3schools.com/sql/" },
                { node: <SiPostgresql className="text-blue-600" />, title: "PostgreSQL", href: "https://postgresql.org" },
              ]}
              speed={120}
              direction="left"
              logoHeight={48}
              gap={40}
              pauseOnHover
              scaleOnHover
              fadeOut
              fadeOutColor="transparent"
              ariaLabel="Technology partners"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 dark:bg-[#060010] bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold dark:text-white text-black mb-4">About Me</h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Profile Photo */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex justify-center lg:justify-end"
            >
              <div 
                className="relative group cursor-pointer select-none"
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
                style={{ 
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  MozUserSelect: 'none',
                  msUserSelect: 'none'
                }}
              >
                <div className="relative w-80 h-80 rounded-full overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border-2 border-gray-300 dark:border-white/20">
                  <Image 
                    src="/photo.png"
                    alt="Nouraddin - Software Engineering Student & Developer"
                    fill
                    sizes="(max-width: 640px) 320px, (max-width: 1024px) 480px, 640px"
                    priority
                    className="object-cover rounded-full select-none pointer-events-none profile-image"
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                    onDragStart={(e) => e.preventDefault()}
                    onLoad={(e) => {
                      // Disable right-click and drag on the image element
                      const img = e.target as HTMLImageElement;
                      img.oncontextmenu = () => false;
                      img.ondragstart = () => false;
                      img.style.pointerEvents = 'none';
                      img.style.userSelect = 'none';
                    }}
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent rounded-full flex items-center justify-center">
                  <Code className="w-12 h-12 text-white" />
                </div>
                {/* Tooltip */}
                <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 bg-transparent dark:text-white text-black px-4 py-3 rounded-xl text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none whitespace-nowrap z-10 shadow-lg border-primary/50 hover:border-primary/70 cursor-pointer tooltip-glow group-hover:tooltip-pulse">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 rounded-xl blur-sm group-hover:blur-md transition-all duration-500"></div>
                    <div className="relative z-10">Nouraddin Abdurahman Aden</div>
                  </div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-primary"></div>
                </div>
              </div>
            </motion.div>

            {/* Bio Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold dark:text-white text-black mb-4">Software Engineering Student & Developer</h3>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  Hi, I&apos;m Nouraddin! Currently pursuing Software Engineering at OSTİM Teknik University, I specialize in building scalable
                  applications and data-driven solutions. My passion lies in creating efficient systems that bridge the
                  gap between complex data and user-friendly interfaces.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-muted-foreground">
                    <strong className="dark:text-white text-black">Full-Stack Expertise:</strong> Proficient in React, Next.js,
                    Flutter, and modern web technologies for creating responsive, performant applications.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-muted-foreground">
                    <strong className="dark:text-white text-black">Data Engineering:</strong> Experienced in ETL pipeline
                    development, SQL optimization, and cloud-based data processing solutions.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-muted-foreground">
                    <strong className="dark:text-white text-black">Cloud & Automation:</strong> Skilled in AWS, Firebase, and
                    building automated workflows that scale with business needs.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                viewport={{ once: true }}
                className="pt-4"
              >
                <Button 
                      className="group neumorphic-button dark:text-white text-black hover:text-black dark:border-white/20 border-white/20 hover:border-white/40 dark:bg-transparent bg-gray-100 hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer"
                  onClick={() => window.open('/resume/nouraddin-cv.pdf', '_blank')}
                >
                  <Download className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                  Download CV
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 dark:bg-[#060010] bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 dark:text-white text-black">Services</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive solutions for your digital needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Web Development Service */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 h-full hover:shadow-xl transition-all duration-300 group cursor-pointer bg-transparent border-white/20 hover:border-white/40">
                <motion.div whileHover={{ scale: 1.05 }} className="text-center space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto group-hover:bg-primary/20 transition-colors">
                    <Code className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold dark:text-white text-black">Web Development</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Modern web applications using React, Next.js, and Flutter. Responsive design with optimal
                    performance.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center pt-2">
                    <Badge variant="outline" className="text-xs flex items-center gap-1 bg-transparent border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40 dark:text-white text-black">
                      <FaReact className="w-3 h-3 text-cyan-400" />
                      React
                    </Badge>
                    <Badge variant="outline" className="text-xs flex items-center gap-1 bg-transparent border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40 dark:text-white text-black">
                      <SiNextdotjs className="w-3 h-3 text-black dark:text-white" />
                      Next.js
                    </Badge>
                    <Badge variant="outline" className="text-xs flex items-center gap-1 bg-transparent border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40 dark:text-white text-black">
                      <SiTypescript className="w-3 h-3 text-blue-500" />
                      TypeScript
                    </Badge>
                  </div>
                </motion.div>
              </Card>
            </motion.div>

            {/* Data Engineering Service */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 h-full hover:shadow-xl transition-all duration-300 group cursor-pointer bg-transparent border-white/20 hover:border-white/40">
                <motion.div whileHover={{ scale: 1.05 }} className="text-center space-y-4">
                  <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center mx-auto group-hover:bg-accent/20 transition-colors">
                    <Database className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold dark:text-white text-black">Data Engineering</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    ETL pipeline development, SQL optimization, and cloud-based data processing solutions.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center pt-2">
                    <Badge variant="outline" className="text-xs flex items-center gap-1 bg-transparent border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40 dark:text-white text-black">
                      <FaPython className="w-3 h-3 text-yellow-400" />
                      Python
                    </Badge>
                    <Badge variant="outline" className="text-xs flex items-center gap-1 bg-transparent border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40 dark:text-white text-black">
                      <SiPostgresql className="w-3 h-3 text-blue-600" />
                      SQL
                    </Badge>
                    <Badge variant="outline" className="text-xs flex items-center gap-1 bg-transparent border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40 dark:text-white text-black">
                      <Database className="w-3 h-3" />
                      ETL
                    </Badge>
                  </div>
                </motion.div>
              </Card>
            </motion.div>

            {/* Mobile Development Service */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 h-full hover:shadow-xl transition-all duration-300 group cursor-pointer bg-transparent border-white/20 hover:border-white/40">
                <motion.div whileHover={{ scale: 1.05 }} className="text-center space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto group-hover:bg-primary/20 transition-colors">
                    <Smartphone className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold dark:text-white text-black">Mobile Development</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Cross-platform mobile applications using Flutter with native performance and beautiful UI.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center pt-2">
                    <Badge variant="outline" className="text-xs flex items-center gap-1 bg-transparent border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40 dark:text-white text-black">
                      <SiFlutter className="w-3 h-3 text-blue-500" />
                      Flutter
                    </Badge>
                    <Badge variant="outline" className="text-xs flex items-center gap-1 bg-transparent border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40 dark:text-white text-black">
                      <SiDart className="w-3 h-3 text-blue-400" />
                      Dart
                    </Badge>
                    <Badge variant="outline" className="text-xs flex items-center gap-1 bg-transparent border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40 dark:text-white text-black">
                      <SiFirebase className="w-3 h-3 text-orange-500" />
                      Firebase
                    </Badge>
                  </div>
                </motion.div>
              </Card>
            </motion.div>

            {/* Cloud & Automation Service */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 h-full hover:shadow-xl transition-all duration-300 group cursor-pointer bg-transparent border-white/20 hover:border-white/40">
                <motion.div whileHover={{ scale: 1.05 }} className="text-center space-y-4">
                  <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center mx-auto group-hover:bg-accent/20 transition-colors">
                    <Cloud className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold dark:text-white text-black">Cloud & Automation</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    AWS cloud solutions, automated workflows, and scalable infrastructure for growing businesses.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center pt-2">
                    <Badge variant="outline" className="text-xs flex items-center gap-1 bg-transparent border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40 dark:text-white text-black">
                      <FaAws className="w-3 h-3 text-orange-400" />
                      AWS
                    </Badge>
                    <Badge variant="outline" className="text-xs flex items-center gap-1 bg-transparent border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40 dark:text-white text-black">
                      <FaDocker className="w-3 h-3 text-blue-500" />
                      Docker
                    </Badge>
                    <Badge variant="outline" className="text-xs flex items-center gap-1 bg-transparent border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40 dark:text-white text-black">
                      <FaGitAlt className="w-3 h-3 text-orange-500" />
                      CI/CD
                    </Badge>
                  </div>
                </motion.div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 relative overflow-hidden dark:bg-[#060010] bg-gray-50">
        <Spotlight />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 dark:text-white text-black">Featured Projects</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A showcase of my recent work and technical expertise
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* GitHub Profile Analyzer */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.02
              }}
              transition={{ 
                duration: 0.6, 
                delay: 0.1,
                type: "spring", 
                stiffness: 300, 
                damping: 20 
              }}
              className="cursor-pointer"
            >
              <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40 bg-transparent">
                <div className="relative w-full aspect-video">
                  <Image
                    src="/projects/GitHubProfileAnalyzer.png"
                    alt="GitHub Profile Analyzer"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                    className="object-cover"
                  />
                </div>
                
                {/* Action buttons - visible on all screens */}
                <div className="flex justify-center space-x-4 p-4">
                  <Link href="/projects/github-profile-analyzer">
                    <motion.div
                      whileHover={{ 
                        scale: 1.05, 
                        y: -2
                      }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 400, 
                        damping: 17 
                      }}
                    >
                      <Button
                        size="sm"
                        variant="secondary"
                        className="group neumorphic-button dark:text-white text-black hover:text-black dark:border-white/20 border-white/20 hover:border-white/40 dark:bg-transparent bg-gray-100 hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer"
                      >
                        <Eye className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                        Details
                      </Button>
                    </motion.div>
                  </Link>
                  <a href="https://github-profile-analyzer-five.vercel.app/" target="_blank" rel="noopener noreferrer">
                    <motion.div
                      whileHover={{ 
                        scale: 1.05, 
                        y: -2
                      }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 400, 
                        damping: 17 
                      }}
                    >
                      <Button size="sm" className="group neumorphic-button bg-primary hover:bg-primary/80 dark:text-white text-black hover:text-black dark:border-primary/50 border-primary/50 hover:border-primary/70 cursor-pointer shadow-lg">
                        <ExternalLink className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                        Live Demo
                      </Button>
                    </motion.div>
                  </a>
                </div>

                <motion.div
                  className="p-6"
                  initial={{ y: 20 }}
                  whileInView={{ y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-semibold dark:text-white text-black mb-3 group-hover:text-primary transition-colors">
                    GitHub Profile Analyzer
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    AI‑powered insights for GitHub developers. Real‑time analytics, AI‑generated summaries, profile
                    optimization, and personalized dashboards. Built with Next.js, TypeScript, Tailwind CSS, and
                    Firebase. Integrated with DAKAEi AI API and the GitHub API.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary" className="text-xs flex items-center gap-1 bg-transparent border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40 dark:text-white text-black"><SiNextdotjs className="w-3 h-3 text-black dark:text-white" /> Next.js</Badge>
                    <Badge variant="secondary" className="text-xs flex items-center gap-1 bg-transparent border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40 dark:text-white text-black"><SiTypescript className="w-3 h-3 text-blue-500" /> TypeScript</Badge>
                    <Badge variant="secondary" className="text-xs flex items-center gap-1 bg-transparent border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40 dark:text-white text-black"><SiFirebase className="w-3 h-3 text-orange-500" /> Firebase</Badge>
                    <Badge variant="secondary" className="text-xs flex items-center gap-1 bg-transparent border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40 dark:text-white text-black"><Github className="w-3 h-3" /> GitHub API</Badge>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Database className="w-3 h-3 mr-1" />
                    AI Analytics • Developer Tools
                  </div>
                </motion.div>
              </Card>
            </motion.div>

            {/* IntelliStudy */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.02
              }}
              transition={{ 
                duration: 0.6, 
                delay: 0.2,
                type: "spring", 
                stiffness: 300, 
                damping: 20 
              }}
              className="cursor-pointer"
            >
              <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40 bg-transparent">
                <div className="relative w-full aspect-video">
                  <Image
                    src="/projects/IntelliStudy.png"
                    alt="IntelliStudy Platform"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                    className="object-cover"
                  />
                </div>
                
                {/* Action buttons - visible on all screens */}
                <div className="flex justify-center space-x-4 p-4">
                  <Link href="/projects/intellistudy">
                    <Button
                      size="sm"
                      variant="secondary"
                        className="group neumorphic-button dark:text-white text-black hover:text-black dark:border-white/20 border-white/20 hover:border-white/40 dark:bg-transparent bg-gray-100 hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Details
                    </Button>
                  </Link>
                  <a href="https://intellistudy.vercel.app/" target="_blank" rel="noopener noreferrer">
                        <Button size="sm" className="group neumorphic-button bg-primary hover:bg-primary/80 dark:text-white text-black hover:text-black dark:border-primary/50 border-primary/50 hover:border-primary/70 cursor-pointer shadow-lg">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </Button>
                  </a>
                </div>

                <motion.div
                  className="p-6"
                  initial={{ y: 20 }}
                  whileInView={{ y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-semibold dark:text-white text-black mb-3 group-hover:text-accent transition-colors">
                    IntelliStudy
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    AI‑powered learning assistant for students. Features text summarization, content rewriting,
                    academic Q&A chatbot, and a quiz generator. Built with Next.js, React, Tailwind CSS, and shadcn/ui.
                    Integrated with DAKAEi AI API.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary" className="text-xs flex items-center gap-1 bg-transparent border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40 dark:text-white text-black"><SiNextdotjs className="w-3 h-3 text-black dark:text-white" /> Next.js</Badge>
                    <Badge variant="secondary" className="text-xs flex items-center gap-1 bg-transparent border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40 dark:text-white text-black"><FaReact className="w-3 h-3 text-cyan-400" /> React</Badge>
                    <Badge variant="secondary" className="text-xs flex items-center gap-1 bg-transparent border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40 dark:text-white text-black"><SiTypescript className="w-3 h-3 text-blue-500" /> TailwindCSS</Badge>
                    <Badge variant="secondary" className="text-xs flex items-center gap-1 bg-transparent border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40 dark:text-white text-black"><Code className="w-3 h-3" /> shadcn/ui</Badge>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Code className="w-3 h-3 mr-1" />
                    Full-Stack • AI Integration
                  </div>
                </motion.div>
              </Card>
            </motion.div>

            {/* Ohay App */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.02
              }}
              transition={{ 
                duration: 0.6, 
                delay: 0.3,
                type: "spring", 
                stiffness: 300, 
                damping: 20 
              }}
              className="cursor-pointer"
            >
              <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40 bg-transparent">
                <div className="relative w-full aspect-video">
                  <Image
                    src="/projects/ohay.png"
                    alt="Ohay Mobile App"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                
                {/* Action buttons - visible on all screens */}
                <div className="flex justify-center space-x-4 p-4">
                  <Link href="/projects/ohay">
                    <Button
                      size="sm"
                      variant="secondary"
                        className="group neumorphic-button dark:text-white text-black hover:text-black dark:border-white/20 border-white/20 hover:border-white/40 dark:bg-transparent bg-gray-100 hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Details
                    </Button>
                  </Link>
                </div>

                <motion.div
                  className="p-6"
                  initial={{ y: 20 }}
                  whileInView={{ y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-semibold dark:text-white text-black mb-3 group-hover:text-primary transition-colors">
                    Ohay App
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    A modern, multi‑vendor food delivery platform for iOS and Android. Customers can order from
                    multiple restaurants in one checkout, track couriers in real time, and receive itemized digital
                    receipts. Built with Flutter and Firebase with payment gateway integrations. Supports iOS
                    background fetch, push notifications, and full internationalization for a localized, premium
                    experience.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary" className="text-xs flex items-center gap-1 bg-transparent border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40 dark:text-white text-black">
                      <SiFlutter className="w-3 h-3 text-blue-500" />
                      Flutter
                    </Badge>
                    <Badge variant="secondary" className="text-xs flex items-center gap-1 bg-transparent border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40 dark:text-white text-black">
                      <SiDart className="w-3 h-3 text-blue-400" />
                      Dart
                    </Badge>
                    <Badge variant="secondary" className="text-xs flex items-center gap-1 bg-transparent border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40 dark:text-white text-black">
                      <SiFirebase className="w-3 h-3 text-orange-500" />
                      Firebase
                    </Badge>
                    <Badge variant="secondary" className="text-xs flex items-center gap-1 bg-transparent border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40 dark:text-white text-black">
                      <Database className="w-3 h-3" />
                      Real-time
                    </Badge>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Smartphone className="w-3 h-3 mr-1" />
                    Mobile Development • Real-time Systems
                  </div>
                </motion.div>
              </Card>
            </motion.div>

            {/* Viaggi Tour Booking System */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.02
              }}
              transition={{ 
                duration: 0.6, 
                delay: 0.4,
                type: "spring", 
                stiffness: 300, 
                damping: 20 
              }}
              className="cursor-pointer"
            >
              <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40 bg-transparent">
                <div className="relative w-full aspect-video">
                  <Image
                    src="/projects/viaggi-qatar.png"
                    alt="Viaggi del Qatar Tour Booking System"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                
                {/* Action buttons - visible on all screens */}
                <div className="flex justify-center space-x-4 p-4">
                  <Link href="/projects/viaggi-qatar-booking">
                    <Button
                      size="sm"
                      variant="secondary"
                        className="group neumorphic-button dark:text-white text-black hover:text-black dark:border-white/20 border-white/20 hover:border-white/40 dark:bg-transparent bg-gray-100 hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Details
                    </Button>
                  </Link>
                </div>

                <motion.div
                  className="p-6"
                  initial={{ y: 20 }}
                  whileInView={{ y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-semibold dark:text-white text-black mb-3 group-hover:text-accent transition-colors">
                    Viaggi del Qatar Tour Booking System
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    An advanced booking management platform supporting multi‑tour reservations, receipt generation,
                    and real‑time operational dashboards. Built with Next.js 14+ and PostgreSQL (Neon) using server‑
                    side rendering for speed and SEO. Includes an agent portal, mobile‑first UI, and PDF preview with
                    export and filtering for itineraries and invoices.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary" className="text-xs flex items-center gap-1 bg-transparent border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40 dark:text-white text-black">
                      <SiNextdotjs className="w-3 h-3 text-black dark:text-white" />
                      Next.js
                    </Badge>
                    <Badge variant="secondary" className="text-xs flex items-center gap-1 bg-transparent border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40 dark:text-white text-black">
                      <SiTypescript className="w-3 h-3 text-blue-500" />
                      TypeScript
                    </Badge>
                    <Badge variant="secondary" className="text-xs flex items-center gap-1 bg-transparent border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40 dark:text-white text-black">
                      <SiPostgresql className="w-3 h-3 text-blue-600" />
                      PostgreSQL
                    </Badge>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Cloud className="w-3 h-3 mr-1" />
                    Full‑Stack • Next.js 14 • PostgreSQL (Neon)
                  </div>
                </motion.div>
              </Card>
            </motion.div>
          </div>

          {/* View All Projects Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/projects">
              <Button size="lg" variant="outline" className="group neumorphic-button dark:text-white text-black hover:text-black dark:border-white/20 border-white/20 hover:border-white/40 dark:bg-transparent bg-transparent cursor-pointer">
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Contact Section - Lazy Loaded */}
      <Suspense fallback={<Loading />}>
        <ContactForm />
      </Suspense>

      {/* Resume Section - Lazy Loaded */}
      <Suspense fallback={<Loading />}>
        <ResumeSection />
      </Suspense>


      {/* Footer */}
      <Footer />
    </div>
  )
}
