import { Schema, model } from 'mongoose'

/**
 * TypeScript Interface for Personnel/Staff
 * Represents school staff members and administrators
 */
export interface IPersonnel {
  _id?: string
  name: string             // Full name in Thai
  position: string         // Job title/position (e.g., "ผู้อำนวยการโรงเรียน")
  photo: string           // Profile photo URL
  department: 'administrators' | 'teachers' | 'support_staff'  // Staff category
  orderIndex: number      // Custom sorting order within department (lower number = higher priority)
  email?: string          // Contact email (optional)
  phone?: string          // Contact phone number (optional)
  content?: string        // Rich text bio/portfolio
  gallery?: string[]      // Additional images
  createdAt: Date
  updatedAt: Date
}

/**
 * Mongoose Schema for Personnel Collection
 * Stores information about school staff members
 */
const personnelSchema = new Schema<IPersonnel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    position: {
      type: String,
      required: true,
      trim: true,
    },
    photo: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      enum: ['administrators', 'teachers', 'support_staff'],
      required: true,
      index: true,  // Index for grouping by department
    },
    orderIndex: {
      type: Number,
      required: true,
      default: 999,  // Default to end of list
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    content: {
      type: String, // Rich text bio/portfolio
    },
    gallery: {
      type: [String], // Additional images
      default: [],
    },
  },
  {
    timestamps: true,
  }
)

// Create compound index for efficient sorting: department first, then orderIndex
personnelSchema.index({ department: 1, orderIndex: 1 })

export const Personnel = model<IPersonnel>('Personnel', personnelSchema)
