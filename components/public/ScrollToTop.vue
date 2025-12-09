<template>
    <Transition enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 translate-y-4 scale-90" enter-to-class="opacity-100 translate-y-0 scale-100"
        leave-active-class="transition-all duration-200 ease-in" leave-from-class="opacity-100 translate-y-0 scale-100"
        leave-to-class="opacity-0 translate-y-4 scale-90">
        <button v-show="isVisible" @click="scrollToTop"
            class="fixed bottom-6 right-6 z-40 w-12 h-12 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center group"
            aria-label="เลื่อนกลับด้านบน">
            <svg class="w-6 h-6 group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
        </button>
    </Transition>
</template>

<script setup lang="ts">
const isVisible = ref(false)

const checkScroll = () => {
    isVisible.value = window.scrollY > 300
}

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}

onMounted(() => {
    window.addEventListener('scroll', checkScroll, { passive: true })
    checkScroll()
})

onUnmounted(() => {
    window.removeEventListener('scroll', checkScroll)
})
</script>
