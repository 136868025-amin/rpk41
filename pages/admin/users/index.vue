<template>
    <NuxtLayout name="admin">
        <div class="p-4 md:p-8">
            <!-- Header -->
            <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
                <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <div>
                        <h1 class="text-2xl font-bold text-slate-800">👥 User Management</h1>
                        <p class="text-slate-500 text-sm mt-1">Manage system administrators and editors</p>
                    </div>
                    <NuxtLink to="/admin/users/create"
                        class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105">
                        <span class="text-xl">+</span>
                        <span>Add User</span>
                    </NuxtLink>
                </div>
            </div>

            <!-- Loading State -->
            <div v-if="loading" class="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p class="text-slate-500">Loading users...</p>
            </div>

            <!-- Empty State -->
            <div v-else-if="!users.length"
                class="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
                <div class="text-6xl mb-4">👤</div>
                <p class="text-slate-500 font-medium">No users found</p>
            </div>

            <!-- Users Content -->
            <div v-else>
                <!-- Mobile Card View -->
                <div class="md:hidden space-y-3">
                    <div v-for="user in users" :key="user._id"
                        class="bg-white rounded-xl shadow-sm border border-slate-200 p-4">

                        <!-- User Header -->
                        <div class="flex items-center gap-3 mb-4 pb-4 border-b border-slate-100">
                            <div
                                class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                                {{ user.username.charAt(0).toUpperCase() }}
                            </div>
                            <div class="flex-1 min-w-0">
                                <div class="font-bold text-slate-900 truncate">{{ user.name }}</div>
                                <div class="text-sm text-slate-500">@{{ user.username }}</div>
                            </div>
                            <span class="px-3 py-1 rounded-full text-xs font-bold uppercase shrink-0"
                                :class="user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'">
                                {{ user.role }}
                            </span>
                        </div>

                        <!-- User Details -->
                        <div class="space-y-2 mb-4">
                            <div class="flex justify-between text-sm">
                                <span class="text-slate-500 font-medium">Created:</span>
                                <span class="text-slate-800">{{ new Date(user.createdAt).toLocaleDateString('th-TH')
                                    }}</span>
                            </div>
                        </div>

                        <!-- Actions -->
                        <div class="flex gap-2 pt-3 border-t border-slate-100">
                            <NuxtLink :to="`/admin/users/${user._id}`"
                                class="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2 font-medium">
                                <span>✏️</span>
                                <span>Edit</span>
                            </NuxtLink>
                            <button @click="handleDelete(user)"
                                class="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2 font-medium"
                                :disabled="user.username === 'admin'">
                                <span>🗑️</span>
                                <span>Delete</span>
                            </button>
                        </div>

                        <!-- Admin Protection Notice -->
                        <div v-if="user.username === 'admin'" class="mt-2 text-xs text-amber-600 text-center">
                            ⚠️ Protected system account
                        </div>
                    </div>
                </div>

                <!-- Desktop Table View -->
                <div class="hidden md:block bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr class="bg-slate-50 border-b border-slate-200">
                                <th class="px-6 py-4 text-xs font-bold text-slate-600 uppercase">User</th>
                                <th class="px-6 py-4 text-xs font-bold text-slate-600 uppercase">Role</th>
                                <th class="px-6 py-4 text-xs font-bold text-slate-600 uppercase">Created At</th>
                                <th class="px-6 py-4 text-xs font-bold text-slate-600 uppercase text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100">
                            <tr v-for="user in users" :key="user._id" class="hover:bg-slate-50 transition-colors">
                                <td class="px-6 py-4">
                                    <div class="flex items-center gap-3">
                                        <div
                                            class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
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
                                <td class="px-6 py-4 text-sm text-slate-600">
                                    {{ new Date(user.createdAt).toLocaleDateString('th-TH', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    }) }}
                                </td>
                                <td class="px-6 py-4">
                                    <div class="flex justify-end gap-2">
                                        <NuxtLink :to="`/admin/users/${user._id}`"
                                            class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            title="Edit">
                                            ✏️
                                        </NuxtLink>
                                        <button @click="handleDelete(user)"
                                            class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            :class="{ 'opacity-50 cursor-not-allowed': user.username === 'admin' }"
                                            :disabled="user.username === 'admin'"
                                            :title="user.username === 'admin' ? 'Cannot delete main admin' : 'Delete'">
                                            🗑️
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
