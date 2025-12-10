<template>
    <div class="min-h-screen bg-slate-50 dark:bg-slate-900 pb-12">
        <!-- Header -->
        <div class="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 class="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">บุคลากร</h1>
                <p class="text-slate-600 dark:text-slate-300 text-lg">คณะผู้บริหารและบุคลากรโรงเรียนราชประชานุเคราะห์ 41
                </p>
            </div>
        </div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <!-- Loading Skeleton -->
            <div v-if="pending" class="space-y-16">
                <!-- Director Skeleton -->
                <div class="flex justify-center">
                    <div
                        class="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden max-w-2xl w-full flex flex-col md:flex-row animate-pulse">
                        <div class="md:w-2/5 aspect-[3/4] bg-slate-200"></div>
                        <div class="p-8 md:w-3/5 flex flex-col justify-center">
                            <div class="w-32 h-6 bg-slate-200 rounded-full mb-4"></div>
                            <div class="h-8 bg-slate-200 rounded mb-2"></div>
                            <div class="h-4 bg-slate-200 rounded w-2/3 mb-6"></div>
                            <div class="h-4 bg-slate-200 rounded w-1/2"></div>
                        </div>
                    </div>
                </div>
                <!-- Staff Grid Skeleton -->
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    <div v-for="i in 8" :key="i"
                        class="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-4 flex items-center gap-4 animate-pulse">
                        <div class="w-16 h-16 bg-slate-200 rounded-full flex-shrink-0"></div>
                        <div class="flex-1">
                            <div class="h-4 bg-slate-200 rounded w-24 mb-2"></div>
                            <div class="h-3 bg-slate-200 rounded w-16"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-else class="space-y-16">
                <!-- Administrators Section -->
                <section v-if="groupedPersonnel.administrators?.length > 0">
                    <h2 class="text-2xl font-bold text-slate-800 dark:text-white mb-8 flex items-center gap-2">
                        <span class="w-2 h-8 bg-primary-600 rounded-full"></span>
                        คณะผู้บริหาร
                    </h2>

                    <!-- Director (Rank 1) -->
                    <div v-if="director" class="flex justify-center mb-12">
                        <NuxtLink :to="`/personnel/${director._id}`"
                            class="bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden max-w-2xl w-full flex flex-col md:flex-row group border border-slate-100 dark:border-slate-700">
                            <div class="md:w-2/5 relative overflow-hidden">
                                <NuxtImg :src="director.photo || 'https://placehold.co/600x800'" :alt="director.name"
                                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    loading="lazy" />
                            </div>
                            <div class="p-8 md:w-3/5 flex flex-col justify-center text-center md:text-left">
                                <span
                                    class="inline-block px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full mb-4 w-fit mx-auto md:mx-0">
                                    ผู้อำนวยการโรงเรียน
                                </span>
                                <h3
                                    class="text-2xl font-bold text-slate-800 dark:text-white mb-2 group-hover:text-primary-600 transition-colors">
                                    {{ director.name }}
                                </h3>
                                <p class="text-slate-500 dark:text-slate-400 mb-6">{{ director.position }}</p>
                                <span
                                    class="text-primary-600 font-medium group-hover:translate-x-1 transition-transform inline-flex items-center justify-center md:justify-start gap-1">
                                    ดูประวัติและผลงาน <span>→</span>
                                </span>
                            </div>
                        </NuxtLink>
                    </div>

                    <!-- Deputy Directors (Rank 2-4) -->
                    <div v-if="deputyDirectors.length > 0" class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        <NuxtLink v-for="person in deputyDirectors" :key="person._id" :to="`/personnel/${person._id}`"
                            class="bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden group text-center p-6 border border-slate-100 dark:border-slate-700">
                            <div
                                class="w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden border-4 border-slate-50 shadow-inner relative">
                                <NuxtImg :src="person.photo || 'https://placehold.co/400x400'" :alt="person.name"
                                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    loading="lazy" />
                            </div>
                            <h3
                                class="text-lg font-bold text-slate-800 dark:text-white mb-1 group-hover:text-primary-600 transition-colors">
                                {{ person.name }}
                            </h3>
                            <p class="text-slate-500 dark:text-slate-400 text-sm mb-4">{{ person.position }}</p>
                            <span class="text-primary-600 text-sm font-medium">ดูรายละเอียด</span>
                        </NuxtLink>
                    </div>

                    <!-- Other Administrators -->
                    <div v-if="otherAdmins.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        <NuxtLink v-for="person in otherAdmins" :key="person._id" :to="`/personnel/${person._id}`"
                            class="bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group p-4 border border-slate-100 dark:border-slate-700 flex items-center gap-4">
                            <div class="w-16 h-16 rounded-full overflow-hidden border-2 border-slate-50 flex-shrink-0">
                                <NuxtImg :src="person.photo || 'https://placehold.co/400x400'" :alt="person.name"
                                    class="w-full h-full object-cover" loading="lazy" />
                            </div>
                            <div>
                                <h3
                                    class="font-bold text-slate-800 dark:text-white text-sm mb-0.5 group-hover:text-primary-600 transition-colors">
                                    {{ person.name }}
                                </h3>
                                <p class="text-slate-500 dark:text-slate-400 text-xs">{{ person.position }}</p>
                            </div>
                        </NuxtLink>
                    </div>
                </section>

                <!-- Teachers -->
                <section v-if="groupedPersonnel.teachers?.length > 0">
                    <h2 class="text-2xl font-bold text-slate-800 dark:text-white mb-8 flex items-center gap-2">
                        <span class="w-2 h-8 bg-emerald-500 rounded-full"></span>
                        คณะครูอาจารย์
                    </h2>
                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        <NuxtLink v-for="person in groupedPersonnel.teachers" :key="person._id"
                            :to="`/personnel/${person._id}`"
                            class="bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group p-4 border border-slate-100 dark:border-slate-700 flex items-center gap-4">
                            <div class="w-16 h-16 rounded-full overflow-hidden border-2 border-slate-50 flex-shrink-0">
                                <NuxtImg :src="person.photo || 'https://placehold.co/400x400'" :alt="person.name"
                                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    loading="lazy" />
                            </div>
                            <div>
                                <h3
                                    class="font-bold text-slate-800 dark:text-white text-sm mb-0.5 group-hover:text-emerald-600 transition-colors">
                                    {{ person.name }}
                                </h3>
                                <p class="text-emerald-600 text-xs font-medium">{{ person.position }}</p>
                            </div>
                        </NuxtLink>
                    </div>
                </section>

                <!-- Support Staff -->
                <section v-if="groupedPersonnel.support_staff?.length > 0">
                    <h2 class="text-2xl font-bold text-slate-800 dark:text-white mb-8 flex items-center gap-2">
                        <span class="w-2 h-8 bg-slate-400 rounded-full"></span>
                        บุคลากรทางการศึกษา
                    </h2>
                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        <NuxtLink v-for="person in groupedPersonnel.support_staff" :key="person._id"
                            :to="`/personnel/${person._id}`"
                            class="bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group p-4 border border-slate-100 dark:border-slate-700 flex items-center gap-4">
                            <div class="w-16 h-16 rounded-full overflow-hidden border-2 border-slate-50 flex-shrink-0">
                                <NuxtImg :src="person.photo || 'https://placehold.co/400x400'" :alt="person.name"
                                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    loading="lazy" />
                            </div>
                            <div>
                                <h3
                                    class="font-bold text-slate-800 dark:text-white text-sm mb-0.5 group-hover:text-slate-600 transition-colors">
                                    {{ person.name }}
                                </h3>
                                <p class="text-slate-500 text-xs font-medium">{{ person.position }}</p>
                            </div>
                        </NuxtLink>
                    </div>
                </section>

                <!-- Empty State -->
                <div v-if="!hasPersonnel"
                    class="text-center py-16 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                    <div class="text-6xl mb-4">👥</div>
                    <h3 class="text-xl font-bold text-slate-800 dark:text-white mb-2">ไม่พบข้อมูลบุคลากร</h3>
                    <p class="text-slate-500 dark:text-slate-400">ยังไม่มีข้อมูลบุคลากรในระบบ</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'default'
})

