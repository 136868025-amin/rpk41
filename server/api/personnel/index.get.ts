import { Personnel } from '~/server/models/personnel.schema'

/**
 * GET /api/personnel
 * List personnel with optional grouping by department
 * 
 * Query Parameters:
 * - department: Filter by department (administrators|teachers|support_staff)
 * - grouped: Return grouped by department (default: false)
 */
export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    
    // Build filter
    const filter: any = {}
    
    if (query.department) {
      filter.department = query.department
    }
    
    // Fetch personnel sorted by department and orderIndex
    const personnel = await Personnel.find(filter)
      .sort({ department: 1, orderIndex: 1 })
      .lean()
    
    // If grouped=true, return as object with departments as keys
    if (query.grouped === 'true') {
      const grouped = {
        administrators: [] as any[],
        teachers: [] as any[],
        support_staff: [] as any[],
      }
      
      personnel.forEach((person) => {
        if (grouped[person.department as keyof typeof grouped]) {
          grouped[person.department as keyof typeof grouped].push(person)
        }
      })
      
      return {
        data: grouped,
        total: personnel.length,
      }
    }
    
    // Otherwise return as array
    return {
      data: personnel,
      total: personnel.length,
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to fetch personnel',
    })
  }
})
