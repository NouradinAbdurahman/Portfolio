const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function clearCacheAndRefresh() {
  console.log('Clearing cache and refreshing translations...');
  
  // Clear the cache by updating a dummy translation
  const { error: updateError } = await supabase
    .from('translations')
    .update({ 
      en: 'Cache cleared',
      ar: 'تم مسح الذاكرة المؤقتة',
      tr: 'Önbellek temizlendi',
      it: 'Cache cancellato',
      fr: 'Cache effacé',
      de: 'Cache gelöscht'
    })
    .eq('key', 'resume.title');

  if (updateError) {
    console.error('Error updating cache clear:', updateError);
    return;
  }

  // Restore the original translation
  const { error: restoreError } = await supabase
    .from('translations')
    .update({ 
      en: 'Resume',
      ar: 'السيرة الذاتية',
      tr: 'Özgeçmiş',
      it: 'Curriculum',
      fr: 'CV',
      de: 'Lebenslauf'
    })
    .eq('key', 'resume.title');

  if (restoreError) {
    console.error('Error restoring translation:', restoreError);
    return;
  }

  console.log('Cache cleared and translations refreshed successfully!');
}

clearCacheAndRefresh();
