import { Document } from '~/server/models/document.schema'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const filter: any = {}

    if (query.category) {
      filter.category = query.category
    }

    const documents = await Document.find(filter).sort({ createdAt: -1 })

    return {
      data: documents,
      total: documents.length
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to fetch documents',
    })
  }
})
