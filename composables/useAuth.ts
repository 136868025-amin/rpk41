interface AuthResponse {
  loggedIn: boolean
  user?: {
    username: string
    name: string
    role: string
  }
}

export const useAuth = () => {
  const user = useState<any>('auth_user', () => null)
  const loading = useState<boolean>('auth_loading', () => true)
  const token = useCookie('auth_token') // Read token directly

  const fetchUser = async () => {
    console.log('[useAuth] fetchUser called')
    loading.value = true
    try {
      // Manually attach token to header to guarantee it reaches server
      const headers: any = {}
      if (token.value) {
        headers['Authorization'] = `Bearer ${token.value}`
      }

      console.log('[useAuth] Token available:', !!token.value)

      const data = await $fetch<AuthResponse>('/api/auth/me', {
        headers
      })
      
      console.log('[useAuth] Response:', data)
      
      if (data?.loggedIn) {
        user.value = data.user
      } else {
        user.value = null
        // If server says not logged in, clear token
        token.value = null
      }
    } catch (e) {
      console.error('[useAuth] Error fetching user:', e)
      user.value = null
    } finally {
      loading.value = false
    }
  }

  const login = async (credentials: any) => {
    const { data, error } = await useFetch('/api/auth/login', {
      method: 'POST',
      body: credentials
    })

    if (error.value) throw error.value

    if (data.value?.success) {
      user.value = data.value.user
      // Token is set by server cookie, useCookie will pick it up automatically
    }
    return data.value
  }

  const logout = async () => {
    await useFetch('/api/auth/logout', { method: 'POST' })
    user.value = null
    token.value = null // Clear cookie client-side too
    navigateTo('/admin/login')
  }

  return {
    user,
    loading,
    fetchUser,
    login,
    logout
  }
}
