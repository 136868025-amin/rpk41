import mongoose from 'mongoose'
import { Personnel } from '../models/personnel.schema'
import { News } from '../models/news.schema'
import { Gallery } from '../models/gallery.schema'
import { Document } from '../models/document.schema'
import { Banner } from '../models/banner.schema'

/**
 * Migration script to update old /uploads/ URLs to new /api/files/ URLs
 * Run this once after deploying the new file serving system
 */

async function migrateFileUrls() {
  try {
    console.log('Starting file URL migration...')

    // Migrate Personnel photos and gallery images
    const personnelDocs = await Personnel.find({
      $or: [
        { photo: { $regex: '^/uploads/' } },
        { gallery: { $elemMatch: { $regex: '^/uploads/' } } }
      ]
    })

    for (const doc of personnelDocs) {
      let updated = false
      
      if (doc.photo && doc.photo.startsWith('/uploads/')) {
        doc.photo = doc.photo.replace('/uploads/', '/api/files/')
        updated = true
      }
      
      if (doc.gallery && doc.gallery.length > 0) {
        doc.gallery = doc.gallery.map((url: string) => 
          url.startsWith('/uploads/') ? url.replace('/uploads/', '/api/files/') : url
        )
        updated = true
      }
      
      if (updated) {
        await doc.save()
        console.log(`Updated Personnel: ${doc.name}`)
      }
    }

    // Migrate News cover images
    const newsDocs = await News.find({ coverImage: { $regex: '^/uploads/' } })
    for (const doc of newsDocs) {
      doc.coverImage = doc.coverImage.replace('/uploads/', '/api/files/')
      await doc.save()
      console.log(`Updated News: ${doc.title}`)
    }

    // Migrate Gallery images
    const galleryDocs = await Gallery.find({
      images: { $elemMatch: { $regex: '^/uploads/' } }
    })
    for (const doc of galleryDocs) {
      doc.images = doc.images.map((url: string) => 
        url.startsWith('/uploads/') ? url.replace('/uploads/', '/api/files/') : url
      )
      await doc.save()
      console.log(`Updated Gallery: ${doc.title}`)
    }

    // Migrate Document files
    const documentDocs = await Document.find({ fileUrl: { $regex: '^/uploads/' } })
    for (const doc of documentDocs) {
      doc.fileUrl = doc.fileUrl.replace('/uploads/', '/api/files/')
      await doc.save()
      console.log(`Updated Document: ${doc.title}`)
    }

    // Migrate Banner images
    const bannerDocs = await Banner.find({ imageUrl: { $regex: '^/uploads/' } })
    for (const doc of bannerDocs) {
      doc.imageUrl = doc.imageUrl.replace('/uploads/', '/api/files/')
      await doc.save()
      console.log(`Updated Banner: ${doc.title}`)
    }

    console.log('Migration completed successfully!')
    process.exit(0)
  } catch (error) {
    console.error('Migration failed:', error)
    process.exit(1)
  }
}

// Connect to MongoDB and run migration
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/rpg'

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB')
    return migrateFileUrls()
  })
  .catch((error) => {
    console.error('Database connection failed:', error)
    process.exit(1)
  })
