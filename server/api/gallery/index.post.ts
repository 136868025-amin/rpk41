import { Gallery } from '~/server/models/gallery.schema'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    const newAlbum = await Gallery.create(body)
    
    // Log activity
    await logActivity('create', 'gallery', `Created album: "${body.title || 'Untitled'}"`)
    
    return {
      success: true,
      data: newAlbum
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to create album',
    })
  }
})
