"use client"

import { useState, useEffect } from 'react'
import { MultilangField } from './multilang-field'
import { AdminButton } from '@/components/ui/admin-button'
import { Plus, Trash2, Eye, EyeOff } from 'lucide-react'

const SUPPORTED_LOCALES = ['en', 'ar', 'tr', 'it', 'fr', 'de']

interface DynamicListItem {
  id: string
  title: Record<string, string>
  description: Record<string, string>
  hidden?: boolean
  hiddenTranslations?: Record<string, Record<string, boolean>>
}

interface MultilangDynamicListProps {
  label: string
  fieldKey: string
  items: DynamicListItem[]
  onUpdate: (fieldKey: string, items: DynamicListItem[]) => void
  hidden?: boolean
  onToggleHidden?: () => void
  hiddenTranslations?: Record<string, any>
  onToggleHiddenTranslation?: (itemId: string, locale: string) => void
}

export function MultilangDynamicList({
  label,
  fieldKey,
  items,
  onUpdate,
  hidden = false,
  onToggleHidden,
  hiddenTranslations = {},
  onToggleHiddenTranslation
}: MultilangDynamicListProps) {
  const [localItems, setLocalItems] = useState<DynamicListItem[]>(items)
  const [localHiddenTranslations, setLocalHiddenTranslations] = useState<Record<string, any>>(hiddenTranslations)

  // Sync local state with props
  useEffect(() => {
    setLocalItems(items)
  }, [items])

  useEffect(() => {
    setLocalHiddenTranslations(hiddenTranslations)
  }, [hiddenTranslations])

  const addItem = () => {
    const newItem: DynamicListItem = {
      id: `item_${localItems.length}_${Date.now()}`,
      title: { en: '', ar: '', tr: '', it: '', fr: '', de: '' },
      description: { en: '', ar: '', tr: '', it: '', fr: '', de: '' },
      hidden: false,
      hiddenTranslations: {}
    }
    const newItems = [...localItems, newItem]
    setLocalItems(newItems)
    onUpdate(fieldKey, newItems)
  }

  const removeItem = (itemId: string) => {
    const newItems = localItems.filter(item => item.id !== itemId)
    setLocalItems(newItems)
    onUpdate(fieldKey, newItems)
  }

  const updateItemField = (itemId: string, field: 'title' | 'description', translations: Record<string, string>) => {
    const newItems = localItems.map(item => 
      item.id === itemId 
        ? { ...item, [field]: translations }
        : item
    )
    setLocalItems(newItems)
    onUpdate(fieldKey, newItems)
  }

  const toggleItemHidden = (itemId: string) => {
    const newItems = localItems.map(item => 
      item.id === itemId 
        ? { ...item, hidden: !item.hidden }
        : item
    )
    setLocalItems(newItems)
    onUpdate(fieldKey, newItems)
  }

  const toggleItemTranslationHidden = (itemId: string, locale: string) => {
    const currentItemHidden = localHiddenTranslations[itemId] || {}
    const newItemHidden = {
      ...currentItemHidden,
      [locale]: !currentItemHidden[locale]
    }
    
    const newHiddenTranslations = {
      ...localHiddenTranslations,
      [itemId]: newItemHidden
    }
    
    setLocalHiddenTranslations(newHiddenTranslations)
    onToggleHiddenTranslation?.(itemId, locale)
  }

  return (
    <div className="space-y-3">
      {/* List header - always visible */}
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
          <AdminButton 
            onClick={addItem}
            className="text-xs px-2 py-1 bg-green-600 hover:bg-green-500 text-white"
          >
            <Plus className="w-3 h-3 mr-1" />
            Add Item
          </AdminButton>
        </div>
      </div>

      {/* List content - can be hidden */}
      <div className={`space-y-4 ${hidden ? 'opacity-50 grayscale pointer-events-none' : ''}`}>
        {localItems.map((item, index) => (
          <div key={item.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white/50 dark:bg-black/30">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Item {index + 1}
              </h4>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => toggleItemHidden(item.id)}
                  className={`text-xs rounded px-2 py-1 flex items-center gap-1 ${
                    item.hidden ? 'bg-gray-800 text-gray-300' : 'bg-gray-600 text-white'
                  } hover:opacity-90`}
                >
                  {item.hidden ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                  {item.hidden ? 'Show' : 'Hide'}
                </button>
                <AdminButton 
                  onClick={() => removeItem(item.id)}
                  className="text-xs px-2 py-1 bg-red-600 hover:bg-red-500 text-white"
                >
                  <Trash2 className="w-3 h-3 mr-1" />
                  Remove
                </AdminButton>
              </div>
            </div>

            <div className={`space-y-3 ${item.hidden ? 'opacity-50 grayscale pointer-events-none' : ''}`}>
              <MultilangField
                label="Title"
                fieldKey={`${item.id}_title`}
                translations={item.title}
                onUpdate={(_, translations) => updateItemField(item.id, 'title', translations)}
                hiddenTranslations={localHiddenTranslations[item.id] || {}}
                onToggleHiddenTranslation={(locale) => toggleItemTranslationHidden(item.id, locale)}
              />
              
              <MultilangField
                label="Description"
                fieldKey={`${item.id}_description`}
                translations={item.description}
                onUpdate={(_, translations) => updateItemField(item.id, 'description', translations)}
                type="textarea"
                rows={3}
                hiddenTranslations={localHiddenTranslations[item.id] || {}}
                onToggleHiddenTranslation={(locale) => toggleItemTranslationHidden(item.id, locale)}
              />
            </div>
          </div>
        ))}

        {localItems.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <p>No items yet. Click "Add Item" to get started.</p>
          </div>
        )}
      </div>
    </div>
  )
}
