import { readFile, stat } from 'fs/promises'
import { join, normalize, sep } from 'path'

export default defineEventHandler(async (event) => {
  try {
    // Get the file path from the route parameter
    const path = getRouterParam(event, 'path')
    
    if (!path) {
      throw createError({ statusCode: 400, message: 'File path is required' })
    }

    // Security: Normalize the path and prevent directory traversal
    const normalizedPath = normalize(path).replace(/^(\.\.[/\\])+/, '')
    
    // Prevent accessing files outside uploads directory
    if (normalizedPath.includes('..') || normalizedPath.includes(sep + sep)) {
      throw createError({ statusCode: 403, message: 'Access denied' })
    }

    // Construct the full file path
    const uploadsDir = join(process.cwd(), 'server', 'uploads')
    const filePath = join(uploadsDir, normalizedPath)

    // Check if file exists and is a file (not a directory)
    const stats = await stat(filePath)
    if (!stats.isFile()) {
      throw createError({ statusCode: 404, message: 'File not found' })
    }

    // Read the file
    const fileBuffer = await readFile(filePath)

    // Determine content type from file extension
    const ext = filePath.split('.').pop()?.toLowerCase()
    const contentTypeMap: Record<string, string> = {
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
      'png': 'image/png',
      'gif': 'image/gif',
      'webp': 'image/webp',
      'svg': 'image/svg+xml',
      'pdf': 'application/pdf',
      'doc': 'application/msword',
      'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'xls': 'application/vnd.ms-excel',
      'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    }
    const contentType = contentTypeMap[ext || ''] || 'application/octet-stream'

    // Set appropriate headers
    setResponseHeader(event, 'Content-Type', contentType)
    setResponseHeader(event, 'Cache-Control', 'public, max-age=31536000')
    
    // For images, set content-disposition to inline
    if (contentType.startsWith('image/')) {
      setResponseHeader(event, 'Content-Disposition', 'inline')
    }

    return fileBuffer
  } catch (error: any) {
    console.error('File serving error:', error)
    
    // If file not found
    if (error.code === 'ENOENT') {
      throw createError({ statusCode: 404, message: 'File not found' })
    }
    
    // If already a createError, re-throw
    if (error.statusCode) {
      throw error
    }
    
    // Generic error
    throw createError({
      statusCode: 500,
      message: 'Failed to serve file',
    })
  }
})
