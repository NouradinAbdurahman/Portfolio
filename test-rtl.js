// Simple test for RTL processing
const testText = 'تطوير تطبيقات متكاملة باستخدام React.js و Next.js و Node.js و TypeScript و JavaScript و SQL و HTML و CSS وقواعد بيانات PostgreSQL و Firebase.';

// Simulate the processMixedContent function
const TECHNICAL_TERMS = [
  'React', 'Next.js', 'TypeScript', 'JavaScript', 'Python', 'Flutter', 'Dart',
  'AWS', 'Firebase', 'Supabase', 'Docker', 'Kubernetes', 'Git', 'GitHub',
  'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis',
  'HTML', 'CSS', 'SQL'
];

function processMixedContent(text, isRTL) {
  if (!isRTL) return text;

  // If the text already contains HTML tags, return it as-is to avoid double-processing
  if (text.includes('<span dir="ltr">') || text.includes('<span dir="rtl">') || text.includes('<bdi>')) {
    return text;
  }

  let processedText = text;

  // Then, wrap technical terms with LTR direction
  TECHNICAL_TERMS.forEach(term => {
    const regex = new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
    processedText = processedText.replace(regex, `<span dir="ltr">${term}</span>`);
  });

  return processedText;
}

const processed = processMixedContent(testText, true);
console.log('Original text:', testText);
console.log('Processed text:', processed);
