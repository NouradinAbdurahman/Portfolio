"use client"

import { useEffect, useState, useCallback } from "react"
import { useLocale } from "next-intl"
import { clientTranslationService } from "@/lib/client-translation-service"

interface UseSupabaseTranslationsOptions {
  autoRefresh?: boolean
  refreshInterval?: number
}

interface TranslationCache {
  [locale: string]: {
    translations: Record<string, string>
    lastFetch: number
  }
}

// Global cache to prevent duplicate requests
const globalCache: TranslationCache = {}
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

export function useSupabaseTranslations(options: UseSupabaseTranslationsOptions = {}) {
  const { autoRefresh = false, refreshInterval = 30000 } = options
  const locale = useLocale()
  const [translations, setTranslations] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTranslations = useCallback(async (forceRefresh = false) => {
    try {
      setError(null)
      
      // Check cache first
      const cacheKey = locale
      const cached = globalCache[cacheKey]
      const now = Date.now()
      
      if (!forceRefresh && cached && (now - cached.lastFetch) < CACHE_DURATION) {
        setTranslations(cached.translations)
        setLoading(false)
        return
      }

      setLoading(true)
      const fetchedTranslations = await clientTranslationService.getTranslationsForLocale(locale)
      
      // Update cache
      globalCache[cacheKey] = {
        translations: fetchedTranslations,
        lastFetch: now
      }
      
      setTranslations(fetchedTranslations)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch translations'
      setError(errorMessage)
      console.error('Error fetching translations:', err)
    } finally {
      setLoading(false)
    }
  }, [locale])

  // Initial fetch
  useEffect(() => {
    fetchTranslations()
  }, [fetchTranslations])

  // Auto-refresh if enabled
  useEffect(() => {
    if (!autoRefresh) return

    const interval = setInterval(() => {
      fetchTranslations()
    }, refreshInterval)

    return () => clearInterval(interval)
  }, [autoRefresh, refreshInterval, fetchTranslations])

  // Function to get a specific translation with fallback
  const t = useCallback((key: string, fallback?: string): string => {
    return translations[key] || fallback || key
  }, [translations])

  // Function to refresh translations manually
  const refresh = useCallback(() => {
    return fetchTranslations(true)
  }, [fetchTranslations])

  // Function to clear cache
  const clearCache = useCallback(() => {
    delete globalCache[locale]
    setTranslations({})
  }, [locale])

  return {
    t,
    translations,
    loading,
    error,
    refresh,
    clearCache,
    locale
  }
}

// Hook for getting a single translation
export function useTranslation(key: string, fallback?: string) {
  const { t } = useSupabaseTranslations()
  return t(key, fallback)
}

// Hook for getting multiple translations at once
export function useTranslations(keys: string[], fallbacks?: Record<string, string>) {
  const { t } = useSupabaseTranslations()
  
  return keys.reduce((acc, key) => {
    acc[key] = t(key, fallbacks?.[key])
    return acc
  }, {} as Record<string, string>)
}

// Hook for getting section translations
export function useSectionTranslations(section: string) {
  const { t } = useSupabaseTranslations()
  
  return useCallback((key: string, fallback?: string) => {
    return t(`${section}.${key}`, fallback)
  }, [t, section])
}

// Hook for getting nested translations (e.g., projects.items.project-name.title)
export function useNestedTranslations(baseKey: string) {
  const { t } = useSupabaseTranslations()
  
  return useCallback((key: string, fallback?: string) => {
    return t(`${baseKey}.${key}`, fallback)
  }, [t, baseKey])
}

