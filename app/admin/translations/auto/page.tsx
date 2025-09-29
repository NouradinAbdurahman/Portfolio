"use client"

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
// import { Badge } from '@/components/ui/badge'
import { RefreshCw, Play, CheckCircle, XCircle } from 'lucide-react'

interface TranslationStatus {
  available: boolean
  providers: string[]
  supportedLanguages: string[]
}

interface JobStats {
  total_jobs: number
  pending_jobs: number
  processing_jobs: number
  completed_jobs: number
  failed_jobs: number
  avg_processing_time: string
}

interface TranslationStatusData {
  total_keys: number
  complete_translations: number
  incomplete_translations: number
  missing_arabic: number
  missing_turkish: number
  missing_italian: number
  missing_french: number
  missing_german: number
}

export default function AutoTranslationPage() {
  const [translationStatus, setTranslationStatus] = useState<TranslationStatus | null>(null)
  const [jobStats, setJobStats] = useState<JobStats | null>(null)
  const [translationData, setTranslationData] = useState<TranslationStatusData | null>(null)
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      
      // Fetch translation status
      const statusResponse = await fetch('/api/translate')
      const statusData = await statusResponse.json()
      setTranslationStatus(statusData)

      // Fetch job stats
      const statsResponse = await fetch('/api/translate/jobs/stats')
      if (statsResponse.ok) {
        const statsData = await statsResponse.json()
        setJobStats(statsData)
      }

      // Fetch translation data
      const translationResponse = await fetch('/api/translate/status')
      if (translationResponse.ok) {
        const translationData = await translationResponse.json()
        setTranslationData(translationData)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const triggerBulkTranslation = async () => {
    try {
      setProcessing(true)
      const response = await fetch('/api/translate/bulk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        const result = await response.json()
        alert(`Bulk translation triggered: ${result.triggered} keys processed`)
        fetchData()
      } else {
        const error = await response.json()
        alert(`Error: ${error.error}`)
      }
    } catch (error) {
      console.error('Error triggering bulk translation:', error)
      alert('Error triggering bulk translation')
    } finally {
      setProcessing(false)
    }
  }

  const retryFailedJobs = async () => {
    try {
      setProcessing(true)
      const response = await fetch('/api/translate/jobs/retry', {
        method: 'POST',
      })

      if (response.ok) {
        const result = await response.json()
        alert(`Retried ${result.retried} failed jobs`)
        fetchData()
      } else {
        const error = await response.json()
        alert(`Error: ${error.error}`)
      }
    } catch (error) {
      console.error('Error retrying failed jobs:', error)
      alert('Error retrying failed jobs')
    } finally {
      setProcessing(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="w-8 h-8 animate-spin" />
          <span className="ml-2">Loading translation status...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <Typography variant="h1" className="text-3xl font-bold">
          Auto Translation Management
        </Typography>
        <Button onClick={fetchData} variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Translation Engine Status */}
      <Card className="p-6">
        <Typography variant="h2" className="text-xl font-semibold mb-4">
          Translation Engine Status
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-2">
            {translationStatus?.available ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <XCircle className="w-5 h-5 text-red-500" />
            )}
            <span>Engine Available</span>
          </div>
          <div>
            <Typography variant="p" className="text-sm text-muted-foreground">
              Providers: {translationStatus?.providers.join(', ') || 'None'}
            </Typography>
          </div>
          <div>
            <Typography variant="p" className="text-sm text-muted-foreground">
              Languages: {translationStatus?.supportedLanguages.join(', ') || 'None'}
            </Typography>
          </div>
        </div>
      </Card>

      {/* Translation Statistics */}
      {translationData && (
        <Card className="p-6">
          <Typography variant="h2" className="text-xl font-semibold mb-4">
            Translation Statistics
          </Typography>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <Typography variant="h3" className="text-2xl font-bold">
                {translationData.total_keys}
              </Typography>
              <Typography variant="p" className="text-sm text-muted-foreground">
                Total Keys
              </Typography>
            </div>
            <div className="text-center">
              <Typography variant="h3" className="text-2xl font-bold text-green-600">
                {translationData.complete_translations}
              </Typography>
              <Typography variant="p" className="text-sm text-muted-foreground">
                Complete
              </Typography>
            </div>
            <div className="text-center">
              <Typography variant="h3" className="text-2xl font-bold text-yellow-600">
                {translationData.incomplete_translations}
              </Typography>
              <Typography variant="p" className="text-sm text-muted-foreground">
                Incomplete
              </Typography>
            </div>
            <div className="text-center">
              <Typography variant="h3" className="text-2xl font-bold">
                {Math.round((translationData.complete_translations / translationData.total_keys) * 100)}%
              </Typography>
              <Typography variant="p" className="text-sm text-muted-foreground">
                Completion Rate
              </Typography>
            </div>
          </div>

          <div className="mt-6">
            <Typography variant="h3" className="text-lg font-semibold mb-2">
              Missing Translations by Language
            </Typography>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              <span className={`inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium ${translationData.missing_arabic > 0 ? 'border-transparent bg-destructive text-white' : 'border-transparent bg-primary text-primary-foreground'}`}>
                Arabic: {translationData.missing_arabic}
              </span>
              <span className={`inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium ${translationData.missing_turkish > 0 ? 'border-transparent bg-destructive text-white' : 'border-transparent bg-primary text-primary-foreground'}`}>
                Turkish: {translationData.missing_turkish}
              </span>
              <span className={`inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium ${translationData.missing_italian > 0 ? 'border-transparent bg-destructive text-white' : 'border-transparent bg-primary text-primary-foreground'}`}>
                Italian: {translationData.missing_italian}
              </span>
              <span className={`inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium ${translationData.missing_french > 0 ? 'border-transparent bg-destructive text-white' : 'border-transparent bg-primary text-primary-foreground'}`}>
                French: {translationData.missing_french}
              </span>
              <span className={`inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium ${translationData.missing_german > 0 ? 'border-transparent bg-destructive text-white' : 'border-transparent bg-primary text-primary-foreground'}`}>
                German: {translationData.missing_german}
              </span>
            </div>
          </div>
        </Card>
      )}

      {/* Job Statistics */}
      {jobStats && (
        <Card className="p-6">
          <Typography variant="h2" className="text-xl font-semibold mb-4">
            Translation Jobs
          </Typography>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <Typography variant="h3" className="text-2xl font-bold">
                {jobStats.total_jobs}
              </Typography>
              <Typography variant="p" className="text-sm text-muted-foreground">
                Total Jobs
              </Typography>
            </div>
            <div className="text-center">
              <Typography variant="h3" className="text-2xl font-bold text-yellow-600">
                {jobStats.pending_jobs}
              </Typography>
              <Typography variant="p" className="text-sm text-muted-foreground">
                Pending
              </Typography>
            </div>
            <div className="text-center">
              <Typography variant="h3" className="text-2xl font-bold text-blue-600">
                {jobStats.processing_jobs}
              </Typography>
              <Typography variant="p" className="text-sm text-muted-foreground">
                Processing
              </Typography>
            </div>
            <div className="text-center">
              <Typography variant="h3" className="text-2xl font-bold text-green-600">
                {jobStats.completed_jobs}
              </Typography>
              <Typography variant="p" className="text-sm text-muted-foreground">
                Completed
              </Typography>
            </div>
            <div className="text-center">
              <Typography variant="h3" className="text-2xl font-bold text-red-600">
                {jobStats.failed_jobs}
              </Typography>
              <Typography variant="p" className="text-sm text-muted-foreground">
                Failed
              </Typography>
            </div>
          </div>
        </Card>
      )}

      {/* Actions */}
      <Card className="p-6">
        <Typography variant="h2" className="text-xl font-semibold mb-4">
          Actions
        </Typography>
        <div className="flex flex-wrap gap-4">
          <Button 
            onClick={triggerBulkTranslation} 
            disabled={processing || !translationStatus?.available}
            className="flex items-center"
          >
            <Play className="w-4 h-4 mr-2" />
            Trigger Bulk Translation
          </Button>
          
          <Button 
            onClick={retryFailedJobs} 
            disabled={processing}
            variant="outline"
            className="flex items-center"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Retry Failed Jobs
          </Button>
        </div>
      </Card>

      {/* Configuration Help */}
      <Card className="p-6">
        <Typography variant="h2" className="text-xl font-semibold mb-4">
          Configuration
        </Typography>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>To enable automatic translation, add these environment variables:</p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li><code>DEEPL_API_KEY</code> - Your DeepL API key</li>
            <li><code>DEEPL_PRO</code> - Set to "true" if using DeepL Pro</li>
            <li><code>GOOGLE_TRANSLATE_API_KEY</code> - Your Google Translate API key</li>
            <li><code>AUTO_START_TRANSLATION_PROCESSOR</code> - Set to "true" to auto-start the processor</li>
          </ul>
        </div>
      </Card>
    </div>
  )
}
