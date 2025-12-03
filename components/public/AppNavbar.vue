<template>
    <nav class="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <!-- Logo -->
                <NuxtLink to="/" class="flex items-center gap-3 hover:opacity-80 transition-opacity">
                    <div
                        class="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center text-white font-bold text-xl overflow-hidden">
                        <img v-if="configStore.config?.logo" :src="configStore.config.logo"
                            class="w-full h-full object-cover" />
                        <span v-else>ร</span>
                    </div>
                    <div class="hidden sm:block">
                        <div class="text-lg font-bold text-slate-800">{{ configStore.config?.schoolName ||
                            'โรงเรียนราชประชานุเคราะห์ 41' }}</div>
                        <div class="text-xs text-slate-500">{{ configStore.config?.location?.province ?
                            `จังหวัด${configStore.config.location.province}` : 'จังหวัดยะลา' }}</div>
                    </div>
                </NuxtLink>

                <!-- Desktop Menu -->
                <div class="hidden md:flex items-center gap-1">
                    <NuxtLink v-for="item in menuItems" :key="item.path" :to="item.path"
                        class="px-4 py-2 text-sm font-medium rounded-lg transition-colors" :class="isActive(item.path)
                            ? 'text-primary-600 bg-primary-50'
                            : 'text-slate-600 hover:text-primary-600 hover:bg-primary-50'">
                        {{ item.label }}
                    </NuxtLink>

                    <!-- Search Bar -->
                    <div class="relative ml-2">
                        <div class="flex items-center">
                            <input v-if="isSearchOpen" v-model="searchQuery" @keyup.enter="handleSearch" type="text"
                                class="w-48 px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none animate-fade-in"
                                placeholder="ค้นหา..." ref="searchInput" />
                            <button @click="toggleSearch"
                                class="p-2 text-slate-600 hover:text-primary-600 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Mobile Menu Button -->
                <button @click="toggleMobileMenu" class="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors">
                    <svg class="w-6 h-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path v-if="!isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h16" />
                        <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <!-- Mobile Menu -->
            <Transition enter-active-class="transition-all duration-200" enter-from-class="opacity-0 max-h-0"
                enter-to-class="opacity-100 max-h-96" leave-active-class="transition-all duration-200"
                leave-from-class="opacity-100 max-h-96" leave-to-class="opacity-0 max-h-0">
                <div v-if="isMobileMenuOpen" class="md:hidden py-4 border-t border-slate-200">
                    <!-- Mobile Search -->
                    <div class="px-4 pb-4">
                        <div class="relative">
                            <input v-model="searchQuery" @keyup.enter="handleSearch" type="text"
                                class="w-full px-4 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none"
                                placeholder="ค้นหา..." />
                            <button @click="handleSearch"
                                class="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-slate-400">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <NuxtLink v-for="item in menuItems" :key="item.path" :to="item.path" @click="closeMobileMenu"
                        class="block px-4 py-3 text-sm font-medium rounded-lg transition-colors" :class="isActive(item.path)
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
import { useConfigStore } from '~/stores/config'
const configStore = useConfigStore()
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

const isSearchOpen = ref(false)
const searchQuery = ref('')
const searchInput = ref<HTMLInputElement | null>(null)
const router = useRouter()

const toggleSearch = () => {
    isSearchOpen.value = !isSearchOpen.value
    if (isSearchOpen.value) {
        setTimeout(() => {
            searchInput.value?.focus()
        }, 100)
    }
}

const handleSearch = () => {
    if (searchQuery.value.trim()) {
        router.push({ path: '/search', query: { q: searchQuery.value } })
        isSearchOpen.value = false
        searchQuery.value = ''
    }
}

// Close mobile menu on route change
watch(() => route.path, () => {
    closeMobileMenu()
    isSearchOpen.value = false
})
</script>

<style scoped>
.animate-fade-in {
    animation: fadeIn 0.2s ease-in-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateX(10px);
    }

    to {
        opacity: 1;
        transform: translateX(0);
    }
}
</style>
