import { Personnel } from '~/server/models/personnel.schema'

/**
 * PUT /api/personnel/:id
 * Update a personnel record by ID
 * 
 * Body: Partial personnel object with fields to update
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
    
    // Validate department if provided
    if (body.department) {
      const validDepartments = ['administrators', 'teachers', 'support_staff']
      if (!validDepartments.includes(body.department)) {
        throw createError({
          statusCode: 400,
          message: `Invalid department. Must be one of: ${validDepartments.join(', ')}`,
        })
      }
    }
    
    // Update personnel record
    const personnel = await Personnel.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    ).lean()
    
    if (!personnel) {
      throw createError({
        statusCode: 404,
        message: `Personnel with ID "${id}" not found`,
      })
    }
    
    return {
      data: personnel,
      message: 'Personnel updated successfully',
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
      message: error.message || 'Failed to update personnel',
    })
  }
})
