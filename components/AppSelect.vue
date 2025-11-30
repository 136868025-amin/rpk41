<template>
    <div class="w-full">
        <label v-if="label" class="block text-sm font-medium text-slate-700 mb-1 font-sans">
            {{ label }} <span v-if="required" class="text-red-500">*</span>
        </label>
        <div class="relative">
            <select :value="modelValue" @input="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
                :required="required" :disabled="disabled"
                class="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-700 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 shadow-sm font-sans"
                :class="{ 'opacity-50 cursor-not-allowed bg-slate-50': disabled }">
                <option v-if="placeholder" value="" disabled selected>{{ placeholder }}</option>
                <option v-for="option in options" :key="option.value" :value="option.value">
                    {{ option.label }}
                </option>
            </select>
            <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-slate-500">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
            </div>
        </div>
        <p v-if="error" class="mt-1 text-xs text-red-500 font-sans">{{ error }}</p>
    </div>
</template>

<script setup lang="ts">
interface Option {
    label: string
    value: string | number
}

defineProps({
    modelValue: {
        type: [String, Number],
        default: ''
    },
    label: {
        type: String,
        default: ''
    },
    options: {
        type: Array as PropType<Option[]>,
        default: () => []
    },
    placeholder: {
        type: String,
        default: ''
    },
    required: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    },
    error: {
        type: String,
        default: ''
    }
})

defineEmits(['update:modelValue'])
</script>
