<template>
    <NuxtLayout name="admin">
        <div class="p-4 md:p-8 max-w-4xl mx-auto">
            <!-- Header -->
            <div class="bg-gradient-to-r from-pink-600 to-rose-600 rounded-2xl shadow-xl p-6 md:p-8 mb-8 text-white">
                <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <div class="flex items-center gap-4">
                        <div class="p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
                            <span class="text-4xl">🎨</span>
                        </div>
                        <div>
                            <h1 class="text-2xl md:text-3xl font-bold">Add Banner</h1>
                            <p class="text-pink-100 mt-1">Create a homepage banner slider</p>
                        </div>
                    </div>
                    <NuxtLink to="/admin/banners"
                        class="px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl font-semibold transition-all text-center">
                        Cancel
                    </NuxtLink>
                </div>
            </div>

            <!-- Form Card -->
            <div class="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 md:p-8">
                <form @submit.prevent="handleSubmit" class="space-y-8">
                    <!-- Banner Image -->
                    <div class="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 border-2 border-pink-100">
                        <AppImageUploader v-model="form.imageUrl" label="Banner Image" />
                        <div class="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                            <p class="text-sm font-semibold text-blue-800 mb-2 flex items-center gap-2">
                                <span>💡</span>
                                <span>Recommended size: 1920 x 600 pixels</span>
                            </p>
                            <p class="text-xs text-blue-600">Wide landscape format works best for banners</p>
                        </div>
                    </div>

                    <!-- Title & Subtitle -->
                    <div class="space-y-6">
                        <div>
                            <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                <span>📝</span>
                                <span>Banner Title</span>
                            </label>
                            <input v-model="form.title" type="text" required
                                class="w-full px-4 py-3 text-lg font-semibold bg-slate-50 border-2 border-slate-200 rounded-xl focus:bg-white focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition-all"
                                placeholder="Enter banner title..." />
                        </div>

                        <div>
                            <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                <span>✏️</span>
                                <span>Subtitle (Optional)</span>
                            </label>
                            <input v-model="form.subtitle" type="text"
                                class="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:bg-white focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition-all"
                                placeholder="Short description..." />
                        </div>
                    </div>

                    <!-- Link & Order -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                <span>🔗</span>
                                <span>Link URL (Optional)</span>
                            </label>
                            <input v-model="form.link" type="text"
                                class="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:bg-white focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition-all"
                                placeholder="/news/..." />
                            <p class="text-xs text-slate-500 mt-2">Internal link when banner is clicked</p>
                        </div>

                        <div>
                            <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                <span>🔢</span>
                                <span>Display Order</span>
                            </label>
                            <input v-model="form.orderIndex" type="number"
                                class="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:bg-white focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition-all"
                                placeholder="0" />
                            <p class="text-xs text-slate-500 mt-2">Lower numbers appear first</p>
                        </div>
                    </div>

                    <!-- Active Status -->
                    <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200">
                        <label class="flex items-center gap-4 cursor-pointer group">
                            <input v-model="form.isActive" type="checkbox" id="isActive"
                                class="w-6 h-6 text-green-600 rounded-lg focus:ring-2 focus:ring-green-500 cursor-pointer" />
                            <div>
                                <span
                                    class="font-bold text-slate-800 text-lg group-hover:text-green-700 transition-colors">
                                    Active (Show on Homepage)
                                </span>
                                <p class="text-sm text-slate-600 mt-0.5">Display this banner in the homepage slider</p>
                            </div>
                        </label>
                    </div>

                    <!-- Submit Button -->
                    <div class="pt-6 border-t-2 border-slate-100 flex flex-col sm:flex-row gap-4 sm:justify-end">
                        <NuxtLink to="/admin/banners"
                            class="px-8 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-all text-center">
                            Cancel
                        </NuxtLink>
                        <button type="submit"
                            class="px-8 py-4 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105 disabled:opacity-70 disabled:transform-none flex items-center justify-center gap-3"
                            :disabled="submitting">
                            <span v-if="submitting" class="animate-spin text-2xl">⏳</span>
                            <span v-else class="text-2xl">🚀</span>
                            <span class="text-lg">{{ submitting ? "Saving..." : "Add Banner" }}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
import AppImageUploader from "~/components/AppImageUploader.vue";

definePageMeta({
    middleware: "auth",
});

const router = useRouter();
const { showAlert } = useAlert();
const submitting = ref(false);

const form = ref<any>({
    title: "",
    subtitle: "",
    imageUrl: "",
    link: "",
    orderIndex: 0,
    isActive: true,
});

const handleSubmit = async () => {
    if (!form.value.imageUrl) {
        showAlert("Please upload a banner image 🖼️", "warning");
        return;
    }

    submitting.value = true;
    try {
        await $fetch("/api/banners", {
            method: "POST",
            body: form.value,
        });
        showAlert("Banner created successfully! 🎉", "success");
        router.push("/admin/banners");
    } catch (e: any) {
        showAlert(e.data?.message || "Failed to save", "error");
    } finally {
        submitting.value = false;
    }
};
</script>
