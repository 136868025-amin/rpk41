import { Document } from '~/server/models/document.schema'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    const body = await readBody(event)

    const updatedDocument = await Document.findByIdAndUpdate(id, body, { new: true })

    if (!updatedDocument) {
      throw createError({
        statusCode: 404,
        message: 'Document not found',
      })
    }

    // Log activity
    await logActivity('update', 'documents', `Updated document: "${updatedDocument.title || 'Untitled'}"`)

    return {
      success: true,
      data: updatedDocument
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to update document',
    })
  }
})
