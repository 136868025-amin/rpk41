import { Schema, model } from 'mongoose'

export interface IAnnouncement {
    _id: string
    title: string
    content?: string
    image?: string
    link?: string
    linkText?: string
    isActive: boolean
    startDate: Date | string
    endDate?: Date | string | null
    showOnce: boolean
    priority: number
    createdAt?: Date | string
    updatedAt?: Date | string
}

const announcementSchema = new Schema<IAnnouncement>(
    {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            default: ''
        },
        image: {
            type: String,
            default: ''
        },
        link: {
            type: String,
            default: ''
        },
        linkText: {
            type: String,
            default: 'ดูเพิ่มเติม'
        },
        isActive: {
            type: Boolean,
            default: true
        },
        startDate: {
            type: Date,
            default: Date.now
        },
        endDate: {
            type: Date,
            default: null
        },
        showOnce: {
            type: Boolean,
            default: false
        },
        priority: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
)

export const Announcement = model<IAnnouncement>('Announcement', announcementSchema)
