import { Gallery } from '~/server/models/gallery.schema'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    const body = await readBody(event)

    const updatedAlbum = await Gallery.findByIdAndUpdate(id, body, { new: true })

    if (!updatedAlbum) {
      throw createError({
        statusCode: 404,
        message: 'Album not found',
      })
    }

    // Log activity
    await logActivity('update', 'gallery', `Updated album: "${updatedAlbum.title || 'Untitled'}"`)

    return {
      success: true,
      data: updatedAlbum
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to update album',
    })
  }
})
