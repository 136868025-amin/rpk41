<template>
    <div class="w-full">
        <label class="block text-sm font-medium text-slate-700 mb-2">{{ label }}</label>

        <!-- Image Grid -->
        <div v-if="modelValue && modelValue.length > 0" class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div v-for="(img, index) in modelValue" :key="index"
                class="relative group aspect-square bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                <img :src="img" class="w-full h-full object-cover" />
                <div
                    class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button @click.prevent="removeImage(index)"
                        class="bg-red-600 text-white p-2 rounded-full shadow hover:bg-red-700 transition-colors"
                        title="Remove">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <!-- Upload Area -->
        <div class="relative border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-blue-500 hover:bg-blue-50 transition-colors cursor-pointer"
            @dragover.prevent="isDragging = true" @dragleave.prevent="isDragging = false" @drop.prevent="handleDrop"
            @click="triggerFileInput">
            <input ref="fileInput" type="file" accept="image/*" multiple class="hidden" @change="handleFileSelect" />

            <div v-if="uploading" class="flex flex-col items-center">
                <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-2"></div>
                <p class="text-sm text-slate-500">Uploading {{ uploadProgress }}...</p>
            </div>

            <div v-else class="flex flex-col items-center">
                <span class="text-4xl mb-2">🖼️</span>
                <p class="text-sm font-medium text-slate-700">Click to upload multiple images</p>
                <p class="text-xs text-slate-500 mt-1">SVG, PNG, JPG or GIF (max. 5MB)</p>
            </div>
        </div>

        <p v-if="error" class="mt-2 text-sm text-red-600">{{ error }}</p>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    modelValue?: string[]
    label?: string
}>()

const emit = defineEmits(['update:modelValue'])

const fileInput = ref<HTMLInputElement | null>(null)
const isDragging = ref(false)
const uploading = ref(false)
const error = ref('')
const uploadProgress = ref('')

const triggerFileInput = () => {
    fileInput.value?.click()
}

const handleFileSelect = (event: Event) => {
    const input = event.target as HTMLInputElement
    if (input.files && input.files.length > 0) {
        uploadFiles(Array.from(input.files))
    }
}

const handleDrop = (event: DragEvent) => {
    isDragging.value = false
    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
        uploadFiles(Array.from(event.dataTransfer.files))
    }
}

const uploadFiles = async (files: File[]) => {
    uploading.value = true
    error.value = ''

    const newImages = [...(props.modelValue || [])]
    let successCount = 0

    for (let i = 0; i < files.length; i++) {
        const file = files[i]
        uploadProgress.value = `${i + 1}/${files.length}`

        if (!file.type.startsWith('image/')) {
            continue
        }

        const formData = new FormData()
        formData.append('file', file)

        try {
            const res: any = await $fetch('/api/upload', {
                method: 'POST',
                body: formData
            })
            newImages.push(res.url)
            successCount++
        } catch (e: any) {
            console.error('Upload failed for file', file.name, e)
        }
    }

    if (successCount === 0 && files.length > 0) {
        error.value = 'Failed to upload images'
    }

    emit('update:modelValue', newImages)
    uploading.value = false
    uploadProgress.value = ''

    // Reset input
    if (fileInput.value) {
        fileInput.value.value = ''
    }
}

const removeImage = (index: number) => {
    const newImages = [...(props.modelValue || [])]
    newImages.splice(index, 1)
    emit('update:modelValue', newImages)
}
</script>
