import { SchoolConfig } from '~/server/models/schoolConfig.schema'

/**
 * GET /api/config
 * Get school configuration (singleton)
 * Returns the single school config document
 */
export default defineEventHandler(async (event) => {
  try {
    // SchoolConfig is a singleton, so we fetch the first (and only) document
    const config = await SchoolConfig.findOne().lean()
    
    if (!config) {
      throw createError({
        statusCode: 404,
        message: 'School configuration not found. Please run database seeding.',
      })
    }
    
    return {
      data: config,
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to fetch school configuration',
    })
  }
})
