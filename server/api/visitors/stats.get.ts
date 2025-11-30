import { Visitor } from '~/server/models/visitor.schema'

export default defineEventHandler(async (event) => {
  try {
    const today = new Date()
    const last7Days = new Date(today)
    last7Days.setDate(today.getDate() - 6)
    last7Days.setHours(0, 0, 0, 0)

    const stats = await Visitor.aggregate([
      {
        $match: {
          visitedAt: { $gte: last7Days }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$visitedAt" } },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ])

    // Fill in missing days
    const result = []
    for (let i = 0; i < 7; i++) {
      const d = new Date(last7Days)
      d.setDate(last7Days.getDate() + i)
      const dateStr = d.toISOString().split('T')[0]
      const dayName = d.toLocaleDateString('en-US', { weekday: 'short' })
      
      const found = stats.find(s => s._id === dateStr)
      result.push({
        date: dateStr,
        day: dayName,
        count: found ? found.count : 0
      })
    }

    return {
      data: result
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch visitor stats',
    })
  }
})
