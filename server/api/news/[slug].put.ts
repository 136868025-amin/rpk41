import { News } from '~/server/models/news.schema'

/**
 * PUT /api/news/:slug
 * Update a news article by slug
 * 
 * Body: Partial news object with fields to update
 */
export default defineEventHandler(async (event) => {
  try {
    const slug = getRouterParam(event, 'slug')
    const body = await readBody(event)
    
    if (!slug) {
      throw createError({
        statusCode: 400,
        message: 'Slug parameter is required',
      })
    }
    
    // Prevent updating slug to avoid breaking URLs
    if (body.slug && body.slug !== slug) {
      throw createError({
        statusCode: 400,
        message: 'Cannot update slug field',
      })
    }
    
    // Update news article
    const news = await News.findOneAndUpdate(
      { slug },
      { $set: body },
      { new: true, runValidators: true }
    ).lean()
    
    if (!news) {
      throw createError({
        statusCode: 404,
        message: `News with slug "${slug}" not found`,
      })
    }
    
    // Log activity
    await logActivity('update', 'news', `Updated news: "${news.title}"`)
    
    return {
      data: news,
      message: 'News article updated successfully',
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to update news article',
    })
  }
})
