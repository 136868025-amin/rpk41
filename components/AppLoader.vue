<template>
    <Transition name="fade">
        <div v-if="isLoading"
            class="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm">
            <div class="relative flex flex-col items-center">
                <!-- Logo or Icon Animation -->
                <div class="mb-4 relative">
                    <div class="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin">
                    </div>
                    <div class="absolute inset-0 flex items-center justify-center">
                        <span class="text-xs font-bold text-primary-800">RPK 41</span>
                    </div>
                </div>

                <!-- Text -->
                <div class="text-center">
                    <h3 class="text-xl font-bold text-gray-800 mb-1 font-heading tracking-wide">กำลังโหลด</h3>
                    <p class="text-sm text-gray-500 animate-pulse">กรุณารอสักครู่...</p>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
const nuxtApp = useNuxtApp()
const { isLoading, startLoading, finishLoading } = useLoader()

onMounted(() => {
    // Initial load
    finishLoading('initial-load')

    // Hook into page navigation
    nuxtApp.hook('page:start', () => {
        startLoading('page-nav')
    })

    nuxtApp.hook('page:finish', () => {
        finishLoading('page-nav')
    })
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
