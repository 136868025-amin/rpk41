<template>
    <NuxtLayout name="admin">
        <div class="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 p-8">
            <div class="flex justify-between items-center mb-8">
                <h1 class="text-2xl font-bold text-slate-800">
                    <span v-if="loading">Edit Event</span>
                    <span v-else>Edit Event: {{ form.title }}</span>
                </h1>
                <NuxtLink to="/admin/calendar" class="text-slate-500 hover:text-slate-700">
                    Cancel
                </NuxtLink>
            </div>

            <div v-if="loading" class="text-center py-12">
                Loading...
            </div>

            <form v-else @submit.prevent="handleSubmit" class="space-y-6">
                <!-- Title -->
                <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1">Event Title</label>
                    <input v-model="form.title" type="text" required
                        class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Start Date -->
                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-1">Start Date</label>
                        <input v-model="form.startDate" type="date" required
                            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                    </div>

                    <!-- End Date -->
                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-1">End Date (Optional)</label>
                        <input v-model="form.endDate" type="date"
                            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Type -->
                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-1">Event Type</label>
                        <select v-model="form.type"
                            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none">
                            <option value="academic">Academic (วิชาการ)</option>
                            <option value="activity">Activity (กิจกรรม)</option>
                            <option value="holiday">Holiday (วันหยุด)</option>
                            <option value="exam">Exam (การสอบ)</option>
                        </select>
                    </div>

                    <!-- Location -->
                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-1">Location</label>
                        <input v-model="form.location" type="text"
                            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                    </div>
                </div>

                <!-- Description -->
                <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1">Description</label>
                    <textarea v-model="form.description" rows="4"
                        class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"></textarea>
                </div>

                <!-- Submit Button -->
                <div class="pt-4 border-t border-slate-100 flex justify-end">
                    <button type="submit"
                        class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold shadow-lg transition-transform transform hover:scale-105"
                        :disabled="submitting">
                        {{ submitting ? 'Saving...' : 'Update Event' }}
                    </button>
                </div>
            </form>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { useBreadcrumbStore } from '~/stores/breadcrumb'

definePageMeta({
    middleware: 'auth'
})

const breadcrumbStore = useBreadcrumbStore()

const route = useRoute()
const router = useRouter()
const id = route.params.id as string
const loading = ref(true)
const submitting = ref(false)

const form = ref<any>({
    title: '',
    startDate: '',
    endDate: '',
    type: 'activity',
    location: '',
    description: ''
})

onMounted(async () => {
    try {
        const res: any = await $fetch(`/api/calendar/${id}`)
        const data = res.data
        form.value = {
            ...data,
            startDate: data.startDate ? new Date(data.startDate).toISOString().split('T')[0] : '',
            endDate: data.endDate ? new Date(data.endDate).toISOString().split('T')[0] : ''
        }
        // Set breadcrumb title
        breadcrumbStore.setTitle(data.title)
    } catch (e) {
        alert('Event not found')
        router.push('/admin/calendar')
    } finally {
        loading.value = false
    }
})

const handleSubmit = async () => {
    submitting.value = true
    try {
        await $fetch(`/api/calendar/${id}`, {
            method: 'PUT',
            body: form.value
        })
        router.push('/admin/calendar')
    } catch (e: any) {
        alert(e.data?.message || 'Failed to update')
    } finally {
        submitting.value = false
    }
}
</script>
