import { verifyToken } from '~/server/utils/jwt'

export default defineEventHandler(async (event) => {
  // Only protect /api routes
  if (!event.path.startsWith('/api')) {
    return
  }

  // Allow public access to login endpoint
  if (event.path === '/api/auth/login') {
    return
  }

  console.log('Auth Middleware:', event.method, event.path)

  let token = getCookie(event, 'auth_token')

  // Fallback: Check Authorization header
  if (!token) {
    const authHeader = getRequestHeader(event, 'authorization')
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7)
    }
  }

  if (!token) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized: No token provided',
    })
  }

  const decoded: any = verifyToken(token)

  if (!decoded || decoded.role !== 'admin') {
    console.log('Auth Failed:', decoded)
    throw createError({
      statusCode: 401,
      message: 'Unauthorized: Admin access required',
    })
  }
})
