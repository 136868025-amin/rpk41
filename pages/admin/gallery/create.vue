<template>
    <NuxtLayout name="admin">
        <div class="p-4 md:p-8 max-w-5xl mx-auto">
            <!-- Header -->
            <div class="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-xl p-6 md:p-8 mb-8 text-white">
                <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <div class="flex items-center gap-4">
                        <div class="p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
                            <span class="text-4xl">📸</span>
                        </div>
                        <div>
                            <h1 class="text-2xl md:text-3xl font-bold">Create Album</h1>
                            <p class="text-purple-100 mt-1">Create a beautiful photo gallery</p>
                        </div>
                    </div>
                    <NuxtLink to="/admin/gallery"
                        class="px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl font-semibold transition-all text-center">
                        Cancel
                    </NuxtLink>
                </div>
            </div>

            <!-- Form Card -->
            <div class="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 md:p-8">
                <form @submit.prevent="handleSubmit" class="space-y-8">
                    <!-- Title & Event Date -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                <span>🖼️</span>
                                <span>Album Title</span>
                            </label>
                            <input v-model="form.title" type="text" required
                                class="w-full px-4 py-3 text-lg font-semibold bg-slate-50 border-2 border-slate-200 rounded-xl focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all"
                                placeholder="Enter album title..." />
                        </div>

                        <div>
                            <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                <span>📅</span>
                                <span>Event Date</span>
                            </label>
                            <input v-model="form.eventDate" type="date" required
                                class="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all" />
                        </div>
                    </div>

                    <!-- Description -->
                    <div>
                        <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                            <span>📝</span>
                            <span>Description</span>
                        </label>
                        <textarea v-model="form.description" rows="4"
                            class="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all resize-none"
                            placeholder="Describe the event or photos in this album..."></textarea>
                    </div>

                    <!-- Category & Highlight -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                <span>🏷️</span>
                                <span>Category</span>
                            </label>
                            <select v-model="form.category"
                                class="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all">
                                <option value="general">📋 General (ทั่วไป)</option>
                                <option value="activity">🎉 Activity (กิจกรรม)</option>
                                <option value="academic">📚 Academic (วิชาการ)</option>
                                <option value="sport">⚽ Sport (กีฬา)</option>
                            </select>
                        </div>

                        <div class="flex items-end">
                            <div
                                class="w-full p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl border-2 border-amber-200">
                                <label class="flex items-center gap-3 cursor-pointer group">
                                    <input v-model="form.isHighlight" type="checkbox" id="isHighlight"
                                        class="w-6 h-6 text-amber-600 rounded-lg focus:ring-2 focus:ring-amber-500 cursor-pointer" />
                                    <div>
                                        <span
                                            class="font-bold text-slate-800 text-sm group-hover:text-amber-700 transition-colors">
                                            ⭐ Pin to Highlight Slider
                                        </span>
                                        <p class="text-xs text-slate-600 mt-0.5">Show on homepage featured section</p>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>

                    <!-- Cover Image -->
                    <div class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-100">
                        <AppImageUploader v-model="form.coverImage" label="Cover Image" />
                    </div>

                    <!-- Gallery Images -->
                    <div class="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-100">
                        <AppMultiImageUploader v-model="form.images" label="Gallery Photos" />
                        <p class="text-sm text-blue-700 mt-3 flex items-center gap-2">
                            <span>💡</span>
                            <span>Upload multiple photos to create a beautiful gallery</span>
                        </p>
                    </div>

                    <!-- Publish Status -->
                    <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200">
                        <label class="flex items-center gap-4 cursor-pointer group">
                            <input v-model="form.isPublished" type="checkbox" id="isPublished"
                                class="w-6 h-6 text-green-600 rounded-lg focus:ring-2 focus:ring-green-500 cursor-pointer" />
                            <div>
                                <span
                                    class="font-bold text-slate-800 text-lg group-hover:text-green-700 transition-colors">
                                    Publish Album
                                </span>
                                <p class="text-sm text-slate-600 mt-0.5">Make this album visible on the website</p>
                            </div>
                        </label>
                    </div>

                    <!-- Submit Button -->
                    <div class="pt-6 border-t-2 border-slate-100 flex flex-col sm:flex-row gap-4 sm:justify-end">
                        <NuxtLink to="/admin/gallery"
                            class="px-8 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-all text-center">
                            Cancel
                        </NuxtLink>
                        <button type="submit"
                            class="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105 disabled:opacity-70 disabled:transform-none flex items-center justify-center gap-3"
                            :disabled="submitting">
                            <span v-if="submitting" class="animate-spin text-2xl">⏳</span>
                            <span v-else class="text-2xl">🚀</span>
                            <span class="text-lg">{{ submitting ? "Creating..." : "Create Album" }}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
import AppImageUploader from "~/components/AppImageUploader.vue";
import AppMultiImageUploader from "~/components/AppMultiImageUploader.vue";

definePageMeta({
    middleware: "auth",
});

const router = useRouter();
const { showAlert, showLoading, closeAlert } = useAlert();

const form = ref({
    title: "",
    description: "",
    eventDate: new Date().toISOString().split("T")[0],
    category: "general",
    isHighlight: false,
    coverImage: "",
    images: [] as string[],
    isPublished: true,
});

const submitting = ref(false);

const handleSubmit = async () => {
    if (form.value.images.length === 0) {
        showAlert("Please upload at least one image 📸", "warning");
        return;
    }

    submitting.value = true;
    const loadingId = showLoading("Creating gallery album...");

    try {
        await $fetch("/api/gallery", {
            method: "POST",
            body: form.value,
        });
        closeAlert(loadingId);
        showAlert("Gallery album created successfully! 🎉", "success");
        router.push("/admin/gallery");
    } catch (e: any) {
        closeAlert(loadingId);
        showAlert(e.data?.message || "Failed to create album", "error");
    } finally {
        submitting.value = false;
    }
};
</script>
