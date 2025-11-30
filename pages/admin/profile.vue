<template>
    <NuxtLayout name="admin">
        <div class="max-w-4xl mx-auto p-8">
            <h1 class="text-2xl font-bold text-slate-800 mb-8">My Profile</h1>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <!-- Left Column: Profile Picture -->
                <div class="lg:col-span-1">
                    <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <div class="flex flex-col items-center">
                            <div class="relative group">
                                <div
                                    class="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg ring-4 ring-white">
                                    {{ profileInitial }}
                                </div>
                                <button
                                    class="absolute bottom-0 right-0 w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-colors">
                                    📷
                                </button>
                            </div>
                            <h3 class="mt-4 text-lg font-bold text-slate-800">{{ profile.name || 'Administrator' }}</h3>
                            <p class="text-sm text-slate-500">{{ profile.email || 'admin@school.ac.th' }}</p>
                            <span class="mt-3 px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                                System Admin
                            </span>
                        </div>
                    </div>
                </div>

                <!-- Right Column: Forms -->
                <div class="lg:col-span-2 space-y-6">
                    <!-- Personal Information -->
                    <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <h2 class="text-lg font-bold text-slate-800 mb-4 border-b pb-3">Personal Information</h2>
                        <form @submit.prevent="updateProfile" class="space-y-4">
                            <div>
                                <label class="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                                <input v-model="profile.name" type="text" required
                                    class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-slate-700 mb-1">Email</label>
                                <input v-model="profile.email" type="email" required
                                    class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                                <input v-model="profile.phone" type="tel"
                                    class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                            </div>
                            <div class="pt-3 flex justify-end">
                                <button type="submit" :disabled="submitting"
                                    class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50">
                                    {{ submitting ? 'Saving...' : 'Save Changes' }}
                                </button>
                            </div>
                        </form>
                    </div>

                    <!-- Change Password -->
                    <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <h2 class="text-lg font-bold text-slate-800 mb-4 border-b pb-3">Change Password</h2>
                        <form @submit.prevent="changePassword" class="space-y-4">
                            <div>
                                <label class="block text-sm font-medium text-slate-700 mb-1">Current Password</label>
                                <input v-model="passwordForm.current" type="password" required
                                    class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-slate-700 mb-1">New Password</label>
                                <input v-model="passwordForm.new" type="password" required minlength="6"
                                    class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                                <p class="text-xs text-slate-500 mt-1">At least 6 characters</p>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-slate-700 mb-1">Confirm New
                                    Password</label>
                                <input v-model="passwordForm.confirm" type="password" required
                                    class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                            </div>
                            <div class="pt-3 flex justify-end">
                                <button type="submit" :disabled="changingPassword"
                                    class="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50">
                                    {{ changingPassword ? 'Updating...' : 'Update Password' }}
                                </button>
                            </div>
                        </form>
                    </div>

                    <!-- Account Settings -->
                    <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <h2 class="text-lg font-bold text-slate-800 mb-4 border-b pb-3">Account Settings</h2>
                        <div class="space-y-4">
                            <div class="flex items-center justify-between">
                                <div>
                                    <h3 class="text-sm font-medium text-slate-800">Email Notifications</h3>
                                    <p class="text-xs text-slate-500">Receive email alerts for important updates</p>
                                </div>
                                <label class="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" v-model="settings.emailNotifications" class="sr-only peer">
                                    <div
                                        class="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600">
                                    </div>
                                </label>
                            </div>
                            <div class="flex items-center justify-between">
                                <div>
                                    <h3 class="text-sm font-medium text-slate-800">Two-Factor Authentication</h3>
                                    <p class="text-xs text-slate-500">Add an extra layer of security</p>
                                </div>
                                <button
                                    class="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm rounded-lg transition-colors">
                                    Enable
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: 'auth'
})

const { showAlert, showLoading, closeAlert } = useAlert()

const profile = ref({
    name: 'Administrator',
    email: 'admin@school.ac.th',
    phone: '02-123-4567'
})

const passwordForm = ref({
    current: '',
    new: '',
    confirm: ''
})

const settings = ref({
    emailNotifications: true
})

const submitting = ref(false)
const changingPassword = ref(false)

const profileInitial = computed(() => {
    return profile.value.name ? profile.value.name.charAt(0).toUpperCase() : 'A'
})

const updateProfile = async () => {
    submitting.value = true
    const loadingId = showLoading('Updating profile...')

    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))

        closeAlert(loadingId)
        showAlert('Profile updated successfully!', 'success')
    } catch (e) {
        closeAlert(loadingId)
        showAlert('Failed to update profile', 'error')
    } finally {
        submitting.value = false
    }
}

const changePassword = async () => {
    if (passwordForm.value.new !== passwordForm.value.confirm) {
        showAlert('Passwords do not match', 'error')
        return
    }

    if (passwordForm.value.new.length < 6) {
        showAlert('Password must be at least 6 characters', 'error')
        return
    }

    changingPassword.value = true
    const loadingId = showLoading('Changing password...')

    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))

        closeAlert(loadingId)
        showAlert('Password changed successfully!', 'success')

        // Clear form
        passwordForm.value = { current: '', new: '', confirm: '' }
    } catch (e) {
        closeAlert(loadingId)
        showAlert('Failed to change password', 'error')
    } finally {
        changingPassword.value = false
    }
}
</script>
