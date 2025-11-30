import { defineMongooseModel } from '#nuxt/mongoose'
import { Schema } from 'mongoose'

export const ContactMessage = defineMongooseModel({
  name: 'ContactMessage',
  schema: {
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
  options: {
    timestamps: true,
  },
})
