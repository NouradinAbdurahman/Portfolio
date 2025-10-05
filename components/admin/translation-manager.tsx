"use client"

import { useEffect, useState, useCallback } from "react"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Globe, CheckCircle, AlertCircle, RefreshCw } from "lucide-react"
import { clientTranslationService } from "@/lib/client-translation-service"

const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
]

interface Translation {
  key: string
  en: string
  ar?: string
  tr?: string
  it?: string
  fr?: string
  de?: string
  auto_translated: boolean
  needs_review: boolean
  created_at: string
  updated_at: string
}

export function TranslationManager() {
  const { toast } = useToast()
  const [translations, setTranslations] = useState<Translation[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedKey, setSelectedKey] = useState<string | null>(null)
  const [editingTranslations, setEditingTranslations] = useState<Record<string, string>>({})
  const [needsReview, setNeedsReview] = useState<Translation[]>([])
  const [isFetching, setIsFetching] = useState(false)

  // Section order for organizing translation keys
  const SECTION_ORDER = [
    'hero',
    'about', 
    'skills',
    'projects',
    'services',
    'contact',
    'resume',
    'footer'
  ]

  // Fetch translations
  const fetchTranslations = useCallback(async () => {
    // Prevent multiple simultaneous fetches
    if (isFetching) return
    
    try {
      setIsFetching(true)
      setLoading(true)
      
      // Fetch all languages in parallel
      const languagePromises = SUPPORTED_LANGUAGES.map(async (lang) => {
        try {
          const response = await fetch(`/api/translations?locale=${lang.code}` , {
            cache: 'no-store',
            headers: {
              'Cache-Control': 'no-cache, no-store, must-revalidate',
              'Pragma': 'no-cache',
              'Expires': '0'
            }
          })
          const data = await response.json()
          return { lang: lang.code, data: data.success ? data.translations : {} }
        } catch (error) {
          console.warn(`Failed to fetch ${lang.code} translations`)
          return { lang: lang.code, data: {} }
        }
      })

      // Fetch review translations
      const reviewPromise = fetch('/api/translations/review').then(res => res.json())

      // Wait for all requests to complete
      const [reviewData, ...languageResults] = await Promise.all([reviewPromise, ...languagePromises])

      // Set review data
      if (reviewData.success) {
        setNeedsReview(reviewData.translations)
      }

      // Combine all language data
      const allTranslations: Record<string, Record<string, string>> = {}
      languageResults.forEach(({ lang, data }) => {
        allTranslations[lang] = data
      })

      // Convert to array format
      const englishTranslations = allTranslations.en || {}
      const translationArray = Object.entries(englishTranslations).map(([key, value]) => {
        const fullTranslation: Translation = {
          key,
          en: value as string,
          auto_translated: false,
          needs_review: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }

        // Add other language translations
        SUPPORTED_LANGUAGES.forEach(lang => {
          if (lang.code !== 'en' && allTranslations[lang.code] && allTranslations[lang.code][key]) {
            fullTranslation[lang.code as keyof Translation] = allTranslations[lang.code][key]
          }
        })

        return fullTranslation
      })
      
      setTranslations(translationArray)
    } catch (error) {
      console.error('Error fetching translations:', error)
      toast({
        title: "Error",
        description: "Failed to fetch translations",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
      setIsFetching(false)
    }
  }, [toast, isFetching])

  // Auto-translate a key
  const autoTranslate = useCallback(async (key: string, englishText: string) => {
    try {
      setSaving(true)
      const response = await fetch('/api/translations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key,
          englishText,
          options: {
            targetLanguages: ['ar', 'tr', 'it', 'fr', 'de'],
            autoTranslate: true,
            needsReview: true
          }
        })
      })

      const data = await response.json()
      
      if (data.success) {
        toast({
          title: "Success",
          description: "Translations generated successfully"
        })
        fetchTranslations()
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      console.error('Error auto-translating:', error)
      toast({
        title: "Error",
        description: "Failed to generate translations",
        variant: "destructive"
      })
    } finally {
      setSaving(false)
    }
  }, [toast, fetchTranslations])

  // Update translation
  const updateTranslation = useCallback(async (key: string, locale: string, value: string) => {
    try {
      setSaving(true)
      const response = await fetch('/api/translations', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key,
          translations: { [locale]: value },
          options: { needsReview: false }
        })
      })

      const data = await response.json()
      
      if (data.success) {
        toast({
          title: "Success",
          description: "Translation updated successfully"
        })
        // Broadcast to all tabs to refresh translations immediately
        try {
          if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
            const bc = new BroadcastChannel('translations-sync')
            bc.postMessage({ type: 'translations-updated', key, locale })
            bc.close()
          }
        } catch {}
        fetchTranslations()
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      console.error('Error updating translation:', error)
      toast({
        title: "Error",
        description: "Failed to update translation",
        variant: "destructive"
      })
    } finally {
      setSaving(false)
    }
  }, [toast, fetchTranslations])

  // Mark as reviewed
  const markAsReviewed = useCallback(async (key: string) => {
    try {
      const response = await fetch('/api/translations/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key })
      })

      const data = await response.json()
      
      if (data.success) {
        toast({
          title: "Success",
          description: "Translation marked as reviewed"
        })
        fetchTranslations()
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      console.error('Error marking as reviewed:', error)
      toast({
        title: "Error",
        description: "Failed to mark as reviewed",
        variant: "destructive"
      })
    }
  }, [toast, fetchTranslations])

  // Initial fetch - only run once on mount
  useEffect(() => {
    fetchTranslations()
  }, []) // Remove fetchTranslations dependency to prevent infinite loops

  // Sort translations by section order
  const sortTranslationsBySection = (translations: Translation[]) => {
    return translations.sort((a, b) => {
      const aSection = SECTION_ORDER.find(section => a.key.startsWith(section)) || 'other'
      const bSection = SECTION_ORDER.find(section => b.key.startsWith(section)) || 'other'
      
      const aIndex = SECTION_ORDER.indexOf(aSection)
      const bIndex = SECTION_ORDER.indexOf(bSection)
      
      // If both are in the same section, sort alphabetically by key
      if (aIndex === bIndex) {
        return a.key.localeCompare(b.key)
      }
      
      // Sort by section order
      return aIndex - bIndex
    })
  }

  // Filter translations based on search
  const filteredTranslations = sortTranslationsBySection(
    translations.filter(t => 
      t.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.en.toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  const selectedTranslation = selectedKey ? translations.find(t => t.key === selectedKey) : null

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Translation Manager</h2>
              <p className="text-sm sm:text-base text-muted-foreground mt-1">
                Manage translations across all supported languages
              </p>
            </div>
            <Button onClick={fetchTranslations} variant="outline" disabled={loading || isFetching} className="w-full sm:w-auto">
              <RefreshCw className={`w-4 h-4 mr-2 ${loading || isFetching ? 'animate-spin' : ''}`} />
              {loading || isFetching ? 'Loading...' : 'Refresh'}
            </Button>
          </div>

          {/* Review Alert */}
          {needsReview.length > 0 && (
            <Alert className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950">
              <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              <AlertDescription className="text-amber-800 dark:text-amber-200">
                {needsReview.length} translation(s) need review. Check the "Review" tab.
              </AlertDescription>
            </Alert>
          )}

          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 lg:w-auto">
              <TabsTrigger value="all" className="text-sm font-medium">All Translations</TabsTrigger>
              <TabsTrigger value="review" className="text-sm font-medium">
                Review ({needsReview.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-6">
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Search translations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:max-w-sm text-sm"
                />
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
                {/* Translation List */}
                <Card className="order-2 xl:order-1 shadow-lg border-0 bg-card/50 backdrop-blur-sm">
                  <CardHeader className="pb-6 px-6 pt-6">
                    <CardTitle className="text-xl lg:text-2xl font-semibold text-foreground">Translation Keys</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground mt-2">
                      Select a key to edit translations
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="px-6 pb-6">
                    <div className="space-y-4 max-h-[60vh] sm:max-h-96 overflow-y-auto pr-2">
                      {loading ? (
                        // Loading skeleton
                        <div className="space-y-3">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="p-4 rounded-xl border bg-muted/30 animate-pulse">
                              <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                              <div className="h-3 bg-muted rounded w-1/2"></div>
                            </div>
                          ))}
                        </div>
                      ) : (
                    <>
                      {SECTION_ORDER.map((section) => {
                        const sectionTranslations = filteredTranslations.filter(t => 
                          t.key.startsWith(section)
                        )
                        
                        if (sectionTranslations.length === 0) return null
                        
                        return (
                          <div key={section} className="space-y-3">
                            <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-10 pb-3">
                              <h4 className="text-sm sm:text-base font-semibold text-primary capitalize border-b border-border/50 pb-2">
                                {section} Section
                              </h4>
                            </div>
                            <div className="space-y-3">
                              {sectionTranslations.map((translation) => (
                                <div
                                  key={translation.key}
                                  className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:shadow-md ${
                                    selectedKey === translation.key
                                      ? 'bg-primary/10 border-primary shadow-md ring-2 ring-primary/20'
                                      : 'hover:bg-muted/50 border-border/50'
                                  }`}
                                  onClick={() => setSelectedKey(translation.key)}
                                >
                                  <div className="flex items-start justify-between gap-3">
                                    <div className="flex-1 min-w-0">
                                      <p className="font-semibold text-sm sm:text-base truncate text-foreground">{translation.key}</p>
                                      <p className="text-sm text-muted-foreground line-clamp-2 mt-2 leading-relaxed">
                                        {translation.en}
                                      </p>
                                    </div>
                                    <div className="flex items-center space-x-2 flex-shrink-0">
                                      {translation.auto_translated && (
                                        <Badge variant="secondary" className="text-xs px-2 py-1 rounded-full">
                                          Auto
                                        </Badge>
                                      )}
                                      {translation.needs_review && (
                                        <Badge variant="destructive" className="text-xs px-2 py-1 rounded-full">
                                          Review
                                        </Badge>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )
                      })}
                      
                      {/* Other translations not in main sections */}
                      {(() => {
                        const otherTranslations = filteredTranslations.filter(t => 
                          !SECTION_ORDER.some(section => t.key.startsWith(section))
                        )
                        
                        if (otherTranslations.length === 0) return null
                        
                        return (
                          <div className="space-y-2">
                            <div className="sticky top-0 bg-background z-10 pb-2">
                              <h4 className="text-xs sm:text-sm font-semibold text-primary border-b border-border pb-1">
                                Other
                              </h4>
                            </div>
                            <div className="space-y-2">
                              {otherTranslations.map((translation) => (
                                <div
                                  key={translation.key}
                                  className={`p-2 sm:p-3 rounded-lg border cursor-pointer transition-colors ${
                                    selectedKey === translation.key
                                      ? 'bg-primary/10 border-primary'
                                      : 'hover:bg-muted'
                                  }`}
                                  onClick={() => setSelectedKey(translation.key)}
                                >
                                  <div className="flex items-start justify-between gap-3">
                                    <div className="flex-1 min-w-0">
                                      <p className="font-semibold text-sm sm:text-base truncate text-foreground">{translation.key}</p>
                                      <p className="text-sm text-muted-foreground line-clamp-2 mt-2 leading-relaxed">
                                        {translation.en}
                                      </p>
                                    </div>
                                    <div className="flex items-center space-x-2 flex-shrink-0">
                                      {translation.auto_translated && (
                                        <Badge variant="secondary" className="text-xs px-2 py-1 rounded-full">
                                          Auto
                                        </Badge>
                                      )}
                                      {translation.needs_review && (
                                        <Badge variant="destructive" className="text-xs px-2 py-1 rounded-full">
                                          Review
                                        </Badge>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )
                      })()}
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

                {/* Translation Editor */}
                <Card className="order-1 xl:order-2 shadow-lg border-0 bg-card/50 backdrop-blur-sm">
                  <CardHeader className="pb-6 px-6 pt-6">
                    <CardTitle className="text-xl lg:text-2xl font-semibold text-foreground">Edit Translations</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground mt-2">
                      {selectedTranslation ? `Editing: ${selectedTranslation.key}` : 'Select a translation key to edit'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="px-6 pb-6">
                    {selectedTranslation ? (
                      <div className="space-y-6">
                        {SUPPORTED_LANGUAGES.map((lang) => {
                          const currentValue = selectedTranslation[lang.code as keyof Translation] as string || ''
                          const isEditing = editingTranslations[`${selectedTranslation.key}_${lang.code}`] !== undefined
                          const editedValue = editingTranslations[`${selectedTranslation.key}_${lang.code}`] || currentValue

                          return (
                            <div key={lang.code} className="space-y-3 p-4 rounded-xl border bg-muted/20">
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                <label className="text-sm font-semibold flex items-center text-foreground">
                                  <span className="mr-3 text-lg">{lang.flag}</span>
                                  <span className="text-sm sm:text-base">{lang.name}</span>
                                </label>
                                {lang.code === 'en' && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => autoTranslate(selectedTranslation.key, selectedTranslation.en)}
                                    disabled={saving}
                                    className="w-full sm:w-auto text-xs"
                                  >
                                    <Globe className="w-3 h-3 mr-2" />
                                    Auto-translate
                                  </Button>
                                )}
                              </div>
                              <Textarea
                                value={editedValue}
                                onChange={(e) => setEditingTranslations(prev => ({
                                  ...prev,
                                  [`${selectedTranslation.key}_${lang.code}`]: e.target.value
                                }))}
                                placeholder={`Enter ${lang.name} translation...`}
                                className="min-h-[80px] sm:min-h-[100px] text-sm resize-y border-border/50 focus:ring-2 focus:ring-primary/20"
                              />
                              {isEditing && editedValue !== currentValue && (
                                <div className="flex flex-col sm:flex-row gap-3">
                                  <Button
                                    size="sm"
                                    onClick={() => updateTranslation(selectedTranslation.key, lang.code, editedValue)}
                                    disabled={saving}
                                    className="w-full sm:w-auto text-xs"
                                  >
                                    {saving ? (
                                      <Loader2 className="w-3 h-3 mr-2 animate-spin" />
                                    ) : (
                                      <CheckCircle className="w-3 h-3 mr-2" />
                                    )}
                                    Save
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => setEditingTranslations(prev => {
                                      const newState = { ...prev }
                                      delete newState[`${selectedTranslation.key}_${lang.code}`]
                                      return newState
                                    })}
                                    className="w-full sm:w-auto text-xs"
                                  >
                                    Cancel
                                  </Button>
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/50 flex items-center justify-center">
                          <Globe className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <p className="text-muted-foreground text-base">
                          Select a translation key to start editing
                        </p>
                      </div>
                    )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

            <TabsContent value="review" className="space-y-6">
              <div className="space-y-6">
                {needsReview.length === 0 ? (
                  <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
                    <CardContent className="text-center py-16">
                      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                        <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                      </div>
                      <p className="text-lg font-medium text-foreground">No translations need review</p>
                      <p className="text-sm text-muted-foreground mt-2">All translations are up to date</p>
                    </CardContent>
                  </Card>
                ) : (
                  needsReview.map((translation) => (
                    <Card key={translation.key} className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
                      <CardHeader className="pb-6 px-6 pt-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <CardTitle className="text-lg sm:text-xl font-semibold text-foreground truncate">{translation.key}</CardTitle>
                            <CardDescription className="text-sm text-muted-foreground mt-2">
                              English: {translation.en}
                            </CardDescription>
                          </div>
                          <Button
                            onClick={() => markAsReviewed(translation.key)}
                            disabled={saving}
                            className="w-full sm:w-auto text-sm"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Mark as Reviewed
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="px-6 pb-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {SUPPORTED_LANGUAGES.filter(lang => lang.code !== 'en').map((lang) => {
                            const value = translation[lang.code as keyof Translation] as string || ''
                            return (
                              <div key={lang.code} className="space-y-3 p-4 rounded-xl border bg-muted/20">
                                <label className="text-sm font-semibold flex items-center text-foreground">
                                  <span className="mr-3 text-base">{lang.flag}</span>
                                  {lang.name}
                                </label>
                                <div className="p-3 bg-muted/50 rounded-lg">
                                  <p className="text-sm line-clamp-3 text-muted-foreground">{value || 'Not translated'}</p>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
