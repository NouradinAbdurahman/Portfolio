"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { getSupabaseBrowserClient } from "@/lib/supabaseClient"
import { FontFamilySelect } from "@/components/admin/font-family-select"
import { AdminButton } from "@/components/ui/admin-button"
import { useToast } from "@/hooks/use-toast"

interface SiteSettings {
  font_family: string
  logo_font_family?: string
  primary_color: string
  background_color: string
  section_order: string[]
  section_backgrounds?: Record<string, string>
  loading_always?: boolean
  loading_smart?: boolean
  show_theme_toggle?: boolean
  // New: font size controls
  fs_section_title?: string
  fs_section_description?: string
  fs_body?: string
  // Responsive hero title sizes
  fs_hero_title_sm?: string
  fs_hero_title_md?: string
  fs_hero_title_lg?: string
  // Mobile menu icon style
  mobile_menu_icon?: 'image' | 'hamburger'
}

const FONT_OPTIONS = [
  { value: "Inter", label: "Inter" },
  { value: "Roboto", label: "Roboto" },
  { value: "Poppins", label: "Poppins" },
  { value: "Geist", label: "Geist" },
  { value: "Montserrat", label: "Montserrat" },
  { value: "Open Sans", label: "Open Sans" },
  { value: "Lato", label: "Lato" },
  { value: "Source Sans 3", label: "Source Sans 3" },
  { value: "Nunito", label: "Nunito" },
  { value: "Fira Sans", label: "Fira Sans" },
  { value: "Rubik", label: "Rubik" },
  { value: "Merriweather", label: "Merriweather" },
  { value: "Work Sans", label: "Work Sans" },
  { value: "DM Sans", label: "DM Sans" },
  { value: "Manrope", label: "Manrope" },
]

function previewFamily(name: string) {
  // Map special cases to loaded font family names
  if (name === "Geist") return 'var(--font-geist-sans), system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif'
  if (name === "Open Sans") return `'Open Sans', system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif`
  if (name === "Source Sans 3") return `'Source Sans 3', system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif`
  if (name === "DM Sans") return `'DM Sans', system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif`
  return `'${name}', system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif`
}

const SECTION_OPTIONS = [
  { id: "hero", label: "Hero Section" },
  { id: "about", label: "About Section" },
  { id: "services", label: "Services Section" },
  { id: "skills", label: "Skills Section" },
  { id: "projects", label: "Projects Section" },
  { id: "contact", label: "Contact Section" },
  { id: "resume", label: "Resume Section" }
]

// Move DEFAULTS out of component to keep it stable across renders
const DEFAULTS: SiteSettings = {
    font_family: "Inter",
    logo_font_family: "Lobster",
    primary_color: "#8b5cf6", // matches app default --primary
    background_color: "#060010", // matches app default --background
    section_order: ["hero", "about", "services", "skills", "projects", "contact", "resume"],
    section_backgrounds: {
      hero: "#060010",
      about: "#060010",
      services: "#060010",
      skills: "#060010",
      projects: "#060010",
      contact: "#060010",
      resume: "#060010",
      footer: "#060010"
    },
    loading_always: false,
    loading_smart: true,
    show_theme_toggle: true,
    fs_section_title: "clamp(1.75rem, 1.2rem + 2vw, 2.5rem)",
    fs_section_description: "1.125rem",
    fs_body: "1rem",
    fs_hero_title_sm: "2.25rem", // Tailwind 4xl ~ 2.25rem
    fs_hero_title_md: "3rem",    // Tailwind 5xl ~ 3rem
    fs_hero_title_lg: "3.75rem",  // Tailwind 6xl ~ 3.75rem
    mobile_menu_icon: 'image'
}

