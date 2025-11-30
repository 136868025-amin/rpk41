<template>
    <div class="min-h-screen bg-slate-50 pb-12">
        <!-- Header -->
        <div class="bg-white border-b border-slate-200">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 class="text-3xl font-bold text-slate-800 mb-2">ผลการค้นหา</h1>
                <p class="text-slate-600">คำค้นหา: <span class="font-bold text-primary-600">"{{ query }}"</span></p>
            </div>
        </div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <!-- Loading State -->
            <div v-if="pending" class="flex justify-center py-12">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>


            <!-- No Results -->
            <div v-else-if="!results || results.length === 0"
                class="text-center py-12 bg-white rounded-xl shadow-sm border border-slate-200">
                <div class="text-6xl mb-4">🔍</div>
                <h3 class="text-xl font-bold text-slate-800 mb-2">ไม่พบข้อมูล</h3>
                <p class="text-slate-500">ลองค้นหาด้วยคำอื่น หรือตรวจสอบตัวสะกด</p>
            </div>

            <!-- Results Grid -->
            <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <NuxtLink v-for="item in results" :key="item.id" :to="item.url"
                    class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-all group flex flex-col h-full">
                    <div class="aspect-video relative overflow-hidden bg-slate-100">
                        <img v-if="item.image" :src="item.image"
                            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div v-else class="w-full h-full flex items-center justify-center bg-slate-50 text-slate-300">
                            <!-- Icon based on type -->
                            <span v-if="item.type === 'personnel'" class="text-5xl">👤</span>
                            <span v-else-if="item.type === 'gallery'" class="text-5xl">📸</span>
                            <span v-else class="text-5xl">📰</span>
                        </div>
                        <div class="absolute top-2 right-2 px-2 py-1 rounded text-xs font-bold uppercase text-white shadow-sm"
                            :class="{
                                'bg-blue-500': item.type === 'news',
                                'bg-purple-500': item.type === 'gallery',
                                'bg-orange-500': item.type === 'personnel'
                            }">
                            {{ item.type }}
                        </div>
                    </div>
                    <div class="p-4 flex-1 flex flex-col">
                        <h3
                            class="font-bold text-lg text-slate-800 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                            {{ item.title }}
                        </h3>
                        <p class="text-sm text-slate-500 mt-auto">{{ item.subtitle }}</p>
                    </div>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface SearchResult {
    type: 'news' | 'gallery' | 'personnel'
    id: string
    title: string
    image?: string
    subtitle: string
    url: string
}

const route = useRoute()
const query = computed(() => route.query.q as string)

const { data: results, pending } = await useFetch<SearchResult[]>('/api/search', {
    query: { q: query },
    watch: [query],
    default: () => [] as SearchResult[]
})

useHead({
    title: `ผลการค้นหา "${query.value}" - โรงเรียนราชประชานุเคราะห์ 41`
})
</script>
