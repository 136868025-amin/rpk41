<template>
    <div class="w-full">
        <label v-if="label" class="block text-sm font-medium text-slate-700 mb-1 font-sans">
            {{ label }} <span v-if="required" class="text-red-500">*</span>
        </label>
        <input :value="modelValue" @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
            :type="type" :placeholder="placeholder" :required="required" :disabled="disabled"
            class="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 shadow-sm font-sans"
            :class="{ 'opacity-50 cursor-not-allowed bg-slate-50': disabled }" />
        <p v-if="error" class="mt-1 text-xs text-red-500 font-sans">{{ error }}</p>
    </div>
</template>

<script setup lang="ts">
defineProps({
    modelValue: {
        type: [String, Number],
        default: ''
    },
    label: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: 'text'
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
