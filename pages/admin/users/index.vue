<template>
    <NuxtLayout name="admin">
        <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div class="p-6 border-b border-slate-200 flex justify-between items-center">
                <div>
                    <h1 class="text-2xl font-bold text-slate-800">User Management</h1>
                    <p class="text-slate-500 text-sm mt-1">Manage system administrators and editors</p>
                </div>
                <NuxtLink to="/admin/users/create"
                    class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
                    <span>+</span> Add User
                </NuxtLink>
            </div>

            <div v-if="loading" class="p-12 text-center">
                <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto"></div>
            </div>

            <div v-else class="overflow-x-auto">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr
                            class="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-semibold">
                            <th class="px-6 py-4">User</th>
                            <th class="px-6 py-4">Role</th>
                            <th class="px-6 py-4">Created At</th>
                            <th class="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        <tr v-for="user in users" :key="user._id" class="hover:bg-slate-50 transition-colors">
                            <td class="px-6 py-4">
                                <div class="flex items-center gap-3">
                                    <div
                                        class="w-10 h-10 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full flex items-center justify-center text-slate-600 font-bold">
                                        {{ user.username.charAt(0).toUpperCase() }}
                                    </div>
                                    <div>
                                        <div class="font-bold text-slate-800">{{ user.name }}</div>
                                        <div class="text-xs text-slate-500">@{{ user.username }}</div>
                                    </div>
                                </div>
                            </td>
                            <td class="px-6 py-4">
                                <span class="px-2 py-1 rounded-full text-xs font-bold uppercase"
                                    :class="user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'">
                                    {{ user.role }}
                                </span>
                            </td>
                            <td class="px-6 py-4 text-sm text-slate-500">
                                {{ new Date(user.createdAt).toLocaleDateString() }}
                            </td>
                            <td class="px-6 py-4 text-right">
                                <div class="flex justify-end gap-2">
                                    <NuxtLink :to="`/admin/users/${user._id}`"
                                        class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                        title="Edit">
                                        ✏️
                                    </NuxtLink>
                                    <button @click="handleDelete(user)"
                                        class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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

const { data, pending: loading, error, refresh } = await useFetch('/api/users')
const { showAlert } = useAlert()

// Helper to safely access users array
const users = computed(() => {
    if (!data.value) return []
    // Handle both { data: [...] } and { users: [...] } formats
    return (data.value as any).users || (data.value as any).data || []
})

const handleDelete = async (user: any) => {
    if (user.username === 'admin') {
        showAlert('ไม่สามารถลบผู้ดูแลระบบหลักได้', 'error')
        return
    }

    if (!confirm(`คุณแน่ใจหรือไม่ว่าต้องการลบผู้ใช้ "${user.username}"?`)) return

    try {
        await $fetch(`/api/users/${user._id}`, { method: 'DELETE' })
        showAlert('ลบผู้ใช้เรียบร้อยแล้ว', 'success')
        refresh()
    } catch (e: any) {
        showAlert(e.data?.message || 'เกิดข้อผิดพลาดในการลบ', 'error')
    }
}
</script>
