import { News } from '~/server/models/news.schema'
import { Gallery } from '~/server/models/gallery.schema'
import { Personnel } from '~/server/models/personnel.schema'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const q = query.q as string

  if (!q || q.length < 2) {
    return []
  }

  try {
    const regex = new RegExp(q, 'i') // Case-insensitive search
    console.log('Searching for:', q, 'Regex:', regex)

    const [news, gallery, personnel] = await Promise.all([
      // Search News
      News.find({
        $or: [
          { title: regex },
          { content: regex },
          { tags: regex }
        ],
        isPublished: true
      }).select('title slug coverImage publishedAt category').limit(5),

      // Search Gallery
      Gallery.find({
        $or: [
          { title: regex },
          { description: regex }
        ],
        isPublished: true
      }).select('title _id coverImage eventDate').limit(5),

      // Search Personnel
      Personnel.find({
        $or: [
          { name: regex },
          { position: regex },
          { department: regex }
        ]
      }).select('name _id photo position department').limit(5)
    ])

    console.log('Search results:', { news: news.length, gallery: gallery.length, personnel: personnel.length })

    // Format results
    const results = [
      ...news.map(item => ({
        type: 'news',
        id: item.slug,
        title: item.title,
        image: item.coverImage,
        subtitle: new Date(item.publishedAt || new Date()).toLocaleDateString(),
        url: `/news/${item.slug}`
      })),
      ...gallery.map(item => ({
        type: 'gallery',
        id: item._id,
        title: item.title,
        image: item.coverImage,
        subtitle: new Date(item.eventDate).toLocaleDateString(),
        url: `/gallery/${item._id}`
      })),
      ...personnel.map(item => ({
        type: 'personnel',
        id: item._id,
        title: item.name,
        image: item.photo,
        subtitle: item.position,
        url: `/personnel/${item._id}`
      }))
    ]

    return results
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: 'Search failed'
    })
  }
})
