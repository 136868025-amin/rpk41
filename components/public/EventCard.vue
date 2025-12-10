<template>
    <div
        class="bg-white dark:bg-slate-800 rounded-xl p-4 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 border-l-4 border-primary-500 hover:border-primary-600 cursor-pointer group">
        <!-- Date Badge -->
        <div class="flex items-start gap-4">
            <div class="flex-shrink-0 text-center">
                <div
                    class="w-14 h-14 bg-primary-100 dark:bg-primary-900 rounded-lg flex flex-col items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <div class="text-2xl font-bold text-primary-700 dark:text-primary-400">{{ day }}</div>
                    <div class="text-xs text-primary-700 dark:text-primary-300">{{ month }}</div>
                </div>
            </div>

            <!-- Event Info -->
            <div class="flex-1 min-w-0">
                <h3 class="font-bold text-slate-800 dark:text-white mb-1 line-clamp-1">{{ event.title }}</h3>
                <div class="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                    <div class="flex items-center gap-2">
                        <span>🕐</span>
                        <span>{{ formatTime(event.startDate) }}</span>
                    </div>
                    <div v-if="event.location" class="flex items-center gap-2">
                        <span>📍</span>
                        <span class="truncate">{{ event.location }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    event: any
}>()

const eventDate = computed(() => new Date(props.event.startDate))

const day = computed(() => {
    return eventDate.value.getDate().toString()
})

const month = computed(() => {
    const months = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.']
    return months[eventDate.value.getMonth()]
})

const formatTime = (date: string) => {
    if (!date) return '-'
    return new Date(date).toLocaleTimeString('th-TH', {
        hour: '2-digit',
        minute: '2-digit'
    })
}
</script>
