<template>
    <NuxtLayout name="admin">
        <div class="p-4 md:p-8 max-w-6xl mx-auto">
            <!-- Header -->
            <div class="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-6 md:p-8 mb-8 text-white">
                <div class="flex items-center gap-4">
                    <div class="p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
                        <span class="text-4xl">👤</span>
                    </div>
                    <div>
                        <h1 class="text-2xl md:text-3xl font-bold">My Profile</h1>
                        <p class="text-blue-100 mt-1">Manage your account settings and preferences</p>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                <!-- Left Column: Profile Card -->
                <div class="lg:col-span-1">
                    <div class="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 md:p-8 sticky top-6">
                        <div class="flex flex-col items-center text-center">
                            <!-- Avatar -->
                            <div class="relative group mb-6">
                                <div
                                    class="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-5xl font-bold shadow-xl ring-4 ring-white transform transition-transform group-hover:scale-105">
                                    {{ profileInitial }}
                                </div>
                                <button title="Change avatar"
                                    class="absolute bottom-0 right-0 w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all transform hover:scale-110">
                                    <span class="text-xl">📷</span>
                                </button>
                            </div>

                            <!-- User Info -->
                            <h3 class="text-xl font-bold text-slate-800 mb-2">{{ profile.name || 'Administrator' }}</h3>
                            <p class="text-sm text-slate-500 mb-3">{{ profile.email || 'admin@school.ac.th' }}</p>
                            <span
                                class="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold rounded-full shadow-md">
                                System Admin
                            </span>

                            <!-- Stats -->
                            <div class="w-full mt-8 pt-8 border-t border-slate-200 grid grid-cols-2 gap-4 text-center">
                                <div>
                                    <p class="text-2xl font-bold text-slate-800">42</p>
                                    <p class="text-xs text-slate-500 font-medium">Posts</p>
                                </div>
                                <div>
                                    <p class="text-2xl font-bold text-slate-800">15</p>
                                    <p class="text-xs text-slate-500 font-medium">Albums</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right Column: Forms -->
                <div class="lg:col-span-2 space-y-6">
                    <!-- Personal Information Card -->
                    <div class="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 md:p-8 animate-fade-in">
                        <div class="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200">
                            <span class="text-3xl">👨‍💼</span>
                            <h2 class="text-2xl font-bold text-slate-800">Personal Information</h2>
                        </div>

                        <form @submit.prevent="updateProfile" class="space-y-6">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label
                                        class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                        <span>✍️</span>
                                        <span>Full Name</span>
                                    </label>
                                    <input v-model="profile.name" type="text" required
                                        class="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all" />
                                </div>

                                <div>
                                    <label
                                        class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                        <span>✉️</span>
                                        <span>Email Address</span>
                                    </label>
                                    <input v-model="profile.email" type="email" required
                                        class="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all" />
                                </div>
                            </div>

                            <div>
                                <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                    <span>📞</span>
                                    <span>Phone Number</span>
                                </label>
                                <input v-model="profile.phone" type="tel"
                                    class="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
                                    placeholder="02-123-4567" />
                            </div>

                            <div class="pt-4 flex justify-end">
                                <button type="submit" :disabled="submitting"
                                    class="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-bold shadow-lg transition-all transform hover:scale-105 disabled:opacity-70 disabled:transform-none flex items-center gap-2">
                                    <span v-if="submitting" class="animate-spin">⏳</span>
                                    <span v-else>💾</span>
                                    <span>{{ submitting ? 'Saving...' : 'Save Changes' }}</span>
                                </button>
                            </div>
                        </form>
                    </div>

                    <!-- Change Password Card -->
                    <div class="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 md:p-8 animate-fade-in">
                        <div class="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200">
                            <span class="text-3xl">🔐</span>
                            <h2 class="text-2xl font-bold text-slate-800">Change Password</h2>
                        </div>

                        <form @submit.prevent="changePassword" class="space-y-6">
                            <div>
                                <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                    <span>🔒</span>
                                    <span>Current Password</span>
                                </label>
                                <input v-model="passwordForm.current" type="password" required
                                    class="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all" />
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label
                                        class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                        <span>🆕</span>
                                        <span>New Password</span>
                                    </label>
                                    <input v-model="passwordForm.new" type="password" required minlength="6"
                                        class="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all" />
                                    <p class="text-xs text-slate-500 mt-2 flex items-center gap-1">
                                        <span>ℹ️</span>
                                        <span>At least 6 characters</span>
                                    </p>
                                </div>

                                <div>
                                    <label
                                        class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                        <span>✅</span>
                                        <span>Confirm Password</span>
                                    </label>
                                    <input v-model="passwordForm.confirm" type="password" required
                                        class="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all" />
                                </div>
                            </div>

                            <div class="pt-4 flex justify-end">
                                <button type="submit" :disabled="changingPassword"
                                    class="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-bold shadow-lg transition-all transform hover:scale-105 disabled:opacity-70 disabled:transform-none flex items-center gap-2">
                                    <span v-if="changingPassword" class="animate-spin">⏳</span>
                                    <span v-else>🔑</span>
                                    <span>{{ changingPassword ? 'Updating...' : 'Update Password' }}</span>
                                </button>
                            </div>
                        </form>
                    </div>

                    <!-- Account Settings Card -->
                    <div class="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 md:p-8 animate-fade-in">
                        <div class="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200">
                            <span class="text-3xl">⚙️</span>
                            <h2 class="text-2xl font-bold text-slate-800">Account Settings</h2>
                        </div>

                        <div class="space-y-6">
                            <!-- Email Notifications -->
                            <div
                                class="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                                <div class="flex items-start gap-3">
                                    <span class="text-2xl mt-1">📧</span>
                                    <div>
                                        <h3 class="text-sm font-bold text-slate-800">Email Notifications</h3>
                                        <p class="text-xs text-slate-500 mt-1">Receive email alerts for important
                                            updates</p>
                                    </div>
                                </div>
                                <label class="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" v-model="settings.emailNotifications" class="sr-only peer">
                                    <div
                                        class="w-14 h-7 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-blue-600 peer-checked:to-purple-600 shadow-inner">
                                    </div>
                                </label>
                            </div>

                            <!-- Two-Factor Auth -->
                            <div
                                class="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                                <div class="flex items-start gap-3">
                                    <span class="text-2xl mt-1">🔐</span>
                                    <div>
                                        <h3 class="text-sm font-bold text-slate-800">Two-Factor Authentication</h3>
                                        <p class="text-xs text-slate-500 mt-1">Add an extra layer of security</p>
                                    </div>
                                </div>
                                <button
                                    class="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-sm font-bold rounded-lg shadow-md transition-all transform hover:scale-105">
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
        showAlert('Profile updated successfully! 🎉', 'success')
    } catch (e) {
        closeAlert(loadingId)
        showAlert('Failed to update profile', 'error')
    } finally {
        submitting.value = false
    }
}

const changePassword = async () => {
    if (passwordForm.value.new !== passwordForm.value.confirm) {
        showAlert('Passwords do not match ❌', 'error')
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
        showAlert('Password changed successfully! 🔒', 'success')

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

<style scoped>
.animate-fade-in {
    animation: fadeIn 0.3s ease-out;
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
</style>
