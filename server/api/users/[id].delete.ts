import { User } from '~/server/models/user.schema'

export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params?.id
    
    // Prevent deleting the last admin
    const adminCount = await User.countDocuments({ role: 'admin' })
    const userToDelete = await User.findById(id)

    if (userToDelete?.role === 'admin' && adminCount <= 1) {
      throw createError({
        statusCode: 400,
        message: 'Cannot delete the last administrator',
      })
    }

    const deleted = await User.findByIdAndDelete(id)

    if (!deleted) {
      throw createError({
        statusCode: 404,
        message: 'User not found',
      })
    }

    return {
      success: true,
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to delete user',
    })
  }
})
