<template>
    <div
        class="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 dark:text-slate-100 transition-colors duration-300">
        <!-- Navbar -->
        <PublicAppNavbar />

        <!-- Main Content -->
        <main class="flex-1">
            <slot />
        </main>

        <!-- Footer -->
        <PublicAppFooter />

        <!-- Scroll to Top Button -->
        <PublicScrollToTop />

        <!-- Announcement Popup -->
        <PublicAnnouncementPopup />
    </div>
</template>
