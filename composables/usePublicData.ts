export const usePublicData = () => {
  const schoolConfig = ref<any>(null)
  const latestNews = ref<any[]>([])
  const upcomingEvents = ref<any[]>([])

  // Fetch school configuration
  const fetchSchoolConfig = async () => {
    try {
      const res: any = await $fetch('/api/config')
      schoolConfig.value = res.data
    } catch (e) {
      console.error('Failed to fetch school config', e)
    }
  }

  // Fetch latest news (published only)
  const fetchLatestNews = async (limit: number = 6) => {
    try {
      const res: any = await $fetch('/api/news')
      latestNews.value = (res.data || [])
        .filter((news: any) => news.isPublished)
        .sort((a: any, b: any) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
        .slice(0, limit)
    } catch (e) {
      console.error('Failed to fetch latest news', e)
    }
  }

  // Fetch upcoming events
  const fetchUpcomingEvents = async (limit: number = 5) => {
    try {
      const res: any = await $fetch('/api/calendar')
      const now = new Date()
      upcomingEvents.value = (res.data || [])
        .filter((event: any) => new Date(event.startDate) >= now)
        .sort((a: any, b: any) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
        .slice(0, limit)
    } catch (e) {
      console.error('Failed to fetch upcoming events', e)
    }
  }

  // Fetch gallery albums
  const galleryAlbums = ref<any[]>([])
  const fetchGalleryAlbums = async (limit: number = 8) => {
    try {
      const res: any = await $fetch('/api/gallery')
      galleryAlbums.value = (res.data || [])
        .filter((album: any) => album.isPublished)
        .sort((a: any, b: any) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime())
        .slice(0, limit)
    } catch (e) {
      console.error('Failed to fetch gallery albums', e)
    }
  }

  // Fetch banners
  const banners = ref<any[]>([])
  const fetchBanners = async () => {
    try {
      const res: any = await $fetch('/api/banners')
      banners.value = (res.data || [])
        .filter((banner: any) => banner.isActive)
        .sort((a: any, b: any) => a.orderIndex - b.orderIndex)
    } catch (e) {
      console.error('Failed to fetch banners', e)
    }
  }

  return {
    schoolConfig,
    latestNews,
    upcomingEvents,
    galleryAlbums,
    banners,
    fetchSchoolConfig,
    fetchLatestNews,
    fetchUpcomingEvents,
    fetchGalleryAlbums,
    fetchBanners
  }
}
