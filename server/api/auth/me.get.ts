export default defineEventHandler(async (event) => {
  let token = getCookie(event, 'auth_token')
  
  // Fallback: Check Authorization header
  if (!token) {
    const authHeader = getRequestHeader(event, 'authorization')
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7)
    }
  }

  console.log('[ME API] Token received:', token ? 'YES' : 'NO')

  if (!token) {
    console.log('[ME API] Returning loggedIn: false (no token)')
    return { loggedIn: false }
  }

  const decoded: any = verifyToken(token)
  
  console.log('[ME API] Token decoded:', decoded ? `username=${decoded.username}, role=${decoded.role}` : 'INVALID')

  if (decoded && (decoded.role === 'admin' || decoded.role === 'editor')) {
    console.log('[ME API] Returning loggedIn: true')
    return {
      loggedIn: true,
      user: {
        username: decoded.username,
        name: decoded.name,
        role: decoded.role
      }
    }
  }

  console.log('[ME API] Returning loggedIn: false (invalid token or role)')
  return {
    loggedIn: false,
  }
})
