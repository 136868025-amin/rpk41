// Security headers middleware for production
export default defineEventHandler((event) => {
    // Only apply to non-API routes (HTML pages)
    if (!event.path.startsWith('/api')) {
        setHeader(event, 'X-Content-Type-Options', 'nosniff')
        setHeader(event, 'X-Frame-Options', 'SAMEORIGIN')
        setHeader(event, 'X-XSS-Protection', '1; mode=block')
        setHeader(event, 'Referrer-Policy', 'strict-origin-when-cross-origin')
        setHeader(event, 'Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
    }
    
    // CORS headers for API
    if (event.path.startsWith('/api')) {
        setHeader(event, 'Access-Control-Allow-Origin', '*')
        setHeader(event, 'Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        setHeader(event, 'Access-Control-Allow-Headers', 'Content-Type, Authorization')
    }
})
