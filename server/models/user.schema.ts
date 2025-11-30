import { Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs'

export interface IUser {
  _id?: string
  username: string
  password?: string // Not returned in queries by default
  name: string
  role: 'admin' | 'editor'
  createdAt: Date
  updatedAt: Date
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false, // Do not return password by default
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ['admin', 'editor'],
      default: 'admin',
    },
  },
  {
    timestamps: true,
  }
)

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  
  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password!, salt)
    next()
  } catch (error: any) {
    next(error)
  }
})

export const User = model<IUser>('User', userSchema)
