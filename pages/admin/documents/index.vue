<template>
    <NuxtLayout name="admin">
        <div class="p-8">
            <div class="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <h1 class="text-2xl font-bold text-slate-800">Documents Management</h1>
                <div class="flex gap-2">
                    <button @click="handleExportCSV"
                        class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
                        <span>📥</span> Export CSV
                    </button>
                    <NuxtLink to="/admin/documents/create"
                        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
                        <span>➕</span> Upload Document
                    </NuxtLink>
                </div>
            </div>

            <!-- Search and Filter Bar -->
            <div class="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6 flex flex-col md:flex-row gap-4">
                <div class="flex-1 relative">
                    <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
                    <input v-model="searchQuery" type="text" placeholder="Search documents..."
                        class="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>
                <div class="w-full md:w-48">
                    <select v-model="selectedCategory"
                        class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white">
                        <option value="">All Categories</option>
                        <option value="general">General</option>
                        <option value="academic">Academic</option>
                        <option value="student-affairs">Student Affairs</option>
                        <option value="personnel">Personnel</option>
                        <option value="finance">Finance</option>
                        <option value="other">Other</option>
                    </select>
                </div>
            </div>

            <AppDataTable :columns="columns" :data="filteredDocuments" :loading="loading">
                <!-- Custom Cell Renderers -->
                <template #cell-fileType="{ item }">
                    <span class="text-2xl">{{ getFileIcon(item.fileUrl || item.filePath) }}</span>
                </template>

                <template #cell-category="{ item }">
                    <span class="px-2 py-1 rounded-full text-xs font-semibold capitalize bg-slate-100 text-slate-700">
                        {{ item.category }}
                    </span>
                </template>

                <template #cell-filePath="{ item }">
                    <a :href="item.fileUrl || item.filePath" target="_blank"
                        class="text-blue-600 hover:underline text-sm truncate max-w-xs block">
                        Download
                    </a>
                </template>

                <template #rowActions="{ item }">
                    <div class="flex justify-end gap-2">
                        <button @click="handleEdit(item)" class="text-blue-600 hover:text-blue-800">
                            ✏️
                        </button>
                        <button @click="handleDelete(item)" class="text-red-600 hover:text-red-800">
                            🗑️
                        </button>
                    </div>
                </template>
            </AppDataTable>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
import AppDataTable from '~/components/AppDataTable.vue'

definePageMeta({
    middleware: 'auth'
})

const columns = [
    { key: 'fileType', label: 'Type' },
    { key: 'title', label: 'Title' },
    { key: 'category', label: 'Category' },
    { key: 'filePath', label: 'File' },
]

const documentList = ref<any[]>([])
const loading = ref(true)
const searchQuery = ref('')
const selectedCategory = ref('')
const router = useRouter()
const { showAlert } = useAlert()
const { exportToCSV } = useExport()

const fetchDocuments = async () => {
    loading.value = true
    try {
        const res: any = await $fetch('/api/documents')
        documentList.value = res.data || []
    } catch (e) {
        console.error('Failed to fetch documents', e)
        showAlert('Failed to load documents', 'error')
    } finally {
        loading.value = false
    }
}

const filteredDocuments = computed(() => {
    return documentList.value.filter(doc => {
        const matchesSearch = doc.title.toLowerCase().includes(searchQuery.value.toLowerCase())
        const matchesCategory = selectedCategory.value ? doc.category === selectedCategory.value : true
        return matchesSearch && matchesCategory
    })
})

const handleExportCSV = () => {
    const dataToExport = filteredDocuments.value.map(doc => ({
        Title: doc.title,
        Category: doc.category,
        'Upload Date': doc.createdAt ? new Date(doc.createdAt).toLocaleDateString() : '-',
        'File Path': doc.fileUrl || doc.filePath
    }))
    exportToCSV(dataToExport, 'documents_export')
    showAlert('Documents exported successfully!', 'success')
}

const handleEdit = (item: any) => {
    router.push(`/admin/documents/${item._id}`)
}

const handleDelete = async (item: any) => {
    if (!confirm(`Are you sure you want to delete "${item.title}"?`)) return

    try {
        await $fetch(`/api/documents/${item._id}`, { method: 'DELETE' })
        showAlert('Document deleted successfully', 'success')
        await fetchDocuments() // Refresh list
    } catch (e) {
        showAlert('Failed to delete document', 'error')
    }
}

const getFileIcon = (url: string) => {
    if (!url) return '📄'
    const ext = url.split('.').pop()?.toLowerCase()
    if (ext === 'pdf') return '📕'
    if (['doc', 'docx'].includes(ext || '')) return '📘'
    if (['xls', 'xlsx'].includes(ext || '')) return '📗'
    if (['ppt', 'pptx'].includes(ext || '')) return '📙'
    return '📄'
}

onMounted(fetchDocuments)
</script>
