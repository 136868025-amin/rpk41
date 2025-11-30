<template>
    <NuxtLayout name="admin">
        <div class="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 p-8">
            <div class="flex justify-between items-center mb-8">
                <h1 class="text-2xl font-bold text-slate-800">Add Banner</h1>
                <NuxtLink to="/admin/banners" class="text-slate-500 hover:text-slate-700">
                    Cancel
                </NuxtLink>
            </div>

            <form @submit.prevent="handleSubmit" class="space-y-6">
                <!-- Banner Image -->
                <AppImageUploader v-model="form.imageUrl" label="Banner Image (1920x600 recommended)" />

                <!-- Title -->
                <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1">Title</label>
                    <input v-model="form.title" type="text" required
                        class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>

                <!-- Subtitle -->
                <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1">Subtitle</label>
                    <input v-model="form.subtitle" type="text"
                        class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Link -->
                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-1">Link URL (Optional)</label>
                        <input v-model="form.link" type="text" placeholder="/news/..."
                            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                    </div>

                    <!-- Order Index -->
                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-1">Order Index</label>
                        <input v-model="form.orderIndex" type="number"
                            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                    </div>
                </div>

                <!-- Status -->
                <div class="flex items-center space-x-3 bg-slate-50 p-4 rounded-lg">
                    <input v-model="form.isActive" type="checkbox" id="isActive"
                        class="h-5 w-5 text-blue-600 rounded focus:ring-blue-500" />
                    <label for="isActive" class="font-medium text-slate-700">Active (Show on Homepage)</label>
                </div>

                <!-- Submit Button -->
                <div class="pt-4 border-t border-slate-100 flex justify-end">
                    <button type="submit"
                        class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold shadow-lg transition-transform transform hover:scale-105"
                        :disabled="submitting">
                        {{ submitting ? 'Saving...' : 'Add Banner' }}
                    </button>
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

const router = useRouter()
const { showAlert } = useAlert()
const submitting = ref(false)

const form = ref<any>({
    title: '',
    subtitle: '',
    imageUrl: '',
    link: '',
    orderIndex: 0,
    isActive: true
})

const handleSubmit = async () => {
    if (!form.value.imageUrl) {
        showAlert('Please upload a banner image', 'warning')
        return
    }

    submitting.value = true
    try {
        await $fetch('/api/banners', {
            method: 'POST',
            body: form.value
        })
        showAlert('Banner created successfully', 'success')
        router.push('/admin/banners')
    } catch (e: any) {
        showAlert(e.data?.message || 'Failed to save', 'error')
    } finally {
        submitting.value = false
    }
}
</script>
