import { ContactMessage } from '~/server/models/contactMessage.schema'

export default defineEventHandler(async (event) => {
  try {
    const messages = await ContactMessage.find()
      .sort({ createdAt: -1 })
      .lean()

    return {
      data: messages,
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to fetch messages',
    })
  }
})
