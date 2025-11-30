<template>
    <div class="min-h-screen bg-slate-50 pb-12">
        <!-- Header -->
        <div class="bg-white border-b border-slate-200">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 class="text-3xl md:text-4xl font-bold text-slate-800 mb-4">ปฏิทินกิจกรรม</h1>
                <p class="text-slate-600 text-lg">ตารางกิจกรรมและเหตุการณ์สำคัญของโรงเรียน</p>
            </div>
        </div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <!-- Calendar Component -->
                <FullCalendar :options="calendarOptions" />
            </div>
        </div>

        <!-- Event Modal -->
        <div v-if="selectedEvent" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            @click.self="closeModal">
            <div class="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden animate-fade-in-up">
                <div class="p-6">
                    <div class="flex justify-between items-start mb-4">
                        <h3 class="text-xl font-bold text-slate-800">{{ selectedEvent.title }}</h3>
                        <button @click="closeModal" class="text-slate-400 hover:text-slate-600">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div class="space-y-4">
                        <div class="flex items-center gap-3 text-slate-600">
                            <span class="text-xl">📅</span>
                            <div>
                                <p class="font-medium">วันที่</p>
                                <p class="text-sm">{{ formatDateRange(selectedEvent.start, selectedEvent.end) }}</p>
                            </div>
                        </div>

                        <div v-if="selectedEvent.extendedProps.location" class="flex items-center gap-3 text-slate-600">
                            <span class="text-xl">📍</span>
                            <div>
                                <p class="font-medium">สถานที่</p>
                                <p class="text-sm">{{ selectedEvent.extendedProps.location }}</p>
                            </div>
                        </div>

                        <div v-if="selectedEvent.extendedProps.description"
                            class="flex items-start gap-3 text-slate-600">
                            <span class="text-xl mt-1">📝</span>
                            <div>
                                <p class="font-medium">รายละเอียด</p>
                                <p class="text-sm">{{ selectedEvent.extendedProps.description }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bg-slate-50 px-6 py-4 flex justify-end">
                    <button @click="closeModal"
                        class="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 font-medium transition-colors">
                        ปิดหน้าต่าง
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import thLocale from '@fullcalendar/core/locales/th'

definePageMeta({
    layout: 'default'
})

// Fetch Events
const { data: response } = await useFetch('/api/calendar')
const events = computed(() => {
    return (response.value?.data || []).map((event: any) => ({
        id: event._id,
        title: event.title,
        start: event.startDate,
        end: event.endDate,
        backgroundColor: getEventColor(event.type),
        borderColor: getEventColor(event.type),
        extendedProps: {
            description: event.description,
            location: event.location,
            type: event.type
        }
    }))
})

// Calendar Options
const calendarOptions = computed(() => ({
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    locale: thLocale,
    headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,dayGridWeek'
    },
    events: events.value,
    eventClick: handleEventClick,
    height: 'auto',
    dayMaxEvents: true
}))

// Modal State
const selectedEvent = ref<any>(null)

const handleEventClick = (info: any) => {
    selectedEvent.value = info.event
}

const closeModal = () => {
    selectedEvent.value = null
}

// Helpers
const getEventColor = (type: string) => {
    const colors: Record<string, string> = {
        activity: '#3b82f6', // Blue
        academic: '#10b981', // Emerald
        exam: '#ef4444',     // Red
        holiday: '#f59e0b'   // Amber
    }
    return colors[type] || '#6b7280' // Gray default
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
/* Custom Calendar Styles */
.fc-button-primary {
    background-color: #2563eb !important;
    border-color: #2563eb !important;
}

.fc-button-primary:hover {
    background-color: #1d4ed8 !important;
    border-color: #1d4ed8 !important;
}

.fc-day-today {
    background-color: #eff6ff !important;
}

.fc-event {
    cursor: pointer;
}
</style>
