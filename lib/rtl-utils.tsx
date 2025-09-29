/**
 * RTL/LTR Text Processing Utilities
 * Handles mixed Arabic/English content with proper directionality
 */

// Technical terms that should remain in English but be wrapped for RTL
const TECHNICAL_TERMS = [
  'React', 'Next.js', 'TypeScript', 'JavaScript', 'Python', 'Flutter', 'Dart',
  'AWS', 'Firebase', 'Supabase', 'Docker', 'Kubernetes', 'Git', 'GitHub',
  'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis',
  'Tailwind CSS', 'Bootstrap', 'Material-UI', 'Ant Design', 'Chakra UI',
  'Figma', 'Adobe XD', 'Sketch', 'Photoshop', 'Illustrator',
  'LinkedIn', 'Twitter', 'Instagram', 'Facebook', 'YouTube',
  'ETL', 'API', 'REST', 'GraphQL', 'JWT', 'OAuth', 'SSL', 'HTTPS',
  'CI/CD', 'DevOps', 'Agile', 'Scrum', 'Kanban',
  'iOS', 'Android', 'Windows', 'macOS', 'Linux', 'Ubuntu',
  'VS Code', 'IntelliJ', 'WebStorm', 'Postman', 'Insomnia',
  'Framer Motion', 'GSAP', 'Three.js', 'D3.js', 'Chart.js',
  'Jest', 'Cypress', 'Selenium', 'Playwright', 'Testing Library',
  'Webpack', 'Vite', 'Parcel', 'Rollup', 'Babel', 'ESLint', 'Prettier',
  'NPM', 'Yarn', 'PNPM', 'Bun', 'Pip', 'Conda', 'Poetry',
  'TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib',
  'Jupyter', 'Colab', 'Kaggle', 'Tableau', 'Power BI', 'Looker',
  'Kubernetes', 'Terraform', 'Ansible', 'Jenkins', 'GitLab CI', 'GitHub Actions',
  'Cloudflare', 'Vercel', 'Netlify', 'Heroku', 'DigitalOcean', 'Linode',
  'Stripe', 'PayPal', 'Square', 'Twilio', 'SendGrid', 'Mailchimp',
  'Slack', 'Discord', 'Zoom', 'Teams', 'Notion', 'Airtable', 'Trello',
  'Figma', 'Adobe Creative Suite', 'Sketch', 'InVision', 'Principle',
  'Lottie', 'After Effects', 'Premiere Pro', 'Final Cut Pro',
  'Unity', 'Unreal Engine', 'Blender', 'Maya', '3ds Max',
  'Arduino', 'Raspberry Pi', 'ESP32', 'MicroPython', 'CircuitPython',
  'Blockchain', 'Ethereum', 'Solidity', 'Web3', 'MetaMask', 'OpenSea',
  'Machine Learning', 'AI', 'Deep Learning', 'Neural Networks', 'Computer Vision',
  'NLP', 'Natural Language Processing', 'GPT', 'BERT', 'Transformers',
  'Data Science', 'Big Data', 'Hadoop', 'Spark', 'Kafka', 'Elasticsearch',
  'Microservices', 'Serverless', 'Lambda', 'API Gateway', 'Cloud Functions',
  'GraphQL', 'Apollo', 'Prisma', 'Hasura', 'Strapi', 'Sanity',
  'Contentful', 'Shopify', 'WooCommerce', 'Magento', 'BigCommerce',
  'WordPress', 'Drupal', 'Joomla', 'Squarespace', 'Wix', 'Webflow'
]

