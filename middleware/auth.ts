export default defineNuxtRouteMiddleware(async (to, from) => {
  console.log('[Middleware] Running for route:', to.path)
  const { user, fetchUser } = useAuth()

  console.log('[Middleware] Current user state:', user.value)

  // ALWAYS fetch user from server to verify auth status
  // Don't trust the cached state because cookies might have expired
  console.log('[Middleware] Fetching user from server...')
  await fetchUser()
  console.log('[Middleware] After fetchUser, user:', user.value)

  // If still no user, redirect to login
  if (!user.value) {
    console.log('[Middleware] Still no user, redirecting to login')
    return navigateTo('/admin/login')
  }
  
  console.log('[Middleware] User authenticated, allowing access')
})
