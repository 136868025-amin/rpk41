<template>
    <NuxtLayout name="admin">
        <div class="max-w-5xl mx-auto">
            <div class="flex items-center justify-between mb-8">
                <div>
                    <h1 class="text-2xl font-bold text-slate-800">School Configuration</h1>
                    <p class="text-slate-500 mt-1">Manage general settings, contact info, and social media links.</p>
                </div>
                <button @click="handleSubmit" :disabled="submitting"
                    class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium shadow-sm transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                    <span v-if="submitting" class="animate-spin">⏳</span>
                    <span>{{ submitting ? 'Saving...' : 'Save Changes' }}</span>
                </button>
            </div>

            <div v-if="loading" class="flex justify-center py-12">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>

            <div v-else class="grid grid-cols-12 gap-6">
                <!-- Sidebar Navigation -->
                <div class="col-span-12 md:col-span-3">
                    <nav class="space-y-1">
                        <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id"
                            class="w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors"
                            :class="activeTab === tab.id ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'">
                            <span class="text-xl">{{ tab.icon }}</span>
                            <span>{{ tab.label }}</span>
                        </button>
                    </nav>
                </div>

                <!-- Content Area -->
                <div class="col-span-12 md:col-span-9 space-y-6">
                    <!-- General Settings -->
                    <div v-show="activeTab === 'general'"
                        class="bg-white rounded-xl shadow-sm border border-slate-200 p-6 animate-fade-in">
                        <h2 class="text-lg font-bold text-slate-800 mb-4 border-b pb-2">General Information</h2>
                        <div class="grid grid-cols-1 gap-6">
                            <AppInput v-model="form.schoolName" label="School Name (Thai)"
                                placeholder="e.g. โรงเรียนราชประชานุเคราะห์ ๔๑" />
                            <AppInput v-model="form.schoolNameEn" label="School Name (English)"
                                placeholder="e.g. Ratchaprachanukroh 41 School" />

                            <AppInput v-model="form.slogan" label="School Slogan"
                                placeholder="e.g. มุ่งมั่น พัฒนา ก้าวไกล สู่สากล" />

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <AppImageUploader v-model="form.logo" label="School Logo" />
                                <AppImageUploader v-model="form.heroImage" label="Homepage Hero Image" />
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-slate-700 mb-1">Vision</label>
                                <textarea v-model="form.vision" rows="3"
                                    class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"></textarea>
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-slate-700 mb-1">Mission</label>
                                <textarea v-model="form.mission" rows="4"
                                    class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"></textarea>
                            </div>

                            <AppImageUploader v-model="form.aboutImage" label="About Section Image (800x600)" />
                        </div>
                    </div>

                    <!-- Contact Settings -->
                    <div v-show="activeTab === 'contact'"
                        class="bg-white rounded-xl shadow-sm border border-slate-200 p-6 animate-fade-in">
                        <h2 class="text-lg font-bold text-slate-800 mb-4 border-b pb-2">Contact & Location</h2>
                        <div class="space-y-6">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <AppInput v-model="form.contact.phone" label="Phone Number" icon="📞" />
                                <AppInput v-model="form.contact.email" label="Email Address" type="email" icon="✉️" />
                                <AppInput v-model="form.contact.fax" label="Fax Number" icon="fax" />
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-slate-700 mb-1">Address</label>
                                <textarea v-model="form.location.address" rows="3"
                                    class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"></textarea>
                            </div>

                            <AppInput v-model="form.location.province" label="Province" />
                            <AppInput v-model="form.location.postalCode" label="Postal Code" />
                        </div>

                        <div>
                            <AppInput v-model="form.location.mapUrl" label="Google Maps Embed URL"
                                placeholder="https://www.google.com/maps/embed?pb=..." />
                            <p class="text-xs text-slate-500 mt-1">
                                Go to Google Maps > Share > Embed a map > Copy HTML > Extract the 'src' URL.
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Social Media -->
                <div v-show="activeTab === 'social'"
                    class="bg-white rounded-xl shadow-sm border border-slate-200 p-6 animate-fade-in">
                    <h2 class="text-lg font-bold text-slate-800 mb-4 border-b pb-2">Social Media Links</h2>
                    <div class="space-y-6">
                        <AppInput v-model="form.socialMedia.facebook" label="Facebook Page URL"
                            placeholder="https://facebook.com/..." />
                        <AppInput v-model="form.socialMedia.line" label="Line ID / Link" placeholder="@..." />
                        <AppInput v-model="form.socialMedia.youtube" label="YouTube Channel URL"
                            placeholder="https://youtube.com/..." />
                    </div>
                </div>

                <!-- History -->
                <div v-show="activeTab === 'history'"
                    class="bg-white rounded-xl shadow-sm border border-slate-200 p-6 animate-fade-in">
                    <h2 class="text-lg font-bold text-slate-800 mb-4 border-b pb-2">School History</h2>
                    <div class="space-y-4">
                        <AppRichEditor v-model="form.history" />
                    </div>
                </div>

                <!-- Statistics -->
                <div v-show="activeTab === 'stats'"
                    class="bg-white rounded-xl shadow-sm border border-slate-200 p-6 animate-fade-in">
                    <h2 class="text-lg font-bold text-slate-800 mb-4 border-b pb-2">School Statistics</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <AppInput v-model="form.stats.students" label="Number of Students" type="number" />
                        <AppInput v-model="form.stats.teachers" label="Number of Teachers" type="number" />
                        <AppInput v-model="form.stats.foundedYear" label="Founded Year (B.E.)" type="number" />
                        <AppInput v-model="form.stats.awards" label="Number of Awards" type="number" />
                    </div>
                </div>

                <!-- Director Message -->
                <div v-show="activeTab === 'director'"
                    class="bg-white rounded-xl shadow-sm border border-slate-200 p-6 animate-fade-in">
                    <h2 class="text-lg font-bold text-slate-800 mb-4 border-b pb-2">Director's Message</h2>
                    <div class="space-y-4">
                        <AppRichEditor v-model="form.directorMessage" />
                    </div>
                </div>
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
    { id: 'general', label: 'General Info', icon: '🏫' },
    { id: 'history', label: 'School History', icon: '📜' },
    { id: 'stats', label: 'Statistics', icon: '📊' },
    { id: 'contact', label: 'Contact & Location', icon: '📍' },
    { id: 'social', label: 'Social Media', icon: '🌐' },
    { id: 'director', label: 'Director Message', icon: '📢' },
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
            // Merge response with defaults to ensure nested objects exist
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
        showAlert('Configuration saved successfully!', 'success')
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
        transform: translateY(5px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
