<template>
    <Teleport to="body">
        <Transition enter-active-class="transition-opacity duration-300" enter-from-class="opacity-0"
            enter-to-class="opacity-100" leave-active-class="transition-opacity duration-200"
            leave-from-class="opacity-100" leave-to-class="opacity-0">
            <div v-if="isOpen" @click="close"
                class="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">

                <!-- Close Button -->
                <button @click="close"
                    class="fixed top-4 right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors backdrop-blur-sm z-10">
                    <span class="text-2xl">✕</span>
                </button>

                <!-- Image Counter -->
                <div v-if="images.length > 1"
                    class="fixed top-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                    {{ currentIndex + 1 }} / {{ images.length }}
                </div>

                <!-- Download Button -->
                <a :href="currentImage" download target="_blank"
                    class="fixed top-4 left-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors backdrop-blur-sm">
                    <span class="text-xl">⬇️</span>
                </a>

                <!-- Main Image -->
                <div @click.stop class="relative max-w-7xl max-h-full flex items-center justify-center">
                    <img :src="currentImage" :alt="`Image ${currentIndex + 1}`"
                        class="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                        @load="imageLoaded = true" />

                    <!-- Loading Indicator -->
                    <div v-if="!imageLoaded" class="absolute inset-0 flex items-center justify-center">
                        <div class="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent">
                        </div>
                    </div>
                </div>

                <!-- Navigation Arrows -->
                <template v-if="images.length > 1">
                    <button @click.stop="prev"
                        class="fixed left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors backdrop-blur-sm disabled:opacity-30"
                        :disabled="currentIndex === 0">
                        <span class="text-2xl">←</span>
                    </button>
                    <button @click.stop="next"
                        class="fixed right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors backdrop-blur-sm disabled:opacity-30"
                        :disabled="currentIndex === images.length - 1">
                        <span class="text-2xl">→</span>
                    </button>
                </template>

                <!-- Thumbnails (if multiple images) -->
                <div v-if="images.length > 1"
                    class="fixed bottom-4 left-1/2 -translate-x-1/2 flex gap-2 max-w-full overflow-x-auto px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg">
                    <button v-for="(img, idx) in images" :key="idx" @click.stop="currentIndex = idx"
                        class="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all"
                        :class="idx === currentIndex ? 'border-white scale-110' : 'border-white/30 hover:border-white/60 opacity-70 hover:opacity-100'">
                        <img :src="img" :alt="`Thumbnail ${idx + 1}`" class="w-full h-full object-cover" />
                    </button>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
const props = defineProps<{
    images: string[]
    initialIndex?: number
}>()

const emit = defineEmits<{
    close: []
}>()

const isOpen = ref(false)
const currentIndex = ref(props.initialIndex || 0)
const imageLoaded = ref(false)

const currentImage = computed(() => props.images[currentIndex.value] || '')

const open = (index: number = 0) => {
    currentIndex.value = index
    isOpen.value = true
    imageLoaded.value = false
    document.body.style.overflow = 'hidden'
}

const close = () => {
    isOpen.value = false
    document.body.style.overflow = ''
    emit('close')
}

const next = () => {
    if (currentIndex.value < props.images.length - 1) {
        currentIndex.value++
        imageLoaded.value = false
    }
}

const prev = () => {
    if (currentIndex.value > 0) {
        currentIndex.value--
        imageLoaded.value = false
    }
}

// Keyboard navigation
const handleKeydown = (e: KeyboardEvent) => {
    if (!isOpen.value) return

    if (e.key === 'Escape') close()
    if (e.key === 'ArrowRight') next()
    if (e.key === 'ArrowLeft') prev()
}

onMounted(() => {
    window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown)
    document.body.style.overflow = ''
})

// Watch for image changes
watch(currentIndex, () => {
    imageLoaded.value = false
})

defineExpose({
    open,
    close
})
</script>
