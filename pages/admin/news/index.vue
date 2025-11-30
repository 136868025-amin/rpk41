<template>
    <NuxtLayout name="admin">
        <div class="p-8">
            <div class="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <h1 class="text-2xl font-bold text-slate-800">News & Activities</h1>
                <div class="flex gap-2">
                    <button @click="handleExportCSV"
                        class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
                        <span>📥</span> Export CSV
                    </button>
                    <NuxtLink to="/admin/news/create"
                        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
                        <span>➕</span> Create New
                    </NuxtLink>
                </div>
            </div>

            <!-- Search and Filter Bar -->
            <div class="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6 flex flex-col md:flex-row gap-4">
                <div class="flex-1 relative">
                    <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
                    <input v-model="searchQuery" type="text" placeholder="Search news..."
                        class="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>
                <div class="flex gap-3">
                    <select v-model="selectedCategory"
                        class="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white">
                        <option value="">All Categories</option>
                        <option value="general">General</option>
                        <option value="academic">Academic</option>
                        <option value="activity">Activity</option>
                    </select>
                    <select v-model="selectedStatus"
                        class="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white">
                        <option value="">All Status</option>
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                    </select>
                </div>
            </div>

            <!-- Bulk Actions Bar -->
            <div v-if="selectedItems.length > 0"
                class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4 flex items-center justify-between">
                <span class="text-sm font-medium text-blue-900">
                    {{ selectedItems.length }} item(s) selected
                </span>
                <div class="flex gap-2">
                    <button @click="bulkPublish"
                        class="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors">
                        📢 Publish
                    </button>
                    <button @click="bulkUnpublish"
                        class="px-3 py-1.5 bg-yellow-600 hover:bg-yellow-700 text-white text-sm rounded-lg transition-colors">
                        📝 Unpublish
                    </button>
                    <button @click="bulkDelete"
                        class="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition-colors">
                        🗑️ Delete
                    </button>
                    <button @click="selectedItems = []"
                        class="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-sm rounded-lg transition-colors">
                        Clear
                    </button>
                </div>
            </div>

            <!-- Table -->
            <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table class="w-full">
                    <thead class="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th class="px-4 py-3 text-left w-12">
                                <input type="checkbox" :checked="isAllSelected" @change="toggleSelectAll"
                                    class="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500" />
                            </th>
                            <th class="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase">Image</th>
                            <th class="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase">Title</th>
                            <th class="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase">Category</th>
                            <th class="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase">Status</th>
                            <th class="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase">Date</th>
                            <th class="px-4 py-3 text-right text-xs font-bold text-slate-600 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        <tr v-if="loading" v-for="i in 5" :key="i" class="animate-pulse">
                            <td colspan="7" class="px-4 py-4">
                                <div class="h-4 bg-slate-100 rounded"></div>
                            </td>
                        </tr>
                        <tr v-else-if="paginatedNews.length === 0">
                            <td colspan="7" class="px-4 py-12 text-center text-slate-500">
                                No news found
                            </td>
                        </tr>
                        <tr v-else v-for="item in paginatedNews" :key="item._id"
                            class="hover:bg-slate-50 transition-colors"
                            :class="{ 'bg-blue-50': selectedItems.includes(item.slug) }">
                            <td class="px-4 py-3">
                                <input type="checkbox" :checked="selectedItems.includes(item.slug)"
                                    @change="toggleSelect(item.slug)"
                                    class="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500" />
                            </td>
                            <td class="px-4 py-3">
                                <img :src="item.coverImage || 'https://via.placeholder.com/150'"
                                    class="h-12 w-20 object-cover rounded border border-slate-200" />
                            </td>
                            <td class="px-4 py-3 text-sm text-slate-800 font-medium">{{ item.title }}</td>
                            <td class="px-4 py-3">
                                <span class="px-2 py-1 rounded-full text-xs font-semibold capitalize" :class="{
                                    'bg-blue-100 text-blue-700': item.category === 'activity',
                                    'bg-purple-100 text-purple-700': item.category === 'academic',
                                    'bg-slate-100 text-slate-700': item.category === 'general'
                                }">
                                    {{ item.category }}
                                </span>
                            </td>
                            <td class="px-4 py-3">
                                <span class="px-2 py-1 rounded-full text-xs font-semibold"
                                    :class="item.isPublished ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'">
                                    {{ item.isPublished ? 'Published' : 'Draft' }}
                                </span>
                            </td>
                            <td class="px-4 py-3 text-sm text-slate-600">
                                {{ item.publishedAt ? new Date(item.publishedAt).toLocaleDateString('th-TH') : '-' }}
                            </td>
                            <td class="px-4 py-3 text-right">
                                <div class="flex justify-end gap-2">
                                    <button @click="handleEdit(item)" class="text-blue-600 hover:text-blue-800">
                                        ✏️
                                    </button>
                                    <button @click="handleDelete(item)" class="text-red-600 hover:text-red-800">
                                        🗑️
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <!-- Pagination -->
                <AppPagination v-model:current-page="currentPage" :total-items="filteredNews.length"
                    :items-per-page="itemsPerPage" />
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: 'auth'
})

