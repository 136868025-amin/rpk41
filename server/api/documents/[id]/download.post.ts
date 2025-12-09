import { Document } from '~/server/models/document.schema'

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')

    try {
        const doc = await Document.findByIdAndUpdate(
            id,
            { $inc: { downloadCount: 1 } },
            { new: true }
        )

        if (!doc) {
            throw createError({
                statusCode: 404,
                message: 'Document not found'
            })
        }

        return { success: true, downloadCount: doc.downloadCount }
    } catch (error: any) {
        throw createError({
            statusCode: 500,
            message: error.message || 'Failed to increment download count'
        })
    }
})
