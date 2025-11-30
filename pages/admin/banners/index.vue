<template>
    <NuxtLayout name="admin">
        <AppDataTable title="Banner Management" :columns="columns" :data="bannerList" :loading="loading" searchable
            @edit="handleEdit" @delete="handleDelete">
            <template #actions>
                <NuxtLink to="/admin/banners/create"
                    class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
                    <span>➕</span> Add Banner
                </NuxtLink>
            </template>

            <!-- Custom Cell Renderers -->
            <template #imageUrl="{ item }">
                <img :src="item.imageUrl || 'https://via.placeholder.com/300x100'"
                    class="h-12 w-24 object-cover rounded border border-slate-200" />
            </template>

            <template #isActive="{ item }">
                <span class="px-2 py-1 rounded-full text-xs font-semibold"
                    :class="item.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'">
                    {{ item.isActive ? 'Active' : 'Inactive' }}
                </span>
            </template>

            <template #rowActions="{ item }">
                <div class="flex justify-end gap-2">
                    <button @click="handleEdit(item)"
                        class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </button>
                    <button @click="handleDelete(item)"
                        class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </template>
        </AppDataTable>
    </NuxtLayout>
</template>

<script setup lang="ts">
import AppDataTable from '~/components/AppDataTable.vue'

definePageMeta({
    middleware: 'auth'
})

const { showAlert } = useAlert()
const router = useRouter()

const columns = [
    { key: 'imageUrl', label: 'Preview' },
    { key: 'title', label: 'Title' },
    { key: 'orderIndex', label: 'Order' },
    { key: 'isActive', label: 'Status' },
]

const bannerList = ref([])
const loading = ref(true)

const fetchBanners = async () => {
    loading.value = true
    try {
        const res: any = await $fetch('/api/banners?activeOnly=false')
        bannerList.value = res.data || []
    } catch (e) {
        console.error('Failed to fetch banners', e)
        showAlert('Failed to load banners', 'error')
    } finally {
        loading.value = false
    }
}

const handleEdit = (item: any) => {
    router.push(`/admin/banners/${item._id}`)
}

const handleDelete = async (item: any) => {
    if (!confirm(`Are you sure you want to delete this banner?`)) return

    try {
        await $fetch(`/api/banners/${item._id}`, { method: 'DELETE' })
        showAlert('Banner deleted successfully', 'success')
        await fetchBanners() // Refresh list
    } catch (e) {
        showAlert('Failed to delete banner', 'error')
    }
}

onMounted(fetchBanners)
</script>
