<template>
  <NuxtLayout name="admin">
    <div class="max-w-2xl mx-auto">
      <div class="mb-6 flex items-center gap-4">
        <NuxtLink to="/admin/users" class="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <i class="fas fa-arrow-left text-slate-500"></i>
        </NuxtLink>
        <h1 class="text-2xl font-bold text-slate-800">แก้ไขผู้ดูแลระบบ</h1>
      </div>

      <div v-if="pending" class="p-12 text-center">
        <i class="fas fa-circle-notch fa-spin fa-2x text-blue-600"></i>
      </div>

      <div v-else class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
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
            <label class="block text-sm font-medium text-slate-700 mb-1">รหัสผ่านใหม่
              (เว้นว่างไว้ถ้าไม่ต้องการเปลี่ยน)</label>
            <input v-model="form.password" type="password" minlength="6"
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
            <button type="submit" :disabled="saving"
              class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
              <i v-if="saving" class="fas fa-circle-notch fa-spin"></i>
              <span>{{ saving ? 'กำลังบันทึก...' : 'บันทึกการแก้ไข' }}</span>
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

const route = useRoute()
const router = useRouter()
const { showAlert } = useAlert()
const id = route.params.id as string

const saving = ref(false)
const form = reactive({
  username: '',
  password: '',
  name: '',
  role: 'editor'
})

const { data: user, pending, error } = await useFetch<any>(`/api/users/${id}`)

if (error.value) {
  showAlert('ไม่พบข้อมูลผู้ใช้', 'error')
  router.push('/admin/users')
} else if (user.value) {
  form.username = user.value.username
  form.name = user.value.name
  form.role = user.value.role
}

const handleSubmit = async () => {
  saving.value = true
  try {
    await $fetch(`/api/users/${id}`, {
      method: 'PUT',
      body: form
    })
    showAlert('แก้ไขข้อมูลเรียบร้อยแล้ว', 'success')
    router.push('/admin/users')
  } catch (e: any) {
    showAlert(e.data?.message || 'เกิดข้อผิดพลาดในการบันทึก', 'error')
  } finally {
    saving.value = false
  }
}
</script>
