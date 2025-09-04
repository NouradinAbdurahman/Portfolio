"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
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
  Sun,
  Moon,
  MapPin,
  Phone,
  Calendar,
  Award,
  Briefcase,
  GraduationCap,
  Menu,
  X,
  User,
  Loader2,
  Send,
  Check,
  AlertCircle,
  Linkedin,
} from "lucide-react"
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

export default function Portfolio() {
  const { theme, setTheme } = useTheme()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = {
      firstName: (form.elements.namedItem("firstName") as HTMLInputElement)?.value,
      lastName: (form.elements.namedItem("lastName") as HTMLInputElement)?.value,
      email: (form.elements.namedItem("email") as HTMLInputElement)?.value,
      subject: (form.elements.namedItem("subject") as HTMLInputElement)?.value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)?.value,
    }

    setIsSubmitting(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error("Failed to send message")
      form.reset()
      setSubmitState("success")
    } catch (err) {
      setSubmitState("error")
    } finally {
    setIsSubmitting(false)
      setTimeout(() => setSubmitState("idle"), 3000)
    }
  }

  return (
    <div className="min-h-screen dark:dark-gradient-bg light:light-gradient-bg dark:text-white light:text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-navbar border-b dark:border-white/10 light:border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault()
                  window.location.href = "/"
                }}
                className="inline-flex items-center select-none cursor-pointer no-select-drag"
                draggable={false}
                aria-label="Go to home"
              >
                <span className="text-xl font-bold michroma-regular dark:text-white light:text-foreground no-select-drag">
                  Nouraddin
                </span>
              </a>
            </motion.div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className="dark:text-white/70 light:text-muted-foreground hover:text-primary transition-colors">
                About
              </a>
              <a href="#portfolio" className="dark:text-white/70 light:text-muted-foreground hover:text-primary transition-colors">
                Portfolio
              </a>
              <a href="#services" className="dark:text-white/70 light:text-muted-foreground hover:text-primary transition-colors">
                Services
              </a>
              <a href="#contact" className="dark:text-white/70 light:text-muted-foreground hover:text-primary transition-colors">
                Contact
              </a>
              <a href="#resume" className="dark:text-white/70 light:text-muted-foreground hover:text-primary transition-colors">
                Resume
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-9 h-9 p-0 dark:text-white light:text-foreground hover:bg-muted/50 cursor-pointer"
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
              <Button 
                size="sm" 
                className="hidden md:inline-flex neumorphic-button dark:text-white text-black hover:text-black dark:bg-transparent bg-white/80 cursor-pointer"
                onClick={() => window.open('/resume/nouraddin-resume.pdf', '_blank')}
              >
                <Download className="w-4 h-4 mr-2" />
                Resume
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden w-9 h-9 p-0 dark:text-white light:text-foreground hover:bg-muted/50 cursor-pointer"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                <span className="sr-only">Toggle menu</span>
              </Button>
            </div>
          </div>

          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden py-4 border-t border-border"
            >
              <div className="flex flex-col space-y-4">
                <a
                  href="#about"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </a>
                <a
                  href="#portfolio"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Portfolio
                </a>
                <a
                  href="#services"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Services
                </a>
                <a
                  href="#contact"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </a>
                <a
                  href="#resume"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Resume
                </a>
                <Button 
                  size="sm" 
                  className="w-fit neumorphic-button dark:text-white text-black hover:text-black dark:bg-transparent bg-white/80 cursor-pointer"
                  onClick={() => window.open('/resume/nouraddin-resume.pdf', '_blank')}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Resume
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 h-1/2 w-1/2 hero-gradient-overlay" />
        <div className="absolute top-0 left-0 h-1/2 w-1/2 -scale-x-100 hero-gradient-overlay" />
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-4xl md:text-6xl font-bold dark:text-white light:text-foreground mb-6 text-balance">Nouraddin Abdurahman Aden</h1>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-xl md:text-2xl dark:text-white/80 light:text-muted-foreground mb-4"
              >
                Software Engineer • Full-Stack Developer • Data Engineer
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-lg dark:text-white/70 light:text-muted-foreground max-w-3xl mx-auto mb-8 text-pretty"
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
              <div className="flex items-center gap-2 px-3 py-2 dark:bg-white/10 light:bg-muted/50 rounded-full dark:border-white/20 light:border-border backdrop-blur-sm">
                <FaReact className="w-5 h-5 text-cyan-400" />
                <span className="text-sm font-medium dark:text-white light:text-foreground">React</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 dark:bg-white/10 light:bg-muted/50 rounded-full dark:border-white/20 light:border-border backdrop-blur-sm">
                <SiNextdotjs className="w-5 h-5 text-black dark:text-white" />
                <span className="text-sm font-medium dark:text-white light:text-foreground">Next.js</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 dark:bg-white/10 light:bg-muted/50 rounded-full dark:border-white/20 light:border-border backdrop-blur-sm">
                <FaPython className="w-5 h-5 text-yellow-400" />
                <span className="text-sm font-medium dark:text-white light:text-foreground">Python</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 dark:bg-white/10 light:bg-muted/50 rounded-full dark:border-white/20 light:border-border backdrop-blur-sm">
                <SiFlutter className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-medium dark:text-white light:text-foreground">Flutter</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 dark:bg-white/10 light:bg-muted/50 rounded-full dark:border-white/20 light:border-border backdrop-blur-sm">
                <FaAws className="w-5 h-5 text-orange-400" />
                <span className="text-sm font-medium dark:text-white light:text-foreground">AWS</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 dark:bg-white/10 light:bg-muted/50 rounded-full dark:border-white/20 light:border-border backdrop-blur-sm">
                <FaDocker className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-medium dark:text-white light:text-foreground">Docker</span>
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
                <Button size="lg" className="group neumorphic-button dark:text-white text-black hover:text-black dark:bg-transparent bg-white/90 cursor-pointer">
                View Portfolio
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              </a>
              <Button
                variant="outline"
                size="lg"
                className="group neumorphic-button dark:text-white text-black hover:text-black dark:border-white/20 border-border dark:bg-transparent bg-white/90 cursor-pointer"
                onClick={() => window.open('/resume/nouraddin-resume.pdf', '_blank')}
              >
                <Download className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                Download Resume
              </Button>
              <Button 
                variant="ghost" 
                size="lg" 
                className="group dark:text-white text-black hover:text-black hover:bg-gray-100 dark:hover:bg-muted/50 dark:bg-transparent bg-white/80 cursor-pointer"
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
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <motion.div whileHover={{ scale: 1.05 }} className="text-center">
                  <Code className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Full-Stack Development</h3>
                  <p className="text-muted-foreground text-sm mb-4">React, Next.js, Flutter, Node.js</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <FaReact className="w-3 h-3 text-cyan-400" />
                      React
                    </Badge>
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <SiNextdotjs className="w-3 h-3 text-black dark:text-white" />
                      Next.js
                    </Badge>
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <SiFlutter className="w-3 h-3 text-blue-500" />
                      Flutter
                    </Badge>
                  </div>
                </motion.div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <motion.div whileHover={{ scale: 1.05 }} className="text-center">
                  <Database className="h-12 w-12 text-accent mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Data Engineering</h3>
                  <p className="text-muted-foreground text-sm mb-4">ETL Pipelines, SQL, Python, Analytics</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <FaPython className="w-3 h-3 text-yellow-400" />
                      Python
                    </Badge>
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <SiPostgresql className="w-3 h-3 text-blue-600" />
                      SQL
                    </Badge>
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Database className="w-3 h-3" />
                      ETL
                    </Badge>
                  </div>
                </motion.div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <motion.div whileHover={{ scale: 1.05 }} className="text-center">
                  <Cloud className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Cloud & DevOps</h3>
                  <p className="text-muted-foreground text-sm mb-4">AWS, Firebase, Automation, CI/CD</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <FaAws className="w-3 h-3 text-orange-400" />
                      AWS
                    </Badge>
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <SiFirebase className="w-3 h-3 text-orange-500" />
                      Firebase
                    </Badge>
                    <Badge variant="secondary" className="flex items-center gap-1">
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

      {/* About Section */}
      <section id="about" className="site-background py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">About Me</h2>
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
              <div className="relative">
                <div className="w-80 h-80 rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <img 
                    src="/photo.png" 
                    alt="Nouraddin - Software Engineering Student & Developer"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent rounded-full flex items-center justify-center">
                  <Code className="w-12 h-12 text-white" />
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
                <h3 className="text-2xl font-bold text-foreground mb-4">Software Engineering Student & Developer</h3>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  Currently pursuing Software Engineering at OSTİM Teknik University, I specialize in building scalable
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
                    <strong className="text-foreground">Full-Stack Expertise:</strong> Proficient in React, Next.js,
                    Flutter, and modern web technologies for creating responsive, performant applications.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Data Engineering:</strong> Experienced in ETL pipeline
                    development, SQL optimization, and cloud-based data processing solutions.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Cloud & Automation:</strong> Skilled in AWS, Firebase, and
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
                  className="group cursor-pointer"
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
      <section id="services" className="site-background py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-foreground">Services</h2>
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
              <Card className="p-6 h-full hover:shadow-xl transition-all duration-300 group cursor-pointer">
                <motion.div whileHover={{ scale: 1.05 }} className="text-center space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto group-hover:bg-primary/20 transition-colors">
                    <Code className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Web Development</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Modern web applications using React, Next.js, and Flutter. Responsive design with optimal
                    performance.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center pt-2">
                    <Badge variant="outline" className="text-xs flex items-center gap-1">
                      <FaReact className="w-3 h-3 text-cyan-400" />
                      React
                    </Badge>
                    <Badge variant="outline" className="text-xs flex items-center gap-1">
                      <SiNextdotjs className="w-3 h-3 text-black dark:text-white" />
                      Next.js
                    </Badge>
                    <Badge variant="outline" className="text-xs flex items-center gap-1">
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
              <Card className="p-6 h-full hover:shadow-xl transition-all duration-300 group cursor-pointer">
                <motion.div whileHover={{ scale: 1.05 }} className="text-center space-y-4">
                  <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center mx-auto group-hover:bg-accent/20 transition-colors">
                    <Database className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Data Engineering</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    ETL pipeline development, SQL optimization, and cloud-based data processing solutions.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center pt-2">
                    <Badge variant="outline" className="text-xs flex items-center gap-1">
                      <FaPython className="w-3 h-3 text-yellow-400" />
                      Python
                    </Badge>
                    <Badge variant="outline" className="text-xs flex items-center gap-1">
                      <SiPostgresql className="w-3 h-3 text-blue-600" />
                      SQL
                    </Badge>
                    <Badge variant="outline" className="text-xs flex items-center gap-1">
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
              <Card className="p-6 h-full hover:shadow-xl transition-all duration-300 group cursor-pointer">
                <motion.div whileHover={{ scale: 1.05 }} className="text-center space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto group-hover:bg-primary/20 transition-colors">
                    <Smartphone className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Mobile Development</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Cross-platform mobile applications using Flutter with native performance and beautiful UI.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center pt-2">
                    <Badge variant="outline" className="text-xs flex items-center gap-1">
                      <SiFlutter className="w-3 h-3 text-blue-500" />
                      Flutter
                    </Badge>
                    <Badge variant="outline" className="text-xs flex items-center gap-1">
                      <SiDart className="w-3 h-3 text-blue-400" />
                      Dart
                    </Badge>
                    <Badge variant="outline" className="text-xs flex items-center gap-1">
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
              <Card className="p-6 h-full hover:shadow-xl transition-all duration-300 group cursor-pointer">
                <motion.div whileHover={{ scale: 1.05 }} className="text-center space-y-4">
                  <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center mx-auto group-hover:bg-accent/20 transition-colors">
                    <Cloud className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Cloud & Automation</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    AWS cloud solutions, automated workflows, and scalable infrastructure for growing businesses.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center pt-2">
                    <Badge variant="outline" className="text-xs flex items-center gap-1">
                      <FaAws className="w-3 h-3 text-orange-400" />
                      AWS
                    </Badge>
                    <Badge variant="outline" className="text-xs flex items-center gap-1">
                      <FaDocker className="w-3 h-3 text-blue-500" />
                      Docker
                    </Badge>
                    <Badge variant="outline" className="text-xs flex items-center gap-1">
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
      <section id="portfolio" className="site-background py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-foreground">Featured Projects</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A showcase of my recent work and technical expertise
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* GitHub Profile Analyzer */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden group hover:shadow-2xl transition-all duration-500 border-primary/20 hover:border-primary/40">
                <div className="relative w-full aspect-video">
                  <img
                    src="/projects/GitHubProfileAnalyzer.png"
                    alt="GitHub Profile Analyzer"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex space-x-4">
                      <a href="https://github.com/NouradinAbdurahman/GitHub-Profile-Analyzer" target="_blank" rel="noopener noreferrer">
                      <Button
                        size="sm"
                        variant="secondary"
                          className="bg-white/95 hover:bg-white text-slate-900 shadow-lg cursor-pointer"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      </a>
                      <a href="https://github-profile-analyzer-five.vercel.app/" target="_blank" rel="noopener noreferrer">
                        <Button size="sm" className="bg-primary hover:bg-primary/90 shadow-lg cursor-pointer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </Button>
                      </a>
                    </div>
                  </div>
                </div>
                <motion.div
                  className="p-6"
                  initial={{ y: 20 }}
                  whileInView={{ y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    GitHub Profile Analyzer
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    AI‑powered insights for GitHub developers. Real‑time analytics, AI‑generated summaries, profile
                    optimization, and personalized dashboards. Built with Next.js, TypeScript, Tailwind CSS, and
                    Firebase. Integrated with DAKAEi AI API and the GitHub API.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary" className="text-xs flex items-center gap-1"><SiNextdotjs className="w-3 h-3 text-black dark:text-white" /> Next.js</Badge>
                    <Badge variant="secondary" className="text-xs flex items-center gap-1"><SiTypescript className="w-3 h-3 text-blue-500" /> TypeScript</Badge>
                    <Badge variant="secondary" className="text-xs flex items-center gap-1"><SiFirebase className="w-3 h-3 text-orange-500" /> Firebase</Badge>
                    <Badge variant="secondary" className="text-xs flex items-center gap-1"><Github className="w-3 h-3" /> GitHub API</Badge>
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
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden group hover:shadow-2xl transition-all duration-500 border-primary/20 hover:border-primary/40">
                <div className="relative w-full aspect-video">
                  <img
                    src="/projects/IntelliStudy.png"
                    alt="IntelliStudy Platform"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex space-x-4">
                      <a href="https://github.com/NouradinAbdurahman/IntelliStudy" target="_blank" rel="noopener noreferrer">
                      <Button
                        size="sm"
                        variant="secondary"
                          className="bg-white/95 hover:bg-white text-slate-900 shadow-lg cursor-pointer"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      </a>
                      <a href="https://intellistudy.vercel.app/" target="_blank" rel="noopener noreferrer">
                        <Button size="sm" className="bg-primary hover:bg-primary/90 shadow-lg cursor-pointer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </Button>
                      </a>
                    </div>
                  </div>
                </div>
                <motion.div
                  className="p-6"
                  initial={{ y: 20 }}
                  whileInView={{ y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-accent transition-colors">
                    IntelliStudy
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    AI‑powered learning assistant for students. Features text summarization, content rewriting,
                    academic Q&A chatbot, and a quiz generator. Built with Next.js, React, Tailwind CSS, and shadcn/ui.
                    Integrated with DAKAEi AI API.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary" className="text-xs flex items-center gap-1"><SiNextdotjs className="w-3 h-3 text-black dark:text-white" /> Next.js</Badge>
                    <Badge variant="secondary" className="text-xs flex items-center gap-1"><FaReact className="w-3 h-3 text-cyan-400" /> React</Badge>
                    <Badge variant="secondary" className="text-xs flex items-center gap-1"><SiTypescript className="w-3 h-3 text-blue-500" /> TailwindCSS</Badge>
                    <Badge variant="secondary" className="text-xs flex items-center gap-1"><Code className="w-3 h-3" /> shadcn/ui</Badge>
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
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden group hover:shadow-2xl transition-all duration-500 border-primary/20 hover:border-primary/40">
                <div className="relative w-full aspect-video">
                  <img
                    src="/projects/ohay.png"
                    alt="Ohay Mobile App"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex space-x-4">
                      <a href="https://ohayapp.com/" target="_blank" rel="noopener noreferrer">
                      <Button
                        size="sm"
                        variant="secondary"
                          className="bg-white/95 hover:bg-white text-slate-900 shadow-lg cursor-pointer"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      </a>
                      <a href="https://admincontrol.ohayapp.com/" target="_blank" rel="noopener noreferrer">
                        <Button size="sm" className="bg-primary hover:bg-primary/90 shadow-lg cursor-pointer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                      </Button>
                      </a>
                    </div>
                  </div>
                </div>
                <motion.div
                  className="p-6"
                  initial={{ y: 20 }}
                  whileInView={{ y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
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
                    <Badge variant="secondary" className="text-xs flex items-center gap-1">
                      <SiFlutter className="w-3 h-3 text-blue-500" />
                      Flutter
                    </Badge>
                    <Badge variant="secondary" className="text-xs flex items-center gap-1">
                      <SiDart className="w-3 h-3 text-blue-400" />
                      Dart
                    </Badge>
                    <Badge variant="secondary" className="text-xs flex items-center gap-1">
                      <SiFirebase className="w-3 h-3 text-orange-500" />
                      Firebase
                    </Badge>
                    <Badge variant="secondary" className="text-xs flex items-center gap-1">
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
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden group hover:shadow-2xl transition-all duration-500 border-primary/20 hover:border-primary/40">
                <div className="relative w-full aspect-video">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/30 to-primary/20 flex flex-col items-center justify-center">
                    <Cloud className="w-16 h-16 text-accent" />
                    <div className="mt-2 text-sm text-muted-foreground">Viaggi Booking System</div>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex space-x-4">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="bg-white/95 hover:bg-white text-slate-900 shadow-lg cursor-pointer"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button size="sm" className="bg-primary hover:bg-primary/90 shadow-lg cursor-pointer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </Button>
                    </div>
                  </div>
                </div>
                <motion.div
                  className="p-6"
                  initial={{ y: 20 }}
                  whileInView={{ y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-accent transition-colors">
                    Viaggi del Qatar Tour Booking System
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    An advanced booking management platform supporting multi‑tour reservations, receipt generation,
                    and real‑time operational dashboards. Built with Next.js 14+ and PostgreSQL (Neon) using server‑
                    side rendering for speed and SEO. Includes an agent portal, mobile‑first UI, and PDF preview with
                    export and filtering for itineraries and invoices.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary" className="text-xs flex items-center gap-1">
                      <SiNextdotjs className="w-3 h-3 text-black dark:text-white" />
                      Next.js
                    </Badge>
                    <Badge variant="secondary" className="text-xs flex items-center gap-1">
                      <SiTypescript className="w-3 h-3 text-blue-500" />
                      TypeScript
                    </Badge>
                    <Badge variant="secondary" className="text-xs flex items-center gap-1">
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
            <a href="/projects">
              <Button size="lg" variant="outline" className="group bg-transparent cursor-pointer">
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="site-background py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-foreground">Get In Touch</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Let's discuss your next project or collaboration opportunity
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-6">Let's Connect</h3>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  I'm always interested in new opportunities, challenging projects, and meaningful collaborations.
                  Whether you have a specific project in mind or just want to explore possibilities, I'd love to hear
                  from you.
                </p>
              </div>

              <div className="space-y-6">
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center space-x-4 p-4 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Email</div>
                    <div className="text-muted-foreground">n.aden1208@gmail.com</div>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center space-x-4 p-4 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Phone</div>
                    <div className="text-muted-foreground">+90 552 875 97 71</div>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center space-x-4 p-4 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Location</div>
                    <div className="text-muted-foreground">Ankara, Turkey</div>
                  </div>
                </motion.div>
              </div>

              <div className="flex space-x-4 pt-4">
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  href="https://github.com/NouradinAbdurahman"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                >
                  <Github className="w-5 h-5" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  href="https://linkedin.com/in/nouraddin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  href="https://instagram.com/nouradiin_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-colors"
                >
                  <FaInstagram className="w-5 h-5" />
                </motion.a>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 shadow-xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-sm font-medium text-foreground">
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        placeholder="John"
                        className="focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-sm font-medium text-foreground">
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        placeholder="Doe"
                        className="focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-foreground">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john.doe@example.com"
                      className="focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-sm font-medium text-foreground">
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="Project Discussion"
                      className="focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-medium text-foreground">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell me about your project, timeline, and requirements..."
                      rows={5}
                      className="focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className={
                      `w-full group cursor-pointer transition-colors ` +
                      (submitState === "success" ? " bg-green-600 hover:bg-green-600 " : submitState === "error" ? " bg-red-600 hover:bg-red-600 " : "")
                    }
                    disabled={isSubmitting}
                  >
                    {isSubmitting && (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending Message...
                      </>
                    )}
                    {submitState === "success" && !isSubmitting && (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Thanks! Your message was sent.
                      </>
                    )}
                    {submitState === "error" && !isSubmitting && (
                      <>
                        <AlertCircle className="mr-2 h-4 w-4" />
                        Something went wrong. Try again.
                      </>
                    )}
                    {submitState === "idle" && !isSubmitting && (
                      <>
                        Send Message
                        <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </form>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Resume Section */}
      <section id="resume" className="site-background py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-foreground">Resume</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              My professional journey and technical expertise
            </p>
            <Button 
              size="lg" 
              className="group neumorphic-button dark:text-white text-black hover:text-black dark:bg-transparent bg-white/90 cursor-pointer"
              onClick={() => window.open('/resume/nouraddin-resume.pdf', '_blank')}
            >
              <Download className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
              Download Resume
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Education & Certifications */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                  <GraduationCap className="w-6 h-6 mr-3 text-primary" />
                  Education
                </h3>
                <Card className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-3 h-3 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-semibold text-foreground">Bachelor of Engineering - BE, Software Engineering</h4>
                        <p className="text-accent font-medium">OSTİM Teknik Üniversitesi</p>
                        <p className="text-sm text-muted-foreground flex items-center mt-1">
                          <Calendar className="w-4 h-4 mr-1" />
                          Sep 2022 - Jun 2026 • Ankara Türkiye
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                          Comprehensive study in Python, C, Web Development, Databases, Data Mining, Software Project Management, C++, Java, SQL, JavaScript, and Machine Learning.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-3 h-3 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-semibold text-foreground">High School Diploma, Information Technology - Engineering</h4>
                        <p className="text-accent font-medium">Omar bin Abdul Aziz Secondary Independent School for Boys</p>
                        <p className="text-sm text-muted-foreground flex items-center mt-1">
                          <Calendar className="w-4 h-4 mr-1" />
                          Sep 2018 - Jun 2021 • Doha/Qatar
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                          Foundation in CSS, Python, JavaScript, Information Technology, and HTML programming.
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                  <Award className="w-6 h-6 mr-3 text-accent" />
                  Certifications
                </h3>
                <Card className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-3 h-3 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-semibold text-foreground">Associate Data Engineer in SQL</h4>
                        <p className="text-sm text-muted-foreground">DataCamp • Jan 2025</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-3 h-3 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-semibold text-foreground">Data Scientist in Python</h4>
                        <p className="text-sm text-muted-foreground">DataCamp • Jun 2024</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-3 h-3 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-semibold text-foreground">Data Analyst in SQL</h4>
                        <p className="text-sm text-muted-foreground">DataCamp • Jan 2024</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </motion.div>

            {/* Experience & Skills */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                  <Briefcase className="w-6 h-6 mr-3 text-primary" />
                  Experience
                </h3>
                <Card className="p-6">
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-3 h-3 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-semibold text-foreground">Full-stack Developer</h4>
                        <p className="text-accent font-medium">DAKAEI AI • Full-time</p>
                        <p className="text-sm text-muted-foreground flex items-center mt-1">
                          <Calendar className="w-4 h-4 mr-1" />
                          Apr 2025 - Present
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          London Area, United Kingdom • Remote
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                          Developing full-stack applications using React.js, TypeScript, Node.js, Next.js, JavaScript, SQL, HTML, CSS, Firebase, PostgreSQL, and Databases.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-3 h-3 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-semibold text-foreground">Freelance Full-Stack Developer</h4>
                        <p className="text-accent font-medium">Self-Employed</p>
                        <p className="text-sm text-muted-foreground flex items-center mt-1">
                          <Calendar className="w-4 h-4 mr-1" />
                          2023 - 2025
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                          Developed web and mobile applications for various clients, specializing in React, Next.js, and
                          Flutter.
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                  <Code className="w-6 h-6 mr-3 text-accent" />
                  Technical Skills
                </h3>
                <Card className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Programming Languages</h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge
                          variant="secondary"
                          className="flex items-center gap-1 hover:scale-105 transition-transform"
                        >
                          <SiJavascript className="w-3 h-3" />
                          JavaScript
                        </Badge>
                        <Badge
                          variant="secondary"
                          className="flex items-center gap-1 hover:scale-105 transition-transform"
                        >
                          <SiTypescript className="w-3 h-3 text-blue-500" />
                          TypeScript
                        </Badge>
                        <Badge
                          variant="secondary"
                          className="flex items-center gap-1 hover:scale-105 transition-transform"
                        >
                          <FaPython className="w-3 h-3 text-yellow-400" />
                          Python
                        </Badge>
                        <Badge
                          variant="secondary"
                          className="flex items-center gap-1 hover:scale-105 transition-transform"
                        >
                          <SiDart className="w-3 h-3 text-blue-400" />
                          Dart
                        </Badge>
                        <Badge
                          variant="secondary"
                          className="flex items-center gap-1 hover:scale-105 transition-transform"
                        >
                          <Database className="w-3 h-3" />
                          SQL
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Frameworks & Libraries</h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge
                          variant="outline"
                          className="flex items-center gap-1 hover:scale-105 transition-transform"
                        >
                          <FaReact className="w-3 h-3 text-cyan-400" />
                          React
                        </Badge>
                        <Badge
                          variant="outline"
                          className="flex items-center gap-1 hover:scale-105 transition-transform"
                        >
                          <SiNextdotjs className="w-3 h-3 text-black dark:text-white" />
                          Next.js
                        </Badge>
                        <Badge
                          variant="outline"
                          className="flex items-center gap-1 hover:scale-105 transition-transform"
                        >
                          <SiFlutter className="w-3 h-3 text-blue-500" />
                          Flutter
                        </Badge>
                        <Badge
                          variant="outline"
                          className="flex items-center gap-1 hover:scale-105 transition-transform"
                        >
                          <FaNodeJs className="w-3 h-3 text-green-500" />
                          Node.js
                        </Badge>
                        <Badge
                          variant="outline"
                          className="flex items-center gap-1 hover:scale-105 transition-transform"
                        >
                          <SiExpress className="w-3 h-3" />
                          Express
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Cloud & Tools</h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge
                          variant="secondary"
                          className="flex items-center gap-1 hover:scale-105 transition-transform"
                        >
                          <FaAws className="w-3 h-3 text-orange-400" />
                          AWS
                        </Badge>
                        <Badge
                          variant="secondary"
                          className="flex items-center gap-1 hover:scale-105 transition-transform"
                        >
                          <SiFirebase className="w-3 h-3 text-orange-500" />
                          Firebase
                        </Badge>
                        <Badge
                          variant="secondary"
                          className="flex items-center gap-1 hover:scale-105 transition-transform"
                        >
                          <FaDocker className="w-3 h-3 text-blue-500" />
                          Docker
                        </Badge>
                        <Badge
                          variant="secondary"
                          className="flex items-center gap-1 hover:scale-105 transition-transform"
                        >
                          <FaGitAlt className="w-3 h-3 text-orange-500" />
                          Git
                        </Badge>
                        <Badge
                          variant="secondary"
                          className="flex items-center gap-1 hover:scale-105 transition-transform"
                        >
                          <SiPostgresql className="w-3 h-3 text-blue-600" />
                          PostgreSQL
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="py-12 bg-muted/30 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-6">
            <motion.a
              whileHover={{ scale: 1.1, y: -2 }}
              href="https://github.com/NouradinAbdurahman"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent transition-colors"
            >
              <Github className="h-6 w-6" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1, y: -2 }}
              href="https://linkedin.com/in/nouraddin"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent transition-colors"
            >
              <Linkedin className="h-6 w-6" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1, y: -2 }}
              href="https://instagram.com/nouradiin_"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-pink-500 transition-colors"
            >
              <FaInstagram className="h-6 w-6" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1, y: -2 }}
              href="mailto:n.aden1208@gmail.com"
              className="text-muted-foreground hover:text-accent transition-colors"
            >
              <Mail className="h-6 w-6" />
            </motion.a>
          </div>
        </div>
      </section>
    </div>
  )
}
