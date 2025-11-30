import { Gallery } from '~/server/models/gallery.schema'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    
    const album = await Gallery.findById(id)

    if (!album) {
      throw createError({
        statusCode: 404,
        message: 'Album not found',
      })
    }

    return {
      data: album
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to fetch album',
    })
  }
})
