// https://nuxt.com/docs/api/configuration/nuxt-config
import { config } from 'dotenv'

// Load .env.local explicitly for process.env access in nuxt.config.ts
config({ path: '.env.local' })

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  
  css: ['~/src/input.css'],
  
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: ['nuxt-mongoose', '@nuxtjs/google-fonts', '@pinia/nuxt', '@nuxtjs/seo', '@nuxt/image'],

  site: {
    url: 'https://rpk41.vercel.app',
    name: 'โรงเรียนราชประชานุเคราะห์ ๔๑',
    description: 'โรงเรียนราชประชานุเคราะห์ ๔๑ จังหวัดยะลา มุ่งมั่นพัฒนาคุณภาพการศึกษา สร้างคนดี มีคุณธรรม',
    defaultLocale: 'th',
  },

  // Enhanced SEO
  app: {
    head: {
      htmlAttrs: { lang: 'th' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'โรงเรียนราชประชานุเคราะห์ ๔๑ จังหวัดยะลา',
      meta: [
        { name: 'theme-color', content: '#3b82f6' },
        { name: 'msapplication-TileColor', content: '#3b82f6' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'th_TH' },
        { property: 'og:site_name', content: 'โรงเรียนราชประชานุเคราะห์ ๔๑' },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/icon-192.png' },
        { rel: 'apple-touch-icon', href: '/icon-192.png' },
        { rel: 'manifest', href: '/manifest.json' }
      ],
    },
  },

  // Robots configuration
  robots: {
    allow: '/',
    disallow: '/admin',
    sitemap: 'https://rpk41.vercel.app/sitemap.xml',
  },

  // Sitemap configuration  
  sitemap: {
    exclude: ['/admin/**', '/admin'],
  },
  
  googleFonts: {
    families: {
      Prompt: [400, 600],
      Sarabun: [400, 600],
    },
    display: 'swap',
    preload: true,
  },

  mongoose: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/ratchaprachanukroh41',
    options: {},
    modelsDir: 'models',
  },

  runtimeConfig: {
    // MongoDB - reads from NUXT_MONGODB_URI or MONGODB_URI
    mongodbUri: process.env.NUXT_MONGODB_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/ratchaprachanukroh41',
    // Cloudinary credentials (server-side only)
    // Reads from NUXT_CLOUDINARY_* or CLOUDINARY_* env vars
    cloudinaryUrl: process.env.NUXT_CLOUDINARY_URL || process.env.CLOUDINARY_URL || '',
    cloudinaryCloudName: process.env.NUXT_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME || '',
    cloudinaryApiKey: process.env.NUXT_CLOUDINARY_API_KEY || process.env.CLOUDINARY_API_KEY || '',
    cloudinaryApiSecret: process.env.NUXT_CLOUDINARY_API_SECRET || process.env.CLOUDINARY_API_SECRET || '',
    public: {
      seedDb: process.env.NUXT_PUBLIC_SEED_DB || process.env.SEED_DB || 'false',
    },
  },
  
  vite: {
    server: {
      allowedHosts: true,
    },
  },

  // Nitro optimizations
  nitro: {
    compressPublicAssets: true,
    prerender: {
      crawlLinks: true,
      // Exclude dynamic content pages from prerendering
      ignore: ['/admin', '/admin/**', '/personnel', '/personnel/**', '/news/**', '/gallery/**', '/documents/**'],
    },
    // Route rules for caching behavior
    routeRules: {
      // API routes - no caching, always fresh
      '/api/**': { cache: false },
      // Dynamic content pages - no caching
      '/personnel/**': { cache: false, swr: false },
      '/news/**': { cache: false, swr: false },
      '/gallery/**': { cache: false, swr: false },
      '/documents/**': { cache: false, swr: false },
      // Static pages - can be cached
      '/about/**': { cache: { maxAge: 3600 } },
      '/contact/**': { cache: { maxAge: 3600 } },
    },
  },
})

