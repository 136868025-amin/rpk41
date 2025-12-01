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

  modules: ['nuxt-mongoose', '@nuxtjs/google-fonts'],
  
  googleFonts: {
    families: {
      Prompt: [300, 400, 500, 600, 700],
      Sarabun: [300, 400, 500, 600, 700],
    },
    display: 'swap',
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

