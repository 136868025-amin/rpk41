export default defineEventHandler(async (event) => {
  // Only protect /api routes
  if (!event.path.startsWith('/api')) {
    return
  }

  // Allow public access to GET requests (viewing content)
  // EXCEPT for /api/auth/me which needs session check (handled internally)
  if (event.method === 'GET') {
    return
  }

  // Allow public access to login endpoint
  if (event.path === '/api/auth/login') {
    return
  }

  // Check for valid session
  const session = await useSession(event, {
    password: process.env.NUXT_SESSION_PASSWORD || 'default-password-must-be-32-chars-long',
  })

  if (session.data.role !== 'admin') {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized: Admin access required',
    })
  }
})
