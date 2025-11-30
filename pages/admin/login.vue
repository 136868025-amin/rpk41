<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-900">
    <div class="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
      <div class="text-center mb-8">
        <div class="w-16 h-16 bg-blue-600 rounded-xl mx-auto flex items-center justify-center text-3xl mb-4 shadow-lg shadow-blue-600/30">
          🔐
        </div>
        <h1 class="text-2xl font-bold text-slate-800">Admin Login</h1>
        <p class="text-slate-500 text-sm mt-1">Sign in to manage your school website</p>
      </div>
      
      <form @submit.prevent="handleLogin" class="space-y-5">
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Username</label>
          <input 
            v-model="username" 
            type="text" 
            class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
            placeholder="Enter username"
            required
            autofocus
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Password</label>
          <input 
            v-model="password" 
            type="password" 
            class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
            placeholder="Enter password"
            required
          />
        </div>

        <div v-if="error" class="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-100 flex items-center gap-2">
          ⚠️ {{ error }}
        </div>

        <button 
          type="submit" 
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-lg transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
          :disabled="loading"
        >
          <span v-if="loading" class="animate-spin">⏳</span>
          <span>{{ loading ? 'Signing in...' : 'Sign In' }}</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const username = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)
const router = useRouter()

const handleLogin = async () => {
  loading.value = true
  error.value = ''
  
  try {
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: { 
        username: username.value,
        password: password.value 
      }
    })
    
    // Redirect to admin dashboard
    router.push('/admin')
  } catch (e: any) {
    error.value = e.data?.message || 'Login failed'
  } finally {
    loading.value = false
  }
}
</script>
