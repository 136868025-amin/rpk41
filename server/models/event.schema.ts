import { defineMongooseModel } from '#nuxt/mongoose'
import { Schema } from 'mongoose'

export const Event = defineMongooseModel({
  name: 'Event',
  schema: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    type: {
      type: String,
      enum: ['academic', 'activity', 'holiday', 'exam'],
      default: 'activity',
    },
    location: {
      type: String,
    },
  },
  options: {
    timestamps: true,
  },
})
