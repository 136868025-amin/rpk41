import { News } from '~/server/models/news.schema'

/**
 * DELETE /api/news/:slug
 * Delete a news article by slug
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
    
    // Delete news article
    const news = await News.findOneAndDelete({ slug })
    
    if (!news) {
      throw createError({
        statusCode: 404,
        message: `News with slug "${slug}" not found`,
      })
    }
    
    // Log activity
    await logActivity('delete', 'news', `Deleted news: "${news.title}"`)
    
    return {
      message: 'News article deleted successfully',
      deletedSlug: slug,
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to delete news article',
    })
  }
})
