import { v2 as cloudinary } from 'cloudinary'

// Cloudinary must be configured before each use
let isConfigured = false

function ensureConfigured() {
  if (isConfigured) return

  let cloudinaryUrl: string | undefined
  let cloudName: string | undefined
  let apiKey: string | undefined
  let apiSecret: string | undefined

  // Try runtimeConfig first (Nuxt 3)
  try {
    const config = useRuntimeConfig()
    cloudinaryUrl = config.cloudinaryUrl as string
    cloudName = config.cloudinaryCloudName as string
    apiKey = config.cloudinaryApiKey as string
    apiSecret = config.cloudinaryApiSecret as string
  } catch (e) {
    // useRuntimeConfig not available, will fallback to process.env
  }

  // Fallback to process.env (support both NUXT_ prefix and without)
  cloudinaryUrl = cloudinaryUrl || process.env.NUXT_CLOUDINARY_URL || process.env.CLOUDINARY_URL
  cloudName = cloudName || process.env.NUXT_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME
  apiKey = apiKey || process.env.NUXT_CLOUDINARY_API_KEY || process.env.CLOUDINARY_API_KEY
  apiSecret = apiSecret || process.env.NUXT_CLOUDINARY_API_SECRET || process.env.CLOUDINARY_API_SECRET

  // If CLOUDINARY_URL is set, parse it
  if (cloudinaryUrl) {
    // CLOUDINARY_URL format: cloudinary://api_key:api_secret@cloud_name
    const match = cloudinaryUrl.match(/cloudinary:\/\/(\d+):([^@]+)@(.+)/)
    if (match) {
      apiKey = match[1]
      apiSecret = match[2]
      cloudName = match[3]
    }
  }

  if (!cloudName || !apiKey || !apiSecret) {
    console.error('Missing Cloudinary credentials!')
    console.error('Please set NUXT_CLOUDINARY_URL in .env.local')
    console.error('Format: NUXT_CLOUDINARY_URL=cloudinary://API_KEY:API_SECRET@CLOUD_NAME')
    // Don't mark as configured if credentials are missing
    return
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret
  })
  
  isConfigured = true
}

/**
 * Upload a file to Cloudinary
 */
export async function uploadToCloudinary(
  base64Data: string, 
  options: {
    folder?: string
    resourceType?: 'image' | 'video' | 'raw' | 'auto'
    publicId?: string
    originalFilename?: string
  } = {}
) {
  ensureConfigured()
  
  const { folder = 'rpg-school', resourceType = 'auto', publicId, originalFilename } = options
  
  // Build upload options
  const uploadOptions: any = {
    folder,
    resource_type: resourceType,
    // Ensure files are publicly accessible
    access_mode: 'public',
    type: 'upload',
  }

  // If original filename provided, use it to preserve extension
  if (originalFilename) {
    // Sanitize filename for public_id (remove special chars, keep extension)
    const sanitizedName = originalFilename
      .replace(/[^a-zA-Z0-9\-_\.]/g, '_')
      .replace(/\s+/g, '_')
    
    // For raw files, we need the extension in the public_id
    if (resourceType === 'raw') {
      uploadOptions.public_id = sanitizedName
      uploadOptions.use_filename = true
      uploadOptions.unique_filename = true
    } else {
      // For images, let Cloudinary handle optimization
      uploadOptions.quality = 'auto'
      uploadOptions.fetch_format = 'auto'
    }
  } else if (publicId) {
    uploadOptions.public_id = publicId
  }
  
  try {
    const result = await cloudinary.uploader.upload(base64Data, uploadOptions)
    
    return {
      url: result.secure_url,
      publicId: result.public_id,
      format: result.format,
      width: result.width,
      height: result.height,
      bytes: result.bytes,
      originalFilename: originalFilename
    }
  } catch (error: any) {
    console.error('Cloudinary upload error:', error)
    throw new Error(error.message || 'Failed to upload to Cloudinary')
  }
}

/**
 * Delete a file from Cloudinary
 */
export async function deleteFromCloudinary(
  publicId: string,
  resourceType: 'image' | 'video' | 'raw' = 'image'
) {
  ensureConfigured()
  
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType
    })
    return result
  } catch (error: any) {
    console.error('Cloudinary delete error:', error)
    throw new Error(error.message || 'Failed to delete from Cloudinary')
  }
}

/**
 * Generate a signed URL for secure file access
 * @param publicId - The public ID of the file
 * @param resourceType - Type of resource (image, video, raw)
 * @param expiresIn - Expiration time in seconds (default 1 hour)
 */
export function getSignedUrl(
  publicId: string,
  resourceType: 'image' | 'video' | 'raw' = 'raw',
  expiresIn: number = 3600
): string {
  ensureConfigured()
  
  const timestamp = Math.floor(Date.now() / 1000) + expiresIn
  
  // Generate signed URL
  const url = cloudinary.url(publicId, {
    resource_type: resourceType,
    type: 'upload',
    sign_url: true,
    secure: true,
    // Add attachment flag for download
    flags: resourceType === 'raw' ? 'attachment' : undefined,
  })
  
  return url
}

/**
 * Get download URL with proper content disposition
 * @param url - The Cloudinary URL
 * @param filename - Desired filename for download
 */
export function getDownloadUrl(url: string, filename?: string): string {
  if (!url) return ''
  
  // Add fl_attachment transformation for download
  if (url.includes('/raw/upload/')) {
    // For raw files, add attachment flag
    const downloadUrl = url.replace('/raw/upload/', '/raw/upload/fl_attachment/')
    return downloadUrl
  } else if (url.includes('/image/upload/')) {
    // For images, add attachment flag with filename
    if (filename) {
      return url.replace('/image/upload/', `/image/upload/fl_attachment:${encodeURIComponent(filename)}/`)
    }
    return url.replace('/image/upload/', '/image/upload/fl_attachment/')
  }
  
  return url
}

export default cloudinary
