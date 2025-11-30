<template>
    <NuxtLayout name="admin">
        <div class="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 p-8">
            <div class="flex justify-between items-center mb-8">
                <h1 class="text-2xl font-bold text-slate-800">
                    {{ isEditing ? 'Edit News' : 'Create News' }}
                </h1>
                <NuxtLink to="/admin/news" class="text-slate-500 hover:text-slate-700">
                    Cancel
                </NuxtLink>
            </div>

            <form @submit.prevent="handleSubmit" class="space-y-6">
                <!-- Title -->
                <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1">Title</label>
                    <input v-model="form.title" type="text" required
                        class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        @input="generateSlug" />
                </div>

                <!-- Slug -->
                <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1">Slug (URL)</label>
                    <input v-model="form.slug" type="text" required
                        class="w-full px-4 py-2 border rounded-lg bg-slate-50 text-slate-500 focus:outline-none" />
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Category -->
                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-1">Category</label>
                        <select v-model="form.category"
                            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none">
                            <option value="activity">Activity (กิจกรรม)</option>
                            <option value="academic">Academic (วิชาการ)</option>
                            <option value="general">General (ทั่วไป)</option>
                        </select>
                    </div>

                    <!-- Published Date -->
                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-1">Published Date</label>
                        <input v-model="form.publishedAt" type="date"
                            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                    </div>
                </div>

                <!-- Cover Image -->
                <AppImageUploader v-model="form.coverImage" label="Cover Image" />

                <!-- Content (Rich Text Editor) -->
                <div>
                    <label class="block text-sm font-medium text-slate-700 mb-2">Content</label>
                    <AppRichEditor v-model="form.content" />
                </div>

                <!-- Status -->
                <div class="flex items-center space-x-3 bg-slate-50 p-4 rounded-lg">
                    <input v-model="form.isPublished" type="checkbox" id="isPublished"
                        class="h-5 w-5 text-blue-600 rounded focus:ring-blue-500" />
                    <label for="isPublished" class="font-medium text-slate-700">Publish immediately</label>
                </div>

                <!-- Submit Button -->
                <div class="pt-4 border-t border-slate-100 flex justify-end">
                    <button type="submit"
                        class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold shadow-lg transition-transform transform hover:scale-105"
                        :disabled="submitting">
                        {{ submitting ? 'Saving...' : (isEditing ? 'Update News' : 'Create News') }}
                    </button>
                </div>
            </form>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
import AppImageUploader from '~/components/AppImageUploader.vue'
import AppRichEditor from '~/components/AppRichEditor.vue'

definePageMeta({
    middleware: 'auth'
})

const route = useRoute()
const router = useRouter()
const { showAlert, showLoading, closeAlert } = useAlert()
const isEditing = computed(() => route.params.id !== undefined)
const submitting = ref(false)

const form = ref({
    title: '',
    slug: '',
    category: 'activity',
    content: '',
    coverImage: '',
    gallery: [],
    isPublished: true,
    publishedAt: new Date().toISOString().split('T')[0]
})

const generateSlug = () => {
    if (isEditing.value) return // Don't auto-change slug on edit
    form.value.slug = form.value.title
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '')
}

const handleSubmit = async () => {
    submitting.value = true
    const loadingId = showLoading('Creating news...')
    try {
        await $fetch('/api/news', {
            method: 'POST',
            body: form.value
        })
        closeAlert(loadingId)
        showAlert('News created successfully', 'success')
        router.push('/admin/news')
    } catch (e: any) {
        closeAlert(loadingId)
        showAlert(e.data?.message || 'Failed to save', 'error')
    } finally {
        submitting.value = false
    }
}
</script>
