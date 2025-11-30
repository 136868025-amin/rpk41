import { ContactMessage } from '~/server/models/contactMessage.schema'

export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params?.id
    
    // Mark as read when fetching details
    const message = await ContactMessage.findByIdAndUpdate(
      id,
      { isRead: true },
      { new: true }
    )

    if (!message) {
      throw createError({
        statusCode: 404,
        message: 'Message not found',
      })
    }

    return message
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to fetch message',
    })
  }
})
