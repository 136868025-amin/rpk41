<template>
    <NuxtLayout name="admin">
        <div class="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 p-8">
            <div class="flex justify-between items-center mb-8">
                <h1 class="text-2xl font-bold text-slate-800">Add Personnel</h1>
                <NuxtLink to="/admin/personnel" class="text-slate-500 hover:text-slate-700">
                    Cancel
                </NuxtLink>
            </div>

            <form @submit.prevent="handleSubmit" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Name -->
                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-1">Name</label>
                        <input v-model="form.name" type="text" required
                            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                    </div>

                    <!-- Position -->
                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-1">Position</label>
                        <input v-model="form.position" type="text" required
                            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Department -->
                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-1">Department</label>
                        <select v-model="form.department"
                            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none">
                            <option value="administrators">Administrators (ผู้บริหาร)</option>
                            <option value="teachers">Teachers (ครูอาจารย์)</option>
                            <option value="support_staff">Support Staff (บุคลากรสนับสนุน)</option>
                        </select>
                    </div>

                    <!-- Order Index -->
                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-1">Order Index (Sort Order)</label>
                        <input v-model="form.orderIndex" type="number"
                            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Email -->
                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-1">Email (Optional)</label>
                        <input v-model="form.email" type="email"
                            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                    </div>

                    <!-- Phone -->
                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-1">Phone (Optional)</label>
                        <input v-model="form.phone" type="text"
                            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                    </div>
                </div>

                <!-- Photo -->
                <AppImageUploader v-model="form.photo" label="Profile Photo" />

                <!-- Content (Rich Text) -->
                <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1">Biography / Portfolio</label>
                    <AppRichEditor v-model="form.content" />
                </div>

                <!-- Gallery -->
                <AppMultiImageUploader v-model="form.gallery" label="Portfolio Gallery" />

                <!-- Submit Button -->
                <div class="pt-4 border-t border-slate-100 flex justify-end">
                    <button type="submit"
                        class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold shadow-lg transition-transform transform hover:scale-105"
                        :disabled="submitting">
                        {{ submitting ? 'Saving...' : 'Add Personnel' }}
                    </button>
                </div>
            </form>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
import AppImageUploader from '~/components/AppImageUploader.vue'
import AppRichEditor from '~/components/AppRichEditor.vue'
import AppMultiImageUploader from '~/components/AppMultiImageUploader.vue'

definePageMeta({
    middleware: 'auth'
})

const router = useRouter()
const { showAlert } = useAlert()
const submitting = ref(false)

const form = ref<any>({
    name: '',
    position: '',
    department: 'teachers',
    photo: '',
    orderIndex: 0,
    email: '',
    phone: '',
    content: '',
    gallery: [] as string[]
})

const handleSubmit = async () => {
    submitting.value = true
    try {
        await $fetch('/api/personnel', {
            method: 'POST',
            body: form.value
        })
        showAlert('Personnel added successfully', 'success')
        router.push('/admin/personnel')
    } catch (e: any) {
        showAlert(e.data?.message || 'Failed to save', 'error')
    } finally {
        submitting.value = false
    }
}
</script>
