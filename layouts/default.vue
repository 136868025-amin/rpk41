<template>
    <div class="min-h-screen flex flex-col bg-slate-50">
        <!-- Navbar -->
        <PublicAppNavbar />

        <!-- Main Content -->
        <main class="flex-1">
            <slot />
        </main>

        <!-- Footer -->
        <PublicAppFooter />
    </div>
</template>
