import { Gallery } from '~/server/models/gallery.schema'

export default defineEventHandler(async (event) => {
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
})
