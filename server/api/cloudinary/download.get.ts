import { v2 as cloudinary } from 'cloudinary'

/**
 * GET /api/files/download
 * Proxy download for Cloudinary files (handles authenticated files)
 * 
 * Query: {
 *   url: string - The Cloudinary URL
 *   filename?: string - Custom filename for download
 * }
 */
export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { url, filename } = query as { url: string; filename?: string }



  if (!url) {
    throw createError({
      statusCode: 400,
      message: 'URL is required'
    })
  }

  try {
    // Ensure Cloudinary is configured
    const config = useRuntimeConfig()
    
    // Parse cloudinary URL to get credentials
    const cloudinaryUrl = config.cloudinaryUrl as string
    if (cloudinaryUrl) {
      const match = cloudinaryUrl.match(/cloudinary:\/\/(\d+):([^@]+)@(.+)/)
      if (match) {
        cloudinary.config({
          cloud_name: match[3],
          api_key: match[1],
          api_secret: match[2]
        })
      }
    }

    // Extract public_id and resource type from URL
    const urlMatch = url.match(/\/(?:raw|image|video)\/upload\/(?:v\d+\/)?(.+)$/)
    if (!urlMatch) {
      // Not a Cloudinary URL, redirect to original
      return sendRedirect(event, url)
    }

    const publicId = urlMatch[1]
    let resourceType: 'image' | 'video' | 'raw' = 'raw'
    if (url.includes('/image/upload/')) {
      resourceType = 'image'
    } else if (url.includes('/video/upload/')) {
      resourceType = 'video'
    }

    // Generate signed URL with authentication
    const signedUrl = cloudinary.url(publicId, {
      resource_type: resourceType,
      type: 'authenticated',
      sign_url: true,
      secure: true,
    })

    // Fetch the file from Cloudinary using the signed URL
    const response = await fetch(url, {
      headers: {
        // Use API key authentication if needed
      }
    })

    if (!response.ok) {
      // Try with admin API to get private URL
      try {
        const resource = await cloudinary.api.resource(publicId, {
          resource_type: resourceType
        })
        
        // Redirect to secure URL from API response
        return sendRedirect(event, resource.secure_url)
      } catch (apiError) {
        console.error('Cloudinary API error:', apiError)
        throw createError({
          statusCode: response.status,
          message: 'Failed to fetch file from Cloudinary'
        })
      }
    }

    // Get content type and set headers
    const contentType = response.headers.get('content-type') || 'application/octet-stream'
    
    // Determine file extension from content-type or URL
    const getExtension = (contentType: string, url: string, publicId: string): string => {
      // Check if publicId already has extension
      const publicIdMatch = publicId.match(/\.([a-zA-Z0-9]+)$/)
      if (publicIdMatch) return '.' + publicIdMatch[1].toLowerCase()
      
      // Check URL for extension
      const urlMatch = url.match(/\.([a-zA-Z0-9]+)(?:\?|$)/)
      if (urlMatch) return '.' + urlMatch[1].toLowerCase()
      
      // Map content-type to extension
      const typeMap: Record<string, string> = {
        'application/pdf': '.pdf',
        'application/msword': '.doc',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
        'application/vnd.ms-excel': '.xls',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '.xlsx',
        'image/jpeg': '.jpg',
        'image/png': '.png',
        'image/gif': '.gif',
        'image/webp': '.webp',
      }
      return typeMap[contentType] || ''
    }
    
    const extension = getExtension(contentType, url, publicId)
    let downloadFilename = filename || publicId.split('/').pop() || 'download'
    
    // Append extension if not already present
    if (extension && !downloadFilename.toLowerCase().endsWith(extension)) {
      downloadFilename += extension
    }

    // Set download headers
    setHeaders(event, {
      'Content-Type': contentType,
      'Content-Disposition': `attachment; filename="${encodeURIComponent(downloadFilename)}"`,
      'Cache-Control': 'private, max-age=3600'
    })

    // Stream the response
    const arrayBuffer = await response.arrayBuffer()
    return new Uint8Array(arrayBuffer)

  } catch (error: any) {
    console.error('Download proxy error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to download file'
    })
  }
})
