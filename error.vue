<template>
    <div class="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 px-4">
        <div class="text-center max-w-md">
            <div class="text-8xl mb-6">{{ errorEmoji }}</div>
            <h1 class="text-4xl font-bold text-slate-800 dark:text-white mb-4">
                {{ error?.statusCode || 500 }}
            </h1>
            <h2 class="text-xl font-semibold text-slate-600 dark:text-slate-400 mb-4">
                {{ errorTitle }}
            </h2>
            <p class="text-slate-500 dark:text-slate-500 mb-8">
                {{ errorMessage }}
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <NuxtLink to="/"
                    class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-colors">
                    🏠 กลับหน้าหลัก
                </NuxtLink>
                <button @click="handleError"
                    class="px-6 py-3 border-2 border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 rounded-xl font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                    🔄 ลองใหม่
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const error = useError()

const errorEmoji = computed(() => {
    const code = error.value?.statusCode
    if (code === 404) return '🔍'
    if (code === 403) return '🚫'
    if (code === 401) return '🔐'
    if (code === 500) return '💥'
    return '😵'
})

const errorTitle = computed(() => {
    const code = error.value?.statusCode
    if (code === 404) return 'ไม่พบหน้าที่ต้องการ'
    if (code === 403) return 'ไม่มีสิทธิ์เข้าถึง'
    if (code === 401) return 'กรุณาเข้าสู่ระบบ'
    if (code === 500) return 'เกิดข้อผิดพลาด'
    return 'เกิดปัญหาบางอย่าง'
})

const errorMessage = computed(() => {
    const code = error.value?.statusCode
    if (code === 404) return 'หน้าที่คุณกำลังมองหาอาจถูกย้ายหรือลบไปแล้ว'
    if (code === 403) return 'คุณไม่มีสิทธิ์เข้าถึงหน้านี้'
    if (code === 401) return 'กรุณาเข้าสู่ระบบเพื่อดำเนินการต่อ'
    return 'ขออภัยในความไม่สะดวก กรุณาลองใหม่อีกครั้ง'
})

const handleError = () => clearError({ redirect: '/' })
</script>
