import { writeFile } from 'fs/promises'
import { join } from 'path'
import { randomUUID } from 'crypto'

export default defineEventHandler(async (event) => {
  // 1. Check Auth (Middleware already handles this, but double check doesn't hurt)
  const session = await useSession(event, {
    password: process.env.NUXT_SESSION_PASSWORD || 'default-password-must-be-32-chars-long',
  })
  if (session.data.role !== 'admin') {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  // 2. Parse Multipart Form Data
  const files = await readMultipartFormData(event)
  if (!files || files.length === 0) {
    throw createError({ statusCode: 400, message: 'No file uploaded' })
  }

  const uploadedFiles = []

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
      continue // Skip invalid files
    }

    // Validate file size (e.g., max 5MB)
    if (file.data.length > 5 * 1024 * 1024) {
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
    throw createError({ statusCode: 400, message: 'No valid files uploaded' })
  }

  // Return first file URL for simplicity (or array if needed)
  return {
    url: uploadedFiles[0].url,
    files: uploadedFiles,
  }
})
