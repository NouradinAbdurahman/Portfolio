# Translation System Documentation

## Overview

This portfolio website uses a centralized translation system built on Supabase that supports automatic translation generation and manual review workflows. The system supports 6 languages: English (en), Arabic (ar), Turkish (tr), Italian (it), French (fr), and German (de).

## Architecture

### Database Schema

The translations are stored in a `translations` table with the following structure:

```sql
CREATE TABLE translations (
  id BIGSERIAL PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  en TEXT NOT NULL, -- English is the base language
  ar TEXT, -- Arabic
  tr TEXT, -- Turkish
  it TEXT, -- Italian
  fr TEXT, -- French
  de TEXT, -- German
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  auto_translated BOOLEAN DEFAULT FALSE,
  needs_review BOOLEAN DEFAULT FALSE
);
```

### Key Components

1. **Translation Service** (`lib/translation-service.ts`): Core service for managing translations
2. **Supabase Hooks** (`hooks/use-supabase-translations.ts`): React hooks for frontend components
3. **API Routes** (`app/api/translations/`): REST API for translation management
4. **Admin Interface** (`components/admin/translation-manager.tsx`): UI for managing translations
5. **Auto-translation**: DeepL API integration for automatic translation generation

## Usage

### Frontend Components

Use the `useSupabaseTranslations` hook in your components:

```tsx
import { useSupabaseTranslations } from "@/hooks/use-supabase-translations"

function MyComponent() {
  const { t } = useSupabaseTranslations()
  
  return (
    <div>
      <h1>{t('hero.title', 'Default Title')}</h1>
      <p>{t('hero.subtitle', 'Default subtitle')}</p>
    </div>
  )
}
```

### Server Components

For server-side rendering, use the server functions:

```tsx
import { getServerTranslations, getServerTranslation } from "@/hooks/use-supabase-translations"

export default async function MyPage() {
  const translations = await getServerTranslations('en')
  const title = await getServerTranslation('hero.title', 'en')
  
  return <h1>{title}</h1>
}
```

### Translation Keys

Translation keys follow a hierarchical structure:

- `hero.title` - Hero section title
- `about.name` - About section name
- `projects.title` - Projects section title
- `projects.items.project-name.title` - Specific project title
- `navigation.home` - Navigation items
- `common.loading` - Common UI text

## Adding New Languages

### 1. Update Database Schema

Add the new language column to the translations table:

```sql
ALTER TABLE translations ADD COLUMN [language_code] TEXT;
```

### 2. Update Translation Service

Add the new language to the `SUPPORTED_LANGUAGES` constant in `lib/translation-service.ts`:

```typescript
const SUPPORTED_LANGUAGES = {
  en: 'English',
  ar: 'Arabic',
  tr: 'Turkish',
  it: 'Italian',
  fr: 'French',
  de: 'German',
  es: 'Spanish', // New language
} as const
```

### 3. Update TypeScript Types

Update the `SupportedLanguage` type and related interfaces:

```typescript
type SupportedLanguage = 'en' | 'ar' | 'tr' | 'it' | 'fr' | 'de' | 'es'
```

### 4. Update Admin Interface

Add the new language to the `SUPPORTED_LANGUAGES` array in `components/admin/translation-manager.tsx`:

```typescript
const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  // ... existing languages
  { code: 'es', name: 'Español', flag: '🇪🇸' }, // New language
]
```

### 5. Update i18n Configuration

Add the new locale to `i18n.ts`:

```typescript
const locales = ['en', 'ar', 'tr', 'it', 'fr', 'de', 'es']
```

### 6. Create Translation Files

Create a new JSON file in the `messages/` directory:

```json
// messages/es.json
{
  "hero": {
    "title": "Ingeniero de Software • Desarrollador Full-Stack • Ingeniero de Datos"
  }
  // ... other translations
}
```

### 7. Update Middleware

Add the new locale to the middleware configuration in `middleware.ts`.

## Auto-Translation Setup

### DeepL API (Recommended)

1. Sign up for a DeepL API account
2. Get your API key
3. Add to environment variables:

```bash
DEEPL_API_KEY=your_deepl_api_key
```

### Google Translate API (Fallback)

1. Enable Google Translate API in Google Cloud Console
2. Create an API key
3. Add to environment variables:

```bash
GOOGLE_TRANSLATE_API_KEY=your_google_api_key
```

## Admin Workflow

### 1. Access Translation Manager

Navigate to `/admin/translations` in your admin panel.

### 2. Auto-Translate Content

1. Select a translation key
2. Click "Auto-translate" for the English text
3. Review generated translations
4. Edit if necessary
5. Mark as reviewed when satisfied

### 3. Manual Translation

1. Select a translation key
2. Edit translations for each language
3. Save changes
4. Mark as reviewed

### 4. Review Process

- Auto-translated content is marked as "needs review"
- Review translations in the "Review" tab
- Mark as reviewed when satisfied with quality

## API Endpoints

### GET /api/translations?locale=en

Get all translations for a specific locale.

### POST /api/translations

Create or update a translation with auto-translation.

```json
{
  "key": "hero.title",
  "englishText": "Software Engineer",
  "options": {
    "targetLanguages": ["ar", "tr", "it", "fr", "de"],
    "autoTranslate": true,
    "needsReview": true
  }
}
```

### PUT /api/translations

Update existing translations.

```json
{
  "key": "hero.title",
  "translations": {
    "ar": "مهندس برمجيات",
    "tr": "Yazılım Mühendisi"
  },
  "options": {
    "needsReview": false
  }
}
```

### GET /api/translations/review

Get translations that need review.

### POST /api/translations/review

Mark a translation as reviewed.

## Migration

### From JSON Files

Run the migration script to populate the translations table:

```bash
node scripts/migrate-to-translations.js
```

### From Existing Content

Use the admin interface to:
1. Import existing content
2. Generate translations automatically
3. Review and refine translations

## Best Practices

### 1. Translation Keys

- Use descriptive, hierarchical keys
- Follow consistent naming conventions
- Group related translations logically

### 2. Content Management

- Always provide English as the base language
- Use auto-translation for initial content
- Review all auto-translated content
- Test translations in context

### 3. Performance

- Translations are cached for 5 minutes
- Use the refresh function sparingly
- Consider implementing CDN caching for production

### 4. Quality Assurance

- Review auto-translated content
- Test with native speakers when possible
- Maintain consistency across languages
- Update translations when content changes

## Troubleshooting

### Common Issues

1. **Missing translations**: Check if the key exists in the database
2. **Auto-translation fails**: Verify API keys are configured
3. **Slow loading**: Check network connection and API limits
4. **Caching issues**: Clear browser cache or use the refresh function

### Debug Mode

Enable debug logging by setting:

```bash
NODE_ENV=development
```

### Database Queries

Check translations directly in Supabase:

```sql
SELECT * FROM translations WHERE key = 'hero.title';
SELECT * FROM translations WHERE needs_review = true;
```

## Future Enhancements

1. **Translation Memory**: Store and reuse common translations
2. **Bulk Operations**: Import/export translation files
3. **Translation Analytics**: Track translation usage and quality
4. **Collaborative Review**: Multiple reviewers for translations
5. **Version Control**: Track translation changes over time
6. **A/B Testing**: Test different translations
7. **Machine Learning**: Improve auto-translation quality
