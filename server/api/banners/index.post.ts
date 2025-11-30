import { Banner } from '~/server/models/banner.schema'

/**
 * POST /api/banners
 * Create a new banner
 * 
 * Body: {
 *   imageUrl: string
 *   title: string
 *   subtitle?: string
 *   link?: string
 *   isActive?: boolean
 *   orderIndex?: number
 * }
 */
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    // Validate required fields
    if (!body.imageUrl || !body.title) {
      throw createError({
        statusCode: 400,
        message: 'Missing required fields: imageUrl, title',
      })
    }
    
    // Create new banner
    const banner = await Banner.create({
      imageUrl: body.imageUrl,
      title: body.title,
      subtitle: body.subtitle,
      link: body.link,
      isActive: body.isActive !== undefined ? body.isActive : true,
      orderIndex: body.orderIndex !== undefined ? body.orderIndex : 0,
    })
    
    return {
      data: banner,
      message: 'Banner created successfully',
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to create banner',
    })
  }
})
