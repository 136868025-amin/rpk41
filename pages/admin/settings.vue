<template>
    <NuxtLayout name="admin">
        <div class="p-4 md:p-8 max-w-7xl mx-auto">
            <!-- Header -->
            <div
                class="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-6 md:p-8 mb-6 md:mb-8 text-white">
                <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <div>
                        <h1 class="text-2xl md:text-3xl font-bold flex items-center gap-3">
                            <span class="text-3xl md:text-4xl">⚙️</span>
                            <span>School Configuration</span>
                        </h1>
                        <p class="text-blue-100 mt-2 text-sm md:text-base">Manage general settings, contact info, and
                            social media links</p>
                    </div>
                    <button @click="handleSubmit" :disabled="submitting"
                        class="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-xl font-bold shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed transform hover:scale-105 whitespace-nowrap">
                        <span v-if="submitting" class="animate-spin">⏳</span>
                        <span v-else>💾</span>
                        <span>{{ submitting ? 'Saving...' : 'Save Changes' }}</span>
                    </button>
                </div>
            </div>

            <!-- Loading State -->
            <div v-if="loading" class="flex flex-col items-center justify-center py-20">
                <div class="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mb-4"></div>
                <p class="text-slate-500 font-medium">Loading configuration...</p>
            </div>

            <!-- Main Content -->
            <div v-else class="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <!-- Mobile Tabs (Horizontal Scroll) -->
                <div class="lg:hidden col-span-12">
                    <div class="overflow-x-auto pb-2 -mx-4 px-4">
                        <div class="flex gap-2 min-w-max">
                            <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id"
                                class="px-4 py-3 rounded-xl font-medium text-sm whitespace-nowrap transition-all flex items-center gap-2 shrink-0"
                                :class="activeTab === tab.id
                                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
                                    : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'">
                                <span class="text-lg">{{ tab.icon }}</span>
                                <span>{{ tab.label }}</span>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Desktop Sidebar -->
                <div class="hidden lg:block lg:col-span-3">
                    <nav class="sticky top-6 space-y-2">
                        <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id"
                            class="w-full flex items-center gap-3 px-4 py-3.5 text-sm font-medium rounded-xl transition-all"
                            :class="activeTab === tab.id
                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
                                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200 hover:border-blue-300'">
                            <span class="text-2xl">{{ tab.icon }}</span>
                            <span class="font-semibold">{{ tab.label }}</span>
                        </button>
                    </nav>
                </div>

                <!-- Content Area -->
                <div class="col-span-12 lg:col-span-9">
                    <!-- General Settings -->
                    <div v-show="activeTab === 'general'"
                        class="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 md:p-8 animate-fade-in">
                        <div class="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200">
                            <span class="text-3xl">🏫</span>
                            <h2 class="text-2xl font-bold text-slate-800">General Information</h2>
                        </div>

                        <div class="space-y-6">
                            <AppInput v-model="form.schoolName" label="School Name (Thai)"
                                placeholder="e.g. โรงเรียนราชประชานุเคราะห์ ๔๑" icon="🏫" />
                            <AppInput v-model="form.schoolNameEn" label="School Name (English)"
                                placeholder="e.g. Ratchaprachanukroh 41 School" icon="🌏" />
                            <AppInput v-model="form.slogan" label="School Slogan"
                                placeholder="e.g. มุ่งมั่น พัฒนา ก้าวไกล สู่สากล" icon="💡" />

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <AppImageUploader v-model="form.logo" label="School Logo" />
                                <AppImageUploader v-model="form.heroImage" label="Homepage Hero Image" />
                            </div>

                            <div>
                                <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                    <span>🎯</span>
                                    <span>Vision</span>
                                </label>
                                <textarea v-model="form.vision" rows="3"
                                    class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    placeholder="Enter school vision..."></textarea>
                            </div>

                            <div>
                                <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                    <span>🚀</span>
                                    <span>Mission</span>
                                </label>
                                <textarea v-model="form.mission" rows="4"
                                    class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    placeholder="Enter school mission..."></textarea>
                            </div>

                            <AppImageUploader v-model="form.aboutImage" label="About Section Image (800x600)" />
                        </div>
                    </div>

                    <!-- Contact Settings -->
                    <div v-show="activeTab === 'contact'"
                        class="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 md:p-8 animate-fade-in">
                        <div class="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200">
                            <span class="text-3xl">📍</span>
                            <h2 class="text-2xl font-bold text-slate-800">Contact & Location</h2>
                        </div>

                        <div class="space-y-6">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <AppInput v-model="form.contact.phone" label="Phone Number" icon="📞"
                                    placeholder="+66 1234 5678" />
                                <AppInput v-model="form.contact.email" label="Email Address" type="email" icon="✉️"
                                    placeholder="school@example.com" />
                            </div>

                            <AppInput v-model="form.contact.fax" label="Fax Number" icon="📠"
                                placeholder="+66 1234 5679" />

                            <div>
                                <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                    <span>🏢</span>
                                    <span>Address</span>
                                </label>
                                <textarea v-model="form.location.address" rows="3"
                                    class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    placeholder="Enter full address..."></textarea>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <AppInput v-model="form.location.province" label="Province" icon="🗺️" />
                                <AppInput v-model="form.location.postalCode" label="Postal Code" icon="📮" />
                            </div>

                            <div>
                                <AppInput v-model="form.location.mapUrl" label="Google Maps Embed URL" icon="🗺️"
                                    placeholder="https://www.google.com/maps/embed?pb=..." />
                                <p class="text-xs text-slate-500 mt-2 flex items-start gap-2">
                                    <span>💡</span>
                                    <span>Go to Google Maps → Share → Embed a map → Copy HTML → Extract the 'src'
                                        URL</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Social Media -->
                    <div v-show="activeTab === 'social'"
                        class="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 md:p-8 animate-fade-in">
                        <div class="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200">
                            <span class="text-3xl">🌐</span>
                            <h2 class="text-2xl font-bold text-slate-800">Social Media Links</h2>
                        </div>

                        <div class="space-y-6">
                            <AppInput v-model="form.socialMedia.facebook" label="Facebook Page URL" icon="📘"
                                placeholder="https://facebook.com/..." />
                            <AppInput v-model="form.socialMedia.line" label="Line ID / Link" icon="💬"
                                placeholder="@schoolname or https://line.me/..." />
                            <AppInput v-model="form.socialMedia.youtube" label="YouTube Channel URL" icon="📺"
                                placeholder="https://youtube.com/..." />
                            <AppInput v-model="form.socialMedia.instagram" label="Instagram URL" icon="📷"
                                placeholder="https://instagram.com/..." />
                        </div>
                    </div>

                    <!-- History -->
                    <div v-show="activeTab === 'history'"
                        class="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 md:p-8 animate-fade-in">
                        <div class="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200">
                            <span class="text-3xl">📜</span>
                            <h2 class="text-2xl font-bold text-slate-800">School History</h2>
                        </div>
                        <AppRichEditor v-model="form.history" />
                    </div>

                    <!-- Statistics -->
                    <div v-show="activeTab === 'stats'"
                        class="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 md:p-8 animate-fade-in">
                        <div class="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200">
                            <span class="text-3xl">📊</span>
                            <h2 class="text-2xl font-bold text-slate-800">School Statistics</h2>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <AppInput v-model="form.stats.students" label="Number of Students" type="number"
                                icon="👨‍🎓" />
                            <AppInput v-model="form.stats.teachers" label="Number of Teachers" type="number"
                                icon="👨‍🏫" />
                            <AppInput v-model="form.stats.foundedYear" label="Founded Year (B.E.)" type="number"
                                icon="📅" />
                            <AppInput v-model="form.stats.awards" label="Number of Awards" type="number" icon="🏆" />
                        </div>
                    </div>

                    <!-- Director Message -->
                    <div v-show="activeTab === 'director'"
                        class="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 md:p-8 animate-fade-in">
                        <div class="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200">
                            <span class="text-3xl">📢</span>
                            <h2 class="text-2xl font-bold text-slate-800">Director's Message</h2>
                        </div>
                        <AppRichEditor v-model="form.directorMessage" />
                    </div>
                </div>
            </div>

            <!-- Sticky Save Button (Mobile) -->
            <div class="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 shadow-lg z-10">
                <button @click="handleSubmit" :disabled="submitting"
                    class="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-4 rounded-xl font-bold shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70">
                    <span v-if="submitting" class="animate-spin text-xl">⏳</span>
                    <span v-else class="text-xl">💾</span>
                    <span class="text-lg">{{ submitting ? 'Saving...' : 'Save Changes' }}</span>
                </button>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
