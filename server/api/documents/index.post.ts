import { Document } from '~/server/models/document.schema'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    const newDocument = await Document.create({
      title: body.title,
      category: body.category,
      fileUrl: body.filePath || body.fileUrl, // Support both field names
      fileSize: body.fileSize,
      isPublished: body.isPublished ?? true
    })
    
    // Log activity
    await logActivity('create', 'documents', `Created document: "${body.title || 'Untitled'}"`)
    
    return {
      success: true,
      data: newDocument
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to create document',
    })
  }
})
