import mongoose, { type Connection } from 'mongoose'

/**
 * MongoDB Connection Plugin for Nuxt Server
 * Connects to MongoDB when the server starts
 */
export default defineNitroPlugin(async () => {
  const config = useRuntimeConfig()
  const mongoUri = config.mongodbUri || 'mongodb://localhost:27017/ratchaprachanukroh41'

  try {
    await mongoose.connect(mongoUri)
    console.log('✅ MongoDB Connected:', mongoose.connection.name)
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error)
    throw error
  }

  // Handle connection events
  const connection: Connection = mongoose.connection
  
  connection.on('disconnected', () => {
    console.log('⚠️  MongoDB Disconnected')
  })

  connection.on('error', (err: Error) => {
    console.error('❌ MongoDB Error:', err)
  })
})
