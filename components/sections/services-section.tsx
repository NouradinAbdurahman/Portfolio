import * as React from "react"
import { Section } from "@/components/ui/section"
import { SectionHeader } from "@/components/ui/section-header"
import { ServiceCard } from "@/components/ui/service-card"
import { Grid } from "@/components/ui/grid"
import { services } from "@/lib/data"

interface ServicesSectionProps {
  className?: string
}

function ServicesSection({ className }: ServicesSectionProps) {
  return (
    <Section id="services" className={className}>
      <SectionHeader 
        title="Services"
        description="Comprehensive solutions for your digital needs"
      />

      <Grid cols={4} gap="lg">
        {services.map((service, index) => (
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
