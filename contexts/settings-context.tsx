"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

interface SiteSettings {
  font_family: string
  logo_font_family?: string
  primary_color: string
  background_color: string
  section_order: string[]
  section_backgrounds?: Record<string, string>
  // Loading controls
  loading_always?: boolean
  loading_smart?: boolean
  // UI controls
  show_theme_toggle?: boolean
  // Mobile menu icon style
  mobile_menu_icon?: 'image' | 'hamburger'
  // Featured projects slugs (exactly 4 used on homepage)
  featured_projects?: string[]
  // Optional title overrides keyed by slug/id
  featured_titles?: Record<string, string>
}

interface SettingsContextType {
  settings: SiteSettings | null
  loading: boolean
  error: string | null
  refreshSettings: () => Promise<void>
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

const defaultSettings: SiteSettings = {
  font_family: "Inter",
  logo_font_family: "Lobster",
  primary_color: "#3b82f6",
  background_color: "#0f172a",
  section_order: ["hero", "about", "services", "skills", "projects", "contact", "resume"],
  section_backgrounds: {
    hero: "#060010",
    about: "#060010",
    services: "#060010",
    skills: "#060010",
    projects: "#060010",
    contact: "#060010",
    resume: "#060010",
    footer: "#060010",
  },
  loading_always: false,
  loading_smart: true,
  show_theme_toggle: true,
  mobile_menu_icon: 'image',
  featured_projects: ['github-profile-analyzer','intellistudy','ohay','viaggi-qatar-booking'],
  featured_titles: {}
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSettings = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('/api/settings')
      if (!response.ok) {
        throw new Error('Failed to fetch settings')
      }
      
      const data = await response.json()
      
      if (data.settings && Object.keys(data.settings).length > 0) {
        setSettings(data.settings as SiteSettings)
      } else {
        setSettings(defaultSettings)
      }
    } catch (err) {
      console.error('Error fetching settings:', err)
      setError(err instanceof Error ? err.message : 'Unknown error')
      setSettings(defaultSettings)
    } finally {
      setLoading(false)
    }
  }

  const refreshSettings = async () => {
    await fetchSettings()
  }

  useEffect(() => {
    fetchSettings()
  }, [])

  return (
    <SettingsContext.Provider value={{ settings, loading, error, refreshSettings }}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return context
}
