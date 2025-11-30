export default defineEventHandler(async (event) => {
  const session = await useSession(event, {
    password: process.env.NUXT_SESSION_PASSWORD || 'default-password-must-be-32-chars-long',
  })

  if (session.data.role === 'admin') {
    return {
      loggedIn: true,
      role: 'admin',
      loggedInAt: session.data.loggedInAt,
    }
  }

  return {
    loggedIn: false,
  }
})
