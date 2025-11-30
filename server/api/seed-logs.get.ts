import { ActivityLog } from '~/server/models/activityLog.schema'

export default defineEventHandler(async (event) => {
  try {
    // Create sample logs if collection is empty
    const count = await ActivityLog.countDocuments()
    
    if (count === 0) {
      const sampleLogs = [
        {
          action: 'create',
          module: 'news',
          description: 'Created news: "Welcome to our new website"',
          user: 'Admin',
          createdAt: new Date(Date.now() - 3600000) // 1 hour ago
        },
        {
          action: 'update',
          module: 'settings',
          description: 'Updated school configuration',
          user: 'Admin',
          createdAt: new Date(Date.now() - 7200000) // 2 hours ago
        },
        {
          action: 'create',
          module: 'gallery',
          description: 'Created gallery: "Sports Day 2024"',
          user: 'Admin',
          createdAt: new Date(Date.now() - 10800000) // 3 hours ago
        },
        {
          action: 'login',
          module: 'auth',
          description: 'Admin logged in',
          user: 'Admin',
          createdAt: new Date(Date.now() - 14400000) // 4 hours ago
        }
      ]
      
      await ActivityLog.insertMany(sampleLogs)
    }
    
    return { success: true, message: 'Sample logs seeded' }
  } catch (error) {
    console.error('Failed to seed logs', error)
    return { success: false }
  }
})
