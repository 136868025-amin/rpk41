<template>
    <NuxtLayout name="admin">
        <div class="max-w-2xl mx-auto">
            <div class="mb-6 flex items-center gap-4">
                <NuxtLink to="/admin/users" class="p-2 hover:bg-slate-100 rounded-full transition-colors">
                    <i class="fas fa-arrow-left text-slate-500"></i>
                </NuxtLink>
                <h1 class="text-2xl font-bold text-slate-800">เพิ่มผู้ดูแลระบบ</h1>
            </div>

            <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
                    <!-- Username -->
                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-1">ชื่อผู้ใช้ (Username)</label>
                        <input v-model="form.username" type="text" required
                            class="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            placeholder="เช่น admin, editor">
                    </div>

                    <!-- Password -->
                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-1">รหัสผ่าน</label>
                        <input v-model="form.password" type="password" required minlength="6"
                            class="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            placeholder="อย่างน้อย 6 ตัวอักษร">
                    </div>

                    <!-- Name -->
                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-1">ชื่อ-นามสกุล</label>
                        <input v-model="form.name" type="text" required
                            class="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            placeholder="เช่น สมชาย ใจดี">
                    </div>

                    <!-- Role -->
                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-1">บทบาท</label>
                        <select v-model="form.role" required
                            class="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all">
                            <option value="admin">Admin (ดูแลทุกอย่าง)</option>
                            <option value="editor">Editor (จัดการเนื้อหา)</option>
                        </select>
                    </div>

                    <!-- Actions -->
                    <div class="pt-4 flex justify-end gap-3 border-t border-slate-100">
                        <NuxtLink to="/admin/users"
                            class="px-6 py-2 text-slate-600 hover:bg-slate-50 rounded-lg font-medium transition-colors">
                            ยกเลิก
                        </NuxtLink>
                        <button type="submit" :disabled="loading"
                            class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                            <i v-if="loading" class="fas fa-circle-notch fa-spin"></i>
                            <span>{{ loading ? 'กำลังบันทึก...' : 'บันทึกข้อมูล' }}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: 'auth'
})

const router = useRouter()
const { showAlert } = useAlert()
const loading = ref(false)

const form = reactive({
    username: '',
    password: '',
    name: '',
    role: 'editor'
})

const handleSubmit = async () => {
    loading.value = true
    try {
        await $fetch('/api/users', {
            method: 'POST',
            body: form
        })
        showAlert('เพิ่มผู้ดูแลระบบเรียบร้อยแล้ว', 'success')
        router.push('/admin/users')
    } catch (e: any) {
        showAlert(e.data?.message || 'เกิดข้อผิดพลาดในการบันทึก', 'error')
    } finally {
        loading.value = false
    }
}
</script>
