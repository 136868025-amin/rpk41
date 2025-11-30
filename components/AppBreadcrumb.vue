<template>
    <nav class="flex items-center space-x-2 text-sm mb-6">
        <NuxtLink to="/admin" class="text-slate-500 hover:text-slate-700 transition-colors">
            🏠 Admin
        </NuxtLink>

        <template v-for="(crumb, index) in breadcrumbs" :key="index">
            <span class="text-slate-300">/</span>
            <NuxtLink v-if="crumb.path" :to="crumb.path"
                class="text-slate-500 hover:text-slate-700 transition-colors capitalize">
                {{ crumb.label }}
            </NuxtLink>
            <span v-else class="text-slate-800 font-medium capitalize">
                {{ crumb.label }}
            </span>
        </template>
    </nav>
</template>

<script setup lang="ts">
const route = useRoute()

const breadcrumbs = computed(() => {
    const pathSegments = route.path.split('/').filter(Boolean)
    const crumbs: { label: string; path?: string }[] = []

    // Skip 'admin' segment as it's always the first link
    const segments = pathSegments.slice(1)

    segments.forEach((segment, index) => {
        // Prettier labels for common routes
        const labelMap: Record<string, string> = {
            'news': 'News',
            'gallery': 'Gallery',
            'documents': 'Documents',
            'calendar': 'Calendar',
            'personnel': 'Personnel',
            'settings': 'Settings',
            'banners': 'Banners',
            'create': 'Create New',
            'edit': 'Edit'
        }

        const label = labelMap[segment] || segment.replace(/-/g, ' ')

        // Build path for clickable breadcrumbs (all except last)
        const isLast = index === segments.length - 1
        const path = isLast ? undefined : '/admin/' + segments.slice(0, index + 1).join('/')

        crumbs.push({ label, path })
    })

    return crumbs
})
</script>
