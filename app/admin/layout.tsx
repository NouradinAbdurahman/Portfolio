"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { AdminButton } from "@/components/ui/admin-button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { usePathname } from "next/navigation"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()
  const showToolbar = pathname !== "/admin/dashboard"
  const pageTitle = React.useMemo(() => {
    if (!pathname) return ''
    if (pathname.startsWith('/admin/settings')) return 'Site Settings'
    if (pathname.startsWith('/admin/content')) return 'Site Content'
    if (pathname.startsWith('/admin/login')) return 'Admin Login'
    return 'Admin'
  }, [pathname])

  function handleToggle() {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <div className="relative min-h-screen">
      {/* Top toolbar: left slot for page back button, right for theme toggle */}
      {showToolbar && (
        <div className="w-full py-4 px-4 flex items-center justify-between">
          {/* Go Back button (left) */}
          <AdminButton asChild>
            <Link href="/admin/dashboard" className="inline-flex items-center gap-2">
              <ArrowLeft className="size-4" />
              Go Back
            </Link>
          </AdminButton>
          {/* Page title (center) */}
          <div className="flex-1 text-center">
            <span className="text-sm md:text-base font-semibold dark:text-white text-gray-900">
              {pageTitle}
            </span>
          </div>
          <AdminButton
            aria-label="Toggle theme"
            className="h-10 w-10 p-0 rounded-full flex items-center justify-center"
            onClick={handleToggle}
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </AdminButton>
        </div>
      )}
      {children}
    </div>
  )
}


