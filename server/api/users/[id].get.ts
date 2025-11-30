import { User } from '~/server/models/user.schema'

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id

  try {
    const user = await User.findById(id).select('-password')
    if (!user) {
      throw createError({
        statusCode: 404,
        message: 'User not found'
      })
    }
    return user
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to fetch user'
    })
  }
})
