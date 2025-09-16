"use client"

import { useEffect, useState } from "react"

type ContentMap = Record<string, any>
let cached: ContentMap | null = null

export function useContent() {
  const [content, setContent] = useState<ContentMap | null>(cached)

  useEffect(() => {
    fetch('/api/content', { cache: 'no-store' as any })
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then((d) => {
        cached = d?.content || {}
        setContent(cached)
      })
      .catch(() => {})
  }, [])

  return content
}

export function useSectionContent<T=any>(section: string, fallback: T): T {
  const all = useContent()
  const stored = (all?.[section] as Record<string, any>) || {}
  return { ...(fallback as any), ...stored } as T
}


