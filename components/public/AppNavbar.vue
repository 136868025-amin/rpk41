<template>
    <nav
        class="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm border-b border-slate-200 dark:border-slate-700">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <NuxtLink to="/" class="flex items-center gap-3 hover:opacity-80 transition-opacity">
                    <div
                        class="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center text-white font-bold text-xl overflow-hidden">

                        <ClientOnly>
                            <NuxtImg v-if="configStore.config?.logo" :src="configStore.config.logo"
                                class="w-full h-full object-cover" />
                            <span v-else>ร</span>
                        </ClientOnly>

                    </div>
                    <div class="hidden sm:block">

                        <ClientOnly>
                            <div class="text-lg font-bold text-slate-800 dark:text-white">{{
                                configStore.config?.schoolName ||
                                'โรงเรียนราชประชานุเคราะห์ 41' }}</div>
                            <div class="text-xs text-slate-500 dark:text-slate-400">{{
                                configStore.config?.location?.province ?
                                    `จังหวัด${configStore.config.location.province}` : 'จังหวัดยะลา' }}</div>
                        </ClientOnly>

                    </div>
                </NuxtLink>

                <div class="hidden lg:flex items-center gap-1">
                    <NuxtLink v-for="item in menuItems" :key="item.path" :to="item.path"
                        class="px-3 py-2 text-sm font-medium rounded-lg transition-colors"
                        :class="isActive(item.path)
                            ? 'text-primary-600 bg-primary-50 dark:bg-primary-900/30'
                            : 'text-slate-600 dark:text-slate-300 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-slate-800'">
                        {{ item.label }}
                    </NuxtLink>

                    <div class="relative ml-2">
                        <div class="flex items-center">
                            <input v-if="isSearchOpen" v-model="searchQuery" @keyup.enter="handleSearch" type="text"
                                class="w-48 px-3 py-1.5 text-sm border border-slate-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none animate-fade-in"
                                placeholder="ค้นหา..." ref="searchInput" />
                            <button @click="toggleSearch"
                                class="p-2 text-slate-600 hover:text-primary-600 transition-colors dark:text-slate-300">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Dark Mode Toggle - Desktop Only (lg+) -->
                <button @click="toggleDarkMode"
                    class="hidden lg:block p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-primary-600 transition-colors dark:text-slate-300 dark:hover:bg-slate-700">
                    <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                </button>

                <!-- Mobile/Tablet Menu Button (shows on < lg) -->
                <div class="flex lg:hidden items-center gap-2">
                    <!-- Dark mode toggle for tablet/mobile only -->
                    <button @click="toggleDarkMode"
                        class="p-2 rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors">
                        <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                    </button>

                    <button @click="toggleMobileMenu"
                        class="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                        <svg class="w-6 h-6 text-slate-600 dark:text-slate-300 transition-transform"
                            :class="{ 'rotate-90': isMobileMenuOpen }" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path v-if="!isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>

            <Transition enter-active-class="transition-all duration-300 ease-out"
                enter-from-class="opacity-0 -translate-y-2" enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition-all duration-200 ease-in" leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 -translate-y-2">
                <div v-if="isMobileMenuOpen"
                    class="lg:hidden py-4 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
                    <!-- Mobile Search -->
                    <div class="px-4 pb-4">
                        <div class="relative">
                            <input v-model="searchQuery" @keyup.enter="handleSearch" type="text"
                                class="w-full px-4 py-2.5 text-sm border border-slate-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white rounded-xl focus:ring-2 focus:ring-primary-500 focus:outline-none"
                                placeholder="ค้นหา..." />
                            <button @click="handleSearch"
                                class="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-primary-600 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <!-- Mobile Menu Items with stagger -->
                    <div class="space-y-1 px-2">
                        <NuxtLink v-for="(item, index) in menuItems" :key="item.path" :to="item.path"
                            @click="closeMobileMenu"
                            class="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all"
                            :class="isActive(item.path)
                                ? 'text-primary-600 bg-primary-50 dark:bg-primary-900/30'
                                : 'text-slate-600 dark:text-slate-300 hover:text-primary-600 hover:bg-slate-50 dark:hover:bg-slate-800'"
                            :style="{ animationDelay: `${index * 50}ms` }">
                            <span class="w-2 h-2 rounded-full"
                                :class="isActive(item.path) ? 'bg-primary-600' : 'bg-slate-300 dark:bg-slate-600'"></span>
                            {{ item.label }}
                        </NuxtLink>
                    </div>

                    <!-- Mobile Dark Mode Toggle -->
                    <div class="mt-4 pt-4 px-4 border-t border-slate-200 dark:border-slate-700 hidden md:block">
                        <button @click="toggleDarkMode"
                            class="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-slate-600 dark:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                            <span class="flex items-center gap-3">
                                <span class="w-2 h-2 rounded-full bg-amber-400"></span>
                                {{ isDark ? 'โหมดสว่าง' : 'โหมดมืด' }}
                            </span>
                            <div class="w-10 h-6 rounded-full flex items-center px-1 transition-colors"
                                :class="isDark ? 'bg-primary-600' : 'bg-slate-300'">
                                <div class="w-4 h-4 bg-white rounded-full shadow-sm transition-transform"
                                    :class="isDark ? 'translate-x-4' : 'translate-x-0'"></div>
                            </div>
                        </button>
                    </div>
                </div>
            </Transition>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { useConfigStore } from '~/stores/config'
const configStore = useConfigStore()
const { isDark, toggleDarkMode } = useDarkMode()
const route = useRoute()
const isMobileMenuOpen = ref(false)

const menuItems = [
    { path: '/', label: 'หน้าหลัก' },
    { path: '/news', label: 'ข่าวสาร' },
    { path: '/gallery', label: 'แกลเลอรี่' },
    { path: '/calendar', label: 'ปฏิทิน' },
    { path: '/documents', label: 'เอกสาร' },
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