import { Banner } from '~/server/models/banner.schema'

/**
 * GET /api/banners/:id
 * Get a banner by ID
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
    
    // console.log('Fetching banner with ID:', id)
    const banner = await Banner.findById(id).lean()
    // console.log('Banner found:', banner)
    
    if (!banner) {
      throw createError({
        statusCode: 404,
        message: `Banner with ID "${id}" not found`,
      })
    }
    
    return banner
  } catch (error: any) {
    if (error.name === 'CastError') {
      throw createError({
        statusCode: 400,
        message: 'Invalid banner ID format',
      })
    }
    
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to fetch banner',
    })
  }
})
