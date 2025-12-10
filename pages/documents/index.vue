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

                    <!-- Action Buttons -->
                    <div class="flex gap-2">
                        <!-- Preview Button (for PDF only) -->
                        <button v-if="isPDF(doc.fileUrl)" @click="openPreview(doc)"
                            class="flex-1 flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-white py-3 rounded-xl font-bold transition-all">
                            <span>👁️</span>
                            <span>ดูตัวอย่าง</span>
                        </button>

                        <!-- Download Button -->
                        <button @click="handleDownload(doc)"
                            class="flex-1 flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-xl font-bold transition-all shadow-md hover:shadow-lg">
                            <span>⬇️</span>
                            <span>ดาวน์โหลด</span>
                        </button>
                    </div>
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

        <!-- PDF Preview Modal -->
        <Teleport to="body">
            <Transition name="modal">
                <div v-if="previewDoc" class="fixed inset-0 z-50 flex items-center justify-center p-4"
                    @click.self="closePreview">
                    <!-- Backdrop -->
                    <div class="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

                    <!-- Modal Content -->
                    <div
                        class="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden">
                        <!-- Modal Header -->
                        <div
                            class="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
                            <div class="flex items-center gap-3">
                                <span class="text-2xl">📄</span>
                                <h3 class="font-bold text-lg text-slate-800 dark:text-white truncate max-w-md">
                                    {{ previewDoc.title }}
                                </h3>
                            </div>
                            <div class="flex items-center gap-2">
                                <!-- Download from modal -->
                                <button @click="handleDownload(previewDoc)"
                                    class="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors">
                                    <span>⬇️</span>
                                    <span class="hidden sm:inline">ดาวน์โหลด</span>
                                </button>
                                <!-- Close button -->
                                <button @click="closePreview"
                                    class="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-slate-500" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <!-- PDF Viewer -->
                        <div class="flex-1 bg-slate-100 dark:bg-slate-900 overflow-hidden">
                            <iframe v-if="previewDoc.fileUrl" :src="getPDFViewerUrl(previewDoc.fileUrl)"
                                class="w-full h-full border-0" title="PDF Preview">
                            </iframe>
                        </div>
                    </div>
                </div>
            </Transition>
        </Teleport>
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
const previewDoc = ref<DocumentItem | null>(null)

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

const isPDF = (url: string | undefined): boolean => {
    if (!url) return false
    // Check for Cloudinary PDF or direct PDF extension
    return url.includes('/raw/') || url.includes('.pdf') || url.includes('application/pdf')
}

const getFileIcon = (url: string | undefined) => {
    if (!url) return '📁'
    if (isPDF(url)) return '📕'
    if (url.includes('.doc') || url.includes('.docx') || url.includes('wordprocessing')) return '📘'
    if (url.includes('.xls') || url.includes('.xlsx') || url.includes('spreadsheet')) return '📗'
    if (url.includes('.ppt') || url.includes('.pptx')) return '📙'
    return '📄'
}

const getFileColor = (url: string | undefined) => {
    if (!url) return 'bg-slate-500'
    if (isPDF(url)) return 'bg-red-500'
    if (url.includes('.doc') || url.includes('.docx') || url.includes('wordprocessing')) return 'bg-blue-500'
    if (url.includes('.xls') || url.includes('.xlsx') || url.includes('spreadsheet')) return 'bg-green-500'
    if (url.includes('.ppt') || url.includes('.pptx')) return 'bg-orange-500'
    return 'bg-slate-500'
}

const getPDFViewerUrl = (url: string): string => {
    // For Cloudinary URLs, we can use Google Docs Viewer for better compatibility
    // Or just return the URL directly for browser's built-in PDF viewer
    if (url.startsWith('http')) {
        // Use Google Docs Viewer for external URLs
        return `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`
    }
    return url
}

const openPreview = (doc: DocumentItem) => {
    previewDoc.value = doc
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden'
}

const closePreview = () => {
    previewDoc.value = null
    document.body.style.overflow = ''
}

const handleDownload = async (doc: DocumentItem) => {
    if (!doc.fileUrl) return

    try {
        // For Cloudinary URLs, use proxy download API
        if (doc.fileUrl.startsWith('http') && doc.fileUrl.includes('cloudinary')) {
            // Use proxy download endpoint
            const downloadUrl = `/api/cloudinary/download?url=${encodeURIComponent(doc.fileUrl)}&filename=${encodeURIComponent(doc.title)}`
            window.open(downloadUrl, '_blank')
        } else if (doc.fileUrl.startsWith('http')) {
            // Other HTTP URLs, open directly
            window.open(doc.fileUrl, '_blank')
        } else if (doc.fileUrl.startsWith('data:')) {
            // For data URLs, create download link
            const link = document.createElement('a')
            link.href = doc.fileUrl
            link.target = '_blank'
            const ext = doc.fileUrl.includes('pdf') ? '.pdf' :
                doc.fileUrl.includes('word') ? '.docx' : '.file'
            link.download = `${doc.title}${ext}`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        }

        // Increment download count
        $fetch(`/api/documents/${doc._id}/download`, { method: 'POST' })
            .then(() => refresh())
            .catch(() => { })
    } catch (error) {
        console.error('Download error:', error)
    }
}

// Close modal on escape key
onMounted(() => {
    const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && previewDoc.value) {
            closePreview()
        }
    }
    document.addEventListener('keydown', handleEscape)
    onUnmounted(() => {
        document.removeEventListener('keydown', handleEscape)
    })
})
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
    transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

.modal-enter-from .relative,
.modal-leave-to .relative {
    transform: scale(0.95);
}
</style>
