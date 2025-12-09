<template>
    <NuxtLayout name="admin">
        <div class="p-4 md:p-8">
            <!-- Header -->
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 class="text-2xl md:text-3xl font-bold text-slate-800">📢 Announcements</h1>
                    <p class="text-slate-600 mt-1">Manage popup announcements</p>
                </div>
                <NuxtLink to="/admin/announcements/create"
                    class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg transition-all flex items-center justify-center gap-2">
                    <span>➕</span>
                    <span>Create Announcement</span>
                </NuxtLink>
            </div>

            <!-- List -->
            <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div v-if="pending" class="p-8 text-center">
                    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                </div>

                <div v-else-if="!announcements || announcements.length === 0" class="p-12 text-center">
                    <div class="text-6xl mb-4">📭</div>
                    <p class="text-slate-500">No announcements yet</p>
                </div>

                <div v-else class="overflow-x-auto">
                    <table class="w-full">
                        <thead class="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th class="px-6 py-4 text-left text-sm font-semibold text-slate-700">Title</th>
                                <th class="px-6 py-4 text-left text-sm font-semibold text-slate-700">Status</th>
                                <th class="px-6 py-4 text-left text-sm font-semibold text-slate-700">Priority</th>
                                <th class="px-6 py-4 text-left text-sm font-semibold text-slate-700">Date Range</th>
                                <th class="px-6 py-4 text-right text-sm font-semibold text-slate-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-200">
                            <tr v-for="announcement in announcements" :key="announcement._id"
                                class="hover:bg-slate-50 transition-colors">
                                <td class="px-6 py-4">
                                    <div class="flex items-center gap-3">
                                        <img v-if="announcement.image" :src="announcement.image"
                                            class="w-12 h-12 rounded-lg object-cover" />
                                        <div>
                                            <div class="font-medium text-slate-800">{{ announcement.title }}</div>
                                            <div v-if="announcement.content"
                                                class="text-sm text-slate-500 truncate max-w-xs">
                                                {{ announcement.content }}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <span v-if="announcement.isActive"
                                        class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                                        Active
                                    </span>
                                    <span v-else
                                        class="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm font-medium">
                                        Inactive
                                    </span>
                                </td>
                                <td class="px-6 py-4">
                                    <span class="text-slate-700 font-medium">{{ announcement.priority }}</span>
                                </td>
                                <td class="px-6 py-4 text-sm text-slate-600">
                                    <div>{{ formatDate(announcement.startDate) }}</div>
                                    <div v-if="announcement.endDate" class="text-slate-400">
                                        → {{ formatDate(announcement.endDate) }}
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="flex items-center justify-end gap-2">
                                        <NuxtLink :to="`/admin/announcements/edit/${announcement._id}`"
                                            class="px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
                                            Edit
                                        </NuxtLink>
                                        <button @click="handleDelete(announcement._id)"
                                            class="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors">
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: 'auth'
})

const { data: response, pending, refresh } = await useFetch('/api/announcements')
const announcements = computed(() => response.value?.data || [])
const { showAlert } = useAlert()

const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
}

const handleDelete = async (id: string) => {
    if (!confirm('Delete this announcement?')) return

    try {
        await $fetch(`/api/announcements/${id}`, { method: 'DELETE' })
        showAlert('Announcement deleted successfully', 'success')
        refresh()
    } catch (e) {
        showAlert('Failed to delete announcement', 'error')
    }
}
</script>
