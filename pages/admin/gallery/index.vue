<template>
    <NuxtLayout name="admin">
        <div class="p-4 md:p-8">
            <div class="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <h1 class="text-2xl font-bold text-slate-800">Gallery Albums</h1>
                <div class="flex gap-2">
                    <button @click="handleExportCSV"
                        class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
                        <span>📥</span> Export CSV
                    </button>
                    <NuxtLink to="/admin/gallery/create"
                        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
                        <span>➕</span> Create Album
                    </NuxtLink>
                </div>
            </div>

            <!-- Search Bar -->
            <div class="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6">
                <div class="relative">
                    <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
                    <input v-model="searchQuery" type="text" placeholder="Search albums..."
                        class="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>
            </div>

            <!-- Bulk Actions Bar -->
            <div v-if="selectedItems.length > 0"
                class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <span class="text-sm font-medium text-blue-900">
                    {{ selectedItems.length }} album(s) selected
                </span>
                <div class="flex flex-wrap gap-2 w-full sm:w-auto">
                    <button @click="bulkPublish"
                        class="flex-1 sm:flex-none px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors">
                        📢 Publish
                    </button>
                    <button @click="bulkUnpublish"
                        class="flex-1 sm:flex-none px-3 py-1.5 bg-yellow-600 hover:bg-yellow-700 text-white text-sm rounded-lg transition-colors">
                        📝 Unpublish
                    </button>
                    <button @click="bulkDelete"
                        class="flex-1 sm:flex-none px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition-colors">
                        🗑️ Delete
                    </button>
                    <button @click="selectedItems = []"
                        class="flex-1 sm:flex-none px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-sm rounded-lg transition-colors">
                        Clear
                    </button>
                </div>
            </div>

            <!-- Mobile Card View -->
            <div class="md:hidden space-y-4">
                <div v-if="loading" v-for="i in 5" :key="i" class="animate-pulse">
                    <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                        <div class="aspect-video bg-slate-100 rounded mb-3"></div>
                        <div class="h-4 bg-slate-100 rounded mb-2"></div>
                        <div class="h-4 bg-slate-100 rounded w-2/3"></div>
                    </div>
                </div>

                <div v-else-if="filteredAlbums.length === 0"
                    class="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center text-slate-500">
                    <div class="text-5xl mb-4">📷</div>
                    <p class="font-medium">No albums found</p>
                </div>

                <div v-else v-for="item in filteredAlbums" :key="item._id"
                    class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden transition-all hover:shadow-md"
                    :class="{ 'ring-2 ring-blue-500': selectedItems.includes(item._id) }">

                    <div class="relative aspect-video bg-slate-100">
                        <img :src="item.coverImage || 'https://via.placeholder.com/400x200'" :alt="item.title"
                            class="w-full h-full object-cover" />

                        <div class="absolute top-3 left-3">
                            <input type="checkbox" :checked="selectedItems.includes(item._id)"
                                @change="toggleSelect(item._id)"
                                class="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 bg-white" />
                        </div>

                        <div class="absolute top-3 right-3">
                            <span
                                class="px-3 py-1 rounded-full text-xs font-bold bg-slate-500/90 text-white backdrop-blur-sm">
                                📷 {{ item.images?.length || 0 }} photos
                            </span>
                        </div>
                    </div>

                    <div class="p-4">
                        <h3 class="font-bold text-lg text-slate-800 mb-3 line-clamp-2">
                            {{ item.title }}
                        </h3>

                        <div class="flex items-center gap-2 mb-4">
                            <span class="px-3 py-1 rounded-full text-xs font-semibold"
                                :class="item.isPublished ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'">
                                {{ item.isPublished ? '✓ Published' : '📝 Draft' }}
                            </span>
                            <span class="text-sm text-slate-500">
                                {{ item.eventDate ? new Date(item.eventDate).toLocaleDateString('th-TH', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                }) : 'No date' }}
                            </span>
                        </div>

                        <div class="flex gap-2 pt-3 border-t border-slate-100">
                            <button @click="handleEdit(item)"
                                class="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-lg transition-colors flex items-center justify-center gap-2 font-medium">
                                <span class="text-lg">✏️</span>
                                <span>Edit</span>
                            </button>
                            <button @click="handleDelete(item)"
                                class="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white rounded-lg transition-colors flex items-center justify-center gap-2 font-medium">
                                <span class="text-lg">🗑️</span>
                                <span>Delete</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Desktop Table View -->
            <div class="hidden md:block bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table class="w-full">
                    <thead class="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th class="px-4 py-3 text-left w-12">
                                <input type="checkbox" :checked="isAllSelected" @change="toggleSelectAll"
                                    class="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500" />
                            </th>
                            <th class="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase">Cover</th>
                            <th class="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase">Title</th>
                            <th class="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase">Photos</th>
                            <th class="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase">Event Date</th>
                            <th class="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase">Status</th>
                            <th class="px-4 py-3 text-right text-xs font-bold text-slate-600 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        <tr v-if="loading" v-for="i in 5" :key="i" class="animate-pulse">
                            <td colspan="7" class="px-4 py-4">
                                <div class="h-4 bg-slate-100 rounded"></div>
                            </td>
                        </tr>
                        <tr v-else-if="filteredAlbums.length === 0">
                            <td colspan="7" class="px-4 py-12 text-center text-slate-500">
                                No albums found
                            </td>
                        </tr>
                        <tr v-else v-for="item in filteredAlbums" :key="item._id"
                            class="hover:bg-slate-50 transition-colors"
                            :class="{ 'bg-blue-50': selectedItems.includes(item._id) }">
                            <td class="px-4 py-3">
                                <input type="checkbox" :checked="selectedItems.includes(item._id)"
                                    @change="toggleSelect(item._id)"
                                    class="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500" />
                            </td>
                            <td class="px-4 py-3">
                                <img :src="item.coverImage || 'https://via.placeholder.com/150'" :alt="item.title"
                                    class="h-12 w-20 object-cover rounded border border-slate-200" />
                            </td>
                            <td class="px-4 py-3 text-sm text-slate-800 font-medium">{{ item.title }}</td>
                            <td class="px-4 py-3 text-sm text-slate-600">{{ item.images?.length || 0 }} photos</td>
                            <td class="px-4 py-3 text-sm text-slate-600">
                                {{ item.eventDate ? new Date(item.eventDate).toLocaleDateString('th-TH') : '-' }}
                            </td>
                            <td class="px-4 py-3">
                                <span class="px-2 py-1 rounded-full text-xs font-semibold"
                                    :class="item.isPublished ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'">
                                    {{ item.isPublished ? 'Published' : 'Draft' }}
                                </span>
                            </td>
                            <td class="px-4 py-3 text-right">
                                <div class="flex justify-end gap-2">
                                    <button @click="handleEdit(item)"
                                        class="text-blue-600 hover:text-blue-800 p-1 hover:bg-blue-50 rounded transition-colors"
                                        title="Edit">
                                        ✏️
                                    </button>
                                    <button @click="handleDelete(item)"
                                        class="text-red-600 hover:text-red-800 p-1 hover:bg-red-50 rounded transition-colors"
                                        title="Delete">
                                        🗑️
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: 'auth'
})

