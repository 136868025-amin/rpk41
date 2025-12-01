<template>
    <div class="flex min-h-screen bg-slate-50 dark:bg-slate-900 font-sans">
        <!-- Global Alert -->
        <AppAlert />

        <!-- Mobile Sidebar Overlay -->
        <Transition enter-active-class="transition-opacity ease-linear duration-300" enter-from-class="opacity-0"
            enter-to-class="opacity-100" leave-active-class="transition-opacity ease-linear duration-300"
            leave-from-class="opacity-100" leave-to-class="opacity-0">
            <div v-if="isSidebarOpen" class="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-20 md:hidden"
                @click="isSidebarOpen = false"></div>
        </Transition>

        <!-- Sidebar -->
        <AdminSidebar :class="[
            'fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0',
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        ]" @logout="handleLogout" @close="isSidebarOpen = false" />

        <!-- Main Content -->
        <main class="flex-1 flex flex-col min-w-0 overflow-hidden h-screen">
            <!-- Topbar -->
            <header
                class="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-3 flex justify-between items-center z-10">
                <div class="flex items-center gap-4">
                    <!-- Mobile Menu Button -->
                    <button @click="isSidebarOpen = !isSidebarOpen"
                        class="md:hidden text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 focus:outline-none p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700">
                        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    <!-- Breadcrumbs / Title -->
                    <div>
                        <h2 class="text-lg font-bold text-slate-800 dark:text-slate-100 capitalize leading-tight">
                            {{ currentPageTitle }}
                        </h2>
                        <div class="flex items-center text-xs text-slate-500 dark:text-slate-400 mt-0.5 space-x-1">
                            <span>Admin</span>
                            <span>/</span>
                            <span class="text-blue-600 dark:text-blue-400 font-medium capitalize">{{ currentPageTitle
                                }}</span>
                        </div>
                    </div>
                </div>

                <!-- Dark Mode Toggle & User Profile -->
                <div class="flex items-center gap-3">
                    <button @click="toggleDarkMode"
                        class="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 flex items-center justify-center transition-colors">
                        <span v-if="isDark" class="text-xl">🌙</span>
                        <span v-else class="text-xl">☀️</span>
                    </button>

                    <!-- User Profile -->
                    <NuxtLink to="/admin/profile" class="flex items-center gap-4 hover:opacity-80 transition-opacity">
                        <div class="hidden sm:flex flex-col items-end">
                            <span class="text-sm font-bold text-slate-800 dark:text-slate-100">{{ user?.name ||
                                'Administrator' }}</span>
                            <span class="text-[10px] text-slate-500 dark:text-slate-400 capitalize">{{ user?.role ||
                                'System Admin' }}</span>
                        </div>
                        <div
                            class="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md ring-2 ring-white dark:ring-slate-700">
                            A
                        </div>
                    </NuxtLink>
                </div>
            </header>

            <!-- Page Content -->
            <div class="flex-1 overflow-auto p-6 bg-slate-50/50 dark:bg-slate-900">
                <div class="max-w-7xl mx-auto">
                    <AppBreadcrumb />
                    <slot />
                </div>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import AdminSidebar from '~/components/admin/AdminSidebar.vue'
import { useBreadcrumbStore } from '~/stores/breadcrumb'

const route = useRoute()
const router = useRouter()
const { showAlert } = useAlert()
const { isDark, toggleDarkMode } = useDarkMode()

const isSidebarOpen = ref(false)

const breadcrumbStore = useBreadcrumbStore()
const { currentTitle } = storeToRefs(breadcrumbStore)

// Apply dark mode class to HTML element
useHead({
    htmlAttrs: {
        class: computed(() => isDark.value ? 'dark' : '')
    }
})

// Close sidebar on route change (mobile)
watch(() => route.path, () => {
    isSidebarOpen.value = false
})

const currentPageTitle = computed(() => {
    const pathSegments = route.path.split('/').filter(Boolean)
    const lastSegment = pathSegments[pathSegments.length - 1]

    // Check if last segment is MongoDB ID
    const isId = lastSegment?.match(/^[a-f0-9]{24}$/i)

    if (isId && currentTitle.value) {
        return currentTitle.value
    }

    // Map common routes to better names
    const titleMap: Record<string, string> = {
        'admin': 'Dashboard',
        'news': 'News',
        'gallery': 'Gallery',
        'documents': 'Documents',
        'calendar': 'Calendar',
        'personnel': 'Personnel',
        'settings': 'Settings',
        'banners': 'Banners',
        'messages': 'Messages',
        'users': 'Users',
        'create': 'Create New'
    }

    return titleMap[lastSegment || ''] || lastSegment?.replace(/-/g, ' ') || 'Page'
})

const { user, logout } = useAuth()

const handleLogout = async () => {
    try {
        await logout()
        showAlert('ออกจากระบบสำเร็จ', 'success')
    } catch (e) {
        console.error('Logout failed', e)
        showAlert('เกิดข้อผิดพลาดในการออกจากระบบ', 'error')
    }
}


</script>
