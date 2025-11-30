import { User } from '~/server/models/user.schema'

export default defineEventHandler(async (event) => {
  try {
    // TODO: Add auth check here (middleware handles it but good to be safe)
    const users = await User.find().select('-password').sort({ createdAt: -1 })
    return { data: users }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to fetch users',
    })
  }
})
