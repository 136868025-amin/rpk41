import { Gallery } from '~/server/models/gallery.schema'

/**
 * GET /api/gallery
 * List gallery albums
 * Cached for 2 minutes to improve performance
 */
export default defineCachedEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const filter: any = {}

    if (query.published) {
      filter.isPublished = query.published === 'true'
    }

    const albums = await Gallery.find(filter).sort({ eventDate: -1 })

    return {
      data: albums,
      total: albums.length
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to fetch albums',
    })
  }
}, {
  maxAge: 60 * 2, // Cache for 2 minutes
  name: 'gallery-cache',
  getKey: (event) => {
    const query = getQuery(event)
    return `gallery-${query.published || 'all'}`
  }
})
