"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useLocale } from "next-intl"
import { Button } from "@/components/ui/button"
import { Globe, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { MixedContent } from "@/lib/rtl-utils"

const locales = [
  { code: "en", label: "English", flag: "🇺🇸", short: "EN", isDefault: true },
  { code: "ar", label: "العربية", flag: "🇸🇦", short: "AR" },
  { code: "tr", label: "Türkçe", flag: "🇹🇷", short: "TR" },
  { code: "it", label: "Italiano", flag: "🇮🇹", short: "IT" },
  { code: "fr", label: "Français", flag: "🇫🇷", short: "FR" },
  { code: "de", label: "Deutsch", flag: "🇩🇪", short: "DE" }
]

export function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const [dropdownPosition, setDropdownPosition] = useState<'left' | 'right' | 'center'>('right')
  const pathname = usePathname()
  const router = useRouter()
  const locale = useLocale()
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const isRTL = locale === 'ar'

  // Use the actual locale from next-intl instead of managing separate state
  const currentLocale = locale || 'en'

  // Calculate optimal dropdown position
  const calculateDropdownPosition = useCallback(() => {
    if (!buttonRef.current) return 'right'
    
    const buttonRect = buttonRef.current.getBoundingClientRect()
    const viewportWidth = window.innerWidth
    const dropdownWidth = 192 // w-48 = 12rem = 192px
    const margin = 16 // 16px margin from viewport edges
    
    // Check if dropdown would overflow on the right
    const wouldOverflowRight = buttonRect.right + dropdownWidth > viewportWidth - margin
    // Check if dropdown would overflow on the left
    const wouldOverflowLeft = buttonRect.left - dropdownWidth < margin
    
    // For RTL, prefer left alignment to avoid going off-screen
    if (isRTL) {
      if (wouldOverflowLeft && !wouldOverflowRight) {
        return 'right' // Use right if left would overflow
      } else {
        return 'left' // Default to left for RTL
      }
    } else {
      // For LTR, use right alignment by default
      if (wouldOverflowRight && wouldOverflowLeft) {
        return 'center' // Center if both sides would overflow
      } else if (wouldOverflowRight) {
        return 'left' // Align left if right would overflow
      } else {
        return 'right' // Default to right alignment for LTR
      }
    }
  }, [isRTL])

  // Update dropdown position when opening or when window resizes
  useEffect(() => {
    if (isOpen) {
      // Add a small delay to ensure the dropdown is rendered before calculating position
      const timer = setTimeout(() => {
        const position = calculateDropdownPosition()
        console.log('Dropdown position calculated:', position, 'isRTL:', isRTL, 'locale:', locale)
        setDropdownPosition(position)
      }, 10)
      
      return () => clearTimeout(timer)
    }
  }, [isOpen, calculateDropdownPosition, isRTL, locale])

  // Recalculate position on window resize
  useEffect(() => {
    const handleResize = () => {
      if (isOpen) {
        const position = calculateDropdownPosition()
        setDropdownPosition(position)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isOpen, calculateDropdownPosition])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Always render the same structure to prevent hydration mismatch
  const currentLocaleData = locales.find(l => l.code === currentLocale) || locales.find(l => l.isDefault) || locales[0]

  const getLocalizedPath = (newLocale: string) => {
    if (!pathname) return `/${newLocale}`
    const segments = pathname.split("/")
    if (segments.length > 1 && locales.some(l => l.code === segments[1])) {
      segments[1] = newLocale
    } else {
      segments.splice(1, 0, newLocale)
    }
    return segments.join("/")
  }

  const handleLocaleChange = (newLocale: string) => {
    setIsOpen(false)
    const newPath = getLocalizedPath(newLocale)
    router.push(newPath)
    
    // Persist selection in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-locale', newLocale)
      try {
        if ('BroadcastChannel' in window) {
          const bc = new BroadcastChannel('translations-sync')
          // Notify all tabs/components to clear cached translations so the next page shows correct locale
          bc.postMessage({ type: 'translations-cleared' })
          bc.close()
        }
      } catch {}
    }
  }

  return (
    <div className="language-switcher relative z-[100] min-w-0 flex-shrink-0">
      <div className="relative" ref={dropdownRef}>
        <Button 
          ref={buttonRef}
          variant="outline" 
          size="sm" 
          className="gap-2 bg-white/80 dark:bg-transparent border-gray-200 dark:border-white/20 hover:bg-gray-50 dark:hover:bg-white/10 text-gray-900 dark:text-white transition-all duration-200 cursor-pointer select-none active:scale-95 backdrop-blur-sm shadow-sm hover:shadow-md neumorphic-button"
          type="button"
          onClick={() => {
            console.log('Language switcher clicked, isOpen:', isOpen)
            setIsOpen(!isOpen)
          }}
        >
          <Globe className="w-4 h-4 pointer-events-none" />
          <span className="hidden sm:inline pointer-events-none">
            {currentLocaleData?.short}
          </span>
          <span className="sm:hidden pointer-events-none">
            {currentLocaleData?.flag}
          </span>
        </Button>
        
        {isOpen && (
          <div className={cn(
            "absolute top-full mt-2 w-48 bg-white/95 dark:bg-gray-900/95 border border-gray-200 dark:border-white/20 rounded-lg shadow-xl z-[100] backdrop-blur-md",
            // Dynamic positioning based on calculated position
            dropdownPosition === 'left' && "left-0",
            dropdownPosition === 'right' && "right-0",
            dropdownPosition === 'center' && "left-1/2 transform -translate-x-1/2",
            // Ensure dropdown doesn't go off-screen on small devices
            "max-w-[calc(100vw-2rem)] sm:max-w-none",
            // Fallback: if no position is set, use right alignment
            !dropdownPosition && "right-0"
          )}>
            {locales.map((localeOption) => (
              <button
                key={localeOption.code}
                onClick={() => {
                  console.log('Language selected:', localeOption.code)
                  handleLocaleChange(localeOption.code)
                }}
                className={cn(
                  "w-full flex items-center justify-between cursor-pointer hover:bg-gray-100 dark:hover:bg-white/10 transition-all duration-200 px-3 py-2 rounded-md first:rounded-t-lg last:rounded-b-lg text-gray-900 dark:text-white",
                  isRTL ? "text-right" : "text-left",
                  currentLocale === localeOption.code && "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                )}
              >
                <div className={cn(
                  "flex items-center gap-3",
                  isRTL && "flex-row-reverse"
                )}>
                  <span className="text-lg">{localeOption.flag}</span>
                  <span className="font-medium"><MixedContent text={localeOption.label} isRTL={isRTL} /></span>
                </div>
                {currentLocale === localeOption.code && (
                  <Check className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// Alternative simple version for mobile
export function LanguageSwitcherSimple() {
  const pathname = usePathname()
  const router = useRouter()
  const locale = useLocale()

  // Use the actual locale from next-intl instead of managing separate state
  const currentLocale = locale || 'en'

  const getLocalizedPath = (newLocale: string) => {
    if (!pathname) return `/${newLocale}`
    const segments = pathname.split("/")
    if (segments.length > 1 && locales.some(l => l.code === segments[1])) {
      segments[1] = newLocale
    } else {
      segments.splice(1, 0, newLocale)
    }
    return segments.join("/")
  }

  const handleLocaleChange = (newLocale: string) => {
    const newPath = getLocalizedPath(newLocale)
    router.push(newPath)
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-locale', newLocale)
    }
  }

  return (
    <div className="language-switcher flex gap-1">
      {locales.map((localeOption) => (
        <Button
          key={localeOption.code}
          variant={currentLocale === localeOption.code ? "default" : "ghost"}
          size="sm"
          className={cn(
            "px-2 min-w-0 cursor-pointer hover:bg-accent/20 transition-colors active:scale-95",
            currentLocale === localeOption.code && "bg-accent text-accent-foreground"
          )}
          onClick={() => handleLocaleChange(localeOption.code)}
          type="button"
          style={{ pointerEvents: 'auto' }}
        >
          <span className="pointer-events-none">{localeOption.flag}</span>
        </Button>
      ))}
    </div>
  )
}