export default function AdminSettingsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [authorized, setAuthorized] = useState(false)
  const [saving, setSaving] = useState(false)
  const [settings, setSettings] = useState<SiteSettings>({
    ...DEFAULTS
  })
  const [history, setHistory] = useState<SiteSettings[]>([])

  const fetchSettings = useCallback(async () => {
    try {
      const supabase = getSupabaseBrowserClient()
      const { data, error } = await supabase
        .from('site_settings')
        .select('setting_key, setting_value')
        .order('setting_key')

      if (error) throw error

      const newSettings: SiteSettings = { ...DEFAULTS }

      data?.forEach((item: { setting_key: string, setting_value: unknown }) => {
        const key = item.setting_key as keyof SiteSettings
        if (key in newSettings) {
          ;(newSettings as unknown as Record<string, unknown>)[key as string] = item.setting_value
        }
      })

      setSettings(newSettings)
      setHistory([newSettings])
    } catch (error) {
      console.error('Error fetching settings:', error)
      toast({
        title: "Error",
        description: "Failed to load settings",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }, [toast])

  useEffect(() => {
    const supabase = getSupabaseBrowserClient()
    supabase.auth.getUser().then(({ data }) => {
      const email = data.user?.email || null
      const ok = !!email && email === "n.aden1208@gmail.com"
      setAuthorized(ok)
      if (ok) {
        fetchSettings()
      } else {
        setLoading(false)
      }
    })
  }, [fetchSettings])

  

  async function saveSettings() {
    setSaving(true)
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings })
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error || 'Failed to save settings')
      }

      toast({
        title: "Success",
        description: "Settings saved successfully!",
        variant: "success"
      })
      setHistory((prev) => [...prev, settings])
    } catch (error) {
      console.error('Error saving settings:', error)
      toast({
        title: "Error",
        description: "Failed to save settings",
        variant: "destructive"
      })
    } finally {
      setSaving(false)
    }
  }
  function applyPreset(color: string, type: 'primary' | 'background') {
    if (type === 'primary') setSettings({ ...settings, primary_color: color })
    else setSettings({ ...settings, background_color: color })
  }

  function undoLast() {
    if (history.length < 2) return
    const prev = history[history.length - 2]
    setSettings(prev)
    setHistory((h) => h.slice(0, -1))
  }

  // Default resets
  function resetFont() {
    setSettings({ ...settings, font_family: DEFAULTS.font_family })
  }
  function resetPrimary() {
    setSettings({ ...settings, primary_color: DEFAULTS.primary_color })
  }
  function resetBackground() {
    setSettings({ ...settings, background_color: DEFAULTS.background_color })
  }
  function resetOrder() {
    setSettings({ ...settings, section_order: [...DEFAULTS.section_order] })
  }
  function resetAll() {
    setSettings({ ...DEFAULTS })
  }

  function moveSectionUp(index: number) {
    if (index > 0) {
      const newOrder = [...settings.section_order]
      const temp = newOrder[index]
      newOrder[index] = newOrder[index - 1]
      newOrder[index - 1] = temp
      setSettings({ ...settings, section_order: newOrder })
    }
  }

  function moveSectionDown(index: number) {
    if (index < settings.section_order.length - 1) {
      const newOrder = [...settings.section_order]
      const temp = newOrder[index]
      newOrder[index] = newOrder[index + 1]
      newOrder[index + 1] = temp
      setSettings({ ...settings, section_order: newOrder })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center site-background">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-800 dark:border-white"></div>
      </div>
    )
  }

  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center site-background px-4">
        <div className="max-w-md w-full">
          <div className="backdrop-blur-xl bg-white/80 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl p-8 text-center">
            <h1 className="text-2xl font-bold dark:text-white text-gray-900 mb-4">Access Denied</h1>
            <p className="text-gray-700 dark:text-gray-300 mb-6">You do not have permission to access this page.</p>
            <button
              onClick={() => router.push('/admin/login')}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen site-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="backdrop-blur-xl bg-white/80 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl p-8">
          <div className="flex items-center justify-between mb-8 gap-2 flex-col sm:flex-row">
            <div>
              <h1 className="text-3xl font-bold dark:text-white text-gray-900">Site Settings</h1>
              <p className="mt-2 text-gray-700 dark:text-gray-300">Manage your portfolio appearance and layout</p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <AdminButton onClick={resetAll}>Reset All to Default</AdminButton>
              <AdminButton onClick={undoLast}>Undo</AdminButton>
              <AdminButton onClick={() => router.push('/admin/dashboard')} className="flex-1 sm:flex-none">Back to Dashboard</AdminButton>
            </div>
          </div>

          <div className="space-y-8">
            {/* Typography Scale */}
            <div>
              <h3 className="text-lg font-semibold dark:text-white text-gray-900 mb-2">Typography</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Control global font sizes for section titles, descriptions, and body text. Changes apply instantly.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-white/80 dark:bg-gray-900/70 border border-gray-200 dark:border-gray-700 rounded-xl">
                <div>
                  <label className="block text-sm font-medium dark:text-gray-300 text-gray-800 mb-1">Section Title Size</label>
                  <input
                    type="text"
                    placeholder="e.g. clamp(1.75rem, 1.2rem + 2vw, 2.5rem)"
                    value={settings.fs_section_title || ''}
                    onChange={(e)=> setSettings({ ...settings, fs_section_title: e.target.value })}
                    className="w-full px-3 py-2 bg-white dark:bg-gray-900/70 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white"
                  />
                  <div className="mt-2 flex items-center gap-3 text-xs text-gray-600 dark:text-gray-400">
                    <AdminButton className="h-7 px-2 text-xs" onClick={()=> setSettings({ ...settings, fs_section_title: DEFAULTS.fs_section_title! })}>Default</AdminButton>
                    <span>Default: {DEFAULTS.fs_section_title}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium dark:text-gray-300 text-gray-800 mb-1">Section Description Size</label>
                  <input
                    type="text"
                    placeholder="e.g. 1.125rem"
                    value={settings.fs_section_description || ''}
                    onChange={(e)=> setSettings({ ...settings, fs_section_description: e.target.value })}
                    className="w-full px-3 py-2 bg-white dark:bg-gray-900/70 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white"
                  />
                  <div className="mt-2 flex items-center gap-3 text-xs text-gray-600 dark:text-gray-400">
                    <AdminButton className="h-7 px-2 text-xs" onClick={()=> setSettings({ ...settings, fs_section_description: DEFAULTS.fs_section_description! })}>Default</AdminButton>
                    <span>Default: {DEFAULTS.fs_section_description}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium dark:text-gray-300 text-gray-800 mb-1">Body Text Size</label>
                  <input
                    type="text"
                    placeholder="e.g. 1rem"
                    value={settings.fs_body || ''}
                    onChange={(e)=> setSettings({ ...settings, fs_body: e.target.value })}
                    className="w-full px-3 py-2 bg-white dark:bg-gray-900/70 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white"
                  />
                  <div className="mt-2 flex items-center gap-3 text-xs text-gray-600 dark:text-gray-400">
                    <AdminButton className="h-7 px-2 text-xs" onClick={()=> setSettings({ ...settings, fs_body: DEFAULTS.fs_body! })}>Default</AdminButton>
                    <span>Default: {DEFAULTS.fs_body}</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Hero Title Sizes */}
            <div>
              <h3 className="text-lg font-semibold dark:text-white text-gray-900 mb-2">Hero Title ("Software Engineer • …")</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Set font sizes per breakpoint. Small applies to mobile, Medium to tablets (≥768px), Large to desktops (≥1024px).</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-white/80 dark:bg-gray-900/70 border border-gray-200 dark:border-gray-700 rounded-xl">
                <div>
                  <label className="block text-sm font-medium dark:text-gray-300 text-gray-800 mb-1">Small (mobile)</label>
                  <input
                    type="text"
                    placeholder="e.g. 2.25rem"
                    value={settings.fs_hero_title_sm || ''}
                    onChange={(e)=> setSettings({ ...settings, fs_hero_title_sm: e.target.value })}
                    className="w-full px-3 py-2 bg-white dark:bg-gray-900/70 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white"
                  />
                  <div className="mt-2 flex items-center gap-3 text-xs text-gray-600 dark:text-gray-400">
                    <AdminButton className="h-7 px-2 text-xs" onClick={()=> setSettings({ ...settings, fs_hero_title_sm: DEFAULTS.fs_hero_title_sm! })}>Default</AdminButton>
                    <span>Default: {DEFAULTS.fs_hero_title_sm}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium dark:text-gray-300 text-gray-800 mb-1">Medium (≥768px)</label>
                  <input
                    type="text"
                    placeholder="e.g. 3rem"
                    value={settings.fs_hero_title_md || ''}
                    onChange={(e)=> setSettings({ ...settings, fs_hero_title_md: e.target.value })}
                    className="w-full px-3 py-2 bg-white dark:bg-gray-900/70 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white"
                  />
                  <div className="mt-2 flex items-center gap-3 text-xs text-gray-600 dark:text-gray-400">
                    <AdminButton className="h-7 px-2 text-xs" onClick={()=> setSettings({ ...settings, fs_hero_title_md: DEFAULTS.fs_hero_title_md! })}>Default</AdminButton>
                    <span>Default: {DEFAULTS.fs_hero_title_md}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium dark:text-gray-300 text-gray-800 mb-1">Large (≥1024px)</label>
                  <input
                    type="text"
                    placeholder="e.g. 3.75rem"
                    value={settings.fs_hero_title_lg || ''}
                    onChange={(e)=> setSettings({ ...settings, fs_hero_title_lg: e.target.value })}
                    className="w-full px-3 py-2 bg-white dark:bg-gray-900/70 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white"
                  />
                  <div className="mt-2 flex items-center gap-3 text-xs text-gray-600 dark:text-gray-400">
                    <AdminButton className="h-7 px-2 text-xs" onClick={()=> setSettings({ ...settings, fs_hero_title_lg: DEFAULTS.fs_hero_title_lg! })}>Default</AdminButton>
                    <span>Default: {DEFAULTS.fs_hero_title_lg}</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Theme Toggle Visibility */}
            <div>
              <h3 className="text-lg font-semibold dark:text-white text-gray-900 mb-2">Theme Toggle</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Control visibility of the dark/light mode toggle in the navbar.</p>
              <div className="p-4 bg-gray-50 dark:bg-gray-900/70 border border-gray-200 dark:border-gray-700 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-sm font-medium dark:text-gray-300 text-gray-800">Show theme toggle</label>
                    <p className="text-xs text-gray-600 dark:text-gray-400">If disabled, the sun/moon button in the navbar is hidden.</p>
                  </div>
                  <AdminButton className={`px-3 py-1 ${(settings.show_theme_toggle !== false)? 'border-emerald-400/30' : 'border-gray-300'} bg-white/70 dark:bg-white/10`} onClick={() => setSettings({ ...settings, show_theme_toggle: !(settings.show_theme_toggle !== false) })}>
                    {(settings.show_theme_toggle !== false)? 'Visible' : 'Hidden'}
                  </AdminButton>
                </div>
              </div>
            </div>
            {/* Mobile Menu Icon */}
            <div>
              <h3 className="text-lg font-semibold dark:text-white text-gray-900 mb-2">Mobile Menu Icon</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Choose whether to use your favicon image or the standard hamburger icon on small screens.</p>
              <div className="p-4 bg-gray-50 dark:bg-gray-900/70 border border-gray-200 dark:border-gray-700 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-sm font-medium dark:text-gray-300 text-gray-800">Icon style</label>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Current: {settings.mobile_menu_icon || 'image'}</p>
                  </div>
                  <div className="flex gap-2">
                    <AdminButton className={`px-3 py-1 ${((settings.mobile_menu_icon||'image')==='image')? 'border-emerald-400/30 bg-emerald-500/20 dark:bg-emerald-600/30 text-emerald-800 dark:text-emerald-100' : 'border-gray-300 bg-white/70 dark:bg-white/10'}`} onClick={() => setSettings({ ...settings, mobile_menu_icon: 'image' })}>
                      Image
                    </AdminButton>
                    <AdminButton className={`px-3 py-1 ${((settings.mobile_menu_icon||'image')==='hamburger')? 'border-emerald-400/30 bg-emerald-500/20 dark:bg-emerald-600/30 text-emerald-800 dark:text-emerald-100' : 'border-gray-300 bg-white/70 dark:bg-white/10'}`} onClick={() => setSettings({ ...settings, mobile_menu_icon: 'hamburger' })}>
                      Hamburger
                    </AdminButton>
                  </div>
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Default: {DEFAULTS.mobile_menu_icon}</div>
              </div>
            </div>
            {/* Loading Controls */}
            <div>
              <h3 className="text-lg font-semibold dark:text-white text-gray-900 mb-2">Loading Behavior</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Control when the full-screen loading animation shows.</p>
              <div className="p-4 bg-gray-50 dark:bg-gray-900/70 border border-gray-200 dark:border-gray-700 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-sm font-medium dark:text-gray-300 text-gray-800">Always show loading animation</label>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Shows on every initial load and navigation.</p>
                  </div>
                  <AdminButton className={`px-3 py-1 ${settings.loading_always? 'border-emerald-400/30 bg-emerald-500/20 dark:bg-emerald-600/30 text-emerald-800 dark:text-emerald-100' : 'border-gray-300 bg-white/70 dark:bg-white/10'}`} onClick={() => setSettings({ ...settings, loading_always: !settings.loading_always, loading_smart: settings.loading_always ? settings.loading_smart : false })}>
                    {settings.loading_always? 'Enabled' : 'Disabled'}
                  </AdminButton>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-sm font-medium dark:text-gray-300 text-gray-800">Smart loading (slow network only)</label>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Only shows when network is slow (based on Network Information API heuristics).</p>
                  </div>
                  <AdminButton className={`px-3 py-1 ${settings.loading_smart? 'border-emerald-400/30 bg-emerald-500/20 dark:bg-emerald-600/30 text-emerald-800 dark:text-emerald-100' : 'border-gray-300 bg-white/70 dark:bg-white/10'}`} onClick={() => setSettings({ ...settings, loading_smart: !settings.loading_smart, loading_always: settings.loading_smart ? settings.loading_always : false })}>
                    {settings.loading_smart? 'Enabled' : 'Disabled'}
                  </AdminButton>
                </div>
                <div className="text-xs text-gray-400">Note: Enabling one will disable the other to avoid conflict.</div>
              </div>
            </div>
            {/* Font Family */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium dark:text-gray-300 text-gray-800">Font Family (Page)</label>
                <AdminButton className="h-7 px-2 text-xs">Default</AdminButton>
              </div>
              <FontFamilySelect label="" value={settings.font_family} onChange={(val) => setSettings({ ...settings, font_family: val })} />

              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium dark:text-gray-300 text-gray-800">Font Family (Logo)</label>
                  <AdminButton className="h-7 px-2 text-xs">Default</AdminButton>
                </div>
                <FontFamilySelect label="" value={settings.logo_font_family || DEFAULTS.logo_font_family!} onChange={(val) => setSettings({ ...settings, logo_font_family: val })} />
              </div>
            </div>

            {/* Colors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium dark:text-gray-300 text-gray-800">
                    Primary Color
                  </label>
                  <AdminButton className="h-7 px-2 text-xs">Default</AdminButton>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={settings.primary_color}
                    onChange={(e) => setSettings({ ...settings, primary_color: e.target.value })}
                    className="w-12 h-10 rounded-lg border border-gray-300 dark:border-gray-700 cursor-pointer shadow"
                  />
                  <input
                    type="text"
                    value={settings.primary_color}
                    onChange={(e) => setSettings({ ...settings, primary_color: e.target.value })}
                    className="flex-1 px-3 py-2 bg-white dark:bg-gray-900/70 backdrop-blur border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-inner"
                    placeholder="#3b82f6"
                  />
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {['#8b5cf6','#22c55e','#ef4444','#06b6d4','#f59e0b','#14b8a6','#f472b6','#a3e635'].map(c => (
                    <button key={c} onClick={() => applyPreset(c,'primary')} style={{ background: c }} className="h-8 w-8 rounded-lg border border-white/20"/>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium dark:text-gray-300 text-gray-800">
                    Background Color
                  </label>
                  <AdminButton className="h-7 px-2 text-xs">Default</AdminButton>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={settings.background_color}
                    onChange={(e) => setSettings({ ...settings, background_color: e.target.value })}
                    className="w-12 h-10 rounded-lg border border-gray-300 dark:border-gray-700 cursor-pointer shadow"
                  />
                  <input
                    type="text"
                    value={settings.background_color}
                    onChange={(e) => setSettings({ ...settings, background_color: e.target.value })}
                    className="flex-1 px-3 py-2 bg-white dark:bg-gray-900/70 backdrop-blur border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-inner"
                    placeholder="#0f172a"
                  />
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {['#060010','#0f172a','#020617','#111827','#1f2937','#0b0f1a','#0a0613','#150d27'].map(c => (
                    <button key={c} onClick={() => applyPreset(c,'background')} style={{ background: c }} className="h-8 w-8 rounded-lg border border-white/10"/>
                  ))}
                </div>
              </div>
            </div>

            {/* Section Backgrounds */}
            <div>
              <h3 className="text-lg font-semibold dark:text-white text-gray-900 mb-2">Section Backgrounds</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[...settings.section_order, ...(settings.section_order.includes('footer') ? [] as string[] : ['footer'])].map((id) => (
                  <div key={id} className="p-4 bg-gray-50 dark:bg-gray-900/70 border border-gray-200 dark:border-gray-700 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm dark:text-gray-300 text-gray-800 capitalize">{id} Section</span>
                      <AdminButton className="h-7 px-2 text-xs" onClick={() => setSettings({ ...settings, section_backgrounds: { ...(settings.section_backgrounds || {}), [id]: DEFAULTS.section_backgrounds?.[id] || '#060010' } })}>Default</AdminButton>
                    </div>
                    <div className="flex items-center space-x-3">
                      <input
                        type="color"
                        value={(settings.section_backgrounds?.[id]) || '#060010'}
                        onChange={(e) => setSettings({ ...settings, section_backgrounds: { ...(settings.section_backgrounds || {}), [id]: e.target.value } })}
                        className="w-12 h-10 rounded-lg border border-gray-300 dark:border-gray-700 cursor-pointer shadow"
                      />
                      <input
                        type="text"
                        value={(settings.section_backgrounds?.[id]) || '#060010'}
                        onChange={(e) => setSettings({ ...settings, section_backgrounds: { ...(settings.section_backgrounds || {}), [id]: e.target.value } })}
                        className="flex-1 px-3 py-2 bg-white dark:bg-gray-900/70 backdrop-blur border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-inner"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section Order */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-medium dark:text-gray-300 text-gray-800">
                  Section Order (Drag to reorder)
                </label>
                <AdminButton className="h-7 px-2 text-xs">Default</AdminButton>
              </div>
              <div className="space-y-2">
                {settings.section_order.map((sectionId, index) => {
                  const section = SECTION_OPTIONS.find(s => s.id === sectionId)
                  return (
                    <div
                      key={sectionId}
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData('text/plain', String(index))
                      }}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        const from = Number(e.dataTransfer.getData('text/plain'))
                        const to = index
                        if (Number.isNaN(from)) return
                        const order = [...settings.section_order]
                        const [moved] = order.splice(from,1)
                        order.splice(to,0,moved)
                        setSettings({ ...settings, section_order: order })
                      }}
                      className="flex items-center justify-between p-3 rounded-xl border cursor-grab active:cursor-grabbing bg-white dark:bg-gray-900/70 border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center text-xs text-gray-900 dark:text-white">
                          {index + 1}
                        </div>
                        <span className="dark:text-white text-gray-900">{section?.label || sectionId}</span>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => moveSectionUp(index)}
                          disabled={index === 0}
                          className="p-1 text-gray-300 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          ↑
                        </button>
                        <button
                          onClick={() => moveSectionDown(index)}
                          disabled={index === settings.section_order.length - 1}
                          className="p-1 text-gray-300 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          ↓
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-6 border-t border-gray-600">
              <AdminButton onClick={saveSettings} disabled={saving} className="w-full py-3 px-6 disabled:opacity-50">
                {saving ? "Saving..." : "Save Settings"}
              </AdminButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
