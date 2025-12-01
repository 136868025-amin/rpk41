<template>
    <NuxtLayout name="admin">
        <div class="p-4 md:p-8 max-w-4xl mx-auto">
            <!-- Header -->
            <div
                class="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-xl p-6 md:p-8 mb-8 text-white">
                <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <div class="flex items-center gap-4">
                        <div class="p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
                            <span class="text-4xl">📅</span>
                        </div>
                        <div>
                            <h1 class="text-2xl md:text-3xl font-bold">Add Event</h1>
                            <p class="text-indigo-100 mt-1">Schedule a new calendar event</p>
                        </div>
                    </div>
                    <NuxtLink to="/admin/calendar"
                        class="px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl font-semibold transition-all text-center">
                        Cancel
                    </NuxtLink>
                </div>
            </div>

            <!-- Form Card -->
            <div class="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 md:p-8">
                <form @submit.prevent="handleSubmit" class="space-y-8">
                    <!-- Title -->
                    <div>
                        <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                            <span>📌</span>
                            <span>Event Title</span>
                        </label>
                        <input v-model="form.title" type="text" required
                            class="w-full px-4 py-3 text-lg font-semibold bg-slate-50 border-2 border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all"
                            placeholder="Enter event title..." />
                    </div>

                    <!-- Start & End Date -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                <span>📅</span>
                                <span>Start Date & Time</span>
                            </label>
                            <input v-model="form.startDate" type="datetime-local" required
                                class="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all" />
                        </div>

                        <div>
                            <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                <span>🏁</span>
                                <span>End Date & Time (Optional)</span>
                            </label>
                            <input v-model="form.endDate" type="datetime-local"
                                class="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all" />
                        </div>
                    </div>

                    <!-- Type & Location -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                <span>🏷️</span>
                                <span>Event Type</span>
                            </label>
                            <select v-model="form.type"
                                class="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all">
                                <option value="academic">📚 Academic (วิชาการ)</option>
                                <option value="activity">🎉 Activity (กิจกรรม)</option>
                                <option value="holiday">🌴 Holiday (วันหยุด)</option>
                                <option value="exam">📝 Exam (การสอบ)</option>
                            </select>
                        </div>

                        <div>
                            <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                <span>📍</span>
                                <span>Location</span>
                            </label>
                            <input v-model="form.location" type="text"
                                class="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all"
                                placeholder="e.g. School Hall" />
                        </div>
                    </div>

                    <!-- Description -->
                    <div>
                        <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                            <span>📝</span>
                            <span>Description</span>
                        </label>
                        <textarea v-model="form.description" rows="5"
                            class="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all resize-none"
                            placeholder="Event details and information..."></textarea>
                    </div>

                    <!-- Submit Button -->
                    <div class="pt-6 border-t-2 border-slate-100 flex flex-col sm:flex-row gap-4 sm:justify-end">
                        <NuxtLink to="/admin/calendar"
                            class="px-8 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-all text-center">
                            Cancel
                        </NuxtLink>
                        <button type="submit"
                            class="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105 disabled:opacity-70 disabled:transform-none flex items-center justify-center gap-3"
                            :disabled="submitting">
                            <span v-if="submitting" class="animate-spin text-2xl">⏳</span>
                            <span v-else class="text-2xl">🚀</span>
                            <span class="text-lg">{{ submitting ? "Saving..." : "Save Event" }}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: "auth",
});

const router = useRouter();
const { showAlert } = useAlert();
const submitting = ref(false);

const form = ref<any>({
    title: "",
    startDate: "",
    endDate: "",
    type: "activity",
    location: "",
    description: "",
});

const handleSubmit = async () => {
    submitting.value = true;
    try {
        await $fetch("/api/calendar", {
            method: "POST",
            body: form.value,
        });
        showAlert("Event created successfully! 🎉", "success");
        router.push("/admin/calendar");
    } catch (e: any) {
        showAlert(e.data?.message || "Failed to save", "error");
    } finally {
        submitting.value = false;
    }
};
</script>
