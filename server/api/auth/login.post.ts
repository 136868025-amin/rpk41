import { User } from '~/server/models/user.schema'
import bcrypt from 'bcryptjs'
import { signToken } from '~/server/utils/jwt'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  // 1. Check if any user exists, if not create default admin
  const userCount = await User.countDocuments()
  if (userCount === 0) {
    const defaultAdmin = new User({
      username: 'admin',
      password: process.env.ADMIN_PASSWORD || 'admin1234',
      name: 'System Administrator',
      role: 'admin'
    })
    await defaultAdmin.save()
    console.log('Default admin created: admin / admin1234')
  }

  // 2. Find user
  const user = await User.findOne({ username: body.username }).select('+password')
  console.log('Login attempt:', body.username, 'User found:', !!user)

  if (!user) {
    console.log('User not found')
    throw createError({
      statusCode: 401,
      message: 'Invalid username or password',
    })
  }

  // 3. Verify password
  const isValid = await bcrypt.compare(body.password, user.password!)
  console.log('Password valid:', isValid)
  
  if (!isValid) {
    console.log('Password mismatch')
    throw createError({
      statusCode: 401,
      message: 'Invalid username or password',
    })
  }

  // 4. Create session (JWT)
  const token = signToken({
    id: user._id,
    username: user.username,
    name: user.name,
    role: user.role,
  })

  setCookie(event, 'auth_token', token, {
    httpOnly: false, // Allow client-side access to fix persistence issues
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })

  console.log('Login Successful:', user.username)

  return {
    success: true,
    user: {
      username: user.username,
      name: user.name,
      role: user.role
    }
  }
})
