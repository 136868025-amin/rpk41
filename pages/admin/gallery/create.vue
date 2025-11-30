<template>
    <NuxtLayout name="admin">
        <div class="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 p-8">
            <div class="flex justify-between items-center mb-8">
                <h1 class="text-2xl font-bold text-slate-800">Create Album</h1>
                <NuxtLink to="/admin/gallery" class="text-slate-500 hover:text-slate-700">
                    Cancel
                </NuxtLink>
            </div>

            <form @submit.prevent="handleSubmit" class="space-y-6">
                <!-- Title -->
                <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1">Album Title</label>
                    <input v-model="form.title" type="text" required
                        class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>

                <!-- Event Date -->
                <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1">Event Date</label>
                    <input v-model="form.eventDate" type="date" required
                        class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>

                <!-- Description -->
                <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1">Description</label>
                    <textarea v-model="form.description" rows="3"
                        class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"></textarea>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Category -->
                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-1">Category</label>
                        <select v-model="form.category"
                            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none">
                            <option value="general">General (ทั่วไป)</option>
                            <option value="activity">Activity (กิจกรรม)</option>
                            <option value="academic">Academic (วิชาการ)</option>
                            <option value="sport">Sport (กีฬา)</option>
                        </select>
                    </div>

                    <!-- Highlight -->
                    <div class="flex items-center h-full pt-6">
                        <div class="flex items-center space-x-3">
                            <input v-model="form.isHighlight" type="checkbox" id="isHighlight"
                                class="h-5 w-5 text-amber-600 rounded focus:ring-amber-500" />
                            <label for="isHighlight" class="font-medium text-slate-700">Pin to Highlight Slider</label>
                        </div>
                    </div>
                </div>

                <!-- Cover Image -->
                <AppImageUploader v-model="form.coverImage" label="Cover Image" />

                <!-- Gallery Images -->
                <AppMultiImageUploader v-model="form.images" label="Gallery Photos" />

                <!-- Status -->
                <div class="flex items-center space-x-3 bg-slate-50 p-4 rounded-lg">
                    <input v-model="form.isPublished" type="checkbox" id="isPublished"
                        class="h-5 w-5 text-blue-600 rounded focus:ring-blue-500" />
                    <label for="isPublished" class="font-medium text-slate-700">Publish Album</label>
                </div>

                <!-- Submit Button -->
                <div class="pt-4 border-t border-slate-100 flex justify-end">
                    <button type="submit"
                        class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold shadow-lg transition-transform transform hover:scale-105"
                        :disabled="submitting">
                        {{ submitting ? 'Creating...' : 'Create Album' }}
                    </button>
                </div>
            </form>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
import AppImageUploader from '~/components/AppImageUploader.vue'
import AppMultiImageUploader from '~/components/AppMultiImageUploader.vue'

definePageMeta({
    middleware: 'auth'
})

const router = useRouter()
const { showAlert, showLoading, closeAlert } = useAlert()

const form = ref({
    title: '',
    description: '',
    eventDate: new Date().toISOString().split('T')[0],
    category: 'general',
    isHighlight: false,
    coverImage: '',
    images: [] as string[],
    isPublished: true
})

const submitting = ref(false)

const handleSubmit = async () => {
    if (form.value.images.length === 0) {
        showAlert('Please upload at least one image', 'warning')
        return
    }

    submitting.value = true
    const loadingId = showLoading('Creating gallery album...')

    try {
        await $fetch('/api/gallery', {
            method: 'POST',
            body: form.value
        })
        closeAlert(loadingId)
        showAlert('Gallery album created successfully!', 'success')
        router.push('/admin/gallery')
    } catch (e: any) {
        closeAlert(loadingId)
        showAlert(e.data?.message || 'Failed to create album', 'error')
    } finally {
        submitting.value = false
    }
}
</script>