// Terms that should be translated to Arabic
const TRANSLATABLE_TERMS: Record<string, string> = {
  'Full-Stack Developer': 'مطور متكامل',
  'Full-Stack': 'متكامل',
  'Software Engineer': 'مهندس برمجيات',
  'Data Engineer': 'مهندس بيانات',
  'Frontend Developer': 'مطور واجهات',
  'Backend Developer': 'مطور خوادم',
  'Mobile Developer': 'مطور تطبيقات محمولة',
  'Web Developer': 'مطور ويب',
  'UI/UX Designer': 'مصمم واجهات وتجربة المستخدم',
  'DevOps Engineer': 'مهندس عمليات التطوير',
  'Cloud Engineer': 'مهندس سحابة',
  'Machine Learning Engineer': 'مهندس تعلم آلة',
  'Data Scientist': 'عالم بيانات',
  'Product Manager': 'مدير منتج',
  'Project Manager': 'مدير مشروع',
  'Technical Lead': 'قائد تقني',
  'Senior Developer': 'مطور أول',
  'Junior Developer': 'مطور مبتدئ',
  'Mid-level Developer': 'مطور متوسط',
  'Lead Developer': 'مطور رئيسي',
  'Principal Engineer': 'مهندس رئيسي',
  'Staff Engineer': 'مهندس موظف',
  'Distinguished Engineer': 'مهندس متميز',
  'Fellow Engineer': 'مهندس زميل',
  'Chief Technology Officer': 'الرئيس التنفيذي للتكنولوجيا',
  'CTO': 'الرئيس التنفيذي للتكنولوجيا',
  'Chief Information Officer': 'الرئيس التنفيذي للمعلومات',
  'CIO': 'الرئيس التنفيذي للمعلومات',
  'VP of Engineering': 'نائب رئيس الهندسة',
  'Director of Engineering': 'مدير الهندسة',
  'Engineering Manager': 'مدير الهندسة',
  'Team Lead': 'قائد الفريق',
  'Scrum Master': 'سيد سكروم',
  'Agile Coach': 'مدرب أجايل',
  'Solution Architect': 'مهندس حلول',
  'System Architect': 'مهندس أنظمة',
  'Enterprise Architect': 'مهندس مؤسسي',
  'Security Engineer': 'مهندس أمان',
  'QA Engineer': 'مهندس ضمان الجودة',
  'Test Engineer': 'مهندس اختبار',
  'Performance Engineer': 'مهندس أداء',
  'Site Reliability Engineer': 'مهندس موثوقية الموقع',
  'SRE': 'مهندس موثوقية الموقع',
  'Platform Engineer': 'مهندس منصة',
  'Infrastructure Engineer': 'مهندس بنية تحتية',
  'Database Administrator': 'مدير قاعدة بيانات',
  'DBA': 'مدير قاعدة بيانات',
  'Network Engineer': 'مهندس شبكات',
  'Systems Administrator': 'مدير أنظمة',
  'SysAdmin': 'مدير أنظمة',
  'IT Support': 'دعم تقني',
  'Help Desk': 'مكتب المساعدة',
  'Technical Support': 'دعم تقني',
  'Customer Success': 'نجاح العملاء',
  'Customer Support': 'دعم العملاء',
  'Sales Engineer': 'مهندس مبيعات',
  'Pre-sales Engineer': 'مهندس ما قبل البيع',
  'Post-sales Engineer': 'مهندس ما بعد البيع',
  'Field Engineer': 'مهندس ميداني',
  'Implementation Engineer': 'مهندس تنفيذ',
  'Integration Engineer': 'مهندس تكامل',
  'API Engineer': 'مهندس واجهات برمجة',
  'Backend Engineer': 'مهندس خوادم',
  'Frontend Engineer': 'مهندس واجهات',
  'Mobile Engineer': 'مهندس تطبيقات محمولة',
  'iOS Engineer': 'مهندس آي أو إس',
  'Android Engineer': 'مهندس أندرويد',
  'React Native Engineer': 'مهندس رياكت نيتيف',
  'Flutter Engineer': 'مهندس فلاتر',
  'Web Engineer': 'مهندس ويب',
  'Full Stack Engineer': 'مهندس متكامل',
  'Stack Engineer': 'مهندس متكامل',
  'AWS Engineer': 'مهندس أمازون ويب سيرفيسز',
  'Azure Engineer': 'مهندس مايكروسوفت أزور',
  'GCP Engineer': 'مهندس جوجل كلاود',
  'Google Cloud Engineer': 'مهندس جوجل كلاود',
  'Kubernetes Engineer': 'مهندس كوبرنيتس',
  'Docker Engineer': 'مهندس دوكر',
  'Scalability Engineer': 'مهندس قابلية التوسع',
  'Cybersecurity Engineer': 'مهندس أمان سيبراني',
  'Information Security Engineer': 'مهندس أمان المعلومات',
  'Penetration Tester': 'اختبار الاختراق',
  'Pen Tester': 'اختبار الاختراق',
  'Ethical Hacker': 'هاكر أخلاقي',
  'White Hat Hacker': 'هاكر القبعة البيضاء',
  'Black Hat Hacker': 'هاكر القبعة السوداء',
  'Gray Hat Hacker': 'هاكر القبعة الرمادية',
  'Bug Bounty Hunter': 'صياد مكافآت الأخطاء',
  'Vulnerability Researcher': 'باحث الثغرات',
  'Threat Hunter': 'صياد التهديدات',
  'Incident Responder': 'مستجيب للحوادث',
  'Forensic Analyst': 'محلل الطب الشرعي',
  'Malware Analyst': 'محلل البرمجيات الخبيثة',
  'Reverse Engineer': 'مهندس عكسي',
  'Exploit Developer': 'مطور الاستغلال',
  'Payload Developer': 'مطور الحمولة',
  'Shellcode Developer': 'مطور شل كود',
  'Assembly Developer': 'مطور التجميع',
  'C Developer': 'مطور سي',
  'C++ Developer': 'مطور سي بلس بلس',
  'C# Developer': 'مطور سي شارب',
  'Java Developer': 'مطور جافا',
  'Python Developer': 'مطور بايثون',
  'JavaScript Developer': 'مطور جافا سكريبت',
  'TypeScript Developer': 'مطور تايب سكريبت',
  'PHP Developer': 'مطور بي إتش بي',
  'Ruby Developer': 'مطور روبي',
  'Go Developer': 'مطور جو',
  'Rust Developer': 'مطور رست',
  'Swift Developer': 'مطور سويفت',
  'Kotlin Developer': 'مطور كوتلن',
  'Dart Developer': 'مطور دارت',
  'Scala Developer': 'مطور سكالا',
  'Clojure Developer': 'مطور كلوجر',
  'Haskell Developer': 'مطور هاسكل',
  'Erlang Developer': 'مطور إرلانج',
  'Elixir Developer': 'مطور إليكسير',
  'F# Developer': 'مطور إف شارب',
  'OCaml Developer': 'مطور أوكامل',
  'Lisp Developer': 'مطور ليسب',
  'Prolog Developer': 'مطور برولوج',
  'Perl Developer': 'مطور بيرل',
  'Lua Developer': 'مطور لوا',
  'R Developer': 'مطور آر',
  'MATLAB Developer': 'مطور ماتلاب',
  'Julia Developer': 'مطور جوليا',
  'Fortran Developer': 'مطور فورتران',
  'COBOL Developer': 'مطور كوبول',
  'Machine Code Developer': 'مطور كود الآلة',
  'Binary Developer': 'مطور ثنائي',
  'Hex Developer': 'مطور سداسي',
  'Low-level Developer': 'مطور منخفض المستوى',
  'High-level Developer': 'مطور عالي المستوى',
  'System Developer': 'مطور أنظمة',
  'Application Developer': 'مطور تطبيقات',
  'Game Developer': 'مطور ألعاب',
  'Mobile Game Developer': 'مطور ألعاب محمولة',
  'Console Game Developer': 'مطور ألعاب وحدة التحكم',
  'PC Game Developer': 'مطور ألعاب الكمبيوتر',
  'Web Game Developer': 'مطور ألعاب ويب',
  'VR Developer': 'مطور الواقع الافتراضي',
  'AR Developer': 'مطور الواقع المعزز',
  'MR Developer': 'مطور الواقع المختلط',
  'XR Developer': 'مطور الواقع الممتد',
  'Blockchain Developer': 'مطور البلوك تشين',
  'Smart Contract Developer': 'مطور العقود الذكية',
  'DeFi Developer': 'مطور التمويل اللامركزي',
  'NFT Developer': 'مطور الرموز غير القابلة للاستبدال',
  'Web3 Developer': 'مطور ويب 3',
  'DApp Developer': 'مطور التطبيقات اللامركزية',
  'Cryptocurrency Developer': 'مطور العملات المشفرة',
  'Bitcoin Developer': 'مطور البيتكوين',
  'Ethereum Developer': 'مطور الإيثيريوم',
  'Solidity Developer': 'مطور سوليديتي',
  'Vyper Developer': 'مطور فايبر',
  'Machine Learning Developer': 'مطور تعلم الآلة',
  'AI Developer': 'مطور الذكاء الاصطناعي',
  'Deep Learning Developer': 'مطور التعلم العميق',
  'Computer Vision Developer': 'مطور رؤية الكمبيوتر',
  'NLP Developer': 'مطور معالجة اللغة الطبيعية',
  'Natural Language Processing Developer': 'مطور معالجة اللغة الطبيعية',
  'Data Science Developer': 'مطور علم البيانات',
  'Big Data Developer': 'مطور البيانات الضخمة',
  'Analytics Developer': 'مطور التحليلات',
  'Business Intelligence Developer': 'مطور ذكاء الأعمال',
  'BI Developer': 'مطور ذكاء الأعمال',
  'ETL Developer': 'مطور استخراج وتحويل وتحميل البيانات',
  'Data Pipeline Developer': 'مطور خط أنابيب البيانات',
  'Data Warehouse Developer': 'مطور مستودع البيانات',
  'Data Lake Developer': 'مطور بحيرة البيانات',
  'Data Mart Developer': 'مطور سوق البيانات',
  'OLAP Developer': 'مطور المعالجة التحليلية عبر الإنترنت',
  'OLTP Developer': 'مطور المعالجة المعاملية عبر الإنترنت',
  'Database Developer': 'مطور قاعدة البيانات',
  'SQL Developer': 'مطور إس كيو إل',
  'NoSQL Developer': 'مطور نوس كيو إل',
  'MongoDB Developer': 'مطور مونجو دي بي',
  'PostgreSQL Developer': 'مطور بوست جي إس كيو إل',
  'MySQL Developer': 'مطور ماي إس كيو إل',
  'Oracle Developer': 'مطور أوراكل',
  'SQL Server Developer': 'مطور خادم إس كيو إل',
  'Redis Developer': 'مطور ريديس',
  'Elasticsearch Developer': 'مطور إيلاستيك سيرش',
  'Solr Developer': 'مطور سولر',
  'Cassandra Developer': 'مطور كاساندرا',
  'DynamoDB Developer': 'مطور دينامو دي بي',
  'CouchDB Developer': 'مطور كاوتش دي بي',
  'Neo4j Developer': 'مطور نيو فور جي',
  'ArangoDB Developer': 'مطور أرانجو دي بي',
  'InfluxDB Developer': 'مطور إنفلكس دي بي',
  'TimescaleDB Developer': 'مطور تايم سكيل دي بي',
  'ClickHouse Developer': 'مطور كليك هاوس',
  'BigQuery Developer': 'مطور بيج كويري',
  'Snowflake Developer': 'مطور سنو فليك',
  'Redshift Developer': 'مطور ريد شيفت',
  'Athena Developer': 'مطور أثينا',
  'Presto Developer': 'مطور بريستو',
  'Trino Developer': 'مطور ترينو',
  'Spark Developer': 'مطور سبارك',
  'Hadoop Developer': 'مطور هادوب',
  'Kafka Developer': 'مطور كافكا',
  'Pulsar Developer': 'مطور بولسار',
  'RabbitMQ Developer': 'مطور رابيت إم كيو',
  'ActiveMQ Developer': 'مطور أكتيف إم كيو',
  'ZeroMQ Developer': 'مطور زيرو إم كيو',
  'NATS Developer': 'مطور ناتس',
  'gRPC Developer': 'مطور جي آر بي سي',
  'GraphQL Developer': 'مطور جرايف كيو إل',
  'REST Developer': 'مطور ريست',
  'SOAP Developer': 'مطور سوب',
  'XML Developer': 'مطور إكس إم إل',
  'JSON Developer': 'مطور جاي سون',
  'YAML Developer': 'مطور يامل',
  'TOML Developer': 'مطور تومل',
  'INI Developer': 'مطور آي إن آي',
  'CSV Developer': 'مطور سي إس في',
  'TSV Developer': 'مطور تي إس في',
  'Parquet Developer': 'مطور باركيه',
  'Avro Developer': 'مطور أفرو',
  'Protocol Buffers Developer': 'مطور بروتوكول البافرز',
  'Protobuf Developer': 'مطور بروتوبوف',
  'MessagePack Developer': 'مطور ميسج باك',
  'BSON Developer': 'مطور بي سون',
  'CBOR Developer': 'مطور سي بي أو آر',
  'HDF5 Developer': 'مطور إتش دي إف فايف',
  'NetCDF Developer': 'مطور نت سي دي إف',
  'Zarr Developer': 'مطور زار',
  'Dask Developer': 'مطور داسك',
  'Ray Developer': 'مطور راي',
  'Celery Developer': 'مطور سيليري',
  'RQ Developer': 'مطور آر كيو',
  'Dramatiq Developer': 'مطور دراماتيك',
  'APScheduler Developer': 'مطور إيه بي سكيدولر',
  'Cron Developer': 'مطور كرون',
  'Airflow Developer': 'مطور إير فلو',
  'Prefect Developer': 'مطور بريفكت',
  'Dagster Developer': 'مطور داجستر',
  'Kedro Developer': 'مطور كيدرو',
  'Luigi Developer': 'مطور لويجي',
  'Oozie Developer': 'مطور أوزي',
  'Azkaban Developer': 'مطور أزكابان',
  'Conductor Developer': 'مطور كونداكتور',
  'Temporal Developer': 'مطور تمبورال',
  'Cadence Developer': 'مطور كادنس',
  'Zeebe Developer': 'مطور زيبي',
  'Camunda Developer': 'مطور كاموندا',
  'Activiti Developer': 'مطور أكتيفيتي',
  'jBPM Developer': 'مطور جي بي بي إم',
  'Flowable Developer': 'مطور فلوابل'
}

