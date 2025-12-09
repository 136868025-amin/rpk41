<template>
    <div class="flex items-center gap-3">
        <span v-if="showLabel" class="text-sm text-slate-500 dark:text-slate-400">แชร์:</span>

        <!-- Facebook Share -->
        <button @click="shareToFacebook"
            class="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-all hover:scale-110 shadow-md"
            title="แชร์ไปยัง Facebook">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                    d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" />
            </svg>
        </button>

        <!-- Line Share -->
        <button @click="shareToLine"
            class="w-10 h-10 flex items-center justify-center rounded-full bg-green-500 hover:bg-green-600 text-white transition-all hover:scale-110 shadow-md"
            title="แชร์ไปยัง Line">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                    d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.064-.022.135-.033.203-.033.211 0 .391.09.51.25l2.437 3.311V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.349 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
            </svg>
        </button>

        <!-- Copy Link -->
        <button @click="copyLink"
            class="w-10 h-10 flex items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 transition-all hover:scale-110 shadow-md"
            :title="copied ? 'คัดลอกแล้ว!' : 'คัดลอกลิงก์'">
            <svg v-if="!copied" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <svg v-else class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
        </button>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    url?: string
    title?: string
    showLabel?: boolean
}>()

const copied = ref(false)

const shareUrl = computed(() => {
    if (props.url) return props.url
    if (typeof window !== 'undefined') return window.location.href
    return ''
})

const shareTitle = computed(() => {
    return props.title || document.title
})

const shareToFacebook = () => {
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl.value)}`
    window.open(fbUrl, '_blank', 'width=600,height=400')
}

const shareToLine = () => {
    const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl.value)}`
    window.open(lineUrl, '_blank', 'width=600,height=400')
}

const copyLink = async () => {
    try {
        await navigator.clipboard.writeText(shareUrl.value)
        copied.value = true
        setTimeout(() => {
            copied.value = false
        }, 2000)
    } catch (e) {
        console.error('Failed to copy link:', e)
    }
}
</script>
