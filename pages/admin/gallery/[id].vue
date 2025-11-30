<template>
    <NuxtLayout name="admin">
        <div class="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 p-8">
            <div class="flex justify-between items-center mb-8">
                <h1 class="text-2xl font-bold text-slate-800">Edit Album</h1>
                <NuxtLink to="/admin/gallery" class="text-slate-500 hover:text-slate-700">
                    Cancel
                </NuxtLink>
            </div>

            <div v-if="loading" class="text-center py-12">
                Loading...
            </div>

            <form v-else @submit.prevent="handleSubmit" class="space-y-6">
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

                <!-- Gallery Images with Lightbox Preview -->
                <div>
                    <label class="block text-sm font-medium text-slate-700 mb-3">Gallery Photos</label>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div v-for="(img, idx) in form.images" :key="idx" @click="openLightbox(idx)"
                            class="relative aspect-square rounded-lg overflow-hidden border-2 border-slate-200 hover:border-blue-500 cursor-pointer group transition-all">
                            <img :src="img" :alt="`Image ${idx + 1}`" class="w-full h-full object-cover" />
                            <div
                                class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span class="text-white text-2xl">🔍</span>
                            </div>
                        </div>
                    </div>
                    <AppMultiImageUploader v-model="form.images" label="" />
                </div>

                <!-- Lightbox -->
                <AppLightbox ref="lightbox" :images="form.images" @close="() => { }" />

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
                        {{ submitting ? 'Saving...' : 'Update Album' }}
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

const route = useRoute()
const router = useRouter()
const id = route.params.id as string
const loading = ref(true)
const submitting = ref(false)
const lightbox = ref<any>(null)

const form = ref<any>({
    title: '',
    description: '',
    eventDate: '',
    category: 'general',
    isHighlight: false,
    coverImage: '',
    images: [],
    isPublished: true
})

const openLightbox = (index: number) => {
    lightbox.value?.open(index)
}

onMounted(async () => {
    try {
        const res: any = await $fetch(`/api/gallery/${id}`)
        const data = res.data
        form.value = {
            ...data,
            eventDate: data.eventDate ? new Date(data.eventDate).toISOString().split('T')[0] : ''
        }
    } catch (e) {
        alert('Album not found')
        router.push('/admin/gallery')
    } finally {
        loading.value = false
    }
})

const handleSubmit = async () => {
    submitting.value = true
    try {
        await $fetch(`/api/gallery/${id}`, {
            method: 'PUT',
            body: form.value
        })
        router.push('/admin/gallery')
    } catch (e: any) {
        alert(e.data?.message || 'Failed to update')
    } finally {
        submitting.value = false
    }
}
</script>
