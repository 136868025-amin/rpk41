import { News } from '~/server/models/news.schema'
import { Personnel } from '~/server/models/personnel.schema'
import { Banner } from '~/server/models/banner.schema'

export default defineEventHandler(async (event) => {
  try {
    const totalNews = await News.countDocuments()
    const totalPersonnel = await Personnel.countDocuments()
    const activeBanners = await Banner.countDocuments({ isActive: true })

    return {
      totalNews,
      totalPersonnel,
      activeBanners
    }
  } catch (e) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch dashboard stats'
    })
  }
})
