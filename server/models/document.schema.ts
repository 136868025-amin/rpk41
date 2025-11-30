import { Schema, model } from 'mongoose'

export interface IDocument {
  title: string
  category: string
  fileUrl: string
  fileSize?: string
  downloadCount: number
  isPublished: boolean
  createdAt: Date
  updatedAt: Date
}

const documentSchema = new Schema<IDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      index: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
    fileSize: {
      type: String,
    },
    downloadCount: {
      type: Number,
      default: 0,
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

export const Document = model<IDocument>('Document', documentSchema)
