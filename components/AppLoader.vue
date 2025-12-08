<template>
    <!-- Top Progress Bar (YouTube-style) -->
    <Transition name="progress">
        <div v-if="isLoading"
            class="fixed top-0 left-0 right-0 z-[9999] h-1 bg-primary-100/50 backdrop-blur-sm overflow-hidden">
            <div class="h-full bg-primary-600 progress-bar"></div>
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
/* Progress bar animation */
.progress-bar {
    animation: loading 1.5s ease-in-out infinite;
}

@keyframes loading {
    0% {
        width: 0%;
        margin-left: 0%;
    }

    50% {
        width: 70%;
        margin-left: 15%;
    }

    100% {
        width: 100%;
        margin-left: 0%;
    }
}

/* Transition */
.progress-enter-active,
.progress-leave-active {
    transition: opacity 0.2s ease;
}

.progress-enter-from,
.progress-leave-to {
    opacity: 0;
}
</style>
