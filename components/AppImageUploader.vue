<template>
  <div class="w-full">
    <label class="block text-sm font-medium text-slate-700 mb-2">{{ label }}</label>
    
    <!-- Preview Area -->
    <div v-if="modelValue" class="relative group mb-4 w-full h-64 bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
      <img :src="modelValue" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
        <button @click.prevent="$emit('update:modelValue', '')" class="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 transition-colors">
          Remove Image
        </button>
      </div>
    </div>

    <!-- Upload Area -->
    <div
      v-else
      class="relative border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-blue-500 hover:bg-blue-50 transition-colors cursor-pointer"
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="handleDrop"
      @click="triggerFileInput"
    >
      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        class="hidden"
        @change="handleFileSelect"
      />
      
      <div v-if="uploading" class="flex flex-col items-center">
        <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-2"></div>
        <p class="text-sm text-slate-500">Uploading...</p>
      </div>
      
      <div v-else class="flex flex-col items-center">
        <span class="text-4xl mb-2">☁️</span>
        <p class="text-sm font-medium text-slate-700">Click to upload or drag and drop</p>
        <p class="text-xs text-slate-500 mt-1">SVG, PNG, JPG or GIF (max. 5MB)</p>
      </div>
    </div>

    <p v-if="error" class="mt-2 text-sm text-red-600">{{ error }}</p>
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
    error.value = 'Please upload an image file.'
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
</script>
