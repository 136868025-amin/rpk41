import { Banner } from '~/server/models/banner.schema'

/**
 * PUT /api/banners/:id
 * Update a banner by ID
 * 
 * Body: Partial banner object with fields to update
 */
export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    const body = await readBody(event)
    
    if (!id) {
      throw createError({
        statusCode: 400,
        message: 'ID parameter is required',
      })
    }
    
    // Update banner
    const banner = await Banner.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    ).lean()
    
    if (!banner) {
      throw createError({
        statusCode: 404,
        message: `Banner with ID "${id}" not found`,
      })
    }
    
    return {
      data: banner,
      message: 'Banner updated successfully',
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
      message: error.message || 'Failed to update banner',
    })
  }
})