const newsList = ref<any[]>([])
const loading = ref(true)
const searchQuery = ref('')
const selectedCategory = ref('')
const selectedStatus = ref('')
const selectedItems = ref<string[]>([])
const currentPage = ref(1)
const itemsPerPage = 10
const router = useRouter()
const { showAlert } = useAlert()
const { exportToCSV } = useExport()

const fetchNews = async () => {
    loading.value = true
    try {
        const res: any = await $fetch('/api/news')
        newsList.value = res.data || []
    } catch (e) {
        console.error('Failed to fetch news', e)
        showAlert('Failed to load news', 'error')
    } finally {
        loading.value = false
    }
}

const handleExportCSV = () => {
    const dataToExport = filteredNews.value.map(news => ({
        Title: news.title,
        Category: news.category,
        Status: news.isPublished ? 'Published' : 'Draft',
        'Published Date': news.publishedAt ? new Date(news.publishedAt).toLocaleDateString() : '-',
        Slug: news.slug
    }))
    exportToCSV(dataToExport, 'news_export')
    showAlert('News exported successfully!', 'success')
}

const filteredNews = computed(() => {
    return newsList.value.filter(news => {
        const matchesSearch = news.title.toLowerCase().includes(searchQuery.value.toLowerCase())
        const matchesCategory = selectedCategory.value ? news.category === selectedCategory.value : true
        const matchesStatus = selectedStatus.value
            ? (selectedStatus.value === 'published' ? news.isPublished : !news.isPublished)
            : true
        return matchesSearch && matchesCategory && matchesStatus
    })
})

const paginatedNews = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    const end = start + itemsPerPage
    return filteredNews.value.slice(start, end)
})

// Reset to page 1 when filters change
watch([searchQuery, selectedCategory, selectedStatus], () => {
    currentPage.value = 1
})

const isAllSelected = computed(() => {
    return filteredNews.value.length > 0 && selectedItems.value.length === filteredNews.value.length
})

const toggleSelectAll = () => {
    if (isAllSelected.value) {
        selectedItems.value = []
    } else {
        selectedItems.value = filteredNews.value.map(item => item.slug)
    }
}

const toggleSelect = (slug: string) => {
    const index = selectedItems.value.indexOf(slug)
    if (index > -1) {
        selectedItems.value.splice(index, 1)
    } else {
        selectedItems.value.push(slug)
    }
}

const bulkDelete = async () => {
    if (!confirm(`Are you sure you want to delete ${selectedItems.value.length} item(s)?`)) return

    try {
        await Promise.all(selectedItems.value.map(slug =>
            $fetch(`/api/news/${slug}`, { method: 'DELETE' })
        ))
        showAlert(`Successfully deleted ${selectedItems.value.length} item(s)`, 'success')
        selectedItems.value = []
        await fetchNews()
    } catch (e) {
        showAlert('Failed to delete some items', 'error')
    }
}

const bulkPublish = async () => {
    try {
        await Promise.all(selectedItems.value.map(slug =>
            $fetch(`/api/news/${slug}`, {
                method: 'PUT',
                body: { isPublished: true }
            })
        ))
        showAlert(`Successfully published ${selectedItems.value.length} item(s)`, 'success')
        selectedItems.value = []
        await fetchNews()
    } catch (e) {
        showAlert('Failed to publish some items', 'error')
    }
}

const bulkUnpublish = async () => {
    try {
        await Promise.all(selectedItems.value.map(slug =>
            $fetch(`/api/news/${slug}`, {
                method: 'PUT',
                body: { isPublished: false }
            })
        ))
        showAlert(`Successfully unpublished ${selectedItems.value.length} item(s)`, 'success')
        selectedItems.value = []
        await fetchNews()
    } catch (e) {
        showAlert('Failed to unpublish some items', 'error')
    }
}

const handleEdit = (item: any) => {
    router.push(`/admin/news/${item.slug}`)
}

const handleDelete = async (item: any) => {
    if (!confirm(`Are you sure you want to delete "${item.title}"?`)) return

    try {
        await $fetch(`/api/news/${item.slug}`, { method: 'DELETE' })
        showAlert('News deleted successfully', 'success')
        await fetchNews()
    } catch (e) {
        showAlert('Failed to delete news item', 'error')
    }
}

onMounted(fetchNews)
</script>
