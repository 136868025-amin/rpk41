/**
 * Cloudinary URL Transformer
 * Adds transformations to Cloudinary URLs for optimization
 */

interface CloudinaryTransformOptions {
  width?: number
  height?: number
  crop?: 'fill' | 'fit' | 'limit' | 'scale' | 'thumb'
  quality?: 'auto' | 'auto:low' | 'auto:good' | 'auto:best' | number
  format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png'
  aspectRatio?: string
}

/**
 * Transform Cloudinary URL with optimization parameters
 * @param url - Original Cloudinary URL
 * @param options - Transformation options
 * @returns Optimized Cloudinary URL
 */
export function useCloudinaryUrl(url: string, options: CloudinaryTransformOptions = {}): string {
  if (!url || !url.includes('cloudinary.com')) {
    return url // Return as-is if not a Cloudinary URL
  }

  // Default optimizations
  const {
    width,
    height,
    crop = 'fill',
    quality = 'auto',
    format = 'auto',
    aspectRatio
  } = options

  // Build transformation string
  const transforms: string[] = []

  if (width) transforms.push(`w_${width}`)
  if (height) transforms.push(`h_${height}`)
  if (width || height) transforms.push(`c_${crop}`)
  if (aspectRatio) transforms.push(`ar_${aspectRatio}`)
  
  // Always add quality and format for optimization
  transforms.push(`q_${quality}`)
  transforms.push(`f_${format}`)

  if (transforms.length === 0) {
    return url
  }

  const transformString = transforms.join(',')

  // Insert transformations after /upload/
  if (url.includes('/image/upload/')) {
    return url.replace('/image/upload/', `/image/upload/${transformString}/`)
  }

  return url
}

/**
 * Preset transformations for common use cases
 */
export const cloudinaryPresets = {
  // Thumbnail - small, squares for avatars/icons
  thumbnail: (url: string) => useCloudinaryUrl(url, {
    width: 100,
    height: 100,
    crop: 'thumb',
    quality: 'auto:good'
  }),
  
  // Avatar - profile pictures
  avatar: (url: string) => useCloudinaryUrl(url, {
    width: 200,
    height: 200,
    crop: 'fill'
  }),
  
  // Card - medium size for cards
  card: (url: string) => useCloudinaryUrl(url, {
    width: 400,
    height: 300,
    crop: 'fill'
  }),
  
  // News cover - wide aspect ratio
  newsCover: (url: string) => useCloudinaryUrl(url, {
    width: 800,
    height: 450,
    crop: 'fill'
  }),
  
  // Hero banner - full width, optimized quality
  hero: (url: string) => useCloudinaryUrl(url, {
    width: 1920,
    height: 700,
    crop: 'fill',
    quality: 'auto:best'
  }),
  
  // Gallery thumbnail
  galleryThumb: (url: string) => useCloudinaryUrl(url, {
    width: 300,
    height: 300,
    crop: 'fill'
  }),
  
  // Full size gallery image
  galleryFull: (url: string) => useCloudinaryUrl(url, {
    width: 1200,
    crop: 'limit'
  })
}

export default useCloudinaryUrl
