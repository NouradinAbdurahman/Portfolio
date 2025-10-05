"use client"

import { useState, useEffect } from 'react'
import { TechBadge } from '@/components/ui/tech-badge'

export function TechnicalSkillsManager(): JSX.Element {
  type EditableSkill = { name: string; icon?: string; color?: string; hidden?: boolean }
  type ExtraCard = { id: string; title: string; description: string; items: EditableSkill[] }
  const [preview, setPreview] = useState<{ title: string; subtitle: string; itemsFull: EditableSkill[]; itemsData: EditableSkill[]; itemsCloud: EditableSkill[]; catFullTitle?: string; catFullDesc?: string; catDataTitle?: string; catDataDesc?: string; catCloudTitle?: string; catCloudDesc?: string; catFullHidden?: boolean; catDataHidden?: boolean; catCloudHidden?: boolean; extraCards?: ExtraCard[] }>({ title: 'Technical Skills', subtitle: 'Technologies and tools I work with', itemsFull: [], itemsData: [], itemsCloud: [], extraCards: [], catFullHidden: false, catDataHidden: false, catCloudHidden: false })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch('/api/content', { cache: 'no-store' })
        if (!res.ok) return
        const data = (await res.json()) as { content?: Record<string, unknown> }
        const skills = (data?.content as Record<string, unknown>)?.['skills'] as Record<string, unknown> | undefined || {}
        setPreview({
          title: (skills['title'] as string) || 'Technical Skills',
          subtitle: (skills['lead'] as string) || 'Technologies and tools I work with',
          itemsFull: Array.isArray(skills['itemsFull']) ? (skills['itemsFull'] as EditableSkill[]) : [],
          itemsData: Array.isArray(skills['itemsData']) ? (skills['itemsData'] as EditableSkill[]) : [],
          itemsCloud: Array.isArray(skills['itemsCloud']) ? (skills['itemsCloud'] as EditableSkill[]) : [],
          catFullTitle: (skills['catFullTitle'] as string) || 'Full-Stack Development',
          catFullDesc: (skills['catFullDesc'] as string) || 'React, Next.js, Flutter, Node.js',
          catDataTitle: (skills['catDataTitle'] as string) || 'Data Engineering',
          catDataDesc: (skills['catDataDesc'] as string) || 'ETL Pipelines, SQL, Python, Analytics',
          catCloudTitle: (skills['catCloudTitle'] as string) || 'Cloud & DevOps',
          catCloudDesc: (skills['catCloudDesc'] as string) || 'AWS, Firebase, Automation, CI/CD',
          extraCards: Array.isArray(skills['extraCards']) ? (skills['extraCards'] as ExtraCard[]) : [],
          catFullHidden: Boolean(skills['catFullHidden']),
          catDataHidden: Boolean(skills['catDataHidden']),
          catCloudHidden: Boolean(skills['catCloudHidden'])
        })
      } catch {}
    })()
  }, [])

  function updateField(path: 'catFullTitle'|'catFullDesc'|'catDataTitle'|'catDataDesc'|'catCloudTitle'|'catCloudDesc'|'title'|'subtitle', value: string) {
    setPreview((p) => ({ ...p, [path]: value }))
  }

  function updateSkill(listKey: 'itemsFull'|'itemsData'|'itemsCloud', index: number, field: 'name'|'icon'|'color'|'hidden', value: string | boolean) {
    setPreview((p) => {
      const list = [...(p[listKey] || [])]
      const cur = { ...(list[index] || {}) } as EditableSkill
      ;(cur as Record<string, unknown>)[field] = value as unknown
      list[index] = cur
      return { ...p, [listKey]: list }
    })
  }

  function addSkill(listKey: 'itemsFull'|'itemsData'|'itemsCloud') {
    setPreview((p) => ({
      ...p,
      [listKey]: [ ...(p[listKey] || []), { name: '', icon: '', color: 'text-white', hidden: false } ]
    }))
  }

  function removeSkill(listKey: 'itemsFull'|'itemsData'|'itemsCloud', index: number) {
    setPreview((p) => ({
      ...p,
      [listKey]: (p[listKey] || []).filter((_: unknown, i: number) => i !== index)
    }))
  }

  function addCard() {
    setPreview((p) => ({
      ...p,
      extraCards: [ ...(p.extraCards || []), { id: `card-${Date.now()}`, title: 'New Card', description: '', items: [] as EditableSkill[] } ]
    }))
  }

  function updateExtraCardTitle(idx: number, field: 'title'|'description', value: string) {
    setPreview((p) => {
      const cards = [...(p.extraCards || [])]
      const cur = { ...(cards[idx] || {}) } as ExtraCard
      ;(cur as Record<string, unknown>)[field] = value
      cards[idx] = cur
      return { ...p, extraCards: cards }
    })
  }

  function addExtraCardSkill(idx: number) {
    setPreview((p) => {
      const cards = [...(p.extraCards || [])]
      const cur = { ...(cards[idx] || {}) } as ExtraCard
      const items: EditableSkill[] = Array.isArray(cur.items) ? [...cur.items] : []
      items.push({ name: '', icon: '', color: 'text-white', hidden: false })
      cur.items = items
      cards[idx] = cur
      return { ...p, extraCards: cards }
    })
  }

  function updateExtraCardSkill(idx: number, sIdx: number, field: 'name'|'icon'|'color'|'hidden', value: string | boolean) {
    setPreview((p) => {
      const cards = [...(p.extraCards || [])]
      const cur = { ...(cards[idx] || {}) } as ExtraCard
      const items: EditableSkill[] = Array.isArray(cur.items) ? [...cur.items] : []
      const s: EditableSkill = { ...(items[sIdx] || {}) }
      ;(s as Record<string, unknown>)[field] = value
      items[sIdx] = s
      cur.items = items
      cards[idx] = cur
      return { ...p, extraCards: cards }
    })
  }

  function removeExtraCard(idx: number) {
    setPreview((p) => ({ ...p, extraCards: (p.extraCards || []).filter((_: unknown, i: number) => i !== idx) }))
  }

  async function saveSkills() {
    setSaving(true)
    try {
      const body = {
        title: preview.title,
        lead: preview.subtitle,
        catFullTitle: preview.catFullTitle,
        catFullDesc: preview.catFullDesc,
        catFullHidden: preview.catFullHidden,
        catDataTitle: preview.catDataTitle,
        catDataDesc: preview.catDataDesc,
        catDataHidden: preview.catDataHidden,
        catCloudTitle: preview.catCloudTitle,
        catCloudDesc: preview.catCloudDesc,
        catCloudHidden: preview.catCloudHidden,
        itemsFull: preview.itemsFull,
        itemsData: preview.itemsData,
        itemsCloud: preview.itemsCloud,
        extraCards: preview.extraCards || []
      }
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section: 'skills', content: body })
      })
      if (!res.ok) throw new Error('Save failed')
      try {
        if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
          const bc = new BroadcastChannel('translations-sync')
          bc.postMessage({ type: 'translations-updated', section: 'skills' })
          bc.close()
        }
      } catch {}
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-gray-300 dark:border-gray-700 p-4 bg-white/60 dark:bg-black/30">
        <div className="mb-4 space-y-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Technical Skills Preview (matches main page)</h3>
          <p className="text-xs text-gray-600 dark:text-gray-400">This section mirrors the public Skills section. Edit content and save below.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <input
              value={preview.title || ''}
              onChange={(e)=>updateField('title', e.target.value)}
              className="w-full px-3 py-2 rounded border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-900/60 text-sm"
              placeholder="Section Title"
            />
            <input
              value={preview.subtitle || ''}
              onChange={(e)=>updateField('subtitle', e.target.value)}
              className="w-full px-3 py-2 rounded border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-900/60 text-sm"
              placeholder="Section Subtitle"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-900/50 overflow-hidden">
            <div className="flex items-center gap-2 mb-2">
              <input value={preview.catFullTitle || ''} onChange={(e)=>updateField('catFullTitle', e.target.value)} className="w-full text-sm font-semibold bg-transparent outline-none" placeholder="Full-Stack Development" />
              <button onClick={()=>setPreview(p=>({...p, catFullHidden: !p.catFullHidden}))} className={`text-xs px-2 py-1 rounded ${preview.catFullHidden? 'bg-gray-700 text-white':'bg-emerald-600 text-white'}`}>{preview.catFullHidden? 'Unhide':'Hide'}</button>
            </div>
            <input value={preview.catFullDesc || ''} onChange={(e)=>updateField('catFullDesc', e.target.value)} className="w-full text-xs text-gray-600 dark:text-gray-400 mb-3 bg-transparent outline-none" placeholder="React, Next.js, Flutter, Node.js" />
            {preview.catFullHidden? (
              <div className="text-xs text-gray-500 italic">Category hidden</div>
            ) : null}
            <div className="flex flex-col gap-2">
              {preview.itemsFull.map((s, i)=> (
                <div key={`full-${i}`} className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2 w-full ${s.hidden? 'opacity-60 grayscale' : ''}`}> 
                  <div className="col-span-1 flex items-center"><TechBadge name={s.name} icon={s.icon} color={s.color} size="sm" /></div>
                  <input value={s.name||''} onChange={(e)=>updateSkill('itemsFull', i, 'name', e.target.value)} className="col-span-1 lg:col-span-1 px-2 py-1 rounded bg-black/10 dark:bg-white/10 text-xs" placeholder="Name" />
                  <input value={s.icon||''} onChange={(e)=>updateSkill('itemsFull', i, 'icon', e.target.value)} className="col-span-1 lg:col-span-2 px-2 py-1 rounded bg-black/10 dark:bg-white/10 text-xs" placeholder="Icon e.g. SiReact" />
                  <input value={s.color||''} onChange={(e)=>updateSkill('itemsFull', i, 'color', e.target.value)} className="col-span-1 lg:col-span-1 px-2 py-1 rounded bg-black/10 dark:bg-white/10 text-xs" placeholder="Tailwind color" />
                  <div className="col-span-1 flex gap-2 justify-end">
                    <button onClick={()=>updateSkill('itemsFull', i, 'hidden', !s.hidden)} className="text-xs px-2 py-1 rounded bg-gray-700 text-white">{s.hidden? 'Show' : 'Hide'}</button>
                    <button onClick={()=>removeSkill('itemsFull', i)} className="text-xs px-2 py-1 rounded bg-red-600 text-white">Remove</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-2">
              <button onClick={()=>addSkill('itemsFull')} className="text-xs px-2 py-1 rounded bg-blue-600 text-white">Add Skill</button>
            </div>
          </div>
          <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-900/50 overflow-hidden">
            <div className="flex items-center gap-2 mb-2">
              <input value={preview.catDataTitle || ''} onChange={(e)=>updateField('catDataTitle', e.target.value)} className="w-full text-sm font-semibold bg-transparent outline-none" placeholder="Data Engineering" />
              <button onClick={()=>setPreview(p=>({...p, catDataHidden: !p.catDataHidden}))} className={`text-xs px-2 py-1 rounded ${preview.catDataHidden? 'bg-gray-700 text-white':'bg-emerald-600 text-white'}`}>{preview.catDataHidden? 'Unhide':'Hide'}</button>
            </div>
            <input value={preview.catDataDesc || ''} onChange={(e)=>updateField('catDataDesc', e.target.value)} className="w-full text-xs text-gray-600 dark:text-gray-400 mb-3 bg-transparent outline-none" placeholder="ETL Pipelines, SQL, Python, Analytics" />
            {preview.catDataHidden? (
              <div className="text-xs text-gray-500 italic">Category hidden</div>
            ) : null}
            <div className="flex flex-col gap-2">
              {preview.itemsData.map((s, i)=> (
                <div key={`data-${i}`} className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2 w-full ${s.hidden? 'opacity-60 grayscale' : ''}`}> 
                  <div className="col-span-1 flex items-center"><TechBadge name={s.name} icon={s.icon} color={s.color} size="sm" /></div>
                  <input value={s.name||''} onChange={(e)=>updateSkill('itemsData', i, 'name', e.target.value)} className="col-span-1 lg:col-span-1 px-2 py-1 rounded bg-black/10 dark:bg-white/10 text-xs" placeholder="Name" />
                  <input value={s.icon||''} onChange={(e)=>updateSkill('itemsData', i, 'icon', e.target.value)} className="col-span-1 lg:col-span-2 px-2 py-1 rounded bg-black/10 dark:bg-white/10 text-xs" placeholder="Icon" />
                  <input value={s.color||''} onChange={(e)=>updateSkill('itemsData', i, 'color', e.target.value)} className="col-span-1 lg:col-span-1 px-2 py-1 rounded bg-black/10 dark:bg-white/10 text-xs" placeholder="Color" />
                  <div className="col-span-1 flex gap-2 justify-end">
                    <button onClick={()=>updateSkill('itemsData', i, 'hidden', !s.hidden)} className="text-xs px-2 py-1 rounded bg-gray-700 text-white">{s.hidden? 'Show' : 'Hide'}</button>
                    <button onClick={()=>removeSkill('itemsData', i)} className="text-xs px-2 py-1 rounded bg-red-600 text-white">Remove</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-2">
              <button onClick={()=>addSkill('itemsData')} className="text-xs px-2 py-1 rounded bg-blue-600 text-white">Add Skill</button>
            </div>
          </div>
          <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-900/50 overflow-hidden">
            <div className="flex items-center gap-2 mb-2">
              <input value={preview.catCloudTitle || ''} onChange={(e)=>updateField('catCloudTitle', e.target.value)} className="w-full text-sm font-semibold bg-transparent outline-none" placeholder="Cloud & DevOps" />
              <button onClick={()=>setPreview(p=>({...p, catCloudHidden: !p.catCloudHidden}))} className={`text-xs px-2 py-1 rounded ${preview.catCloudHidden? 'bg-gray-700 text-white':'bg-emerald-600 text-white'}`}>{preview.catCloudHidden? 'Unhide':'Hide'}</button>
            </div>
            <input value={preview.catCloudDesc || ''} onChange={(e)=>updateField('catCloudDesc', e.target.value)} className="w-full text-xs text-gray-600 dark:text-gray-400 mb-3 bg-transparent outline-none" placeholder="AWS, Firebase, Automation, CI/CD" />
            {preview.catCloudHidden? (
              <div className="text-xs text-gray-500 italic">Category hidden</div>
            ) : null}
            <div className="flex flex-col gap-2">
              {preview.itemsCloud.map((s, i)=> (
                <div key={`cloud-${i}`} className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2 w-full ${s.hidden? 'opacity-60 grayscale' : ''}`}> 
                  <div className="col-span-1 flex items-center"><TechBadge name={s.name} icon={s.icon} color={s.color} size="sm" /></div>
                  <input value={s.name||''} onChange={(e)=>updateSkill('itemsCloud', i, 'name', e.target.value)} className="col-span-1 lg:col-span-1 px-2 py-1 rounded bg-black/10 dark:bg-white/10 text-xs" placeholder="Name" />
                  <input value={s.icon||''} onChange={(e)=>updateSkill('itemsCloud', i, 'icon', e.target.value)} className="col-span-1 lg:col-span-2 px-2 py-1 rounded bg-black/10 dark:bg-white/10 text-xs" placeholder="Icon" />
                  <input value={s.color||''} onChange={(e)=>updateSkill('itemsCloud', i, 'color', e.target.value)} className="col-span-1 lg:col-span-1 px-2 py-1 rounded bg-black/10 dark:bg-white/10 text-xs" placeholder="Color" />
                  <div className="col-span-1 flex gap-2 justify-end">
                    <button onClick={()=>updateSkill('itemsCloud', i, 'hidden', !s.hidden)} className="text-xs px-2 py-1 rounded bg-gray-700 text-white">{s.hidden? 'Show' : 'Hide'}</button>
                    <button onClick={()=>removeSkill('itemsCloud', i)} className="text-xs px-2 py-1 rounded bg-red-600 text-white">Remove</button>
                  </div>
                </div>
              ))}
                  </div>
            <div className="mt-2">
              <button onClick={()=>addSkill('itemsCloud')} className="text-xs px-2 py-1 rounded bg-blue-600 text-white">Add Skill</button>
                    </div>
                  </div>
                  </div>
        <div className="mt-3 text-xs text-gray-600 dark:text-gray-400">You can edit titles, descriptions, icons, and colors. Add or remove skills as needed. Category-level Hide respects admin flags.</div>
        <div className="mt-4 flex gap-2">
          <button onClick={saveSkills} className="px-3 py-2 rounded bg-emerald-600 text-white text-sm disabled:opacity-50" disabled={saving}>{saving? 'Saving…' : 'Save Skills'}</button>
          <button onClick={addCard} className="px-3 py-2 rounded bg-indigo-600 text-white text-sm">Add Card</button>
                  </div>
                </div>
      {(preview.extraCards || []).map((card, idx)=> (
        <div key={card.id || idx} className="rounded-xl border border-gray-300 dark:border-gray-700 p-4 bg-white/60 dark:bg-black/30">
          <div className="flex items-center justify-between mb-3">
            <input value={card.title||''} onChange={(e)=>updateExtraCardTitle(idx,'title',e.target.value)} className="text-sm font-semibold bg-transparent outline-none" placeholder="Card title" />
            <button onClick={()=>removeExtraCard(idx)} className="text-xs px-2 py-1 rounded bg-red-600 text-white">Remove Card</button>
          </div>
          <input value={card.description||''} onChange={(e)=>updateExtraCardTitle(idx,'description',e.target.value)} className="w-full text-xs text-gray-600 dark:text-gray-400 mb-2 bg-transparent outline-none" placeholder="Description" />
          <div className="space-y-2">
            {(card.items||[]).map((s, sIdx)=> (
              <div key={sIdx} className="flex items-center gap-2">
                <TechBadge name={s.name} icon={s.icon} color={s.color} size="sm" />
                <input value={s.name||''} onChange={(e)=>updateExtraCardSkill(idx, sIdx, 'name', e.target.value)} className="px-2 py-1 rounded bg-black/10 dark:bg-white/10 text-xs" placeholder="Name" />
                <input value={s.icon||''} onChange={(e)=>updateExtraCardSkill(idx, sIdx, 'icon', e.target.value)} className="px-2 py-1 rounded bg-black/10 dark:bg-white/10 text-xs" placeholder="Icon" />
                <input value={s.color||''} onChange={(e)=>updateExtraCardSkill(idx, sIdx, 'color', e.target.value)} className="px-2 py-1 rounded bg-black/10 dark:bg-white/10 text-xs" placeholder="Color" />
              </div>
            ))}
            <button onClick={()=>addExtraCardSkill(idx)} className="text-xs px-2 py-1 rounded bg-blue-600 text-white">Add Skill</button>
          </div>
          <div className="mt-3 text-xs text-amber-500">Note: Extra cards are saved under skills.extraCards. The public site currently renders the first three cards.</div>
        </div>
      ))}
    </div>
  )
}
