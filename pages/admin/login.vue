<template>
  <div class="min-h-screen flex">
    <!-- Left Side - Login Form -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white relative overflow-hidden">
      <!-- Decorative Elements -->
      <div
        class="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl opacity-50">
      </div>
      <div
        class="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl opacity-50">
      </div>

      <!-- Login Card -->
      <div class="w-full max-w-md relative z-10 animate-fade-in">
        <!-- Logo & Title -->
        <div class="text-center mb-8">
          <div
            class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-xl mb-4 transform hover:scale-110 transition-transform">
            <span class="text-4xl">🏫</span>
          </div>
          <h1 class="text-3xl font-bold text-slate-800 mb-2">Welcome Back!</h1>
          <p class="text-slate-500">Sign in to manage your school website</p>
        </div>

        <!-- Error Alert -->
        <div v-if="error" class="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg animate-shake">
          <div class="flex items-center gap-3">
            <span class="text-2xl">⚠️</span>
            <div>
              <p class="text-sm font-semibold text-red-800">Login Failed</p>
              <p class="text-xs text-red-600">{{ error }}</p>
            </div>
          </div>
        </div>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Username Field -->
          <div class="group">
            <label class="block text-sm font-semibold text-slate-700 mb-2">Username</label>
            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                <span class="text-xl">👤</span>
              </div>
              <input v-model="username" type="text" required
                class="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all placeholder-slate-400 text-slate-800 font-medium"
                placeholder="Enter your username" :disabled="loading">
            </div>
          </div>

          <!-- Password Field -->
          <div class="group">
            <label class="block text-sm font-semibold text-slate-700 mb-2">Password</label>
            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                <span class="text-xl">🔒</span>
              </div>
              <input v-model="password" :type="showPassword ? 'text' : 'password'" required
                class="w-full pl-12 pr-12 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all placeholder-slate-400 text-slate-800 font-medium"
                placeholder="Enter your password" :disabled="loading">
              <button type="button" @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors">
                <span class="text-xl">{{ showPassword ? '😊' : '🙈' }}</span>
              </button>
            </div>
          </div>

          <!-- Remember Me -->
          <div class="flex items-center justify-between">
            <label class="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" v-model="remember"
                class="w-5 h-5 rounded border-2 border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-200 transition-all cursor-pointer">
              <span class="text-sm text-slate-600 group-hover:text-slate-800 transition-colors">Remember me</span>
            </label>
            <a href="#" class="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
              Forgot password?
            </a>
          </div>

          <!-- Submit Button -->
          <button type="submit" :disabled="loading"
            class="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3">
            <span v-if="loading" class="animate-spin text-2xl">⏳</span>
            <span v-else class="text-2xl">🚀</span>
            <span class="text-lg">{{ loading ? 'Signing in...' : 'Sign In' }}</span>
          </button>
        </form>

        <!-- Footer -->
        <div class="mt-8 text-center">
          <p class="text-sm text-slate-500">
            © 2024 School Admin System
          </p>
        </div>
      </div>
    </div>

    <!-- Right Side - Hero Image -->
    <div
      class="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 items-center justify-center p-12 overflow-hidden">
      <!-- Animated Background Shapes -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-20 left-20 w-64 h-64 bg-white rounded-full animate-float"></div>
        <div class="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full animate-float-delay"></div>
        <div
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-white rounded-full animate-pulse">
        </div>
      </div>

      <!-- Content -->
      <div class="relative z-10 text-white text-center max-w-lg">
        <div class="mb-8 animate-bounce-slow">
          <span class="text-9xl">🎓</span>
        </div>
        <h2 class="text-4xl font-bold mb-4 animate-fade-in-up">School Management System</h2>
        <p class="text-xl text-blue-100 mb-8 animate-fade-in-up-delay">
          Manage your school website with ease. Post news, upload photos, and keep everyone connected.
        </p>

        <!-- Feature Pills -->
        <div class="flex flex-wrap gap-3 justify-center animate-fade-in-up-delay-2">
          <span class="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">📰 News</span>
          <span class="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">📸 Gallery</span>
          <span class="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">👥 Personnel</span>
          <span class="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">📅 Calendar</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false
})

const router = useRouter()
const username = ref('')
const password = ref('')
const remember = ref(false)
const showPassword = ref(false)
const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  if (!username.value || !password.value) {
    error.value = 'Please enter both username and password'
    return
  }

  loading.value = true
  error.value = ''

  try {
    const res = await $fetch('/api/auth/login', {
      method: 'POST',
      body: {
        username: username.value,
        password: password.value
      }
    })

    // Success - redirect to dashboard
    router.push('/admin')
  } catch (e: any) {
    error.value = e.data?.message || 'Invalid username or password'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes shake {

  0%,
  100% {
    transform: translateX(0);
  }

  25% {
    transform: translateX(-10px);
  }

  75% {
    transform: translateX(10px);
  }
}

@keyframes float {

  0%,
  100% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-20px);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.6s ease-out;
}

.animate-shake {
  animation: shake 0.5s ease-in-out;
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delay {
  animation: float 8s ease-in-out infinite;
  animation-delay: 1s;
}

.animate-bounce-slow {
  animation: float 3s ease-in-out infinite;
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out;
}

.animate-fade-in-up-delay {
  animation: fadeInUp 0.8s ease-out 0.2s both;
}

.animate-fade-in-up-delay-2 {
  animation: fadeInUp 0.8s ease-out 0.4s both;
}
</style>
