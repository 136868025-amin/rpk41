import { Personnel } from '~/server/models/personnel.schema'

/**
 * GET /api/personnel/:id
 * Get a single personnel record by ID
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
    
    const personnel = await Personnel.findById(id).lean()
    
    if (!personnel) {
      throw createError({
        statusCode: 404,
        message: `Personnel with ID "${id}" not found`,
      })
    }
    
    return {
      data: personnel,
    }
  } catch (error: any) {
    // Handle invalid ObjectId format
    if (error.name === 'CastError') {
      throw createError({
        statusCode: 400,
        message: 'Invalid personnel ID format',
      })
    }
    
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to fetch personnel',
    })
  }
})
