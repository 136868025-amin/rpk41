import { User } from '~/server/models/user.schema'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    // Check if username exists
    const existingUser = await User.findOne({ username: body.username })
    if (existingUser) {
      throw createError({
        statusCode: 400,
        message: 'Username already exists',
      })
    }

    const newUser = await User.create(body)

    // Return user without password
    const { password, ...userWithoutPassword } = newUser.toObject()

    return {
      success: true,
      data: userWithoutPassword,
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to create user',
    })
  }
})
