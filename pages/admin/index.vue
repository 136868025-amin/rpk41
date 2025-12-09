<template>
  <div>
    <NuxtLayout name="admin">
      <div class="p-4 md:p-8 space-y-6 md:space-y-8">
        <!-- Welcome Header -->
        <div
          class="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl shadow-2xl p-6 md:p-10 text-white relative overflow-hidden animate-fade-in">
          <!-- Animated Background Shapes -->
          <div class="absolute inset-0 opacity-10">
            <div class="absolute top-10 right-10 w-40 h-40 bg-white rounded-full animate-float"></div>
            <div class="absolute bottom-10 left-10 w-56 h-56 bg-white rounded-full animate-float-delay"></div>
          </div>

          <div class="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 class="text-2xl md:text-4xl font-bold mb-2 flex items-center gap-3">
                <span class="text-3xl md:text-5xl animate-wave">👋</span>
                <span>Welcome back, Admin!</span>
              </h1>
              <p class="text-blue-100 text-sm md:text-base max-w-2xl">
                Here's what's happening with your school website today. You have some new updates to review.
              </p>
            </div>
            <div class="flex items-center gap-3">
              <div class="text-right">
                <p class="text-xs text-blue-200">Today</p>
                <p class="text-lg md:text-xl font-bold">{{ currentDate }}</p>
              </div>
              <div class="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                <span class="text-3xl">📅</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <!-- News Stats -->
          <div
            class="group bg-white rounded-2xl shadow-lg border-2 border-slate-100 p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer relative overflow-hidden">
            <div
              class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full -mr-16 -mt-16 opacity-50">
            </div>
            <div class="relative z-10">
              <div class="flex justify-between items-start mb-4">
                <div
                  class="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl text-white shadow-lg transform group-hover:scale-110 transition-transform">
                  <span class="text-3xl">📰</span>
                </div>
                <span class="text-xs font-bold text-green-600 bg-green-100 px-3 py-1.5 rounded-full">+2 new</span>
              </div>
              <h3 class="text-slate-500 text-sm font-semibold mb-1">Total News</h3>
              <p class="text-4xl font-bold text-slate-800 mb-2">{{ stats.totalNews }}</p>
              <div class="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div class="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full animate-progress"
                  style="width: 75%"></div>
              </div>
            </div>
          </div>

          <!-- Gallery Stats -->
          <div
            class="group bg-white rounded-2xl shadow-lg border-2 border-slate-100 p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer relative overflow-hidden">
            <div
              class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full -mr-16 -mt-16 opacity-50">
            </div>
            <div class="relative z-10">
              <div class="flex justify-between items-start mb-4">
                <div
                  class="p-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl text-white shadow-lg transform group-hover:scale-110 transition-transform">
                  <span class="text-3xl">📸</span>
                </div>
              </div>
              <h3 class="text-slate-500 text-sm font-semibold mb-1">Gallery Albums</h3>
              <p class="text-4xl font-bold text-slate-800 mb-2">{{ stats.totalGallery }}</p>
              <div class="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div class="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full animate-progress"
                  style="width: 60%"></div>
              </div>
            </div>
          </div>

          <!-- Personnel Stats -->
          <div
            class="group bg-white rounded-2xl shadow-lg border-2 border-slate-100 p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer relative overflow-hidden">
            <div
              class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full -mr-16 -mt-16 opacity-50">
            </div>
            <div class="relative z-10">
              <div class="flex justify-between items-start mb-4">
                <div
                  class="p-4 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl text-white shadow-lg transform group-hover:scale-110 transition-transform">
                  <span class="text-3xl">👥</span>
                </div>
              </div>
              <h3 class="text-slate-500 text-sm font-semibold mb-1">Personnel</h3>
              <p class="text-4xl font-bold text-slate-800 mb-2">{{ stats.totalPersonnel }}</p>
              <div class="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div class="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full animate-progress"
                  style="width: 85%"></div>
              </div>
            </div>
          </div>

          <!-- Documents Stats -->
          <div
            class="group bg-white rounded-2xl shadow-lg border-2 border-slate-100 p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer relative overflow-hidden">
            <div
              class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-100 to-teal-200 rounded-full -mr-16 -mt-16 opacity-50">
            </div>
            <div class="relative z-10">
              <div class="flex justify-between items-start mb-4">
                <div
                  class="p-4 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl text-white shadow-lg transform group-hover:scale-110 transition-transform">
                  <span class="text-3xl">📂</span>
                </div>
              </div>
              <h3 class="text-slate-500 text-sm font-semibold mb-1">Documents</h3>
              <p class="text-4xl font-bold text-slate-800 mb-2">{{ stats.totalDocuments }}</p>
              <div class="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div class="h-full bg-gradient-to-r from-teal-500 to-teal-600 rounded-full animate-progress"
                  style="width: 45%"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Content Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          <!-- Left Column: Charts & Quick Actions -->
          <div class="lg:col-span-2 space-y-6 md:space-y-8">
            <!-- Visitor Stats Chart -->
            <div class="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 md:p-8">
              <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
                <div class="flex items-center gap-3">
                  <span class="text-3xl">📊</span>
                  <h3 class="text-xl font-bold text-slate-800">Website Visitors</h3>
                </div>
                <select
                  class="text-sm border-2 border-slate-200 rounded-xl px-4 py-2 text-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-slate-50">
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                </select>
              </div>

              <!-- Chart -->
              <div class="h-64 flex items-end justify-between gap-2 pt-4">
                <div v-for="(value, index) in visitorData" :key="index"
                  class="w-full flex flex-col items-center gap-2 group cursor-pointer">
                  <div
                    class="relative w-full bg-gradient-to-t from-blue-500 to-blue-300 rounded-t-xl hover:from-blue-600 hover:to-blue-400 transition-all duration-300 shadow-lg"
                    :style="{ height: `${(value / maxVisitor) * 100}%` }">
                    <div
                      class="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs font-bold py-2 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-xl whitespace-nowrap">
                      {{ value }} visitors
                    </div>
                  </div>
                  <span class="text-xs font-medium text-slate-500">{{ days[index] }}</span>
                </div>
              </div>
            </div>

            <!-- Quick Actions -->
            <div class="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 md:p-8">
              <div class="flex items-center gap-3 mb-6">
                <span class="text-3xl">⚡</span>
                <h3 class="text-xl font-bold text-slate-800">Quick Actions</h3>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <NuxtLink to="/admin/news/create"
                  class="group flex flex-col items-center p-6 hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 rounded-2xl border-2 border-slate-100 hover:border-blue-300 transition-all hover:shadow-xl transform hover:scale-105">
                  <div
                    class="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform shadow-lg">
                    <span class="text-3xl">✍️</span>
                  </div>
                  <h4 class="font-bold text-slate-800 mb-1">Post News</h4>
                  <p class="text-xs text-slate-500 text-center">New announcement</p>
                </NuxtLink>

                <NuxtLink to="/admin/gallery/create"
                  class="group flex flex-col items-center p-6 hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 rounded-2xl border-2 border-slate-100 hover:border-purple-300 transition-all hover:shadow-xl transform hover:scale-105">
                  <div
                    class="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform shadow-lg">
                    <span class="text-3xl">📸</span>
                  </div>
                  <h4 class="font-bold text-slate-800 mb-1">Upload Photos</h4>
                  <p class="text-xs text-slate-500 text-center">New gallery album</p>
                </NuxtLink>

                <NuxtLink to="/admin/calendar"
                  class="group flex flex-col items-center p-6 hover:bg-gradient-to-br hover:from-orange-50 hover:to-yellow-50 rounded-2xl border-2 border-slate-100 hover:border-orange-300 transition-all hover:shadow-xl transform hover:scale-105">
                  <div
                    class="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform shadow-lg">
                    <span class="text-3xl">📅</span>
                  </div>
                  <h4 class="font-bold text-slate-800 mb-1">Add Event</h4>
                  <p class="text-xs text-slate-500 text-center">Schedule activity</p>
                </NuxtLink>
              </div>
            </div>
          </div>

          <!-- Right Column: Events & System Info -->
          <div class="space-y-6 md:space-y-8">
            <!-- Upcoming Events Widget -->
            <div class="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
              <div class="flex justify-between items-center mb-6">
                <div class="flex items-center gap-3">
                  <span class="text-2xl">📅</span>
                  <h3 class="text-lg font-bold text-slate-800">Upcoming Events</h3>
                </div>
                <NuxtLink to="/admin/calendar"
                  class="text-sm text-blue-600 hover:text-blue-700 font-semibold hover:underline">View All →</NuxtLink>
              </div>

              <div v-if="loadingEvents" class="py-12 text-center text-slate-400">
                <div class="animate-spin text-4xl mb-2">⏳</div>
                <p class="text-sm">Loading events...</p>
              </div>
              <div v-else-if="upcomingEvents.length === 0" class="py-12 text-center">
                <span class="text-5xl mb-3 block">📭</span>
                <p class="text-slate-400 text-sm">No upcoming events</p>
              </div>
              <div v-else class="space-y-3">
                <div v-for="event in upcomingEvents" :key="event._id"
                  class="flex items-start gap-3 p-3 hover:bg-slate-50 rounded-xl transition-colors border border-slate-100">
                  <div
                    class="flex-shrink-0 w-14 text-center bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-xl py-2 shadow-md">
                    <span class="block text-[10px] font-bold uppercase">{{ getMonth(event.start) }}</span>
                    <span class="block text-xl font-bold">{{ getDate(event.start) }}</span>
                  </div>
                  <div class="flex-1 min-w-0">
                    <h4 class="text-sm font-bold text-slate-800 line-clamp-1 mb-1">{{ event.title }}</h4>
                    <p class="text-xs text-slate-500">{{ getTime(event.start) }} - {{ getTime(event.end) }}</p>
                    <span
                      class="inline-block mt-1.5 text-[10px] px-2 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold">
                      {{ event.type }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- System Status -->
            <div class="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
              <div class="flex items-center gap-3 mb-6">
                <span class="text-2xl">🖥️</span>
                <h3 class="text-lg font-bold text-slate-800">System Status</h3>
              </div>
              <div class="space-y-3">
                <div
                  class="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                  <div class="flex items-center gap-3">
                    <div class="w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-lg shadow-green-500/50"></div>
                    <span class="text-sm font-semibold text-slate-700">Database</span>
                  </div>
                  <span class="text-xs text-green-700 font-bold bg-green-200 px-3 py-1 rounded-full">Active</span>
                </div>
                <div
                  class="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                  <div class="flex items-center gap-3">
                    <div class="w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-lg shadow-green-500/50"></div>
                    <span class="text-sm font-semibold text-slate-700">Storage</span>
                  </div>
                  <span class="text-xs text-green-700 font-bold bg-green-200 px-3 py-1 rounded-full">Active</span>
                </div>
                <div
                  class="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                  <div class="flex items-center gap-3">
                    <div class="w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-lg shadow-green-500/50"></div>
                    <span class="text-sm font-semibold text-slate-700">API</span>
                  </div>
                  <span class="text-xs text-green-700 font-bold bg-green-200 px-3 py-1 rounded-full">Active</span>
                </div>
              </div>
            </div>

            <!-- Recent Activity Logs -->
            <div class="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
              <div class="flex items-center gap-3 mb-6">
                <span class="text-2xl">📝</span>
                <h3 class="text-lg font-bold text-slate-800">Recent Activity</h3>
              </div>
              <div v-if="loadingLogs" class="text-center text-slate-400 text-sm py-8">
                <div class="animate-spin text-3xl mb-2">⏳</div>
                <p>Loading logs...</p>
              </div>
              <div v-else-if="logs.length === 0" class="text-center text-slate-400 text-sm py-8">
                <span class="text-4xl mb-2 block">📭</span>
                <p>No recent activity</p>
              </div>
              <div v-else class="space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                <div v-for="log in logs" :key="log._id"
                  class="flex items-start gap-3 text-sm p-2 hover:bg-slate-50 rounded-lg transition-colors">
                  <div class="mt-0.5 text-xl">
                    <span v-if="log.action === 'create'" class="text-green-500">➕</span>
                    <span v-else-if="log.action === 'update'" class="text-blue-500">✏️</span>
                    <span v-else-if="log.action === 'delete'" class="text-red-500">🗑️</span>
                    <span v-else class="text-slate-500">ℹ️</span>
                  </div>
                  <div class="flex-1">
                    <p class="text-slate-800 font-medium">
                      <span class="capitalize">{{ log.action }}</span>
                      <span class="text-slate-500 font-normal mx-1">in</span>
                      <span class="capitalize font-bold text-blue-600">{{ log.module }}</span>
                    </p>
                    <p class="text-slate-500 text-xs mt-0.5">{{ log.description }}</p>
                    <p class="text-slate-400 text-[10px] mt-1">{{ new Date(log.createdAt).toLocaleString() }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: async (to, from) => {
    try {
      const { loggedIn } = await $fetch('/api/auth/me')
      if (!loggedIn) return navigateTo('/admin/login')
    } catch (e) {
      return navigateTo('/admin/login')
    }
  }
})

