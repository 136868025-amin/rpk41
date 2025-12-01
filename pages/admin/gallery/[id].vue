<template>
    <NuxtLayout name="admin">
        <div class="p-4 md:p-8 max-w-5xl mx-auto">
            <!-- Header -->
            <div class="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-xl p-6 md:p-8 mb-8 text-white">
                <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <div class="flex items-center gap-4">
                        <div class="p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
                            <span class="text-4xl">✏️</span>
                        </div>
                        <div>
                            <h1 class="text-2xl md:text-3xl font-bold">
                                <span v-if="loading">Edit Album</span>
                                <span v-else>Edit Album: {{ form.title }}</span>
                            </h1>
                            <p class="text-purple-100 mt-1">Update your photo gallery</p>
                        </div>
                    </div>
                    <NuxtLink to="/admin/gallery"
                        class="px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl font-semibold transition-all text-center">
                        Cancel
                    </NuxtLink>
                </div>
            </div>

            <!-- Loading State -->
            <div v-if="loading" class="bg-white rounded-2xl shadow-lg border border-slate-200 p-12 text-center">
                <div class="animate-spin text-6xl mb-4">⏳</div>
                <p class="text-slate-500 font-medium">Loading album details...</p>
            </div>

            <!-- Form Card -->
            <div v-else class="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 md:p-8">
                <form @submit.prevent="handleSubmit" class="space-y-8">
                    <!-- Title & Event Date -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                <span>🖼️</span>
                                <span>Album Title</span>
                            </label>
                            <input v-model="form.title" type="text" required
                                class="w-full px-4 py-3 text-lg font-semibold bg-slate-50 border-2 border-slate-200 rounded-xl focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all" />
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
                            class="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all resize-none"></textarea>
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

                    <!-- Gallery Images with Lightbox Preview -->
                    <div class="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-100">
                        <label class="block text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
                            <span>📸</span>
                            <span>Gallery Photos</span>
                        </label>

                        <!-- Current Images Grid -->
                        <div v-if="form.images.length > 0" class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            <div v-for="(img, idx) in form.images" :key="idx" @click="openLightbox(idx)"
                                class="relative aspect-square rounded-xl overflow-hidden border-2 border-slate-200 hover:border-purple-500 cursor-pointer group transition-all shadow-md hover:shadow-xl">
                                <img :src="img" :alt="`Image ${idx + 1}`" class="w-full h-full object-cover" />
                                <div
                                    class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <span class="text-white text-3xl">🔍</span>
                                </div>
                            </div>
                        </div>

                        <!-- Upload More -->
                        <AppMultiImageUploader v-model="form.images" label="" />
                        <p class="text-sm text-blue-700 mt-3 flex items-center gap-2">
                            <span>💡</span>
                            <span>Click images to preview in lightbox</span>
                        </p>
                    </div>

                    <!-- Lightbox -->
                    <AppLightbox v-if="lightboxOpen" :images="form.images" :initial-index="lightboxIndex"
                        @close="lightboxOpen = false" />

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
                            <span v-else class="text-2xl">💾</span>
                            <span class="text-lg">{{ submitting ? "Updating..." : "Update Album" }}</span>
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
import AppLightbox from "~/components/AppLightbox.vue";
import { useBreadcrumbStore } from "~/stores/breadcrumb";

definePageMeta({
    middleware: "auth",
});

const route = useRoute();
const router = useRouter();
const albumId = route.params.id as string;
const loading = ref(true);
const submitting = ref(false);
const breadcrumbStore = useBreadcrumbStore();

const form = ref<any>({
    title: "",
    description: "",
    eventDate: "",
    category: "general",
    isHighlight: false,
    coverImage: "",
    images: [] as string[],
    isPublished: true,
});

const lightboxOpen = ref(false);
const lightboxIndex = ref(0);

const { showAlert, showLoading, closeAlert } = useAlert();

const openLightbox = (index: number) => {
    lightboxIndex.value = index;
    lightboxOpen.value = true;
};

onMounted(async () => {
    const loadingId = showLoading("Loading album details...");
    try {
        const res: any = await $fetch(`/api/gallery/${albumId}`);
        const data = res.data;
        form.value = {
            ...data,
            eventDate: data.eventDate ? new Date(data.eventDate).toISOString().split("T")[0] : "",
        };
        breadcrumbStore.setTitle(data.title);
        closeAlert(loadingId);
    } catch (e) {
        closeAlert(loadingId);
        showAlert("Album not found", "error");
        router.push("/admin/gallery");
    } finally {
        loading.value = false;
    }
});

const handleSubmit = async () => {
    if (form.value.images.length === 0) {
        showAlert("Please upload at least one image 📸", "warning");
        return;
    }

    submitting.value = true;
    const loadingId = showLoading("Updating album...");

    try {
        await $fetch(`/api/gallery/${albumId}`, {
            method: "PUT",
            body: form.value,
        });
        closeAlert(loadingId);
        showAlert("Album updated successfully! 🎉", "success");
        router.push("/admin/gallery");
    } catch (e: any) {
        closeAlert(loadingId);
        showAlert(e.data?.message || "Failed to update album", "error");
    } finally {
        submitting.value = false;
    }
};
</script>
