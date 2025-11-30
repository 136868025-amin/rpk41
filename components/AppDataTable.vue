<template>
  <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full">
    <!-- Header / Actions -->
    <div class="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white">
      <div class="relative w-full sm:w-72 group">
        <input v-model="searchQuery" type="text" placeholder="Search records..."
          class="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm" />
        <span class="absolute left-3 top-3 text-slate-400 group-focus-within:text-blue-500 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
      </div>
      <div class="flex gap-3 w-full sm:w-auto">
        <slot name="actions" />
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto flex-1">
      <table class="w-full text-left border-collapse">
        <thead
          class="bg-slate-50/50 text-slate-500 uppercase text-[11px] font-bold tracking-wider border-b border-slate-100">
          <tr>
            <th v-for="col in columns" :key="col.key"
              class="px-6 py-4 cursor-pointer hover:bg-slate-100/50 transition-colors select-none"
              @click="sortBy(col.key)">
              <div class="flex items-center gap-1.5">
                {{ col.label }}
                <span v-if="sortKey === col.key" class="text-blue-600 bg-blue-50 rounded p-0.5">
                  <svg v-if="sortOrder === 'asc'" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                  </svg>
                  <svg v-else class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
                <span v-else class="text-slate-300">
                  <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                </span>
              </div>
            </th>
            <th v-if="$slots.rowActions" class="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <!-- Loading State (Skeleton) -->
          <template v-if="loading">
            <tr v-for="i in 5" :key="i" class="animate-pulse">
              <td v-for="col in columns" :key="col.key" class="px-6 py-4">
                <div class="h-4 bg-slate-100 rounded w-3/4"></div>
              </td>
              <td v-if="$slots.rowActions" class="px-6 py-4">
                <div class="h-8 w-8 bg-slate-100 rounded-full ml-auto"></div>
              </td>
            </tr>
          </template>

          <!-- Empty State -->
          <tr v-else-if="paginatedData.length === 0">
            <td :colspan="columns.length + ($slots.rowActions ? 1 : 0)" class="px-6 py-12 text-center">
              <div class="flex flex-col items-center justify-center text-slate-400">
                <div class="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-3">
                  <svg class="h-8 w-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p class="text-sm font-medium text-slate-500">No data found</p>
                <p class="text-xs text-slate-400 mt-1">Try adjusting your search or filters</p>
              </div>
            </td>
          </tr>

          <!-- Data Rows -->
          <tr v-for="(item, index) in paginatedData" :key="index" class="hover:bg-slate-50/80 transition-colors group">
            <td v-for="col in columns" :key="col.key" class="px-6 py-4 text-sm text-slate-600">
              <slot :name="`cell-${col.key}`" :item="item" :value="item[col.key]">
                {{ item[col.key] }}
              </slot>
            </td>
            <td v-if="$slots.rowActions" class="px-6 py-4 text-right">
              <slot name="rowActions" :item="item" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div
      class="p-4 border-t border-slate-100 bg-slate-50/30 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-slate-500">
      <div>
        Showing <span class="font-medium text-slate-700">{{ startIndex + 1 }}</span> to <span
          class="font-medium text-slate-700">{{ Math.min(endIndex, filteredData.length) }}</span> of <span
          class="font-medium text-slate-700">{{ filteredData.length }}</span> entries
      </div>
      <div class="flex gap-2">
        <button @click="currentPage--" :disabled="currentPage === 1"
          class="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm">
          Previous
        </button>
        <div class="flex gap-1">
          <button v-for="page in totalPages" :key="page" @click="currentPage = page"
            class="w-8 h-8 flex items-center justify-center rounded-lg text-xs font-medium transition-all"
            :class="currentPage === page ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30' : 'bg-white border border-slate-200 hover:bg-slate-50 text-slate-600'">
            {{ page }}
          </button>
        </div>
        <button @click="currentPage++" :disabled="currentPage === totalPages"
          class="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm">
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  columns: { key: string; label: string }[]
  data: any[]
  loading?: boolean
}>()

const searchQuery = ref('')
const sortKey = ref('')
const sortOrder = ref<'asc' | 'desc'>('asc')
const currentPage = ref(1)
const itemsPerPage = 10

// Filter
const filteredData = computed(() => {
  if (!searchQuery.value) return props.data
  const lowerQuery = searchQuery.value.toLowerCase()
  return props.data.filter((item) =>
    Object.values(item).some((val) => String(val).toLowerCase().includes(lowerQuery))
  )
})

// Sort
const sortedData = computed(() => {
  if (!sortKey.value) return filteredData.value
  return [...filteredData.value].sort((a, b) => {
    const valA = a[sortKey.value]
    const valB = b[sortKey.value]
    if (valA < valB) return sortOrder.value === 'asc' ? -1 : 1
    if (valA > valB) return sortOrder.value === 'asc' ? 1 : -1
    return 0
  })
})

// Pagination
const totalPages = computed(() => Math.ceil(sortedData.value.length / itemsPerPage))
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage)
const endIndex = computed(() => startIndex.value + itemsPerPage)
const paginatedData = computed(() => sortedData.value.slice(startIndex.value, endIndex.value))

const sortBy = (key: string) => {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortOrder.value = 'asc'
  }
}

// Reset pagination on search
watch(searchQuery, () => {
  currentPage.value = 1
})
</script>
