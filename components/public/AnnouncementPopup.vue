<template>
    <Teleport to="body">
        <Transition enter-active-class="transition duration-300 ease-out"
            enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-200 ease-in" leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0">
            <div v-if="showPopup && announcement" class="fixed inset-0 z-[100] flex items-center justify-center p-4"
                @click.self="closePopup">
                <!-- Backdrop -->
                <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

                <!-- Popup Content -->
                <div
                    class="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
                    <!-- Close Button -->
                    <button @click="closePopup" aria-label="ปิด"
                        class="absolute top-4 right-4 z-10 w-10 h-10 bg-white dark:bg-slate-700 rounded-full shadow-lg flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <!-- Image (if exists) -->
                    <div v-if="announcement.image" class="relative h-64 md:h-80">
                        <NuxtImg :src="announcement.image" class="w-full h-full object-cover" />
                        <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </div>

                    <!-- Content -->
                    <div class="p-6 md:p-8 overflow-y-auto" :class="announcement.image ? '' : 'pt-16'">
                        <h2 class="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-4">
                            {{ announcement.title }}
                        </h2>

                        <div v-if="announcement.content"
                            class="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed whitespace-pre-wrap">
                            {{ announcement.content }}
                        </div>

                        <!-- Link Button -->
                        <div v-if="announcement.link" class="flex gap-4">
                            <a :href="announcement.link" target="_blank"
                                class="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg transition-all text-center">
                                {{ announcement.linkText || 'ดูเพิ่มเติม' }} →
                            </a>
                        </div>

                        <!-- Don't show again (if showOnce is enabled) -->
                        <div v-if="announcement.showOnce" class="mt-6 pt-6 border-t dark:border-slate-700">
                            <label class="flex items-center gap-3 cursor-pointer text-slate-600 dark:text-slate-400">
                                <input v-model="dontShowAgain" type="checkbox"
                                    class="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500" />
                                <span class="text-sm">ไม่ต้องแสดงอีก</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
const COOKIE_NAME = 'announcement_dismissed'
const showPopup = ref(false)
const dontShowAgain = ref(false)
const announcement = ref<any>(null)

onMounted(async () => {
    // Check if user dismissed popup
    if (document.cookie.includes(`${COOKIE_NAME}=`)) {
        return
    }

    try {
        const response: any = await $fetch('/api/announcements?active=true')
        const announcements = response.data || []

        if (announcements.length > 0) {
            // Get highest priority active announcement
            announcement.value = announcements[0]

            // Show popup after a slight delay
            setTimeout(() => {
                showPopup.value = true
            }, 1000)
        }
    } catch (e) {
        console.error('Failed to fetch announcements', e)
    }
})

const closePopup = () => {
    showPopup.value = false

    // If "don't show again" is checked, set cookie
    if (dontShowAgain.value && announcement.value?.showOnce) {
        const expiryDate = new Date()
        expiryDate.setFullYear(expiryDate.getFullYear() + 1) // 1 year
        document.cookie = `${COOKIE_NAME}=${announcement.value._id}; expires=${expiryDate.toUTCString()}; path=/`
    }
}

// Close on Escape key
onMounted(() => {
    const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && showPopup.value) {
            closePopup()
        }
    }
    document.addEventListener('keydown', handleEscape)
    onUnmounted(() => document.removeEventListener('keydown', handleEscape))
})
</script>
