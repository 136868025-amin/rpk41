<template>
    <NuxtLink :to="`/news/${news.slug}`"
        class="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
        <!-- Image -->
        <div class="aspect-video overflow-hidden bg-slate-200">
            <img :src="news.coverImage || 'https://via.placeholder.com/400x225'" :alt="news.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>

        <!-- Content -->
        <div class="p-6">
            <!-- Category Badge -->
            <span
                class="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-xs font-semibold rounded-full mb-3">
                {{ getCategoryLabel(news.category) }}
            </span>

            <!-- Title -->
            <h3
                class="text-lg font-bold text-slate-800 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                {{ news.title }}
            </h3>

            <!-- Date -->
            <p class="text-sm text-slate-500 flex items-center gap-2">
                <span>📅</span>
                <span>{{ formatDate(news.publishedAt) }}</span>
            </p>
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
