import * as React from "react"
import { cn } from "@/lib/utils"

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "lead" | "large" | "small" | "muted"
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div"
  children: React.ReactNode
}

const typographyVariants = {
  h1: "text-4xl md:text-5xl font-bold tracking-tight",
  h2: "text-3xl md:text-4xl font-bold tracking-tight",
  h3: "text-2xl md:text-3xl font-semibold tracking-tight",
  h4: "text-xl md:text-2xl font-semibold tracking-tight",
  h5: "text-lg md:text-xl font-semibold tracking-tight",
  h6: "text-base md:text-lg font-semibold tracking-tight",
  p: "text-base leading-7",
  lead: "text-xl text-muted-foreground",
  large: "text-lg font-semibold",
  small: "text-sm font-medium",
  muted: "text-sm text-muted-foreground"
}

const colorVariants = {
  default: "dark:text-white text-black",
  muted: "text-muted-foreground",
  primary: "text-primary",
  accent: "text-accent"
}

function Typography({ 
  variant = "p", 
  as, 
  className, 
  children, 
  ...props 
}: TypographyProps) {
  type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  const tag: HeadingTag | "p" = variant.startsWith("h") ? (variant as HeadingTag) : "p"
  const Component = (as || tag) as React.ElementType
  
  return (
    <Component
      className={cn(
        typographyVariants[variant],
        // Use default title/body colors unless variant supplies its own
        (variant === "lead" || variant === "muted") ? undefined : colorVariants.default,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}

export { Typography }
