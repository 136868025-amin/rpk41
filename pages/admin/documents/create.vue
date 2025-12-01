<template>
    <NuxtLayout name="admin">
        <div class="p-4 md:p-8 max-w-4xl mx-auto">
            <!-- Header -->
            <div class="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl shadow-xl p-6 md:p-8 mb-8 text-white">
                <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <div class="flex items-center gap-4">
                        <div class="p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
                            <span class="text-4xl">📄</span>
                        </div>
                        <div>
                            <h1 class="text-2xl md:text-3xl font-bold">Upload Document</h1>
                            <p class="text-teal-100 mt-1">Share files and documents with your school</p>
                        </div>
                    </div>
                    <NuxtLink to="/admin/documents"
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
                            <span>📝</span>
                            <span>Document Title</span>
                        </label>
                        <input v-model="form.title" type="text" required
                            class="w-full px-4 py-3 text-lg font-semibold bg-slate-50 border-2 border-slate-200 rounded-xl focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all"
                            placeholder="Enter document title..." />
                    </div>

                    <!-- Category -->
                    <div>
                        <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                            <span>🏷️</span>
                            <span>Category</span>
                        </label>
                        <select v-model="form.category"
                            class="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all">
                            <option value="form">📋 Form (แบบฟอร์ม)</option>
                            <option value="regulation">📜 Regulation (ระเบียบการ)</option>
                            <option value="academic">📚 Academic (วิชาการ)</option>
                            <option value="other">📌 Other (อื่นๆ)</option>
                        </select>
                    </div>

                    <!-- File Upload -->
                    <div class="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-6 border-2 border-teal-100">
                        <AppFileUploader v-model="form.filePath" label="Document File"
                            accept=".pdf,.doc,.docx,.xls,.xlsx" />
                        <div class="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                            <p class="text-sm font-semibold text-blue-800 mb-2 flex items-center gap-2">
                                <span>ℹ️</span>
                                <span>Supported file formats:</span>
                            </p>
                            <div class="flex flex-wrap gap-2">
                                <span
                                    class="px-3 py-1 bg-white text-blue-700 text-xs font-bold rounded-lg border border-blue-200">
                                    📄 PDF
                                </span>
                                <span
                                    class="px-3 py-1 bg-white text-blue-700 text-xs font-bold rounded-lg border border-blue-200">
                                    📝 DOC/DOCX
                                </span>
                                <span
                                    class="px-3 py-1 bg-white text-blue-700 text-xs font-bold rounded-lg border border-blue-200">
                                    📊 XLS/XLSX
                                </span>
                            </div>
                        </div>
                    </div>

                    <!-- Submit Button -->
                    <div class="pt-6 border-t-2 border-slate-100 flex flex-col sm:flex-row gap-4 sm:justify-end">
                        <NuxtLink to="/admin/documents"
                            class="px-8 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-all text-center">
                            Cancel
                        </NuxtLink>
                        <button type="submit"
                            class="px-8 py-4 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105 disabled:opacity-70 disabled:transform-none flex items-center justify-center gap-3"
                            :disabled="submitting">
                            <span v-if="submitting" class="animate-spin text-2xl">⏳</span>
                            <span v-else class="text-2xl">🚀</span>
                            <span class="text-lg">{{ submitting ? "Uploading..." : "Save Document" }}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
import AppFileUploader from "~/components/AppFileUploader.vue";

definePageMeta({
    middleware: "auth",
});

const router = useRouter();
const { showAlert } = useAlert();
const submitting = ref(false);

const form = ref<any>({
    title: "",
    category: "other",
    filePath: "",
    fileType: "pdf",
    isPublished: true,
});

const handleSubmit = async () => {
    if (!form.value.filePath) {
        showAlert("Please upload a file 📄", "warning");
        return;
    }

    submitting.value = true;

    // Auto-detect file type from extension
    const ext = form.value.filePath.split(".").pop();
    form.value.fileType = ext || "file";

    try {
        await $fetch("/api/documents", {
            method: "POST",
            body: form.value,
        });
        showAlert("Document uploaded successfully! 🎉", "success");
        router.push("/admin/documents");
    } catch (e: any) {
        showAlert(e.data?.message || "Failed to save", "error");
    } finally {
        submitting.value = false;
    }
};
</script>
