<template>
    <NuxtLayout name="admin">
        <div class="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 p-8">
            <div class="flex justify-between items-center mb-8">
                <h1 class="text-2xl font-bold text-slate-800">
                    <span v-if="loading">Edit Document</span>
                    <span v-else>Edit Document: {{ form.title }}</span>
                </h1>
                <NuxtLink to="/admin/documents" class="text-slate-500 hover:text-slate-700">
                    Cancel
                </NuxtLink>
            </div>

            <div v-if="loading" class="text-center py-12">
                Loading...
            </div>

            <form v-else @submit.prevent="handleSubmit" class="space-y-6">
                <!-- Title -->
                <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1">Document Title</label>
                    <input v-model="form.title" type="text" required
                        class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>

                <!-- Category -->
                <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1">Category</label>
                    <select v-model="form.category"
                        class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none">
                        <option value="form">Form (แบบฟอร์ม)</option>
                        <option value="regulation">Regulation (ระเบียบการ)</option>
                        <option value="academic">Academic (วิชาการ)</option>
                        <option value="other">Other (อื่นๆ)</option>
                    </select>
                </div>

                <!-- File Upload -->
                <FileUploader v-model="form.filePath" label="Document File" />

                <!-- Submit Button -->
                <div class="pt-4 border-t border-slate-100 flex justify-end">
                    <button type="submit"
                        class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold shadow-lg transition-transform transform hover:scale-105"
                        :disabled="submitting">
                        {{ submitting ? 'Saving...' : 'Update Document' }}
                    </button>
                </div>
            </form>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
import FileUploader from '~/components/admin/FileUploader.vue'

definePageMeta({
    middleware: 'auth'
})

const route = useRoute()
const router = useRouter()
const id = route.params.id as string
const loading = ref(true)
const submitting = ref(false)

const form = ref<any>({
    title: '',
    category: 'other',
    filePath: '',
    fileType: 'pdf',
    isPublished: true
})

onMounted(async () => {
    try {
        const res: any = await $fetch(`/api/documents/${id}`)
        form.value = res.data
    } catch (e) {
        alert('Document not found')
        router.push('/admin/documents')
    } finally {
        loading.value = false
    }
})

const handleSubmit = async () => {
    if (!form.value.filePath) {
        alert('Please upload a file')
        return
    }

    submitting.value = true

    // Auto-detect file type from extension
    const ext = form.value.filePath.split('.').pop()
    form.value.fileType = ext || 'file'

    try {
        await $fetch(`/api/documents/${id}`, {
            method: 'PUT',
            body: form.value
        })
        router.push('/admin/documents')
    } catch (e: any) {
        alert(e.data?.message || 'Failed to update')
    } finally {
        submitting.value = false
    }
}
</script>
