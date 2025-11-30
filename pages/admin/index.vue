<template>
  <NuxtLayout name="admin">
    <div class="space-y-8">
      <!-- Welcome Section -->
      <div
        class="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
        <div class="relative z-10">
          <h1 class="text-3xl font-bold mb-2">Welcome back, Admin! 👋</h1>
          <p class="text-blue-100 max-w-xl">
            Here's what's happening with your school website today. You have some new updates to review.
          </p>
        </div>
        <!-- Decorative Circles -->
        <div class="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
        <div class="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- News Stats -->
        <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <div class="flex justify-between items-start mb-4">
            <div class="p-3 bg-blue-50 rounded-lg text-blue-600">
              <span class="text-2xl">📰</span>
            </div>
            <span class="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">+2 new</span>
          </div>
          <h3 class="text-slate-500 text-sm font-medium">Total News</h3>
          <p class="text-3xl font-bold text-slate-800 mt-1">{{ stats.totalNews }}</p>
        </div>

        <!-- Gallery Stats -->
        <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <div class="flex justify-between items-start mb-4">
            <div class="p-3 bg-purple-50 rounded-lg text-purple-600">
              <span class="text-2xl">📸</span>
            </div>
          </div>
          <h3 class="text-slate-500 text-sm font-medium">Gallery Albums</h3>
          <p class="text-3xl font-bold text-slate-800 mt-1">{{ stats.totalGallery }}</p>
        </div>

        <!-- Personnel Stats -->
        <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <div class="flex justify-between items-start mb-4">
            <div class="p-3 bg-orange-50 rounded-lg text-orange-600">
              <span class="text-2xl">👥</span>
            </div>
          </div>
          <h3 class="text-slate-500 text-sm font-medium">Personnel</h3>
          <p class="text-3xl font-bold text-slate-800 mt-1">{{ stats.totalPersonnel }}</p>
        </div>

        <!-- Documents Stats -->
        <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <div class="flex justify-between items-start mb-4">
            <div class="p-3 bg-teal-50 rounded-lg text-teal-600">
              <span class="text-2xl">📂</span>
            </div>
          </div>
          <h3 class="text-slate-500 text-sm font-medium">Documents</h3>
          <p class="text-3xl font-bold text-slate-800 mt-1">{{ stats.totalDocuments }}</p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left Column: Charts & Quick Actions -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Visitor Stats Chart -->
          <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-lg font-bold text-slate-800">Website Visitors</h3>
              <select class="text-sm border-slate-200 rounded-lg text-slate-500 focus:ring-blue-500">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
              </select>
            </div>

            <!-- Custom CSS Chart -->
            <div class="h-64 flex items-end justify-between gap-2 pt-4">
              <div v-for="(value, index) in visitorData" :key="index"
                class="w-full flex flex-col items-center gap-2 group">
                <div class="relative w-full bg-blue-50 rounded-t-lg hover:bg-blue-100 transition-all duration-300"
                  :style="{ height: `${(value / maxVisitor) * 100}%` }">
                  <div
                    class="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {{ value }}
                  </div>
                </div>
                <span class="text-xs text-slate-400">{{ days[index] }}</span>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 class="text-lg font-bold text-slate-800 mb-4">Quick Actions</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <NuxtLink to="/admin/news/create"
                class="flex items-center p-4 hover:bg-slate-50 rounded-xl border border-slate-100 transition-all group hover:border-blue-200 hover:shadow-sm">
                <div
                  class="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <span class="text-xl">✍️</span>
                </div>
                <div>
                  <h4 class="font-bold text-slate-800">Post News</h4>
                  <p class="text-xs text-slate-500">New announcement</p>
                </div>
              </NuxtLink>

              <NuxtLink to="/admin/gallery/create"
                class="flex items-center p-4 hover:bg-slate-50 rounded-xl border border-slate-100 transition-all group hover:border-purple-200 hover:shadow-sm">
                <div
                  class="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-4 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                  <span class="text-xl">📸</span>
                </div>
                <div>
                  <h4 class="font-bold text-slate-800">Upload Photos</h4>
                  <p class="text-xs text-slate-500">New gallery album</p>
                </div>
              </NuxtLink>

              <NuxtLink to="/admin/calendar"
                class="flex items-center p-4 hover:bg-slate-50 rounded-xl border border-slate-100 transition-all group hover:border-orange-200 hover:shadow-sm">
                <div
                  class="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 mr-4 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                  <span class="text-xl">📅</span>
                </div>
                <div>
                  <h4 class="font-bold text-slate-800">Add Event</h4>
                  <p class="text-xs text-slate-500">Schedule activity</p>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Right Column: Calendar & System Status -->
        <div class="space-y-8">
          <!-- Upcoming Events Widget -->
          <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg font-bold text-slate-800">Upcoming Events</h3>
              <NuxtLink to="/admin/calendar" class="text-sm text-blue-600 hover:underline">View All</NuxtLink>
            </div>

            <div v-if="loadingEvents" class="py-8 text-center text-slate-400">
              Loading events...
            </div>
            <div v-else-if="upcomingEvents.length === 0" class="py-8 text-center text-slate-400">
              No upcoming events
            </div>
            <div v-else class="space-y-4">
              <div v-for="event in upcomingEvents" :key="event._id"
                class="flex items-start gap-3 pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                <div class="flex-shrink-0 w-12 text-center bg-blue-50 rounded-lg py-1">
                  <span class="block text-xs font-bold text-blue-600 uppercase">{{ getMonth(event.start) }}</span>
                  <span class="block text-lg font-bold text-slate-800">{{ getDate(event.start) }}</span>
                </div>
                <div>
                  <h4 class="text-sm font-bold text-slate-800 line-clamp-1">{{ event.title }}</h4>
                  <p class="text-xs text-slate-500 mt-0.5">{{ getTime(event.start) }} - {{ getTime(event.end) }}</p>
                  <span class="inline-block mt-1 text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                    {{ event.type }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- System Status -->
          <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 class="text-lg font-bold text-slate-800 mb-4">System Status</h3>
            <div class="space-y-4">
              <div class="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div class="flex items-center space-x-3">
                  <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span class="text-sm font-medium text-slate-700">Database</span>
                </div>
                <span class="text-xs text-green-600 font-bold bg-green-100 px-2 py-1 rounded">Operational</span>
              </div>
              <div class="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div class="flex items-center space-x-3">
                  <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span class="text-sm font-medium text-slate-700">Storage</span>
                </div>
                <span class="text-xs text-green-600 font-bold bg-green-100 px-2 py-1 rounded">Operational</span>
              </div>
              <div class="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div class="flex items-center space-x-3">
                  <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span class="text-sm font-medium text-slate-700">API</span>
                </div>
                <span class="text-xs text-green-600 font-bold bg-green-100 px-2 py-1 rounded">Operational</span>
              </div>
            </div>
          </div>

          <!-- Recent Activity Logs -->
          <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 class="text-lg font-bold text-slate-800 mb-4">Recent Activity</h3>
            <div class="space-y-4">
              <div v-if="loadingLogs" class="text-center text-slate-400 text-sm py-4">Loading logs...</div>
              <div v-else-if="logs.length === 0" class="text-center text-slate-400 text-sm py-4">No recent activity
              </div>
              <div v-else v-for="log in logs" :key="log._id" class="flex items-start gap-3 text-sm">
                <div class="mt-1">
                  <span v-if="log.action === 'create'" class="text-green-500">➕</span>
                  <span v-else-if="log.action === 'update'" class="text-blue-500">✏️</span>
                  <span v-else-if="log.action === 'delete'" class="text-red-500">🗑️</span>
                  <span v-else class="text-slate-500">ℹ️</span>
                </div>
                <div>
                  <p class="text-slate-800 font-medium">
                    <span class="capitalize">{{ log.action }}</span>
                    <span class="text-slate-500 font-normal">in</span>
                    <span class="capitalize font-semibold">{{ log.module }}</span>
                  </p>
                  <p class="text-slate-500 text-xs">{{ log.description }}</p>
                  <p class="text-slate-400 text-[10px] mt-0.5">{{ new Date(log.createdAt).toLocaleString() }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
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

// Mock Data for Charts
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const visitorData = [150, 230, 180, 320, 290, 140, 190]
const maxVisitor = Math.max(...visitorData)

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
    // Fetch real stats from APIs
    const [news, gallery, personnel, documents, events, activityLogs] = await Promise.all([
      $fetch('/api/news'),
      $fetch('/api/gallery'),
      $fetch('/api/personnel'),
      $fetch('/api/documents'),
      $fetch('/api/calendar'),
      $fetch('/api/activity-logs')
    ])

    stats.value = {
      totalNews: (news as any).data?.length || 0,
      totalGallery: (gallery as any).data?.length || 0,
      totalPersonnel: (personnel as any).data?.length || 0,
      totalDocuments: (documents as any).data?.length || 0
    }

    // Process events for widget (take next 5)
    const allEvents = (events as any).data || []
    upcomingEvents.value = allEvents
      .filter((e: any) => new Date(e.start) >= new Date()) // Only future events
      .sort((a: any, b: any) => new Date(a.start).getTime() - new Date(b.start).getTime())
      .slice(0, 5)

    // Process logs
    logs.value = (activityLogs as any).data || []

  } catch (e) {
    console.error('Failed to fetch dashboard data', e)
  } finally {
    loadingEvents.value = false
    loadingLogs.value = false
  }
}

// Date helpers
const getMonth = (dateStr: string) => new Date(dateStr).toLocaleString('en-US', { month: 'short' })
const getDate = (dateStr: string) => new Date(dateStr).getDate()
const getTime = (dateStr: string) => new Date(dateStr).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })

onMounted(fetchDashboardData)
</script>
