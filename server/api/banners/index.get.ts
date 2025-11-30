import { Banner } from '~/server/models/banner.schema'

/**
 * GET /api/banners
 * List banners, optionally filtered by active status
 * 
 * Query Parameters:
 * - activeOnly: Return only active banners (default: true)
 */
export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    
    // Build filter
    const filter: any = {}
    
    // Filter by active status (default to true for public API)
    const activeOnly = query.activeOnly !== 'false'  // true unless explicitly false
    if (activeOnly) {
      filter.isActive = true
    }
    
    // Fetch banners sorted by orderIndex
    const banners = await Banner.find(filter)
      .sort({ orderIndex: 1 })  // Lower orderIndex = shown first
      .lean()
    
    return {
      data: banners,
      total: banners.length,
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to fetch banners',
    })
  }
})