import AppRichEditor from '~/components/AppRichEditor.vue'
import AppImageUploader from '~/components/AppImageUploader.vue'

definePageMeta({
    middleware: 'auth'
})

const tabs = [
    { id: 'general', label: 'General', icon: '🏫' },
    { id: 'history', label: 'History', icon: '📜' },
    { id: 'stats', label: 'Stats', icon: '📊' },
    { id: 'contact', label: 'Contact', icon: '📍' },
    { id: 'social', label: 'Social', icon: '🌐' },
    { id: 'director', label: 'Director', icon: '📢' },
]

const { showAlert, showLoading, closeAlert } = useAlert()
const activeTab = ref('general')
const loading = ref(true)
const submitting = ref(false)

const form = ref<any>({
    schoolName: '',
    schoolNameEn: '',
    slogan: '',
    logo: '',
    heroImage: '',
    aboutImage: '',
    vision: '',
    mission: '',
    history: '',
    directorMessage: '',
    contact: { phone: '', email: '', fax: '' },
    location: { address: '', province: '', postalCode: '', mapUrl: '' },
    stats: { students: 0, teachers: 0, foundedYear: 2508, awards: 0 },
    socialMedia: { facebook: '', line: '', youtube: '', instagram: '' }
})

onMounted(async () => {
    try {
        const res: any = await $fetch('/api/config')
        if (res && res.data) {
            const data = res.data
            form.value = {
                ...form.value,
                ...data,
                contact: { ...form.value.contact, ...(data.contact || {}) },
                location: { ...form.value.location, ...(data.location || {}) },
                stats: { ...form.value.stats, ...(data.stats || {}) },
                socialMedia: { ...form.value.socialMedia, ...(data.socialMedia || {}) }
            }
        }
    } catch (e) {
        console.error('Failed to fetch config', e)
        showAlert('Failed to load configuration', 'error')
    } finally {
        loading.value = false
    }
})

const handleSubmit = async () => {
    submitting.value = true
    const loadingId = showLoading('Saving configuration...')

    try {
        await $fetch('/api/config', {
            method: 'PUT',
            body: form.value
        })
        closeAlert(loadingId)
        showAlert('Configuration saved successfully! 🎉', 'success')
    } catch (e: any) {
        closeAlert(loadingId)
        showAlert(e.data?.message || 'Failed to save', 'error')
    } finally {
        submitting.value = false
    }
}
</script>

<style scoped>
.animate-fade-in {
    animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Hide scrollbar but keep functionality */
.overflow-x-auto::-webkit-scrollbar {
    height: 4px;
}

.overflow-x-auto::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 10px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 10px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
}
</style>
