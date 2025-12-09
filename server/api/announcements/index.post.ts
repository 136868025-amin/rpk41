import { Announcement } from '~/server/models/announcement.schema'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    
    const announcement = await Announcement.create({
        title: body.title,
        content: body.content || '',
        image: body.image || '',
        link: body.link || '',
        linkText: body.linkText || 'ดูเพิ่มเติม',
        isActive: body.isActive ?? true,
        startDate: body.startDate || new Date(),
        endDate: body.endDate || null,
        showOnce: body.showOnce ?? false,
        priority: body.priority || 0
    })
    
    return {
        success: true,
        data: announcement
    }
})
