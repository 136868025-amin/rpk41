<template>
    <div class="min-h-screen bg-slate-50 dark:bg-slate-900 pb-12">
        <!-- Header -->
        <div class="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 class="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-2">ปฏิทินกิจกรรม
                        </h1>
                        <p class="text-slate-600 dark:text-slate-300">ตารางกิจกรรมและเหตุการณ์สำคัญของโรงเรียน</p>
                    </div>
                    <!-- Legend -->
                    <div class="flex flex-wrap gap-3">
                        <div v-for="(color, type) in eventColors" :key="type"
                            class="flex items-center gap-2 bg-slate-50 dark:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-600">
                            <span class="w-3 h-3 rounded-full" :style="{ backgroundColor: color }"></span>
                            <span class="text-sm text-slate-600 dark:text-slate-300 capitalize">{{ getEventLabel(type)
                            }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div class="grid lg:grid-cols-4 gap-8">
                <!-- Sidebar Filters -->
                <div class="lg:col-span-1 space-y-6">
                    <div
                        class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                        <h3 class="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                            <span class="text-xl">🔍</span> กรองข้อมูล
                        </h3>
                        <div class="space-y-3">
                            <label v-for="(label, type) in eventLabels" :key="type"
                                class="flex items-center gap-3 cursor-pointer group">
                                <div class="relative flex items-center">
                                    <input type="checkbox" v-model="selectedFilters" :value="type"
                                        class="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-slate-300 transition-all checked:border-primary-500 checked:bg-primary-500 hover:border-primary-400" />
                                    <svg class="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity peer-checked:opacity-100"
                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" stroke-width="4" stroke-linecap="round"
                                        stroke-linejoin="round" width="12" height="12">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                </div>
                                <span
                                    class="text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{{
                                        label
                                    }}</span>
                            </label>
                        </div>
                    </div>

                    <!-- Mini Calendar / Date Picker could go here -->
                </div>

                <!-- Main Calendar -->
                <div class="lg:col-span-3">
                    <div
                        class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 calendar-wrapper">
                        <!-- Loading Skeleton -->
                        <div v-if="calendarPlugins.length === 0" class="animate-pulse">
                            <div class="h-10 bg-slate-200 rounded mb-4"></div>
                            <div class="grid grid-cols-7 gap-2">
                                <div v-for="i in 35" :key="i" class="h-20 bg-slate-100 rounded"></div>
                            </div>
                        </div>
                        <!-- Calendar (only when plugins loaded) -->
                        <FullCalendar v-else :options="calendarOptions" />
                    </div>
                </div>
            </div>
        </div>

        <!-- Event Modal -->
        <Transition enter-active-class="transition duration-200 ease-out"
            enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-150 ease-in" leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0">
            <div v-if="selectedEvent" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                <!-- Backdrop -->
                <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" @click="closeModal"></div>

                <!-- Modal Content -->
                <div
                    class="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh]">
                    <!-- Header -->
                    <div
                        class="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-700/50">
                        <div class="flex items-center gap-3">
                            <span class="w-3 h-3 rounded-full"
                                :style="{ backgroundColor: selectedEvent.backgroundColor }"></span>
                            <span
                                class="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">{{
                                    getEventLabel(selectedEvent.extendedProps.type) }}</span>
                        </div>
                        <button @click="closeModal"
                            class="text-slate-400 hover:text-slate-600 transition-colors p-1 hover:bg-slate-100 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <!-- Body -->
                    <div class="p-6 overflow-y-auto custom-scrollbar">
                        <h3 class="text-2xl font-bold text-slate-800 dark:text-white mb-6 leading-tight">{{
                            selectedEvent.title }}</h3>

                        <div class="space-y-6">
                            <!-- Date -->
                            <div class="flex gap-4">
                                <div
                                    class="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <p class="text-sm font-bold text-slate-900 dark:text-white">วันและเวลา</p>
                                    <p class="text-slate-600 dark:text-slate-300 mt-0.5">{{
                                        formatDateRange(selectedEvent.start,
                                            selectedEvent.end) }}</p>
                                </div>
                            </div>

                            <!-- Location -->
                            <div v-if="selectedEvent.extendedProps.location" class="flex gap-4">
                                <div
                                    class="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0 text-red-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p class="text-sm font-bold text-slate-900">สถานที่</p>
                                    <p class="text-slate-600 mt-0.5">{{ selectedEvent.extendedProps.location }}</p>
                                </div>
                            </div>

                            <!-- Description -->
                            <div v-if="selectedEvent.extendedProps.description" class="flex gap-4">
                                <div
                                    class="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0 text-amber-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M4 6h16M4 12h16M4 18h7" />
                                    </svg>
                                </div>
                                <div>
                                    <p class="text-sm font-bold text-slate-900">รายละเอียด</p>
                                    <p class="text-slate-600 mt-0.5 leading-relaxed whitespace-pre-line">{{
                                        selectedEvent.extendedProps.description }}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Footer -->
                    <div
                        class="px-6 py-4 bg-slate-50 dark:bg-slate-700 border-t border-slate-100 dark:border-slate-600 flex justify-end">
                        <button @click="closeModal"
                            class="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 hover:border-slate-300 font-medium transition-all shadow-sm">
                            ปิดหน้าต่าง
                        </button>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

