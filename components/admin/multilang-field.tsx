"use client"

import { useState, useEffect } from 'react'
import { Globe, Eye, EyeOff } from 'lucide-react'
import { AdminButton } from '@/components/ui/admin-button'

const SUPPORTED_LOCALES = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦' },
  { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' }
]

interface MultilangFieldProps {
  label: string
  fieldKey: string
  translations: Record<string, string>
  onUpdate: (fieldKey: string, translations: Record<string, string>) => void
  hidden?: boolean
  onToggleHidden?: () => void
  type?: 'input' | 'textarea'
  placeholder?: string
  rows?: number
  hiddenTranslations?: Record<string, boolean>
  onToggleHiddenTranslation?: (locale: string) => void
}

export function MultilangField({
  label,
  fieldKey,
  translations,
  onUpdate,
  hidden = false,
  onToggleHidden,
  type = 'input',
  placeholder = '',
  rows = 3,
  hiddenTranslations = {},
  onToggleHiddenTranslation
}: MultilangFieldProps) {
  const [expandedLocales, setExpandedLocales] = useState<string[]>(['en'])
  const [localTranslations, setLocalTranslations] = useState<Record<string, string>>(translations)
  const [localHiddenTranslations, setLocalHiddenTranslations] = useState<Record<string, boolean>>(hiddenTranslations || {})

  // Sync local state with props
  useEffect(() => {
    setLocalTranslations(translations)
  }, [translations])

  useEffect(() => {
    setLocalHiddenTranslations(hiddenTranslations || {})
  }, [hiddenTranslations])

  const handleTranslationChange = (locale: string, value: string) => {
    const newTranslations = { ...localTranslations, [locale]: value }
    setLocalTranslations(newTranslations)
    onUpdate(fieldKey, newTranslations)
  }

  const toggleLocaleExpansion = (locale: string) => {
    setExpandedLocales(prev => 
      prev.includes(locale) 
        ? prev.filter(l => l !== locale)
        : [...prev, locale]
    )
  }

  const expandAllLocales = () => {
    setExpandedLocales(SUPPORTED_LOCALES.map(l => l.code))
  }

  const collapseAllLocales = () => {
    setExpandedLocales(['en'])
  }

  const renderInput = (locale: string, value: string) => {
    const commonProps = {
      value: value || '',
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => 
        handleTranslationChange(locale, e.target.value),
      placeholder: placeholder || `Enter ${SUPPORTED_LOCALES.find(l => l.code === locale)?.label} ${label.toLowerCase()}...`,
      className: `w-full px-3 py-2 bg-white dark:bg-gray-900/70 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white text-sm ${
        locale === 'ar' ? 'text-right' : 'text-left'
      }`,
      dir: locale === 'ar' ? 'rtl' : 'ltr'
    }

    if (type === 'textarea') {
      return <textarea {...commonProps} rows={rows} />
    }
    
    return <input {...commonProps} />
  }

  return (
    <div className="space-y-3">
      {/* Field header - always visible */}
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium dark:text-gray-300 text-gray-800">
          {label}
        </label>
        <div className="flex items-center gap-2">
          {onToggleHidden && (
            <button 
              onClick={onToggleHidden}
              className={`text-xs rounded px-2 py-1 flex items-center gap-1 ${
                hidden ? 'bg-gray-800 text-gray-300' : 'bg-gray-600 text-white'
              } hover:opacity-90`}
            >
              {hidden ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
              {hidden ? 'Show' : 'Hide'}
            </button>
          )}
          <div className="flex items-center gap-1">
            <AdminButton 
              onClick={expandAllLocales}
              className="text-xs px-2 py-1 bg-blue-600 hover:bg-blue-500 text-white"
            >
              <Globe className="w-3 h-3 mr-1" />
              All
            </AdminButton>
            <AdminButton 
              onClick={collapseAllLocales}
              className="text-xs px-2 py-1 bg-gray-600 hover:bg-gray-500 text-white"
            >
              EN
            </AdminButton>
          </div>
        </div>
      </div>

      {/* Field content - can be hidden */}
      <div className={`space-y-3 ${hidden ? 'opacity-50 grayscale pointer-events-none' : ''}`}>
        {SUPPORTED_LOCALES.map((locale) => {
          const isExpanded = expandedLocales.includes(locale.code)
          const value = localTranslations[locale.code] || ''
          
          return (
            <div key={locale.code} className={`border border-gray-200 dark:border-gray-700 rounded-lg p-3 ${localHiddenTranslations[locale.code] ? 'opacity-50 grayscale' : ''}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{locale.flag}</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {locale.label}
                  </span>
                  {locale.code === 'en' && (
                    <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded">
                      Default
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {onToggleHiddenTranslation && (
                    <button 
                      onClick={() => {
                        const newHiddenState = !localHiddenTranslations[locale.code]
                        setLocalHiddenTranslations(prev => ({
                          ...prev,
                          [locale.code]: newHiddenState
                        }))
                        onToggleHiddenTranslation(locale.code)
                      }}
                      className={`text-xs rounded px-2 py-1 flex items-center gap-1 ${
                        localHiddenTranslations[locale.code] ? 'bg-gray-800 text-gray-300' : 'bg-gray-600 text-white'
                      } hover:opacity-90`}
                    >
                      {localHiddenTranslations[locale.code] ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      {localHiddenTranslations[locale.code] ? 'Show' : 'Hide'}
                    </button>
                  )}
                  {!isExpanded && (
                    <AdminButton 
                      onClick={() => toggleLocaleExpansion(locale.code)}
                      className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                      Expand
                    </AdminButton>
                  )}
                </div>
              </div>
              
              {isExpanded && (
                <div className="space-y-2">
                  {renderInput(locale.code, value)}
                  {locale.code !== 'en' && !value && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                      Empty - will fallback to English
                    </p>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
