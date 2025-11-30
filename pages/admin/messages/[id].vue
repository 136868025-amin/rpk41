<template>
    <NuxtLayout name="admin">
        <div class="max-w-4xl mx-auto">
            <div class="mb-6 flex items-center gap-4">
                <NuxtLink to="/admin/messages" class="p-2 hover:bg-slate-100 rounded-full transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-slate-500" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </NuxtLink>
                <h1 class="text-2xl font-bold text-slate-800">Message Details</h1>
            </div>

            <div v-if="loading" class="p-12 text-center">
                <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto"></div>
            </div>

            <div v-else-if="message" class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <!-- Header -->
                <div class="p-6 border-b border-slate-100 bg-slate-50/50">
                    <div class="flex justify-between items-start mb-4">
                        <h2 class="text-xl font-bold text-slate-800">{{ message.subject }}</h2>
                        <span class="text-sm text-slate-500">{{ new Date(message.createdAt).toLocaleString() }}</span>
                    </div>

                    <div class="flex items-center gap-3">
                        <div
                            class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg">
                            {{ message.name.charAt(0).toUpperCase() }}
                        </div>
                        <div>
                            <p class="font-medium text-slate-800">{{ message.name }}</p>
                            <a :href="`mailto:${message.email}`" class="text-sm text-blue-600 hover:underline">{{
                                message.email }}</a>
                        </div>
                    </div>
                </div>

                <!-- Content -->
                <div class="p-8 min-h-[200px] whitespace-pre-wrap text-slate-700 leading-relaxed">
                    {{ message.message }}
                </div>

                <!-- Actions -->
                <div class="p-6 border-t border-slate-100 flex justify-end gap-3 bg-slate-50">
                    <button @click="handleDelete"
                        class="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete Message
                    </button>
                    <a :href="`mailto:${message.email}?subject=Re: ${message.subject}`"
                        class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Reply via Email
                    </a>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: 'auth'
})

const route = useRoute()
const router = useRouter()
const { showAlert } = useAlert()
const id = route.params.id as string

interface ContactMessage {
    _id: string
    name: string
    email: string
    subject: string
    message: string
    createdAt: string
    isRead: boolean
}

const { data: message, pending: loading, error } = await useFetch<ContactMessage>(`/api/contact/${id}`)

if (error.value) {
    showAlert('ไม่พบข้อความ', 'error')
    router.push('/admin/messages')
}

const handleDelete = async () => {
    if (!confirm('คุณแน่ใจหรือไม่ว่าต้องการลบข้อความนี้?')) return

    try {
        await $fetch(`/api/contact/${id}`, { method: 'DELETE' })
        showAlert('ลบข้อความเรียบร้อยแล้ว', 'success')
        router.push('/admin/messages')
    } catch (e) {
        showAlert('เกิดข้อผิดพลาดในการลบข้อความ', 'error')
    }
}
</script>
