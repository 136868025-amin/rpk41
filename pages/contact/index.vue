<template>
    <div class="min-h-screen bg-slate-50 dark:bg-slate-900 pb-12">
        <!-- Header -->
        <div class="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 class="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">ติดต่อเรา</h1>
                <p class="text-slate-600 dark:text-slate-300 text-lg">ช่องทางการติดต่อและแผนที่การเดินทาง</p>
            </div>
        </div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <!-- Loading State -->
            <div v-if="pending" class="flex justify-center py-12">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>

            <div v-else-if="schoolConfig" class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <!-- Contact Info & Map -->
                <div class="space-y-8">
                    <!-- Info Cards -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div
                            class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                            <div
                                class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-xl mb-4">
                                📍
                            </div>
                            <h3 class="font-bold text-slate-800 dark:text-white mb-2">ที่อยู่</h3>
                            <p class="text-slate-600 dark:text-slate-300 text-sm">
                                {{ schoolConfig.location?.address }}<br>
                                จ.{{ schoolConfig.location?.province }} {{ schoolConfig.location?.postalCode }}
                            </p>
                        </div>

                        <div
                            class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                            <div
                                class="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center text-xl mb-4">
                                📞
                            </div>
                            <h3 class="font-bold text-slate-800 dark:text-white mb-2">เบอร์โทรศัพท์</h3>
                            <p class="text-slate-600 dark:text-slate-300 text-sm">
                                <a :href="`tel:${schoolConfig.contact?.phone}`" class="hover:text-primary-600">
                                    {{ schoolConfig.contact?.phone }}
                                </a>
                            </p>
                            <p v-if="schoolConfig.contact?.fax" class="text-slate-600 dark:text-slate-300 text-sm mt-1">
                                Fax: {{ schoolConfig.contact?.fax }}
                            </p>
                        </div>

                        <div
                            class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                            <div
                                class="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center text-xl mb-4">
                                📧
                            </div>
                            <h3 class="font-bold text-slate-800 dark:text-white mb-2">อีเมล</h3>
                            <p class="text-slate-600 dark:text-slate-300 text-sm">
                                <a :href="`mailto:${schoolConfig.contact?.email}`" class="hover:text-primary-600">
                                    {{ schoolConfig.contact?.email }}
                                </a>
                            </p>
                        </div>

                        <div
                            class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                            <div
                                class="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-xl mb-4">
                                🌐
                            </div>
                            <h3 class="font-bold text-slate-800 dark:text-white mb-2">โซเชียลมีเดีย</h3>
                            <div class="flex gap-3 mt-2">
                                <a v-if="schoolConfig.socialMedia?.facebook" :href="schoolConfig.socialMedia.facebook"
                                    target="_blank" class="text-blue-600 hover:scale-110 transition-transform text-2xl">
                                    <i class="fab fa-facebook"></i> 📘
                                </a>
                                <a v-if="schoolConfig.socialMedia?.line" :href="schoolConfig.socialMedia.line"
                                    target="_blank"
                                    class="text-green-500 hover:scale-110 transition-transform text-2xl">
                                    <i class="fab fa-line"></i> 💬
                                </a>
                                <a v-if="schoolConfig.socialMedia?.youtube" :href="schoolConfig.socialMedia.youtube"
                                    target="_blank" class="text-red-600 hover:scale-110 transition-transform text-2xl">
                                    <i class="fab fa-youtube"></i> 📺
                                </a>
                            </div>
                        </div>
                    </div>

                    <!-- Map -->
                    <div
                        class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden h-[400px]">
                        <iframe v-if="schoolConfig.location?.mapUrl" :src="schoolConfig.location.mapUrl" width="100%"
                            height="100%" style="border:0;" allowfullscreen="true" loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade">
                        </iframe>
                        <div v-else
                            class="w-full h-full flex items-center justify-center bg-slate-100 dark:bg-slate-700 text-slate-400">
                            ไม่พบข้อมูลแผนที่
                        </div>
                    </div>
                </div>

                <!-- Contact Form -->
                <div
                    class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-8">
                    <h2 class="text-2xl font-bold text-slate-800 dark:text-white mb-6">ส่งข้อความถึงเรา</h2>
                    <form @submit.prevent="handleSubmit" class="space-y-6">
                        <div>
                            <label
                                class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">ชื่อ-นามสกุล</label>
                            <input v-model="form.name" type="text" required
                                class="w-full px-4 py-2 border dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none"
                                placeholder="ระบุชื่อของคุณ" />
                        </div>

                        <div>
                            <label
                                class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">อีเมล</label>
                            <input v-model="form.email" type="email" required
                                class="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none"
                                placeholder="example@email.com" />
                        </div>

                        <div>
                            <label
                                class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">หัวข้อเรื่อง</label>
                            <input v-model="form.subject" type="text" required
                                class="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none"
                                placeholder="ระบุหัวข้อเรื่องที่ต้องการติดต่อ" />
                        </div>

                        <div>
                            <label
                                class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">ข้อความ</label>
                            <textarea v-model="form.message" rows="5" required
                                class="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none"
                                placeholder="รายละเอียดข้อความ..."></textarea>
                        </div>

                        <button type="submit" :disabled="submitting"
                            class="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 rounded-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed">
                            {{ submitting ? 'กำลังส่งข้อความ...' : 'ส่งข้อความ' }}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'default'
})

const { schoolConfig, fetchSchoolConfig } = usePublicData()
const pending = ref(true)
const submitting = ref(false)
const { showAlert } = useAlert()

const form = ref({
    name: '',
    email: '',
    subject: '',
    message: ''
})

onMounted(async () => {
    if (!schoolConfig.value) {
        await fetchSchoolConfig()
    }
    pending.value = false
})

const handleSubmit = async () => {
    submitting.value = true
    try {
        await $fetch('/api/contact', {
            method: 'POST',
            body: form.value
        })
        showAlert('ส่งข้อความเรียบร้อยแล้ว เราจะติดต่อกลับโดยเร็วที่สุด', 'success')
        form.value = { name: '', email: '', subject: '', message: '' }
    } catch (e) {
        showAlert('เกิดข้อผิดพลาดในการส่งข้อความ กรุณาลองใหม่อีกครั้ง', 'error')
    } finally {
        submitting.value = false
    }
}

useHead({
    title: 'ติดต่อเรา - โรงเรียนราชประชานุเคราะห์ 41',
    meta: [
        { name: 'description', content: 'ช่องทางการติดต่อและแผนที่การเดินทาง โรงเรียนราชประชานุเคราะห์ 41' }
    ]
})
</script>
