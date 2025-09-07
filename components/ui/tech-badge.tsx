import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { 
  FaReact, FaPython, FaAws, FaDocker, FaGitAlt, FaNodeJs 
} from "react-icons/fa"
import {
  SiTypescript, SiNextdotjs, SiFlutter, SiDart, SiFirebase, 
  SiPostgresql, SiReact, SiTailwindcss, SiJavascript, SiExpress, 
  SiOpenai, SiVercel
} from "react-icons/si"
import { Database, Component } from "lucide-react"

interface TechBadgeProps {
  name: string
  icon?: string
  color?: string
  variant?: "default" | "outline" | "secondary"
  size?: "sm" | "md" | "lg"
  className?: string
}

const iconMap: Record<string, React.ElementType> = {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  FaPython,
  SiDart,
  SiTailwindcss,
  FaReact,
  SiFlutter,
  FaNodeJs,
  SiFirebase,
  FaAws,
  FaDocker,
  FaGitAlt,
  SiExpress,
  Database,
  SiPostgresql,
  SiOpenai,
  SiVercel,
  Component
}

const sizeVariants = {
  sm: "text-xs",
  md: "text-sm", 
  lg: "text-base"
}

type IconKey = keyof typeof iconMap

const nameToIconAndColor: Record<string, { icon: IconKey; color: string }> = {
  // Web
  react: { icon: "SiReact", color: "text-cyan-400" },
  "reactnative": { icon: "FaReact", color: "text-cyan-400" },
  nextjs: { icon: "SiNextdotjs", color: "text-black dark:text-white" },
  typescript: { icon: "SiTypescript", color: "text-blue-500" },
  javascript: { icon: "SiJavascript", color: "text-yellow-400" },
  tailwind: { icon: "SiTailwindcss", color: "text-cyan-500" },
  "tailwindcss": { icon: "SiTailwindcss", color: "text-cyan-500" },
  "shadcnui": { icon: "Component", color: "text-purple-400" },

  // Backend & DB
  node: { icon: "FaNodeJs", color: "text-green-500" },
  "nodejs": { icon: "FaNodeJs", color: "text-green-500" },
  express: { icon: "SiExpress", color: "text-gray-600 dark:text-gray-300" },
  sql: { icon: "Database", color: "text-blue-500" },
  postgresql: { icon: "SiPostgresql", color: "text-blue-600" },
  postgres: { icon: "SiPostgresql", color: "text-blue-600" },

  // Mobile & Langs
  flutter: { icon: "SiFlutter", color: "text-blue-500" },
  dart: { icon: "SiDart", color: "text-blue-400" },
  python: { icon: "FaPython", color: "text-yellow-500" },

  // Infra & Tools
  aws: { icon: "FaAws", color: "text-orange-400" },
  docker: { icon: "FaDocker", color: "text-blue-500" },
  git: { icon: "FaGitAlt", color: "text-orange-500" },
  firebase: { icon: "SiFirebase", color: "text-orange-500" },
  vercel: { icon: "SiVercel", color: "text-white dark:text-white" },
  openaiapi: { icon: "SiOpenai", color: "text-emerald-400" },
  openai: { icon: "SiOpenai", color: "text-emerald-400" },
}

function resolveIcon(name: string): { IconComponent: React.ElementType | null; color: string } {
  const normalized = name.toLowerCase().replace(/[^a-z0-9]/g, "")
  const direct = nameToIconAndColor[normalized]
  if (direct) return { IconComponent: iconMap[direct.icon], color: direct.color }

  // Fallbacks for partial matches
  if (normalized.includes("react")) return { IconComponent: iconMap.SiReact, color: "text-cyan-400" }
  if (normalized.includes("next")) return { IconComponent: iconMap.SiNextdotjs, color: "text-black dark:text-white" }
  if (normalized.includes("typescript") || normalized === "ts") return { IconComponent: iconMap.SiTypescript, color: "text-blue-500" }
  if (normalized.includes("javascript") || normalized === "js" ) return { IconComponent: iconMap.SiJavascript, color: "text-yellow-400" }
  if (normalized.includes("tailwind")) return { IconComponent: iconMap.SiTailwindcss, color: "text-cyan-500" }
  if (normalized.includes("node")) return { IconComponent: iconMap.FaNodeJs, color: "text-green-500" }
  if (normalized.includes("express")) return { IconComponent: iconMap.SiExpress, color: "text-gray-600 dark:text-gray-300" }
  if (normalized.includes("postgres")) return { IconComponent: iconMap.SiPostgresql, color: "text-blue-600" }
  if (normalized === "sql") return { IconComponent: iconMap.Database, color: "text-blue-500" }
  if (normalized.includes("flutter")) return { IconComponent: iconMap.SiFlutter, color: "text-blue-500" }
  if (normalized.includes("dart")) return { IconComponent: iconMap.SiDart, color: "text-blue-400" }
  if (normalized.includes("python")) return { IconComponent: iconMap.FaPython, color: "text-yellow-500" }
  if (normalized.includes("firebase")) return { IconComponent: iconMap.SiFirebase, color: "text-orange-500" }
  if (normalized.includes("aws")) return { IconComponent: iconMap.FaAws, color: "text-orange-400" }
  if (normalized.includes("docker")) return { IconComponent: iconMap.FaDocker, color: "text-blue-500" }
  if (normalized.includes("git")) return { IconComponent: iconMap.FaGitAlt, color: "text-orange-500" }
  if (normalized.includes("vercel")) return { IconComponent: iconMap.SiVercel, color: "text-white dark:text-white" }
  if (normalized.includes("openai")) return { IconComponent: iconMap.SiOpenai, color: "text-emerald-400" }
  if (normalized.includes("shadcn")) return { IconComponent: iconMap.Component, color: "text-purple-400" }
  
  return { IconComponent: null, color: "text-gray-600" }
}

function TechBadge({ 
  name, 
  icon, 
  color = "text-gray-600", 
  variant = "outline",
  size = "sm",
  className 
}: TechBadgeProps) {
  let IconComponent = icon ? iconMap[icon as keyof typeof iconMap] : null
  let derivedColor = color
  if (!IconComponent) {
    const resolved = resolveIcon(name)
    IconComponent = resolved.IconComponent
    if (color === "text-gray-600") derivedColor = resolved.color
  }

  return (
    <Badge 
      variant={variant}
      className={cn(
        "flex items-center gap-1 bg-transparent border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/40 dark:text-white text-black transition-colors",
        sizeVariants[size],
        className
      )}
    >
      {IconComponent && (
        <IconComponent className={cn("w-3 h-3", derivedColor)} />
      )}
      {name}
    </Badge>
  )
}

export { TechBadge }
