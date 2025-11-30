import { User } from '~/server/models/user.schema'
import bcrypt from 'bcryptjs'

export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params?.id
    const body = await readBody(event)
    
    const updateData: any = {
      name: body.name,
      role: body.role,
      username: body.username
    }

    // Only update password if provided
    if (body.password) {
      const salt = await bcrypt.genSalt(10)
      updateData.password = await bcrypt.hash(body.password, salt)
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true }).select('-password')

    if (!updatedUser) {
      throw createError({
        statusCode: 404,
        message: 'User not found',
      })
    }

    return {
      success: true,
      data: updatedUser,
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to update user',
    })
  }
})
