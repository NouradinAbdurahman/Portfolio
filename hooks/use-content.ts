"use client"

import { useEffect, useState, useCallback } from "react"
import { getSupabaseBrowserClient } from "@/lib/supabaseClient"

type ContentMap = Record<string, unknown>

export function useContent() {
  const [content, setContent] = useState<ContentMap | null>(null)
  const [lastFetch, setLastFetch] = useState<number>(0)

  const loadContent = useCallback(async () => {
    try {
      const response = await fetch('/api/content', { 
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setContent(data?.content || {})
        setLastFetch(Date.now())
      }
    } catch (error) {
      console.error('Failed to fetch content:', error)
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      if (cancelled) return
      try {
        const response = await fetch('/api/content', { 
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        })
        
        if (response.ok && !cancelled) {
          const data = await response.json()
          setContent(data?.content || {})
          setLastFetch(Date.now())
        }
      } catch (error) {
        console.error('Failed to fetch content:', error)
      }
    }

    // Initial load only - NO automatic refreshes
    load()

    return () => { 
      cancelled = true
    }
  }, []) // Empty dependency array - only runs once on mount

  return { content, refreshContent: loadContent, lastFetch }
}

export function useSectionContent<T=unknown>(section: string, fallback: T): T {
  const { content } = useContent()
  const stored = (content?.[section] as Record<string, unknown>) || {}
  return { ...(fallback as Record<string, unknown>), ...stored } as T
}


