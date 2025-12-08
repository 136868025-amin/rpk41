<template>
    <div class="min-h-screen bg-slate-50 pb-12">
        <!-- Header -->
        <div class="bg-white border-b border-slate-200">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 class="text-3xl md:text-4xl font-bold text-slate-800 mb-4">แกลเลอรี่รูปภาพ</h1>
                <p class="text-slate-600 text-lg">ประมวลภาพกิจกรรมต่างๆ ของโรงเรียน</p>
            </div>
        </div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <!-- Loading Skeleton -->
            <div v-if="pending" class="space-y-12">
                <!-- Highlight Skeleton -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="aspect-video md:h-[400px] bg-slate-200 rounded-2xl animate-pulse"></div>
                    <div class="grid grid-rows-2 gap-6">
                        <div class="h-[190px] bg-slate-200 rounded-2xl animate-pulse"></div>
                        <div class="h-[190px] bg-slate-200 rounded-2xl animate-pulse"></div>
                    </div>
                </div>
                <!-- Grid Skeleton -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div v-for="i in 6" :key="i" class="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
                        <div class="aspect-[4/3] bg-slate-200"></div>
                        <div class="p-6">
                            <div class="h-6 bg-slate-200 rounded mb-3"></div>
                            <div class="h-4 bg-slate-200 rounded w-3/4 mb-4"></div>
                            <div class="h-4 bg-slate-200 rounded w-1/2"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-else>
                <!-- Hero Highlight Section -->
                <div v-if="highlightAlbums.length > 0" class="mb-16">
                    <h2 class="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <span>✨</span> กิจกรรมเด่น
                    </h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <!-- Main Highlight (First Item) -->
                        <NuxtLink :to="`/gallery/${highlightAlbums[0]._id}`"
                            class="relative aspect-video md:aspect-auto md:h-[400px] rounded-2xl overflow-hidden group shadow-lg">
                            <NuxtImg :src="highlightAlbums[0].coverImage || 'https://placehold.co/800x600'"
                                :alt="highlightAlbums[0].title"
                                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                loading="lazy" />
                            <div
                                class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                                <span
                                    class="px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-full w-fit mb-3">
                                    Highlight
                                </span>
                                <h3 class="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
                                    {{ highlightAlbums[0].title }}
                                </h3>
                                <p class="text-slate-200 line-clamp-2">{{ highlightAlbums[0].description }}</p>
                            </div>
                        </NuxtLink>

                        <!-- Secondary Highlights -->
                        <div class="grid grid-rows-2 gap-6" v-if="highlightAlbums.length > 1">
                            <NuxtLink v-for="album in highlightAlbums.slice(1, 3)" :key="album._id"
                                :to="`/gallery/${album._id}`"
                                class="relative rounded-2xl overflow-hidden group shadow-md h-[190px]">
                                <NuxtImg :src="album.coverImage || 'https://placehold.co/600x400'" :alt="album.title"
                                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    loading="lazy" />
                                <div
                                    class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                                    <h3 class="text-lg font-bold text-white mb-1 line-clamp-1">
                                        {{ album.title }}
                                    </h3>
                                    <div class="flex items-center text-slate-300 text-xs">
                                        <span>📅 {{ formatDate(album.eventDate) }}</span>
                                    </div>
                                </div>
                            </NuxtLink>
                        </div>
                    </div>
                </div>

                <!-- Filters -->
                <div class="flex flex-wrap gap-2 mb-8 justify-center md:justify-start">
                    <button v-for="cat in categories" :key="cat.value" @click="selectedCategory = cat.value"
                        class="px-5 py-2 rounded-full text-sm font-medium transition-all duration-200"
                        :class="selectedCategory === cat.value
                            ? 'bg-primary-600 text-white shadow-md transform scale-105'
                            : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:border-slate-300'">
                        {{ cat.label }}
                    </button>
                </div>

                <!-- Gallery Grid -->
                <div v-if="filteredAlbums.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <NuxtLink v-for="album in filteredAlbums" :key="album._id" :to="`/gallery/${album._id}`"
                        class="bg-white rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group border border-slate-100">
                        <!-- Cover Image -->
                        <div class="aspect-[4/3] relative overflow-hidden">
                            <NuxtImg :src="album.coverImage || 'https://placehold.co/600x400'" :alt="album.title"
                                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                loading="lazy" />

                            <!-- Category Badge -->
                            <div class="absolute top-4 right-4">
                                <span
                                    class="px-3 py-1 bg-white/90 backdrop-blur-sm text-slate-800 text-xs font-bold rounded-full shadow-sm">
                                    {{ getCategoryLabel(album.category) }}
                                </span>
                            </div>

                            <!-- Image Count Overlay -->
                            <div
                                class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <div
                                    class="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white font-medium border border-white/30">
                                    ดู {{ album.images?.length || 0 }} รูปภาพ
                                </div>
                            </div>
                        </div>

                        <!-- Content -->
                        <div class="p-6">
                            <h3
                                class="text-xl font-bold text-slate-800 mb-2 group-hover:text-primary-600 transition-colors line-clamp-1">
                                {{ album.title }}
                            </h3>
                            <p class="text-slate-500 text-sm mb-4 line-clamp-2 h-10">
                                {{ album.description }}
                            </p>
                            <div class="flex items-center justify-between pt-4 border-t border-slate-100">
                                <div class="flex items-center text-slate-400 text-sm">
                                    <span>📅 {{ formatDate(album.eventDate) }}</span>
                                </div>
                                <span
                                    class="text-primary-600 text-sm font-medium group-hover:translate-x-1 transition-transform">
                                    ดูอัลบั้ม →
                                </span>
                            </div>
                        </div>
                    </NuxtLink>
                </div>

                <!-- Empty State -->
                <div v-else class="text-center py-16 bg-white rounded-xl border border-slate-200 shadow-sm">
                    <div class="text-6xl mb-4">🖼️</div>
                    <h3 class="text-xl font-bold text-slate-800 mb-2">ไม่พบอัลบั้มรูปภาพ</h3>
                    <p class="text-slate-500">ลองเปลี่ยนหมวดหมู่ในการค้นหา</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'default'
})

// Types
interface Gallery {
    _id: string
    title: string
    description: string
    coverImage: string
    images: string[]
    eventDate: string
    category: string
    isHighlight: boolean
}

// Fetch Albums
const { data: response, pending } = await useFetch<{ data: Gallery[] }>('/api/gallery')
const allAlbums = computed(() => response.value?.data || [])

// State
const selectedCategory = ref('all')

// Categories
const categories = [
    { label: 'ทั้งหมด', value: 'all' },
    { label: 'กิจกรรม', value: 'activity' },
    { label: 'วิชาการ', value: 'academic' },
    { label: 'กีฬา', value: 'sport' },
    { label: 'ทั่วไป', value: 'general' }
]

// Computed
const highlightAlbums = computed(() => {
    return allAlbums.value.filter(album => album.isHighlight).slice(0, 3)
})

const filteredAlbums = computed(() => {
    if (selectedCategory.value === 'all') {
        return allAlbums.value
    }
    return allAlbums.value.filter(album => album.category === selectedCategory.value)
})

// Helpers
const formatDate = (dateString?: string) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}

const getCategoryLabel = (value: string) => {
    const found = categories.find(c => c.value === value)
    return found ? found.label : value
}

useHead({
    title: 'แกลเลอรี่รูปภาพ - โรงเรียนราชประชานุเคราะห์ 41',
    meta: [
        { name: 'description', content: 'ประมวลภาพกิจกรรมต่างๆ ของโรงเรียนราชประชานุเคราะห์ 41' }
    ]
})
</script>
