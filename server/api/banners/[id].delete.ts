import { Banner } from '~/server/models/banner.schema'

/**
 * DELETE /api/banners/:id
 * Delete a banner by ID
 */
export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    
    if (!id) {
      throw createError({
        statusCode: 400,
        message: 'ID parameter is required',
      })
    }
    
    // Delete banner
    const banner = await Banner.findByIdAndDelete(id)
    
    if (!banner) {
      throw createError({
        statusCode: 404,
        message: `Banner with ID "${id}" not found`,
      })
    }
    
    return {
      message: 'Banner deleted successfully',
      deletedId: id,
    }
  } catch (error: any) {
    if (error.name === 'CastError') {
      throw createError({
        statusCode: 400,
        message: 'Invalid banner ID format',
      })
    }
    
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to delete banner',
    })
  }
})
