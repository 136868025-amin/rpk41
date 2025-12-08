<template>
    <section class="relative h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden">
        <!-- Background Images Slider -->
        <div class="absolute inset-0">
            <!-- All banner images stacked, only one visible at a time -->
            <div v-for="(banner, index) in banners" :key="index"
                class="absolute inset-0 transition-opacity duration-1000"
                :class="currentIndex === index ? 'opacity-100 z-10' : 'opacity-0 z-0'">
                <NuxtImg :src="banner.imageUrl" :alt="banner.title || 'Banner'" class="w-full h-full object-cover"
                    :loading="index === 0 ? 'eager' : 'lazy'" />
            </div>
            <!-- Gradient Overlay -->
            <div class="absolute inset-0 z-20 bg-gradient-to-r from-primary-600/90 to-primary-800/90"></div>
        </div>

        <!-- Content -->
        <div class="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <!-- School Name -->
            <h1 class="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
                โรงเรียนราชประชานุเคราะห์ 41
            </h1>
            <p class="text-xl md:text-2xl mb-2 text-primary-100">
                Ratchaprachanukroh 41 School
            </p>
            <p class="text-lg md:text-xl mb-8 text-primary-50">
                {{ currentBanner?.title || slogan }}
            </p>

            <!-- CTA Buttons -->
            <div class="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <NuxtLink to="/about"
                    class="px-8 py-3 bg-white text-primary-600 rounded-lg font-bold hover:bg-primary-50 transition-colors shadow-lg">
                    เกี่ยวกับเรา
                </NuxtLink>
                <NuxtLink to="/news"
                    class="px-8 py-3 bg-primary-700 text-white rounded-lg font-bold hover:bg-primary-800 transition-colors shadow-lg border-2 border-white/20">
                    ดูข่าวสาร
                </NuxtLink>
            </div>
        </div>

        <!-- Slide Indicators -->
        <div v-if="banners.length > 1" class="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex gap-2">
            <button v-for="(_, index) in banners" :key="index" @click="goToSlide(index)"
                class="w-3 h-3 rounded-full transition-all duration-300 cursor-pointer" :class="currentIndex === index
                    ? 'bg-white w-8'
                    : 'bg-white/50 hover:bg-white/80'">
            </button>
        </div>

        <!-- Navigation Arrows -->
        <button v-if="banners.length > 1" @click="prevSlide"
            class="absolute left-4 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-white/20 hover:bg-white/40 transition-colors backdrop-blur-sm cursor-pointer">
            <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
        </button>
        <button v-if="banners.length > 1" @click="nextSlide"
            class="absolute right-4 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-white/20 hover:bg-white/40 transition-colors backdrop-blur-sm cursor-pointer">
            <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
        </button>
    </section>
</template>

<script setup lang="ts">
interface Banner {
    imageUrl: string
    title?: string
}

const props = withDefaults(defineProps<{
    banners?: Banner[]
    slogan?: string
}>(), {
    banners: () => [],
    slogan: 'มุ่งมั่น พัฒนา ก้าวไกล สู่สากล'
})

const currentIndex = ref(0)
const autoplayInterval = ref<ReturnType<typeof setInterval> | null>(null)

const currentBanner = computed(() => props.banners[currentIndex.value])

const nextSlide = () => {
    if (props.banners.length > 1) {
        currentIndex.value = (currentIndex.value + 1) % props.banners.length
    }
}

const prevSlide = () => {
    if (props.banners.length > 1) {
        currentIndex.value = (currentIndex.value - 1 + props.banners.length) % props.banners.length
    }
}

const goToSlide = (index: number) => {
    currentIndex.value = index
    resetAutoplay()
}

const resetAutoplay = () => {
    if (autoplayInterval.value) {
        clearInterval(autoplayInterval.value)
    }
    startAutoplay()
}

const startAutoplay = () => {
    if (props.banners.length > 1) {
        autoplayInterval.value = setInterval(nextSlide, 5000) // Change every 5 seconds
    }
}

onMounted(() => {
    startAutoplay()
})

onUnmounted(() => {
    if (autoplayInterval.value) {
        clearInterval(autoplayInterval.value)
    }
})
</script>

<style scoped>
@keyframes fade-in {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in {
    animation: fade-in 1s ease-out;
}
</style>
