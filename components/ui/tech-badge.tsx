import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { MixedContent } from "@/lib/rtl-utils"
import { 
  FaReact, FaPython, FaAws, FaDocker, FaGitAlt, FaNodeJs, FaJava, FaPhp, FaSwift, FaRust, FaLinux 
} from "react-icons/fa"
import {
  SiTypescript, SiNextdotjs, SiFlutter, SiDart, SiFirebase,
  SiPostgresql, SiReact, SiTailwindcss, SiJavascript, SiExpress,
  SiOpenai, SiVercel, SiAngular, SiVuedotjs, SiSvelte, SiLaravel, SiDjango,
  SiFlask, SiSpring, SiRubyonrails, SiDotnet, SiC, SiCplusplus,
  SiGo, SiKotlin, SiScala, SiPerl, SiR, SiWolframmathematica,
  SiMysql, SiMongodb, SiRedis, SiSqlite, SiMariadb, SiOracle,
  SiElasticsearch, SiKubernetes, SiTerraform, SiAnsible, SiNginx, SiApache,
  SiHeroku, SiNetlify, SiCloudflare, SiGooglecloud, SiHtml5, SiCss3, SiSass, SiLess,
  SiJest, SiMocha, SiPytest, SiCypress, SiWebpack, SiVite,
  SiRollupdotjs, SiNpm, SiYarn, SiPnpm, SiGithubactions, SiGitlab,
  SiCircleci, SiGraphql, SiPrisma, SiThreedotjs, SiAstro, SiRemix, SiNuxtdotjs,
  SiDeno, SiFastapi, SiNestjs, SiBootstrap
} from "react-icons/si"
import { Database, Component } from "lucide-react"

interface TechBadgeProps {
  name: string
  icon?: string
  color?: string
  variant?: "default" | "outline" | "secondary"
  size?: "sm" | "md" | "lg"
  className?: string
  isRTL?: boolean
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
  Component,
  // Extended ecosystem
  SiHtml5,
  SiCss3,
  SiSass,
  SiLess,
  SiAngular,
  SiVuedotjs,
  SiSvelte,
  SiLaravel,
  SiDjango,
  SiFlask,
  SiSpring,
  SiRubyonrails,
  SiDotnet,
  SiC,
  SiCplusplus,
  SiGo,
  SiKotlin,
  SiScala,
  SiPerl,
  SiR,
  SiWolframmathematica,
  FaJava,
  FaPhp,
  FaSwift,
  FaRust,
  FaLinux,
  SiMysql,
  SiMongodb,
  SiRedis,
  SiSqlite,
  SiMariadb,
  SiOracle,
  SiElasticsearch,
  SiKubernetes,
  SiTerraform,
  SiAnsible,
  SiNginx,
  SiApache,
  SiHeroku,
  SiNetlify,
  SiCloudflare,
  SiGooglecloud,
  SiJest,
  SiMocha,
  SiPytest,
  SiCypress,
  SiWebpack,
  SiVite,
  SiRollupdotjs,
  SiNpm,
  SiYarn,
  SiPnpm,
  SiGithubactions,
  SiGitlab,
  SiCircleci,
  SiGraphql,
  SiPrisma,
  SiThreedotjs,
  SiAstro,
  SiRemix,
  SiNuxtdotjs,
  SiDeno,
  SiFastapi,
  SiNestjs,
  SiBootstrap
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
  angular: { icon: "SiAngular", color: "text-red-500" },
  vue: { icon: "SiVuedotjs", color: "text-green-500" },
  svelte: { icon: "SiSvelte", color: "text-orange-500" },
  bootstrap: { icon: "SiBootstrap", color: "text-purple-500" },
  typescript: { icon: "SiTypescript", color: "text-blue-500" },
  javascript: { icon: "SiJavascript", color: "text-yellow-400" },
  html: { icon: "SiHtml5", color: "text-orange-500" },
  css: { icon: "SiCss3", color: "text-blue-500" },
  sass: { icon: "SiSass", color: "text-pink-500" },
  less: { icon: "SiLess", color: "text-blue-500" },
  tailwind: { icon: "SiTailwindcss", color: "text-cyan-500" },
  "tailwindcss": { icon: "SiTailwindcss", color: "text-cyan-500" },
  "shadcnui": { icon: "Component", color: "text-purple-400" },

