<template>
    <div class="min-h-screen bg-slate-50 dark:bg-slate-900 pb-12">
        <div v-if="pending" class="flex justify-center py-24">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>

        <div v-else-if="news" class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <!-- Breadcrumb -->
            <nav class="flex text-sm text-slate-500 dark:text-slate-400 mb-6">
                <NuxtLink to="/" class="hover:text-primary-600">หน้าหลัก</NuxtLink>
                <span class="mx-2">/</span>
                <NuxtLink to="/news" class="hover:text-primary-600">ข่าวสาร</NuxtLink>
                <span class="mx-2">/</span>
                <span class="text-slate-800 dark:text-white truncate max-w-[200px]">{{ news.title }}</span>
            </nav>

            <article
                class="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                <!-- Cover Image -->
                <div class="aspect-video relative">
                    <NuxtImg :src="news.coverImage || 'https://placehold.co/800x400'" :alt="news.title"
                        class="w-full h-full object-cover" />
                    <div class="absolute top-4 left-4">
                        <span class="px-3 py-1 bg-primary-600 text-white text-sm font-bold rounded-full shadow-lg">
                            {{ getCategoryLabel(news.category) }}
                        </span>
                    </div>
                </div>

                <!-- Content -->
                <div class="p-8">
                    <h1 class="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4 leading-tight">
                        {{ news.title }}
                    </h1>

                    <div
                        class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-slate-500 dark:text-slate-400 text-sm mb-8 pb-8 border-b border-slate-100 dark:border-slate-700">
                        <div class="flex items-center gap-4">
                            <div class="flex items-center gap-1">
                                <span>📅</span>
                                <span>{{ formatDate(news.publishedAt) }}</span>
                            </div>
                            <div class="flex items-center gap-1">
                                <span>👁️</span>
                                <span>{{ news.viewCount || 0 }} ครั้ง</span>
                            </div>
                        </div>
                        <PublicShareButtons :title="news.title" show-label />
                    </div>

                    <div class="prose prose-lg dark:prose-invert max-w-none text-slate-600 dark:text-slate-300"
                        v-html="news.content"></div>

                    <!-- Gallery -->
                    <div v-if="news.gallery && news.gallery.length > 0" class="mt-12 pt-12 border-t border-slate-100">
                        <h3 class="text-xl font-bold text-slate-800 dark:text-white mb-6">รูปภาพเพิ่มเติม</h3>
                        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            <div v-for="(img, index) in news.gallery" :key="index"
                                class="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer aspect-video">
                                <NuxtImg :src="img"
                                    class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                    @click="openLightbox(index)" loading="lazy" />
                            </div>
                        </div>
                    </div>
                </div>
            </article>

            <!-- Related News -->
            <div v-if="relatedNews.length > 0" class="mt-12">
                <h2 class="text-2xl font-bold text-slate-800 dark:text-white mb-6">ข่าวสารที่เกี่ยวข้อง</h2>
                <div class="grid md:grid-cols-2 gap-6">
                    <PublicNewsCard v-for="item in relatedNews" :key="item._id" :news="item" />
                </div>
            </div>

            <!-- Recommended News -->
            <div v-if="recommendedNews.length > 0" class="mt-12 pt-12 border-t border-slate-100">
                <h2 class="text-2xl font-bold text-slate-800 dark:text-white mb-6">ข่าวแนะนำ</h2>
                <div class="grid md:grid-cols-2 gap-6">
                    <PublicNewsCard v-for="item in recommendedNews" :key="item._id" :news="item" />
                </div>
            </div>
        </div>

        <div v-else class="text-center py-24">
            <h1 class="text-2xl font-bold text-slate-800 dark:text-white mb-2">ไม่พบข่าวสาร</h1>
            <NuxtLink to="/news" class="text-primary-600 hover:underline">กลับไปหน้าข่าวสาร</NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'default'
})

const route = useRoute()
const slug = route.params.slug as string

// Fetch News Detail
// API returns { data: News }
const { data: response, pending } = await useFetch(`/api/news/${slug}`)
const news = computed(() => response.value?.data)

// Fetch Related News (Same Category)
const { data: relatedData } = await useFetch('/api/news', {
    query: computed(() => ({
        limit: 2,
        category: news.value?.category,
        exclude: news.value?._id
    }))
})
const relatedNews = computed(() => relatedData.value?.data?.filter((n: any) => n._id !== news.value?._id) || [])

// Fetch Recommended News (Latest news excluding current and related)
const { data: recommendedData } = await useFetch('/api/news', {
    query: computed(() => ({
        limit: 2,
        exclude: [news.value?._id, ...relatedNews.value.map((n: any) => n._id)].join(',')
    }))
})
const recommendedNews = computed(() => recommendedData.value?.data?.filter((n: any) => n._id !== news.value?._id) || [])

// Helper Functions
const getCategoryLabel = (category: string) => {
    const categories: Record<string, string> = {
        general: 'ข่าวทั่วไป',
        academic: 'วิชาการ',
        activity: 'กิจกรรม',
        admission: 'รับสมัครนักเรียน'
    }
    return categories[category] || category
}

const formatDate = (dateString?: string) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}

// Lightbox (Placeholder - can be enhanced with a real lightbox library later)
const openLightbox = (index: number) => {
    window.open(news.value?.gallery[index], '_blank')
}

// SEO
useHead({
    title: computed(() => news.value?.title ? `${news.value.title} - โรงเรียนราชประชานุเคราะห์ 41` : 'ข่าวสาร'),
    meta: [
        { name: 'description', content: computed(() => news.value?.title || '') }
    ]
})
</script>
