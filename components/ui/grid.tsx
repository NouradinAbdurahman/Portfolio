import * as React from "react"
import { cn } from "@/lib/utils"

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 5 | 6
  gap?: "sm" | "md" | "lg" | "xl"
  children: React.ReactNode
}

const colsVariants = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  5: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
  6: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
}

const gapVariants = {
  sm: "gap-4",
  md: "gap-6",
  lg: "gap-8",
  xl: "gap-12"
}

function Grid({ 
  cols = 3, 
  gap = "md", 
  className, 
  children, 
  ...props 
}: GridProps) {
  return (
    <div
      className={cn(
        "grid",
        colsVariants[cols],
        gapVariants[gap],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export { Grid }
