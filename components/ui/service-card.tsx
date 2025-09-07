import * as React from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { TechBadge } from "@/components/ui/tech-badge"
import { Typography } from "@/components/ui/typography"
import { Code, Database, Smartphone, Cloud } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Service } from "@/lib/data"

interface ServiceCardProps {
  service: Service
  className?: string
  delay?: number
}

const iconMap = {
  Code,
  Database,
  Smartphone,
  Cloud
}

function ServiceCard({ 
  service, 
  className,
  delay = 0 
}: ServiceCardProps) {
  const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Code

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className={className}
    >
      <Card className="p-6 h-full hover:shadow-xl transition-all duration-300 group cursor-pointer bg-transparent border-white/20 hover:border-white/40">
        <motion.div whileHover={{ scale: 1.05 }} className="text-center space-y-4">
          <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto group-hover:bg-primary/20 transition-colors">
            <IconComponent className="w-8 h-8 text-primary" />
          </div>
          
          <Typography variant="h4" className="text-center">
            {service.title}
          </Typography>
          
          <Typography variant="muted" className="text-sm leading-relaxed">
            {service.description}
          </Typography>
          
          <div className="flex flex-wrap gap-2 justify-center pt-2">
            {service.technologies.map((tech) => (
              <TechBadge 
                key={tech} 
                name={tech} 
                size="sm"
              />
            ))}
          </div>
        </motion.div>
      </Card>
    </motion.div>
  )
}

export { ServiceCard }
