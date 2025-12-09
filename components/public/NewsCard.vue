<template>
    <NuxtLink :to="`/news/${news.slug}`"
        class="group bg-white dark:bg-slate-800 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-transparent hover:border-primary-200 dark:hover:border-primary-800">
        <!-- Image -->
        <div class="aspect-video overflow-hidden bg-slate-200 dark:bg-slate-700 relative">
            <NuxtImg :src="news.coverImage || 'https://via.placeholder.com/400x225'" :alt="news.title"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy" />
            <div
                class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            </div>
        </div>

        <!-- Content -->
        <div class="p-6">
            <!-- Category Badge -->
            <span
                class="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-xs font-semibold rounded-full mb-3">
                {{ getCategoryLabel(news.category) }}
            </span>

            <!-- Title -->
            <h3
                class="text-lg font-bold text-slate-800 dark:text-white mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                {{ news.title }}
            </h3>

            <!-- Date and Read More -->
            <div class="flex items-center justify-between">
                <p class="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2">
                    <span>📅</span>
                    <span>{{ formatDate(news.publishedAt) }}</span>
                </p>
                <span
                    class="text-primary-600 dark:text-primary-400 text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                    อ่านเพิ่ม →
                </span>
            </div>
        </div>
    </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
    news: any
}>()

const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
        general: 'ทั่วไป',
        academic: 'วิชาการ',
        activity: 'กิจกรรม'
    }
    return labels[category] || category
}

const formatDate = (date: string) => {
    if (!date) return '-'
    return new Date(date).toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}
</script>
