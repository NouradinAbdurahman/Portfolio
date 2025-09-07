import * as React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Typography } from "@/components/ui/typography"
import { TechStackLoop } from "@/components/ui/tech-stack-loop"
import { TechBadge } from "@/components/ui/tech-badge"
import Aurora from "@/components/ui/aurora"
import { ArrowRight, Mail } from "lucide-react"
import { cn } from "@/lib/utils"

interface HeroSectionProps {
  className?: string
}

function HeroSection({ className }: HeroSectionProps) {
  return (
    <section className={cn("relative pt-50 pb-20 overflow-hidden bg-gray-50 dark:bg-[#060010]", className)}>
      {/* Gradient/Aurora only in dark mode */}
      <div className="absolute inset-0 w-full h-full hidden dark:block">
        <Aurora
          colorStops={["#060010", "#B19EEF", "#5227FF"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-8">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <Typography variant="h1" className="text-5xl md:text-6xl font-bold dark:text-white text-black">
              Software Engineer • Full-Stack Developer • Data Engineer
            </Typography>
            <Typography variant="lead" className="text-xl max-w-4xl mx-auto dark:text-white text-black">
              Building scalable applications, cloud-driven systems, and data-powered solutions. 
              Passionate about creating efficient ETL pipelines, modern web experiences, and automated workflows.
            </Typography>
          </motion.div>

          {/* Tech Stack Preview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            <div className="flex flex-wrap justify-center gap-3">
              {["React", "Next.js", "Python", "Flutter", "AWS", "Docker"].map((tech) => (
                <TechBadge
                  key={tech}
                  name={tech}
                  size="md"
                  variant="outline"
                  className="px-4 py-2 rounded-full"
                />
              ))}
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button 
              asChild
              size="lg" 
              className="group neumorphic-button dark:text-white text-black hover:text-black dark:bg-transparent bg-white/90 cursor-pointer border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/60"
            >
              <a href="#portfolio">
                View Portfolio
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            
            {/* Download Resume button hidden as requested */}
            
            <Button 
              asChild
              size="lg" 
              variant="outline"
              className="group neumorphic-button dark:text-white text-black hover:text-black dark:bg-transparent bg-white/90 cursor-pointer border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/60"
            >
              <a href="#contact">
                <Mail className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                Contact Me
              </a>
            </Button>
          </motion.div>

          {/* Tech Stack Animation - Positioned at bottom */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="pt-8"
          >
            <TechStackLoop 
              speed={120}
              direction="left"
              logoHeight={48}
              gap={40}
              pauseOnHover={false}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export { HeroSection }
