<template>
    <section class="relative h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden">
        <!-- Background Image -->
        <div class="absolute inset-0">
            <img :src="props.backgroundImage" alt="School Background" class="w-full h-full object-cover" />
            <!-- Gradient Overlay -->
            <div class="absolute inset-0 bg-gradient-to-r from-primary-600/90 to-primary-800/90"></div>
        </div>

        <!-- Content -->
        <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <!-- School Name -->
            <h1 class="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
                โรงเรียนราชประชานุเคราะห์ 41
            </h1>
            <p class="text-xl md:text-2xl mb-2 text-primary-100">
                Ratchaprachanukroh 41 School
            </p>
            <p class="text-lg md:text-xl mb-8 text-primary-50">
                {{ props.slogan }}
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

            <!-- Scroll Indicator -->
            <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
    backgroundImage?: string
    slogan?: string
}>(), {
    backgroundImage: 'https://placehold.co/1920x1080',
    slogan: 'มุ่งมั่น พัฒนา ก้าวไกล สู่สากล'
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
