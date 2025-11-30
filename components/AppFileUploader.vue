<template>
    <div class="w-full">
        <label class="block text-sm font-medium text-slate-700 mb-2">{{ label }}</label>

        <!-- File Preview Area -->
        <div v-if="modelValue"
            class="relative group mb-4 w-full p-4 bg-slate-50 rounded-lg border border-slate-200 flex items-center gap-4">
            <div class="text-3xl">{{ getFileIcon(modelValue) }}</div>
            <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-slate-700 truncate">{{ getFileName(modelValue) }}</p>
                <a :href="modelValue" target="_blank" class="text-xs text-blue-600 hover:underline">View File</a>
            </div>
            <button @click.prevent="$emit('update:modelValue', '')"
                class="text-slate-400 hover:text-red-600 transition-colors">
                ❌
            </button>
        </div>

        <!-- Upload Area -->
        <div v-else
            class="relative border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-blue-500 hover:bg-blue-50 transition-colors cursor-pointer"
            @dragover.prevent="isDragging = true" @dragleave.prevent="isDragging = false" @drop.prevent="handleDrop"
            @click="triggerFileInput">
            <input ref="fileInput" type="file" :accept="accept" class="hidden" @change="handleFileSelect" />

            <div v-if="uploading" class="flex flex-col items-center">
                <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-2"></div>
                <p class="text-sm text-slate-500">Uploading...</p>
            </div>

            <div v-else class="flex flex-col items-center">
                <span class="text-4xl mb-2">📄</span>
                <p class="text-sm font-medium text-slate-700">Click to upload or drag and drop</p>
                <p class="text-xs text-slate-500 mt-1">PDF, DOC, XLS (max. 10MB)</p>
            </div>
        </div>

        <p v-if="error" class="mt-2 text-sm text-red-600">{{ error }}</p>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    modelValue?: string
    label?: string
    accept?: string
}>()

const emit = defineEmits(['update:modelValue'])

const fileInput = ref<HTMLInputElement | null>(null)
const isDragging = ref(false)
const uploading = ref(false)
const error = ref('')

const triggerFileInput = () => {
    fileInput.value?.click()
}

const handleFileSelect = (event: Event) => {
    const input = event.target as HTMLInputElement
    if (input.files && input.files[0]) {
        uploadFile(input.files[0])
    }
}

const handleDrop = (event: DragEvent) => {
    isDragging.value = false
    if (event.dataTransfer?.files && event.dataTransfer.files[0]) {
        uploadFile(event.dataTransfer.files[0])
    }
}

const uploadFile = async (file: File) => {
    // Basic validation (can be extended)
    if (file.size > 10 * 1024 * 1024) {
        error.value = 'File size exceeds 10MB limit.'
        return
    }

    uploading.value = true
    error.value = ''

    const formData = new FormData()
    formData.append('file', file)

    try {
        const res: any = await $fetch('/api/upload', {
            method: 'POST',
            body: formData
        })
        emit('update:modelValue', res.url)
    } catch (e: any) {
        error.value = e.data?.message || 'Upload failed'
    } finally {
        uploading.value = false
    }
}

const getFileName = (url: string) => {
    if (!url) return ''
    return url.split('/').pop()
}

const getFileIcon = (url: string) => {
    if (!url) return '📄'
    if (url.endsWith('.pdf')) return '📕'
    if (url.endsWith('.doc') || url.endsWith('.docx')) return '📘'
    if (url.endsWith('.xls') || url.endsWith('.xlsx')) return '📗'
    return '📄'
}
</script>
