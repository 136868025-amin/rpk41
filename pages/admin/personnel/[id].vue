<template>
    <NuxtLayout name="admin">
        <div class="p-4 md:p-8 max-w-5xl mx-auto">
            <!-- Header -->
            <div class="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl shadow-xl p-6 md:p-8 mb-8 text-white">
                <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <div class="flex items-center gap-4">
                        <div class="p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
                            <span class="text-4xl">✏️</span>
                        </div>
                        <div>
                            <h1 class="text-2xl md:text-3xl font-bold">
                                <span v-if="!isEditing">Add Personnel</span>
                                <span v-else-if="loading">Edit Personnel</span>
                                <span v-else>Edit Personnel: {{ form.name }}</span>
                            </h1>
                            <p class="text-orange-100 mt-1">Update staff member information</p>
                        </div>
                    </div>
                    <NuxtLink to="/admin/personnel"
                        class="px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl font-semibold transition-all text-center">
                        Cancel
                    </NuxtLink>
                </div>
            </div>

            <!-- Loading State -->
            <div v-if="loading" class="bg-white rounded-2xl shadow-lg border border-slate-200 p-12 text-center">
                <div class="animate-spin text-6xl mb-4">⏳</div>
                <p class="text-slate-500 font-medium">Loading personnel details...</p>
            </div>

            <!-- Form Card -->
            <div v-else class="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 md:p-8">
                <form @submit.prevent="handleSubmit" class="space-y-8">
                    <!-- Name & Position -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                <span>👤</span>
                                <span>Full Name</span>
                            </label>
                            <input v-model="form.name" type="text" required
                                class="w-full px-4 py-3 text-lg font-semibold bg-slate-50 border-2 border-slate-200 rounded-xl focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all" />
                        </div>

                        <div>
                            <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                <span>💼</span>
                                <span>Position</span>
                            </label>
                            <input v-model="form.position" type="text" required
                                class="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all" />
                        </div>
                    </div>

                    <!-- Department & Order Index -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                <span>🏢</span>
                                <span>Department</span>
                            </label>
                            <select v-model="form.department"
                                class="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all">
                                <option value="administrators">👔 Administrators (ผู้บริหาร)</option>
                                <option value="teachers">📚 Teachers (ครูอาจารย์)</option>
                                <option value="support_staff">🔧 Support Staff (บุคลากรสนับสนุน)</option>
                            </select>
                        </div>

                        <div>
                            <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                <span>🔢</span>
                                <span>Display Order</span>
                            </label>
                            <input v-model="form.orderIndex" type="number"
                                class="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all" />
                            <p class="text-xs text-slate-500 mt-2">Lower numbers appear first</p>
                        </div>
                    </div>

                    <!-- Email & Phone -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                <span>✉️</span>
                                <span>Email (Optional)</span>
                            </label>
                            <input v-model="form.email" type="email"
                                class="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all" />
                        </div>

                        <div>
                            <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                <span>📞</span>
                                <span>Phone (Optional)</span>
                            </label>
                            <input v-model="form.phone" type="text"
                                class="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all" />
                        </div>
                    </div>

                    <!-- Profile Photo -->
                    <div class="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border-2 border-orange-100">
                        <AppImageUploader v-model="form.photo" label="Profile Photo" />
                    </div>

                    <!-- Biography/Portfolio Content -->
                    <div>
                        <label class="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                            <span>📝</span>
                            <span>Biography / Portfolio</span>
                        </label>
                        <div
                            class="border-2 border-slate-200 rounded-2xl overflow-hidden hover:border-orange-300 transition-colors">
                            <AppRichEditor v-model="form.content" />
                        </div>
                    </div>

                    <!-- Portfolio Gallery -->
                    <div class="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-100">
                        <AppMultiImageUploader v-model="form.gallery" label="Portfolio Gallery" />
                        <p class="text-sm text-blue-700 mt-3 flex items-center gap-2">
                            <span>💡</span>
                            <span>Showcase achievements, certificates, or work samples</span>
                        </p>
                    </div>

                    <!-- Submit Button -->
                    <div class="pt-6 border-t-2 border-slate-100 flex flex-col sm:flex-row gap-4 sm:justify-end">
                        <NuxtLink to="/admin/personnel"
                            class="px-8 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-all text-center">
                            Cancel
                        </NuxtLink>
                        <button type="submit"
                            class="px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105 disabled:opacity-70 disabled:transform-none flex items-center justify-center gap-3"
                            :disabled="submitting">
                            <span v-if="submitting" class="animate-spin text-2xl">⏳</span>
                            <span v-else class="text-2xl">💾</span>
                            <span class="text-lg">{{ submitting ? "Updating..." : "Update Personnel" }}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
import AppImageUploader from "~/components/AppImageUploader.vue";
import AppRichEditor from "~/components/AppRichEditor.vue";
import AppMultiImageUploader from "~/components/AppMultiImageUploader.vue";
import { useBreadcrumbStore } from "~/stores/breadcrumb";

definePageMeta({
    middleware: "auth",
});

const route = useRoute();
const router = useRouter();
const personnelId = route.params.id as string;
const loading = ref(true);
const submitting = ref(false);
const breadcrumbStore = useBreadcrumbStore();

const isEditing = computed(() => !!personnelId);

const form = ref<any>({
    name: "",
    position: "",
    department: "teachers",
    photo: "",
    orderIndex: 0,
    email: "",
    phone: "",
    content: "",
    gallery: [] as string[],
});

const { showAlert, showLoading, closeAlert } = useAlert();

onMounted(async () => {
    if (!isEditing.value) {
        loading.value = false;
        return;
    }

    const loadingId = showLoading("Loading personnel details...");
    try {
        const res: any = await $fetch(`/api/personnel/${personnelId}`);
        const data = res.data;
        form.value = { ...data };
        breadcrumbStore.setTitle(data.name);
        closeAlert(loadingId);
    } catch (e) {
        closeAlert(loadingId);
        showAlert("Personnel not found", "error");
        router.push("/admin/personnel");
    } finally {
        loading.value = false;
    }
});

const handleSubmit = async () => {
    submitting.value = true;
    const loadingId = showLoading(
        isEditing.value ? "Updating personnel..." : "Adding personnel..."
    );

    try {
        if (isEditing.value) {
            await $fetch(`/api/personnel/${personnelId}`, {
                method: "PUT",
                body: form.value,
            });
        } else {
            await $fetch("/api/personnel", {
                method: "POST",
                body: form.value,
            });
        }
        closeAlert(loadingId);
        showAlert(
            isEditing.value
                ? "Personnel updated successfully! 🎉"
                : "Personnel added successfully! 🎉",
            "success"
        );
        router.push("/admin/personnel");
    } catch (e: any) {
        closeAlert(loadingId);
        showAlert(e.data?.message || "Failed to save", "error");
    } finally {
        submitting.value = false;
    }
};
</script>
