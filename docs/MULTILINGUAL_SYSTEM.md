# Multilingual System Documentation

## Overview

The portfolio now supports a comprehensive multilingual system with RTL/LTR mixed-content handling for Arabic, Turkish, Italian, French, and German languages. The system includes automatic translation capabilities and seamless admin integration.

## Features

### 🌍 Multi-Language Support
- **Supported Languages**: English (EN), Arabic (AR), Turkish (TR), Italian (IT), French (FR), German (DE)
- **RTL/LTR Handling**: Proper text direction for Arabic with technical terms preserved in English
- **Mixed Content**: Seamless integration of English technical terms within Arabic text

### 🎛️ Admin Integration
- **Side-by-Side Editing**: Edit all languages simultaneously in the admin panel
- **Real-time Updates**: Changes reflect immediately on the live site
- **Hide/Show Controls**: Per-field and per-language visibility controls
- **Auto-Translation**: Automatic translation of new content using DeepL/Google Translate APIs

### 📱 Frontend Integration
- **MixedContent Component**: Handles RTL/LTR text processing
- **Dynamic Translation**: Content fetched from Supabase translations table
- **Fallback System**: Graceful fallback to English when translations are missing

## Architecture

### Database Structure

The system uses a `translations` table with the following structure:

```sql
CREATE TABLE translations (
  key TEXT PRIMARY KEY,
  en TEXT,
  ar TEXT,
  tr TEXT,
  it TEXT,
  fr TEXT,
  de TEXT,
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Translation Keys

Translation keys follow a hierarchical structure:

```
section.field.subfield
```

Examples:
- `hero.title` - Hero section title
- `projects.viewDetails` - Projects section "View Details" button
- `resume.educationDetails.bachelor.degree` - Resume education degree
- `contact.placeholder.firstName` - Contact form first name placeholder

### RTL/LTR Processing

The `MixedContent` component processes text to handle mixed Arabic/English content:

1. **Technical Terms**: Wrapped in `<span dir="ltr">` for proper display
2. **Translatable Terms**: Converted to Arabic equivalents
3. **Natural Flow**: Maintains proper Arabic text direction

## Implementation

### Frontend Components

#### MixedContent Component
```tsx
import { MixedContent } from '@/lib/rtl-utils'

<MixedContent 
  text={translatedText} 
  isRTL={locale === 'ar'} 
  className="custom-class" 
/>
```

#### Translation Hook
```tsx
import { useSupabaseTranslations } from '@/hooks/use-supabase-translations'

const { t } = useSupabaseTranslations()
const title = t('hero.title', 'Default Title')
```

### Admin Components

#### MultilangSections
Orchestrates per-section multilingual editing with side-by-side language inputs.

#### MultilangField
Individual field editor with all language inputs and hide/show controls.

#### Specialized Managers
- `ProjectsManager`: Project CRUD with multilingual support
- `ServicesManager`: Service management with technologies
- `TechnicalSkillsManager`: Skills categories and items

### API Endpoints

#### `/api/content/multilang`
- **GET**: Fetch all translations for a section
- **POST**: Save translations for a section

#### `/api/translate/process-queue`
- **POST**: Process pending translations
- **GET**: Get translation status

## Usage

### Adding New Content

1. **Create Translation Keys**: Use hierarchical naming convention
2. **Add to Admin**: Include in appropriate manager component
3. **Frontend Integration**: Use `useSupabaseTranslations` hook
4. **RTL Support**: Wrap text in `MixedContent` component

### Example: Adding a New Section

1. **Database**: Add translation keys to `translations` table
2. **Admin**: Create manager component with multilingual fields
3. **Frontend**: Update section component to use translations
4. **RTL**: Ensure proper RTL/LTR handling

### Translation Workflow

1. **Content Creation**: Admin creates content in English
2. **Auto-Translation**: System automatically translates to all languages
3. **RTL Processing**: Arabic translations processed for proper display
4. **Live Update**: Changes reflect immediately on frontend

## Configuration

### Environment Variables

```bash
# Translation APIs
DEEPL_API_KEY=your_deepl_api_key
DEEPL_PRO=true
GOOGLE_TRANSLATE_API_KEY=your_google_api_key

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_key
```

### Translation Settings

The system supports multiple translation providers with fallback:

1. **DeepL** (Primary) - High quality translations
2. **Google Translate** (Fallback) - Broader language support

## Testing

### Manual Testing

1. **Admin Panel**: Test side-by-side editing
2. **Language Switching**: Verify all languages display correctly
3. **RTL Content**: Check Arabic text flow and technical terms
4. **Auto-Translation**: Test new content translation

### Automated Testing

```bash
# Run translation tests
npm run test:translations

# Test RTL processing
npm run test:rtl

# Test admin functionality
npm run test:admin
```

## Troubleshooting

### Common Issues

1. **Missing Translations**: Check translation keys in database
2. **RTL Display Issues**: Verify `MixedContent` component usage
3. **Admin Not Loading**: Check Supabase permissions
4. **Auto-Translation Failing**: Verify API keys and quotas

### Debug Tools

- **Translation Status**: `/api/translate/status`
- **Admin Debug Panel**: Toggle debug mode in admin
- **Browser Console**: Check for translation errors

## Performance

### Optimization

1. **Caching**: Translation cache with 5-minute TTL
2. **Lazy Loading**: Translations loaded on demand
3. **Batch Processing**: Multiple translations in single request
4. **CDN**: Static translation files cached globally

### Monitoring

- **Translation Queue**: Monitor pending translations
- **API Usage**: Track translation API calls
- **Cache Hit Rate**: Monitor translation cache performance

## Future Enhancements

### Planned Features

1. **Machine Learning**: Custom translation models
2. **Context Awareness**: Better translation based on content type
3. **User Preferences**: Customizable translation quality
4. **A/B Testing**: Translation quality comparison

### Extensibility

The system is designed to easily add:
- New languages
- Additional translation providers
- Custom RTL/LTR rules
- Specialized content types

## Support

For issues or questions:
1. Check this documentation
2. Review admin debug panel
3. Check browser console for errors
4. Contact development team

---

**Last Updated**: December 2024
**Version**: 1.0.0
