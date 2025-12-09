<template>
    <NuxtLayout name="admin">
        <div class="p-4 md:p-8 max-w-4xl mx-auto">
            <div class="mb-6">
                <NuxtLink to="/admin/announcements"
                    class="text-blue-600 hover:text-blue-700 flex items-center gap-2 mb-4">
                    <span>←</span>
                    <span>Back to Announcements</span>
                </NuxtLink>
                <h1 class="text-2xl md:text-3xl font-bold text-slate-800">📢 Create Announcement</h1>
            </div>

            <form @submit.prevent="handleSubmit"
                class="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8 space-y-6">
                <AppInput v-model="form.title" label="Title" placeholder="Enter announcement title" icon="📝"
                    required />

                <div>
                    <label class="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                        <span>📄</span>
                        <span>Content (Optional)</span>
                    </label>
                    <textarea v-model="form.content" rows="4"
                        class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="Enter announcement content..."></textarea>
                </div>

                <AppImageUploader v-model="form.image" label="Image (Optional)" />

                <AppInput v-model="form.link" label="Link URL (Optional)" placeholder="https://..." icon="🔗" />

                <AppInput v-model="form.linkText" label="Link Text" placeholder="ดูเพิ่มเติม" icon="✏️" />

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label class="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                            <span>📅</span>
                            <span>Start Date</span>
                        </label>
                        <input v-model="form.startDate" type="datetime-local"
                            class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" />
                    </div>

                    <div>
                        <label class="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                            <span>📅</span>
                            <span>End Date (Optional)</span>
                        </label>
                        <input v-model="form.endDate" type="datetime-local"
                            class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" />
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <AppInput v-model="form.priority" label="Priority" type="number" icon="⭐" placeholder="0" />

                    <div>
                        <label class="text-sm font-semibold text-slate-700 mb-2 block">Options</label>
                        <label
                            class="flex items-center gap-3 cursor-pointer p-3 border-2 border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                            <input v-model="form.isActive" type="checkbox"
                                class="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500" />
                            <span class="text-slate-700">Active</span>
                        </label>
                        <label
                            class="flex items-center gap-3 cursor-pointer p-3 border-2 border-slate-200 rounded-xl hover:bg-slate-50 transition-colors mt-2">
                            <input v-model="form.showOnce" type="checkbox"
                                class="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500" />
                            <span class="text-slate-700">Show only once per visitor</span>
                        </label>
                    </div>
                </div>

                <div class="flex gap-4 pt-4">
                    <button type="submit" :disabled="submitting"
                        class="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg transition-all disabled:opacity-70">
                        {{ submitting ? 'Creating...' : 'Create Announcement' }}
                    </button>
                    <NuxtLink to="/admin/announcements"
                        class="px-6 py-3 border-2 border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl font-bold transition-colors">
                        Cancel
                    </NuxtLink>
                </div>
            </form>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
import AppImageUploader from '~/components/AppImageUploader.vue'

definePageMeta({
    middleware: 'auth'
})

const { showAlert } = useAlert()
const router = useRouter()
const submitting = ref(false)

const form = ref({
    title: '',
    content: '',
    image: '',
    link: '',
    linkText: 'ดูเพิ่มเติม',
    isActive: true,
    startDate: new Date().toISOString().slice(0, 16),
    endDate: '',
    showOnce: false,
    priority: 0
})

const handleSubmit = async () => {
    submitting.value = true
    try {
        await $fetch('/api/announcements', {
            method: 'POST',
            body: {
                ...form.value,
                endDate: form.value.endDate || null
            }
        })
        showAlert('Announcement created successfully! 🎉', 'success')
        router.push('/admin/announcements')
    } catch (e: any) {
        showAlert(e.data?.message || 'Failed to create announcement', 'error')
    } finally {
        submitting.value = false
    }
}
</script>
