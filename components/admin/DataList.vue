<template>
    <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <!-- Header -->
        <div class="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <h2 class="text-xl font-bold text-slate-800">{{ title }}</h2>

            <div class="flex items-center gap-3 w-full md:w-auto">
                <!-- Search -->
                <div class="relative flex-1 md:w-64">
                    <input v-model="searchQuery" type="text" placeholder="Search..."
                        class="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                    <span class="absolute left-3 top-2.5 text-slate-400">🔍</span>
                </div>

                <!-- Actions Slot (e.g. Create Button) -->
                <slot name="actions" />
            </div>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
                <thead>
                    <tr class="bg-slate-50 text-slate-600 text-sm uppercase tracking-wider">
                        <th v-for="col in columns" :key="col.key" class="px-6 py-4 font-semibold">
                            {{ col.label }}
                        </th>
                        <th class="px-6 py-4 font-semibold text-right">Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                    <tr v-if="loading" class="animate-pulse">
                        <td :colspan="columns.length + 1" class="px-6 py-8 text-center text-slate-500">
                            Loading data...
                        </td>
                    </tr>

                    <tr v-else-if="filteredData.length === 0">
                        <td :colspan="columns.length + 1" class="px-6 py-8 text-center text-slate-500">
                            No data found.
                        </td>
                    </tr>

                    <tr v-for="item in filteredData" :key="item._id" class="hover:bg-slate-50 transition-colors group">
                        <td v-for="col in columns" :key="col.key" class="px-6 py-4 text-sm text-slate-700 align-middle">
                            <!-- Slot for custom cell rendering -->
                            <slot :name="col.key" :item="item">
                                {{ item[col.key] }}
                            </slot>
                        </td>
                        <td class="px-6 py-4 text-right space-x-2">
                            <button @click="$emit('edit', item)"
                                class="text-blue-600 hover:text-blue-800 font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors">
                                Edit
                            </button>
                            <button @click="$emit('delete', item)"
                                class="text-red-600 hover:text-red-800 font-medium px-2 py-1 rounded hover:bg-red-50 transition-colors">
                                Delete
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Footer / Pagination (Simple for now) -->
        <div class="p-4 border-t border-slate-100 text-sm text-slate-500 flex justify-between items-center">
            <span>Showing {{ filteredData.length }} items</span>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Column {
    key: string
    label: string
}

const props = defineProps<{
    title: string
    columns: Column[]
    data: any[]
    loading?: boolean
}>()

defineEmits(['edit', 'delete'])

const searchQuery = ref('')

const filteredData = computed(() => {
    if (!searchQuery.value) return props.data

    const query = searchQuery.value.toLowerCase()
    return props.data.filter(item => {
        return Object.values(item).some(val =>
            String(val).toLowerCase().includes(query)
        )
    })
})
</script>
