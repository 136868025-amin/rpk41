import { Schema, model } from 'mongoose'

/**
 * TypeScript Interfaces for School Configuration
 */
export interface IContact {
  phone: string
  email: string
  fax?: string
}

export interface ILocation {
  address: string
  province: string
  postalCode: string
  mapUrl?: string  // Google Maps embed URL
  latitude?: number
  longitude?: number
}

export interface ISocialMedia {
  facebook?: string
  line?: string
  youtube?: string
  instagram?: string
}

/**
 * Main SchoolConfig Interface
 * Singleton collection - should only have ONE document
 */
export interface ISchoolConfig {
  _id?: string
  schoolName: string              // Official school name (Thai)
  schoolNameEn?: string           // English name (optional)
  logo?: string                   // School logo URL
  contact: IContact               // Contact information
  location: ILocation             // School location
  vision: string                  // School vision statement
  mission: string                 // School mission statement
  history: string                 // School history (rich HTML)
  directorMessage?: string        // Director's message for homepage
  slogan?: string                 // School slogan
  heroImage?: string              // Homepage hero background image
  aboutImage?: string             // Homepage about section image
  stats?: {
    students: number
    teachers: number
    foundedYear: number
    awards: number
  }
  socialMedia: ISocialMedia       // Social media links
  updatedAt: Date
  createdAt: Date
}

/**
 * Mongoose Schema for SchoolConfig Collection
 * This is a SINGLETON - only one document should exist
 */
const schoolConfigSchema = new Schema<ISchoolConfig>(
  {
    schoolName: {
      type: String,
      required: true,
      default: 'โรงเรียนราชประชานุเคราะห์ ๔๑',
    },
    schoolNameEn: {
      type: String,
      default: 'Ratchaprachanukroh 41 School',
    },
    logo: {
      type: String,
    },
    contact: {
      phone: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        lowercase: true,
      },
      fax: String,
    },
    location: {
      address: {
        type: String,
        required: true,
      },
      province: {
        type: String,
        default: 'ยะลา',
      },
      postalCode: String,
      mapUrl: String,
      latitude: Number,
      longitude: Number,
    },
    vision: {
      type: String,
      required: true,
      default: 'มุ่งมั่นพัฒนาคุณภาพการศึกษา สร้างคนดี มีคุณธรรม นำสังคม',
    },
    mission: {
      type: String,
      required: true,
      default: 'จัดการศึกษาที่มีคุณภาพ เน้นผู้เรียนเป็นสำคัญ',
    },
    history: {
      type: String,
      default: '<p>ประวัติโรงเรียน...</p>',
    },
    directorMessage: {
      type: String,
    },
    slogan: {
      type: String,
      default: 'มุ่งมั่น พัฒนา ก้าวไกล สู่สากล',
    },
    heroImage: {
      type: String,
    },
    aboutImage: {
      type: String,
    },
    stats: {
      students: { type: Number, default: 0 },
      teachers: { type: Number, default: 0 },
      foundedYear: { type: Number, default: 2508 },
      awards: { type: Number, default: 0 },
    },
    socialMedia: {
      facebook: String,
      line: String,
      youtube: String,
      instagram: String,
    },
  },
  {
    timestamps: true,
    collection: 'schoolconfig',  // Force singular collection name
  }
)

// Prevent creating more than one config document
schoolConfigSchema.pre('save', async function () {
  if (!this.isNew) return
  
  const count = await SchoolConfig.countDocuments()
  if (count > 0) {
    throw new Error('SchoolConfig is a singleton - only one document allowed. Use update instead.')
  }
})

export const SchoolConfig = model<ISchoolConfig>('SchoolConfig', schoolConfigSchema)
