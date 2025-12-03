import { Visitor } from '~/server/models/visitor.schema'
import mongoose from 'mongoose'

export default defineEventHandler(async (event) => {
  // Only track GET requests to public pages
  if (event.method !== 'GET') return
  if (event.path.startsWith('/api') || event.path.startsWith('/_nuxt') || event.path.startsWith('/admin')) return

  try {
    const ip = getRequestHeader(event, 'x-forwarded-for') || event.node.req.socket.remoteAddress || 'unknown'
    const userAgent = getRequestHeader(event, 'user-agent') || 'unknown'

    // Check if DB is connected before trying to write
    if (mongoose.connection.readyState !== 1) return

    // Fire and forget - don't await to avoid slowing down response
    Visitor.create({
      ip,
      userAgent,
      path: event.path,
    }).catch(console.error)
  } catch (e) {
    // Ignore errors
  }
})
