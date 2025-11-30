import { Schema, model } from 'mongoose'

/**
 * TypeScript Interface for News/Activities
 * Represents school news articles and activity announcements
 */
export interface INews {
  _id?: string
  slug: string              // URL-friendly unique identifier (e.g., "wai-kru-day-2024")
  title: string            // Article title
  coverImage: string       // Main image URL for the article
  content: string          // Rich HTML content of the article
  category: 'academic' | 'activity' | 'general'  // Article category
  tags: string[]           // Tags for better categorization
  author?: string          // Author name or ID
  seoDescription?: string  // Meta description for SEO
  gallery: string[]        // Array of image URLs for photo gallery
  viewCount: number        // Number of times article was viewed
  isPublished: boolean     // Draft/Published status
  publishedAt?: Date       // When the article was published
  createdAt: Date
  updatedAt: Date
}

/**
 * Mongoose Schema for News Collection
 * Stores all school news and activities
 */
const newsSchema = new Schema<INews>(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,  // Index for faster queries
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ['academic', 'activity', 'general'],
      default: 'general',
      index: true,  // Index for filtering by category
    },
    tags: {
      type: [String],
      default: [],
      index: true,
    },
    author: {
      type: String,
      default: 'Admin',
    },
    seoDescription: {
      type: String,
    },
    gallery: {
      type: [String],
      default: [],
    },
    viewCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    isPublished: {
      type: Boolean,
      default: false,
      index: true,  // Index for filtering published articles
    },
    publishedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,  // Automatically adds createdAt and updatedAt
  }
)

// Create index for sorting by publishedAt (most recent first)
newsSchema.index({ publishedAt: -1 })

// Auto-set publishedAt when isPublished changes to true
newsSchema.pre('save', function (next) {
  if (this.isModified('isPublished') && this.isPublished && !this.publishedAt) {
    this.publishedAt = new Date()
  }
  next()
})

export const News = model<INews>('News', newsSchema)
