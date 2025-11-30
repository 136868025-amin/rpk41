import { Schema, model } from 'mongoose'

export interface IActivityLog {
  action: 'create' | 'update' | 'delete' | 'login' | 'other'
  module: string
  description: string
  user?: string // Username or ID
  createdAt: Date
}

const activityLogSchema = new Schema<IActivityLog>(
  {
    action: {
      type: String,
      enum: ['create', 'update', 'delete', 'login', 'other'],
      required: true,
    },
    module: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    user: {
      type: String,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false }, // Only createdAt needed
  }
)

export const ActivityLog = model<IActivityLog>('ActivityLog', activityLogSchema)
