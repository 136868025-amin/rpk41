export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const config = useRuntimeConfig()

  const adminPassword = process.env.ADMIN_PASSWORD || 'admin1234'

  if (body.password !== adminPassword) {
    throw createError({
      statusCode: 401,
      message: 'Invalid password',
    })
  }

  // Create session
  const session = await useSession(event, {
    password: process.env.NUXT_SESSION_PASSWORD || 'default-password-must-be-32-chars-long',
  })

  await session.update({
    role: 'admin',
    loggedInAt: new Date().toISOString(),
  })

  return {
    success: true,
  }
})
