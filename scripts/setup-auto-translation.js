#!/usr/bin/env node

/**
 * Setup script for the automated translation system
 * This script initializes the database schema and starts the translation processor
 */

const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')
require('dotenv').config()

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function runSqlFile(filePath) {
  console.log(`Running SQL file: ${filePath}`)
  
  try {
    const sql = fs.readFileSync(filePath, 'utf8')
    const { error } = await supabase.rpc('exec_sql', { sql })
    
    if (error) {
      console.error(`Error running ${filePath}:`, error)
      return false
    }
    
    console.log(`✅ Successfully executed ${filePath}`)
    return true
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error)
    return false
  }
}

async function checkEnvironmentVariables() {
  console.log('Checking environment variables...')
  
  const required = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'SUPABASE_SERVICE_ROLE_KEY'
  ]
  
  const optional = [
    'DEEPL_API_KEY',
    'GOOGLE_TRANSLATE_API_KEY'
  ]
  
  let allGood = true
  
  for (const varName of required) {
    if (!process.env[varName]) {
      console.error(`❌ Missing required environment variable: ${varName}`)
      allGood = false
    } else {
      console.log(`✅ ${varName} is set`)
    }
  }
  
  for (const varName of optional) {
    if (process.env[varName]) {
      console.log(`✅ ${varName} is set`)
    } else {
      console.log(`⚠️  ${varName} is not set (optional)`)
    }
  }
  
  return allGood
}

async function testTranslationEngine() {
  console.log('Testing translation engine...')
  
  try {
    const response = await fetch('http://localhost:3000/api/translate', {
      method: 'GET'
    })
    
    if (response.ok) {
      const data = await response.json()
      console.log('✅ Translation engine is available')
      console.log(`   Providers: ${data.providers.join(', ') || 'None'}`)
      console.log(`   Languages: ${data.supportedLanguages.join(', ')}`)
      return data.available
    } else {
      console.log('⚠️  Translation engine not responding (server may not be running)')
      return false
    }
  } catch (error) {
    console.log('⚠️  Could not test translation engine (server may not be running)')
    return false
  }
}

async function setupDatabase() {
  console.log('Setting up database schema...')
  
  const sqlFiles = [
    'scripts/create-translation-jobs-schema.sql',
    'scripts/create-auto-translation-trigger.sql'
  ]
  
  let allSuccess = true
  
  for (const file of sqlFiles) {
    const filePath = path.join(process.cwd(), file)
    
    if (!fs.existsSync(filePath)) {
      console.error(`❌ SQL file not found: ${filePath}`)
      allSuccess = false
      continue
    }
    
    const success = await runSqlFile(filePath)
    if (!success) {
      allSuccess = false
    }
  }
  
  return allSuccess
}

async function testTranslation() {
  console.log('Testing translation functionality...')
  
  try {
    const response = await fetch('http://localhost:3000/api/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        key: 'test.auto.translation',
        text: 'This is a test translation',
        sourceLanguage: 'en',
        context: 'setup_test'
      })
    })
    
    if (response.ok) {
      const data = await response.json()
      console.log('✅ Translation test successful')
      console.log(`   Key: ${data.key}`)
      console.log(`   Success: ${data.success}`)
      if (data.errors) {
        console.log(`   Errors: ${data.errors.join(', ')}`)
      }
      return true
    } else {
      const error = await response.json()
      console.error('❌ Translation test failed:', error.error)
      return false
    }
  } catch (error) {
    console.error('❌ Translation test error:', error.message)
    return false
  }
}

async function main() {
  console.log('🚀 Setting up Automated Translation System\n')
  
  // Check environment variables
  const envCheck = await checkEnvironmentVariables()
  if (!envCheck) {
    console.error('\n❌ Environment setup incomplete. Please fix the missing variables.')
    process.exit(1)
  }
  
  // Setup database
  const dbSetup = await setupDatabase()
  if (!dbSetup) {
    console.error('\n❌ Database setup failed. Please check the SQL files and database connection.')
    process.exit(1)
  }
  
  // Test translation engine
  const engineAvailable = await testTranslationEngine()
  if (!engineAvailable) {
    console.log('\n⚠️  Translation engine is not available. Please:')
    console.log('   1. Start the development server: npm run dev')
    console.log('   2. Configure translation API keys in .env.local')
    console.log('   3. Run this script again')
    return
  }
  
  // Test translation functionality
  const translationTest = await testTranslation()
  if (!translationTest) {
    console.log('\n⚠️  Translation test failed. Please check your API keys and configuration.')
    return
  }
  
  console.log('\n🎉 Automated Translation System setup complete!')
  console.log('\nNext steps:')
  console.log('1. Access the admin interface at: http://localhost:3000/admin/translations/auto')
  console.log('2. Add new content through the Supabase admin panel')
  console.log('3. Monitor translation status and job queue')
  console.log('4. Configure additional languages if needed')
  
  console.log('\n📚 Documentation: docs/AUTO_TRANSLATION_SYSTEM.md')
}

// Run the setup
main().catch(console.error)
