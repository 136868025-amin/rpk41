<template>
    <div
        class="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-slate-700 dark:to-slate-800 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
        <!-- Icon -->
        <div
            class="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center text-white text-3xl mx-auto mb-4 shadow-md">
            {{ icon }}
        </div>

        <!-- Number -->
        <div class="text-4xl md:text-5xl font-bold text-primary-700 dark:text-primary-400 mb-2">
            {{ value }}
        </div>

        <!-- Label -->
        <div class="text-sm md:text-base text-slate-600 dark:text-slate-300 font-medium">
            {{ label }}
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    icon: string
    value: string | number
    label: string
}>()
</script>
