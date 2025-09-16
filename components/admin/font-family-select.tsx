"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"

interface GoogleFontItem {
  family: string
  category?: string
  subsets?: string[]
}

interface FontFamilySelectProps {
  label: string
  value: string
  onChange: (val: string) => void
  defaultText?: string
}

export function FontFamilySelect({ label, value, onChange, defaultText }: FontFamilySelectProps) {
  const [fonts, setFonts] = useState<GoogleFontItem[]>([])
  const [loading, setLoading] = useState(false)
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_FONTS_API_KEY

  useEffect(() => {
    let cancelled = false
    async function run() {
      if (!apiKey) return
      setLoading(true)
      try {
        const res = await fetch(`https://www.googleapis.com/webfonts/v1/webfonts?sort=trending&key=${apiKey}`)
        const data = await res.json()
        if (cancelled) return
        const itemsRaw: GoogleFontItem[] = (data.items || []).map((i: any) => ({ family: i.family, category: i.category, subsets: i.subsets }))
        // Keep fonts that support latin so preview text renders correctly
        const items = itemsRaw.filter((i) => (i.subsets || []).some((s) => s === 'latin' || s === 'latin-ext')).slice(0, 60)
        setFonts(items)

        // Batch load previews in one stylesheet
        const familiesParam = items.map((f) => `family=${encodeURIComponent(f.family)}:wght@300;400;600`).join("&")
        const href = `https://fonts.googleapis.com/css2?${familiesParam}&subset=latin,latin-ext&display=swap`
        const id = "gf-previews"
        if (!document.getElementById(id)) {
          const link = document.createElement("link")
          link.id = id
          link.rel = "stylesheet"
          link.href = href
          document.head.appendChild(link)
        }
      } catch (e) {
        // ignore
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    run()
    return () => { cancelled = true }
  }, [apiKey])

  const fallbackFonts = useMemo<GoogleFontItem[]>(() => (
    [
      { family: "Inter" },
      { family: "Roboto" },
      { family: "Poppins" },
      { family: "Open Sans" },
      { family: "Montserrat" },
      { family: "Lato" },
      { family: "Source Sans 3" },
      { family: "Nunito" },
      { family: "Fira Sans" },
      { family: "Rubik" },
      { family: "Merriweather" },
      { family: "Work Sans" },
      { family: "DM Sans" },
      { family: "Manrope" },
    ]
  ), [])

  const list = fonts.length > 0 ? fonts : fallbackFonts
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const [triggerWidth, setTriggerWidth] = useState<number>(420)

  useEffect(() => {
    const el = triggerRef.current
    if (!el) return
    const measure = () => setTriggerWidth(el.offsetWidth)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="block text-sm font-medium text-gray-300">{label}</label>
        {defaultText ? <span className="text-xs text-muted-foreground">{defaultText}</span> : null}
      </div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button ref={triggerRef} type="button" className="w-full flex items-center justify-between bg-gray-900/70 border border-gray-700 text-white rounded-xl px-3 py-2">
            <span style={{ fontFamily: `'${value}', system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif` }}>
              {value || "Choose font"}
            </span>
            <span className="opacity-60 text-xs">▼</span>
          </button>
        </PopoverTrigger>
        <PopoverContent className="p-0 bg-gray-900/95 border-gray-700 text-white" style={{ width: triggerWidth }} sideOffset={8} align="start">
          <Command>
            <CommandInput placeholder="Search Google Fonts..." className="placeholder:text-gray-400" />
            <CommandList className="max-h-72">
              <CommandEmpty>No fonts found.</CommandEmpty>
              <CommandGroup heading="Trending (Google Fonts)">
                {list.map((f) => (
                  <CommandItem key={f.family} value={f.family} onSelect={(v) => { onChange(v); setOpen(false) }}>
                    <span style={{ fontFamily: `'${f.family}', system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif` }}>
                      {f.family} • Everyone has the right to freedom of thought
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {loading && <div className="mt-1 text-xs text-gray-400">Loading Google Fonts…</div>}
    </div>
  )
}


