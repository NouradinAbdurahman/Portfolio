"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { AdminButton } from "@/components/ui/admin-button"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useTheme()

  function handleToggle() {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <div className="relative min-h-screen">
      <div className="fixed top-4 right-4 z-50">
        <AdminButton
          aria-label="Toggle theme"
          className="h-10 w-10 p-0 rounded-full flex items-center justify-center"
          onClick={handleToggle}
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </AdminButton>
      </div>
      {children}
    </div>
  )
}


