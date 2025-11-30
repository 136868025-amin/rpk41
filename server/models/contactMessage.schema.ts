import { Schema, model } from 'mongoose'

export interface IContactMessage {
  _id?: string
  name: string
  email: string
  subject: string
  message: string
  isRead: boolean
  createdAt: Date
  updatedAt: Date
}

const contactMessageSchema = new Schema<IContactMessage>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

export const ContactMessage = model<IContactMessage>('ContactMessage', contactMessageSchema)
