"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { TechBadge } from "@/components/ui/tech-badge"
import { Typography } from "@/components/ui/typography"
import { Code, Database, Cloud, Smartphone } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Skill } from "@/lib/data"
import { MixedContent } from "@/lib/rtl-utils"
import { useLocale } from "next-intl"

interface SkillCardProps {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  skills: Skill[]
  className?: string
  delay?: number
}

function SkillCard({ 
  title, 
  description, 
  icon: Icon, 
  skills, 
  className,
  delay = 0 
}: SkillCardProps) {
  const locale = useLocale()
  const isRTL = locale === 'ar'
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      <Card className="p-6 hover:shadow-lg transition-shadow bg-transparent border-white/20 hover:border-white/40 cursor-pointer">
        <motion.div className="text-center">
          <Icon className="h-12 w-12 text-primary mx-auto mb-4" />
          <Typography variant="h4" className="mb-2">
            <MixedContent text={title} isRTL={isRTL} />
          </Typography>
          <Typography variant="muted" className="text-sm mb-4">
            <MixedContent text={description} isRTL={isRTL} />
          </Typography>
          <div className="flex flex-wrap gap-2 justify-center">
            {skills.map((skill) => (
              <TechBadge 
                key={skill.name} 
                name={skill.name}
                icon={skill.icon}
                color={skill.color}
                size="sm"
              />
            ))}
          </div>
        </motion.div>
      </Card>
    </motion.div>
  )
}

export { SkillCard }
