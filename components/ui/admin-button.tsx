"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function AdminButton({ className, variant = "outline", ...props }: React.ComponentProps<typeof Button>) {
  return (
    <Button
      variant={variant as any}
      className={cn(
        "neumorphic-button dark:text-white text-black hover:text-black dark:bg-transparent bg-white/90 cursor-pointer border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/60 transition-all duration-200",
        className
      )}
      {...props}
    />
  )
}

export const adminButtonClass = "neumorphic-button dark:text-white text-black hover:text-black dark:bg-transparent bg-white/90 cursor-pointer border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/60 transition-all duration-200"


