import { Schema, model } from 'mongoose'

export interface IVisitor {
  ip: string
  userAgent: string
  path: string
  visitedAt: Date
}

const visitorSchema = new Schema<IVisitor>(
  {
    ip: {
      type: String,
      required: true,
    },
    userAgent: {
      type: String,
    },
    path: {
      type: String,
      required: true,
    },
    visitedAt: {
      type: Date,
      default: Date.now,
      expires: 60 * 60 * 24 * 30, // Auto-delete after 30 days to save space
    },
  },
  {
    timestamps: false,
  }
)

export const Visitor = model<IVisitor>('Visitor', visitorSchema)
