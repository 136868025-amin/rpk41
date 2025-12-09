<template>
    <div>
        <!-- Hero Section with Banner Slider -->
        <PublicAppHero :banners="banners.length > 0 ? banners : [{ imageUrl: schoolConfig?.heroImage || '' }]"
            :slogan="schoolConfig?.slogan" />

        <!-- About Preview Section -->
        <section class="py-16 md:py-24">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid md:grid-cols-2 gap-12 items-center">
                    <!-- Image -->
                    <div class="rounded-2xl overflow-hidden shadow-xl">
                        <NuxtImg :src="schoolConfig?.aboutImage || 'https://placehold.co/800x600'" alt="School"
                            class="w-full h-full object-cover" loading="lazy" />
                    </div>

                    <!-- Content -->
                    <div>
                        <h2 class="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-6">เกี่ยวกับโรงเรียน
                        </h2>
                        <div class="space-y-6">
                            <div>
                                <h3 class="text-xl font-bold text-primary-600 mb-2">วิสัยทัศน์ (Vision)</h3>
                                <p class="text-slate-600 dark:text-slate-300 leading-relaxed">
                                    {{ schoolConfig?.vision || defaultVision }}
                                </p>
                            </div>
                            <div>
                                <h3 class="text-xl font-bold text-primary-600 mb-2">พันธกิจ (Mission)</h3>
                                <p class="text-slate-600 dark:text-slate-300 leading-relaxed">
                                    {{ schoolConfig?.mission || defaultMission }}
                                </p>
                            </div>
                            <div class="pt-4">
                                <NuxtLink to="/about"
                                    class="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 transition-colors shadow-md">
                                    อ่านเพิ่มเติม
                                </NuxtLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Latest News Section -->
        <section class="py-16 md:py-24 bg-white dark:bg-slate-800">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <!-- Header -->
                <div class="flex justify-between items-end mb-12">
                    <div>
                        <h2 class="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-2">ข่าวสารล่าสุด
                        </h2>
                        <p class="text-slate-600">อัพเดทข่าวสารและกิจกรรมของโรงเรียน</p>
                    </div>
                    <NuxtLink to="/news"
                        class="text-primary-600 hover:text-primary-700 font-bold flex items-center gap-2">
                        ดูทั้งหมด →
                    </NuxtLink>
                </div>

                <!-- News Grid -->
                <div v-if="latestNews.length > 0" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <PublicNewsCard v-for="news in latestNews" :key="news._id" :news="news" />
                </div>
                <div v-else class="text-center py-12 text-slate-500">
                    ไม่มีข่าวสาร
                </div>
            </div>
        </section>

        <!-- Quick Stats Section -->
        <section class="py-16 md:py-24">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 class="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-12 text-center">
                    ข้อมูลโรงเรียน
                </h2>
                <div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    <PublicStatCard icon="👨‍🎓" :value="schoolConfig?.stats?.students || 0" label="นักเรียน" />
                    <PublicStatCard icon="👨‍🏫" :value="schoolConfig?.stats?.teachers || 0" label="ครูและบุคลากร" />
                    <PublicStatCard icon="📅" :value="schoolConfig?.stats?.foundedYear || 2508" label="ปีก่อตั้ง" />
                    <PublicStatCard icon="🏆" :value="schoolConfig?.stats?.awards || 0" label="รางวัล" />
                </div>
            </div>
        </section>

        <!-- Upcoming Events Section -->
        <section class="py-16 md:py-24 bg-white dark:bg-slate-800">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <!-- Header -->
                <div class="flex justify-between items-end mb-12">
                    <div>
                        <h2 class="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-2">
                            กิจกรรมที่กำลังจะมาถึง</h2>
                        <p class="text-slate-600 dark:text-slate-400">ติดตามกิจกรรมต่างๆ ของโรงเรียน</p>
                    </div>
                    <NuxtLink to="/calendar"
                        class="text-primary-600 hover:text-primary-700 font-bold flex items-center gap-2">
                        ดูปฏิทิน →
                    </NuxtLink>
                </div>

                <!-- Events List -->
                <div v-if="upcomingEvents.length > 0" class="grid md:grid-cols-2 gap-4">
                    <PublicEventCard v-for="event in upcomingEvents" :key="event._id" :event="event" />
                </div>
                <div v-else class="text-center py-12 text-slate-500">
                    ไม่มีกิจกรรมที่กำลังจะมาถึง
                </div>
            </div>
        </section>

        <!-- Gallery Preview Section -->
        <section class="py-16 md:py-24">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <!-- Header -->
                <div class="flex justify-between items-end mb-12">
                    <div>
                        <h2 class="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-2">แกลเลอรี่</h2>
                        <p class="text-slate-600 dark:text-slate-400">ภาพบรรยากาศกิจกรรมต่างๆ</p>
                    </div>
                    <NuxtLink to="/gallery"
                        class="text-primary-600 hover:text-primary-700 font-bold flex items-center gap-2">
                        ดูทั้งหมด →
                    </NuxtLink>
                </div>

                <!-- Gallery Grid -->
                <div v-if="galleryAlbums.length > 0" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <NuxtLink v-for="album in galleryAlbums" :key="album._id" :to="`/gallery/${album._id}`"
                        class="aspect-square rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-700 hover:scale-105 transition-transform cursor-pointer group relative">
                        <NuxtImg :src="album.coverImage || 'https://via.placeholder.com/400'" :alt="album.title"
                            class="w-full h-full object-cover" loading="lazy" />
                        <div
                            class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span class="text-white font-bold text-center px-2">{{ album.title }}</span>
                        </div>
                    </NuxtLink>
                </div>
                <div v-else class="text-center py-12 text-slate-500">
                    ไม่มีอัลบั้มรูปภาพ
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'default'
})

