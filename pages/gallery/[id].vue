<template>
    <div class="min-h-screen bg-slate-50 pb-12">
        <div v-if="pending" class="flex justify-center py-24">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>

        <div v-else-if="album" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <!-- Breadcrumb -->
            <nav class="flex text-sm text-slate-500 mb-6">
                <NuxtLink to="/" class="hover:text-primary-600">หน้าหลัก</NuxtLink>
                <span class="mx-2">/</span>
                <NuxtLink to="/gallery" class="hover:text-primary-600">แกลเลอรี่</NuxtLink>
                <span class="mx-2">/</span>
                <span class="text-slate-800 truncate max-w-[200px]">{{ album.title }}</span>
            </nav>

            <!-- Header -->
            <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-8">
                <h1 class="text-3xl md:text-4xl font-bold text-slate-800 mb-4">{{ album.title }}</h1>
                <p class="text-slate-600 text-lg mb-6">{{ album.description }}</p>
                <div class="flex items-center gap-4 text-slate-500 text-sm">
                    <div class="flex items-center gap-1">
                        <span>📅</span>
                        <span>{{ formatDate(album.eventDate) }}</span>
                    </div>
                    <div class="flex items-center gap-1">
                        <span>📷</span>
                        <span>{{ album.images?.length || 0 }} รูปภาพ</span>
                    </div>
                </div>
            </div>

            <!-- Images Grid -->
            <div v-if="album.images && album.images.length > 0"
                class="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                <div v-for="(img, index) in album.images" :key="index"
                    class="break-inside-avoid rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group relative"
                    @click="openLightbox(index)">
                    <img :src="img"
                        class="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy" />
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
                </div>
            </div>

            <!-- Empty State -->
            <div v-else class="text-center py-16 bg-white rounded-xl border border-slate-200 shadow-sm">
                <div class="text-6xl mb-4">📷</div>
                <h3 class="text-xl font-bold text-slate-800 mb-2">ไม่มีรูปภาพในอัลบั้มนี้</h3>
            </div>
        </div>

        <div v-else class="text-center py-24">
            <h1 class="text-2xl font-bold text-slate-800 mb-2">ไม่พบอัลบั้ม</h1>
            <NuxtLink to="/gallery" class="text-primary-600 hover:underline">กลับไปหน้าแกลเลอรี่</NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'default'
})

const route = useRoute()
const id = route.params.id as string

// Fetch Album Detail
interface Gallery {
    _id: string
    title: string
    description: string
    coverImage: string
    images: string[]
    eventDate: string
}

const { data: response, pending } = await useFetch<{ data: Gallery }>(`/api/gallery/${id}`)
const album = computed(() => response.value?.data)

const formatDate = (dateString?: string) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}

// Lightbox (Placeholder)
const openLightbox = (index: number) => {
    if (album.value?.images?.[index]) {
        window.open(album.value.images[index], '_blank')
    }
}

useHead({
    title: computed(() => album.value?.title ? `${album.value.title} - แกลเลอรี่` : 'แกลเลอรี่'),
    meta: [
        { name: 'description', content: computed(() => album.value?.description || '') }
    ]
})
</script>
