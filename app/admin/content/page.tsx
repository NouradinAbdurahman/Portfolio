"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */

export const dynamic = 'force-dynamic'

import { useEffect, useState, useCallback, useMemo } from "react"
import Image from "next/image"
// router/back handled by admin layout toolbar
import { getSupabaseBrowserClient } from "@/lib/supabaseClient"
import { useToast } from "@/hooks/use-toast"
import { services as defaultServices } from "@/lib/data"
import { skills as defaultSkills } from "@/lib/data"
import { projects as staticProjects } from "@/lib/data"
// button primitives used via AdminButton
import { AdminButton } from "@/components/ui/admin-button"
import { TechBadge } from "@/components/ui/tech-badge"
import { RotateCcw, Undo2, ExternalLink, Globe } from "lucide-react"
import { MultilangSections } from "@/components/admin/multilang-sections"
import { ProjectsManager } from "@/components/admin/projects-manager"

type SectionId = "hero"|"navbar"|"about"|"services"|"projects"|"contact"|"resume"|"footer"

const sections: { id: SectionId; name: string }[] = [
  { id: "hero", name: "Hero" },
  { id: "navbar", name: "Navbar" },
  { id: "about", name: "About" },
  { id: "services", name: "Services" },
  { id: "projects", name: "Projects" },
  { id: "contact", name: "Contact" },
  { id: "resume", name: "Resume" },
  { id: "footer", name: "Footer" },
]

const supportedLocales = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "ar", label: "العربية", flag: "🇸🇦" },
  { code: "tr", label: "Türkçe", flag: "🇹🇷" },
  { code: "it", label: "Italiano", flag: "🇮🇹" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" }
]