interface Personnel {
    _id: string
    name: string
    position: string
    photo: string
    department: 'administrators' | 'teachers' | 'support_staff'
    email?: string
    phone?: string
    orderIndex: number
}

interface GroupedPersonnel {
    administrators: Personnel[]
    teachers: Personnel[]
    support_staff: Personnel[]
}

// Fetch Personnel Grouped (disable cache to always get fresh data)
const { data: response, pending, refresh } = await useFetch<{ data: GroupedPersonnel }>('/api/personnel?grouped=true', {
    getCachedData: () => undefined // Force fresh data every time
})
const groupedPersonnel = computed(() => response.value?.data || { administrators: [], teachers: [], support_staff: [] })

// Computed for Executive Layout
const director = computed(() => {
    return groupedPersonnel.value.administrators.find(p => p.orderIndex === 1)
})

const deputyDirectors = computed(() => {
    return groupedPersonnel.value.administrators.filter(p => p.orderIndex >= 2 && p.orderIndex <= 4)
})

const otherAdmins = computed(() => {
    return groupedPersonnel.value.administrators.filter(p => p.orderIndex > 4)
})

const hasPersonnel = computed(() => {
    const data = groupedPersonnel.value
    return (data.administrators?.length > 0) || (data.teachers?.length > 0) || (data.support_staff?.length > 0)
})

useHead({
    title: 'บุคลากร - โรงเรียนราชประชานุเคราะห์ 41',
    meta: [
        { name: 'description', content: 'คณะผู้บริหารและบุคลากรโรงเรียนราชประชานุเคราะห์ 41' }
    ]
})
</script>
