import { Announcement } from '~/server/models/announcement.schema'

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const activeOnly = query.active === 'true'
    
    let filter: any = {}
    
    if (activeOnly) {
        const now = new Date()
        filter = {
            isActive: true,
            startDate: { $lte: now },
            $or: [
                { endDate: null },
                { endDate: { $gte: now } }
            ]
        }
    }
    
    const announcements = await Announcement.find(filter)
        .sort({ priority: -1, createdAt: -1 })
        .lean()
    
    return {
        success: true,
        data: announcements
    }
})
