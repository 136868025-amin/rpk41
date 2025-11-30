import { Event } from '~/server/models/event.schema'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    const body = await readBody(event)

    const updatedEvent = await Event.findByIdAndUpdate(id, body, { new: true })

    if (!updatedEvent) {
      throw createError({
        statusCode: 404,
        message: 'Event not found',
      })
    }

    // Log activity
    await logActivity('update', 'calendar', `Updated event: "${updatedEvent.title || 'Untitled'}"`) 

    return {
      success: true,
      data: updatedEvent
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to update event',
    })
  }
})
