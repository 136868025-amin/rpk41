import { Event } from '~/server/models/event.schema'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    
    const eventData = await Event.findById(id)

    if (!eventData) {
      throw createError({
        statusCode: 404,
        message: 'Event not found',
      })
    }

    return {
      data: eventData
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to fetch event',
    })
  }
})
