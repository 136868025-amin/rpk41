<template>
    <div class="space-y-2">
        <label v-if="label" class="block text-sm font-medium text-slate-700">{{ label }}</label>

        <div class="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center transition-colors"
            :class="{ 'bg-blue-50 border-blue-400': isDragging, 'hover:bg-slate-50': !modelValue }"
            @dragover.prevent="isDragging = true" @dragleave.prevent="isDragging = false" @drop.prevent="handleDrop">

            <div v-if="!modelValue && !uploading">
                <div class="mb-3 text-4xl">📄</div>
                <p class="text-sm text-slate-500 mb-2">Drag & drop file here or</p>
                <label
                    class="cursor-pointer bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 inline-block">
                    <span>Browse File</span>
                    <input type="file" class="hidden" @change="handleFileSelect" :accept="accept" />
                </label>
                <p class="text-xs text-slate-400 mt-2">Supported: PDF, DOC, DOCX, XLS, XLSX</p>
            </div>

            <div v-else-if="uploading" class="py-4">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                <p class="text-sm text-slate-600">Uploading...</p>
            </div>

            <div v-else class="relative group bg-slate-100 p-4 rounded-lg flex items-center gap-4 text-left">
                <div class="text-3xl">
                    {{ getFileIcon(modelValue) }}
                </div>
                <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-slate-700 truncate">{{ getFileName(modelValue) }}</p>
                    <a :href="modelValue" target="_blank" class="text-xs text-blue-600 hover:underline">View File</a>
                </div>
                <button @click.prevent="removeFile" class="text-slate-400 hover:text-red-500 p-1">
                    ❌
                </button>
            </div>
        </div>

        <p v-if="error" class="text-sm text-red-600 mt-1">{{ error }}</p>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    modelValue: {
        type: String,
        default: ''
    },
    label: {
        type: String,
        default: ''
    },
    accept: {
        type: String,
        default: '.pdf,.doc,.docx,.xls,.xlsx'
    }
})

const emit = defineEmits(['update:modelValue'])

const isDragging = ref(false)
const uploading = ref(false)
const error = ref('')

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
    // Validate file type
    // Simple check, backend does real validation

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

const removeFile = () => {
    emit('update:modelValue', '')
}

const getFileName = (url: string) => {
    return url.split('/').pop() || 'File'
}

const getFileIcon = (url: string) => {
    if (url.endsWith('.pdf')) return '📕'
    if (url.endsWith('.doc') || url.endsWith('.docx')) return '📘'
    if (url.endsWith('.xls') || url.endsWith('.xlsx')) return '📗'
    return '📄'
}
</script>