/**
 * Processes text to handle mixed RTL/LTR content properly
 * @param text - The text to process
 * @param isRTL - Whether the current locale is RTL (Arabic)
 * @returns Processed text with proper RTL/LTR handling
 */
export function processMixedContent(text: string, isRTL: boolean): string {
  if (!isRTL) return text

  // If the text already contains HTML tags, return it as-is to avoid double-processing
  if (text.includes('<span dir="ltr">') || text.includes('<span dir="rtl">') || text.includes('<bdi>')) {
    return text
  }

  let processedText = text

  // First, translate translatable terms
  Object.entries(TRANSLATABLE_TERMS).forEach(([english, arabic]) => {
    const regex = new RegExp(`\\b${english.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi')
    processedText = processedText.replace(regex, arabic)
  })

  // Then, wrap technical terms with LTR direction
  TECHNICAL_TERMS.forEach(term => {
    const regex = new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi')
    processedText = processedText.replace(regex, `<span dir="ltr">${term}</span>`)
  })

  return processedText
}

/**
 * Creates a React component that renders mixed content with proper RTL/LTR handling
 * @param text - The text to render
 * @param isRTL - Whether the current locale is RTL (Arabic)
 * @param className - Optional CSS class
 * @returns JSX element with proper RTL/LTR handling
 */
export function MixedContent({ 
  text, 
  isRTL, 
  className = '' 
}: { 
  text: string; 
  isRTL: boolean; 
  className?: string; 
}) {
  const processedText = processMixedContent(text, isRTL)
  
  return (
    <span 
      className={className}
      dangerouslySetInnerHTML={{ __html: processedText }}
    />
  )
}

/**
 * Wraps technical terms in LTR spans for proper RTL display
 * @param text - The text containing technical terms
 * @returns Text with technical terms wrapped in LTR spans
 */
export function wrapTechnicalTerms(text: string): string {
  let wrappedText = text

  TECHNICAL_TERMS.forEach(term => {
    const regex = new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi')
    wrappedText = wrappedText.replace(regex, `<span dir="ltr">${term}</span>`)
  })

  return wrappedText
}

/**
 * Translates common terms to Arabic
 * @param text - The text to translate
 * @returns Text with common terms translated to Arabic
 */
export function translateCommonTerms(text: string): string {
  let translatedText = text

  Object.entries(TRANSLATABLE_TERMS).forEach(([english, arabic]) => {
    const regex = new RegExp(`\\b${english.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi')
    translatedText = translatedText.replace(regex, arabic)
  })

  return translatedText
}
