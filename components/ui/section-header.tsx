import * as React from "react"
import { motion } from "framer-motion"
import { Typography } from "@/components/ui/typography"
import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  title: string
  description?: string
  className?: string
  delay?: number
  titleHidden?: boolean
  descriptionHidden?: boolean
}

function SectionHeader({ 
  title, 
  description, 
  className,
  delay = 0,
  titleHidden = false,
  descriptionHidden = false
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className={cn("text-center mb-16", className)}
    >
      {!titleHidden && (
        <Typography variant="h2" className="mb-4 dark:text-white text-black section-title">
          {title}
        </Typography>
      )}
      {description && !descriptionHidden && (
        <Typography variant="lead" className="max-w-2xl mx-auto text-muted-foreground section-description">
          {description}
        </Typography>
      )}
      <div className="w-24 h-1 bg-primary mx-auto mt-6"></div>
    </motion.div>
  )
}

export { SectionHeader }
