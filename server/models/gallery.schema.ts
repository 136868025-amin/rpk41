import { Schema, model } from 'mongoose'

export interface IGallery {
  title: string
  description?: string
  coverImage?: string
  images: string[]
  eventDate: Date
  category: 'activity' | 'academic' | 'sport' | 'general'
  isHighlight: boolean
  isPublished: boolean
}

const gallerySchema = new Schema<IGallery>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    coverImage: {
      type: String,
    },
    images: {
      type: [String],
      default: [],
    },
    eventDate: {
      type: Date,
      default: Date.now,
    },
    category: {
      type: String,
      enum: ['activity', 'academic', 'sport', 'general'],
      default: 'general',
      index: true,
    },
    isHighlight: {
      type: Boolean,
      default: false,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)

export const Gallery = model<IGallery>('Gallery', gallerySchema)
