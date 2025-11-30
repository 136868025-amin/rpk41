import { ContactMessage } from '~/server/models/contactMessage.schema'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const page = Number(query.page) || 1
  const limit = Number(query.limit) || 10
  const skip = (page - 1) * limit

  try {
    const [messages, total] = await Promise.all([
      ContactMessage.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      ContactMessage.countDocuments()
    ])

    return {
      messages,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to fetch messages',
    })
  }
})
