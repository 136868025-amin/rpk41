import { writeFile } from 'fs/promises'
import { join } from 'path'
import { randomUUID } from 'crypto'
import { verifyToken } from '~/server/utils/jwt'

export default defineEventHandler(async (event) => {
  try {
    // 1. Check Auth
    let token = getCookie(event, 'auth_token')
    
    // Fallback: Check Authorization header
    if (!token) {
      const authHeader = getRequestHeader(event, 'authorization')
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7)
      }
    }

    if (!token) {
      throw createError({ statusCode: 401, message: 'Unauthorized' })
    }
    
    const decoded: any = verifyToken(token)
    if (!decoded || decoded.role !== 'admin') {
      throw createError({ statusCode: 401, message: 'Unauthorized' })
    }

    // 2. Parse Multipart Form Data
    const files = await readMultipartFormData(event)
    if (!files || files.length === 0) {
      throw createError({ statusCode: 400, message: 'No file uploaded' })
    }

    const uploadedFiles = []
    const errors = []

    // 3. Process each file
    for (const file of files) {
      // Validate file type
      const allowedTypes = [
        'image/jpeg', 'image/png', 'image/webp', 'image/gif',
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ]
      
      if (!allowedTypes.includes(file.type || '')) {
        errors.push(`File ${file.filename} has invalid type: ${file.type}`)
        continue // Skip invalid files
      }

      // Validate file size (e.g., max 5MB)
      if (file.data.length > 5 * 1024 * 1024) {
        errors.push(`File ${file.filename} is too large (max 5MB)`)
        continue // Skip too large files
      }

      // Generate unique filename
      const ext = file.filename?.split('.').pop() || 'png'
      const filename = `${Date.now()}-${randomUUID()}.${ext}`
      const filePath = join(process.cwd(), 'public', 'uploads', filename)

      // Save file
      await writeFile(filePath, file.data)

      uploadedFiles.push({
        url: `/uploads/${filename}`,
        originalName: file.filename,
      })
    }

    if (uploadedFiles.length === 0) {
      throw createError({ 
        statusCode: 400, 
        message: errors.length > 0 ? errors.join(', ') : 'No valid files uploaded' 
      })
    }

    // Return first file URL for simplicity (or array if needed)
    return {
      url: uploadedFiles[0].url,
      files: uploadedFiles,
    }
  } catch (error: any) {
    console.error('Upload Error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Upload failed',
    })
  }
})
