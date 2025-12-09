<template>
    <div class="min-h-screen bg-slate-50 dark:bg-slate-900 pb-12">
        <!-- Header -->
        <div class="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 class="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">📄 เอกสารดาวน์โหลด</h1>
                <p class="text-slate-600 dark:text-slate-300 text-lg">
                    รวมเอกสาร แบบฟอร์ม และข้อมูลสำคัญสำหรับนักเรียน ผู้ปกครอง และบุคลากร
                </p>
            </div>
        </div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <!-- Filters -->
            <div class="flex flex-col md:flex-row gap-4 mb-8">
                <!-- Search -->
                <div class="relative flex-1">
                    <input v-model="searchQuery" type="text" placeholder="ค้นหาเอกสาร..."
                        class="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500" />
                    <span class="absolute left-3 top-3 text-slate-400">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </span>
                </div>

                <!-- Category Filter -->
                <select v-model="selectedCategory"
                    class="w-full md:w-48 px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                    <option value="">ทุกหมวดหมู่</option>
                    <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
                </select>
            </div>

            <!-- Loading Skeleton -->
            <div v-if="pending" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div v-for="i in 6" :key="i" class="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-6 animate-pulse">
                    <div class="flex gap-4 mb-4">
                        <div class="w-14 h-14 bg-slate-200 dark:bg-slate-700 rounded-xl"></div>
                        <div class="flex-1">
                            <div class="h-5 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-2"></div>
                            <div class="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
                        </div>
                    </div>
                    <div class="h-10 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
                </div>
            </div>

            <!-- Documents Grid -->
            <div v-else-if="filteredDocuments.length > 0" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div v-for="doc in filteredDocuments" :key="doc._id"
                    class="group bg-white dark:bg-slate-800 rounded-2xl shadow-md hover:shadow-xl p-6 transition-all duration-300 border border-slate-200 dark:border-slate-700">
                    <!-- File Icon & Info -->
                    <div class="flex items-start gap-4 mb-4">
                        <div class="w-14 h-14 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg group-hover:scale-110 transition-transform"
                            :class="getFileColor(doc.fileUrl)">
                            {{ getFileIcon(doc.fileUrl) }}
                        </div>
                        <div class="flex-1 min-w-0">
                            <h3
                                class="font-bold text-slate-800 dark:text-white line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                {{ doc.title }}
                            </h3>
                            <span
                                class="inline-block mt-1 text-xs px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                                {{ doc.category }}
                            </span>
                        </div>
                    </div>

                    <!-- Meta Info -->
                    <div class="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 mb-4">
                        <div class="flex items-center gap-2">
                            <span>📥</span>
                            <span>{{ doc.downloadCount || 0 }} ดาวน์โหลด</span>
                        </div>
                        <span v-if="doc.fileSize" class="text-xs">{{ doc.fileSize }}</span>
                    </div>

                    <!-- Download Button -->
                    <button @click="handleDownload(doc)"
                        class="flex items-center justify-center gap-2 w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-xl font-bold transition-all shadow-md hover:shadow-lg">
                        <span>⬇️</span>
                        <span>ดาวน์โหลด</span>
                    </button>
                </div>
            </div>

            <!-- Empty State -->
            <div v-else
                class="text-center py-16 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <div class="text-6xl mb-4">📭</div>
                <h3 class="text-xl font-bold text-slate-800 dark:text-white mb-2">ไม่พบเอกสาร</h3>
                <p class="text-slate-500 dark:text-slate-400">
                    {{ selectedCategory ? `ยังไม่มีเอกสารในหมวด "${selectedCategory}"` : 'ยังไม่มีเอกสารให้ดาวน์โหลด'
                    }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
useSeoMeta({
    title: 'เอกสารดาวน์โหลด | โรงเรียนราชประชานุเคราะห์ ๔๑',
    description: 'ดาวน์โหลดเอกสาร แบบฟอร์ม และข้อมูลสำคัญสำหรับนักเรียน ผู้ปกครอง และบุคลากร'
})

interface DocumentItem {
    _id: string
    title: string
    category: string
    fileUrl: string
    fileSize?: string
    downloadCount: number
    isPublished: boolean
}

const searchQuery = ref('')
const selectedCategory = ref('')

const { data: response, pending, refresh } = await useFetch<{ data: DocumentItem[] }>('/api/documents')

const documents = computed(() => {
    const docs = response.value?.data || []
    return docs.filter((d: DocumentItem) => d.isPublished)
})

const categories = computed(() => {
    const cats = new Set(documents.value.map((d: DocumentItem) => d.category))
    return Array.from(cats)
})

const filteredDocuments = computed(() => {
    let result = documents.value

    if (selectedCategory.value) {
        result = result.filter((d: DocumentItem) => d.category === selectedCategory.value)
    }

    if (searchQuery.value.trim()) {
        const query = searchQuery.value.toLowerCase()
        result = result.filter((d: DocumentItem) =>
            d.title.toLowerCase().includes(query) ||
            d.category.toLowerCase().includes(query)
        )
    }

    return result
})

const getFileIcon = (url: string | undefined) => {
    if (!url) return '�'
    if (url.includes('.pdf')) return '�'
    if (url.includes('.doc') || url.includes('.docx')) return '�'
    if (url.includes('.xls') || url.includes('.xlsx')) return '�'
    if (url.includes('.ppt') || url.includes('.pptx')) return '�'
    return '📄'
}

const getFileColor = (url: string | undefined) => {
    if (!url) return 'bg-slate-500'
    if (url.includes('.pdf')) return 'bg-red-500'
    if (url.includes('.doc') || url.includes('.docx')) return 'bg-blue-500'
    if (url.includes('.xls') || url.includes('.xlsx')) return 'bg-green-500'
    if (url.includes('.ppt') || url.includes('.pptx')) return 'bg-orange-500'
    return 'bg-slate-500'
}

const handleDownload = (doc: DocumentItem) => {
    if (!doc.fileUrl) return

    // Create a temporary anchor to trigger download
    const link = document.createElement('a')
    link.href = doc.fileUrl
    link.target = '_blank'

    // For data URLs, we need to use download attribute
    if (doc.fileUrl.startsWith('data:')) {
        // Extract filename from title or use default
        const ext = doc.fileUrl.includes('pdf') ? '.pdf' :
            doc.fileUrl.includes('word') ? '.docx' : '.file'
        link.download = `${doc.title}${ext}`
    }

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // Then increment download count (async, fire and forget)
    $fetch(`/api/documents/${doc._id}/download`, { method: 'POST' })
        .then(() => refresh())
        .catch(() => { }) // Silently fail
}
</script>
