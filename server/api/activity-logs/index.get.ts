import { ActivityLog } from '~/server/models/activityLog.schema'

export default defineEventHandler(async (event) => {
  try {
    const logs = await ActivityLog.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .lean()

    return {
      data: logs,
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch activity logs',
    })
  }
})
