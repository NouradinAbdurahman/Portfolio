import * as React from "react"
import { Section } from "@/components/ui/section"
import { SectionHeader } from "@/components/ui/section-header"
import { ServiceCard } from "@/components/ui/service-card"
import { Grid } from "@/components/ui/grid"
import { services as defaultServices } from "@/lib/data"
import { useSectionContent } from "@/hooks/use-content"

interface ServicesSectionProps {
  className?: string
}

function ServicesSection({ className }: ServicesSectionProps) {
  const content = useSectionContent('services', {
    title: 'Services',
    subtitle: 'Comprehensive solutions for your digital needs',
    hidden: false,
    title_hidden: false,
    subtitle_hidden: false,
    items: defaultServices
  })
  if ((content as any).hidden) return null
  const items = Array.isArray(content.items) && content.items.length > 0 ? content.items : defaultServices
  return (
    <Section id="services" className={className}>
      <SectionHeader 
        title={content.title}
        description={content.subtitle}
        titleHidden={content.title_hidden}
        descriptionHidden={content.subtitle_hidden}
      />

      <Grid cols={4} gap="lg">
        {items.filter((service: any) => !service.hidden).map((service: any, index: number) => (
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
