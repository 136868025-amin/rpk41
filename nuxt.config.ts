// https://nuxt.com/docs/api/configuration/nuxt-config
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
  
  googleFonts: {
    families: {
      Prompt: [400, 600],   // Reduced from 5 to 2 weights (~150KB savings)
      Sarabun: [400, 600],  // Reduced from 5 to 2 weights (~150KB savings)
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
    // Private config (server-side only)
    mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/ratchaprachanukroh41',
    
    // Public config (client-side accessible)
    public: {
      seedDb: process.env.SEED_DB || 'false',
    },
  },
  vite: {
    server: {
      allowedHosts: true,
    },
  },
})

