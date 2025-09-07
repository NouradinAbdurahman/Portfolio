import * as React from "react"
import { cn } from "@/lib/utils"

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id?: string
  variant?: "default" | "dark" | "light"
  padding?: "sm" | "md" | "lg" | "xl"
  children: React.ReactNode
}

const sectionVariants = {
  default: "dark:bg-[#060010] bg-gray-50",
  dark: "bg-[#060010]",
  light: "bg-gray-50"
}

const paddingVariants = {
  sm: "py-10",
  md: "py-16",
  lg: "py-20",
  xl: "py-24"
}

function Section({ 
  id, 
  variant = "default", 
  padding = "lg", 
  className, 
  children, 
  ...props 
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        sectionVariants[variant],
        paddingVariants[padding],
        className
      )}
      {...props}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  )
}

export { Section }
