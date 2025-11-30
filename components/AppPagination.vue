<template>
    <div v-if="totalPages > 1" class="flex items-center justify-between px-6 py-4 bg-white border-t border-slate-200">
        <div class="text-sm text-slate-600">
            Showing <span class="font-medium">{{ startIndex + 1 }}</span> to
            <span class="font-medium">{{ Math.min(endIndex, totalItems) }}</span> of
            <span class="font-medium">{{ totalItems }}</span> items
        </div>

        <div class="flex items-center gap-2">
            <!-- Previous Button -->
            <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1"
                class="px-3 py-2 text-sm font-medium rounded-lg border transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                :class="currentPage === 1
                    ? 'border-slate-200 text-slate-400 bg-white'
                    : 'border-slate-300 text-slate-700 bg-white hover:bg-slate-50'">
                Previous
            </button>

            <!-- Page Numbers -->
            <div class="flex items-center gap-1">
                <!-- First Page -->
                <button v-if="showFirstPage" @click="goToPage(1)"
                    class="w-10 h-10 text-sm font-medium rounded-lg transition-colors" :class="currentPage === 1
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'">
                    1
                </button>

                <!-- First Ellipsis -->
                <span v-if="showFirstEllipsis" class="px-2 text-slate-400">...</span>

                <!-- Visible Pages -->
                <button v-for="page in visiblePages" :key="page" @click="goToPage(page)"
                    class="w-10 h-10 text-sm font-medium rounded-lg transition-colors" :class="currentPage === page
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'">
                    {{ page }}
                </button>

                <!-- Last Ellipsis -->
                <span v-if="showLastEllipsis" class="px-2 text-slate-400">...</span>

                <!-- Last Page -->
                <button v-if="showLastPage" @click="goToPage(totalPages)"
                    class="w-10 h-10 text-sm font-medium rounded-lg transition-colors" :class="currentPage === totalPages
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'">
                    {{ totalPages }}
                </button>
            </div>

            <!-- Next Button -->
            <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages"
                class="px-3 py-2 text-sm font-medium rounded-lg border transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                :class="currentPage === totalPages
                    ? 'border-slate-200 text-slate-400 bg-white'
                    : 'border-slate-300 text-slate-700 bg-white hover:bg-slate-50'">
                Next
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    currentPage: number
    totalItems: number
    itemsPerPage: number
}>()

const emit = defineEmits<{
    'update:currentPage': [number]
}>()

const totalPages = computed(() => Math.ceil(props.totalItems / props.itemsPerPage))
const startIndex = computed(() => (props.currentPage - 1) * props.itemsPerPage)
const endIndex = computed(() => startIndex.value + props.itemsPerPage)

const maxVisiblePages = 5
const sidePages = Math.floor(maxVisiblePages / 2)

const visiblePages = computed(() => {
    const pages: number[] = []
    let start = Math.max(2, props.currentPage - sidePages)
    let end = Math.min(totalPages.value - 1, props.currentPage + sidePages)

    // Adjust if we're near the beginning or end
    if (props.currentPage <= sidePages + 1) {
        end = Math.min(totalPages.value - 1, maxVisiblePages)
    } else if (props.currentPage >= totalPages.value - sidePages) {
        start = Math.max(2, totalPages.value - maxVisiblePages + 1)
    }

    for (let i = start; i <= end; i++) {
        if (i !== 1 && i !== totalPages.value) {
            pages.push(i)
        }
    }

    return pages
})

const showFirstPage = computed(() => totalPages.value > 1)
const showLastPage = computed(() => totalPages.value > 1 && totalPages.value !== 1)
const showFirstEllipsis = computed(() => visiblePages.value.length > 0 && visiblePages.value[0] > 2)
const showLastEllipsis = computed(() => {
    const last = visiblePages.value[visiblePages.value.length - 1]
    return visiblePages.value.length > 0 && last < totalPages.value - 1
})

const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value && page !== props.currentPage) {
        emit('update:currentPage', page)
    }
}
</script>
