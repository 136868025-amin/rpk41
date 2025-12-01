<template>
    <NuxtLayout name="admin">
        <div class="p-4 md:p-8">
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-2xl font-bold text-slate-800">
                    📨 ข้อความจากทางบ้าน
                </h1>
            </div>

            <!-- Loading State -->
            <div v-if="pending" class="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
                <div class="text-4xl mb-4 animate-pulse">⏳</div>
                <p class="text-slate-500">กำลังโหลดข้อมูล...</p>
            </div>

            <!-- Error State -->
            <div v-else-if="error" class="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
                <div class="text-5xl mb-4">⚠️</div>
                <p class="text-red-600 font-medium">เกิดข้อผิดพลาด</p>
                <p class="text-slate-500 text-sm mt-1">{{ error.message }}</p>
            </div>

            <!-- Empty State -->
            <div v-else-if="!data?.messages?.length"
                class="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
                <div class="text-5xl mb-4">📭</div>
                <p class="text-slate-500 font-medium">ไม่มีข้อความใหม่</p>
            </div>

            <!-- Messages Content -->
            <div v-else>
                <!-- Mobile Card View -->
                <div class="md:hidden space-y-3">
                    <div v-for="message in data.messages" :key="message._id"
                        class="bg-white rounded-xl shadow-sm border border-slate-200 p-4"
                        :class="{ 'ring-2 ring-blue-500 bg-blue-50': !message.isRead }">

                        <div class="flex items-start justify-between mb-3">
                            <span class="px-3 py-1 rounded-full text-xs font-semibold"
                                :class="!message.isRead ? 'bg-blue-500 text-white' : 'bg-slate-200 text-slate-700'">
                                {{ !message.isRead ? '🆕 ใหม่' : '✓ อ่านแล้ว' }}
                            </span>
                        </div>

                        <div class="space-y-2 mb-3">
                            <div>
                                <span class="text-xs font-semibold text-slate-500 uppercase">ผู้ส่ง:</span>
                                <p class="text-sm font-medium text-slate-900">{{ message.name }}</p>
                                <p class="text-xs text-slate-600">{{ message.email }}</p>
                            </div>

                            <div>
                                <span class="text-xs font-semibold text-slate-500 uppercase">หัวข้อ:</span>
                                <p class="text-sm text-slate-800">{{ message.subject }}</p>
                            </div>

                            <div>
                                <span class="text-xs font-semibold text-slate-500 uppercase">วันที่:</span>
                                <p class="text-xs text-slate-600">{{ formatDate(message.createdAt) }}</p>
                            </div>
                        </div>

                        <div class="flex gap-2 pt-3 border-t border-slate-100">
                            <NuxtLink :to="`/admin/messages/${message._id}`"
                                class="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2 font-medium text-sm">
                                <span>👁️</span>
                                <span>อ่าน</span>
                            </NuxtLink>
                            <button @click="confirmDelete(message._id)"
                                class="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2 font-medium text-sm">
                                <span>🗑️</span>
                                <span>ลบ</span>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Desktop Table View -->
                <div class="hidden md:block bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <table class="w-full">
                        <thead class="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-bold text-slate-600 uppercase">สถานะ</th>
                                <th class="px-6 py-3 text-left text-xs font-bold text-slate-600 uppercase">ผู้ส่ง</th>
                                <th class="px-6 py-3 text-left text-xs font-bold text-slate-600 uppercase">หัวข้อ</th>
                                <th class="px-6 py-3 text-left text-xs font-bold text-slate-600 uppercase">วันที่</th>
                                <th class="px-6 py-3 text-right text-xs font-bold text-slate-600 uppercase">จัดการ</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100">
                            <tr v-for="message in data.messages" :key="message._id"
                                :class="{ 'bg-blue-50': !message.isRead }" class="hover:bg-slate-50 transition-colors">
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span class="px-2 py-1 rounded-full text-xs font-semibold"
                                        :class="!message.isRead ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-800'">
                                        {{ !message.isRead ? 'ใหม่' : 'อ่านแล้ว' }}
                                    </span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm font-medium text-slate-900">{{ message.name }}</div>
                                    <div class="text-sm text-slate-500">{{ message.email }}</div>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="text-sm text-slate-900 truncate max-w-xs">{{ message.subject }}</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                    {{ formatDate(message.createdAt) }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-right">
                                    <div class="flex justify-end gap-2">
                                        <NuxtLink :to="`/admin/messages/${message._id}`"
                                            class="text-blue-600 hover:text-blue-800 p-1 hover:bg-blue-50 rounded transition-colors"
                                            title="อ่าน">
                                            👁️
                                        </NuxtLink>
                                        <button @click="confirmDelete(message._id)"
                                            class="text-red-600 hover:text-red-800 p-1 hover:bg-red-50 rounded transition-colors"
                                            title="ลบ">
                                            🗑️
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <!-- Pagination -->
                    <div
                        class="bg-slate-50 px-4 py-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div class="text-sm text-slate-700">
                            แสดงหน้า <span class="font-medium">{{ page }}</span> จาก <span class="font-medium">{{
                                data.totalPages }}</span>
                        </div>
                        <div class="flex gap-2">
                            <button @click="page > 1 ? page-- : null" :disabled="page === 1"
                                class="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm text-sm">
                                ← Previous
                            </button>
                            <button @click="page < data.totalPages ? page++ : null" :disabled="page === data.totalPages"
                                class="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm text-sm">
                                Next →
                            </button>
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

const { showAlert } = useAlert()
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
        showAlert('ลบข้อความเรียบร้อยแล้ว', 'success')
        refresh()
    } catch (e) {
        showAlert('เกิดข้อผิดพลาดในการลบข้อความ', 'error')
    }
}
</script>
