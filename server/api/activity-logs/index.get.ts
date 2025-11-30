import { ActivityLog } from '~/server/models/activityLog.schema'

export default defineEventHandler(async (event) => {
  try {
    const logs = await ActivityLog.find()
      .sort({ createdAt: -1 })
      .limit(20)
      .lean()

    return {
      data: logs
    }
  } catch (error) {
    return { data: [] }
  }
})
