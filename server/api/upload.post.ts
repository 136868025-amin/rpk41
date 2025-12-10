import { verifyToken } from '~/server/utils/jwt'
import { uploadToCloudinary } from '~/server/utils/cloudinary'

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
      // Skip if no data
      if (!file.data || !file.type) {
        continue
      }

      // Validate file type
      const allowedTypes = [
        'image/jpeg', 'image/png', 'image/webp', 'image/gif',
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ]
      
      if (!allowedTypes.includes(file.type)) {
        errors.push(`File ${file.filename} has invalid type: ${file.type}`)
        continue
      }

      // Validate file size (max 10MB)
      const maxSize = 10 * 1024 * 1024
      if (file.data.length > maxSize) {
        errors.push(`File ${file.filename} is too large (max 10MB)`)
        continue
      }

      // Determine resource type for Cloudinary
      const isImage = file.type.startsWith('image/')
      const resourceType = isImage ? 'image' : 'raw'

      try {
        // Convert to Base64 Data URL for Cloudinary upload
        const base64Data = `data:${file.type};base64,${file.data.toString('base64')}`
        
        // Upload to Cloudinary
        const result = await uploadToCloudinary(base64Data, {
          folder: 'rpg-school',
          resourceType: resourceType as 'image' | 'raw',
          originalFilename: file.filename || undefined
        })

        uploadedFiles.push({
          url: result.url,
          publicId: result.publicId,
          originalName: file.filename,
          format: result.format,
          bytes: result.bytes
        })
      } catch (uploadError: any) {
        console.error(`Failed to upload ${file.filename}:`, uploadError)
        errors.push(`Failed to upload ${file.filename}: ${uploadError.message}`)
      }
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
      publicId: uploadedFiles[0].publicId,
      files: uploadedFiles,
      errors: errors.length > 0 ? errors : undefined
    }
  } catch (error: any) {
    console.error('Upload Error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Upload failed',
    })
  }
})
