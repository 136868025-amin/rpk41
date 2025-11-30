import { Gallery } from '~/server/models/gallery.schema'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')

    const deletedAlbum = await Gallery.findByIdAndDelete(id)

    if (!deletedAlbum) {
      throw createError({
        statusCode: 404,
        message: 'Album not found',
      })
    }

    // Log activity
    await logActivity('delete', 'gallery', `Deleted album: "${deletedAlbum.title || 'Untitled'}"`)

    return {
      success: true,
      message: 'Album deleted successfully'
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to delete album',
    })
  }
})
