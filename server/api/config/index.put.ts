import { SchoolConfig } from '~/server/models/schoolConfig.schema'
import { logActivity } from '~/server/utils/logActivity' // Assuming logActivity is available here

/**
 * PUT /api/config
 * Update school configuration (singleton)
 * Always updates the single config document
 * 
 * Body: Partial config object with fields to update
 */
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    // Find the single config document
    let schoolConfig = await SchoolConfig.findOne({})

    if (!schoolConfig) {
      throw createError({
        statusCode: 404,
        message: 'School configuration not found. Please run database seeding.',
      })
    }
    // Merge and save
    Object.assign(schoolConfig, body)
    await schoolConfig.save()

    // Log activity
    await logActivity('update', 'settings', 'Updated school settings configuration')

    return {
      success: true,
      data: schoolConfig
    }
  } catch (error: any) {
    console.error('[Config PUT] Full error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to update config',
      data: error.stack
    })
  }
})
