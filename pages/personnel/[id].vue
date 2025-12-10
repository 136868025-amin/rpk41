<template>
    <div class="min-h-screen bg-slate-50 dark:bg-slate-900 pb-12">
        <div v-if="pending" class="flex justify-center py-24">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>

        <div v-else-if="person" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <!-- Breadcrumb -->
            <nav class="flex text-sm text-slate-500 dark:text-slate-400 mb-6">
                <NuxtLink to="/" class="hover:text-primary-600">หน้าหลัก</NuxtLink>
                <span class="mx-2">/</span>
                <NuxtLink to="/personnel" class="hover:text-primary-600">บุคลากร</NuxtLink>
                <span class="mx-2">/</span>
                <span class="text-slate-800 dark:text-white">{{ person.name }}</span>
            </nav>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Sidebar Profile -->
                <div class="lg:col-span-1">
                    <div
                        class="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden sticky top-24">
                        <div class="aspect-[3/4] relative">
                            <img :src="person.photo || 'https://placehold.co/600x800'" :alt="person.name"
                                class="w-full h-full object-cover" />
                        </div>
                        <div class="p-6">
                            <h1 class="text-2xl font-bold text-slate-800 dark:text-white mb-2">{{ person.name }}</h1>
                            <p class="text-primary-600 font-medium mb-6">{{ person.position }}</p>

                            <div class="space-y-4">
                                <div v-if="person.email"
                                    class="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                                    <span
                                        class="w-8 h-8 flex items-center justify-center bg-slate-100 dark:bg-slate-700 rounded-full">📧</span>
                                    <a :href="`mailto:${person.email}`"
                                        class="hover:text-primary-600 transition-colors">{{ person.email }}</a>
                                </div>
                                <div v-if="person.phone"
                                    class="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                                    <span
                                        class="w-8 h-8 flex items-center justify-center bg-slate-100 dark:bg-slate-700 rounded-full">📞</span>
                                    <a :href="`tel:${person.phone}`" class="hover:text-primary-600 transition-colors">{{
                                        person.phone }}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Main Content -->
                <div class="lg:col-span-2 space-y-8">
                    <!-- Biography / Content -->
                    <div v-if="person.content"
                        class="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-8">
                        <h2 class="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                            <span>📝</span> ประวัติและผลงาน
                        </h2>
                        <div class="prose prose-slate dark:prose-invert max-w-none" v-html="person.content"></div>
                    </div>

                    <!-- Gallery -->
                    <div v-if="person.gallery && person.gallery.length > 0"
                        class="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-8">
                        <h2 class="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                            <span>📸</span> ภาพกิจกรรม
                        </h2>
                        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div v-for="(img, index) in person.gallery" :key="index"
                                class="aspect-square rounded-lg overflow-hidden cursor-pointer group relative"
                                @click="openLightbox(index)">
                                <img :src="img"
                                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div
                                    class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                    <span
                                        class="text-white opacity-0 group-hover:opacity-100 transition-opacity text-2xl">🔍</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-else class="text-center py-24">
            <h1 class="text-2xl font-bold text-slate-800 dark:text-white mb-2">ไม่พบข้อมูลบุคลากร</h1>
            <NuxtLink to="/personnel" class="text-primary-600 hover:underline">กลับไปหน้าบุคลากร</NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'default'
})

const route = useRoute()
const id = route.params.id as string

interface Personnel {
    _id: string
    name: string
    position: string
    photo: string
    department: string
    email?: string
    phone?: string
    content?: string
    gallery?: string[]
}

// Fetch Personnel Detail (disable cache to always get fresh data)
const { data: response, pending } = await useFetch<{ data: Personnel }>(`/api/personnel/${id}`, {
    getCachedData: () => undefined
})
const person = computed(() => response.value?.data)

// Lightbox (Placeholder)
const openLightbox = (index: number) => {
    if (person.value?.gallery?.[index]) {
        window.open(person.value.gallery[index], '_blank')
    }
}

useHead({
    title: computed(() => person.value?.name ? `${person.value.name} - บุคลากร` : 'บุคลากร'),
    meta: [
        { name: 'description', content: computed(() => `ข้อมูลบุคลากร ${person.value?.name || ''}`) }
    ]
})
</script>
