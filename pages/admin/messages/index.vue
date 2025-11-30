<template>
    <NuxtLayout name="admin">
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-bold text-gray-800">
                <i class="fas fa-inbox mr-2"></i> ข้อความจากทางบ้าน
            </h1>
        </div>

        <div class="bg-white rounded-lg shadow overflow-hidden">
            <!-- Loading State -->
            <div v-if="pending" class="p-8 text-center text-gray-500">
                <i class="fas fa-circle-notch fa-spin fa-2x mb-2"></i>
                <p>กำลังโหลดข้อมูล...</p>
            </div>

            <!-- Error State -->
            <div v-else-if="error" class="p-8 text-center text-red-500">
                <i class="fas fa-exclamation-circle fa-2x mb-2"></i>
                <p>เกิดข้อผิดพลาด: {{ error.message }}</p>
            </div>

            <!-- Empty State -->
            <div v-else-if="!data?.messages?.length" class="p-8 text-center text-gray-500">
                <i class="fas fa-inbox fa-3x mb-4 text-gray-300"></i>
                <p>ไม่มีข้อความใหม่</p>
            </div>

            <!-- Data Table -->
            <div v-else>
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    สถานะ</th>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    ผู้ส่ง</th>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    หัวข้อ</th>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    วันที่</th>
                                <th scope="col"
                                    class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    จัดการ</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <tr v-for="message in data.messages" :key="message._id"
                                :class="{ 'bg-blue-50': !message.isRead }" class="hover:bg-gray-50 transition-colors">
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span v-if="!message.isRead"
                                        class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                        ใหม่
                                    </span>
                                    <span v-else
                                        class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                                        อ่านแล้ว
                                    </span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm font-medium text-gray-900">{{ message.name }}</div>
                                    <div class="text-sm text-gray-500">{{ message.email }}</div>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="text-sm text-gray-900 truncate max-w-xs">{{ message.subject }}</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {{ formatDate(message.createdAt) }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <NuxtLink :to="`/admin/messages/${message._id}`"
                                        class="text-indigo-600 hover:text-indigo-900 mr-4">
                                        <i class="fas fa-eye"></i> อ่าน
                                    </NuxtLink>
                                    <button @click="confirmDelete(message._id)" class="text-red-600 hover:text-red-900">
                                        <i class="fas fa-trash"></i> ลบ
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Pagination -->
                <div class="bg-white px-4 py-3 border-t border-gray-200 flex items-center justify-between sm:px-6">
                    <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                            <p class="text-sm text-gray-700">
                                แสดงหน้า <span class="font-medium">{{ page }}</span> จาก <span class="font-medium">{{
                                    data.totalPages }}</span>
                            </p>
                        </div>
                        <div>
                            <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                                aria-label="Pagination">
                                <button @click="page > 1 ? page-- : null" :disabled="page === 1"
                                    class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50">
                                    <span class="sr-only">Previous</span>
                                    <i class="fas fa-chevron-left"></i>
                                </button>
                                <button @click="page < data.totalPages ? page++ : null"
                                    :disabled="page === data.totalPages"
                                    class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50">
                                    <span class="sr-only">Next</span>
                                    <i class="fas fa-chevron-right"></i>
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: 'auth'
})

const page = ref(1)
const { data, pending, error, refresh } = await useFetch(() => `/api/contact?page=${page.value}&limit=10`)

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
}

const confirmDelete = async (id: string) => {
    if (!confirm('คุณแน่ใจหรือไม่ว่าต้องการลบข้อความนี้?')) return

    try {
        await $fetch(`/api/contact/${id}`, { method: 'DELETE' })
        refresh()
        alert('ลบข้อความเรียบร้อยแล้ว')
    } catch (e) {
        alert('เกิดข้อผิดพลาดในการลบข้อความ')
    }
}
</script>
