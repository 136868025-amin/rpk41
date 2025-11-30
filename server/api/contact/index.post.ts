import { ContactMessage } from '~/server/models/contactMessage.schema'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    // Validate body
    if (!body.name || !body.email || !body.subject || !body.message) {
      throw createError({
        statusCode: 400,
        message: 'Missing required fields',
      })
    }

    const newMessage = await ContactMessage.create(body)

    return {
      success: true,
      data: newMessage,
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to send message',
    })
  }
})
