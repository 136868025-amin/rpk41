<template>
    <NuxtLayout name="admin">
        <div class="p-4 md:p-8 max-w-4xl mx-auto">
            <!-- Header -->
            <div
                class="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-xl p-6 md:p-8 mb-8 text-white">
                <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <div class="flex items-center gap-4">
                        <div class="p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
                            <span class="text-4xl">✏️</span>
                        </div>
                        <div>
                            <h1 class="text-2xl md:text-3xl font-bold">
                                <span v-if="loading">Edit Event</span>
                                <span v-else>Edit Event: {{ form.title }}</span>
                            </h1>
                            <p class="text-indigo-100 mt-1">Update calendar event</p>
                        </div>
                    </div>
                    <NuxtLink to="/admin/calendar"
                        class="px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl font-semibold transition-all text-center">
                        Cancel
                    </NuxtLink>
                </div>
            </div>

            <!-- Loading State -->
            <div v-if="loading" class="bg-white rounded-2xl shadow-lg border border-slate-200 p-12 text-center">
                <div class="animate-spin text-6xl mb-4">⏳</div>
                <p class="text-slate-500 font-medium">Loading event details...</p>
            </div>

            <!-- Form Card -->
            <div v-else class="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 md:p-8">
                <form @submit.prevent="handleSubmit" class="space-y-8">
                    <!-- Title -->
                    <div>
                        <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                            <span>📌</span>
                            <span>Event Title</span>
                        </label>
                        <input v-model="form.title" type="text" required
                            class="w-full px-4 py-3 text-lg font-semibold bg-slate-50 border-2 border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all" />
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
                                class="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all" />
                        </div>
                    </div>

                    <!-- Description -->
                    <div>
                        <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                            <span>📝</span>
                            <span>Description</span>
                        </label>
                        <textarea v-model="form.description" rows="5"
                            class="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all resize-none"></textarea>
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
                            <span v-else class="text-2xl">💾</span>
                            <span class="text-lg">{{ submitting ? "Updating..." : "Update Event" }}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { useBreadcrumbStore } from "~/stores/breadcrumb";

definePageMeta({
    middleware: "auth",
});

const route = useRoute();
const router = useRouter();
const eventId = route.params.id as string;
const loading = ref(true);
const submitting = ref(false);
const breadcrumbStore = useBreadcrumbStore();

const form = ref<any>({
    title: "",
    startDate: "",
    endDate: "",
    type: "activity",
    location: "",
    description: "",
});

const { showAlert, showLoading, closeAlert } = useAlert();

onMounted(async () => {
    const loadingId = showLoading("Loading event details...");
    try {
        const res: any = await $fetch(`/api/calendar/${eventId}`);
        const data = res.data;
        form.value = {
            ...data,
            startDate: data.start ? new Date(data.start).toISOString().slice(0, 16) : "",
            endDate: data.end ? new Date(data.end).toISOString().slice(0, 16) : "",
        };
        breadcrumbStore.setTitle(data.title);
        closeAlert(loadingId);
    } catch (e) {
        closeAlert(loadingId);
        showAlert("Event not found", "error");
        router.push("/admin/calendar");
    } finally {
        loading.value = false;
    }
});

const handleSubmit = async () => {
    submitting.value = true;
    const loadingId = showLoading("Updating event...");

    try {
        await $fetch(`/api/calendar/${eventId}`, {
            method: "PUT",
            body: form.value,
        });
        closeAlert(loadingId);
        showAlert("Event updated successfully! 🎉", "success");
        router.push("/admin/calendar");
    } catch (e: any) {
        closeAlert(loadingId);
        showAlert(e.data?.message || "Failed to update", "error");
    } finally {
        submitting.value = false;
    }
};
</script>
