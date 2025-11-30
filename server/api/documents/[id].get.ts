import { Document } from '~/server/models/document.schema'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    
    const document = await Document.findById(id)

    if (!document) {
      throw createError({
        statusCode: 404,
        message: 'Document not found',
      })
    }

    return {
      data: document
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to fetch document',
    })
  }
})
