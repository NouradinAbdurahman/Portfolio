import { NextRequest, NextResponse } from 'next/server'
import { translationService } from '@/lib/translation-service'

// GET /api/translations/review - Get translations needing review
export async function GET() {
  try {
    const translations = await translationService.getTranslationsNeedingReview()
    
    return NextResponse.json({ 
      success: true, 
      translations 
    })
  } catch (error) {
    console.error('Error fetching translations needing review:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch translations needing review' 
      },
      { status: 500 }
    )
  }
}

// POST /api/translations/review - Mark translation as reviewed
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { key } = body

    if (!key) {
      return NextResponse.json(
        { success: false, error: 'Key is required' },
        { status: 400 }
      )
    }

    const success = await translationService.markAsReviewed(key)
    
    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Failed to mark translation as reviewed' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error marking translation as reviewed:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to mark translation as reviewed' 
      },
      { status: 500 }
    )
  }
}
