"use client"

import { useSettings } from "@/contexts/settings-context"
import { useEffect } from "react"
import { useTheme } from "next-themes"

export function DynamicTheme() {
  const { settings } = useSettings()
  const { theme } = useTheme()

  useEffect(() => {
    if (!settings) return

    // Apply font family
    if (settings.font_family) {
      document.documentElement.style.setProperty('--font-family', settings.font_family)
      document.body.style.fontFamily = settings.font_family
    }

    // Apply logo font if provided (used by Navbar brand text)
    const logoFamily = (settings as unknown as { logo_font_family?: string }).logo_font_family
    if (logoFamily) {
      document.documentElement.style.setProperty('--logo-font-family', logoFamily)
      // Ensure the chosen logo font is actually loaded on the public site
      const id = 'gf-logo-font'
      const existing = document.getElementById(id) as HTMLLinkElement | null
      const familyParam = encodeURIComponent(logoFamily)
      const href = `https://fonts.googleapis.com/css2?family=${familyParam}:wght@300;400;600;700&display=swap`
      if (!existing) {
        const link = document.createElement('link')
        link.id = id
        link.rel = 'stylesheet'
        link.href = href
        document.head.appendChild(link)
      } else if (existing.href !== href) {
        existing.href = href
      }
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
    const sectionBgs = (settings as unknown as { section_backgrounds?: Record<string, string> }).section_backgrounds
    if (sectionBgs) {
      Object.entries(sectionBgs).forEach(([key, color]) => {
        // In dark mode, enforce admin-configured section backgrounds.
        // In light mode, clear them so components fall back to light backgrounds.
        if (theme === 'dark') {
          document.documentElement.style.setProperty(`--section-${key}-bg`, color)
        } else {
          document.documentElement.style.removeProperty(`--section-${key}-bg`)
        }
      })
    }

    // Apply font size variables when provided
    const fsTitle = (settings as unknown as { fs_section_title?: string }).fs_section_title
    const fsDesc = (settings as unknown as { fs_section_description?: string }).fs_section_description
    const fsBody = (settings as unknown as { fs_body?: string }).fs_body
    if (fsTitle) document.documentElement.style.setProperty('--fs-section-title', fsTitle)
    if (fsDesc) document.documentElement.style.setProperty('--fs-section-description', fsDesc)
    if (fsBody) document.documentElement.style.setProperty('--fs-body', fsBody)

    const fsHeroSm = (settings as unknown as { fs_hero_title_sm?: string }).fs_hero_title_sm
    const fsHeroMd = (settings as unknown as { fs_hero_title_md?: string }).fs_hero_title_md
    const fsHeroLg = (settings as unknown as { fs_hero_title_lg?: string }).fs_hero_title_lg
    if (fsHeroSm) document.documentElement.style.setProperty('--fs-hero-title-sm', fsHeroSm)
    if (fsHeroMd) document.documentElement.style.setProperty('--fs-hero-title-md', fsHeroMd)
    if (fsHeroLg) document.documentElement.style.setProperty('--fs-hero-title-lg', fsHeroLg)
  }, [settings, theme])

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
