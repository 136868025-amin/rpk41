import { ContactMessage } from '~/server/models/contactMessage.schema'

export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params?.id
    
    const deleted = await ContactMessage.findByIdAndDelete(id)

    if (!deleted) {
      throw createError({
        statusCode: 404,
        message: 'Message not found',
      })
    }

    return {
      success: true,
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to delete message',
    })
  }
})
