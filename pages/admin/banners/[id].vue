<template>
    <NuxtLayout name="admin">
        <div class="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 p-8">
            <div class="flex justify-between items-center mb-8">
                <h1 class="text-2xl font-bold text-slate-800">
                    {{ isEditing ? 'Edit Banner' : 'Add Banner' }}
                </h1>
                <NuxtLink to="/admin/banners" class="text-slate-500 hover:text-slate-700">
                    Cancel
                </NuxtLink>
            </div>

            <div v-if="loading" class="text-center py-12">
                Loading...
            </div>

            <form v-else @submit.prevent="handleSubmit" class="space-y-6">
                <!-- Banner Image -->
                <ImageUploader v-model="form.imageUrl" label="Banner Image (1920x600 recommended)" />

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
                        {{ submitting ? 'Saving...' : (isEditing ? 'Update Banner' : 'Add Banner') }}
                    </button>
                </div>
            </form>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
import ImageUploader from '~/components/admin/ImageUploader.vue'

definePageMeta({
    middleware: 'auth'
})

const route = useRoute()
const router = useRouter()
const id = route.params.id as string
const isEditing = computed(() => id !== undefined)
const loading = ref(isEditing.value)
const submitting = ref(false)

const form = ref<any>({
    title: '',
    subtitle: '',
    imageUrl: '',
    link: '',
    orderIndex: 0,
    isActive: true
})

onMounted(async () => {
    if (isEditing.value) {
        try {
            const banner = await $fetch(`/api/banners/${id}`)
            form.value = banner
        } catch (e) {
            alert('Banner not found')
            router.push('/admin/banners')
        } finally {
            loading.value = false
        }
    }
})

const handleSubmit = async () => {
    submitting.value = true
    try {
        const url = isEditing.value ? `/api/banners/${id}` : '/api/banners'
        const method = isEditing.value ? 'PUT' : 'POST'

        await $fetch(url, {
            method,
            body: form.value
        })
        router.push('/admin/banners')
    } catch (e: any) {
        alert(e.data?.message || 'Failed to save')
    } finally {
        submitting.value = false
    }
}
</script>
