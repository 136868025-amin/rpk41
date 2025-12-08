<template>
    <div class="min-h-screen bg-slate-50 pb-12">
        <!-- Header -->
        <div class="bg-white border-b border-slate-200">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 class="text-3xl md:text-4xl font-bold text-slate-800 mb-4">ข่าวสารและกิจกรรม</h1>
                <p class="text-slate-600 text-lg">ติดตามความเคลื่อนไหวและกิจกรรมล่าสุดของโรงเรียน</p>
            </div>
        </div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <!-- Filters -->
            <div class="flex flex-col md:flex-row gap-4 mb-8">
                <!-- Search -->
                <div class="relative flex-1">
                    <input v-model="searchQuery" type="text" placeholder="ค้นหาข่าวสาร..."
                        class="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500" />
                    <span class="absolute left-3 top-3 text-slate-400">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </span>
                </div>

                <!-- Category Filter -->
                <select v-model="selectedCategory"
                    class="w-full md:w-48 px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                    <option value="">ทุกหมวดหมู่</option>
                    <option value="general">ข่าวทั่วไป</option>
                    <option value="academic">วิชาการ</option>
                    <option value="activity">กิจกรรม</option>
                    <option value="admission">รับสมัครนักเรียน</option>
                </select>
            </div>

            <!-- Loading Skeleton -->
            <div v-if="pending" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div v-for="i in 6" :key="i" class="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse">
                    <div class="aspect-video bg-slate-200"></div>
                    <div class="p-6">
                        <div class="w-20 h-5 bg-slate-200 rounded-full mb-3"></div>
                        <div class="h-6 bg-slate-200 rounded mb-2"></div>
                        <div class="h-4 bg-slate-200 rounded w-3/4 mb-4"></div>
                        <div class="h-4 bg-slate-200 rounded w-1/2"></div>
                    </div>
                </div>
            </div>

            <!-- News Grid -->
            <div v-else-if="newsItems.length > 0" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <PublicNewsCard v-for="news in newsItems" :key="news._id" :news="news" />
            </div>

            <!-- Empty State -->
            <div v-else class="text-center py-16 bg-white rounded-xl border border-slate-200 shadow-sm">
                <div class="text-6xl mb-4">📰</div>
                <h3 class="text-xl font-bold text-slate-800 mb-2">ไม่พบข่าวสาร</h3>
                <p class="text-slate-500">ลองเปลี่ยนคำค้นหาหรือหมวดหมู่</p>
            </div>

            <!-- Pagination -->
            <div v-if="totalPages > 1" class="flex justify-center mt-12 gap-2">
                <button @click="page--" :disabled="page === 1"
                    class="px-4 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                    ก่อนหน้า
                </button>
                <div class="flex gap-1">
                    <button v-for="p in totalPages" :key="p" @click="page = p"
                        class="w-10 h-10 flex items-center justify-center rounded-lg transition-colors"
                        :class="page === p ? 'bg-primary-600 text-white' : 'bg-white border border-slate-200 hover:bg-slate-50'">
                        {{ p }}
                    </button>
                </div>
                <button @click="page++" :disabled="page === totalPages"
                    class="px-4 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                    ถัดไป
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'default'
})

const route = useRoute()
const router = useRouter()

// State
const page = ref(1)
const limit = 9
const searchQuery = ref('')
const selectedCategory = ref('')

// Debounce search
let searchTimeout: NodeJS.Timeout
watch(searchQuery, () => {
    clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
        page.value = 1
    }, 500)
})

watch(selectedCategory, () => {
    page.value = 1
})

// Fetch Data
const { data: newsData, pending } = await useFetch('/api/news', {
    query: computed(() => ({
        page: page.value,
        limit,
        search: searchQuery.value,
        category: selectedCategory.value,
        status: 'published'
    }))
})

const newsItems = computed(() => newsData.value?.data || [])
const totalPages = computed(() => Math.ceil((newsData.value?.pagination?.total || 0) / limit))

// Update URL query params
watch([page, searchQuery, selectedCategory], () => {
    router.replace({
        query: {
            ...route.query,
            page: page.value > 1 ? page.value : undefined,
            search: searchQuery.value || undefined,
            category: selectedCategory.value || undefined
        }
    })
})

// Initialize from URL
onMounted(() => {
    if (route.query.page) page.value = Number(route.query.page)
    if (route.query.search) searchQuery.value = String(route.query.search)
    if (route.query.category) selectedCategory.value = String(route.query.category)
})
</script>
