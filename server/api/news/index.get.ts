import { News } from '~/server/models/news.schema'

/**
 * GET /api/news
 * List news articles with optional filters
 * Cached for 1 minute to improve performance
 * 
 * Query Parameters:
 * - category: Filter by category (academic|activity|general)
 * - isPublished: Filter by published status (default: true)
 * - limit: Number of items to return (default: 10)
 * - skip: Number of items to skip for pagination (default: 0)
 */
export default defineCachedEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    
    // Build filter
    const filter: any = {}
    
    // Filter by published status (default to true for public API)
    const isPublished = query.isPublished !== undefined 
      ? query.isPublished === 'true' 
      : true
    filter.isPublished = isPublished
    
    // Filter by category if provided
    if (query.category) {
      filter.category = query.category
    }

    // Exclude specific IDs
    if (query.exclude) {
      const excludedIds = (query.exclude as string).split(',')
      filter._id = { $nin: excludedIds }
    }
    
    // Pagination
    const limit = parseInt(query.limit as string) || 10
    const skip = parseInt(query.skip as string) || 0
    
    // Fetch news with filters
    const news = await News.find(filter)
      .sort({ publishedAt: -1 })  // Most recent first
      .limit(limit)
      .skip(skip)
      .lean()  // Return plain JavaScript objects
    
    // Get total count for pagination
    const total = await News.countDocuments(filter)
    
    return {
      data: news,
      pagination: {
        total,
        limit,
        skip,
        hasMore: skip + limit < total,
      },
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to fetch news',
    })
  }
}, {
  maxAge: 60, // Cache for 1 minute
  name: 'news-cache',
  getKey: (event) => {
    const query = getQuery(event)
    return `news-${query.category || 'all'}-${query.limit || 10}-${query.skip || 0}-${query.isPublished || 'true'}`
  }
})
