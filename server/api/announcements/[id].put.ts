import { Announcement } from '~/server/models/announcement.schema'

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')
    const body = await readBody(event)
    
    const announcement = await Announcement.findByIdAndUpdate(
        id,
        {
            title: body.title,
            content: body.content,
            image: body.image,
            link: body.link,
            linkText: body.linkText,
            isActive: body.isActive,
            startDate: body.startDate,
            endDate: body.endDate,
            showOnce: body.showOnce,
            priority: body.priority
        },
        { new: true }
    )
    
    if (!announcement) {
        throw createError({
            statusCode: 404,
            message: 'Announcement not found'
        })
    }
    
    return {
        success: true,
        data: announcement
    }
})
