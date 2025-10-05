"use client"

import * as React from "react"
import { Section } from "@/components/ui/section"
import { SectionHeader } from "@/components/ui/section-header"
import { ServiceCard } from "@/components/ui/service-card"
import { Grid } from "@/components/ui/grid"
import { services as defaultServices } from "@/lib/data"
import { useSupabaseTranslations } from "@/hooks/use-supabase-translations"
import { useLocale } from "next-intl"
// import { MixedContent } from "@/lib/rtl-utils"

interface ServicesSectionProps {
  className?: string
}

function ServicesSection({ className }: ServicesSectionProps) {
  const { t, refresh } = useSupabaseTranslations({ autoRefresh: true })
  const locale = useLocale()
  // const isRTL = locale === 'ar'
  
  // Force refresh translations on mount
  React.useEffect(() => {
    refresh()
  }, [refresh])
  
  // Build services exactly like Hero: pull strings via t(...) per-key
  const keyByIndex = ['webDevelopment','dataEngineering','mobileDevelopment','cloudSolutions']
  const servicesFromKeys = defaultServices.map((svc, idx) => {
    const key = keyByIndex[idx] || keyByIndex[0]
    return {
      ...svc,
      title: t(`services.${key}.title`, svc.title),
      description: t(`services.${key}.description`, svc.description),
      hidden: (t(`services.${key}.hidden`, 'false') || 'false').toString().toLowerCase() === 'true'
    }
  })
  
  // Get translations with fallbacks
  const title = t('services.title', 'Services')
  const subtitle = t('services.subtitle', 'Comprehensive solutions for your digital needs')
  // Hide flags (admin)
  const sectionHidden = (t('services.hidden', 'false') || 'false').toString().toLowerCase() === 'true'
  const hideTitle = (t('services.title_hidden', 'false') || 'false').toString().toLowerCase() === 'true'
  const hideSubtitle = (t('services.subtitle_hidden', 'false') || 'false').toString().toLowerCase() === 'true'
  
  // Get services from the new items structure
  const servicesItems = servicesFromKeys
  
  // Translate service items
  type ServiceItem = { title?: Record<string,string>|string; description?: Record<string,string>|string; icon?: string; technologies?: string[]; hidden?: boolean }
  const translatedServices = (servicesItems as ServiceItem[])
    .filter((service) => !service?.hidden) // respect per-item hidden flag
    .map((service, idx: number) => {
    const key = keyByIndex[idx] || keyByIndex[0]
    const titleRaw = service?.title
    const descRaw = service?.description
    const title = (typeof titleRaw === 'object')
      ? (titleRaw?.[locale] || titleRaw?.en)
      : undefined
    const description = (typeof descRaw === 'object')
      ? (descRaw?.[locale] || descRaw?.en)
      : undefined
    return {
      ...service,
        title: title || t(`services.${key}.title`, String(titleRaw || 'Untitled Service')),
        description: description || t(`services.${key}.description`, String(descRaw || '')),
      icon: service.icon || 'Code',
      technologies: service.technologies || []
    }
  })
  
  if (sectionHidden) return null
  return (
    <Section id="services" className={className}>
      <SectionHeader 
        title={title}
        description={subtitle}
        titleHidden={hideTitle}
        descriptionHidden={hideSubtitle}
      />

      <Grid cols={4} gap="lg">
        {translatedServices.map((service, index: number) => (
          <ServiceCard
            key={service.title}
            service={service}
            delay={index * 0.1}
          />
        ))}
      </Grid>
    </Section>
  )
}

export { ServicesSection }
