import { NextRequest, NextResponse } from 'next/server'
import { translationService } from '@/lib/translation-service'

// POST /api/translations/batch - Batch translate multiple keys
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { translations, options } = body

    if (!translations || !Array.isArray(translations)) {
      return NextResponse.json(
        { success: false, error: 'Translations array is required' },
        { status: 400 }
      )
    }

    const result = await translationService.batchTranslate(translations, options)
    
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in batch translation:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to process batch translation' 
      },
      { status: 500 }
    )
  }
}
