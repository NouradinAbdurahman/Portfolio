# RTL/LTR Content Handling Guide

This document explains how to properly handle mixed Arabic/English content in the portfolio website to ensure correct text direction and natural reading flow.

## Problem Statement

When Arabic (RTL) text contains English words or technical terms, the browser can incorrectly flip the word order, causing confusing and unprofessional text display. For example:

**❌ Broken Arabic sentence:**
```
أنا مطور Full-stack متخصص في React و Next.js
```

**✅ Fixed Arabic sentence:**
```
أنا مطور متكامل متخصص في <span dir="ltr">React</span> و <span dir="ltr">Next.js</span>
```

## Solution Architecture

### 1. RTL Utils Library (`lib/rtl-utils.tsx`)

The `rtl-utils.tsx` file provides utilities for handling mixed content:

#### Key Functions:

- **`processMixedContent(text, isRTL)`**: Processes text to handle mixed RTL/LTR content
- **`MixedContent` Component**: React component that renders mixed content with proper directionality
- **`wrapTechnicalTerms(text)`**: Wraps technical terms in LTR spans
- **`translateCommonTerms(text)`**: Translates common terms to Arabic

#### Technical Terms List:
The library maintains a comprehensive list of technical terms that should remain in English but be wrapped with LTR direction:
- Framework names: React, Next.js, Flutter, etc.
- Programming languages: Python, JavaScript, TypeScript, etc.
- Cloud services: AWS, Firebase, Supabase, etc.
- Tools: Docker, Kubernetes, Git, etc.
- And many more...

#### Translatable Terms:
Common terms that should be translated to Arabic:
- "Full-Stack Developer" → "مطور متكامل"
- "Software Engineer" → "مهندس برمجيات"
- "Data Engineer" → "مهندس بيانات"
- And many more...

### 2. Component Integration

All components that display text content should use the `MixedContent` component:

```tsx
import { MixedContent } from "@/lib/rtl-utils"
import { useLocale } from "next-intl"

function MyComponent() {
  const locale = useLocale()
  const isRTL = locale === 'ar'
  
  return (
    <Typography>
      <MixedContent text={translatedText} isRTL={isRTL} />
    </Typography>
  )
}
```

### 3. Translation Database Structure

Translations in the Supabase database should include proper HTML markup for technical terms:

```sql
-- Example translation with LTR wrapping
INSERT INTO translations (key, ar) VALUES (
  'hero.subtitle',
  'بناء تطبيقات قابلة للتوسع، وأنظمة مدفوعة بالحوسبة السحابية، وحلول مدعومة بالبيانات. شغوف بإنشاء خطوط أنابيب <span dir="ltr">ETL</span> فعالة، وتجارب ويب حديثة، وسير عمل مؤتمتة.'
);
```

## Implementation Guidelines

### 1. For New Translations

When adding new Arabic translations:

1. **Translate naturally**: Use natural Arabic translations, not word-for-word
2. **Wrap technical terms**: Use `<span dir="ltr">Term</span>` for technical terms
3. **Test thoroughly**: Verify the text flows naturally in Arabic

### 2. For Component Updates

When updating components to display translated content:

1. **Import MixedContent**: Add the import statement
2. **Add RTL detection**: Use `useLocale()` to detect Arabic
3. **Wrap text content**: Use `<MixedContent text={content} isRTL={isRTL} />`

### 3. For Admin Panel Updates

When updating translations through the admin panel:

1. **Use proper HTML**: Include `<span dir="ltr">` tags for technical terms
2. **Test immediately**: Check the frontend to ensure proper rendering
3. **Follow patterns**: Use existing translations as templates

## Examples

### Hero Section
```tsx
// Before
<Typography variant="h1">
  {title}
</Typography>

// After
<Typography variant="h1">
  <MixedContent text={title} isRTL={isRTL} />
</Typography>
```

### About Section
```tsx
// Before
<Typography variant="p">
  {description}
</Typography>

// After
<Typography variant="p">
  <MixedContent text={description} isRTL={isRTL} />
</Typography>
```

### Skills Section
```tsx
// Before
<Typography variant="h4">
  {skillTitle}
</Typography>

// After
<Typography variant="h4">
  <MixedContent text={skillTitle} isRTL={isRTL} />
</Typography>
```

## Testing

### Manual Testing
1. Switch to Arabic locale
2. Check all text sections for proper RTL flow
3. Verify technical terms don't break the text flow
4. Ensure no unexpected word order flips

### Automated Testing
```bash
# Check if Arabic translations are present
curl -s "http://localhost:3000/ar" | grep -o "مطور متكامل"

# Check if technical terms are wrapped (client-side only)
# This requires browser testing as LTR wrapping is client-side rendered
```

## Common Issues and Solutions

### Issue 1: Text Still Flips
**Solution**: Ensure the `MixedContent` component is used and technical terms are properly wrapped in the database.

### Issue 2: Technical Terms Not Wrapped
**Solution**: Check that the technical term is in the `TECHNICAL_TERMS` array in `rtl-utils.tsx`.

### Issue 3: Translation Not Showing
**Solution**: Verify the translation key exists in the database and the component is using the correct key.

### Issue 4: Mixed Content Not Rendering
**Solution**: Ensure the component is marked as client-side with `"use client"` directive.

## Future Enhancements

1. **Auto-detection**: Automatically detect technical terms in translations
2. **Admin Integration**: Add RTL/LTR preview in the admin panel
3. **Validation**: Add validation to ensure proper HTML markup in translations
4. **Performance**: Optimize the technical terms matching algorithm

## Maintenance

### Adding New Technical Terms
Add new terms to the `TECHNICAL_TERMS` array in `lib/rtl-utils.tsx`:

```typescript
const TECHNICAL_TERMS = [
  // ... existing terms
  'NewFramework', 'AnotherTool', 'NewService'
]
```

### Adding New Translatable Terms
Add new terms to the `TRANSLATABLE_TERMS` object in `lib/rtl-utils.tsx`:

```typescript
const TRANSLATABLE_TERMS: Record<string, string> = {
  // ... existing terms
  'New Role': 'الدور الجديد',
  'Another Term': 'مصطلح آخر'
}
```

## Conclusion

This RTL/LTR handling system ensures that Arabic content displays naturally and professionally, with technical terms properly integrated without breaking the text flow. The system is designed to be maintainable and extensible for future content updates.
