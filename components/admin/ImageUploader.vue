<template>
    <div class="space-y-2">
        <label v-if="label" class="block text-sm font-medium text-slate-700">
            {{ label }}
        </label>

        <div class="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:bg-slate-50 transition-colors cursor-pointer relative"
            :class="{ 'border-blue-500 bg-blue-50': isDragging }" @dragover.prevent="isDragging = true"
            @dragleave.prevent="isDragging = false" @drop.prevent="handleDrop" @click="triggerFileInput">
            <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="handleFileSelect" />

            <!-- Preview -->
            <div v-if="modelValue" class="relative group">
                <img :src="modelValue" class="max-h-48 mx-auto rounded shadow-sm object-contain" />
                <div
                    class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded">
                    <button @click.stop="removeImage" class="text-white bg-red-500 p-2 rounded-full hover:bg-red-600">
                        🗑️ Remove
                    </button>
                </div>
            </div>

            <!-- Upload Placeholder -->
            <div v-else class="space-y-2">
                <div class="text-4xl">📷</div>
                <div class="text-sm text-slate-500">
                    <span class="font-semibold text-blue-600">Click to upload</span> or drag and drop
                </div>
                <p class="text-xs text-slate-400">PNG, JPG, GIF up to 5MB</p>
            </div>

            <!-- Loading Overlay -->
            <div v-if="uploading" class="absolute inset-0 bg-white/80 flex items-center justify-center rounded-lg">
                <div class="flex flex-col items-center">
                    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
                    <span class="text-sm text-blue-600 font-medium">Uploading...</span>
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
    modelValue?: string
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
    if (!file.type.startsWith('image/')) {
        error.value = 'Please select an image file'
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

const removeImage = () => {
    emit('update:modelValue', '')
}
</script>
