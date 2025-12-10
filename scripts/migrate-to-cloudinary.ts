/**
 * Migration Script: Convert Base64 Data URLs to Cloudinary URLs
 * 
 * Usage:
 *   npx tsx scripts/migrate-to-cloudinary.ts
 * 
 * Prerequisites:
 *   - Set CLOUDINARY_* and MONGODB_URI in .env.local
 *   - npm install tsx (if not installed)
 */

import mongoose from 'mongoose'
import { v2 as cloudinary } from 'cloudinary'
import * as dotenv from 'dotenv'
import * as path from 'path'
import { fileURLToPath } from 'url'

// Get __dirname equivalent for ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ratchaprachanukroh41'

// Collections and their image fields
const COLLECTIONS_TO_MIGRATE = [
  { name: 'banners', fields: ['imageUrl'] },
  { name: 'news', fields: ['coverImage', 'gallery'] },
  { name: 'galleries', fields: ['coverImage', 'images'] },
  { name: 'documents', fields: ['fileUrl'] },
  { name: 'personnels', fields: ['photo', 'gallery'] },
  { name: 'announcements', fields: ['image'] },
  { name: 'schoolconfigs', fields: ['schoolLogo'] }
]

// Statistics
let totalMigrated = 0
let totalErrors = 0
let totalSkipped = 0

/**
 * Check if a string is a Base64 Data URL
 */
function isBase64DataUrl(str: string): boolean {
  return str?.startsWith('data:') && str.includes('base64,')
}

/**
 * Upload Base64 to Cloudinary
 */
async function uploadBase64ToCloudinary(
  base64Data: string,
  folder: string
): Promise<string | null> {
  try {
    const isImage = base64Data.startsWith('data:image/')
    const result = await cloudinary.uploader.upload(base64Data, {
      folder: `rpg-school/${folder}`,
      resource_type: isImage ? 'image' : 'raw',
      quality: 'auto',
      fetch_format: 'auto'
    })
    return result.secure_url
  } catch (error: any) {
    console.error(`  ❌ Upload error: ${error.message}`)
    return null
  }
}

/**
 * Migrate a single document
 */
async function migrateDocument(
  collection: mongoose.Collection,
  doc: any,
  fields: string[],
  folderName: string
): Promise<boolean> {
  const updates: any = {}
  let hasChanges = false

  for (const field of fields) {
    const value = doc[field]

    // Handle single string field
    if (typeof value === 'string' && isBase64DataUrl(value)) {
      console.log(`  📤 Uploading ${field}...`)
      const newUrl = await uploadBase64ToCloudinary(value, folderName)
      if (newUrl) {
        updates[field] = newUrl
        hasChanges = true
        totalMigrated++
        console.log(`  ✅ ${field} migrated`)
      } else {
        totalErrors++
      }
    }

    // Handle array of strings (gallery, images)
    if (Array.isArray(value)) {
      const newArray: string[] = []
      let arrayChanged = false

      for (let i = 0; i < value.length; i++) {
        const item = value[i]
        if (typeof item === 'string' && isBase64DataUrl(item)) {
          console.log(`  📤 Uploading ${field}[${i}]...`)
          const newUrl = await uploadBase64ToCloudinary(item, folderName)
          if (newUrl) {
            newArray.push(newUrl)
            arrayChanged = true
            totalMigrated++
            console.log(`  ✅ ${field}[${i}] migrated`)
          } else {
            newArray.push(item) // Keep original on error
            totalErrors++
          }
        } else {
          newArray.push(item) // Keep non-base64 items
        }
      }

      if (arrayChanged) {
        updates[field] = newArray
        hasChanges = true
      }
    }
  }

  // Update document if there are changes
  if (hasChanges) {
    await collection.updateOne({ _id: doc._id }, { $set: updates })
    return true
  }

  return false
}

/**
 * Migrate a collection
 */
async function migrateCollection(
  db: mongoose.Connection,
  collectionName: string,
  fields: string[]
) {
  console.log(`\n📁 Processing collection: ${collectionName}`)
  
  const collection = db.collection(collectionName)
  
  // Build query to find documents with Base64 data
  const orConditions = fields.map(field => ({
    [field]: { $regex: '^data:' }
  }))
  
  const docs = await collection.find({ $or: orConditions }).toArray()
  
  if (docs.length === 0) {
    console.log(`  ⏭️  No Base64 data found`)
    totalSkipped++
    return
  }
  
  console.log(`  📊 Found ${docs.length} documents to migrate`)
  
  for (const doc of docs) {
    console.log(`  🔄 Document ID: ${doc._id}`)
    await migrateDocument(collection, doc, fields, collectionName)
  }
}

/**
 * Main migration function
 */
async function main() {
  console.log('🚀 Starting Base64 to Cloudinary Migration\n')
  console.log('Configuration:')
  console.log(`  MongoDB: ${MONGODB_URI.replace(/\/\/.*@/, '//***@')}`)
  console.log(`  Cloudinary: ${process.env.CLOUDINARY_CLOUD_NAME}\n`)

  // Validate configuration
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY) {
    console.error('❌ Missing Cloudinary configuration!')
    console.error('Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET')
    process.exit(1)
  }

  try {
    // Connect to MongoDB
    console.log('📡 Connecting to MongoDB...')
    await mongoose.connect(MONGODB_URI)
    console.log('✅ Connected to MongoDB\n')

    const db = mongoose.connection

    // Process each collection
    for (const { name, fields } of COLLECTIONS_TO_MIGRATE) {
      await migrateCollection(db, name, fields)
    }

    // Print summary
    console.log('\n' + '='.repeat(50))
    console.log('📊 Migration Summary:')
    console.log(`  ✅ Successfully migrated: ${totalMigrated} files`)
    console.log(`  ❌ Errors: ${totalErrors}`)
    console.log(`  ⏭️  Collections skipped: ${totalSkipped}`)
    console.log('='.repeat(50))

    if (totalErrors > 0) {
      console.log('\n⚠️  Some files failed to migrate. Please check the errors above.')
    } else if (totalMigrated > 0) {
      console.log('\n🎉 Migration completed successfully!')
    } else {
      console.log('\n✨ No Base64 data found. Nothing to migrate.')
    }

  } catch (error: any) {
    console.error('\n❌ Migration failed:', error.message)
    process.exit(1)
  } finally {
    await mongoose.disconnect()
    console.log('\n📡 Disconnected from MongoDB')
  }
}

// Run migration
main()
