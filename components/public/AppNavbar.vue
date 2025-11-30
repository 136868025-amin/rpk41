<template>
    <nav class="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <!-- Logo -->
                <NuxtLink to="/" class="flex items-center gap-3 hover:opacity-80 transition-opacity">
                    <div class="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                        ร
                    </div>
                    <div class="hidden sm:block">
                        <div class="text-lg font-bold text-slate-800">โรงเรียนราชประชานุเคราะห์ 41</div>
                        <div class="text-xs text-slate-500">จังหวัดยะลา</div>
                    </div>
                </NuxtLink>

                <!-- Desktop Menu -->
                <div class="hidden md:flex items-center gap-1">
                    <NuxtLink v-for="item in menuItems" :key="item.path" :to="item.path"
                        class="px-4 py-2 text-sm font-medium rounded-lg transition-colors"
                        :class="isActive(item.path) 
                            ? 'text-primary-600 bg-primary-50' 
                            : 'text-slate-600 hover:text-primary-600 hover:bg-primary-50'">
                        {{ item.label }}
                    </NuxtLink>
                </div>

                <!-- Mobile Menu Button -->
                <button @click="toggleMobileMenu" class="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors">
                    <svg class="w-6 h-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path v-if="!isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <!-- Mobile Menu -->
            <Transition
                enter-active-class="transition-all duration-200"
                enter-from-class="opacity-0 max-h-0"
                enter-to-class="opacity-100 max-h-96"
                leave-active-class="transition-all duration-200"
                leave-from-class="opacity-100 max-h-96"
                leave-to-class="opacity-0 max-h-0">
                <div v-if="isMobileMenuOpen" class="md:hidden py-4 border-t border-slate-200">
                    <NuxtLink v-for="item in menuItems" :key="item.path" :to="item.path"
                        @click="closeMobileMenu"
                        class="block px-4 py-3 text-sm font-medium rounded-lg transition-colors"
                        :class="isActive(item.path) 
                            ? 'text-primary-600 bg-primary-50' 
                            : 'text-slate-600 hover:text-primary-600 hover:bg-primary-50'">
                        {{ item.label }}
                    </NuxtLink>
                </div>
            </Transition>
        </div>
    </nav>
</template>

<script setup lang="ts">
const route = useRoute()
const isMobileMenuOpen = ref(false)

const menuItems = [
    { path: '/', label: 'หน้าหลัก' },
    { path: '/news', label: 'ข่าวสาร' },
    { path: '/gallery', label: 'แกลเลอรี่' },
    { path: '/calendar', label: 'ปฏิทิน' },
    { path: '/personnel', label: 'บุคลากร' },
    { path: '/about', label: 'เกี่ยวกับเรา' },
    { path: '/contact', label: 'ติดต่อเรา' },
]

const isActive = (path: string) => {
    if (path === '/') {
        return route.path === '/'
    }
    return route.path.startsWith(path)
}

const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
    isMobileMenuOpen.value = false
}

// Close mobile menu on route change
watch(() => route.path, () => {
    closeMobileMenu()
})
</script>
