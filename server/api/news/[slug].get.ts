import { News } from '~/server/models/news.schema'

/**
 * GET /api/news/:slug
 * Get a single news article by slug
 * Also increments the view counter
 */
export default defineEventHandler(async (event) => {
  try {
    const slug = getRouterParam(event, 'slug')
    
    if (!slug) {
      throw createError({
        statusCode: 400,
        message: 'Slug parameter is required',
      })
    }
    
    // Find news by slug and increment view counter
    const news = await News.findOneAndUpdate(
      { slug },
      { $inc: { viewCount: 1 } },  // Increment view count
      { new: true }  // Return updated document
    ).lean()
    
    if (!news) {
      throw createError({
        statusCode: 404,
        message: `News with slug "${slug}" not found`,
      })
    }
    
    return {
      data: news,
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to fetch news article',
    })
  }
})
