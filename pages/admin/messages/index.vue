<template>
    <NuxtLayout name="admin">
        <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div class="p-6 border-b border-slate-200 flex justify-between items-center">
                <div>
                    <h1 class="text-2xl font-bold text-slate-800">Inbox</h1>
                    <p class="text-slate-500 text-sm mt-1">Manage contact messages from users</p>
                </div>
                <div class="text-sm text-slate-500">
                    Total: <span class="font-bold text-slate-800">{{ messages.length }}</span>
                </div>
            </div>

            <div v-if="loading" class="p-12 text-center">
                <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto"></div>
            </div>

            <div v-else-if="messages.length === 0" class="p-12 text-center text-slate-500">
                <div class="text-4xl mb-4">📭</div>
                <p>No messages found.</p>
            </div>

            <div v-else class="divide-y divide-slate-100">
                <NuxtLink v-for="msg in messages" :key="msg._id" :to="`/admin/messages/${msg._id}`"
                    class="block p-4 hover:bg-slate-50 transition-colors group relative">
                    <div class="flex items-start justify-between gap-4">
                        <div class="flex items-start gap-4 overflow-hidden">
                            <div class="flex-shrink-0 mt-1">
                                <div v-if="!msg.isRead" class="w-2.5 h-2.5 bg-blue-600 rounded-full"></div>
                            </div>
                            <div class="min-w-0">
                                <h3 class="text-sm font-bold text-slate-800 truncate"
                                    :class="{ 'text-slate-600 font-normal': msg.isRead }">
                                    {{ msg.subject }}
                                </h3>
                                <p class="text-sm text-slate-600 truncate">{{ msg.name }} &lt;{{ msg.email }}&gt;</p>
                                <p class="text-xs text-slate-400 mt-1 truncate max-w-md">{{ msg.message }}</p>
                            </div>
                        </div>
                        <div class="flex-shrink-0 text-xs text-slate-400 whitespace-nowrap">
                            {{ new Date(msg.createdAt).toLocaleDateString() }}
                        </div>
                    </div>
                </NuxtLink>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: 'auth'
})

const loading = ref(true)
const messages = ref<any[]>([])

const fetchMessages = async () => {
    try {
        const res: any = await $fetch('/api/contact')
        messages.value = res.data
    } catch (e) {
        console.error('Failed to fetch messages', e)
    } finally {
        loading.value = false
    }
}

onMounted(fetchMessages)
</script>
