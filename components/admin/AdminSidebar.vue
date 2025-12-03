<template>
    <aside class="bg-slate-900 text-white w-64 min-h-screen flex-shrink-0 flex flex-col shadow-xl z-30">
        <!-- Logo / Header -->
        <div class="h-16 flex items-center px-6 bg-slate-950 border-b border-slate-800/50">
            <div class="flex items-center gap-3">
                <div
                    class="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20 overflow-hidden">
                    <img v-if="configStore.config?.logo" :src="configStore.config.logo"
                        class="w-full h-full object-cover" />
                    <span v-else class="text-lg font-bold">{{ configStore.config?.schoolNameEn?.charAt(0) || 'A'
                    }}</span>
                </div>
                <div>
                    <h2 class="text-sm font-bold tracking-wide">Admin Panel</h2>
                    <p class="text-[10px] text-slate-400 font-medium uppercase tracking-wider truncate max-w-[150px]">
                        {{ configStore.config?.schoolNameEn || 'Ratchaprachanukroh 41' }}
                    </p>
                </div>
            </div>
            <!-- Close button for mobile -->
            <button @click="$emit('close')" class="md:hidden ml-auto text-slate-400 hover:text-white transition-colors">
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 overflow-y-auto py-6 px-3 space-y-1 custom-scrollbar">
            <NuxtLink to="/admin"
                class="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800/50 hover:text-white transition-all group"
                active-class="bg-blue-600/10 text-blue-400 font-medium border border-blue-600/20 shadow-sm shadow-blue-900/20">
                <span class="text-xl group-hover:scale-110 transition-transform duration-200">📊</span>
                <span class="text-sm">ภาพรวม (Dashboard)</span>
            </NuxtLink>

            <div class="pt-6 pb-2 px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                จัดการเนื้อหา
            </div>

            <NuxtLink to="/admin/messages"
                class="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800/50 hover:text-white transition-all group"
                active-class="bg-blue-600/10 text-blue-400 font-medium border border-blue-600/20 shadow-sm shadow-blue-900/20">
                <span class="text-xl group-hover:scale-110 transition-transform duration-200">📩</span>
                <span class="text-sm">กล่องข้อความ (Inbox)</span>
            </NuxtLink>

            <NuxtLink to="/admin/news"
                class="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800/50 hover:text-white transition-all group"
                active-class="bg-blue-600/10 text-blue-400 font-medium border border-blue-600/20 shadow-sm shadow-blue-900/20">
                <span class="text-xl group-hover:scale-110 transition-transform duration-200">📰</span>
                <span class="text-sm">ข่าวสาร/กิจกรรม</span>
            </NuxtLink>

            <NuxtLink to="/admin/documents"
                class="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800/50 hover:text-white transition-all group"
                active-class="bg-blue-600/10 text-blue-400 font-medium border border-blue-600/20 shadow-sm shadow-blue-900/20">
                <span class="text-xl group-hover:scale-110 transition-transform duration-200">📂</span>
                <span class="text-sm">เอกสารดาวน์โหลด</span>
            </NuxtLink>

            <NuxtLink to="/admin/personnel"
                class="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800/50 hover:text-white transition-all group"
                active-class="bg-blue-600/10 text-blue-400 font-medium border border-blue-600/20 shadow-sm shadow-blue-900/20">
                <span class="text-xl group-hover:scale-110 transition-transform duration-200">👥</span>
                <span class="text-sm">บุคลากร</span>
            </NuxtLink>

            <NuxtLink to="/admin/calendar"
                class="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800/50 hover:text-white transition-all group"
                active-class="bg-blue-600/10 text-blue-400 font-medium border border-blue-600/20 shadow-sm shadow-blue-900/20">
                <span class="text-xl group-hover:scale-110 transition-transform duration-200">📅</span>
                <span class="text-sm">ปฏิทินกิจกรรม</span>
            </NuxtLink>

            <NuxtLink to="/admin/gallery"
                class="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800/50 hover:text-white transition-all group"
                active-class="bg-blue-600/10 text-blue-400 font-medium border border-blue-600/20 shadow-sm shadow-blue-900/20">
                <span class="text-xl group-hover:scale-110 transition-transform duration-200">📸</span>
                <span class="text-sm">คลังภาพกิจกรรม</span>
            </NuxtLink>

            <NuxtLink to="/admin/banners"
                class="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800/50 hover:text-white transition-all group"
                active-class="bg-blue-600/10 text-blue-400 font-medium border border-blue-600/20 shadow-sm shadow-blue-900/20">
                <span class="text-xl group-hover:scale-110 transition-transform duration-200">🖼️</span>
                <span class="text-sm">แบนเนอร์</span>
            </NuxtLink>

            <div class="pt-6 pb-2 px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                ตั้งค่าระบบ
            </div>

            <NuxtLink to="/admin/users"
                class="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800/50 hover:text-white transition-all group"
                active-class="bg-blue-600/10 text-blue-400 font-medium border border-blue-600/20 shadow-sm shadow-blue-900/20">
                <span class="text-xl group-hover:scale-110 transition-transform duration-200">🛡️</span>
                <span class="text-sm">ผู้ดูแลระบบ (Users)</span>
            </NuxtLink>

            <NuxtLink to="/admin/settings"
                class="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800/50 hover:text-white transition-all group"
                active-class="bg-blue-600/10 text-blue-400 font-medium border border-blue-600/20 shadow-sm shadow-blue-900/20">
                <span class="text-xl group-hover:scale-110 transition-transform duration-200">⚙️</span>
                <span class="text-sm">ตั้งค่าเว็บไซต์</span>
            </NuxtLink>
        </nav>

        <!-- Footer / Logout -->
        <div class="p-4 border-t border-slate-800/50 bg-slate-950/30">
            <button @click="$emit('logout')"
                class="flex items-center justify-center space-x-2 px-4 py-2.5 w-full rounded-lg text-slate-400 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 border border-transparent transition-all group">
                <span class="group-hover:-translate-x-1 transition-transform">🚪</span>
                <span class="text-sm font-medium">ออกจากระบบ</span>
            </button>
        </div>
    </aside>
</template>

<script setup lang="ts">
import { useConfigStore } from '~/stores/config'

defineEmits(['logout', 'close'])

const configStore = useConfigStore()

onMounted(() => {
    if (!configStore.config) {
        configStore.fetchConfig()
    }
})
</script>
