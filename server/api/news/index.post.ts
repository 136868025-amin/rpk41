import { News } from '~/server/models/news.schema'

/**
 * POST /api/news
 * Create a new news article
 * 
 * Body: {
 *   slug: string
 *   title: string
 *   coverImage: string
 *   content: string
 *   category: 'academic' | 'activity' | 'general'
 *   gallery?: string[]
 *   isPublished?: boolean
 * }
 */
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    // Validate required fields
    if (!body.slug || !body.title || !body.coverImage || !body.content) {
      throw createError({
        statusCode: 400,
        message: 'Missing required fields: slug, title, coverImage, content',
      })
    }
    
    // Check if slug already exists
    const existing = await News.findOne({ slug: body.slug })
    if (existing) {
      throw createError({
        statusCode: 400,
        message: `News with slug "${body.slug}" already exists`,
      })
    }
    
    // Create new news article
    const news = await News.create({
      slug: body.slug,
      title: body.title,
      coverImage: body.coverImage,
      content: body.content,
      category: body.category || 'general',
      gallery: body.gallery || [],
      isPublished: body.isPublished || false,
    })
    
    // Log activity
    await logActivity('create', 'news', `Created news: "${body.title}"`)
    
    return {
      data: news,
      message: 'News article created successfully',
    }
  } catch (error: any) {
    // Handle duplicate key error
    if (error.code === 11000) {
      throw createError({
        statusCode: 400,
        message: 'Slug must be unique',
      })
    }
    
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to create news article',
    })
  }
})
