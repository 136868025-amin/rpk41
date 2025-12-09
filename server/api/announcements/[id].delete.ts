import { Announcement } from '~/server/models/announcement.schema'

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')
    
    const announcement = await Announcement.findByIdAndDelete(id)
    
    if (!announcement) {
        throw createError({
            statusCode: 404,
            message: 'Announcement not found'
        })
    }
    
    return {
        success: true,
        message: 'Announcement deleted successfully'
    }
})
