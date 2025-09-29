"use client"

import { useState, useEffect } from 'react'
import { Plus, Trash2, Eye, EyeOff, GripVertical, Settings } from 'lucide-react'
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

interface Skill {
  name: string
  icon: string
  color: string
  category: string
}

interface SkillCategory {
  id: string
  name: string
  description: string
  skills: Skill[]
  hidden?: boolean
  hiddenTranslations?: Record<string, boolean>
}

interface TechnicalSkillsManagerProps {
  content: Record<string, any>
  onUpdate: (fieldKey: string, value: any) => void
  hiddenFields: Record<string, boolean>
  onToggleFieldHidden: (fieldKey: string) => void
  hiddenTranslations: Record<string, any>
  onToggleTranslationHidden: (fieldKey: string, locale: string) => void
}

export function TechnicalSkillsManager({
  content,
  onUpdate,
  hiddenFields,
  onToggleFieldHidden,
  hiddenTranslations,
  onToggleTranslationHidden
}: TechnicalSkillsManagerProps) {
  const [categories, setCategories] = useState<SkillCategory[]>([])
  const [localHiddenTranslations, setLocalHiddenTranslations] = useState<Record<string, any>>(hiddenTranslations)

  // Parse categories from content
  useEffect(() => {
    try {
      const categoriesString = content.categories?.en || content.categories || '[]'
      const parsedCategories = typeof categoriesString === 'string' ? JSON.parse(categoriesString) : categoriesString
      if (Array.isArray(parsedCategories)) {
        setCategories(parsedCategories)
      }
    } catch (error) {
      console.error('Error parsing categories:', error)
      setCategories([])
    }
  }, [content.categories])

  useEffect(() => {
    setLocalHiddenTranslations(hiddenTranslations)
  }, [hiddenTranslations])

  const handleCategoryUpdate = (categoryId: string, field: string, value: any) => {
    const updatedCategories = categories.map(category => {
      if (category.id === categoryId) {
        return { ...category, [field]: value }
      }
      return category
    })
    setCategories(updatedCategories)
    
    // Update the content with the new categories structure
    const categoriesTranslations = Object.fromEntries(
      SUPPORTED_LOCALES.map(locale => [
        locale.code,
        JSON.stringify(updatedCategories)
      ])
    )
    onUpdate('categories', categoriesTranslations)
  }

  const handleSkillUpdate = (categoryId: string, skillIndex: number, field: string, value: any) => {
    const updatedCategories = categories.map(category => {
      if (category.id === categoryId) {
        const updatedSkills = [...category.skills]
        updatedSkills[skillIndex] = { ...updatedSkills[skillIndex], [field]: value }
        return { ...category, skills: updatedSkills }
      }
      return category
    })
    setCategories(updatedCategories)
    
    // Update the content with the new categories structure
    const categoriesTranslations = Object.fromEntries(
      SUPPORTED_LOCALES.map(locale => [
        locale.code,
        JSON.stringify(updatedCategories)
      ])
    )
    onUpdate('categories', categoriesTranslations)
  }

  const handleAddSkill = (categoryId: string) => {
    const newSkill: Skill = {
      name: '',
      icon: '',
      color: 'text-gray-500',
      category: 'tool'
    }
    
    const updatedCategories = categories.map(category => {
      if (category.id === categoryId) {
        return { ...category, skills: [...category.skills, newSkill] }
      }
      return category
    })
    setCategories(updatedCategories)
    
    // Update the content
    const categoriesTranslations = Object.fromEntries(
      SUPPORTED_LOCALES.map(locale => [
        locale.code,
        JSON.stringify(updatedCategories)
      ])
    )
    onUpdate('categories', categoriesTranslations)
  }

  const handleRemoveSkill = (categoryId: string, skillIndex: number) => {
    if (window.confirm('Are you sure you want to remove this skill?')) {
      const updatedCategories = categories.map(category => {
        if (category.id === categoryId) {
          const updatedSkills = category.skills.filter((_, index) => index !== skillIndex)
          return { ...category, skills: updatedSkills }
        }
        return category
      })
      setCategories(updatedCategories)
      
      // Update the content
      const categoriesTranslations = Object.fromEntries(
        SUPPORTED_LOCALES.map(locale => [
          locale.code,
          JSON.stringify(updatedCategories)
        ])
      )
      onUpdate('categories', categoriesTranslations)
    }
  }

  return (
    <div className="space-y-6">
      {categories.map((category, categoryIndex) => (
        <div key={category.id} className={`p-4 border border-gray-300 dark:border-gray-700 rounded-xl bg-white/50 dark:bg-black/30 ${category.hidden ? 'opacity-50 grayscale' : ''}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <Settings className="w-5 h-5" />
              {category.name} ({category.skills.length} skills)
            </h3>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => handleCategoryUpdate(category.id, 'hidden', !category.hidden)}
                className={`text-xs rounded px-2 py-1 flex items-center gap-1 ${
                  category.hidden ? 'bg-gray-800 text-gray-300' : 'bg-gray-600 text-white'
                } hover:opacity-90`}
              >
                {category.hidden ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                {category.hidden ? 'Show Category' : 'Hide Category'}
              </button>
            </div>
          </div>

          {/* Category Name and Description */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category Name
              </label>
              <input
                type="text"
                value={category.name}
                onChange={(e) => handleCategoryUpdate(category.id, 'name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                placeholder="e.g., Full-Stack Development"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category Description
              </label>
              <input
                type="text"
                value={category.description}
                onChange={(e) => handleCategoryUpdate(category.id, 'description', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                placeholder="e.g., React, Next.js, Flutter, Node.js"
              />
            </div>
          </div>

          {/* Skills List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-md font-medium text-gray-700 dark:text-gray-300">
                Skills ({category.skills.length})
              </h4>
              <AdminButton 
                onClick={() => handleAddSkill(category.id)}
                className="text-xs px-2 py-1 bg-blue-600 hover:bg-blue-500 text-white"
              >
                <Plus className="w-3 h-3 mr-1" />
                Add Skill
              </AdminButton>
            </div>

            {category.skills.length === 0 && (
              <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                No skills added yet. Click "Add Skill" to add one.
              </p>
            )}

            {category.skills.map((skill, skillIndex) => (
              <div key={skillIndex} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900/50">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Skill {skillIndex + 1}: {skill.name || 'Untitled'}
                  </h5>
                  <AdminButton 
                    onClick={() => handleRemoveSkill(category.id, skillIndex)}
                    className="text-xs px-2 py-1 bg-red-600 hover:bg-red-500 text-white"
                  >
                    <Trash2 className="w-3 h-3" />
                  </AdminButton>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                      Skill Name
                    </label>
                    <input
                      type="text"
                      value={skill.name}
                      onChange={(e) => handleSkillUpdate(category.id, skillIndex, 'name', e.target.value)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      placeholder="e.g., React"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                      Icon
                    </label>
                    <input
                      type="text"
                      value={skill.icon}
                      onChange={(e) => handleSkillUpdate(category.id, skillIndex, 'icon', e.target.value)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      placeholder="e.g., SiReact"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                      Color
                    </label>
                    <input
                      type="text"
                      value={skill.color}
                      onChange={(e) => handleSkillUpdate(category.id, skillIndex, 'color', e.target.value)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      placeholder="e.g., text-cyan-400"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {categories.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <Settings className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No skill categories found. The Technical Skills section needs to be populated with data.</p>
        </div>
      )}
    </div>
  )
}
