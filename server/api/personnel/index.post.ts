import { Personnel } from '~/server/models/personnel.schema'

/**
 * POST /api/personnel
 * Create a new personnel record
 * 
 * Body: {
 *   name: string
 *   position: string
 *   photo: string
 *   department: 'administrators' | 'teachers' | 'support_staff'
 *   orderIndex?: number
 *   email?: string
 *   phone?: string
 * }
 */
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    // Validate required fields
    if (!body.name || !body.position || !body.photo || !body.department) {
      throw createError({
        statusCode: 400,
        message: 'Missing required fields: name, position, photo, department',
      })
    }
    
    // Validate department enum
    const validDepartments = ['administrators', 'teachers', 'support_staff']
    if (!validDepartments.includes(body.department)) {
      throw createError({
        statusCode: 400,
        message: `Invalid department. Must be one of: ${validDepartments.join(', ')}`,
      })
    }
    
    // Create new personnel record
    const personnel = await Personnel.create({
      name: body.name,
      position: body.position,
      photo: body.photo,
      department: body.department,
      orderIndex: body.orderIndex !== undefined ? body.orderIndex : 999,
      email: body.email,
      phone: body.phone,
    })
    
    return {
      data: personnel,
      message: 'Personnel created successfully',
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to create personnel',
    })
  }
})
