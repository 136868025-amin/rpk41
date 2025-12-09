<template>
    <div class="min-h-screen bg-slate-50 dark:bg-slate-900 pb-12">
        <!-- Header -->
        <div class="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 class="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">เกี่ยวกับโรงเรียน</h1>
                <p class="text-slate-600 dark:text-slate-300 text-lg">ประวัติความเป็นมา วิสัยทัศน์ และพันธกิจ</p>
            </div>
        </div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <!-- Loading Skeleton -->
            <div v-if="pending" class="space-y-12 animate-pulse">
                <!-- Hero Skeleton -->
                <div class="h-[300px] md:h-[400px] bg-slate-200 dark:bg-slate-700 rounded-2xl"></div>
                <!-- Vision/Mission Skeleton -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-8">
                        <div class="w-12 h-12 bg-slate-200 rounded-full mb-6"></div>
                        <div class="h-8 bg-slate-200 rounded w-1/2 mb-4"></div>
                        <div class="h-4 bg-slate-200 rounded mb-2"></div>
                        <div class="h-4 bg-slate-200 rounded w-3/4"></div>
                    </div>
                    <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-8">
                        <div class="w-12 h-12 bg-slate-200 rounded-full mb-6"></div>
                        <div class="h-8 bg-slate-200 rounded w-1/2 mb-4"></div>
                        <div class="h-4 bg-slate-200 rounded mb-2"></div>
                        <div class="h-4 bg-slate-200 rounded w-3/4"></div>
                    </div>
                </div>
            </div>

            <div v-else-if="schoolConfig" class="space-y-12">
                <!-- Hero Image & Slogan -->
                <div class="relative rounded-2xl overflow-hidden shadow-lg h-[300px] md:h-[400px]">
                    <NuxtImg :src="schoolConfig.aboutImage || schoolConfig.heroImage || 'https://placehold.co/1200x600'"
                        class="w-full h-full object-cover" loading="lazy" />
                    <div class="absolute inset-0 bg-black/40 flex items-center justify-center text-center p-6">
                        <div>
                            <h2 class="text-3xl md:text-5xl font-bold text-white mb-4 shadow-sm">
                                {{ schoolConfig.schoolName }}
                            </h2>
                            <p class="text-xl md:text-2xl text-slate-200 font-light italic">
                                "{{ schoolConfig.slogan }}"
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Vision & Mission -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div
                        class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-8 hover:shadow-md transition-shadow">
                        <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl mb-6">
                            👁️
                        </div>
                        <h3 class="text-2xl font-bold text-slate-800 dark:text-white mb-4">วิสัยทัศน์ (Vision)</h3>
                        <p class="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
                            {{ schoolConfig.vision }}
                        </p>
                    </div>
                    <div
                        class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-8 hover:shadow-md transition-shadow">
                        <div
                            class="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-2xl mb-6">
                            🎯
                        </div>
                        <h3 class="text-2xl font-bold text-slate-800 dark:text-white mb-4">พันธกิจ (Mission)</h3>
                        <p class="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
                            {{ schoolConfig.mission }}
                        </p>
                    </div>
                </div>

                <!-- History -->
                <div
                    class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-8 md:p-12">
                    <h3 class="text-2xl font-bold text-slate-800 dark:text-white mb-8 flex items-center gap-3">
                        <span class="w-2 h-8 bg-amber-500 rounded-full"></span>
                        ประวัติความเป็นมา
                    </h3>
                    <div class="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300"
                        v-html="schoolConfig.history"></div>
                </div>

                <!-- Stats -->
                <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div
                        class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 text-center">
                        <div class="text-4xl font-bold text-primary-600 mb-2">{{ schoolConfig.stats?.students || 0 }}
                        </div>
                        <div class="text-slate-500 dark:text-slate-400 font-medium">นักเรียน</div>
                    </div>
                    <div
                        class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 text-center">
                        <div class="text-4xl font-bold text-emerald-600 mb-2">{{ schoolConfig.stats?.teachers || 0 }}
                        </div>
                        <div class="text-slate-500 dark:text-slate-400 font-medium">ครูและบุคลากร</div>
                    </div>
                    <div
                        class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 text-center">
                        <div class="text-4xl font-bold text-amber-600 mb-2">{{ schoolConfig.stats?.foundedYear || 2500
                            }}</div>
                        <div class="text-slate-500 dark:text-slate-400 font-medium">ปีก่อตั้ง</div>
                    </div>
                    <div
                        class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 text-center">
                        <div class="text-4xl font-bold text-purple-600 mb-2">{{ schoolConfig.stats?.awards || 0 }}</div>
                        <div class="text-slate-500 dark:text-slate-400 font-medium">รางวัลแห่งความภูมิใจ</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'default'
})

const { schoolConfig, fetchSchoolConfig } = usePublicData()
const pending = ref(true)

onMounted(async () => {
    if (!schoolConfig.value) {
        await fetchSchoolConfig()
    }
    pending.value = false
})

useHead({
    title: 'เกี่ยวกับโรงเรียน - โรงเรียนราชประชานุเคราะห์ 41',
    meta: [
        { name: 'description', content: 'ประวัติความเป็นมา วิสัยทัศน์ และพันธกิจของโรงเรียนราชประชานุเคราะห์ 41' }
    ]
})
</script>
