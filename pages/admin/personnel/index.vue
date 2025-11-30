<template>
    <NuxtLayout name="admin">
        <div class="p-8">
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-2xl font-bold text-slate-800">Personnel Management</h1>
                <NuxtLink to="/admin/personnel/create"
                    class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
                    <span>➕</span> Add Staff
                </NuxtLink>
            </div>

            <AppDataTable :columns="columns" :data="personnelList" :loading="loading">
                <!-- Custom Cell Renderers -->
                <template #cell-photo="{ item }">
                    <img :src="item.photo || 'https://via.placeholder.com/150'"
                        class="h-12 w-12 object-cover rounded-full border border-slate-200" />
                </template>

                <template #cell-department="{ item }">
                    <span class="px-2 py-1 rounded-full text-xs font-semibold capitalize" :class="{
                        'bg-purple-100 text-purple-700': item.department === 'administrators',
                        'bg-blue-100 text-blue-700': item.department === 'teachers',
                        'bg-green-100 text-green-700': item.department === 'support_staff'
                    }">
                        {{ (item.department || '').replace('_', ' ') }}
                    </span>
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
    { key: 'photo', label: 'Photo' },
    { key: 'name', label: 'Name' },
    { key: 'position', label: 'Position' },
    { key: 'department', label: 'Department' },
    { key: 'orderIndex', label: 'Order' },
]

const personnelList = ref([])
const loading = ref(true)
const router = useRouter()
const { showAlert } = useAlert()

const fetchPersonnel = async () => {
    loading.value = true
    try {
        const res: any = await $fetch('/api/personnel')
        personnelList.value = res.data || []
    } catch (e) {
        console.error('Failed to fetch personnel', e)
        showAlert('Failed to load personnel', 'error')
    } finally {
        loading.value = false
    }
}

const handleEdit = (item: any) => {
    router.push(`/admin/personnel/${item._id}`)
}

const handleDelete = async (item: any) => {
    if (!confirm(`Are you sure you want to delete "${item.name}"?`)) return

    try {
        await $fetch(`/api/personnel/${item._id}`, { method: 'DELETE' })
        showAlert('Personnel deleted successfully', 'success')
        await fetchPersonnel() // Refresh list
    } catch (e) {
        showAlert('Failed to delete personnel', 'error')
    }
}

onMounted(fetchPersonnel)
</script>
