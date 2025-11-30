<template>
    <div class="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border-l-4 border-primary-500">
        <!-- Date Badge -->
        <div class="flex items-start gap-4">
            <div class="flex-shrink-0 text-center">
                <div class="w-14 h-14 bg-primary-100 rounded-lg flex flex-col items-center justify-center">
                    <div class="text-2xl font-bold text-primary-700">{{ day }}</div>
                    <div class="text-xs text-primary-600">{{ month }}</div>
                </div>
            </div>

            <!-- Event Info -->
            <div class="flex-1 min-w-0">
                <h4 class="font-bold text-slate-800 mb-1 line-clamp-1">{{ event.title }}</h4>
                <div class="space-y-1 text-sm text-slate-600">
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
