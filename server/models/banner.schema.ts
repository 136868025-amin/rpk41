import { Schema, model } from 'mongoose'

/**
 * TypeScript Interface for Homepage Banners
 * Represents hero slider images on the homepage
 */
export interface IBanner {
  _id?: string
  imageUrl: string         // Banner image URL
  title: string           // Banner title/heading
  subtitle?: string       // Optional subtitle/description
  link?: string           // Optional CTA link (e.g., link to news article)
  isActive: boolean       // Enable/disable banner without deletion
  orderIndex: number      // Display order (lower number = shown first)
  createdAt: Date
  updatedAt: Date
}

/**
 * Mongoose Schema for Banners Collection
 * Manages homepage hero slider content
 */
const bannerSchema = new Schema<IBanner>(
  {
    imageUrl: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    subtitle: {
      type: String,
      trim: true,
    },
    link: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,  // Index for filtering active banners
    },
    orderIndex: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

// Create compound index for efficient querying: active banners sorted by order
bannerSchema.index({ isActive: 1, orderIndex: 1 })

export const Banner = model<IBanner>('Banner', bannerSchema)