const albumList = ref<any[]>([])
const loading = ref(true)
const searchQuery = ref('')
const selectedItems = ref<string[]>([])
const router = useRouter()
const { showAlert } = useAlert()
const { exportToCSV } = useExport()

const fetchAlbums = async () => {
    loading.value = true
    try {
        const res: any = await $fetch('/api/gallery')
        albumList.value = res.data || []
    } catch (e) {
        console.error('Failed to fetch albums', e)
        showAlert('Failed to load albums', 'error')
    } finally {
        loading.value = false
    }
}

const filteredAlbums = computed(() => {
    return albumList.value.filter(album => {
        return album.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    })
})

const handleExportCSV = () => {
    const dataToExport = filteredAlbums.value.map(album => ({
        Title: album.title,
        'Event Date': album.eventDate ? new Date(album.eventDate).toLocaleDateString() : '-',
        'Photos Count': album.images?.length || 0,
        Status: album.isPublished ? 'Published' : 'Draft'
    }))
    exportToCSV(dataToExport, 'gallery_export')
    showAlert('Gallery exported successfully!', 'success')
}

const isAllSelected = computed(() => {
    return filteredAlbums.value.length > 0 && selectedItems.value.length === filteredAlbums.value.length
})

const toggleSelectAll = () => {
    if (isAllSelected.value) {
        selectedItems.value = []
    } else {
        selectedItems.value = filteredAlbums.value.map(item => item._id)
    }
}

const toggleSelect = (id: string) => {
    const index = selectedItems.value.indexOf(id)
    if (index > -1) {
        selectedItems.value.splice(index, 1)
    } else {
        selectedItems.value.push(id)
    }
}

const bulkDelete = async () => {
    if (!confirm(`Delete ${selectedItems.value.length} album(s)?`)) return

    try {
        showAlert('Deleting albums...', 'loading')
        await Promise.all(selectedItems.value.map(id =>
            $fetch(`/api/gallery/${id}`, { method: 'DELETE' })
        ))
        showAlert(`${selectedItems.value.length} album(s) deleted successfully!`, 'success')
        selectedItems.value = []
        await fetchAlbums()
    } catch (e) {
        showAlert('Failed to delete some albums', 'error')
    }
}

const bulkPublish = async () => {
    try {
        showAlert('Publishing albums...', 'loading')
        await Promise.all(selectedItems.value.map(id =>
            $fetch(`/api/gallery/${id}`, {
                method: 'PUT',
                body: { isPublished: true }
            })
        ))
        showAlert(`${selectedItems.value.length} album(s) published!`, 'success')
        selectedItems.value = []
        await fetchAlbums()
    } catch (e) {
        showAlert('Failed to publish some albums', 'error')
    }
}

const bulkUnpublish = async () => {
    try {
        showAlert('Unpublishing albums...', 'loading')
        await Promise.all(selectedItems.value.map(id =>
            $fetch(`/api/gallery/${id}`, {
                method: 'PUT',
                body: { isPublished: false }
            })
        ))
        showAlert(`${selectedItems.value.length} album(s) unpublished!`, 'success')
        selectedItems.value = []
        await fetchAlbums()
    } catch (e) {
        showAlert('Failed to unpublish some albums', 'error')
    }
}

const handleEdit = (item: any) => {
    router.push(`/admin/gallery/${item._id}`)
}

const handleDelete = async (item: any) => {
    if (!confirm(`Delete album "${item.title}"?`)) return

    try {
        await $fetch(`/api/gallery/${item._id}`, { method: 'DELETE' })
        showAlert('Album deleted successfully', 'success')
        await fetchAlbums()
    } catch (e) {
        showAlert('Failed to delete album', 'error')
    }
}

onMounted(fetchAlbums)
</script>
