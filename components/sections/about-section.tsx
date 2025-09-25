import * as React from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Section } from "@/components/ui/section"
import { SectionHeader } from "@/components/ui/section-header"
import { Typography } from "@/components/ui/typography"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { useSectionContent } from "@/hooks/use-content"
// Button removed in this section per request

interface AboutSectionProps {
  className?: string
}

function AboutSection({ className }: AboutSectionProps) {
  const content = useSectionContent('about', {
    title: 'About Me',
    subtitle: 'Nouraddin - Software Engineering Student & Developer',
    body: '',
    name: 'Nouraddin Abdurahman Aden',
    role: 'Software Engineering Student & Developer',
    hidden: false,
    title_hidden: false,
    subtitle_hidden: false,
    name_hidden: false,
    role_hidden: false,
    body_hidden: false
  })
  if (content.hidden) return null
  return (
    <Section id="about" variant="light" className={className}>
      <SectionHeader 
        title={content.title}
        description={content.subtitle}
      />

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
                  const target = e.target as HTMLImageElement
                  target.oncontextmenu = () => false
                  target.ondragstart = () => false
                }}
              />
              
              {/* Tooltip */}
              <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="bg-transparent border-2 border-primary rounded-lg px-3 py-2 text-sm font-medium text-primary whitespace-nowrap animate-pulse-glow">
                  Nouraddin Abdurahman Aden
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="space-y-4">
            {!content.name_hidden && (
              <Typography variant="h3" className="text-2xl md:text-3xl font-bold">
                {content.name}
              </Typography>
            )}
            {!content.role_hidden && (
              <Typography variant="h4" className="text-xl md:text-2xl font-semibold text-muted-foreground dark:text-primary">
                {content.role}
              </Typography>
            )}
            {!content.body_hidden && (
              <div className="prose prose-invert max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {content.body || `Hi, I'm Nouraddin! Currently pursuing Software Engineering at OSTİM Teknik University, I specialize in building scalable applications and data-driven solutions. My passion lies in creating efficient systems that bridge the gap between complex data and user-friendly interfaces.`}
                </ReactMarkdown>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="space-y-3">
              <Typography variant="p" className="font-medium">
                <strong className="dark:text-white text-black">Full-Stack Expertise:</strong> Proficient in React, Next.js,
                Flutter, and modern web technologies for creating responsive, performant applications.
              </Typography>
              
              <Typography variant="p" className="font-medium">
                <strong className="dark:text-white text-black">Data Engineering:</strong> Experienced in ETL pipeline development, 
                SQL optimization, and cloud-based data processing solutions.
              </Typography>
              
              <Typography variant="p" className="font-medium">
                <strong className="dark:text-white text-black">Cloud & Automation:</strong> Skilled in AWS, Firebase, 
                and building automated workflows that scale with business needs.
              </Typography>
            </div>
          </div>

          {/* Download CV button hidden as requested */}
        </motion.div>
      </div>
    </Section>
  )
}

export { AboutSection }
