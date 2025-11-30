import { Document } from '~/server/models/document.schema'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')

    const deletedDocument = await Document.findByIdAndDelete(id)

    if (!deletedDocument) {
      throw createError({
        statusCode: 404,
        message: 'Document not found',
      })
    }

    // Log activity
    await logActivity('delete', 'documents', `Deleted document: "${deletedDocument.title || 'Untitled'}"`)

    return {
      success: true,
      message: 'Document deleted successfully'
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to delete document',
    })
  }
})
