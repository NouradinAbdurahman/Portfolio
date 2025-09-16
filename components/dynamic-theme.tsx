"use client"

import { useSettings } from "@/contexts/settings-context"
import { useEffect } from "react"

export function DynamicTheme() {
  const { settings } = useSettings()

  useEffect(() => {
    if (!settings) return

    // Apply font family
    if (settings.font_family) {
      document.documentElement.style.setProperty('--font-family', settings.font_family)
      document.body.style.fontFamily = settings.font_family
    }

    // Apply logo font if provided (used by Navbar brand text)
    if ((settings as any).logo_font_family) {
      document.documentElement.style.setProperty('--logo-font-family', (settings as any).logo_font_family as string)
    }

    // Apply primary color
    if (settings.primary_color) {
      // Custom variable (kept for compatibility)
      document.documentElement.style.setProperty('--primary-color', settings.primary_color)
      // Core design token used across the app
      document.documentElement.style.setProperty('--primary', settings.primary_color)
      // Update focus ring to match primary
      document.documentElement.style.setProperty('--ring', `${hexToRgba(settings.primary_color, 0.5)}`)
      document.documentElement.style.setProperty('--accent', settings.primary_color)
    }

    // Apply background color
    if (settings.background_color) {
      // Custom variable (kept for compatibility)
      document.documentElement.style.setProperty('--background-color', settings.background_color)
      // Core design token used by Tailwind tokens
      document.documentElement.style.setProperty('--background', settings.background_color)
    }

    // Apply per-section backgrounds as CSS vars
    const sectionBgs = (settings as any).section_backgrounds as Record<string, string> | undefined
    if (sectionBgs) {
      Object.entries(sectionBgs).forEach(([key, color]) => {
        document.documentElement.style.setProperty(`--section-${key}-bg`, color)
      })
    }
  }, [settings])

  return null
}

function hexToRgba(hex: string, alpha: number) {
  const match = hex.replace('#', '')
  const bigint = parseInt(match.length === 3 ? match.split('').map(c => c + c).join('') : match, 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
