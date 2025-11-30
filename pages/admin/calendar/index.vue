<template>
    <NuxtLayout name="admin">
        <div class="p-8">
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-2xl font-bold text-slate-800">School Calendar</h1>
                <NuxtLink to="/admin/calendar/create"
                    class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
                    <span>➕</span> Add Event
                </NuxtLink>
            </div>

            <AppDataTable :columns="columns" :data="eventList" :loading="loading">
                <!-- Custom Cell Renderers -->
                <template #cell-startDate="{ item }">
                    {{ formatDate(item.startDate) }}
                </template>

                <template #cell-endDate="{ item }">
                    {{ item.endDate ? formatDate(item.endDate) : '-' }}
                </template>

                <template #cell-type="{ item }">
                    <span class="px-2 py-1 rounded-full text-xs font-semibold capitalize" :class="{
                        'bg-blue-100 text-blue-700': item.type === 'academic',
                        'bg-green-100 text-green-700': item.type === 'activity',
                        'bg-red-100 text-red-700': item.type === 'holiday',
                        'bg-yellow-100 text-yellow-700': item.type === 'exam'
                    }">
                        {{ item.type }}
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
    { key: 'startDate', label: 'Start Date' },
    { key: 'endDate', label: 'End Date' },
    { key: 'title', label: 'Event Title' },
    { key: 'type', label: 'Type' },
    { key: 'location', label: 'Location' },
]

const eventList = ref([])
const loading = ref(true)
const router = useRouter()
const { showAlert } = useAlert()

const fetchEvents = async () => {
    loading.value = true
    try {
        const res: any = await $fetch('/api/calendar')
        eventList.value = res.data || []
    } catch (e) {
        console.error('Failed to fetch events', e)
        showAlert('Failed to load events', 'error')
    } finally {
        loading.value = false
    }
}

const handleEdit = (item: any) => {
    router.push(`/admin/calendar/${item._id}`)
}

const handleDelete = async (item: any) => {
    if (!confirm(`Are you sure you want to delete "${item.title}"?`)) return

    try {
        await $fetch(`/api/calendar/${item._id}`, { method: 'DELETE' })
        showAlert('Event deleted successfully', 'success')
        await fetchEvents() // Refresh list
    } catch (e) {
        showAlert('Failed to delete event', 'error')
    }
}

const formatDate = (dateString: string) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
}

onMounted(fetchEvents)
</script>