// Critical data - loads immediately (above-the-fold content)
const { data: criticalData } = await useAsyncData('home-critical', async () => {
    const [configRes, newsRes, bannersRes] = await Promise.all([
        $fetch('/api/config'),
        $fetch('/api/news'),
        $fetch('/api/banners')
    ])

    return {
        schoolConfig: (configRes as any).data,
        latestNews: ((newsRes as any).data || [])
            .filter((news: any) => news.isPublished)
            .sort((a: any, b: any) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
            .slice(0, 3),
        banners: ((bannersRes as any).data || [])
            .filter((banner: any) => banner.isActive)
            .sort((a: any, b: any) => a.orderIndex - b.orderIndex)
    }
})

// Secondary data - loads lazily (below-the-fold content)
const { data: secondaryData } = useLazyAsyncData('home-secondary', async () => {
    const [eventsRes, albumsRes] = await Promise.all([
        $fetch('/api/calendar'),
        $fetch('/api/gallery')
    ])

    return {
        upcomingEvents: ((eventsRes as any).data || [])
            .filter((event: any) => new Date(event.startDate) >= new Date())
            .sort((a: any, b: any) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
            .slice(0, 5),
        galleryAlbums: ((albumsRes as any).data || [])
            .filter((album: any) => album.isPublished)
            .sort((a: any, b: any) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime())
            .slice(0, 8)
    }
})

const schoolConfig = computed(() => criticalData.value?.schoolConfig)
const latestNews = computed(() => criticalData.value?.latestNews || [])
const banners = computed(() => criticalData.value?.banners || [])
const upcomingEvents = computed(() => secondaryData.value?.upcomingEvents || [])
const galleryAlbums = computed(() => secondaryData.value?.galleryAlbums || [])

// Preload Hero Image
useHead({
    link: [
        {
            rel: 'preload',
            as: 'image',
            href: computed(() => banners.value[0]?.imageUrl || schoolConfig.value?.heroImage || '')
        }
    ]
})

const defaultVision = 'โรงเรียนราชประชานุเคราะห์ 41 จังหวัดยะลา ก่อตั้งขึ้นเมื่อปี พ.ศ. 2508 ด้วยพระมหากรุณาธิคุณของพระบาทสมเด็จพระเจ้าอยู่หัว เพื่อให้การศึกษาแก่เยาวชนในพื้นที่จังหวัดชายแดนภาคใต้'
const defaultMission = 'โรงเรียนมุ่งมั่นพัฒนาคุณภาพการศึกษา สร้างคนดี มีคุณธรรม จริยธรรม และมีความรู้ความสามารถ พร้อมก้าวสู่สังคมโลกอย่างมั่นคง'
</script>
