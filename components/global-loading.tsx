"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import Loading from "./loading"

export function GlobalLoading() {
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [isNavigating, setIsNavigating] = useState(false)
  const [currentPath, setCurrentPath] = useState("")
  const pathname = usePathname()

  // Handle initial page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false)
    }, 2500) // Show for 2.5 seconds on initial load

    return () => clearTimeout(timer)
  }, [])

  // Handle navigation between pages
  useEffect(() => {
    if (currentPath && currentPath !== pathname) {
      setIsNavigating(true)
      const timer = setTimeout(() => {
        setIsNavigating(false)
        setCurrentPath(pathname)
      }, 1200) // Show for 1.2 seconds during navigation

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
