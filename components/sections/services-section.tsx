"use client"

import * as React from "react"
import { Section } from "@/components/ui/section"
import { SectionHeader } from "@/components/ui/section-header"
import { ServiceCard } from "@/components/ui/service-card"
import { Grid } from "@/components/ui/grid"
import { services as defaultServices } from "@/lib/data"
import { useSupabaseTranslations } from "@/hooks/use-supabase-translations"
import { useLocale } from "next-intl"
import { MixedContent } from "@/lib/rtl-utils"

interface ServicesSectionProps {
  className?: string
}

function ServicesSection({ className }: ServicesSectionProps) {
  const { t, refresh } = useSupabaseTranslations({ autoRefresh: true })
  const locale = useLocale()
  const isRTL = locale === 'ar'
  
  // Force refresh translations on mount
  React.useEffect(() => {
    refresh()
  }, [refresh])
  
  // Get translations with fallbacks
  const title = t('services.title', 'Services')
  const subtitle = t('services.subtitle', 'Comprehensive solutions for your digital needs')
  
  // Get services from the new items structure
  const servicesItemsString = t('services.items', '[]')
  let servicesItems = []
  
  try {
    servicesItems = JSON.parse(servicesItemsString)
  } catch (error) {
    console.error('Error parsing services items:', error)
    servicesItems = defaultServices
  }
  
  // If no services from API, fallback to default services
  if (!Array.isArray(servicesItems) || servicesItems.length === 0) {
    servicesItems = defaultServices
  }
  
  // Translate service items
  const translatedServices = servicesItems.map((service: any) => {
    return {
      ...service,
      title: service.title?.[locale] || service.title?.en || service.title || 'Untitled Service',
      description: service.description?.[locale] || service.description?.en || service.description || 'No description available',
      icon: service.icon || 'Code',
      technologies: service.technologies || []
    }
  })
  
  return (
    <Section id="services" className={className}>
      <SectionHeader 
        title={title}
        description={subtitle}
      />

      <Grid cols={4} gap="lg">
        {translatedServices.map((service: any, index: number) => (
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
