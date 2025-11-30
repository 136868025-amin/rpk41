import { Personnel } from '~/server/models/personnel.schema'

/**
 * DELETE /api/personnel/:id
 * Delete a personnel record by ID
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
    
    // Delete personnel record
    const personnel = await Personnel.findByIdAndDelete(id)
    
    if (!personnel) {
      throw createError({
        statusCode: 404,
        message: `Personnel with ID "${id}" not found`,
      })
    }
    
    return {
      message: 'Personnel deleted successfully',
      deletedId: id,
    }
  } catch (error: any) {
    if (error.name === 'CastError') {
      throw createError({
        statusCode: 400,
        message: 'Invalid personnel ID format',
      })
    }
    
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to delete personnel',
    })
  }
})
