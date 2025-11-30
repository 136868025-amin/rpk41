import { Schema, model } from 'mongoose'

export interface IActivityLog {
  action: 'create' | 'update' | 'delete' | 'login' | 'other'
  module: 'news' | 'gallery' | 'documents' | 'personnel' | 'calendar' | 'settings' | 'auth'
  description: string
  user?: string // Username or User ID
  ipAddress?: string
  createdAt: Date
}

const activityLogSchema = new Schema<IActivityLog>(
  {
    action: { type: String, required: true },
    module: { type: String, required: true },
    description: { type: String, required: true },
    user: { type: String, default: 'Admin' },
    ipAddress: String,
  },
  { timestamps: true }
)

export const ActivityLog = model<IActivityLog>('ActivityLog', activityLogSchema)