// Lazy load FullCalendar components (~100KB saved from main bundle)
const FullCalendar = defineAsyncComponent(() =>
    import('@fullcalendar/vue3').then(m => m.default)
)

// Lazy load plugins only when needed
const loadCalendarPlugins = async () => {
    const [dayGridPlugin, interactionPlugin, listPlugin, thLocale] = await Promise.all([
        import('@fullcalendar/daygrid').then(m => m.default),
        import('@fullcalendar/interaction').then(m => m.default),
        import('@fullcalendar/list').then(m => m.default),
        import('@fullcalendar/core/locales/th').then(m => m.default)
    ])
    return { dayGridPlugin, interactionPlugin, listPlugin, thLocale }
}

definePageMeta({
    layout: 'default'
})

// Constants
const eventColors: Record<string, string> = {
    activity: '#3b82f6', // Blue
    academic: '#10b981', // Emerald
    exam: '#ef4444',     // Red
    holiday: '#f59e0b'   // Amber
}

const eventLabels: Record<string, string> = {
    activity: 'กิจกรรมทั่วไป',
    academic: 'วิชาการ',
    exam: 'การสอบ',
    holiday: 'วันหยุด'
}

// State
const selectedFilters = ref<string[]>(Object.keys(eventLabels))
const selectedEvent = ref<any>(null)
const calendarPlugins = ref<any[]>([])
const thLocale = ref<any>(null)

// Fetch Events
const { data: response } = await useFetch('/api/calendar')

// Load plugins on mount
onMounted(async () => {
    const plugins = await loadCalendarPlugins()
    calendarPlugins.value = [plugins.dayGridPlugin, plugins.interactionPlugin, plugins.listPlugin]
    thLocale.value = plugins.thLocale
})

const allEvents = computed(() => {
    return (response.value?.data || []).map((event: any) => ({
        id: event._id,
        title: event.title,
        start: event.startDate,
        end: event.endDate,
        backgroundColor: eventColors[event.type] || '#6b7280',
        borderColor: eventColors[event.type] || '#6b7280',
        extendedProps: {
            description: event.description,
            location: event.location,
            type: event.type
        }
    }))
})

const filteredEvents = computed(() => {
    return allEvents.value.filter((event: any) => selectedFilters.value.includes(event.extendedProps.type))
})

// Calendar Options - uses lazy-loaded plugins
const calendarOptions = computed(() => ({
    plugins: calendarPlugins.value,
    initialView: 'dayGridMonth',
    locale: thLocale.value,
    headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,listMonth'
    },
    buttonText: {
        today: 'วันนี้',
        month: 'เดือน',
        list: 'รายการ'
    },
    events: filteredEvents.value,
    eventClick: handleEventClick,
    height: 'auto',
    dayMaxEvents: true,
    eventTimeFormat: {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    } as const
}))

// Methods
const handleEventClick = (info: any) => {
    selectedEvent.value = info.event
}

const closeModal = () => {
    selectedEvent.value = null
}

const getEventLabel = (type: string) => {
    return eventLabels[type] || type
}

const formatDateRange = (start: Date, end: Date | null) => {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }

    const startDate = new Date(start).toLocaleDateString('th-TH', options)

    if (!end) return startDate

    const endDate = new Date(end).toLocaleDateString('th-TH', options)
    // If same day, show only time for end date
    if (new Date(start).toDateString() === new Date(end).toDateString()) {
        const endTime = new Date(end).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })
        return `${startDate} - ${endTime}`
    }

    return `${startDate} - ${endDate}`
}

useHead({
    title: 'ปฏิทินกิจกรรม - โรงเรียนราชประชานุเคราะห์ 41',
    meta: [
        { name: 'description', content: 'ตารางกิจกรรมและเหตุการณ์สำคัญของโรงเรียนราชประชานุเคราะห์ 41' }
    ]
})
</script>

<style>
/* Custom Calendar Styles - Light Mode */
.calendar-wrapper {
    --fc-border-color: #e2e8f0;
    --fc-button-text-color: #475569;
    --fc-button-bg-color: #ffffff;
    --fc-button-border-color: #e2e8f0;
    --fc-button-hover-bg-color: #f8fafc;
    --fc-button-hover-border-color: #cbd5e1;
    --fc-button-active-bg-color: #f1f5f9;
    --fc-button-active-border-color: #cbd5e1;
    --fc-event-bg-color: #3b82f6;
    --fc-event-border-color: #3b82f6;
    --fc-today-bg-color: #f0f9ff;
    --fc-neutral-bg-color: #f8fafc;
    --fc-page-bg-color: #ffffff;
    --fc-neutral-text-color: #64748b;
}

