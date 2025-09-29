# Automated Translation System

This document describes the fully automated translation workflow that connects Supabase with translation APIs and ensures consistent RTL/LTR handling.

## Overview

The automated translation system provides:
- **Real-time translation**: New content is automatically translated when added via Supabase admin
- **Consistent RTL/LTR handling**: All translations are processed through the MixedContent utility
- **Multiple translation providers**: Support for DeepL and Google Translate APIs
- **Fallback system**: Graceful handling of translation failures
- **Admin interface**: Complete management dashboard for monitoring and control

## Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Supabase      │    │  Translation     │    │   Frontend      │
│   Admin Panel   │───▶│  Engine          │───▶│   (All langs)   │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │
         ▼                       ▼
┌─────────────────┐    ┌──────────────────┐
│   Database      │    │  Translation     │
│   Triggers      │    │  Providers       │
└─────────────────┘    └──────────────────┘
```

## Components

### 1. Translation Engine (`lib/translation-engine.ts`)

The core translation engine that handles:
- Multiple translation providers (DeepL, Google Translate)
- RTL/LTR processing using MixedContent utility
- Fallback mechanisms for failed translations
- Batch processing capabilities

**Key Features:**
- Provider abstraction for easy switching
- Automatic technical term preservation
- Arabic RTL flow maintenance
- Error handling and retry logic

### 2. Translation Processor (`lib/translation-processor.ts`)

Background job processor that:
- Queues translation requests
- Processes jobs asynchronously
- Handles retries and error recovery
- Provides status monitoring

**Key Features:**
- Priority-based job processing
- Automatic retry with exponential backoff
- Job status tracking
- Cleanup of old completed jobs

### 3. Database Triggers (`scripts/create-auto-translation-trigger.sql`)

Supabase triggers that:
- Detect content changes in real-time
- Trigger translation webhooks
- Maintain data consistency
- Provide bulk translation capabilities

**Supported Tables:**
- `translations` - Direct translation updates
- `projects` - Project content changes
- `services` - Service content changes

### 4. API Endpoints

#### Translation APIs
- `POST /api/translate` - Single translation
- `POST /api/translate/batch` - Batch translation
- `POST /api/translate/webhook` - Webhook handler
- `GET /api/translate` - Status check

#### Management APIs
- `GET /api/translate/status` - Translation statistics
- `GET /api/translate/jobs/stats` - Job statistics
- `POST /api/translate/bulk` - Trigger bulk translation
- `POST /api/translate/jobs/retry` - Retry failed jobs

### 5. Admin Interface (`app/admin/translations/auto/page.tsx`)

Complete management dashboard featuring:
- Real-time status monitoring
- Translation statistics
- Job queue management
- Bulk operations
- Configuration guidance

## Setup Instructions

### 1. Environment Variables

Add these to your `.env.local` file:

```bash
# Translation API Keys
DEEPL_API_KEY=your_deepl_api_key_here
DEEPL_PRO=false  # Set to "true" for DeepL Pro
GOOGLE_TRANSLATE_API_KEY=your_google_api_key_here

# Auto-translation settings
AUTO_START_TRANSLATION_PROCESSOR=true
WEBHOOK_URL=http://localhost:3000/api/translate/webhook
```

### 2. Database Setup

Run the SQL scripts in order:

```bash
# 1. Create translation jobs table
psql -f scripts/create-translation-jobs-schema.sql

# 2. Create auto-translation triggers
psql -f scripts/create-auto-translation-trigger.sql

# 3. Update existing upsert_translation function (if needed)
psql -f scripts/create-translations-schema.sql
```

### 3. Start the Translation Processor

The processor can be started in two ways:

**Automatic (Production):**
Set `AUTO_START_TRANSLATION_PROCESSOR=true` in environment variables.

**Manual (Development):**
```typescript
import { translationProcessor } from '@/lib/translation-processor'

