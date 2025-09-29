"use client"

import { useState, useEffect } from 'react'
import { Plus, Trash2, Eye, EyeOff, GripVertical, Briefcase } from 'lucide-react'
import { AdminButton } from '@/components/ui/admin-button'
import { MultilangField } from './multilang-field'

const SUPPORTED_LOCALES = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦' },
  { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' }
]

interface Service {
  id: string
  title: Record<string, string>
  description: Record<string, string>
  icon: string
  technologies: string[]
  hidden?: boolean
  hiddenTranslations?: Record<string, boolean>
}

interface ServicesManagerProps {
  content: Record<string, any>
  onUpdate: (fieldKey: string, value: any) => void
  hiddenFields: Record<string, boolean>
  onToggleFieldHidden: (fieldKey: string) => void
  hiddenTranslations: Record<string, any>
  onToggleTranslationHidden: (fieldKey: string, locale: string) => void
}

export function ServicesManager({
  content,
  onUpdate,
  hiddenFields,
  onToggleFieldHidden,
  hiddenTranslations,
  onToggleTranslationHidden
}: ServicesManagerProps) {
  const [services, setServices] = useState<Service[]>([])
  const [localHiddenTranslations, setLocalHiddenTranslations] = useState<Record<string, any>>(hiddenTranslations)

  // Parse services from content
  useEffect(() => {
    try {
      const servicesString = content.items?.en || content.items || '[]'
      const parsedServices = typeof servicesString === 'string' ? JSON.parse(servicesString) : servicesString
      if (Array.isArray(parsedServices)) {
        // Ensure each service has all required properties with defaults
        const normalizedServices = parsedServices.map(service => ({
          id: service.id || `service_${Date.now()}`,
          title: service.title || Object.fromEntries(SUPPORTED_LOCALES.map(l => [l.code, ''])),
          description: service.description || Object.fromEntries(SUPPORTED_LOCALES.map(l => [l.code, ''])),
          icon: service.icon || '',
          technologies: service.technologies || [],
          hidden: service.hidden || false,
          hiddenTranslations: service.hiddenTranslations || {}
        }))
        setServices(normalizedServices)
      }
    } catch (error) {
      console.error('Error parsing services:', error)
      setServices([])
    }
  }, [content.items])

  useEffect(() => {
    setLocalHiddenTranslations(hiddenTranslations)
  }, [hiddenTranslations])

  const handleServiceUpdate = (serviceId: string, field: string, value: any) => {
    const updatedServices = services.map(service => {
      if (service.id === serviceId) {
        return { ...service, [field]: value }
      }
      return service
    })
    setServices(updatedServices)
    
    // Update the content with the new services structure
    const servicesTranslations = Object.fromEntries(
      SUPPORTED_LOCALES.map(locale => [
        locale.code,
        JSON.stringify(updatedServices)
      ])
    )
    onUpdate('items', servicesTranslations)
  }

  const handleServiceTranslationUpdate = (serviceId: string, field: string, locale: string, value: string) => {
    const updatedServices = services.map(service => {
      if (service.id === serviceId) {
        const updatedTranslations = { ...service[field] }
        updatedTranslations[locale] = value
        return { ...service, [field]: updatedTranslations }
      }
      return service
    })
    setServices(updatedServices)
    
    // Update the content with the new services structure
    const servicesTranslations = Object.fromEntries(
      SUPPORTED_LOCALES.map(locale => [
        locale.code,
        JSON.stringify(updatedServices)
      ])
    )
    onUpdate('items', servicesTranslations)
  }

  const handleAddService = () => {
    const newService: Service = {
      id: `service_${Date.now()}`,
      title: Object.fromEntries(SUPPORTED_LOCALES.map(l => [l.code, ''])),
      description: Object.fromEntries(SUPPORTED_LOCALES.map(l => [l.code, ''])),
      icon: '',
      technologies: [],
      hidden: false,
      hiddenTranslations: {}
    }
    
    const updatedServices = [...services, newService]
    setServices(updatedServices)
    
    // Update the content
    const servicesTranslations = Object.fromEntries(
      SUPPORTED_LOCALES.map(locale => [
        locale.code,
        JSON.stringify(updatedServices)
      ])
    )
    onUpdate('items', servicesTranslations)
  }

  const handleRemoveService = (serviceId: string) => {
    if (window.confirm('Are you sure you want to remove this service?')) {
      const updatedServices = services.filter(service => service.id !== serviceId)
      setServices(updatedServices)
      
      // Update the content
      const servicesTranslations = Object.fromEntries(
        SUPPORTED_LOCALES.map(locale => [
          locale.code,
          JSON.stringify(updatedServices)
        ])
      )
      onUpdate('items', servicesTranslations)
    }
  }

  const handleTechnologyUpdate = (serviceId: string, techIndex: number, value: string) => {
    const updatedServices = services.map(service => {
      if (service.id === serviceId) {
        const updatedTechnologies = [...(service.technologies || [])]
        updatedTechnologies[techIndex] = value
        return { ...service, technologies: updatedTechnologies }
      }
      return service
    })
    setServices(updatedServices)
    
    // Update the content
    const servicesTranslations = Object.fromEntries(
      SUPPORTED_LOCALES.map(locale => [
        locale.code,
        JSON.stringify(updatedServices)
      ])
    )
    onUpdate('items', servicesTranslations)
  }

  const handleAddTechnology = (serviceId: string) => {
    const updatedServices = services.map(service => {
      if (service.id === serviceId) {
        return { ...service, technologies: [...(service.technologies || []), ''] }
      }
      return service
    })
    setServices(updatedServices)
    
    // Update the content
    const servicesTranslations = Object.fromEntries(
      SUPPORTED_LOCALES.map(locale => [
        locale.code,
        JSON.stringify(updatedServices)
      ])
    )
    onUpdate('items', servicesTranslations)
  }

  const handleRemoveTechnology = (serviceId: string, techIndex: number) => {
    const updatedServices = services.map(service => {
      if (service.id === serviceId) {
        const updatedTechnologies = (service.technologies || []).filter((_, index) => index !== techIndex)
        return { ...service, technologies: updatedTechnologies }
      }
      return service
    })
    setServices(updatedServices)
    
    // Update the content
    const servicesTranslations = Object.fromEntries(
      SUPPORTED_LOCALES.map(locale => [
        locale.code,
        JSON.stringify(updatedServices)
      ])
    )
    onUpdate('items', servicesTranslations)
  }

  return (
    <div className="space-y-6">
      {services.map((service, serviceIndex) => (
        <div key={service.id} className={`p-4 border border-gray-300 dark:border-gray-700 rounded-xl bg-white/50 dark:bg-black/30 ${service.hidden ? 'opacity-50 grayscale' : ''}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              Service {serviceIndex + 1}: {service.title.en || 'Untitled Service'}
            </h3>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => handleServiceUpdate(service.id, 'hidden', !service.hidden)}
                className={`text-xs rounded px-2 py-1 flex items-center gap-1 ${
                  service.hidden ? 'bg-gray-800 text-gray-300' : 'bg-gray-600 text-white'
                } hover:opacity-90`}
              >
                {service.hidden ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                {service.hidden ? 'Show Service' : 'Hide Service'}
              </button>
              <AdminButton 
                onClick={() => handleRemoveService(service.id)}
                className="text-xs px-2 py-1 bg-red-600 hover:bg-red-500 text-white"
              >
                <Trash2 className="w-3 h-3" />
              </AdminButton>
            </div>
          </div>

          {/* Service Icon */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Service Icon
            </label>
            <input
              type="text"
              value={service.icon}
              onChange={(e) => handleServiceUpdate(service.id, 'icon', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              placeholder="e.g., Code, Monitor, Cloud, Database"
            />
          </div>

          {/* Service Title - Multi-language */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Service Title
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {SUPPORTED_LOCALES.map(locale => (
                <div key={locale.code} className={`${localHiddenTranslations[service.id]?.title?.[locale.code] ? 'opacity-50 grayscale' : ''}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                      {locale.flag} {locale.label}
                    </span>
                    <button
                      onClick={() => {
                        setLocalHiddenTranslations(prev => ({
                          ...prev,
                          [service.id]: {
                            ...prev[service.id],
                            title: {
                              ...prev[service.id]?.title,
                              [locale.code]: !prev[service.id]?.title?.[locale.code]
                            }
                          }
                        }))
                        onToggleTranslationHidden('items', locale.code)
                      }}
                      className={`text-xs rounded px-1 py-0.5 ${
                        localHiddenTranslations[service.id]?.title?.[locale.code] 
                          ? 'bg-gray-800 text-gray-300' 
                          : 'bg-gray-600 text-white'
                      } hover:opacity-90`}
                    >
                      {localHiddenTranslations[service.id]?.title?.[locale.code] ? <Eye className="w-2 h-2" /> : <EyeOff className="w-2 h-2" />}
                    </button>
                  </div>
                  <input
                    type="text"
                    value={service.title[locale.code] || ''}
                    onChange={(e) => handleServiceTranslationUpdate(service.id, 'title', locale.code, e.target.value)}
                    className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    placeholder={`Service title in ${locale.label}`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Service Description - Multi-language */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Service Description
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {SUPPORTED_LOCALES.map(locale => (
                <div key={locale.code} className={`${localHiddenTranslations[service.id]?.description?.[locale.code] ? 'opacity-50 grayscale' : ''}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                      {locale.flag} {locale.label}
                    </span>
                    <button
                      onClick={() => {
                        setLocalHiddenTranslations(prev => ({
                          ...prev,
                          [service.id]: {
                            ...prev[service.id],
                            description: {
                              ...prev[service.id]?.description,
                              [locale.code]: !prev[service.id]?.description?.[locale.code]
                            }
                          }
                        }))
                        onToggleTranslationHidden('items', locale.code)
                      }}
                      className={`text-xs rounded px-1 py-0.5 ${
                        localHiddenTranslations[service.id]?.description?.[locale.code] 
                          ? 'bg-gray-800 text-gray-300' 
                          : 'bg-gray-600 text-white'
                      } hover:opacity-90`}
                    >
                      {localHiddenTranslations[service.id]?.description?.[locale.code] ? <Eye className="w-2 h-2" /> : <EyeOff className="w-2 h-2" />}
                    </button>
                  </div>
                  <textarea
                    value={service.description[locale.code] || ''}
                    onChange={(e) => handleServiceTranslationUpdate(service.id, 'description', locale.code, e.target.value)}
                    rows={3}
                    className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    placeholder={`Service description in ${locale.label}`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Technologies */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Technologies ({service.technologies?.length || 0})
              </label>
              <AdminButton 
                onClick={() => handleAddTechnology(service.id)}
                className="text-xs px-2 py-1 bg-blue-600 hover:bg-blue-500 text-white"
              >
                <Plus className="w-3 h-3 mr-1" />
                Add Technology
              </AdminButton>
            </div>
            
            <div className="space-y-2">
              {(service.technologies || []).map((tech, techIndex) => (
                <div key={techIndex} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={tech}
                    onChange={(e) => handleTechnologyUpdate(service.id, techIndex, e.target.value)}
                    className="flex-1 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    placeholder="e.g., React, Next.js, TypeScript"
                  />
                  <AdminButton 
                    onClick={() => handleRemoveTechnology(service.id, techIndex)}
                    className="text-xs px-2 py-1 bg-red-600 hover:bg-red-500 text-white"
                  >
                    <Trash2 className="w-3 h-3" />
                  </AdminButton>
                </div>
              ))}
              
              {(service.technologies || []).length === 0 && (
                <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                  No technologies added yet. Click "Add Technology" to add one.
                </p>
              )}
            </div>
          </div>
        </div>
      ))}

      {services.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No services found. The Services section needs to be populated with data.</p>
        </div>
      )}
    </div>
  )
}