/* Dark Mode Variables */
:root.dark .calendar-wrapper,
.dark .calendar-wrapper {
    --fc-border-color: #334155;
    --fc-button-text-color: #e2e8f0;
    --fc-button-bg-color: #1e293b;
    --fc-button-border-color: #334155;
    --fc-button-hover-bg-color: #334155;
    --fc-button-hover-border-color: #475569;
    --fc-button-active-bg-color: #475569;
    --fc-button-active-border-color: #64748b;
    --fc-today-bg-color: rgba(59, 130, 246, 0.1);
    --fc-neutral-bg-color: #1e293b;
    --fc-page-bg-color: #0f172a;
    --fc-neutral-text-color: #94a3b8;
}

.fc {
    font-family: 'Prompt', sans-serif;
}

/* Toolbar */
.fc-toolbar-title {
    font-size: 1.25rem !important;
    font-weight: 700 !important;
    color: #1e293b !important;
}

.dark .fc-toolbar-title {
    color: #f1f5f9 !important;
}

.fc-button {
    font-weight: 500 !important;
    text-transform: capitalize !important;
    padding: 0.5rem 1rem !important;
    border-radius: 0.5rem !important;
    transition: all 0.2s !important;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05) !important;
}

.fc-button-primary {
    color: var(--fc-button-text-color) !important;
    background-color: var(--fc-button-bg-color) !important;
    border-color: var(--fc-button-border-color) !important;
}

.fc-button-primary:hover {
    background-color: var(--fc-button-hover-bg-color) !important;
    border-color: var(--fc-button-hover-border-color) !important;
    color: #1e293b !important;
}

.dark .fc-button-primary:hover {
    color: #f1f5f9 !important;
}

.fc-button-primary:not(:disabled).fc-button-active,
.fc-button-primary:not(:disabled):active {
    background-color: var(--fc-button-active-bg-color) !important;
    border-color: var(--fc-button-active-border-color) !important;
    color: #0f172a !important;
}

.dark .fc-button-primary:not(:disabled).fc-button-active,
.dark .fc-button-primary:not(:disabled):active {
    color: #f1f5f9 !important;
}

/* Day Grid */
.fc-daygrid-day-number {
    font-weight: 500 !important;
    color: #64748b !important;
    padding: 0.5rem !important;
}

.dark .fc-daygrid-day-number {
    color: #94a3b8 !important;
}

.fc-col-header-cell-cushion {
    font-weight: 600 !important;
    color: #475569 !important;
    padding: 0.75rem 0 !important;
}

.dark .fc-col-header-cell-cushion {
    color: #cbd5e1 !important;
}

/* Day cells */
.dark .fc-daygrid-day {
    background-color: transparent !important;
}

.dark .fc-day-today {
    background-color: var(--fc-today-bg-color) !important;
}

.dark .fc-daygrid-day-frame {
    border-color: var(--fc-border-color) !important;
}

/* Events */
.fc-event {
    border-radius: 0.25rem !important;
    padding: 2px 4px !important;
    font-size: 0.85rem !important;
    border: none !important;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05) !important;
    transition: transform 0.1s !important;
}

.fc-event:hover {
    transform: scale(1.02) !important;
    filter: brightness(1.1) !important;
}

/* List View */
.fc-list {
    border: none !important;
}

.fc-list-day-cushion {
    background-color: #f8fafc !important;
}

.dark .fc-list-day-cushion {
    background-color: #1e293b !important;
    color: #e2e8f0 !important;
}

.fc-list-event:hover td {
    background-color: #f1f5f9 !important;
}

.dark .fc-list-event:hover td {
    background-color: #334155 !important;
}

.dark .fc-list-event-title,
.dark .fc-list-event-time {
    color: #e2e8f0 !important;
}

/* Table borders */
.dark .fc-scrollgrid,
.dark .fc-scrollgrid-section>td,
.dark .fc th,
.dark .fc td {
    border-color: var(--fc-border-color) !important;
}

/* More events link */
.dark .fc-daygrid-more-link {
    color: #60a5fa !important;
}

/* Scrollbar for dark mode */
.dark .fc-scroller::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

.dark .fc-scroller::-webkit-scrollbar-track {
    background: #1e293b;
}

.dark .fc-scroller::-webkit-scrollbar-thumb {
    background: #475569;
    border-radius: 4px;
}

.dark .fc-scroller::-webkit-scrollbar-thumb:hover {
    background: #64748b;
}
</style>