export default function ContentAdminPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [authorized, setAuthorized] = useState(false)
  const [active, setActive] = useState<SectionId>("hero")
  const [content, setContent] = useState<Record<string, any>>({})
  const [saving, setSaving] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [hiddenFields, setHiddenFields] = useState<Record<string, boolean>>({})
  const [hiddenTranslations, setHiddenTranslations] = useState<Record<string, Record<string, boolean>>>({})
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [showDebug, setShowDebug] = useState(false)
  const [dragIndex, setDragIndex] = useState<number | null>(null)
  const [changeHistory, setChangeHistory] = useState<Record<string, any>>({})
  const [lastSavedContent, setLastSavedContent] = useState<Record<string, any>>({})
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const [selectedLocale, setSelectedLocale] = useState("en")

  const DEFAULTS: Record<SectionId, any> = useMemo(() => ({
    hero: { title: 'Software Engineer • Full-Stack Developer • Data Engineer', subtitle: 'Building scalable applications, cloud-driven systems, and data-powered solutions.', ctaPrimaryLabel: 'View Portfolio', ctaPrimaryHref: '#portfolio', ctaSecondaryLabel: 'Contact Me', ctaSecondaryHref: '#contact', hidden: false },
    about: { 
      name: 'Nouraddin Abdurahman Aden',
      role: 'Software Engineering Student & Developer',
      short_bio: 'Currently pursuing Software Engineering at OSTİM Teknik University, specializing in scalable applications and data-driven solutions.',
      detailed_bio: `Hi, I'm Nouraddin! Currently pursuing Software Engineering at OSTİM Teknik University, I specialize in building scalable applications and data-driven solutions. My passion lies in creating efficient systems that bridge the gap between complex data and user-friendly interfaces.`,
      expertise_highlights: 'Proficient in React, Next.js, Flutter, and modern web technologies for creating responsive, performant applications.',
      hidden: false
    },
    services: { 
      title: 'Services', 
      subtitle: 'Comprehensive solutions for your digital needs',
      items: defaultServices.map(service => ({
        id: service.id,
        title: service.title,
        description: service.description,
        icon: service.icon,
        hidden: false
      })),
      hidden: false 
    },
    technical_skills: {
      title: 'Technical Skills',
      subtitle: 'Technologies and tools I work with',
      categories: [
        {
          id: 'fullstack',
          name: 'Full-Stack Development',
          description: 'React, Next.js, Flutter, Node.js',
          skills: defaultSkills.filter(s => ["React","Next.js","Flutter","Node.js","Express","React Native"].includes(s.name))
        },
        {
          id: 'data',
          name: 'Data Engineering', 
          description: 'ETL Pipelines, SQL, Python, Analytics',
          skills: defaultSkills.filter(s => ["Python","SQL","PostgreSQL"].includes(s.name))
        },
        {
          id: 'cloud',
          name: 'Cloud & DevOps',
          description: 'AWS, Firebase, Automation, CI/CD', 
          skills: defaultSkills.filter(s => ["AWS","Firebase","Docker","Git"].includes(s.name))
        }
      ],
      hidden: false
    },
    projects: { 
      title: 'Featured Projects', 
      subtitle: 'A showcase of my recent work and technical expertise', 
      hidden: false,
      items: staticProjects.map(p => ({ 
        ...p, 
        slug: p.slug || p.id, 
        technologies: p.tech || p.technologies, 
        liveUrl: p.liveUrl || p.demo, 
        repo: p.repo || p.githubUrl, 
        showDetails: true, 
        showLive: Boolean(p.liveUrl || p.demo), 
        showRepo: Boolean(p.githubUrl || p.repo), 
        showDetailsEditor: true,
        problem_hidden: false,
        solution_hidden: false,
        outcome_hidden: false,
        features_hidden: false,
        architecture_hidden: false,
        challenges_hidden: false,
        learnings_hidden: false,
        impact_hidden: false
      }))
    },
    skills: {
      title: 'Technical Skills',
      lead: 'Technologies and tools I work with',
      hidden: false,
      catFullTitle: 'Full-Stack Development',
      catFullDesc: 'React, Next.js, Flutter, Node.js',
      catDataTitle: 'Data Engineering',
      catDataDesc: 'ETL Pipelines, SQL, Python, Analytics',
      catCloudTitle: 'Cloud & DevOps',
      catCloudDesc: 'AWS, Firebase, Automation, CI/CD',
      itemsFull: defaultSkills.filter(s => ["React","Next.js","Flutter","Node.js","Express","React Native"].includes(s.name)),
      itemsData: defaultSkills.filter(s => ["Python","SQL","PostgreSQL"].includes(s.name)),
      itemsCloud: defaultSkills.filter(s => ["AWS","Firebase","Docker","Git"].includes(s.name))
    },
    contact: { title: 'Get In Touch', lead: "Let's discuss your next project or collaboration opportunity", email: 'n.aden1208@gmail.com', phone: '+90 552 875 97 71', location: 'Ankara, Turkey', github: 'https://github.com/NouradinAbdurahman', linkedin: 'https://linkedin.com/in/nouraddin', instagram: 'https://instagram.com/nouradiin_', twitter: 'https://x.com/Nouradin1208', hidden: false },
    resume: { 
      title: 'Resume', 
      lead: 'My professional journey and technical expertise', 
      hidden: false,
      education: [
        {
          degree: 'Bachelor of Engineering - BE, Software Engineering',
          school: 'OSTİM Teknik Üniversitesi',
          date: 'Sep 2022 - Jun 2026',
          location: 'Ankara Türkiye',
          description: 'Comprehensive study in Python, C, Web Development, Databases, Data Mining, Software Project Management, C++, Java, SQL, JavaScript, and Machine Learning.',
          hidden: false
        },
        {
          degree: 'High School Diploma, Information Technology - Engineering',
          school: 'Omar bin Abdul Aziz Secondary Independent School for Boys',
          date: 'Sep 2018 - Jun 2021',
          location: 'Doha/Qatar',
          description: 'Foundation in CSS, Python, JavaScript, Information Technology, and HTML programming.',
          hidden: false
        }
      ],
      certifications: [
        { title: 'Associate Data Engineer in SQL', issuer: 'DataCamp', date: 'Jan 2025', link: 'https://www.datacamp.com/completed/statement-of-accomplishment/track/c0d2e90cbbdc287e61faaf285e45c5af244597b1', hidden: false },
        { title: 'Data Scientist in Python', issuer: 'DataCamp', date: 'Jun 2024', link: 'https://www.datacamp.com/completed/statement-of-accomplishment/track/5a81b11b3f98bf7664cca160403d04a4bd6d406e', hidden: false },
        { title: 'Data Analyst in SQL', issuer: 'DataCamp', date: 'Jan 2024', link: 'https://www.datacamp.com/completed/statement-of-accomplishment/track/86f17bd095be0cbde70befab0e01e50bd1e3e766', hidden: false },
      ],
      experience: [
        {
          role: 'Full-Stack Developer',
          company: 'DAKAEI AI',
          employmentType: 'Full-time',
          date: 'Apr 2025 - Present',
          location: 'London Area, United Kingdom • Remote',
          summary: 'Developing full-stack applications using React.js, TypeScript, Node.js, Next.js, JavaScript, SQL, HTML, CSS, Firebase, PostgreSQL, and Databases.',
          hidden: false
        }
      ],
      skills: {
        languages: ['JavaScript','TypeScript','Python','Dart','SQL'],
        frameworks: ['React','Next.js','Flutter','Node.js','Express'],
        tools: ['AWS','Firebase','Docker','Git','PostgreSQL']
      }
    },
    navbar: {
      about: 'About Me',
      projects: 'Projects', 
      services: 'Services',
      contact: 'Contact Me',
      resume: 'Resume',
      hidden: false
    },
    footer: {
      github: 'https://github.com/NouradinAbdurahman',
      linkedin: 'https://linkedin.com/in/nouraddin',
      instagram: 'https://instagram.com/nouradiin_',
      twitter: 'https://x.com/Nouradin1208',
      hidden: false
    }
  }), [])

  const setField = useCallback((path: string, value: string | boolean | any[]) => {
    console.log('🔧 SETFIELD CALLED:', { path, value, active, currentContent: content[active] })
    
    // Force immediate state update
    setContent(prev => {
      const currentSection = prev[active] || {}
      const newSection = { ...currentSection, [path]: value }
      const newContent = { ...prev, [active]: newSection }
      
      console.log('🔧 SETFIELD UPDATING CONTENT:', { 
        prev: currentSection, 
        new: newSection, 
        path, 
        value,
        fullContent: newContent
      })
      
      return newContent
    })
    
    // Track changes for undo functionality
    setChangeHistory(prev => ({
      ...prev,
      [`${active}.${path}`]: prev[`${active}.${path}`] || (lastSavedContent[active]?.[path] ?? DEFAULTS[active]?.[path])
    }))
    
    // Force UI refresh
    setRefreshTrigger(prev => prev + 1)
  }, [active, lastSavedContent, DEFAULTS, content])

  const resetToDefault = useCallback(() => {
    if (DEFAULTS[active]) {
      setContent(prev => ({
        ...prev,
        [active]: { ...DEFAULTS[active] }
      }))
      toast({ title: 'Reset to Default', description: `${sections.find(s=>s.id===active)?.name} section reset to default values` })
    }
  }, [active, toast, DEFAULTS])

  const undoLastChange = useCallback(() => {
    const hasChanges = Object.keys(changeHistory).some(key => key.startsWith(`${active}.`))
    
    if (!hasChanges) {
      toast({ title: 'No Changes', description: 'No changes to undo', variant: 'destructive' })
      return
    }

    // Restore from last saved content or defaults
    const restoredContent = { ...lastSavedContent[active] || DEFAULTS[active] || {} }
    
    setContent(prev => ({
      ...prev,
      [active]: restoredContent
    }))
    
    // Clear change history for this section
    setChangeHistory(prev => {
      const newHistory = { ...prev }
      Object.keys(newHistory).forEach(key => {
        if (key.startsWith(`${active}.`)) {
          delete newHistory[key]
        }
      })
      return newHistory
    })
    
    toast({ title: 'Undone', description: `Reverted ${sections.find(s=>s.id===active)?.name} section to last saved state` })
  }, [active, changeHistory, lastSavedContent, toast, DEFAULTS])

  const handleToggleFieldHidden = useCallback((field: string) => {
    setHiddenFields(prev => ({
      ...prev,
      [field]: !prev[field]
    }))
  }, [])

  const handleToggleTranslationHidden = useCallback((field: string, locale: string) => {
    setHiddenTranslations(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        [locale]: !prev[field]?.[locale]
      }
    }))
  }, [])


  const fetchContent = useCallback(async () => {
    setRefreshing(true)
    setLoading(true)
    try {
      const res = await fetch('/api/content', {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      })
      if (!res.ok) {
        const errorText = await res.text()
        throw new Error(`Failed to fetch content: ${res.status} ${errorText}`)
      }
      const data = await res.json()
      setContent(data.content || {})
      setLastUpdated(new Date())
      toast({ title: 'Refreshed', description: 'Content updated from database' })
    } catch (error) {
      console.error('Failed to fetch content:', error)
      toast({ title: 'Error', description: `Failed to load content: ${error instanceof Error ? error.message : 'Unknown error'}`, variant: 'destructive' })
    } finally {
      setRefreshing(false)
      setLoading(false)
    }
  }, [toast])

  useEffect(() => {
    let isMounted = true
    
    const initializeAuth = async () => {
      try {
        const supabase = getSupabaseBrowserClient()
        const { data } = await supabase.auth.getUser()
        
        if (!isMounted) return
        
        const email = data.user?.email || null
        const ok = !!email && email === "n.aden1208@gmail.com"
        setAuthorized(ok)
        
        if (ok) {
          await fetchContent()
        } else {
          setLoading(false)
        }
      } catch (error) {
        console.error('Auth error:', error)
        if (isMounted) {
          setLoading(false)
        }
      }
    }
    
    // Add timeout to prevent infinite loading
    const timeout = setTimeout(() => {
      if (isMounted) {
        setLoading(false)
      }
    }, 10000) // 10 second timeout
    
    initializeAuth()
    
    return () => {
      isMounted = false
      clearTimeout(timeout)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Remove fetchContent dependency to prevent infinite loop

  // Initialize Projects from static data if CMS has none yet and remove any legacy mock items
  useEffect(() => {
    if (active !== 'projects') return
    
    // Use a ref to track if we've already processed this section
    const processedKey = `projects_processed_${active}`
    if (sessionStorage.getItem(processedKey)) return
    
    // Get current content without causing dependency issues
    const currentContent = content
    if (!currentContent || !currentContent['projects']) return
    
    const items = ((currentContent['projects'] as any)?.items || []) as any[]
    
    // Check if we already have the merged data to prevent infinite loop
    const hasMergedData = items.some(item => item.problem !== undefined || item.solution !== undefined)
    if (hasMergedData) {
      sessionStorage.setItem(processedKey, 'true')
      return // Already merged, don't run again
    }
    
    // Auto-remove mock/sample entries
    const cleaned = items.filter((it) => {
      const title = String(it?.title || '').toLowerCase()
      const id = String(it?.id || '').toLowerCase()
      return !(title === 'sample project' || id.startsWith('sample'))
    })
    if (cleaned.length !== items.length) {
      setField('items', cleaned as any)
      sessionStorage.setItem(processedKey, 'true')
      return
    }

    // Only merge if we have items but they don't have detailed fields
    if (items.length > 0 && !hasMergedData) {
      // Always merge static data with CMS data to ensure all detailed content is available
      const merged = staticProjects.map((p) => {
        const existing = items.find((it) => (it.slug || it.id || it.title)?.toLowerCase() === (p.slug || p.id || p.title)?.toLowerCase())
        return {
          id: p.id,
          slug: p.slug || p.id,
          title: p.title,
          description: p.description,
          image: p.image,
          cover: p.cover || p.image,
          technologies: (p.tech || p.technologies || []) as string[],
          liveUrl: p.liveUrl || p.demo || '',
          repo: p.repo || p.githubUrl || '',
          category: p.category || '',
          hidden: false,
          showDetails: true,
          showLive: Boolean(p.liveUrl || p.demo),
          showRepo: Boolean(p.githubUrl || p.repo),
          showDetailsEditor: true, // Show details editor by default
          // Detailed fields from static data (use existing CMS data if available, otherwise use static)
          problem: existing?.problem || p.problem || '',
          solution: existing?.solution || p.solution || '',
          outcome: existing?.outcome || p.outcome || '',
          architecture: existing?.architecture || p.architecture || '',
          impact: existing?.impact || p.impact || '',
          features: existing?.features || (p.features || []) as string[],
          challenges: existing?.challenges || (p.challenges || []) as string[],
          learnings: existing?.learnings || (p.learnings || []) as string[]
        }
      })
      
      // Add CMS-only projects (projects that exist in CMS but not in static data)
      const cmsOnlyProjects = items.filter((cmsItem) => {
        const existsInStatic = staticProjects.some((staticItem) => 
          (staticItem.slug || staticItem.id || staticItem.title)?.toLowerCase() === (cmsItem.slug || cmsItem.id || cmsItem.title)?.toLowerCase()
        )
        return !existsInStatic
      })
      
      // Combine merged static projects with CMS-only projects
      const finalProjects = [...merged, ...cmsOnlyProjects]
      
      // Only update if we actually have changes
      setField('items', finalProjects as any)
      sessionStorage.setItem(processedKey, 'true')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]) // Only depend on active to prevent infinite loops

  async function saveActive() {
    setSaving(true)
    try {
      const body = content[active] || {}
      const res = await fetch('/api/content', { 
        method: 'POST', 
        headers: { 
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }, 
        body: JSON.stringify({ section: active, content: body }) 
      })
      if (!res.ok) throw new Error('Save failed')
      
      // Update last saved content
      setLastSavedContent(prev => ({
        ...prev,
        [active]: { ...content[active] }
      }))
      
      // Clear change history for this section
      setChangeHistory(prev => {
        const newHistory = { ...prev }
        Object.keys(newHistory).forEach(key => {
          if (key.startsWith(`${active}.`)) {
            delete newHistory[key]
          }
        })
        return newHistory
      })
      
      // Refresh content after save to ensure sync
      await fetchContent()
      
      toast({ title: 'Saved', description: `${sections.find(s=>s.id===active)?.name} content saved and synced` })
    } catch (error) {
      console.error('Failed to save content:', error)
      toast({ title: 'Error', description: 'Failed to save content', variant: 'destructive' })
    } finally {
      setSaving(false)
    }
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center site-background">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-800 dark:border-white mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-300">Loading content...</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 mb-4">If this takes too long, try refreshing the page</p>
        <button 
          onClick={() => window.location.reload()} 
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Refresh Page
        </button>
      </div>
    </div>
  )
  if (!authorized) return <div className="min-h-screen flex items-center justify-center site-background dark:text-white text-gray-900">Access denied</div>

  const data = { ...(DEFAULTS[active] || {}), ...(content[active] || {}) }
  
  // Force re-computation when refreshTrigger changes
  const currentData = refreshTrigger >= 0 ? { ...(DEFAULTS[active] || {}), ...(content[active] || {}) } : data
  

  // Direct toggle function for hide/unhide
  const toggleHidden = () => {
    const newHidden = !currentData.hidden
    console.log('🔧 DIRECT TOGGLE:', { current: currentData.hidden, new: newHidden, active })
    
    // Direct state update
    setContent(prev => {
      const newContent = {
      ...prev,
        [active]: { ...(prev[active] || {}), hidden: newHidden }
      }
      console.log('🔧 DIRECT UPDATE RESULT:', newContent[active])
      return newContent
    })
    
    // Force refresh
    setRefreshTrigger(prev => prev + 1)
  }

  // Direct toggle function for individual items
  const toggleItemHidden = (itemIndex: number) => {
    const items = currentData.items || []
    const item = items[itemIndex]
    if (!item) return
    
    const newHidden = !item.hidden
    console.log('🔧 DIRECT ITEM TOGGLE:', { 
      itemIndex, 
      itemTitle: item.title, 
      current: item.hidden, 
      new: newHidden 
    })
    
    // Update the specific item
    const newItems = [...items]
    newItems[itemIndex] = { ...item, hidden: newHidden }
    
    // Direct state update
    setContent(prev => {
      const newContent = {
        ...prev,
        [active]: { ...(prev[active] || {}), items: newItems }
      }
      console.log('🔧 DIRECT ITEM UPDATE RESULT:', newContent[active])
      return newContent
    })
    
    // Force refresh
    setRefreshTrigger(prev => prev + 1)
  }

  return (
    <div className="min-h-screen site-background py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Top Row handled by layout now */}

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <aside className="xl:col-span-1 p-4 bg-white/80 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-2xl">
          <div className="space-y-3 md:space-y-4">
            {sections.map((s) => (
              <AdminButton
                key={s.id}
                aria-current={active === s.id ? 'page' : undefined}
                className={`w-full justify-start transition-shadow ${
                  active===s.id
                    ? 'bg-white/70 dark:bg-white/10 dark:text-white text-gray-900 border-gray-300 dark:border-white/20 !shadow-[0_0_16px_var(--primary)] !ring-1 !ring-[var(--primary)]'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-white/60 dark:hover:bg-white/5 border-gray-200 dark:border-white/10 hover:shadow-[0_0_18px_var(--primary)] hover:ring-2 hover:ring-[var(--primary)]'
                }`}
                onClick={() => setActive(s.id)}
              >
                {s.name}
              </AdminButton>
            ))}
          </div>
        </aside>
        <main className="xl:col-span-3 p-4 sm:p-6 bg-white/80 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-2xl">
          <div className="flex items-center justify-between mb-4 gap-4 flex-col sm:flex-row">
            <h1 className="text-2xl font-bold dark:text-white text-gray-900">{sections.find(s=>s.id===active)?.name} Content</h1>
            <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap">
              {/* Language Switcher */}
              <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                <Globe className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <select
                  value={selectedLocale}
                  onChange={(e) => setSelectedLocale(e.target.value)}
                  className="bg-transparent border-none outline-none text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  {supportedLocales.map((locale) => (
                    <option key={locale.code} value={locale.code}>
                      {locale.flag} {locale.label}
                    </option>
                  ))}
                </select>
              </div>
              <AdminButton onClick={resetToDefault} className="bg-orange-600 hover:bg-orange-500 text-white px-3 py-2 text-sm">
                <RotateCcw className="w-4 h-4 mr-1 sm:mr-2" />
                <span>Default</span>
              </AdminButton>
              <AdminButton onClick={undoLastChange} className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-2 text-sm">
                <Undo2 className="w-4 h-4 mr-1 sm:mr-2" />
                <span>Undo</span>
              </AdminButton>
              <AdminButton onClick={fetchContent} disabled={refreshing} className="bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50 px-3 py-2 text-sm">
                <span>{refreshing ? 'Refreshing...' : 'Refresh'}</span>
              </AdminButton>
              <AdminButton onClick={toggleHidden} className={`${currentData.hidden? 'dark:text-white/90 text-gray-900 border-gray-300 dark:border-white/20' : 'dark:text-white text-gray-900 border-emerald-400/30'} bg-white/70 dark:bg-white/10 px-3 py-2 text-sm`}>
                <span>{currentData.hidden? 'Unhide' : 'Hide'}</span>
              </AdminButton>
              {lastUpdated && (
                <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                  Last updated: {lastUpdated.toLocaleTimeString()}
                </span>
              )}
              <AdminButton onClick={() => setShowDebug(!showDebug)} className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-2 text-sm">
                <span>{showDebug ? 'Hide Debug' : 'Show Debug'}</span>
              </AdminButton>
            </div>
          </div>
          <div className={`space-y-4 ${currentData.hidden? 'opacity-50 grayscale pointer-events-none' : ''}`}>
            {/* Multi-language sections for Hero, Navbar, About, Services */}
            {(active === 'hero' || active === 'navbar' || active === 'about' || active === 'services') && (
              <MultilangSections
                section={active}
                onSave={async (content) => {
                  setSaving(true)
                  try {
                    const response = await fetch('/api/content/multilang', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ section: active, content })
                    })
                    const data = await response.json()
                    if (data.error) throw new Error(data.error)
                    await fetchContent()
                  } finally {
                    setSaving(false)
                  }
                }}
                onReset={() => {
                  if (active === 'hero') {
                    setField('title', DEFAULTS[active].title || '')
                    setField('subtitle', DEFAULTS[active].subtitle || '')
                    setField('ctaPrimaryLabel', DEFAULTS[active].ctaPrimaryLabel || '')
                    setField('ctaPrimaryHref', DEFAULTS[active].ctaPrimaryHref || '')
                    setField('ctaSecondaryLabel', DEFAULTS[active].ctaSecondaryLabel || '')
                    setField('ctaSecondaryHref', DEFAULTS[active].ctaSecondaryHref || '')
                  } else if (active === 'navbar') {
                    setField('about', DEFAULTS[active].about || '')
                    setField('projects', DEFAULTS[active].projects || '')
                    setField('services', DEFAULTS[active].services || '')
                    setField('contact', DEFAULTS[active].contact || '')
                    setField('resume', DEFAULTS[active].resume || '')
                  } else if (active === 'about') {
                    setField('name', DEFAULTS[active].name || '')
                    setField('role', DEFAULTS[active].role || '')
                    setField('short_bio', DEFAULTS[active].short_bio || '')
                    setField('detailed_bio', DEFAULTS[active].detailed_bio || '')
                    setField('expertise_highlights', DEFAULTS[active].expertise_highlights || '')
                  } else if (active === 'services') {
                    setField('title', DEFAULTS[active].title || '')
                    setField('subtitle', DEFAULTS[active].subtitle || '')
                    setField('items', DEFAULTS[active].items || [])
                  } else if (active === 'technical_skills') {
                    setField('title', DEFAULTS[active].title || '')
                    setField('subtitle', DEFAULTS[active].subtitle || '')
                    setField('categories', DEFAULTS[active].categories || [])
                  }
                }}
                onRefresh={fetchContent}
                saving={saving}
                refreshing={refreshing}
              />
            )}

            {/* Projects Section */}
            {active === 'projects' && (
              <div className="space-y-4 p-4 border border-gray-300 dark:border-gray-700 rounded-xl bg-white/50 dark:bg-black/30">
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-sm font-semibold dark:text-gray-200 text-gray-800">
                    Projects Management
                  </label>
                </div>
                
                <ProjectsManager
                  content={content}
                  onUpdate={setField}
                  hiddenFields={hiddenFields}
                  onToggleFieldHidden={handleToggleFieldHidden}
                  hiddenTranslations={hiddenTranslations}
                  onToggleTranslationHidden={handleToggleTranslationHidden}
                />
              </div>
            )}

            {/* Legacy single-language sections */}
            {active !== 'hero' && active !== 'navbar' && active !== 'about' && active !== 'services' && active !== 'technical_skills' && active !== 'projects' && (
              <>
                {/* Title (most sections) */}
                {active !== 'footer' && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm dark:text-gray-300 text-gray-800">Title</label>
                  <button onClick={()=>setField('title_hidden', !currentData.title_hidden)} className={`text-xs rounded px-2 py-0.5 ${currentData.title_hidden? 'bg-gray-800 text-gray-300' : 'bg-gray-600 text-white'} hover:opacity-90`}>{currentData.title_hidden? 'Unhide' : 'Hide'}</button>
                </div>
                <div className={`${currentData.title_hidden? 'opacity-50 grayscale pointer-events-none' : ''}`}>
                  <input value={currentData.title || ''} onChange={(e)=>setField('title', e.target.value)} className="w-full px-3 py-2 bg-white dark:bg-gray-900/70 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white" />
                </div>
              </div>
            )}

            {/* Resume editor */}
            {active === 'resume' && (
              <div className="space-y-6">
                {/* Title/Lead controls */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm dark:text-gray-300 text-gray-800 mb-1">Title</label>
                    <input value={currentData.title || ''} onChange={(e)=>setField('title', e.target.value)} className="w-full px-3 py-2 bg-white dark:bg-gray-900/70 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-sm dark:text-gray-300 text-gray-800 mb-1">Lead</label>
                    <input value={currentData.lead || ''} onChange={(e)=>setField('lead', e.target.value)} className="w-full px-3 py-2 bg-white dark:bg-gray-900/70 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white" />
                  </div>
                </div>

                {/* Education */}
                <div className="p-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/70">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="dark:text-white text-gray-900 font-semibold">Education</h4>
                    <AdminButton className="h-8 px-3 text-xs" onClick={()=> setField('education', [ ...(currentData.education||[]), { degree:'', school:'', date:'', location:'', description:'', hidden:false } ])}>Add Education</AdminButton>
                  </div>
                  <div className="space-y-3">
                    {(currentData.education||[]).map((it: any, idx: number) => (
                      <div key={idx} className="p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900/60">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <input placeholder="Degree" value={it.degree||''} onChange={(e)=>{ const list=[...(currentData.education||[])]; list[idx]={...list[idx], degree:e.target.value}; setField('education', list) }} className="px-3 py-2 bg-white dark:bg-gray-900/70 border border-gray-300 dark:border-gray-700 rounded-xl" />
                          <input placeholder="School" value={it.school||''} onChange={(e)=>{ const list=[...(currentData.education||[])]; list[idx]={...list[idx], school:e.target.value}; setField('education', list) }} className="px-3 py-2 bg-white dark:bg-gray-900/70 border border-gray-300 dark:border-gray-700 rounded-xl" />
                          <input placeholder="Date" value={it.date||''} onChange={(e)=>{ const list=[...(currentData.education||[])]; list[idx]={...list[idx], date:e.target.value}; setField('education', list) }} className="px-3 py-2 bg-white dark:bg-gray-900/70 border border-gray-300 dark:border-gray-700 rounded-xl" />
                          <input placeholder="Location" value={it.location||''} onChange={(e)=>{ const list=[...(currentData.education||[])]; list[idx]={...list[idx], location:e.target.value}; setField('education', list) }} className="px-3 py-2 bg-white dark:bg-gray-900/70 border border-gray-300 dark:border-gray-700 rounded-xl" />
                          <input placeholder="Description" value={it.description||''} onChange={(e)=>{ const list=[...(currentData.education||[])]; list[idx]={...list[idx], description:e.target.value}; setField('education', list) }} className="md:col-span-2 px-3 py-2 bg-white dark:bg-gray-900/70 border border-gray-300 dark:border-gray-700 rounded-xl" />
                        </div>
                        <div className="mt-2 flex gap-2">
                          <AdminButton className="h-7 px-2 text-xs" onClick={()=>{ const list=[...(currentData.education||[])]; list[idx]={...list[idx], hidden:!list[idx].hidden}; setField('education', list) }}>{it.hidden? 'Unhide':'Hide'}</AdminButton>
                          <AdminButton className="h-7 px-2 text-xs" onClick={()=>{ const list=[...(currentData.education||[])]; list.splice(idx,1); setField('education', list) }}>Remove</AdminButton>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                <div className="p-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/70">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="dark:text-white text-gray-900 font-semibold">Certifications</h4>
                    <AdminButton className="h-8 px-3 text-xs" onClick={()=> setField('certifications', [ ...(currentData.certifications||[]), { title:'', issuer:'', date:'', link:'', hidden:false } ])}>Add Certification</AdminButton>
                  </div>
                  <div className="space-y-3">
                    {(currentData.certifications||[]).map((it: any, idx: number) => (
                      <div key={idx} className="p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900/60">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                          <input placeholder="Title" value={it.title||''} onChange={(e)=>{ const list=[...(currentData.certifications||[])]; list[idx]={...list[idx], title:e.target.value}; setField('certifications', list) }} className="px-3 py-2 bg-white dark:bg-gray-900/70 border border-gray-300 dark:border-gray-700 rounded-xl" />
                          <input placeholder="Issuer" value={it.issuer||''} onChange={(e)=>{ const list=[...(currentData.certifications||[])]; list[idx]={...list[idx], issuer:e.target.value}; setField('certifications', list) }} className="px-3 py-2 bg-white dark:bg-gray-900/70 border border-gray-300 dark:border-gray-700 rounded-xl" />
                          <input placeholder="Date" value={it.date||''} onChange={(e)=>{ const list=[...(currentData.certifications||[])]; list[idx]={...list[idx], date:e.target.value}; setField('certifications', list) }} className="px-3 py-2 bg-white dark:bg-gray-900/70 border border-gray-300 dark:border-gray-700 rounded-xl" />
                          <input placeholder="Certificate Link (optional)" value={it.link||''} onChange={(e)=>{ const list=[...(currentData.certifications||[])]; list[idx]={...list[idx], link:e.target.value}; setField('certifications', list) }} className="px-3 py-2 bg-white dark:bg-gray-900/70 border border-gray-300 dark:border-gray-700 rounded-xl" />
                        </div>
                        {it.link && (
                          <div className="mb-3">
                            <a 
                              href={it.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center space-x-2 text-sm text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                            >
                              <span>Preview Link</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        )}
                        <div className="mt-2 flex gap-2">
                          <AdminButton className="h-7 px-2 text-xs" onClick={()=>{ const list=[...(currentData.certifications||[])]; list[idx]={...list[idx], hidden:!list[idx].hidden}; setField('certifications', list) }}>{it.hidden? 'Unhide':'Hide'}</AdminButton>
                          <AdminButton className="h-7 px-2 text-xs" onClick={()=>{ const list=[...(currentData.certifications||[])]; list.splice(idx,1); setField('certifications', list) }}>Remove</AdminButton>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Experience */}
                <div className="p-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/70">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="dark:text-white text-gray-900 font-semibold">Experience</h4>
                    <AdminButton className="h-8 px-3 text-xs" onClick={()=> setField('experience', [ ...(currentData.experience||[]), { role:'', company:'', employmentType:'', date:'', location:'', summary:'', hidden:false } ])}>Add Role</AdminButton>
                  </div>
                  <div className="space-y-3">
                    {(currentData.experience||[]).map((it: any, idx: number) => (
                      <div key={idx} className="p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900/60">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <input placeholder="Role" value={it.role||''} onChange={(e)=>{ const list=[...(currentData.experience||[])]; list[idx]={...list[idx], role:e.target.value}; setField('experience', list) }} className="px-3 py-2 bg-white dark:bg-gray-900/70 border border-gray-300 dark:border-gray-700 rounded-xl" />
                          <input placeholder="Company" value={it.company||''} onChange={(e)=>{ const list=[...(currentData.experience||[])]; list[idx]={...list[idx], company:e.target.value}; setField('experience', list) }} className="px-3 py-2 bg-white dark:bg-gray-900/70 border border-gray-300 dark:border-gray-700 rounded-xl" />
                          <input placeholder="Employment Type" value={it.employmentType||''} onChange={(e)=>{ const list=[...(currentData.experience||[])]; list[idx]={...list[idx], employmentType:e.target.value}; setField('experience', list) }} className="px-3 py-2 bg-white dark:bg-gray-900/70 border border-gray-300 dark:border-gray-700 rounded-xl" />
                          <input placeholder="Date" value={it.date||''} onChange={(e)=>{ const list=[...(currentData.experience||[])]; list[idx]={...list[idx], date:e.target.value}; setField('experience', list) }} className="px-3 py-2 bg-white dark:bg-gray-900/70 border border-gray-300 dark:border-gray-700 rounded-xl" />
                          <input placeholder="Location" value={it.location||''} onChange={(e)=>{ const list=[...(currentData.experience||[])]; list[idx]={...list[idx], location:e.target.value}; setField('experience', list) }} className="px-3 py-2 bg-white dark:bg-gray-900/70 border border-gray-300 dark:border-gray-700 rounded-xl" />
                          <input placeholder="Summary" value={it.summary||''} onChange={(e)=>{ const list=[...(currentData.experience||[])]; list[idx]={...list[idx], summary:e.target.value}; setField('experience', list) }} className="md:col-span-2 px-3 py-2 bg-white dark:bg-gray-900/70 border border-gray-300 dark:border-gray-700 rounded-xl" />
                        </div>
                        <div className="mt-2 flex gap-2">
                          <AdminButton className="h-7 px-2 text-xs" onClick={()=>{ const list=[...(currentData.experience||[])]; list[idx]={...list[idx], hidden:!list[idx].hidden}; setField('experience', list) }}>{it.hidden? 'Unhide':'Hide'}</AdminButton>
                          <AdminButton className="h-7 px-2 text-xs" onClick={()=>{ const list=[...(currentData.experience||[])]; list.splice(idx,1); setField('experience', list) }}>Remove</AdminButton>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technical Skills */}
                <div className="p-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/70">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-sm dark:text-gray-300 text-gray-800 mb-1">Programming Languages (comma-separated)</label>
                      <input value={(currentData.skills?.languages||[]).join(', ')} onChange={(e)=> setField('skills', { ...(currentData.skills||{}), languages: e.target.value.split(',').map((s:string)=>s.trim()).filter(Boolean) })} className="w-full px-3 py-2 bg-white dark:bg-gray-900/70 border border-gray-300 dark:border-gray-700 rounded-xl" />
                    </div>
                    <div>
                      <label className="block text-sm dark:text-gray-300 text-gray-800 mb-1">Frameworks & Libraries</label>
                      <input value={(currentData.skills?.frameworks||[]).join(', ')} onChange={(e)=> setField('skills', { ...(currentData.skills||{}), frameworks: e.target.value.split(',').map((s:string)=>s.trim()).filter(Boolean) })} className="w-full px-3 py-2 bg-white dark:bg-gray-900/70 border border-gray-300 dark:border-gray-700 rounded-xl" />
                    </div>
                    <div>
                      <label className="block text-sm dark:text-gray-300 text-gray-800 mb-1">Cloud & Tools</label>
                      <input value={(currentData.skills?.tools||[]).join(', ')} onChange={(e)=> setField('skills', { ...(currentData.skills||{}), tools: e.target.value.split(',').map((s:string)=>s.trim()).filter(Boolean) })} className="w-full px-3 py-2 bg-white dark:bg-gray-900/70 border border-gray-300 dark:border-gray-700 rounded-xl" />
                    </div>
                  </div>
                  {/* Live icon preview */}
                  <div className="mt-4 space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {(currentData.skills?.languages||[]).map((t: string, i: number)=> (
                        <TechBadge key={`lang-${i}-${t}`} name={t} size="sm" />
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(currentData.skills?.frameworks||[]).map((t: string, i: number)=> (
                        <TechBadge key={`fw-${i}-${t}`} name={t} size="sm" variant="outline" />
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(currentData.skills?.tools||[]).map((t: string, i: number)=> (
                        <TechBadge key={`tool-${i}-${t}`} name={t} size="sm" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Lead (skills, projects, contact) */}
            {['skills','projects','contact'].includes(active) && (
              <div>
                <div className="flex items-center justify-between mb-1">
              <label className="block text-sm dark:text-gray-300 text-gray-800">Lead</label>
                  <button onClick={()=>setField('lead_hidden', !currentData.lead_hidden)} className={`text-xs rounded px-2 py-0.5 ${currentData.lead_hidden? 'bg-gray-800 text-gray-300' : 'bg-gray-600 text-white'} hover:opacity-90`}>{currentData.lead_hidden? 'Unhide' : 'Hide'}</button>
                </div>
                <div className={`${currentData.lead_hidden? 'opacity-50 grayscale pointer-events-none' : ''}`}>
                  <input value={currentData.lead || ''} onChange={(e)=>setField('lead', e.target.value)} className="w-full px-3 py-2 bg-white dark:bg-gray-900/70 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white" />
                </div>
              </div>
            )}

            {/* Subtitle (hero, about, services, projects) */}
            {['hero','about','services','projects'].includes(active) && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm dark:text-gray-300 text-gray-800">Subtitle</label>
                  <button onClick={()=>setField('subtitle_hidden', !currentData.subtitle_hidden)} className={`text-xs rounded px-2 py-0.5 ${currentData.subtitle_hidden? 'bg-gray-800 text-gray-300' : 'bg-gray-600 text-white'} hover:opacity-90`}>{currentData.subtitle_hidden? 'Unhide' : 'Hide'}</button>
                </div>
                <div className={`${currentData.subtitle_hidden? 'opacity-50 grayscale pointer-events-none' : ''}`}>
                  <input value={currentData.subtitle || ''} onChange={(e)=>setField('subtitle', e.target.value)} className="w-full px-3 py-2 bg-white dark:bg-gray-900/70 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white" />
                </div>
              </div>
            )}

            {/* Hero CTAs */}
            {active === 'hero' && (
              <div className="space-y-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <h3 className="text-lg font-semibold dark:text-blue-200 text-blue-800 mb-2">Hero CTA Buttons</h3>
                  <p className="text-sm dark:text-blue-300 text-blue-700 mb-4">
                    Configure the call-to-action buttons in the hero section. Use full URLs for external links or #section for internal navigation.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm dark:text-gray-300 text-gray-800 mb-1">Primary CTA Label</label>
                      <input 
                        value={currentData.ctaPrimaryLabel || ''} 
                        onChange={(e)=>setField('ctaPrimaryLabel', e.target.value)} 
                        placeholder="View My LinkedIn"
                        className="w-full px-3 py-2 bg-white dark:bg-gray-900/70 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm dark:text-gray-300 text-gray-800 mb-1">Primary CTA Link</label>
                      <div className="flex gap-2">
                        <input 
                          value={currentData.ctaPrimaryHref || ''} 
                          onChange={(e)=>setField('ctaPrimaryHref', e.target.value)} 
                          placeholder="https://linkedin.com/in/nouraddin"
                          className="flex-1 px-3 py-2 bg-white dark:bg-gray-900/70 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white" 
                        />
                        {currentData.ctaPrimaryHref && (
                          <a 
                            href={currentData.ctaPrimaryHref} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center gap-1 text-sm"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Test
                          </a>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm dark:text-gray-300 text-gray-800 mb-1">Secondary CTA Label</label>
                      <input 
                        value={currentData.ctaSecondaryLabel || ''} 
                        onChange={(e)=>setField('ctaSecondaryLabel', e.target.value)} 
                        placeholder="Contact Me"
                        className="w-full px-3 py-2 bg-white dark:bg-gray-900/70 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm dark:text-gray-300 text-gray-800 mb-1">Secondary CTA Link</label>
                      <div className="flex gap-2">
                        <input 
                          value={currentData.ctaSecondaryHref || ''} 
                          onChange={(e)=>setField('ctaSecondaryHref', e.target.value)} 
                          placeholder="#contact"
                          className="flex-1 px-3 py-2 bg-white dark:bg-gray-900/70 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white" 
                        />
                        {currentData.ctaSecondaryHref && (
                          <a 
                            href={currentData.ctaSecondaryHref} 
                            target={currentData.ctaSecondaryHref.startsWith('#') ? '_self' : '_blank'}
                            rel="noopener noreferrer"
                            className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl flex items-center gap-1 text-sm"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Test
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Current Values Display */}
                  <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <h4 className="text-sm font-medium dark:text-gray-200 text-gray-800 mb-2">Current Values:</h4>
                    <div className="text-sm space-y-1">
                      <div><strong>Primary:</strong> "{currentData.ctaPrimaryLabel || 'Not set'}" → {currentData.ctaPrimaryHref || 'Not set'}</div>
                      <div><strong>Secondary:</strong> "{currentData.ctaSecondaryLabel || 'Not set'}" → {currentData.ctaSecondaryHref || 'Not set'}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* About specific fields */}
            {active === 'about' && (
              <>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-sm dark:text-gray-300 text-gray-800">Name</label>
                    <button onClick={()=>setField('name_hidden', !currentData.name_hidden)} className={`text-xs rounded px-2 py-0.5 ${currentData.name_hidden? 'bg-gray-800 text-gray-300' : 'bg-gray-600 text-white'} hover:opacity-90`}>{currentData.name_hidden? 'Unhide' : 'Hide'}</button>
                  </div>
                  <div className={`${currentData.name_hidden? 'opacity-50 grayscale pointer-events-none' : ''}`}>
                    <input value={currentData.name || ''} onChange={(e)=>setField('name', e.target.value)} className="w-full px-3 py-2 bg-white dark:bg-gray-900/70 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-sm dark:text-gray-300 text-gray-800">Role</label>
                    <button onClick={()=>setField('role_hidden', !currentData.role_hidden)} className={`text-xs rounded px-2 py-0.5 ${currentData.role_hidden? 'bg-gray-800 text-gray-300' : 'bg-gray-600 text-white'} hover:opacity-90`}>{currentData.role_hidden? 'Unhide' : 'Hide'}</button>
                  </div>
                  <div className={`${currentData.role_hidden? 'opacity-50 grayscale pointer-events-none' : ''}`}>
                    <input value={currentData.role || ''} onChange={(e)=>setField('role', e.target.value)} className="w-full px-3 py-2 bg-white dark:bg-gray-900/70 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-sm dark:text-gray-300 text-gray-800">Body</label>
                    <button onClick={()=>setField('body_hidden', !currentData.body_hidden)} className={`text-xs rounded px-2 py-0.5 ${currentData.body_hidden? 'bg-gray-800 text-gray-300' : 'bg-gray-600 text-white'} hover:opacity-90`}>{currentData.body_hidden? 'Unhide' : 'Hide'}</button>
                  </div>
                  <div className={`${currentData.body_hidden? 'opacity-50 grayscale pointer-events-none' : ''}`}>
                    <textarea rows={10} value={currentData.body || ''} onChange={(e)=>setField('body', e.target.value)} placeholder="Enter your about description..." className="w-full px-3 py-2 bg-white dark:bg-gray-900/70 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white" />
                  </div>
                </div>

                {/* Profile Image */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-sm dark:text-gray-300 text-gray-800">Profile Image</label>
                    <button onClick={()=>setField('profile_image_hidden', !currentData.profile_image_hidden)} className={`text-xs rounded px-2 py-0.5 ${currentData.profile_image_hidden? 'bg-gray-800 text-gray-300' : 'bg-gray-600 text-white'} hover:opacity-90`}>{currentData.profile_image_hidden? 'Unhide' : 'Hide'}</button>
                  </div>
                  <div className={`${currentData.profile_image_hidden? 'opacity-50 grayscale pointer-events-none' : ''}`}>
                    <div className="space-y-3">
                      {/* URL Input */}
                      <div>
                        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Image URL or Path</label>
                        <input 
                          value={currentData.profile_image || ''} 
                          onChange={(e)=>setField('profile_image', e.target.value)} 
                          placeholder="/photo.png or https://example.com/image.jpg" 
                          className="w-full px-3 py-2 bg-white dark:bg-gray-900/70 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white text-sm" 
                        />
                      </div>
                      
                      {/* File Upload */}
                      <div>
                        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Or Upload File</label>
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) {
                              // Create a local URL for preview
                              const localUrl = URL.createObjectURL(file)
                              setField('profile_image', localUrl)
                            }
                          }}
                          className="w-full px-3 py-2 bg-white dark:bg-gray-900/70 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white text-sm file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 dark:file:bg-gray-800 dark:file:text-gray-300 dark:hover:file:bg-gray-700"
                        />
                      </div>
                      
                      {/* Preview */}
                      {currentData.profile_image && (
                        <div className="mt-3">
                          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-2">Preview</label>
                          <div className="flex items-center space-x-4">
                            <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-700">
                              <Image 
                                src={currentData.profile_image} 
                                alt="Profile preview" 
                                fill
                                className="object-cover"
                                sizes="80px"
                                onError={(e) => {
                                  console.error('Image load error:', e)
                                  // You could set a fallback image here
                                }}
                              />
                            </div>
                            <div className="flex-1">
                              <p className="text-xs text-gray-500 dark:text-gray-400 break-all">
                                {currentData.profile_image}
                              </p>
                              <button 
                                onClick={() => setField('profile_image', '')}
                                className="mt-1 text-xs text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                              >
                                Clear Image
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Full-Stack Expertise */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-sm dark:text-gray-300 text-gray-800">Full-Stack Expertise</label>
                    <button onClick={()=>setField('fullstack_expertise_hidden', !currentData.fullstack_expertise_hidden)} className={`text-xs rounded px-2 py-0.5 ${currentData.fullstack_expertise_hidden? 'bg-gray-800 text-gray-300' : 'bg-gray-600 text-white'} hover:opacity-90`}>{currentData.fullstack_expertise_hidden? 'Unhide' : 'Hide'}</button>
                  </div>
                  <div className={`${currentData.fullstack_expertise_hidden? 'opacity-50 grayscale pointer-events-none' : ''}`}>
                    <textarea rows={3} value={currentData.fullstack_expertise || ''} onChange={(e)=>setField('fullstack_expertise', e.target.value)} placeholder="Describe your full-stack expertise..." className="w-full px-3 py-2 bg-white dark:bg-gray-900/70 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white" />
                  </div>
                </div>

                {/* Data Engineering */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-sm dark:text-gray-300 text-gray-800">Data Engineering</label>
                    <button onClick={()=>setField('data_engineering_hidden', !currentData.data_engineering_hidden)} className={`text-xs rounded px-2 py-0.5 ${currentData.data_engineering_hidden? 'bg-gray-800 text-gray-300' : 'bg-gray-600 text-white'} hover:opacity-90`}>{currentData.data_engineering_hidden? 'Unhide' : 'Hide'}</button>
                  </div>
                  <div className={`${currentData.data_engineering_hidden? 'opacity-50 grayscale pointer-events-none' : ''}`}>
                    <textarea rows={3} value={currentData.data_engineering || ''} onChange={(e)=>setField('data_engineering', e.target.value)} placeholder="Describe your data engineering skills..." className="w-full px-3 py-2 bg-white dark:bg-gray-900/70 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white" />
                  </div>
                </div>

                {/* Cloud & Automation */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-sm dark:text-gray-300 text-gray-800">Cloud & Automation</label>
                    <button onClick={()=>setField('cloud_automation_hidden', !currentData.cloud_automation_hidden)} className={`text-xs rounded px-2 py-0.5 ${currentData.cloud_automation_hidden? 'bg-gray-800 text-gray-300' : 'bg-gray-600 text-white'} hover:opacity-90`}>{currentData.cloud_automation_hidden? 'Unhide' : 'Hide'}</button>
                  </div>
                  <div className={`${currentData.cloud_automation_hidden? 'opacity-50 grayscale pointer-events-none' : ''}`}>
                    <textarea rows={3} value={currentData.cloud_automation || ''} onChange={(e)=>setField('cloud_automation', e.target.value)} placeholder="Describe your cloud and automation skills..." className="w-full px-3 py-2 bg-white dark:bg-gray-900/70 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white" />
                  </div>
                </div>
              </>
            )}

            {/* Contact specific */}
            {active === 'contact' && (
              <>
                <div>
                  <label className="block text-sm dark:text-gray-300 text-gray-800 mb-1">Email</label>
                  <input value={currentData.email || ''} onChange={(e)=>setField('email', e.target.value)} className="w-full px-3 py-2 bg-white dark:bg-gray-900/70 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm dark:text-gray-300 text-gray-800 mb-1">Phone</label>
                  <input value={currentData.phone || ''} onChange={(e)=>setField('phone', e.target.value)} className="w-full px-3 py-2 bg-white dark:bg-gray-900/70 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm dark:text-gray-300 text-gray-800 mb-1">Location</label>
                  <input value={currentData.location || ''} onChange={(e)=>setField('location', e.target.value)} className="w-full px-3 py-2 bg-white dark:bg-gray-900/70 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm dark:text-gray-300 text-gray-800 mb-1">GitHub URL</label>
                    <input value={currentData.github || ''} onChange={(e)=>setField('github', e.target.value)} className="w-full px-3 py-2 bg-white dark:bg-gray-900/70 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-sm dark:text-gray-300 text-gray-800 mb-1">LinkedIn URL</label>
                    <input value={currentData.linkedin || ''} onChange={(e)=>setField('linkedin', e.target.value)} className="w-full px-3 py-2 bg-white dark:bg-gray-900/70 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-sm dark:text-gray-300 text-gray-800 mb-1">Instagram URL</label>
                    <input value={currentData.instagram || ''} onChange={(e)=>setField('instagram', e.target.value)} className="w-full px-3 py-2 bg-white dark:bg-gray-900/70 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-sm dark:text-gray-300 text-gray-800 mb-1">X/Twitter URL</label>
                    <input value={currentData.twitter || ''} onChange={(e)=>setField('twitter', e.target.value)} className="w-full px-3 py-2 bg-white dark:bg-gray-900/70 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white" />
                  </div>
                </div>
              </>
            )}

            {/* Services editor */}
            {active === 'services' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="block text-sm dark:text-gray-300 text-gray-800">Services</label>
                  <button
                    onClick={() => {
                      const next = [ ...(currentData.items || []), { title: '', description: '', icon: 'Code', technologies: [] as string[] } ]
                      setField('items', next as any)
                    }}
                    className="px-3 py-1.5 text-xs rounded bg-indigo-600 hover:bg-indigo-500 text-white"
                  >Add Service</button>
                </div>

                <div className="space-y-3">
                  {(currentData.items || []).map((it: any, idx: number) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900/60 cursor-grab active:cursor-grabbing"
                      draggable
                      onDragStart={(e)=>{ setDragIndex(idx); e.dataTransfer.setData('text/plain', String(idx)) }}
                      onDragOver={(e)=>e.preventDefault()}
                      onDrop={(e)=>{
                        e.preventDefault()
                        const from = dragIndex ?? Number(e.dataTransfer.getData('text/plain'))
                        const to = idx
                        if (Number.isNaN(from) || from === to) return
                        const list = [...(currentData.items || [])]
                        const [m] = list.splice(from,1)
                        list.splice(to,0,m)
                        setField('items', list as any)
                        setDragIndex(null)
                      }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm dark:text-gray-300 text-gray-800">Service #{idx+1}</span>
                        <div className="flex gap-2">
                          <button onClick={() => {
                            const list = [...(currentData.items || [])]
                            list[idx] = { ...list[idx], hidden: !list[idx].hidden }
                            setField('items', list as any)
                          }} className={`px-2 py-1 text-xs rounded ${it.hidden? 'bg-gray-800 text-gray-300' : 'bg-gray-600 text-white'} hover:opacity-90`}>{it.hidden? 'Unhide' : 'Hide'}</button>
                          <button onClick={() => {
                            const list = [...(currentData.items || [])]
                            if (idx <= 0) return
                            const [m] = list.splice(idx,1)
                            list.splice(idx-1,0,m)
                            setField('items', list as any)
                          }} className="px-2 py-1 text-xs rounded bg-gray-700 text-white hover:bg-gray-600">Up</button>
                          <button onClick={() => {
                            const list = [...(currentData.items || [])]
                            if (idx >= list.length-1) return
                            const [m] = list.splice(idx,1)
                            list.splice(idx+1,0,m)
                            setField('items', list as any)
                          }} className="px-2 py-1 text-xs rounded bg-gray-700 text-white hover:bg-gray-600">Down</button>
                          <button onClick={() => {
                            const list = [...(currentData.items || [])]
                            list.splice(idx,1)
                            setField('items', list as any)
                          }} className="px-2 py-1 text-xs rounded bg-red-600 text-white hover:bg-red-500">Remove</button>
                        </div>
                      </div>

                      <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4">
                        <div>
                          <label className="block text-xs text-gray-400 mb-1">Title</label>
                          <input value={it.title || ''} onChange={(e)=>{
                            const list = [...(currentData.items || [])]; list[idx] = { ...list[idx], title: e.target.value }; setField('items', list as any)
                          }} className="w-full px-3 py-2 bg-white dark:bg-gray-950/60 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white" />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-400 mb-1">Icon (Code|Database|Smartphone|Cloud)</label>
                          <input value={it.icon || 'Code'} onChange={(e)=>{
                            const list = [...(currentData.items || [])]; list[idx] = { ...list[idx], icon: e.target.value }; setField('items', list as any)
                          }} className="w-full px-3 py-2 bg-white dark:bg-gray-950/60 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white" />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-xs text-gray-400 mb-1">Description</label>
                          <input value={it.description || ''} onChange={(e)=>{
                            const list = [...(currentData.items || [])]; list[idx] = { ...list[idx], description: e.target.value }; setField('items', list as any)
                          }} className="w-full px-3 py-2 bg-white dark:bg-gray-950/60 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white" />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-xs text-gray-400 mb-1">Technologies (comma-separated)</label>
                          <input value={(it.technologies || []).join(', ')} onChange={(e)=>{
                            const list = [...(currentData.items || [])]; list[idx] = { ...list[idx], technologies: e.target.value.split(',').map(s=>s.trim()).filter(Boolean) }; setField('items', list as any)
                          }} className="w-full px-3 py-2 bg-white dark:bg-gray-950/60 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white" />
                          {/* Live tech icon preview */}
                          <div className="mt-2 flex flex-wrap gap-2">
                            {((it.technologies || []) as string[]).map((t, pi) => (
                              <TechBadge key={`${idx}-tech-${pi}-${t}`} name={t} size="sm" />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Projects editor */}
            {active === 'projects' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="block text-sm dark:text-gray-300 text-gray-800">Projects</label>
                  <button
                    onClick={() => {
                      const next = [ ...(currentData.items || []), { id: `proj-${Date.now()}`, title: '', description: '', image: '/projects/your-image.png', cover: '/projects/your-image.png', technologies: [] as string[], liveUrl: '', repo: '', category: '', hidden: false, showDetails: true, showRepo: true, showLive: true, showDetailsEditor: true, problem: '', solution: '', outcome: '', architecture: '', impact: '', features: [] as string[], challenges: [] as string[], learnings: [] as string[] } ]
                      setField('items', next as any)
                    }}
                    className="px-3 py-1.5 text-xs rounded bg-indigo-600 hover:bg-indigo-500 text-white"
                  >Add Project</button>
                </div>

                <div className="space-y-3">
                  {(((currentData.items || []) as any[]).map((it: any) => {
                    const key = String(it.slug || it.id || it.title || '').toLowerCase()
                    const base = staticProjects.find(p => String(p.slug || p.id || p.title).toLowerCase() === key)
                    return { ...(base || {}), ...it }
                  })).map((it: any, idx: number) => (
                    <div key={it.id || idx} className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900/60">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm dark:text-gray-300 text-gray-800">Project #{idx+1}</span>
                        <div className="flex gap-2">
                          <button onClick={() => toggleItemHidden(idx)} className={`px-2 py-1 text-xs rounded ${it.hidden? 'bg-gray-800 text-gray-300' : 'bg-gray-600 text-white'} hover:opacity-90`}>{it.hidden? 'Unhide' : 'Hide'}</button>
                          <button onClick={() => {
                            const list = [...(currentData.items || [])]
                            list.splice(idx,1)
                            setField('items', list as any)
                          }} className="px-2 py-1 text-xs rounded bg-red-600 text-white hover:bg-red-500">Remove</button>
                        </div>
                      </div>

                      <div className={`space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4 ${it.hidden? 'pointer-events-none opacity-60' : ''}`}>
                        <div>
                          <label className="block text-xs text-gray-400 mb-1">Title</label>
                          <input value={it.title || ''} onChange={(e)=>{ const list=[...(currentData.items||[])]; const current=list[idx]||{}; const nextSlug = current.slug || current.id || (String(e.target.value||'').toLowerCase().replace(/\s+/g,'-')); list[idx]={...current, title:e.target.value, slug: nextSlug}; setField('items', list as any) }} className="w-full px-3 py-2 bg-white dark:bg-gray-950/60 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white" />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-400 mb-1">Category</label>
                          <input value={it.category || ''} onChange={(e)=>{ const list=[...(currentData.items||[])]; list[idx]={...list[idx], category:e.target.value}; setField('items', list as any) }} className="w-full px-3 py-2 bg-white dark:bg-gray-950/60 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white" />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-xs text-gray-400 mb-1">Description</label>
                          <input value={it.description || ''} onChange={(e)=>{ const list=[...(currentData.items||[])]; list[idx]={...list[idx], description:e.target.value}; setField('items', list as any) }} className="w-full px-3 py-2 bg-white dark:bg-gray-950/60 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white" />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-400 mb-1">Image URL</label>
                          <input value={it.image || ''} onChange={(e)=>{ const list=[...(currentData.items||[])]; list[idx]={...list[idx], image:e.target.value}; setField('items', list as any) }} placeholder="/projects/your-image.png or https://example.com/image.jpg" className="w-full px-3 py-2 bg-white dark:bg-gray-950/60 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white" />
                          <p className="text-xs text-gray-500 mt-1">Accepts both local paths (/projects/image.png) and full URLs (https://example.com/image.jpg)</p>
                          {it.image && (
                            <div className="mt-2">
                              <p className="text-xs text-gray-400 mb-1">Preview:</p>
                              <div className="w-20 h-12 border border-gray-300 dark:border-gray-600 rounded overflow-hidden relative">
                                <Image 
                                  src={it.image} 
                                  alt="Preview" 
                                  fill
                                  className="object-cover"
                                  onError={() => {
                                    // Hide preview on error
                                  }}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                        <div>
                          <label className="block text-xs text-gray-400 mb-1">Cover URL</label>
                          <input value={it.cover || ''} onChange={(e)=>{ const list=[...(currentData.items||[])]; list[idx]={...list[idx], cover:e.target.value}; setField('items', list as any) }} placeholder="/projects/your-image.png or https://example.com/image.jpg" className="w-full px-3 py-2 bg-white dark:bg-gray-950/60 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white" />
                          <p className="text-xs text-gray-500 mt-1">Accepts both local paths (/projects/image.png) and full URLs (https://example.com/image.jpg)</p>
                          {it.cover && (
                            <div className="mt-2">
                              <p className="text-xs text-gray-400 mb-1">Preview:</p>
                              <div className="w-20 h-12 border border-gray-300 dark:border-gray-600 rounded overflow-hidden relative">
                                <Image 
                                  src={it.cover} 
                                  alt="Preview" 
                                  fill
                                  className="object-cover"
                                  onError={() => {
                                    // Hide preview on error
                                  }}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                        <div>
                          <label className="block text-xs text-gray-400 mb-1">Live Demo URL</label>
                          <input value={it.liveUrl || ''} onChange={(e)=>{ const list=[...(currentData.items||[])]; list[idx]={...list[idx], liveUrl:e.target.value}; setField('items', list as any) }} placeholder="https://" className="w-full px-3 py-2 bg-white dark:bg-gray-950/60 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white" />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-400 mb-1">Repository URL</label>
                          <input value={it.repo || ''} onChange={(e)=>{ const list=[...(currentData.items||[])]; list[idx]={...list[idx], repo:e.target.value}; setField('items', list as any) }} placeholder="https://" className="w-full px-3 py-2 bg-white dark:bg-gray-950/60 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white" />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-xs text-gray-400 mb-1">Technologies (comma-separated)</label>
                          <input value={(it.technologies || []).join(', ')} onChange={(e)=>{ const list=[...(currentData.items||[])]; list[idx]={...list[idx], technologies: e.target.value.split(',').map(s=>s.trim()).filter(Boolean) }; setField('items', list as any) }} className="w-full px-3 py-2 bg-white dark:bg-gray-950/60 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white" />
                          <div className="mt-2 flex flex-wrap gap-2">
                            {((it.technologies || []) as string[]).map((t, pi) => (
                              <TechBadge key={`${idx}-projtech-${pi}-${t}`} name={t} size="sm" />
                            ))}
                          </div>
                        </div>
                        <div className="col-span-full flex gap-2 flex-wrap justify-center sm:justify-start">
                          <AdminButton onClick={()=>{
                            const list=[...(currentData.items||[])];
                            list[idx]={...list[idx], showDetails: !(list[idx].showDetails)}; setField('items', list as any)
                          }} className="h-7 px-2 text-xs">{it.showDetails? 'Hide Details Button':'Show Details Button'}</AdminButton>
                          <AdminButton onClick={()=>{
                            const list=[...(currentData.items||[])];
                            list[idx]={...list[idx], showRepo: !(list[idx].showRepo)}; setField('items', list as any)
                          }} className="h-7 px-2 text-xs">{it.showRepo? 'Hide Repo Button':'Show Repo Button'}</AdminButton>
                          <AdminButton onClick={()=>{
                            const list=[...(currentData.items||[])];
                            list[idx]={...list[idx], showLive: !(list[idx].showLive)}; setField('items', list as any)
                          }} className="h-7 px-2 text-xs">{it.showLive? 'Hide Live Demo Button':'Show Live Demo Button'}</AdminButton>
                          <AdminButton onClick={()=>{
                            const list=[...(currentData.items||[])];
                            list[idx]={...list[idx], showDetailsEditor: !(list[idx].showDetailsEditor)}; setField('items', list as any)
                          }} className="h-7 px-2 text-xs">{it.showDetailsEditor? 'Hide Project Details':'Project Details'}</AdminButton>
                        </div>

                        {/* Project Details Editor */}
                        {it.showDetailsEditor !== false && (
                          <div className="col-span-full mt-6 p-4 sm:p-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-900/70 space-y-6 overflow-hidden">
                            {/* Problem & Solution */}
                            <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-6">
                              <div>
                                <div className="flex items-center justify-between mb-1 flex-col sm:flex-row gap-2">
                                  <label className="block text-sm font-medium dark:text-gray-300 text-gray-800">Problem</label>
                                  <button onClick={()=>{ const list=[...(currentData.items||[])]; list[idx]={...list[idx], problem_hidden: !(list[idx].problem_hidden)}; setField('items', list as any) }} className={`text-xs rounded px-2 py-0.5 ${it.problem_hidden? 'bg-gray-800 text-gray-300' : 'bg-gray-600 text-white'} hover:opacity-90`}>{it.problem_hidden? 'Unhide' : 'Hide'}</button>
                                </div>
                                <div className={`${it.problem_hidden? 'opacity-50 grayscale pointer-events-none' : ''}`}>
                                  <textarea rows={6} value={it.problem || ''} onChange={(e)=>{ const list=[...(currentData.items||[])]; list[idx]={...list[idx], problem:e.target.value}; setField('items', list as any) }} className="w-full px-3 py-3 bg-white dark:bg-gray-900/70 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white min-h-[144px]" />
                                </div>
                              </div>
                              <div>
                                <div className="flex items-center justify-between mb-1 flex-col sm:flex-row gap-2">
                                  <label className="block text-sm font-medium dark:text-gray-300 text-gray-800">Solution</label>
                                  <button onClick={()=>{ const list=[...(currentData.items||[])]; list[idx]={...list[idx], solution_hidden: !(list[idx].solution_hidden)}; setField('items', list as any) }} className={`text-xs rounded px-2 py-0.5 ${it.solution_hidden? 'bg-gray-800 text-gray-300' : 'bg-gray-600 text-white'} hover:opacity-90`}>{it.solution_hidden? 'Unhide' : 'Hide'}</button>
                                </div>
                                <div className={`${it.solution_hidden? 'opacity-50 grayscale pointer-events-none' : ''}`}>
                                  <textarea rows={6} value={it.solution || ''} onChange={(e)=>{ const list=[...(currentData.items||[])]; list[idx]={...list[idx], solution:e.target.value}; setField('items', list as any) }} className="w-full px-3 py-3 bg-white dark:bg-gray-900/70 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white min-h-[144px]" />
                                </div>
                              </div>
                            </div>

                            {/* Outcome */}
                            <div className="lg:col-span-2">
                              <div className="flex items-center justify-between mb-1 flex-col sm:flex-row gap-2">
                                <label className="block text-sm font-medium dark:text-gray-300 text-gray-800">Outcome</label>
                                <button onClick={()=>{ const list=[...(currentData.items||[])]; list[idx]={...list[idx], outcome_hidden: !(list[idx].outcome_hidden)}; setField('items', list as any) }} className={`text-xs rounded px-2 py-0.5 ${it.outcome_hidden? 'bg-gray-800 text-gray-300' : 'bg-gray-600 text-white'} hover:opacity-90`}>{it.outcome_hidden? 'Unhide' : 'Hide'}</button>
                              </div>
                              <div className={`${it.outcome_hidden? 'opacity-50 grayscale pointer-events-none' : ''}`}>
                                <textarea rows={4} value={it.outcome || ''} onChange={(e)=>{ const list=[...(currentData.items||[])]; list[idx]={...list[idx], outcome:e.target.value}; setField('items', list as any) }} className="w-full px-3 py-3 bg-white dark:bg-gray-900/70 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white min-h-[120px]" />
                              </div>
                            </div>

                            {/* Key Features, Architecture, Technical Challenges, Key Learnings */}
                            <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-6">
                              {/* Key Features */}
                              <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/60 space-y-3">
                                <div className="flex items-center justify-between flex-col sm:flex-row gap-2">
                                  <label className="block text-sm font-medium dark:text-gray-300 text-gray-800">Key Features</label>
                                  <div className="flex gap-1 flex-wrap">
                                    <button onClick={()=>{ const list=[...(currentData.items||[])]; list[idx]={...list[idx], features_hidden: !(list[idx].features_hidden)}; setField('items', list as any) }} className={`text-xs rounded px-2 py-0.5 ${it.features_hidden? 'bg-gray-800 text-gray-300' : 'bg-gray-600 text-white'} hover:opacity-90`}>{it.features_hidden? 'Unhide' : 'Hide'}</button>
                                    <AdminButton className="h-7 px-2 text-xs" onClick={()=>{ const list=[...(currentData.items||[])]; const arr=[...((it.features||[]) as string[]), '']; list[idx]={...list[idx], features:arr}; setField('items', list as any)}}>Add</AdminButton>
                                  </div>
                                </div>
                                <div className={`space-y-3 ${it.features_hidden? 'opacity-50 grayscale pointer-events-none' : ''}`}>
                                  {((it.features||[]) as string[]).map((f, fi)=> (
                                    <div key={fi} className="flex gap-2 items-center">
                                      <input value={f} onChange={(e)=>{ const list=[...(currentData.items||[])]; const arr=[...((list[idx].features||[]) as string[])]; arr[fi]=e.target.value; list[idx]={...list[idx], features:arr}; setField('items', list as any)}} className="flex-1 px-3 py-2 bg-white dark:bg-gray-900/70 border border-gray-300 dark:border-gray-700 rounded-xl" />
                                      <button onClick={()=>{ const list=[...(currentData.items||[])]; const arr=[...((list[idx].features||[]) as string[])]; arr.splice(fi,1); list[idx]={...list[idx], features:arr}; setField('items', list as any)}} className="px-2 text-xs rounded bg-red-600 text-white whitespace-nowrap">Remove</button>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Architecture */}
                              <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/60 space-y-3">
                                <div className="flex items-center justify-between flex-col sm:flex-row gap-2">
                                  <label className="block text-sm font-medium dark:text-gray-300 text-gray-800">Architecture</label>
                                  <button onClick={()=>{ const list=[...(currentData.items||[])]; list[idx]={...list[idx], architecture_hidden: !(list[idx].architecture_hidden)}; setField('items', list as any) }} className={`text-xs rounded px-2 py-0.5 ${it.architecture_hidden? 'bg-gray-800 text-gray-300' : 'bg-gray-600 text-white'} hover:opacity-90`}>{it.architecture_hidden? 'Unhide' : 'Hide'}</button>
                                </div>
                                <div className={`${it.architecture_hidden? 'opacity-50 grayscale pointer-events-none' : ''}`}>
                                  <textarea rows={8} value={it.architecture || ''} onChange={(e)=>{ const list=[...(currentData.items||[])]; list[idx]={...list[idx], architecture:e.target.value}; setField('items', list as any) }} className="w-full px-3 py-3 bg-white dark:bg-gray-900/70 border border-gray-300 dark:border-gray-700 rounded-xl min-h-[160px]" />
                                </div>
                              </div>

                              {/* Technical Challenges */}
                              <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/60 space-y-3">
                                <div className="flex items-center justify-between flex-col sm:flex-row gap-2">
                                  <label className="block text-sm font-medium dark:text-gray-300 text-gray-800">Technical Challenges</label>
                                  <div className="flex gap-1 flex-wrap">
                                    <button onClick={()=>{ const list=[...(currentData.items||[])]; list[idx]={...list[idx], challenges_hidden: !(list[idx].challenges_hidden)}; setField('items', list as any) }} className={`text-xs rounded px-2 py-0.5 ${it.challenges_hidden? 'bg-gray-800 text-gray-300' : 'bg-gray-600 text-white'} hover:opacity-90`}>{it.challenges_hidden? 'Unhide' : 'Hide'}</button>
                                    <AdminButton className="h-7 px-2 text-xs" onClick={()=>{ const list=[...(currentData.items||[])]; const arr=[...((it.challenges||[]) as string[]), '']; list[idx]={...list[idx], challenges:arr}; setField('items', list as any)}}>Add</AdminButton>
                                  </div>
                                </div>
                                <div className={`space-y-3 ${it.challenges_hidden? 'opacity-50 grayscale pointer-events-none' : ''}`}>
                                  {((it.challenges||[]) as string[]).map((c, ci)=> (
                                    <div key={ci} className="flex gap-2 items-center">
                                      <input value={c} onChange={(e)=>{ const list=[...(currentData.items||[])]; const arr=[...((list[idx].challenges||[]) as string[])]; arr[ci]=e.target.value; list[idx]={...list[idx], challenges:arr}; setField('items', list as any)}} className="flex-1 px-3 py-2 bg-white dark:bg-gray-900/70 border border-gray-300 dark:border-gray-700 rounded-xl" />
                                      <button onClick={()=>{ const list=[...(currentData.items||[])]; const arr=[...((list[idx].challenges||[]) as string[])]; arr.splice(ci,1); list[idx]={...list[idx], challenges:arr}; setField('items', list as any)}} className="px-2 text-xs rounded bg-red-600 text-white whitespace-nowrap">Remove</button>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Key Learnings */}
                              <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/60 space-y-3">
                                <div className="flex items-center justify-between flex-col sm:flex-row gap-2">
                                  <label className="block text-sm font-medium dark:text-gray-300 text-gray-800">Key Learnings</label>
                                  <div className="flex gap-1 flex-wrap">
                                    <button onClick={()=>{ const list=[...(currentData.items||[])]; list[idx]={...list[idx], learnings_hidden: !(list[idx].learnings_hidden)}; setField('items', list as any) }} className={`text-xs rounded px-2 py-0.5 ${it.learnings_hidden? 'bg-gray-800 text-gray-300' : 'bg-gray-600 text-white'} hover:opacity-90`}>{it.learnings_hidden? 'Unhide' : 'Hide'}</button>
                                    <AdminButton className="h-7 px-2 text-xs" onClick={()=>{ const list=[...(currentData.items||[])]; const arr=[...((it.learnings||[]) as string[]), '']; list[idx]={...list[idx], learnings:arr}; setField('items', list as any)}}>Add</AdminButton>
                                  </div>
                                </div>
                                <div className={`space-y-3 ${it.learnings_hidden? 'opacity-50 grayscale pointer-events-none' : ''}`}>
                                  {((it.learnings||[]) as string[]).map((l, li)=> (
                                    <div key={li} className="flex gap-2 items-center">
                                      <input value={l} onChange={(e)=>{ const list=[...(currentData.items||[])]; const arr=[...((list[idx].learnings||[]) as string[])]; arr[li]=e.target.value; list[idx]={...list[idx], learnings:arr}; setField('items', list as any)}} className="flex-1 px-3 py-2 bg-white dark:bg-gray-900/70 border border-gray-300 dark:border-gray-700 rounded-xl" />
                                      <button onClick={()=>{ const list=[...(currentData.items||[])]; const arr=[...((list[idx].learnings||[]) as string[])]; arr.splice(li,1); list[idx]={...list[idx], learnings:arr}; setField('items', list as any)}} className="px-2 text-xs rounded bg-red-600 text-white whitespace-nowrap">Remove</button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Impact */}
                            <div className="lg:col-span-2 p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/60 space-y-3">
                              <div className="flex items-center justify-between flex-col sm:flex-row gap-2">
                                <label className="block text-sm font-medium dark:text-gray-300 text-gray-800">Impact</label>
                                <button onClick={()=>{ const list=[...(currentData.items||[])]; list[idx]={...list[idx], impact_hidden: !(list[idx].impact_hidden)}; setField('items', list as any) }} className={`text-xs rounded px-2 py-0.5 ${it.impact_hidden? 'bg-gray-800 text-gray-300' : 'bg-gray-600 text-white'} hover:opacity-90`}>{it.impact_hidden? 'Unhide' : 'Hide'}</button>
                              </div>
                              <div className={`${it.impact_hidden? 'opacity-50 grayscale pointer-events-none' : ''}`}>
                                <textarea rows={3} value={it.impact || ''} onChange={(e)=>{ const list=[...(currentData.items||[])]; list[idx]={...list[idx], impact:e.target.value}; setField('items', list as any) }} className="w-full px-3 py-3 bg-white dark:bg-gray-900/70 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white min-h-[96px]" />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            

            {/* Footer social links */}
            {active === 'footer' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm dark:text-gray-300 text-gray-800 mb-1">GitHub URL</label>
                  <input value={currentData.github || ''} onChange={(e)=>setField('github', e.target.value)} className="w-full px-3 py-2 bg-gray-900/70 border border-gray-700 rounded-xl text-white" />
                </div>
                <div>
                  <label className="block text-sm dark:text-gray-300 text-gray-800 mb-1">LinkedIn URL</label>
                  <input value={currentData.linkedin || ''} onChange={(e)=>setField('linkedin', e.target.value)} className="w-full px-3 py-2 bg-gray-900/70 border border-gray-700 rounded-xl text-white" />
                </div>
                <div>
                  <label className="block text-sm dark:text-gray-300 text-gray-800 mb-1">Instagram URL</label>
                  <input value={currentData.instagram || ''} onChange={(e)=>setField('instagram', e.target.value)} className="w-full px-3 py-2 bg-gray-900/70 border border-gray-700 rounded-xl text-white" />
                </div>
                <div>
                  <label className="block text-sm dark:text-gray-300 text-gray-800 mb-1">X/Twitter URL</label>
                  <input value={currentData.twitter || ''} onChange={(e)=>setField('twitter', e.target.value)} className="w-full px-3 py-2 bg-gray-900/70 border border-gray-700 rounded-xl text-white" />
                </div>
              </div>
            )}
              </>
            )}
          </div>
          {/* Save buttons for legacy sections only */}
          {active !== 'hero' && active !== 'navbar' && active !== 'about' && active !== 'services' && active !== 'technical_skills' && active !== 'skills' && (
            <div className="mt-6 flex gap-2">
              <AdminButton onClick={saveActive} disabled={saving} className="px-4 py-2 disabled:opacity-50">{saving? 'Saving...':'Save Content'}</AdminButton>
              <AdminButton onClick={()=>setContent((prev)=>({ ...prev, [active]: {} }))} className="px-4 py-2">Reset to Default</AdminButton>
            </div>
          )}

          {/* Debug Panel */}
          {showDebug && (
            <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 dark:text-white text-gray-900">Debug Information</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <strong>Current Section:</strong> {active}
                </div>
                <div>
                  <strong>Content Keys:</strong> {Object.keys(content).join(', ')}
                </div>
                <div>
                  <strong>Active Section Data:</strong>
                  <pre className="mt-1 p-2 bg-white dark:bg-gray-900 rounded text-xs overflow-auto max-h-40">
                    {JSON.stringify(content[active], null, 2)}
                  </pre>
                </div>
                <div>
                  <strong>Last Updated:</strong> {lastUpdated ? lastUpdated.toLocaleString() : 'Never'}
                </div>
                <div>
                  <strong>Projects Count:</strong> {((content.projects as any)?.items || []).length}
                </div>
              </div>
            </div>
          )}
        </main>
        </div>
      </div>
    </div>
  )
}


