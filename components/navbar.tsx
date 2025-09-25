"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sun, Moon, Menu, X, Download } from "lucide-react"
import { useSettings } from "@/contexts/settings-context"

interface NavbarProps {
  basePath?: string
}

export function Navbar({ basePath = "" }: NavbarProps) {
  const { theme, setTheme } = useTheme()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { settings } = useSettings()

  const href = (hash: string) => `${basePath}${hash}`

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-navbar border-b dark:border-white/10 light:border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-2 sm:py-4">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Link href="/" className="inline-flex items-center select-none cursor-pointer no-select-drag" draggable={false} aria-label="Go to home">
              <span className="text-3xl font-bold dark:text-white text-black no-select-drag" style={{ fontFamily: 'var(--logo-font-family, Lobster), cursive' }}>Nouraddin</span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="hidden md:flex items-center space-x-8"
          >
            <Link aria-label="Go to About section" href={href("#about")} className="dark:text-white/70 text-black hover:text-primary transition-colors" prefetch={false}>About</Link>
            <Link aria-label="Go to Portfolio section" href={href("#portfolio")} className="dark:text-white/70 text-black hover:text-primary transition-colors" prefetch={false}>Portfolio</Link>
            <Link aria-label="Go to Services section" href={href("#services")} className="dark:text-white/70 text-black hover:text-primary transition-colors" prefetch={false}>Services</Link>
            <Link aria-label="Go to Contact section" href={href("#contact")} className="dark:text-white/70 text-black hover:text-primary transition-colors" prefetch={false}>Contact</Link>
            <Link aria-label="Go to Resume section" href={href("#resume")} className="dark:text-white/70 text-black hover:text-primary transition-colors" prefetch={false}>Resume</Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center space-x-4"
          >
            {settings?.show_theme_toggle !== false && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-9 h-9 p-0 dark:text-white text-black hover:bg-muted/50 cursor-pointer"
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            )}
            <Button
              size="sm"
              className="hidden md:inline-flex neumorphic-button dark:text-white text-black hover:text-black dark:bg-transparent bg-white/80 cursor-pointer"
              onClick={() => window.open('/resume/nouraddin-resume.pdf', '_blank')}
            >
              <Download className="w-4 h-4 mr-2" />
              Resume
            </Button>
            <Button
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              variant="ghost"
              size="sm"
              className="md:hidden w-9 h-9 p-0 dark:text-white text-black hover:bg-muted/50 cursor-pointer"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-4 w-4" />
              ) : ((settings?.mobile_menu_icon ?? 'image') === 'image' ? (
                <Image src="/favicon.png" alt="Open menu" width={20} height={20} className="rounded" />
              ) : (
                <Menu className="h-4 w-4" />
              ))}
            </Button>
          </motion.div>
        </div>

        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="md:hidden py-2 sm:py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              <Link href={href("#about")} className="dark:text-muted-foreground text-black hover:text-primary transition-colors" prefetch={false} onClick={() => setIsMobileMenuOpen(false)}>About</Link>
              <Link href={href("#portfolio")} className="dark:text-muted-foreground text-black hover:text-primary transition-colors" prefetch={false} onClick={() => setIsMobileMenuOpen(false)}>Portfolio</Link>
              <Link href={href("#services")} className="dark:text-muted-foreground text-black hover:text-primary transition-colors" prefetch={false} onClick={() => setIsMobileMenuOpen(false)}>Services</Link>
              <Link href={href("#contact")} className="dark:text-muted-foreground text-black hover:text-primary transition-colors" prefetch={false} onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
              <Link href={href("#resume")} className="dark:text-muted-foreground text-black hover:text-primary transition-colors" prefetch={false} onClick={() => setIsMobileMenuOpen(false)}>Resume</Link>
              <Button aria-label="Open resume PDF" size="sm" className="w-fit neumorphic-button dark:text-white text-black hover:text-black dark:bg-transparent bg-white/80 cursor-pointer" onClick={() => window.open('/resume/nouraddin-resume.pdf', '_blank')}>
                <Download className="w-4 h-4 mr-2" />
                Resume
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}

export default Navbar


