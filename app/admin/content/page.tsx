"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getSupabaseBrowserClient } from "@/lib/supabaseClient"
import { useToast } from "@/hooks/use-toast"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { services as defaultServices } from "@/lib/data"
import { skills as defaultSkills } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { AdminButton } from "@/components/ui/admin-button"

type SectionId = "hero"|"about"|"services"|"projects"|"skills"|"contact"|"resume"|"footer"

const sections: { id: SectionId; name: string }[] = [
  { id: "hero", name: "Hero" },
  { id: "about", name: "About" },
  { id: "services", name: "Services" },
  { id: "projects", name: "Projects" },
  { id: "skills", name: "Skills" },
  { id: "contact", name: "Contact" },
  { id: "resume", name: "Resume" },
  { id: "footer", name: "Footer" },
]

export default function ContentAdminPage() {
  const { toast } = useToast()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [authorized, setAuthorized] = useState(false)
  const [active, setActive] = useState<SectionId>("hero")
  const [content, setContent] = useState<Record<string, any>>({})
  const [saving, setSaving] = useState(false)
  const [dragIndex, setDragIndex] = useState<number | null>(null)

  const DEFAULTS: Record<SectionId, any> = {
    hero: { title: 'Software Engineer • Full-Stack Developer • Data Engineer', subtitle: 'Building scalable applications, cloud-driven systems, and data-powered solutions.', ctaPrimaryLabel: 'View Portfolio', ctaPrimaryHref: '#portfolio', ctaSecondaryLabel: 'Contact Me', ctaSecondaryHref: '#contact', hidden: false },
    about: { title: 'About Me', subtitle: 'Nouraddin - Software Engineering Student & Developer', name: 'Nouraddin Abdurahman Aden', role: 'Software Engineering Student & Developer', body: '', hidden: false },
    services: { title: 'Services', subtitle: 'Comprehensive solutions for your digital needs', items: defaultServices, hidden: false },
    projects: { title: 'Featured Projects', subtitle: 'A showcase of my recent work and technical expertise', hidden: false },
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
    resume: { title: 'Resume', lead: 'My professional journey and technical expertise', hidden: false },
    footer: {
      github: 'https://github.com/NouradinAbdurahman',
      linkedin: 'https://linkedin.com/in/nouraddin',
      instagram: 'https://instagram.com/nouradiin_',
      twitter: 'https://x.com/Nouradin1208',
      hidden: false
    }
  }

  useEffect(() => {
    const supabase = getSupabaseBrowserClient()
    supabase.auth.getUser().then(({ data }) => {
      const email = data.user?.email || null
      const ok = !!email && email === "n.aden1208@gmail.com"
      setAuthorized(ok)
      if (ok) fetchContent()
      else setLoading(false)
    })
  }, [])

  async function fetchContent() {
    setLoading(true)
    try {
      const res = await fetch('/api/content')
      if (!res.ok) throw new Error('Failed to fetch content')
      const data = await res.json()
      setContent(data.content || {})
    } catch (e) {
      toast({ title: 'Error', description: 'Failed to load content', variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  async function saveActive() {
    setSaving(true)
    try {
      const body = content[active] || {}
      const res = await fetch('/api/content', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ section: active, content: body }) })
      if (!res.ok) throw new Error('Save failed')
      toast({ title: 'Saved', description: `${sections.find(s=>s.id===active)?.name} content saved` })
    } catch (e) {
      toast({ title: 'Error', description: 'Failed to save content', variant: 'destructive' })
    } finally {
      setSaving(false)
    }
  }

  function setField(path: string, value: string | boolean | any[]) {
    setContent((prev) => ({
      ...prev,
      [active]: { ...(prev[active] || {}), [path]: value }
    }))
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center site-background"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div></div>
  if (!authorized) return <div className="min-h-screen flex items-center justify-center site-background text-white">Access denied</div>

  const data = { ...(DEFAULTS[active] || {}), ...(content[active] || {}) }

  return (
    <div className="min-h-screen site-background py-8 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        <aside className="md:col-span-1 p-4 bg-white/5 dark:bg-black/20 border border-white/10 rounded-2xl">
          <div className="space-y-3 md:space-y-4">
            {sections.map((s) => (
              <AdminButton
                key={s.id}
                aria-current={active === s.id ? 'page' : undefined}
                className={`w-full justify-start transition-shadow ${
                  active===s.id
                    ? 'bg-white/10 text-white border-white/20 !shadow-[0_0_16px_var(--primary)] !ring-1 !ring-[var(--primary)]'
                    : 'text-gray-300 hover:bg-white/5 border-white/10 hover:shadow-[0_0_18px_var(--primary)] hover:ring-2 hover:ring-[var(--primary)]'
                }`}
                onClick={() => setActive(s.id)}
              >
                {s.name}
              </AdminButton>
            ))}
          </div>
        </aside>
        <main className="md:col-span-3 p-6 bg-white/5 dark:bg-black/20 border border-white/10 rounded-2xl">
          <div className="flex items-center justify-between mb-4 gap-2 flex-col sm:flex-row">
            <h1 className="text-2xl font-bold text-white">{sections.find(s=>s.id===active)?.name} Content</h1>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <AdminButton onClick={() => setField('hidden', !(data.hidden))} className={`${data.hidden? 'text-white/90 border-white/20' : 'text-white border-emerald-400/30'} bg-white/10`}>
                {data.hidden? 'Unhide' : 'Hide'}
              </AdminButton>
              <AdminButton onClick={() => router.push('/admin/dashboard')} className="flex-1 sm:flex-none">Back to Dashboard</AdminButton>
            </div>
          </div>
          <div className={`space-y-4 ${data.hidden? 'opacity-50 grayscale pointer-events-none' : ''}`}>
            {/* Title (most sections) */}
            {active !== 'footer' && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm text-gray-300">Title</label>
                  <button onClick={()=>setField('title_hidden', !data.title_hidden)} className={`text-xs rounded px-2 py-0.5 ${data.title_hidden? 'bg-gray-800 text-gray-300' : 'bg-gray-600 text-white'} hover:opacity-90`}>{data.title_hidden? 'Unhide' : 'Hide'}</button>
                </div>
                <div className={`${data.title_hidden? 'opacity-50 grayscale pointer-events-none' : ''}`}>
                  <input value={data.title || ''} onChange={(e)=>setField('title', e.target.value)} className="w-full px-3 py-2 bg-gray-900/70 border border-gray-700 rounded-xl text-white" />
                </div>
              </div>
            )}

            {/* Lead (skills, projects, contact, resume) */}
            {['skills','projects','contact','resume'].includes(active) && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm text-gray-300">Lead</label>
                  <button onClick={()=>setField('lead_hidden', !data.lead_hidden)} className={`text-xs rounded px-2 py-0.5 ${data.lead_hidden? 'bg-gray-800 text-gray-300' : 'bg-gray-600 text-white'} hover:opacity-90`}>{data.lead_hidden? 'Unhide' : 'Hide'}</button>
                </div>
                <div className={`${data.lead_hidden? 'opacity-50 grayscale pointer-events-none' : ''}`}>
                  <input value={data.lead || ''} onChange={(e)=>setField('lead', e.target.value)} className="w-full px-3 py-2 bg-gray-900/70 border border-gray-700 rounded-xl text-white" />
                </div>
              </div>
            )}

            {/* Subtitle (hero, about, services, projects) */}
            {['hero','about','services','projects'].includes(active) && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm text-gray-300">Subtitle</label>
                  <button onClick={()=>setField('subtitle_hidden', !data.subtitle_hidden)} className={`text-xs rounded px-2 py-0.5 ${data.subtitle_hidden? 'bg-gray-800 text-gray-300' : 'bg-gray-600 text-white'} hover:opacity-90`}>{data.subtitle_hidden? 'Unhide' : 'Hide'}</button>
                </div>
                <div className={`${data.subtitle_hidden? 'opacity-50 grayscale pointer-events-none' : ''}`}>
                  <input value={data.subtitle || ''} onChange={(e)=>setField('subtitle', e.target.value)} className="w-full px-3 py-2 bg-gray-900/70 border border-gray-700 rounded-xl text-white" />
                </div>
              </div>
            )}

            {/* Hero CTAs */}
            {active === 'hero' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Primary CTA Label</label>
                  <input value={data.ctaPrimaryLabel || ''} onChange={(e)=>setField('ctaPrimaryLabel', e.target.value)} className="w-full px-3 py-2 bg-gray-900/70 border border-gray-700 rounded-xl text-white" />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Primary CTA Href</label>
                  <input value={data.ctaPrimaryHref || ''} onChange={(e)=>setField('ctaPrimaryHref', e.target.value)} className="w-full px-3 py-2 bg-gray-900/70 border border-gray-700 rounded-xl text-white" />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Secondary CTA Label</label>
                  <input value={data.ctaSecondaryLabel || ''} onChange={(e)=>setField('ctaSecondaryLabel', e.target.value)} className="w-full px-3 py-2 bg-gray-900/70 border border-gray-700 rounded-xl text-white" />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Secondary CTA Href</label>
                  <input value={data.ctaSecondaryHref || ''} onChange={(e)=>setField('ctaSecondaryHref', e.target.value)} className="w-full px-3 py-2 bg-gray-900/70 border border-gray-700 rounded-xl text-white" />
                </div>
              </div>
            )}

            {/* About specific fields */}
            {active === 'about' && (
              <>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-sm text-gray-300">Name</label>
                    <button onClick={()=>setField('name_hidden', !data.name_hidden)} className={`text-xs rounded px-2 py-0.5 ${data.name_hidden? 'bg-gray-800 text-gray-300' : 'bg-gray-600 text-white'} hover:opacity-90`}>{data.name_hidden? 'Unhide' : 'Hide'}</button>
                  </div>
                  <div className={`${data.name_hidden? 'opacity-50 grayscale pointer-events-none' : ''}`}>
                    <input value={data.name || ''} onChange={(e)=>setField('name', e.target.value)} className="w-full px-3 py-2 bg-gray-900/70 border border-gray-700 rounded-xl text-white" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-sm text-gray-300">Role</label>
                    <button onClick={()=>setField('role_hidden', !data.role_hidden)} className={`text-xs rounded px-2 py-0.5 ${data.role_hidden? 'bg-gray-800 text-gray-300' : 'bg-gray-600 text-white'} hover:opacity-90`}>{data.role_hidden? 'Unhide' : 'Hide'}</button>
                  </div>
                  <div className={`${data.role_hidden? 'opacity-50 grayscale pointer-events-none' : ''}`}>
                    <input value={data.role || ''} onChange={(e)=>setField('role', e.target.value)} className="w-full px-3 py-2 bg-gray-900/70 border border-gray-700 rounded-xl text-white" />
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                  <button onClick={()=>setField('body', `${data.body || ''} **bold**`)} className="px-2 py-1 text-xs rounded bg-gray-700 text-white hover:bg-gray-600">Bold</button>
                  <button onClick={()=>setField('body', `${data.body || ''} *italic*`)} className="px-2 py-1 text-xs rounded bg-gray-700 text-white hover:bg-gray-600">Italic</button>
                  <button onClick={()=>setField('body', `${data.body || ''} [link](https://)`)} className="px-2 py-1 text-xs rounded bg-gray-700 text-white hover:bg-gray-600">Link</button>
                  <button onClick={()=>setField('body', `${data.body || ''}\n\n- Item 1\n- Item 2`)} className="px-2 py-1 text-xs rounded bg-gray-700 text-white hover:bg-gray-600">List</button>
                  <button onClick={()=>setField('body', `${data.body || ''} \`code\``)} className="px-2 py-1 text-xs rounded bg-gray-700 text-white hover:bg-gray-600">Code</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-sm text-gray-300">Body</label>
                      <button onClick={()=>setField('body_hidden', !data.body_hidden)} className={`text-xs rounded px-2 py-0.5 ${data.body_hidden? 'bg-gray-800 text-gray-300' : 'bg-gray-600 text-white'} hover:opacity-90`}>{data.body_hidden? 'Unhide' : 'Hide'}</button>
                    </div>
                    <div className={`${data.body_hidden? 'opacity-50 grayscale pointer-events-none' : ''}`}>
                      <textarea rows={10} value={data.body || ''} onChange={(e)=>setField('body', e.target.value)} placeholder="Supports Markdown (bold, italic, lists, links, code)" className="w-full px-3 py-2 bg-gray-900/70 border border-gray-700 rounded-xl text-white" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-1">Preview</label>
                    <div className="px-4 py-3 rounded-xl border border-gray-700 bg-gray-900/60 prose prose-invert max-w-none">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{data.body || ''}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Contact specific */}
            {active === 'contact' && (
              <>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Email</label>
                  <input value={data.email || ''} onChange={(e)=>setField('email', e.target.value)} className="w-full px-3 py-2 bg-gray-900/70 border border-gray-700 rounded-xl text-white" />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Phone</label>
                  <input value={data.phone || ''} onChange={(e)=>setField('phone', e.target.value)} className="w-full px-3 py-2 bg-gray-900/70 border border-gray-700 rounded-xl text-white" />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Location</label>
                  <input value={data.location || ''} onChange={(e)=>setField('location', e.target.value)} className="w-full px-3 py-2 bg-gray-900/70 border border-gray-700 rounded-xl text-white" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-1">GitHub URL</label>
                    <input value={data.github || ''} onChange={(e)=>setField('github', e.target.value)} className="w-full px-3 py-2 bg-gray-900/70 border border-gray-700 rounded-xl text-white" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-1">LinkedIn URL</label>
                    <input value={data.linkedin || ''} onChange={(e)=>setField('linkedin', e.target.value)} className="w-full px-3 py-2 bg-gray-900/70 border border-gray-700 rounded-xl text-white" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-1">Instagram URL</label>
                    <input value={data.instagram || ''} onChange={(e)=>setField('instagram', e.target.value)} className="w-full px-3 py-2 bg-gray-900/70 border border-gray-700 rounded-xl text-white" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-1">X/Twitter URL</label>
                    <input value={data.twitter || ''} onChange={(e)=>setField('twitter', e.target.value)} className="w-full px-3 py-2 bg-gray-900/70 border border-gray-700 rounded-xl text-white" />
                  </div>
                </div>
              </>
            )}

            {/* Services editor */}
            {active === 'services' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="block text-sm text-gray-300">Services</label>
                  <button
                    onClick={() => {
                      const next = [ ...(data.items || []), { title: '', description: '', icon: 'Code', technologies: [] as string[] } ]
                      setField('items', next as any)
                    }}
                    className="px-3 py-1.5 text-xs rounded bg-indigo-600 hover:bg-indigo-500 text-white"
                  >Add Service</button>
                </div>

                <div className="space-y-3">
                  {(data.items || []).map((it: any, idx: number) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-gray-700 bg-gray-900/60 cursor-grab active:cursor-grabbing"
                      draggable
                      onDragStart={(e)=>{ setDragIndex(idx); e.dataTransfer.setData('text/plain', String(idx)) }}
                      onDragOver={(e)=>e.preventDefault()}
                      onDrop={(e)=>{
                        e.preventDefault()
                        const from = dragIndex ?? Number(e.dataTransfer.getData('text/plain'))
                        const to = idx
                        if (Number.isNaN(from) || from === to) return
                        const list = [...(data.items || [])]
                        const [m] = list.splice(from,1)
                        list.splice(to,0,m)
                        setField('items', list as any)
                        setDragIndex(null)
                      }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-gray-300">Service #{idx+1}</span>
                        <div className="flex gap-2">
                          <button onClick={() => {
                            const list = [...(data.items || [])]
                            list[idx] = { ...list[idx], hidden: !list[idx].hidden }
                            setField('items', list as any)
                          }} className={`px-2 py-1 text-xs rounded ${it.hidden? 'bg-gray-800 text-gray-300' : 'bg-gray-600 text-white'} hover:opacity-90`}>{it.hidden? 'Unhide' : 'Hide'}</button>
                          <button onClick={() => {
                            const list = [...(data.items || [])]
                            if (idx <= 0) return
                            const [m] = list.splice(idx,1)
                            list.splice(idx-1,0,m)
                            setField('items', list as any)
                          }} className="px-2 py-1 text-xs rounded bg-gray-700 text-white hover:bg-gray-600">Up</button>
                          <button onClick={() => {
                            const list = [...(data.items || [])]
                            if (idx >= list.length-1) return
                            const [m] = list.splice(idx,1)
                            list.splice(idx+1,0,m)
                            setField('items', list as any)
                          }} className="px-2 py-1 text-xs rounded bg-gray-700 text-white hover:bg-gray-600">Down</button>
                          <button onClick={() => {
                            const list = [...(data.items || [])]
                            list.splice(idx,1)
                            setField('items', list as any)
                          }} className="px-2 py-1 text-xs rounded bg-red-600 text-white hover:bg-red-500">Remove</button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-gray-400 mb-1">Title</label>
                          <input value={it.title || ''} onChange={(e)=>{
                            const list = [...(data.items || [])]; list[idx] = { ...list[idx], title: e.target.value }; setField('items', list as any)
                          }} className="w-full px-3 py-2 bg-gray-950/60 border border-gray-700 rounded-xl text-white" />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-400 mb-1">Icon (Code|Database|Smartphone|Cloud)</label>
                          <input value={it.icon || 'Code'} onChange={(e)=>{
                            const list = [...(data.items || [])]; list[idx] = { ...list[idx], icon: e.target.value }; setField('items', list as any)
                          }} className="w-full px-3 py-2 bg-gray-950/60 border border-gray-700 rounded-xl text-white" />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-xs text-gray-400 mb-1">Description</label>
                          <input value={it.description || ''} onChange={(e)=>{
                            const list = [...(data.items || [])]; list[idx] = { ...list[idx], description: e.target.value }; setField('items', list as any)
                          }} className="w-full px-3 py-2 bg-gray-950/60 border border-gray-700 rounded-xl text-white" />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-xs text-gray-400 mb-1">Technologies (comma-separated)</label>
                          <input value={(it.technologies || []).join(', ')} onChange={(e)=>{
                            const list = [...(data.items || [])]; list[idx] = { ...list[idx], technologies: e.target.value.split(',').map(s=>s.trim()).filter(Boolean) }; setField('items', list as any)
                          }} className="w-full px-3 py-2 bg-gray-950/60 border border-gray-700 rounded-xl text-white" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills editor (three category cards) */}
            {active === 'skills' && (
              <div className="space-y-6">
                {/* Category titles/descriptions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-1">Category 1 Title</label>
                    <input value={data.catFullTitle || ''} onChange={(e)=>setField('catFullTitle', e.target.value)} className="w-full px-3 py-2 bg-gray-900/70 border border-gray-700 rounded-xl text-white" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-1">Category 1 Description</label>
                    <input value={data.catFullDesc || ''} onChange={(e)=>setField('catFullDesc', e.target.value)} className="w-full px-3 py-2 bg-gray-900/70 border border-gray-700 rounded-xl text-white" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-1">Category 2 Title</label>
                    <input value={data.catDataTitle || ''} onChange={(e)=>setField('catDataTitle', e.target.value)} className="w-full px-3 py-2 bg-gray-900/70 border border-gray-700 rounded-xl text-white" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-1">Category 2 Description</label>
                    <input value={data.catDataDesc || ''} onChange={(e)=>setField('catDataDesc', e.target.value)} className="w-full px-3 py-2 bg-gray-900/70 border border-gray-700 rounded-xl text-white" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-1">Category 3 Title</label>
                    <input value={data.catCloudTitle || ''} onChange={(e)=>setField('catCloudTitle', e.target.value)} className="w-full px-3 py-2 bg-gray-900/70 border border-gray-700 rounded-xl text-white" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-1">Category 3 Description</label>
                    <input value={data.catCloudDesc || ''} onChange={(e)=>setField('catCloudDesc', e.target.value)} className="w-full px-3 py-2 bg-gray-900/70 border border-gray-700 rounded-xl text-white" />
                  </div>
                </div>
                {/* Category 1 skills */}
                <div className="p-4 rounded-2xl border border-white/10 bg-white/5">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-white font-semibold">{data.catFullTitle || 'Full-Stack Development'}</h4>
                    <AdminButton onClick={() => setField('itemsFull', [ ...(data.itemsFull || []), { name: '', icon: 'SiJavascript', color: 'text-white', category: 'framework' } ])} className="h-8 px-3 text-xs">Add Skill</AdminButton>
                  </div>
                  <div className="space-y-3">
                    {(data.itemsFull || []).map((it: any, idx: number) => (
                      <div key={idx} className="p-4 rounded-xl border border-gray-700 bg-gray-900/60">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm text-gray-300">Skill #{idx+1}</span>
                          <div className="flex gap-2">
                            <button onClick={()=>{ const list=[...(data.itemsFull||[])]; list[idx]={...list[idx], hidden:!list[idx].hidden}; setField('itemsFull', list as any) }} className={`px-2 py-1 text-xs rounded ${it.hidden? 'bg-gray-800 text-gray-300' : 'bg-gray-600 text-white'} hover:opacity-90`}>{it.hidden? 'Unhide' : 'Hide'}</button>
                            <button onClick={()=>{ const list=[...(data.itemsFull||[])]; if(idx<=0) return; const [m]=list.splice(idx,1); list.splice(idx-1,0,m); setField('itemsFull', list as any) }} className="px-2 py-1 text-xs rounded bg-gray-700 text-white hover:bg-gray-600">Up</button>
                            <button onClick={()=>{ const list=[...(data.itemsFull||[])]; if(idx>=list.length-1) return; const [m]=list.splice(idx,1); list.splice(idx+1,0,m); setField('itemsFull', list as any) }} className="px-2 py-1 text-xs rounded bg-gray-700 text-white hover:bg-gray-600">Down</button>
                            <button onClick={()=>{ const list=[...(data.itemsFull||[])]; list.splice(idx,1); setField('itemsFull', list as any) }} className="px-2 py-1 text-xs rounded bg-red-600 text-white hover:bg-red-500">Remove</button>
                          </div>
                        </div>
                        <div className={`grid grid-cols-1 md:grid-cols-2 gap-3 ${it.hidden? 'pointer-events-none' : ''}`}>
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">Name</label>
                            <input value={it.name || ''} onChange={(e)=>{ const list=[...(data.itemsFull||[])]; list[idx]={...list[idx], name:e.target.value}; setField('itemsFull', list as any) }} className="w-full px-3 py-2 bg-gray-950/60 border border-gray-700 rounded-xl text-white" />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">Icon</label>
                            <input value={it.icon || ''} onChange={(e)=>{ const list=[...(data.itemsFull||[])]; list[idx]={...list[idx], icon:e.target.value}; setField('itemsFull', list as any) }} className="w-full px-3 py-2 bg-gray-950/60 border border-gray-700 rounded-xl text-white" />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">Color</label>
                            <input value={it.color || ''} onChange={(e)=>{ const list=[...(data.itemsFull||[])]; list[idx]={...list[idx], color:e.target.value}; setField('itemsFull', list as any) }} className="w-full px-3 py-2 bg-gray-950/60 border border-gray-700 rounded-xl text-white" />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">Category</label>
                            <input value={it.category || 'framework'} onChange={(e)=>{ const list=[...(data.itemsFull||[])]; list[idx]={...list[idx], category:e.target.value}; setField('itemsFull', list as any) }} className="w-full px-3 py-2 bg-gray-950/60 border border-gray-700 rounded-xl text-white" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Category 2 skills */}
                <div className="p-4 rounded-2xl border border-white/10 bg-white/5">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-white font-semibold">{data.catDataTitle || 'Data Engineering'}</h4>
                    <AdminButton onClick={() => setField('itemsData', [ ...(data.itemsData || []), { name: '', icon: 'FaPython', color: 'text-white', category: 'language' } ])} className="h-8 px-3 text-xs">Add Skill</AdminButton>
                  </div>
                  <div className="space-y-3">
                    {(data.itemsData || []).map((it: any, idx: number) => (
                      <div key={idx} className="p-4 rounded-xl border border-gray-700 bg-gray-900/60">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm text-gray-300">Skill #{idx+1}</span>
                          <div className="flex gap-2">
                            <button onClick={()=>{ const list=[...(data.itemsData||[])]; list[idx]={...list[idx], hidden:!list[idx].hidden}; setField('itemsData', list as any) }} className={`px-2 py-1 text-xs rounded ${it.hidden? 'bg-gray-800 text-gray-300' : 'bg-gray-600 text-white'} hover:opacity-90`}>{it.hidden? 'Unhide' : 'Hide'}</button>
                            <button onClick={()=>{ const list=[...(data.itemsData||[])]; if(idx<=0) return; const [m]=list.splice(idx,1); list.splice(idx-1,0,m); setField('itemsData', list as any) }} className="px-2 py-1 text-xs rounded bg-gray-700 text-white hover:bg-gray-600">Up</button>
                            <button onClick={()=>{ const list=[...(data.itemsData||[])]; if(idx>=list.length-1) return; const [m]=list.splice(idx,1); list.splice(idx+1,0,m); setField('itemsData', list as any) }} className="px-2 py-1 text-xs rounded bg-gray-700 text-white hover:bg-gray-600">Down</button>
                            <button onClick={()=>{ const list=[...(data.itemsData||[])]; list.splice(idx,1); setField('itemsData', list as any) }} className="px-2 py-1 text-xs rounded bg-red-600 text-white hover:bg-red-500">Remove</button>
                          </div>
                        </div>
                        <div className={`grid grid-cols-1 md:grid-cols-2 gap-3 ${it.hidden? 'pointer-events-none' : ''}`}>
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">Name</label>
                            <input value={it.name || ''} onChange={(e)=>{ const list=[...(data.itemsData||[])]; list[idx]={...list[idx], name:e.target.value}; setField('itemsData', list as any) }} className="w-full px-3 py-2 bg-gray-950/60 border border-gray-700 rounded-xl text-white" />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">Icon</label>
                            <input value={it.icon || ''} onChange={(e)=>{ const list=[...(data.itemsData||[])]; list[idx]={...list[idx], icon:e.target.value}; setField('itemsData', list as any) }} className="w-full px-3 py-2 bg-gray-950/60 border border-gray-700 rounded-xl text-white" />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">Color</label>
                            <input value={it.color || ''} onChange={(e)=>{ const list=[...(data.itemsData||[])]; list[idx]={...list[idx], color:e.target.value}; setField('itemsData', list as any) }} className="w-full px-3 py-2 bg-gray-950/60 border border-gray-700 rounded-xl text-white" />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">Category</label>
                            <input value={it.category || 'language'} onChange={(e)=>{ const list=[...(data.itemsData||[])]; list[idx]={...list[idx], category:e.target.value}; setField('itemsData', list as any) }} className="w-full px-3 py-2 bg-gray-950/60 border border-gray-700 rounded-xl text-white" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Category 3 skills */}
                <div className="p-4 rounded-2xl border border-white/10 bg-white/5">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-white font-semibold">{data.catCloudTitle || 'Cloud & DevOps'}</h4>
                    <AdminButton onClick={() => setField('itemsCloud', [ ...(data.itemsCloud || []), { name: '', icon: 'FaAws', color: 'text-white', category: 'cloud' } ])} className="h-8 px-3 text-xs">Add Skill</AdminButton>
                  </div>
                  <div className="space-y-3">
                    {(data.itemsCloud || []).map((it: any, idx: number) => (
                      <div key={idx} className="p-4 rounded-xl border border-gray-700 bg-gray-900/60">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm text-gray-300">Skill #{idx+1}</span>
                          <div className="flex gap-2">
                            <button onClick={()=>{ const list=[...(data.itemsCloud||[])]; list[idx]={...list[idx], hidden:!list[idx].hidden}; setField('itemsCloud', list as any) }} className={`px-2 py-1 text-xs rounded ${it.hidden? 'bg-gray-800 text-gray-300' : 'bg-gray-600 text-white'} hover:opacity-90`}>{it.hidden? 'Unhide' : 'Hide'}</button>
                            <button onClick={()=>{ const list=[...(data.itemsCloud||[])]; if(idx<=0) return; const [m]=list.splice(idx,1); list.splice(idx-1,0,m); setField('itemsCloud', list as any) }} className="px-2 py-1 text-xs rounded bg-gray-700 text-white hover:bg-gray-600">Up</button>
                            <button onClick={()=>{ const list=[...(data.itemsCloud||[])]; if(idx>=list.length-1) return; const [m]=list.splice(idx,1); list.splice(idx+1,0,m); setField('itemsCloud', list as any) }} className="px-2 py-1 text-xs rounded bg-gray-700 text-white hover:bg-gray-600">Down</button>
                            <button onClick={()=>{ const list=[...(data.itemsCloud||[])]; list.splice(idx,1); setField('itemsCloud', list as any) }} className="px-2 py-1 text-xs rounded bg-red-600 text-white hover:bg-red-500">Remove</button>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">Name</label>
                            <input value={it.name || ''} onChange={(e)=>{ const list=[...(data.itemsCloud||[])]; list[idx]={...list[idx], name:e.target.value}; setField('itemsCloud', list as any) }} className="w-full px-3 py-2 bg-gray-950/60 border border-gray-700 rounded-xl text-white" />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">Icon</label>
                            <input value={it.icon || ''} onChange={(e)=>{ const list=[...(data.itemsCloud||[])]; list[idx]={...list[idx], icon:e.target.value}; setField('itemsCloud', list as any) }} className="w-full px-3 py-2 bg-gray-950/60 border border-gray-700 rounded-xl text-white" />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">Color</label>
                            <input value={it.color || ''} onChange={(e)=>{ const list=[...(data.itemsCloud||[])]; list[idx]={...list[idx], color:e.target.value}; setField('itemsCloud', list as any) }} className="w-full px-3 py-2 bg-gray-950/60 border border-gray-700 rounded-xl text-white" />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">Category</label>
                            <input value={it.category || 'cloud'} onChange={(e)=>{ const list=[...(data.itemsCloud||[])]; list[idx]={...list[idx], category:e.target.value}; setField('itemsCloud', list as any) }} className="w-full px-3 py-2 bg-gray-950/60 border border-gray-700 rounded-xl text-white" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Footer social links */}
            {active === 'footer' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-1">GitHub URL</label>
                  <input value={data.github || ''} onChange={(e)=>setField('github', e.target.value)} className="w-full px-3 py-2 bg-gray-900/70 border border-gray-700 rounded-xl text-white" />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">LinkedIn URL</label>
                  <input value={data.linkedin || ''} onChange={(e)=>setField('linkedin', e.target.value)} className="w-full px-3 py-2 bg-gray-900/70 border border-gray-700 rounded-xl text-white" />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Instagram URL</label>
                  <input value={data.instagram || ''} onChange={(e)=>setField('instagram', e.target.value)} className="w-full px-3 py-2 bg-gray-900/70 border border-gray-700 rounded-xl text-white" />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">X/Twitter URL</label>
                  <input value={data.twitter || ''} onChange={(e)=>setField('twitter', e.target.value)} className="w-full px-3 py-2 bg-gray-900/70 border border-gray-700 rounded-xl text-white" />
                </div>
              </div>
            )}
          </div>
          <div className="mt-6 flex gap-2">
            <AdminButton onClick={saveActive} disabled={saving} className="px-4 py-2 disabled:opacity-50">{saving? 'Saving...':'Save Content'}</AdminButton>
            <AdminButton onClick={()=>setContent((prev)=>({ ...prev, [active]: {} }))} className="px-4 py-2">Reset to Default</AdminButton>
          </div>
        </main>
      </div>
    </div>
  )
}


