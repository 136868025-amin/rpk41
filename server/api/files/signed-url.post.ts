import { getSignedUrl } from '~/server/utils/cloudinary'

/**
 * POST /api/files/signed-url
 * Generate a signed URL for secure file download
 * 
 * Body: {
 *   url: string - The Cloudinary URL
 *   filename?: string - Optional custom filename for download
 * }
 */
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { url, filename } = body

    if (!url) {
      throw createError({
        statusCode: 400,
        message: 'URL is required'
      })
    }

    // Extract public_id from Cloudinary URL
    // Example: https://res.cloudinary.com/dumbgvlrr/raw/upload/v123/rpg-school/file.pdf
    const urlMatch = url.match(/\/(?:raw|image|video)\/upload\/(?:v\d+\/)?(.+)$/)
    
    if (!urlMatch) {
      // Not a Cloudinary URL, return original
      return { signedUrl: url }
    }

    const publicId = urlMatch[1]
    
    // Determine resource type from URL
    let resourceType: 'image' | 'video' | 'raw' = 'raw'
    if (url.includes('/image/upload/')) {
      resourceType = 'image'
    } else if (url.includes('/video/upload/')) {
      resourceType = 'video'
    }

    // Generate signed URL (valid for 1 hour)
    const signedUrl = getSignedUrl(publicId, resourceType, 3600)

    return {
      signedUrl,
      filename: filename || publicId.split('/').pop()
    }
  } catch (error: any) {
    console.error('Signed URL Error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to generate signed URL'
    })
  }
})