  // Backend & DB
  node: { icon: "FaNodeJs", color: "text-green-500" },
  "nodejs": { icon: "FaNodeJs", color: "text-green-500" },
  express: { icon: "SiExpress", color: "text-gray-600 dark:text-gray-300" },
  deno: { icon: "SiDeno", color: "text-black dark:text-white" },
  fastapi: { icon: "SiFastapi", color: "text-emerald-500" },
  nestjs: { icon: "SiNestjs", color: "text-red-500" },
  remix: { icon: "SiRemix", color: "text-black dark:text-white" },
  astro: { icon: "SiAstro", color: "text-orange-400" },
  nuxt: { icon: "SiNuxtdotjs", color: "text-emerald-500" },
  threejs: { icon: "SiThreedotjs", color: "text-black dark:text-white" },
  graphql: { icon: "SiGraphql", color: "text-pink-500" },
  prisma: { icon: "SiPrisma", color: "text-emerald-500" },
  spring: { icon: "SiSpring", color: "text-green-500" },
  django: { icon: "SiDjango", color: "text-emerald-600" },
  flask: { icon: "SiFlask", color: "text-gray-600 dark:text-gray-300" },
  laravel: { icon: "SiLaravel", color: "text-red-500" },
  rails: { icon: "SiRubyonrails", color: "text-red-600" },
  dotnet: { icon: "SiDotnet", color: "text-purple-600" },
  c: { icon: "SiC", color: "text-blue-600" },
  cpp: { icon: "SiCplusplus", color: "text-blue-600" },
  java: { icon: "FaJava", color: "text-red-500" },
  php: { icon: "FaPhp", color: "text-indigo-600" },
  go: { icon: "SiGo", color: "text-cyan-500" },
  kotlin: { icon: "SiKotlin", color: "text-purple-500" },
  scala: { icon: "SiScala", color: "text-red-600" },
  perl: { icon: "SiPerl", color: "text-blue-500" },
  r: { icon: "SiR", color: "text-sky-600" },
  matlab: { icon: "SiWolframmathematica", color: "text-orange-500" },
  linux: { icon: "FaLinux", color: "text-yellow-500" },
  sql: { icon: "Database", color: "text-blue-500" },
  postgresql: { icon: "SiPostgresql", color: "text-blue-600" },
  postgres: { icon: "SiPostgresql", color: "text-blue-600" },
  mysql: { icon: "SiMysql", color: "text-blue-600" },
  mariadb: { icon: "SiMariadb", color: "text-blue-600" },
  sqlite: { icon: "SiSqlite", color: "text-blue-600" },
  mongodb: { icon: "SiMongodb", color: "text-green-600" },
  redis: { icon: "SiRedis", color: "text-red-600" },
  oracle: { icon: "SiOracle", color: "text-red-600" },
  elasticsearch: { icon: "SiElasticsearch", color: "text-yellow-500" },

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
  kubernetes: { icon: "SiKubernetes", color: "text-blue-500" },
  terraform: { icon: "SiTerraform", color: "text-purple-600" },
  ansible: { icon: "SiAnsible", color: "text-red-600" },
  nginx: { icon: "SiNginx", color: "text-green-600" },
  apache: { icon: "SiApache", color: "text-red-600" },
  heroku: { icon: "SiHeroku", color: "text-purple-600" },
  netlify: { icon: "SiNetlify", color: "text-emerald-500" },
  cloudflare: { icon: "SiCloudflare", color: "text-orange-500" },
  gcp: { icon: "SiGooglecloud", color: "text-blue-500" },
  jest: { icon: "SiJest", color: "text-red-600" },
  mocha: { icon: "SiMocha", color: "text-yellow-700" },
  pytest: { icon: "SiPytest", color: "text-emerald-600" },
  cypress: { icon: "SiCypress", color: "text-emerald-400" },
  webpack: { icon: "SiWebpack", color: "text-blue-500" },
  vite: { icon: "SiVite", color: "text-yellow-500" },
  rollup: { icon: "SiRollupdotjs", color: "text-red-600" },
  npm: { icon: "SiNpm", color: "text-red-600" },
  yarn: { icon: "SiYarn", color: "text-blue-600" },
  pnpm: { icon: "SiPnpm", color: "text-green-600" },
  githubactions: { icon: "SiGithubactions", color: "text-blue-500" },
  gitlab: { icon: "SiGitlab", color: "text-orange-500" },
  circleci: { icon: "SiCircleci", color: "text-gray-700 dark:text-gray-300" }
}

