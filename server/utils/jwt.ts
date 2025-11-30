import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.NUXT_SESSION_PASSWORD || 'default-secret-key-change-me-in-prod'

export const signToken = (payload: any) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return null
  }
}
