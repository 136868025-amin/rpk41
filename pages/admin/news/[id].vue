<template>
    <NuxtLayout name="admin">
        <div class="p-4 md:p-8 max-w-5xl mx-auto">
            <!-- Header -->
            <div class="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-6 md:p-8 mb-8 text-white">
                <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <div class="flex items-center gap-4">
                        <div class="p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
                            <span class="text-4xl">✏️</span>
                        </div>
                        <div>
                            <h1 class="text-2xl md:text-3xl font-bold">
                                <span v-if="loading">Edit News</span>
                                <span v-else>Edit News: {{ form.title }}</span>
                            </h1>
                            <p class="text-blue-100 mt-1">Update your news article</p>
                        </div>
                    </div>
                    <NuxtLink to="/admin/news"
                        class="px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl font-semibold transition-all text-center">
                        Cancel
                    </NuxtLink>
                </div>
            </div>

            <!-- Loading State -->
            <div v-if="loading" class="bg-white rounded-2xl shadow-lg border border-slate-200 p-12 text-center">
                <div class="animate-spin text-6xl mb-4">⏳</div>
                <p class="text-slate-500 font-medium">Loading news details...</p>
            </div>

            <!-- Form Card -->
            <div v-else class="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 md:p-8">
                <form @submit.prevent="handleSubmit" class="space-y-8">
                    <!-- Title & Slug -->
                    <div class="space-y-6">
                        <div>
                            <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                <span>📰</span>
                                <span>Article Title</span>
                            </label>
                            <input v-model="form.title" type="text" required
                                class="w-full px-4 py-3 text-lg font-semibold bg-slate-50 border-2 border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all" />
                        </div>

                        <div>
                            <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                <span>🔗</span>
                                <span>Slug (URL)</span>
                            </label>
                            <input v-model="form.slug" type="text" disabled
                                class="w-full px-4 py-3 bg-slate-100 border-2 border-slate-200 rounded-xl text-slate-500 cursor-not-allowed font-mono text-sm" />
                            <p class="text-xs text-amber-600 mt-2 flex items-center gap-1">
                                <span>⚠️</span>
                                <span>Locked to prevent breaking existing links</span>
                            </p>
                        </div>
                    </div>

                    <!-- Category & Date -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                <span>🏷️</span>
                                <span>Category</span>
                            </label>
                            <select v-model="form.category"
                                class="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all">
                                <option value="activity">🎉 Activity (กิจกรรม)</option>
                                <option value="academic">📚 Academic (วิชาการ)</option>
                                <option value="general">📢 General (ทั่วไป)</option>
                            </select>
                        </div>

                        <div>
                            <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                <span>📅</span>
                                <span>Published Date</span>
                            </label>
                            <input v-model="form.publishedAt" type="date"
                                class="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all" />
                        </div>
                    </div>

                    <!-- Cover Image -->
                    <div class="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border-2 border-blue-100">
                        <ImageUploader v-model="form.coverImage" label="Cover Image" />
                    </div>

                    <!-- Gallery -->
                    <div class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-100">
                        <AppMultiImageUploader v-model="form.gallery" label="Gallery Images (Optional)" />
                    </div>

                    <!-- Content Editor -->
                    <div>
                        <label class="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                            <span>✍️</span>
                            <span>Article Content</span>
                        </label>
                        <div
                            class="border-2 border-slate-200 rounded-2xl overflow-hidden hover:border-blue-300 transition-colors">
                            <AppRichEditor v-model="form.content" />
                        </div>
                    </div>

                    <!-- Publish Status -->
                    <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200">
                        <label class="flex items-center gap-4 cursor-pointer group">
                            <input v-model="form.isPublished" type="checkbox" id="isPublished"
                                class="w-6 h-6 text-green-600 rounded-lg focus:ring-2 focus:ring-green-500 cursor-pointer" />
                            <div>
                                <span
                                    class="font-bold text-slate-800 text-lg group-hover:text-green-700 transition-colors">
                                    Publish immediately
                                </span>
                                <p class="text-sm text-slate-600 mt-0.5">Make this news visible to everyone on the
                                    website</p>
                            </div>
                        </label>
                    </div>

                    <!-- Submit Button -->
                    <div class="pt-6 border-t-2 border-slate-100 flex flex-col sm:flex-row gap-4 sm:justify-end">
                        <NuxtLink to="/admin/news"
                            class="px-8 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-all text-center">
                            Cancel
                        </NuxtLink>
                        <button type="submit"
                            class="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105 disabled:opacity-70 disabled:transform-none flex items-center justify-center gap-3"
                            :disabled="submitting">
                            <span v-if="submitting" class="animate-spin text-2xl">⏳</span>
                            <span v-else class="text-2xl">💾</span>
                            <span class="text-lg">{{ submitting ? 'Updating...' : 'Update News' }}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
import ImageUploader from '~/components/admin/ImageUploader.vue'
import AppRichEditor from '~/components/AppRichEditor.vue'
import AppMultiImageUploader from '~/components/AppMultiImageUploader.vue'
import { useBreadcrumbStore } from '~/stores/breadcrumb'

definePageMeta({
    middleware: 'auth'
})

const route = useRoute()
const router = useRouter()
const slug = route.params.id as string
const loading = ref(true)
const submitting = ref(false)
const breadcrumbStore = useBreadcrumbStore()

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
        // Set breadcrumb title
        breadcrumbStore.setTitle(data.title)
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
        showAlert('News updated successfully! 🎉', 'success')
        router.push('/admin/news')
    } catch (e: any) {
        closeAlert(loadingId)
        showAlert(e.data?.message || 'Failed to update', 'error')
    } finally {
        submitting.value = false
    }
}
</script>
