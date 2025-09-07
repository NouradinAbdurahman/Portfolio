import * as React from "react"
import { cn } from "@/lib/utils"

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl" | "full"
  children: React.ReactNode
}

const sizeVariants = {
  sm: "max-w-3xl",
  md: "max-w-5xl", 
  lg: "max-w-7xl",
  xl: "max-w-[90rem]",
  full: "max-w-none"
}

function Container({ 
  size = "lg", 
  className, 
  children, 
  ...props 
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto px-4 sm:px-6 lg:px-8",
        sizeVariants[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export { Container }
