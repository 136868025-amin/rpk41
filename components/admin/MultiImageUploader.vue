<template>
    <div class="space-y-2">
        <label v-if="label" class="block text-sm font-medium text-slate-700">
            {{ label }}
        </label>

        <div class="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:bg-slate-50 transition-colors cursor-pointer relative"
            :class="{ 'border-blue-500 bg-blue-50': isDragging }" @dragover.prevent="isDragging = true"
            @dragleave.prevent="isDragging = false" @drop.prevent="handleDrop" @click="triggerFileInput">
            <input ref="fileInput" type="file" accept="image/*" multiple class="hidden" @change="handleFileSelect" />

            <div class="space-y-2">
                <div class="text-4xl">📷</div>
                <div class="text-sm text-slate-500">
                    <span class="font-semibold text-blue-600">Click to upload</span> or drag and drop
                </div>
                <p class="text-xs text-slate-400">PNG, JPG, GIF up to 5MB</p>
            </div>

            <!-- Loading Overlay -->
            <div v-if="uploading" class="absolute inset-0 bg-white/80 flex items-center justify-center rounded-lg z-10">
                <div class="flex flex-col items-center">
                    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
                    <span class="text-sm text-blue-600 font-medium">Uploading...</span>
                </div>
            </div>
        </div>

        <!-- Preview Grid -->
        <div v-if="modelValue && modelValue.length > 0" class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <div v-for="(url, index) in modelValue" :key="index" class="relative group aspect-square">
                <img :src="url" class="w-full h-full object-cover rounded shadow-sm" />
                <div
                    class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded">
                    <button @click.stop="removeImage(index)"
                        class="text-white bg-red-500 p-2 rounded-full hover:bg-red-600">
                        🗑️
                    </button>
                </div>
            </div>
        </div>

        <div v-if="error" class="text-xs text-red-500 mt-1">
            {{ error }}
        </div>
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
    // Filter for images only
    const imageFiles = files.filter(file => file.type.startsWith('image/'))

    if (imageFiles.length === 0) {
        error.value = 'Please select valid image files'
        return
    }

    if (imageFiles.length !== files.length) {
        error.value = 'Some files were skipped because they are not images'
    } else {
        error.value = ''
    }

    uploading.value = true

    const newUrls: string[] = []
    const currentUrls = props.modelValue || []

    try {
        // Upload files in parallel
        const uploadPromises = imageFiles.map(async (file) => {
            const formData = new FormData()
            formData.append('file', file)

            const res: any = await $fetch('/api/upload', {
                method: 'POST',
                body: formData
            })
            return res.url
        })

        const uploadedUrls = await Promise.all(uploadPromises)
        emit('update:modelValue', [...currentUrls, ...uploadedUrls])
    } catch (e: any) {
        error.value = e.data?.message || 'Upload failed'
    } finally {
        uploading.value = false
    }
}

const removeImage = (index: number) => {
    const currentUrls = [...(props.modelValue || [])]
    currentUrls.splice(index, 1)
    emit('update:modelValue', currentUrls)
}
</script>