function resolveIcon(name: string): { IconComponent: React.ElementType | null; color: string } {
  const normalized = name.toLowerCase().replace(/[^a-z0-9]/g, "")
  const direct = nameToIconAndColor[normalized]
  if (direct) return { IconComponent: iconMap[direct.icon], color: direct.color }

  // Fallbacks for partial matches
  if (normalized.includes("html")) return { IconComponent: iconMap.SiHtml5, color: "text-orange-500" }
  if (normalized.includes("css")) return { IconComponent: iconMap.SiCss3, color: "text-blue-500" }
  if (normalized.includes("sass")) return { IconComponent: iconMap.SiSass, color: "text-pink-500" }
  if (normalized.includes("less")) return { IconComponent: iconMap.SiLess, color: "text-blue-500" }
  if (normalized.includes("angular")) return { IconComponent: iconMap.SiAngular, color: "text-red-500" }
  if (normalized.includes("vue")) return { IconComponent: iconMap.SiVuedotjs, color: "text-green-500" }
  if (normalized.includes("svelte")) return { IconComponent: iconMap.SiSvelte, color: "text-orange-500" }
  if (normalized.includes("react")) return { IconComponent: iconMap.SiReact, color: "text-cyan-400" }
  if (normalized.includes("next")) return { IconComponent: iconMap.SiNextdotjs, color: "text-black dark:text-white" }
  if (normalized.includes("typescript") || normalized === "ts") return { IconComponent: iconMap.SiTypescript, color: "text-blue-500" }
  if (normalized.includes("javascript") || normalized === "js" ) return { IconComponent: iconMap.SiJavascript, color: "text-yellow-400" }
  if (normalized.includes("tailwind")) return { IconComponent: iconMap.SiTailwindcss, color: "text-cyan-500" }
  if (normalized.includes("bootstrap")) return { IconComponent: iconMap.SiBootstrap, color: "text-purple-500" }
  if (normalized.includes("node")) return { IconComponent: iconMap.FaNodeJs, color: "text-green-500" }
  if (normalized.includes("express")) return { IconComponent: iconMap.SiExpress, color: "text-gray-600 dark:text-gray-300" }
  if (normalized.includes("deno")) return { IconComponent: iconMap.SiDeno, color: "text-black dark:text-white" }
  if (normalized.includes("fastapi")) return { IconComponent: iconMap.SiFastapi, color: "text-emerald-500" }
  if (normalized.includes("nestjs")) return { IconComponent: iconMap.SiNestjs, color: "text-red-500" }
  if (normalized.includes("remix")) return { IconComponent: iconMap.SiRemix, color: "text-black dark:text-white" }
  if (normalized.includes("astro")) return { IconComponent: iconMap.SiAstro, color: "text-orange-400" }
  if (normalized.includes("nuxt")) return { IconComponent: iconMap.SiNuxtdotjs, color: "text-emerald-500" }
  if (normalized.includes("graphql")) return { IconComponent: iconMap.SiGraphql, color: "text-pink-500" }
  if (normalized.includes("prisma")) return { IconComponent: iconMap.SiPrisma, color: "text-emerald-500" }
  if (normalized.includes("postgres")) return { IconComponent: iconMap.SiPostgresql, color: "text-blue-600" }
  if (normalized === "sql") return { IconComponent: iconMap.Database, color: "text-blue-500" }
  if (normalized.includes("mysql")) return { IconComponent: iconMap.SiMysql, color: "text-blue-600" }
  if (normalized.includes("mariadb")) return { IconComponent: iconMap.SiMariadb, color: "text-blue-600" }
  if (normalized.includes("sqlite")) return { IconComponent: iconMap.SiSqlite, color: "text-blue-600" }
  if (normalized.includes("mongodb")) return { IconComponent: iconMap.SiMongodb, color: "text-green-600" }
  if (normalized.includes("redis")) return { IconComponent: iconMap.SiRedis, color: "text-red-600" }
  if (normalized.includes("flutter")) return { IconComponent: iconMap.SiFlutter, color: "text-blue-500" }
  if (normalized.includes("dart")) return { IconComponent: iconMap.SiDart, color: "text-blue-400" }
  if (normalized === "c") return { IconComponent: iconMap.SiC, color: "text-blue-600" }
  if (normalized.includes("cpp") || normalized.includes("cplusplus")) return { IconComponent: iconMap.SiCplusplus, color: "text-blue-600" }
  if (normalized.includes("java")) return { IconComponent: iconMap.FaJava, color: "text-red-500" }
  if (normalized.includes("php")) return { IconComponent: iconMap.FaPhp, color: "text-indigo-600" }
  if (normalized.includes("go")) return { IconComponent: iconMap.SiGo, color: "text-cyan-500" }
  if (normalized.includes("kotlin")) return { IconComponent: iconMap.SiKotlin, color: "text-purple-500" }
  if (normalized.includes("scala")) return { IconComponent: iconMap.SiScala, color: "text-red-600" }
  if (normalized === "r") return { IconComponent: iconMap.SiR, color: "text-sky-600" }
  if (normalized.includes("matlab")) return { IconComponent: iconMap.SiWolframmathematica, color: "text-orange-500" }
  if (normalized.includes("python")) return { IconComponent: iconMap.FaPython, color: "text-yellow-500" }
  if (normalized.includes("firebase")) return { IconComponent: iconMap.SiFirebase, color: "text-orange-500" }
  if (normalized.includes("aws")) return { IconComponent: iconMap.FaAws, color: "text-orange-400" }
  if (normalized.includes("docker")) return { IconComponent: iconMap.FaDocker, color: "text-blue-500" }
  if (normalized.includes("git")) return { IconComponent: iconMap.FaGitAlt, color: "text-orange-500" }
  if (normalized.includes("kubernetes")) return { IconComponent: iconMap.SiKubernetes, color: "text-blue-500" }
  if (normalized.includes("terraform")) return { IconComponent: iconMap.SiTerraform, color: "text-purple-600" }
  if (normalized.includes("ansible")) return { IconComponent: iconMap.SiAnsible, color: "text-red-600" }
  if (normalized.includes("nginx")) return { IconComponent: iconMap.SiNginx, color: "text-green-600" }
  if (normalized.includes("apache")) return { IconComponent: iconMap.SiApache, color: "text-red-600" }
  if (normalized.includes("heroku")) return { IconComponent: iconMap.SiHeroku, color: "text-purple-600" }
  if (normalized.includes("netlify")) return { IconComponent: iconMap.SiNetlify, color: "text-emerald-500" }
  if (normalized.includes("cloudflare")) return { IconComponent: iconMap.SiCloudflare, color: "text-orange-500" }
  if (normalized.includes("gcp") || normalized.includes("googlecloud")) return { IconComponent: iconMap.SiGooglecloud, color: "text-blue-500" }
  if (normalized.includes("jest")) return { IconComponent: iconMap.SiJest, color: "text-red-600" }
  if (normalized.includes("mocha")) return { IconComponent: iconMap.SiMocha, color: "text-yellow-700" }
  if (normalized.includes("pytest")) return { IconComponent: iconMap.SiPytest, color: "text-emerald-600" }
  if (normalized.includes("cypress")) return { IconComponent: iconMap.SiCypress, color: "text-emerald-400" }
  if (normalized.includes("playwright")) return { IconComponent: iconMap.SiCypress, color: "text-green-500" }
  if (normalized.includes("webpack")) return { IconComponent: iconMap.SiWebpack, color: "text-blue-500" }
  if (normalized.includes("vite")) return { IconComponent: iconMap.SiVite, color: "text-yellow-500" }
  if (normalized.includes("rollup")) return { IconComponent: iconMap.SiRollupdotjs, color: "text-red-600" }
  if (normalized.includes("npm")) return { IconComponent: iconMap.SiNpm, color: "text-red-600" }
  if (normalized.includes("yarn")) return { IconComponent: iconMap.SiYarn, color: "text-blue-600" }
  if (normalized.includes("pnpm")) return { IconComponent: iconMap.SiPnpm, color: "text-green-600" }
  if (normalized.includes("githubactions")) return { IconComponent: iconMap.SiGithubactions, color: "text-blue-500" }
  if (normalized.includes("gitlab")) return { IconComponent: iconMap.SiGitlab, color: "text-orange-500" }
  if (normalized.includes("circleci")) return { IconComponent: iconMap.SiCircleci, color: "text-gray-700 dark:text-gray-300" }
  
  return { IconComponent: null, color: "text-gray-600" }
}

function TechBadge({ 
  name, 
  icon, 
  color = "text-gray-600", 
  variant = "outline",
  size = "sm",
  className,
  isRTL = false
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
      <MixedContent text={name} isRTL={isRTL} />
    </Badge>
  )
}

export { TechBadge }
