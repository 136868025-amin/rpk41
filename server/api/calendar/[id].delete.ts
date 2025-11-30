import { Event } from '~/server/models/event.schema'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')

    const deletedEvent = await Event.findByIdAndDelete(id)

    if (!deletedEvent) {
      throw createError({
        statusCode: 404,
        message: 'Event not found',
      })
    }

    // Log activity
    await logActivity('delete', 'calendar', `Deleted event: "${deletedEvent.title || 'Untitled'}"`) 

    return {
      success: true,
      message: 'Event deleted successfully'
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to delete event',
    })
  }
})
