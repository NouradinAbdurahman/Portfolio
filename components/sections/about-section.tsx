"use client"

import * as React from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Section } from "@/components/ui/section"
import { SectionHeader } from "@/components/ui/section-header"
import { Typography } from "@/components/ui/typography"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { useSupabaseTranslations } from "@/hooks/use-supabase-translations"
import { useLocale } from "next-intl"
import { MixedContent, processMixedContent } from "@/lib/rtl-utils"
// Button removed in this section per request


interface AboutSectionProps {
  className?: string
}

function AboutSection({ className }: AboutSectionProps) {
  const locale = useLocale()
  const isRTL = locale === 'ar'
  const { t } = useSupabaseTranslations()
  
  // Get translations with fallbacks
  const title = t('about.title', 'About Me')
  const subtitle = t('about.subtitle', 'Nouraddin - Software Engineering Student & Developer')
  const name = t('about.name', 'Nouraddin Abdurahman Aden')
  const role = t('about.role', 'Software Engineering Student & Developer')
  const body = t('about.body', `Hi, I'm Nouraddin! Currently pursuing Software Engineering at OSTİM Teknik University, I specialize in building scalable applications and data-driven solutions. My passion lies in creating efficient systems that bridge the gap between complex data and user-friendly interfaces.`)
  const fullstackExpertise = t('about.fullstackExpertise', 'Proficient in React, Next.js, Flutter, and modern web technologies for creating responsive, performant applications.')
  const dataEngineering = t('about.dataEngineering', 'Experienced in ETL pipeline development, SQL optimization, and cloud-based data processing solutions.')
  const cloudAutomation = t('about.cloudAutomation', 'Skilled in AWS, Firebase, and building automated workflows that scale with business needs.')
  const fullstackExpertiseHeader = t('about.fullstackExpertiseHeader', 'Full-Stack Development:')
  const dataEngineeringHeader = t('about.dataEngineeringHeader', 'Data Engineering:')
  const cloudAutomationHeader = t('about.cloudAutomationHeader', 'Cloud & Automation:')
  
  // Hidden flags (managed from Admin). If not present, default to false
  const sectionHidden = (t('about.hidden', 'false') || 'false').toString().toLowerCase() === 'true'
  const hideTitle = (t('about.title_hidden', 'false') || 'false').toString().toLowerCase() === 'true'
  const hideSubtitle = (t('about.subtitle_hidden', 'false') || 'false').toString().toLowerCase() === 'true'
  const hideName = (t('about.name_hidden', 'false') || 'false').toString().toLowerCase() === 'true'
  const hideRole = (t('about.role_hidden', 'false') || 'false').toString().toLowerCase() === 'true'
  const hideBody = (t('about.body_hidden', 'false') || 'false').toString().toLowerCase() === 'true'
  const hideFsHeader = (t('about.fullstackExpertiseHeader_hidden', 'false') || 'false').toString().toLowerCase() === 'true'
  const hideFs = (t('about.fullstackExpertise_hidden', 'false') || 'false').toString().toLowerCase() === 'true'
  const hideDeHeader = (t('about.dataEngineeringHeader_hidden', 'false') || 'false').toString().toLowerCase() === 'true'
  const hideDe = (t('about.dataEngineering_hidden', 'false') || 'false').toString().toLowerCase() === 'true'
  const hideCaHeader = (t('about.cloudAutomationHeader_hidden', 'false') || 'false').toString().toLowerCase() === 'true'
  const hideCa = (t('about.cloudAutomation_hidden', 'false') || 'false').toString().toLowerCase() === 'true'
  
  // Profile image can be managed via admin translations
  const profile_image = t('about.profile_image', '/photo.png')
  const [imageSrc, setImageSrc] = React.useState<string>(profile_image)
  React.useEffect(() => { setImageSrc(profile_image || '/photo.png') }, [profile_image])
  
  if (sectionHidden) return null

  return (
    <Section id="about" variant="light" className={className}>
      <SectionHeader 
        title={hideTitle ? '' : title}
        description={hideSubtitle ? '' : subtitle}
      />

      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${isRTL ? 'lg:grid-flow-col-dense' : ''}`}>
        {/* Profile Photo */}
        <motion.div
          initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className={`flex justify-center ${isRTL ? 'lg:justify-start' : 'lg:justify-end'}`}
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
                src={imageSrc}
                alt={name}
                fill
                sizes="(max-width: 640px) 320px, (max-width: 1024px) 480px, 640px"
                unoptimized
                priority
                className="object-cover rounded-full select-none pointer-events-none profile-image"
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
                onError={() => setImageSrc('/photo.png')}
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
                  {name}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className={`space-y-6 ${isRTL ? 'text-right' : 'text-left'}`}
          dir={isRTL ? 'rtl' : 'ltr'}
          lang={isRTL ? 'ar' : 'en'}
        >
          <div className="space-y-4">
            {!hideName && (
              <Typography variant="h3" className="text-2xl md:text-3xl font-bold">
                <MixedContent text={name} isRTL={isRTL} />
              </Typography>
            )}
            {!hideRole && (
              <Typography variant="h4" className="text-xl md:text-2xl font-semibold text-muted-foreground dark:text-primary">
                <MixedContent text={role} isRTL={isRTL} />
              </Typography>
            )}
            {!hideBody && (
              <div className="prose prose-invert max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {processMixedContent(body, isRTL)}
                </ReactMarkdown>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="space-y-3">
              {!hideFs && (
                <Typography variant="p" className="font-medium">
                  {!hideFsHeader && (
                    <strong className="text-muted-foreground dark:text-primary">
                      <MixedContent text={fullstackExpertiseHeader} isRTL={isRTL} />
                    </strong>
                  )}{!hideFsHeader ? ' ' : ''}
                  <MixedContent text={fullstackExpertise} isRTL={isRTL} />
                </Typography>
              )}
              
              {!hideDe && (
                <Typography variant="p" className="font-medium">
                  {!hideDeHeader && (
                    <strong className="text-muted-foreground dark:text-primary">
                      <MixedContent text={dataEngineeringHeader} isRTL={isRTL} />
                    </strong>
                  )}{!hideDeHeader ? ' ' : ''}
                  <MixedContent text={dataEngineering} isRTL={isRTL} />
                </Typography>
              )}
              
              {!hideCa && (
                <Typography variant="p" className="font-medium">
                  {!hideCaHeader && (
                    <strong className="text-muted-foreground dark:text-primary">
                      <MixedContent text={cloudAutomationHeader} isRTL={isRTL} />
                    </strong>
                  )}{!hideCaHeader ? ' ' : ''}
                  <MixedContent text={cloudAutomation} isRTL={isRTL} />
                </Typography>
              )}
            </div>
          </div>

          {/* Download CV button hidden as requested */}
        </motion.div>
      </div>
    </Section>
  )
}

export { AboutSection }
