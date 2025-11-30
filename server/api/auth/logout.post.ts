export default defineEventHandler(async (event) => {
  const session = await useSession(event, {
    password: process.env.NUXT_SESSION_PASSWORD || 'default-password-must-be-32-chars-long',
  })

  await session.clear()

  return {
    success: true,
  }
})