// Start the processor
translationProcessor.start(30000) // Check every 30 seconds
```

## Usage

### 1. Adding New Content

When you add new content through the Supabase admin panel:

1. **Content is detected** by database triggers
2. **Translation job is queued** automatically
3. **Background processor** picks up the job
4. **Translation API** generates translations
5. **MixedContent utility** processes RTL/LTR rules
6. **Translations are saved** to Supabase
7. **Frontend updates** automatically

### 2. Manual Translation

You can manually trigger translations:

```typescript
// Single translation
const response = await fetch('/api/translate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    key: 'new.content.key',
    text: 'Content to translate',
    sourceLanguage: 'en',
    context: 'manual_translation'
  })
})

// Batch translation
const response = await fetch('/api/translate/batch', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    translations: [
      { key: 'key1', text: 'Text 1' },
      { key: 'key2', text: 'Text 2' }
    ],
    sourceLanguage: 'en'
  })
})
```

### 3. Admin Management

Access the admin interface at `/admin/translations/auto` to:
- Monitor translation status
- View job statistics
- Trigger bulk translations
- Retry failed jobs
- Check configuration

## RTL/LTR Processing

The system automatically applies RTL/LTR rules to all translations:

### Technical Terms
Technical terms like "React", "Next.js", "AWS" are:
- Preserved in English
- Wrapped with `<span dir="ltr">` tags
- Maintained in correct reading order

### Translatable Terms
Professional terms are translated:
- "Full-Stack Developer" → "مطور متكامل"
- "Software Engineer" → "مهندس برمجيات"
- "Data Engineer" → "مهندس بيانات"

### Arabic RTL Flow
Arabic translations maintain:
- Proper right-to-left reading order
- Correct word spacing
- Natural sentence structure

## Monitoring and Maintenance

### 1. Health Checks

Monitor the system health:

```bash
# Check translation engine status
curl http://localhost:3000/api/translate

# Check job statistics
curl http://localhost:3000/api/translate/jobs/stats

# Check translation completion
curl http://localhost:3000/api/translate/status
```

### 2. Error Handling

The system includes comprehensive error handling:

- **Provider failures**: Automatic fallback to alternative providers
- **API rate limits**: Exponential backoff retry
- **Invalid content**: Skip non-translatable content
- **Database errors**: Log and retry with backoff

### 3. Performance Optimization

- **Job queuing**: Prevents API rate limit issues
- **Batch processing**: Efficient handling of multiple translations
- **Caching**: Translation results are cached in database
- **Cleanup**: Old completed jobs are automatically removed

## Troubleshooting

### Common Issues

1. **No translations appearing**
   - Check API keys are configured
   - Verify webhook URL is accessible
   - Check job queue for failed jobs

2. **RTL/LTR issues**
   - Ensure MixedContent utility is working
   - Check technical terms list is up to date
   - Verify Arabic translations are properly formatted

3. **Performance issues**
   - Monitor job queue size
   - Check API rate limits
   - Consider increasing processor interval

### Debug Mode

Enable debug logging:

```bash
# Set debug environment variable
DEBUG_TRANSLATION=true

# Check logs
tail -f logs/translation.log
```

## Adding New Languages

To add support for new languages:

1. **Update language mapping** in `lib/translation-engine.ts`
2. **Add language columns** to database schema
3. **Update translation functions** to include new language
4. **Test with sample content**

Example for adding Spanish:

```sql
-- Add Spanish column to translations table
ALTER TABLE translations ADD COLUMN es TEXT;

-- Update upsert_translation function
-- (Add p_es parameter and handling)
```

## Security Considerations

- **API Keys**: Store securely in environment variables
- **Webhook Security**: Implement authentication for webhook endpoints
- **Rate Limiting**: Monitor API usage to prevent abuse
- **Content Validation**: Sanitize input to prevent injection attacks

## Cost Management

- **API Usage**: Monitor translation API usage and costs
- **Job Cleanup**: Regular cleanup of old jobs to save storage
- **Caching**: Reuse existing translations when possible
- **Batch Processing**: Group translations to reduce API calls

## Future Enhancements

- **Machine Learning**: Custom translation models for domain-specific content
- **Quality Scoring**: Automatic translation quality assessment
- **A/B Testing**: Compare different translation providers
- **Analytics**: Detailed usage and performance metrics
- **Custom Rules**: User-defined RTL/LTR processing rules
