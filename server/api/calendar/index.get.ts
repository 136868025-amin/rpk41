import { Event } from '~/server/models/event.schema'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const filter: any = {}

    // Optional date range filter
    if (query.start && query.end) {
      filter.startDate = {
        $gte: new Date(query.start as string),
        $lte: new Date(query.end as string)
      }
    }

    const events = await Event.find(filter).sort({ startDate: 1 })

    return {
      data: events,
      total: events.length
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to fetch events',
    })
  }
})