const currentDate = computed(() => {
  return new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
})

const days = ref(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'])
const visitorData = ref([0, 0, 0, 0, 0, 0, 0])
const maxVisitor = computed(() => Math.max(...visitorData.value, 10))

const stats = ref({
  totalNews: 0,
  totalGallery: 0,
  totalPersonnel: 0,
  totalDocuments: 0
})

const upcomingEvents = ref<any[]>([])
const logs = ref<any[]>([])
const loadingEvents = ref(true)
const loadingLogs = ref(true)

const fetchDashboardData = async () => {
  try {
    const [news, gallery, personnel, documents, events, activityLogs, visitorStats] = await Promise.all([
      $fetch('/api/news'),
      $fetch('/api/gallery'),
      $fetch('/api/personnel'),
      $fetch('/api/documents'),
      $fetch('/api/calendar'),
      $fetch('/api/activity-logs'),
      $fetch('/api/visitors/stats')
    ])

    stats.value = {
      totalNews: (news as any).data?.length || 0,
      totalGallery: (gallery as any).data?.length || 0,
      totalPersonnel: (personnel as any).data?.length || 0,
      totalDocuments: (documents as any).data?.length || 0
    }

    const allEvents = (events as any).data || []
    upcomingEvents.value = allEvents
      .filter((e: any) => new Date(e.start) >= new Date())
      .sort((a: any, b: any) => new Date(a.start).getTime() - new Date(b.start).getTime())
      .slice(0, 5)

    logs.value = (activityLogs as any).data || []

    const vStats = (visitorStats as any).data || []
    days.value = vStats.map((s: any) => s.day)
    visitorData.value = vStats.map((s: any) => s.count)

  } catch (e) {
    console.error('Failed to fetch dashboard data', e)
  } finally {
    loadingEvents.value = false
    loadingLogs.value = false
  }
}

const getMonth = (dateStr: string) => new Date(dateStr).toLocaleString('en-US', { month: 'short' })
const getDate = (dateStr: string) => new Date(dateStr).getDate()
const getTime = (dateStr: string) => new Date(dateStr).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })

onMounted(fetchDashboardData)
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

@keyframes float {

  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }

  50% {
    transform: translateY(-20px) rotate(5deg);
  }
}

@keyframes wave {

  0%,
  100% {
    transform: rotate(0deg);
  }

  25% {
    transform: rotate(20deg);
  }

  75% {
    transform: rotate(-20deg);
  }
}

@keyframes progress {
  from {
    width: 0%;
  }
}

.animate-fade-in {
  animation: fadeIn 0.6s ease-out;
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delay {
  animation: float 8s ease-in-out infinite 1s;
}

.animate-wave {
  animation: wave 2s ease-in-out infinite;
}

.animate-progress {
  animation: progress 1.5s ease-out;
}
</style>
