"use client"

import { useState, useEffect } from 'react'
import { MultilangField } from './multilang-field'
import { MultilangDynamicList } from './multilang-dynamic-list'
import { TechnicalSkillsManager } from './technical-skills-manager'
import { ServicesManager } from './services-manager'
import { AdminButton } from '@/components/ui/admin-button'
import { useToast } from '@/hooks/use-toast'
import { Save, RotateCcw, RefreshCw, Eye, EyeOff, GripVertical } from 'lucide-react'

const SUPPORTED_LOCALES = ['en', 'ar', 'tr', 'it', 'fr', 'de']

interface MultilangSectionsProps {
  section: 'hero' | 'navbar' | 'about' | 'services' | 'technical_skills'
  onSave: (content: Record<string, Record<string, string>>) => Promise<void>
  onReset: () => void
  onRefresh: () => void
  saving?: boolean
  refreshing?: boolean
}

export function MultilangSections({ 
  section, 
  onSave, 
  onReset, 
  onRefresh, 
  saving = false, 
  refreshing = false 
}: MultilangSectionsProps) {
  const { toast } = useToast()
  const [content, setContent] = useState<Record<string, any>>({})
  const [hiddenFields, setHiddenFields] = useState<Record<string, boolean>>({})
  
  const [hiddenTranslations, setHiddenTranslations] = useState<Record<string, any>>({})
  const [loading, setLoading] = useState(true)
  const [hasChanges, setHasChanges] = useState(false)

  // Fetch multi-language content
  const fetchContent = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/content/multilang?section=${section}`)
      const data = await response.json()
      
      if (data.error) {
        throw new Error(data.error)
      }
      
      const fetchedContent = data.content || {}
      
      // Extract hidden states from the content
      const extractedHiddenFields: Record<string, boolean> = {}
      const extractedHiddenTranslations: Record<string, Record<string, boolean>> = {}
      
      Object.keys(fetchedContent).forEach(key => {
        if (key.endsWith('_hidden')) {
          const fieldName = key.replace('_hidden', '')
          // Special case: if fieldName is empty (key was just '_hidden'), it means the field itself is called 'hidden'
          const actualFieldName = fieldName === '' ? 'hidden' : fieldName
          extractedHiddenFields[actualFieldName] = fetchedContent[key].en === 'true'
        } else if (key.endsWith('_translations_hidden')) {
          const fieldName = key.replace('_translations_hidden', '')
          // Special case: if fieldName is empty (key was just '_translations_hidden'), it means the field itself is called 'hidden'
          const actualFieldName = fieldName === '' ? 'hidden' : fieldName
          extractedHiddenTranslations[actualFieldName] = {}
          Object.keys(fetchedContent[key]).forEach(locale => {
            extractedHiddenTranslations[actualFieldName][locale] = fetchedContent[key][locale] === 'true'
          })
        }
      })
      
      // Filter out hidden state fields from the main content
      const filteredContent = Object.keys(fetchedContent).reduce((acc, key) => {
        if (!key.endsWith('_hidden') && !key.endsWith('_translations_hidden')) {
          acc[key] = fetchedContent[key]
        }
        return acc
      }, {} as Record<string, Record<string, string>>)
      
      setContent(filteredContent)
      setHiddenFields(extractedHiddenFields)
      setHiddenTranslations(extractedHiddenTranslations)
      setHasChanges(false)
    } catch (error) {
      console.error('Failed to fetch content:', error)
      toast({
        title: 'Error',
        description: `Failed to load ${section} content`,
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchContent()
  }, [section])

  const handleFieldUpdate = (fieldKey: string, translations: Record<string, string>) => {
    setContent(prev => ({
      ...prev,
      [fieldKey]: translations
    }))
    setHasChanges(true)
  }

  const handleDynamicListUpdate = (fieldKey: string, items: any[]) => {
    // Convert the items array to the proper multi-language format
    const multiLangItems = Object.fromEntries(
      SUPPORTED_LOCALES.map(locale => [
        locale,
        JSON.stringify(items.map(item => ({
          name: item.title?.[locale] || item.title?.en || item.title || '',
          icon: item.description?.[locale] || item.description?.en || item.description || '',
          color: item.color || '',
          hidden: item.hidden || false,
          hiddenTranslations: item.hiddenTranslations || {}
        })))
      ])
    )
    
    setContent(prev => ({
      ...prev,
      [fieldKey]: multiLangItems
    }))
    setHasChanges(true)
  }

  const handleToggleFieldHidden = (fieldKey: string) => {
    setHiddenFields(prev => ({
      ...prev,
      [fieldKey]: !prev[fieldKey]
    }))
    setHasChanges(true)
  }

  const handleToggleTranslationHidden = (fieldKey: string, locale: string) => {
    setHiddenTranslations(prev => {
      const currentFieldHidden = prev[fieldKey] || {}
      const newFieldHidden = {
        ...currentFieldHidden,
        [locale]: !currentFieldHidden[locale]
      }
      return {
        ...prev,
        [fieldKey]: newFieldHidden
      }
    })
    setHasChanges(true)
  }

  const handleSave = async () => {
    try {
      // Include hidden states in the content to save
      const contentWithHiddenStates = {
        ...content,
        // Add hidden field states
        ...Object.keys(hiddenFields).reduce((acc, field) => {
          acc[`${field}_hidden`] = { en: hiddenFields[field] ? 'true' : 'false' }
          return acc
        }, {} as Record<string, Record<string, string>>),
        // Add hidden translation states
        ...Object.keys(hiddenTranslations).reduce((acc, field) => {
          const fieldHiddenTranslations = hiddenTranslations[field]
          if (fieldHiddenTranslations) {
            acc[`${field}_translations_hidden`] = Object.keys(fieldHiddenTranslations).reduce((localeAcc, locale) => {
              localeAcc[locale] = fieldHiddenTranslations[locale] ? 'true' : 'false'
              return localeAcc
            }, {} as Record<string, string>)
          }
          return acc
        }, {} as Record<string, Record<string, string>>)
      }
      
      await onSave(contentWithHiddenStates)
      setHasChanges(false)
      toast({
        title: 'Success',
        description: `${section} content saved successfully`
      })
    } catch (error) {
      console.error('Failed to save content:', error)
      toast({
        title: 'Error',
        description: 'Failed to save content',
        variant: 'destructive'
      })
    }
  }

  const handleReset = () => {
    onReset()
    fetchContent()
  }

  const handleRefresh = () => {
    onRefresh()
    fetchContent()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800 dark:border-white mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading {section} content...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header with actions */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold dark:text-white text-gray-900">
          {section === 'hero' ? 'Hero Section' : 'Navigation Bar'} - Multi-Language
        </h2>
        <div className="flex items-center gap-2">
          <AdminButton 
            onClick={handleRefresh}
            disabled={refreshing}
            className="bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50 px-3 py-2 text-sm"
          >
            <RefreshCw className={`w-4 h-4 mr-1 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </AdminButton>
          <AdminButton 
            onClick={handleReset}
            className="bg-orange-600 hover:bg-orange-500 text-white px-3 py-2 text-sm"
          >
            <RotateCcw className="w-4 h-4 mr-1" />
            Reset
          </AdminButton>
          <AdminButton 
            onClick={handleSave}
            disabled={saving || !hasChanges}
            className="bg-green-600 hover:bg-green-500 text-white disabled:opacity-50 px-3 py-2 text-sm"
          >
            <Save className="w-4 h-4 mr-1" />
            {saving ? 'Saving...' : 'Save Changes'}
          </AdminButton>
        </div>
      </div>

      {/* Content fields */}
      <div className="space-y-6">
        {section === 'hero' && (
          <>
            <MultilangField
              label="Title"
              fieldKey="title"
              translations={content.title || {}}
              onUpdate={handleFieldUpdate}
              hidden={hiddenFields.title}
              onToggleHidden={() => handleToggleFieldHidden('title')}
              hiddenTranslations={hiddenTranslations.title || {}}
              onToggleHiddenTranslation={(locale) => handleToggleTranslationHidden('title', locale)}
              placeholder="Software Engineer • Full-Stack Developer • Data Engineer"
            />
            
            <MultilangField
              label="Subtitle"
              fieldKey="subtitle"
              translations={content.subtitle || {}}
              onUpdate={handleFieldUpdate}
              hidden={hiddenFields.subtitle}
              onToggleHidden={() => handleToggleFieldHidden('subtitle')}
              hiddenTranslations={hiddenTranslations.subtitle || {}}
              onToggleHiddenTranslation={(locale) => handleToggleTranslationHidden('subtitle', locale)}
              type="textarea"
              rows={3}
              placeholder="Building scalable applications, cloud-driven systems, and data-powered solutions..."
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <MultilangField
                label="Primary CTA Label"
                fieldKey="ctaPrimaryLabel"
                translations={content.ctaPrimaryLabel || {}}
                onUpdate={handleFieldUpdate}
                hidden={hiddenFields.ctaPrimaryLabel}
                onToggleHidden={() => handleToggleFieldHidden('ctaPrimaryLabel')}
                hiddenTranslations={hiddenTranslations.ctaPrimaryLabel || {}}
                onToggleHiddenTranslation={(locale) => handleToggleTranslationHidden('ctaPrimaryLabel', locale)}
                placeholder="View My LinkedIn"
              />
              
              <MultilangField
                label="Primary CTA Href"
                fieldKey="ctaPrimaryHref"
                translations={content.ctaPrimaryHref || {}}
                onUpdate={handleFieldUpdate}
                hidden={hiddenFields.ctaPrimaryHref}
                onToggleHidden={() => handleToggleFieldHidden('ctaPrimaryHref')}
                hiddenTranslations={hiddenTranslations.ctaPrimaryHref || {}}
                onToggleHiddenTranslation={(locale) => handleToggleTranslationHidden('ctaPrimaryHref', locale)}
                placeholder="https://linkedin.com/in/nouraddin"
              />
              
              <MultilangField
                label="Secondary CTA Label"
                fieldKey="ctaSecondaryLabel"
                translations={content.ctaSecondaryLabel || {}}
                onUpdate={handleFieldUpdate}
                hidden={hiddenFields.ctaSecondaryLabel}
                onToggleHidden={() => handleToggleFieldHidden('ctaSecondaryLabel')}
                hiddenTranslations={hiddenTranslations.ctaSecondaryLabel || {}}
                onToggleHiddenTranslation={(locale) => handleToggleTranslationHidden('ctaSecondaryLabel', locale)}
                placeholder="Contact Me"
              />
              
              <MultilangField
                label="Secondary CTA Href"
                fieldKey="ctaSecondaryHref"
                translations={content.ctaSecondaryHref || {}}
                onUpdate={handleFieldUpdate}
                hidden={hiddenFields.ctaSecondaryHref}
                onToggleHidden={() => handleToggleFieldHidden('ctaSecondaryHref')}
                hiddenTranslations={hiddenTranslations.ctaSecondaryHref || {}}
                onToggleHiddenTranslation={(locale) => handleToggleTranslationHidden('ctaSecondaryHref', locale)}
                placeholder="#contact"
              />
            </div>
            
            <MultilangDynamicList
              label="Hero Skills"
              fieldKey="skills"
              items={(() => {
                try {
                  const skillsString = content.skills?.en || content.skills || '[]'
                  const parsedSkills = typeof skillsString === 'string' ? JSON.parse(skillsString) : skillsString
                  return Array.isArray(parsedSkills) ? parsedSkills.map((skill: any, index: number) => ({
                    id: skill.name || `skill_${index}`,
                    title: { en: skill.name || '', ar: '', tr: '', it: '', fr: '', de: '' },
                    description: { en: skill.icon || '', ar: '', tr: '', it: '', fr: '', de: '' },
                    hidden: skill.hidden || false,
                    hiddenTranslations: skill.hiddenTranslations || {}
                  })) : []
                } catch (error) {
                  console.error('Error parsing hero skills:', error)
                  return []
                }
              })()}
              onUpdate={handleDynamicListUpdate}
              hidden={hiddenFields.skills}
              onToggleHidden={() => handleToggleFieldHidden('skills')}
              hiddenTranslations={hiddenTranslations.skills || {}}
              onToggleHiddenTranslation={(itemId, locale) => handleToggleTranslationHidden('skills', locale)}
            />
          </>
        )}

        {section === 'navbar' && (
          <>
            <MultilangField
              label="About Link"
              fieldKey="about"
              translations={content.about || {}}
              onUpdate={handleFieldUpdate}
              hidden={hiddenFields.about}
              onToggleHidden={() => handleToggleFieldHidden('about')}
              hiddenTranslations={hiddenTranslations.about || {}}
              onToggleHiddenTranslation={(locale) => handleToggleTranslationHidden('about', locale)}
              placeholder="About Me"
            />
            
            <MultilangField
              label="Projects Link"
              fieldKey="projects"
              translations={content.projects || {}}
              onUpdate={handleFieldUpdate}
              hidden={hiddenFields.projects}
              onToggleHidden={() => handleToggleFieldHidden('projects')}
              hiddenTranslations={hiddenTranslations.projects || {}}
              onToggleHiddenTranslation={(locale) => handleToggleTranslationHidden('projects', locale)}
              placeholder="Projects"
            />
            
            <MultilangField
              label="Services Link"
              fieldKey="services"
              translations={content.services || {}}
              onUpdate={handleFieldUpdate}
              hidden={hiddenFields.services}
              onToggleHidden={() => handleToggleFieldHidden('services')}
              hiddenTranslations={hiddenTranslations.services || {}}
              onToggleHiddenTranslation={(locale) => handleToggleTranslationHidden('services', locale)}
              placeholder="Services"
            />
            
            <MultilangField
              label="Contact Link"
              fieldKey="contact"
              translations={content.contact || {}}
              onUpdate={handleFieldUpdate}
              hidden={hiddenFields.contact}
              onToggleHidden={() => handleToggleFieldHidden('contact')}
              hiddenTranslations={hiddenTranslations.contact || {}}
              onToggleHiddenTranslation={(locale) => handleToggleTranslationHidden('contact', locale)}
              placeholder="Contact Me"
            />
            
            <MultilangField
              label="Resume Link"
              fieldKey="resume"
              translations={content.resume || {}}
              onUpdate={handleFieldUpdate}
              hidden={hiddenFields.resume}
              onToggleHidden={() => handleToggleFieldHidden('resume')}
              hiddenTranslations={hiddenTranslations.resume || {}}
              onToggleHiddenTranslation={(locale) => handleToggleTranslationHidden('resume', locale)}
              placeholder="Resume"
            />
          </>
        )}

        {section === 'about' && (
          <>
            <MultilangField
              label="Section Title"
              fieldKey="title"
              translations={content.title || {}}
              onUpdate={handleFieldUpdate}
              hidden={hiddenFields.title}
              onToggleHidden={() => handleToggleFieldHidden('title')}
              hiddenTranslations={hiddenTranslations.title || {}}
              onToggleHiddenTranslation={(locale) => handleToggleTranslationHidden('title', locale)}
              placeholder="About Me"
            />
            
            <MultilangField
              label="Section Subtitle"
              fieldKey="subtitle"
              translations={content.subtitle || {}}
              onUpdate={handleFieldUpdate}
              hidden={hiddenFields.subtitle}
              onToggleHidden={() => handleToggleFieldHidden('subtitle')}
              hiddenTranslations={hiddenTranslations.subtitle || {}}
              onToggleHiddenTranslation={(locale) => handleToggleTranslationHidden('subtitle', locale)}
              placeholder="Nouraddin - Software Engineering Student & Developer"
            />
            
            <MultilangField
              label="Name"
              fieldKey="name"
              translations={content.name || {}}
              onUpdate={handleFieldUpdate}
              hidden={hiddenFields.name}
              onToggleHidden={() => handleToggleFieldHidden('name')}
              hiddenTranslations={hiddenTranslations.name || {}}
              onToggleHiddenTranslation={(locale) => handleToggleTranslationHidden('name', locale)}
              placeholder="Nouraddin Abdurahman Aden"
            />
            
            <MultilangField
              label="Role"
              fieldKey="role"
              translations={content.role || {}}
              onUpdate={handleFieldUpdate}
              hidden={hiddenFields.role}
              onToggleHidden={() => handleToggleFieldHidden('role')}
              hiddenTranslations={hiddenTranslations.role || {}}
              onToggleHiddenTranslation={(locale) => handleToggleTranslationHidden('role', locale)}
              placeholder="Software Engineering Student & Developer"
            />
            
            <MultilangField
              label="Short Bio"
              fieldKey="short_bio"
              translations={content.short_bio || {}}
              onUpdate={handleFieldUpdate}
              hidden={hiddenFields.short_bio}
              onToggleHidden={() => handleToggleFieldHidden('short_bio')}
              hiddenTranslations={hiddenTranslations.short_bio || {}}
              onToggleHiddenTranslation={(locale) => handleToggleTranslationHidden('short_bio', locale)}
              type="textarea"
              rows={3}
              placeholder="Currently pursuing Software Engineering at OSTİM Teknik University..."
            />
            
            <MultilangField
              label="Detailed Bio"
              fieldKey="detailed_bio"
              translations={content.detailed_bio || {}}
              onUpdate={handleFieldUpdate}
              hidden={hiddenFields.detailed_bio}
              onToggleHidden={() => handleToggleFieldHidden('detailed_bio')}
              hiddenTranslations={hiddenTranslations.detailed_bio || {}}
              onToggleHiddenTranslation={(locale) => handleToggleTranslationHidden('detailed_bio', locale)}
              type="textarea"
              rows={5}
              placeholder="Hi, I'm Nouraddin! Currently pursuing Software Engineering..."
            />
            
            <MultilangField
              label="Body Text"
              fieldKey="body"
              translations={content.body || {}}
              onUpdate={handleFieldUpdate}
              hidden={hiddenFields.body}
              onToggleHidden={() => handleToggleFieldHidden('body')}
              hiddenTranslations={hiddenTranslations.body || {}}
              onToggleHiddenTranslation={(locale) => handleToggleTranslationHidden('body', locale)}
              type="textarea"
              rows={5}
              placeholder="Hello, I'm Nouraddin! I'm currently pursuing Software Engineering..."
            />
            
            <MultilangField
              label="Expertise Highlights"
              fieldKey="expertise_highlights"
              translations={content.expertise_highlights || {}}
              onUpdate={handleFieldUpdate}
              hidden={hiddenFields.expertise_highlights}
              onToggleHidden={() => handleToggleFieldHidden('expertise_highlights')}
              hiddenTranslations={hiddenTranslations.expertise_highlights || {}}
              onToggleHiddenTranslation={(locale) => handleToggleTranslationHidden('expertise_highlights', locale)}
              type="textarea"
              rows={3}
              placeholder="Proficient in React, Next.js, Flutter, and modern web technologies..."
            />
            
            <MultilangField
              label="Full-Stack Expertise"
              fieldKey="fullstackExpertise"
              translations={content.fullstackExpertise || {}}
              onUpdate={handleFieldUpdate}
              hidden={hiddenFields.fullstackExpertise}
              onToggleHidden={() => handleToggleFieldHidden('fullstackExpertise')}
              hiddenTranslations={hiddenTranslations.fullstackExpertise || {}}
              onToggleHiddenTranslation={(locale) => handleToggleTranslationHidden('fullstackExpertise', locale)}
              type="textarea"
              rows={3}
              placeholder="Proficient in React, Next.js, Flutter, and modern web technologies..."
            />
            
            <MultilangField
              label="Data Engineering"
              fieldKey="dataEngineering"
              translations={content.dataEngineering || {}}
              onUpdate={handleFieldUpdate}
              hidden={hiddenFields.dataEngineering}
              onToggleHidden={() => handleToggleFieldHidden('dataEngineering')}
              hiddenTranslations={hiddenTranslations.dataEngineering || {}}
              onToggleHiddenTranslation={(locale) => handleToggleTranslationHidden('dataEngineering', locale)}
              type="textarea"
              rows={3}
              placeholder="Expert in developing ETL pipelines, optimizing SQL..."
            />
            
            <MultilangField
              label="Cloud Automation"
              fieldKey="cloudAutomation"
              translations={content.cloudAutomation || {}}
              onUpdate={handleFieldUpdate}
              hidden={hiddenFields.cloudAutomation}
              onToggleHidden={() => handleToggleFieldHidden('cloudAutomation')}
              hiddenTranslations={hiddenTranslations.cloudAutomation || {}}
              onToggleHiddenTranslation={(locale) => handleToggleTranslationHidden('cloudAutomation', locale)}
              type="textarea"
              rows={3}
              placeholder="Skilled in AWS, Firebase, and building automated workflows..."
            />
            
            <MultilangField
              label="Profile Image"
              fieldKey="profile_image"
              translations={content.profile_image || {}}
              onUpdate={handleFieldUpdate}
              hidden={hiddenFields.profile_image}
              onToggleHidden={() => handleToggleFieldHidden('profile_image')}
              hiddenTranslations={hiddenTranslations.profile_image || {}}
              onToggleHiddenTranslation={(locale) => handleToggleTranslationHidden('profile_image', locale)}
              placeholder="/photo.png"
            />
          </>
        )}

        {section === 'services' && (
          <>
            <MultilangField
              label="Section Title"
              fieldKey="title"
              translations={content.title || {}}
              onUpdate={handleFieldUpdate}
              hidden={hiddenFields.title}
              onToggleHidden={() => handleToggleFieldHidden('title')}
              hiddenTranslations={hiddenTranslations.title || {}}
              onToggleHiddenTranslation={(locale) => handleToggleTranslationHidden('title', locale)}
              placeholder="Services"
            />
            
            <MultilangField
              label="Section Subtitle"
              fieldKey="subtitle"
              translations={content.subtitle || {}}
              onUpdate={handleFieldUpdate}
              hidden={hiddenFields.subtitle}
              onToggleHidden={() => handleToggleFieldHidden('subtitle')}
              hiddenTranslations={hiddenTranslations.subtitle || {}}
              onToggleHiddenTranslation={(locale) => handleToggleTranslationHidden('subtitle', locale)}
              placeholder="Comprehensive solutions for your digital needs"
            />
            
            <div className={`space-y-4 p-4 border border-gray-300 dark:border-gray-700 rounded-xl bg-white/50 dark:bg-black/30 ${hiddenFields.hidden === true ? 'opacity-50 grayscale' : ''}`}>
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-semibold dark:text-gray-200 text-gray-800 flex items-center gap-2">
                  <GripVertical className="w-4 h-4" />
                  Services & Details
                </label>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleToggleFieldHidden('hidden')}
                    className={`text-xs rounded px-2 py-1 flex items-center gap-1 ${
                      hiddenFields.hidden === true ? 'bg-gray-800 text-gray-300' : 'bg-gray-600 text-white'
                    } hover:opacity-90`}
                  >
                    {hiddenFields.hidden === true ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    {hiddenFields.hidden === true ? 'Show Services' : 'Hide Services'}
                  </button>
                </div>
              </div>
              
              <ServicesManager
                content={content}
                onUpdate={handleFieldUpdate}
                hiddenFields={hiddenFields}
                onToggleFieldHidden={handleToggleFieldHidden}
                hiddenTranslations={hiddenTranslations}
                onToggleTranslationHidden={handleToggleTranslationHidden}
              />
            </div>
          </>
        )}

        {section === 'technical_skills' && (
          <>
            <MultilangField
              label="Section Title"
              fieldKey="title"
              translations={content.title || {}}
              onUpdate={handleFieldUpdate}
              hidden={hiddenFields.title}
              onToggleHidden={() => handleToggleFieldHidden('title')}
              hiddenTranslations={hiddenTranslations.title || {}}
              onToggleHiddenTranslation={(locale) => handleToggleTranslationHidden('title', locale)}
              placeholder="Technical Skills"
            />
            
            <MultilangField
              label="Section Subtitle"
              fieldKey="subtitle"
              translations={content.subtitle || {}}
              onUpdate={handleFieldUpdate}
              hidden={hiddenFields.subtitle}
              onToggleHidden={() => handleToggleFieldHidden('subtitle')}
              hiddenTranslations={hiddenTranslations.subtitle || {}}
              onToggleHiddenTranslation={(locale) => handleToggleTranslationHidden('subtitle', locale)}
              placeholder="Technologies and tools I work with"
            />
            
            <div className={`space-y-4 p-4 border border-gray-300 dark:border-gray-700 rounded-xl bg-white/50 dark:bg-black/30 ${hiddenFields.categories ? 'opacity-50 grayscale' : ''}`}>
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-semibold dark:text-gray-200 text-gray-800 flex items-center gap-2">
                  <GripVertical className="w-4 h-4" />
                  Skill Categories & Skills
                </label>
                <button 
                  onClick={() => handleToggleFieldHidden('categories')}
                  className={`text-xs rounded px-2 py-1 flex items-center gap-1 ${
                    hiddenFields.categories ? 'bg-gray-800 text-gray-300' : 'bg-gray-600 text-white'
                  } hover:opacity-90`}
                >
                  {hiddenFields.categories ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                  {hiddenFields.categories ? 'Show Categories' : 'Hide Categories'}
                </button>
              </div>
              
              <TechnicalSkillsManager
                content={content}
                onUpdate={handleFieldUpdate}
                hiddenFields={hiddenFields}
                onToggleFieldHidden={handleToggleFieldHidden}
                hiddenTranslations={hiddenTranslations}
                onToggleTranslationHidden={handleToggleTranslationHidden}
              />
            </div>
          </>
        )}

        
      </div>

      {/* Changes indicator */}
      {hasChanges && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            You have unsaved changes. Click "Save Changes" to persist them.
          </p>
        </div>
      )}
    </div>
  )
}
