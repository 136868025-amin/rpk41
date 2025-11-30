import { Event } from '~/server/models/event.schema'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    const newEvent = await Event.create(body)
    
    // Log activity
    await logActivity('create', 'calendar', `Created event: "${body.title || 'Untitled'}"`) 

    return {
      success: true,
      data: newEvent
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to create event',
    })
  }
})
