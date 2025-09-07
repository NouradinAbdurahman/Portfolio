import * as React from "react"
import { motion } from "framer-motion"
import { 
  FaReact, FaPython, FaAws, FaDocker, FaGitAlt, FaNodeJs 
} from "react-icons/fa"
import {
  SiTypescript, SiNextdotjs, SiFlutter, SiDart, SiFirebase, 
  SiPostgresql, SiReact, SiTailwindcss, SiJavascript, SiExpress
} from "react-icons/si"
import { Database } from "lucide-react"
import { cn } from "@/lib/utils"
import { techStack } from "@/lib/data"

interface TechStackLoopProps {
  className?: string
  speed?: number
  direction?: "left" | "right"
  logoHeight?: number
  gap?: number
  pauseOnHover?: boolean
}

const iconMap = {
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
  SiPostgresql
}

function TechStackLoop({ 
  className,
  speed = 120,
  direction = "left",
  logoHeight = 48,
  gap = 40,
  pauseOnHover = true
}: TechStackLoopProps) {
  return (
    <div 
      className={cn("relative overflow-hidden", className)}
      style={{ height: '80px' }}
    >
      <motion.div
        className="flex items-center"
        style={{ 
          width: 'max-content',
          gap: `${gap}px`
        }}
        animate={{
          x: direction === "left" ? [0, -1000] : [0, 1000]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        onHoverStart={pauseOnHover ? () => {} : undefined}
        onHoverEnd={pauseOnHover ? () => {} : undefined}
      >
        {/* Render multiple sets of logos for seamless looping */}
        {[...techStack, ...techStack, ...techStack].map((tech, index) => {
          const IconComponent = iconMap[tech.node as keyof typeof iconMap]
          
          return (
            <motion.a
              key={`${tech.title}-${index}`}
              href={tech.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center hover:scale-110 transition-transform duration-300"
              style={{ height: logoHeight, width: logoHeight }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {IconComponent && (
                <IconComponent 
                  className={cn("transition-colors duration-300", tech.color)}
                  style={{ height: logoHeight, width: logoHeight }}
                />
              )}
            </motion.a>
          )
        })}
      </motion.div>
    </div>
  )
}

export { TechStackLoop }
