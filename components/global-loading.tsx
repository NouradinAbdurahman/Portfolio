"use client"

import { useEffect, useMemo, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import Loading from "./loading"
import { useSettings } from "@/contexts/settings-context"

export function GlobalLoading() {
  const { settings } = useSettings()
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [isNavigating, setIsNavigating] = useState(false)
  const [currentPath, setCurrentPath] = useState("")
  const pathname = usePathname()

  // Decide whether loading is enabled based on settings and network conditions
  const isLoadingEnabled = useMemo(() => {
    if (settings?.loading_always) return true
    if (settings?.loading_smart) {
      const nav = (navigator as any)
      const connection = nav?.connection || nav?.mozConnection || nav?.webkitConnection
      if (!connection) return false
      const effectiveType = connection.effectiveType as string | undefined
      // Consider 2g/slow-2g or saveData as slow
      const saveData = Boolean(connection.saveData)
      if (saveData) return true
      if (!effectiveType) return false
      return ["slow-2g","2g"].includes(effectiveType)
    }
    return false
  }, [settings])

  // Handle initial page load
  useEffect(() => {
    if (!isLoadingEnabled) { setIsInitialLoading(false); return }
    const timer = setTimeout(() => {
      setIsInitialLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [isLoadingEnabled])

  // Handle navigation between pages
  useEffect(() => {
    if (!isLoadingEnabled) { setCurrentPath(pathname || ""); setIsNavigating(false); return }
    if (currentPath && currentPath !== pathname) {
      setIsNavigating(true)
      const timer = setTimeout(() => {
        setIsNavigating(false)
        setCurrentPath(pathname)
      }, 800)

      return () => clearTimeout(timer)
    } else if (!currentPath) {
      setCurrentPath(pathname)
    }
  }, [pathname, currentPath])

  // Show loading if either initial loading or navigating
  if (isInitialLoading || isNavigating) {
    return (
      <div className="fixed inset-0 z-50">
        <Loading />
      </div>
    )
  }

  return null
}
