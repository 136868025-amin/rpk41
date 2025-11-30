<template>
    <NuxtLayout name="admin">
        <div class="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 p-8">
            <div class="flex justify-between items-center mb-8">
                <h1 class="text-2xl font-bold text-slate-800">Edit News</h1>
                <NuxtLink to="/admin/news" class="text-slate-500 hover:text-slate-700">
                    Cancel
                </NuxtLink>
            </div>

            <div v-if="loading" class="text-center py-12">
                Loading...
            </div>

            <form v-else @submit.prevent="handleSubmit" class="space-y-6">
                <!-- Title -->
                <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1">Title</label>
                    <input v-model="form.title" type="text" required
                        class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>

                <!-- Slug (Read-only for edit to prevent breaking links) -->
                <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1">Slug (URL)</label>
                    <input v-model="form.slug" type="text" disabled
                        class="w-full px-4 py-2 border rounded-lg bg-slate-100 text-slate-500 cursor-not-allowed" />
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
                <ImageUploader v-model="form.coverImage" label="Cover Image" />

                <!-- Gallery -->
                <AppMultiImageUploader v-model="form.gallery" label="Gallery Images (Optional)" />

                <!-- Content -->
                <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1">Content</label>
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
                        {{ submitting ? 'Saving...' : 'Update News' }}
                    </button>
                </div>
            </form>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
import ImageUploader from '~/components/admin/ImageUploader.vue'
import AppRichEditor from '~/components/AppRichEditor.vue'
import AppMultiImageUploader from '~/components/AppMultiImageUploader.vue'

definePageMeta({
    middleware: 'auth'
})

const route = useRoute()
const router = useRouter()
const slug = route.params.id as string // Note: file is named [id].vue but we use slug
const loading = ref(true)
const submitting = ref(false)

const form = ref<any>({
    title: '',
    slug: '',
    category: 'activity',
    content: '',
    coverImage: '',
    gallery: [],
    isPublished: true,
    publishedAt: ''
})

const { showAlert, showLoading, closeAlert } = useAlert()

onMounted(async () => {
    const loadingId = showLoading('Loading news details...')
    try {
        const res: any = await $fetch(`/api/news/${slug}`)
        const data = res.data
        form.value = {
            ...data,
            publishedAt: data.publishedAt ? new Date(data.publishedAt).toISOString().split('T')[0] : ''
        }
        closeAlert(loadingId)
    } catch (e) {
        closeAlert(loadingId)
        showAlert('News not found', 'error')
        router.push('/admin/news')
    } finally {
        loading.value = false
    }
})

const handleSubmit = async () => {
    submitting.value = true
    const loadingId = showLoading('Updating news...')
    try {
        await $fetch(`/api/news/${slug}`, {
            method: 'PUT',
            body: form.value
        })
        closeAlert(loadingId)
        showAlert('News updated successfully', 'success')
        router.push('/admin/news')
    } catch (e: any) {
        closeAlert(loadingId)
        showAlert(e.data?.message || 'Failed to update', 'error')
    } finally {
        submitting.value = false
    }
}
</script>
