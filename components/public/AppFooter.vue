<template>
    <footer class="bg-gradient-to-b from-slate-900 to-slate-950 text-slate-300">
        <!-- Main Footer Content -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                <!-- School Info -->
                <div class="sm:col-span-2 lg:col-span-2">
                    <div class="flex items-start gap-4 mb-6">
                        <div
                            class="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center text-white font-bold text-2xl overflow-hidden shadow-lg shadow-primary-500/20 flex-shrink-0">
                            <ClientOnly>
                                <NuxtImg v-if="configStore.config?.logo" :src="configStore.config.logo"
                                    class="w-full h-full object-cover" />
                                <span v-else>ร</span>
                            </ClientOnly>
                        </div>
                        <div>
                            <div class="text-xl font-bold text-white">
                                <ClientOnly fallback="โรงเรียนราชประชานุเคราะห์ 41">
                                    {{
                                        configStore.config?.schoolName ||
                                    "โรงเรียนราชประชานุเคราะห์ 41"
                                    }}
                                </ClientOnly>
                            </div>
                            <div class="text-sm text-slate-400 mt-1">
                                <ClientOnly fallback="สังกัด สพฐ. กระทรวงศึกษาธิการ">
                                    {{ configStore.config?.location?.province ? `สังกัด สพฐ.
                                    จังหวัด${configStore.config.location.province}` : "สังกัด สพฐ. กระทรวงศึกษาธิการ" }}
                                </ClientOnly>
                            </div>
                        </div>
                    </div>

                    <!-- Social Links -->
                    <div class="flex items-center gap-3 mt-6">
                        <ClientOnly>
                            <a v-if="configStore.config?.socialMedia?.facebook"
                                :href="configStore.config.socialMedia.facebook" target="_blank"
                                class="w-10 h-10 bg-slate-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all hover:scale-110 shadow-lg">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                        d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" />
                                </svg>
                            </a>
                            <a v-if="configStore.config?.socialMedia?.line" :href="configStore.config.socialMedia.line"
                                target="_blank"
                                class="w-10 h-10 bg-slate-800 hover:bg-green-500 rounded-lg flex items-center justify-center transition-all hover:scale-110 shadow-lg">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                        d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zM24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                                </svg>
                            </a>
                            <a v-if="configStore.config?.socialMedia?.youtube"
                                :href="configStore.config.socialMedia.youtube" target="_blank"
                                class="w-10 h-10 bg-slate-800 hover:bg-red-600 rounded-lg flex items-center justify-center transition-all hover:scale-110 shadow-lg">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                        d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                </svg>
                            </a>
                        </ClientOnly>
                    </div>
                </div>

                <!-- Quick Links -->
                <div>
                    <h3 class="text-white font-bold mb-5 flex items-center gap-2">
                        <span class="w-1.5 h-5 bg-primary-500 rounded-full"></span>
                        ลิงก์ด่วน
                    </h3>
                    <ul class="space-y-3">
                        <li v-for="link in quickLinks" :key="link.path">
                            <NuxtLink :to="link.path"
                                class="text-sm text-slate-400 hover:text-primary-400 transition-colors flex items-center gap-2 group">
                                <span
                                    class="w-1.5 h-1.5 bg-slate-600 rounded-full group-hover:bg-primary-400 transition-colors"></span>
                                {{ link.label }}
                            </NuxtLink>
                        </li>
                    </ul>
                </div>

                <!-- Contact Info -->
                <div>
                    <h3 class="text-white font-bold mb-5 flex items-center gap-2">
                        <span class="w-1.5 h-5 bg-primary-500 rounded-full"></span>
                        ติดต่อเรา
                    </h3>
                    <ul class="space-y-4 text-sm">
                        <li class="flex items-start gap-3">
                            <span
                                class="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center text-primary-400 flex-shrink-0">📍</span>
                            <ClientOnly fallback="ยะลา">
                                <span class="text-slate-400 leading-relaxed">{{
                                    configStore.config?.location?.address || "ยะลา"
                                    }}</span>
                            </ClientOnly>
                        </li>
                        <li class="flex items-center gap-3">
                            <span
                                class="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center text-primary-400 flex-shrink-0">📞</span>
                            <ClientOnly fallback="-">
                                <a :href="`tel:${configStore.config?.contact?.phone}`"
                                    class="text-slate-400 hover:text-primary-400 transition-colors">
                                    {{ configStore.config?.contact?.phone || "-" }}
                                </a>
                            </ClientOnly>
                        </li>
                        <li class="flex items-center gap-3">
                            <span
                                class="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center text-primary-400 flex-shrink-0">📧</span>
                            <ClientOnly fallback="-">
                                <a :href="`mailto:${configStore.config?.contact?.email}`"
                                    class="text-slate-400 hover:text-primary-400 transition-colors">
                                    {{ configStore.config?.contact?.email || "-" }}
                                </a>
                            </ClientOnly>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Bottom Bar -->
        <div class="border-t border-slate-800/50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div class="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-slate-500">
                    <p>
                        &copy;
                        <ClientOnly><template #fallback>2024</template>{{ currentYear }}</ClientOnly>
                        โรงเรียนราชประชานุเคราะห์ 41 จังหวัดยะลา
                    </p>
                    <div class="flex items-center gap-4">
                        <NuxtLink to="/contact" class="hover:text-primary-400 transition-colors">ติดต่อเรา</NuxtLink>
                        <span class="text-slate-700">|</span>
                        <NuxtLink to="/about" class="hover:text-primary-400 transition-colors">เกี่ยวกับเรา</NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
import { useConfigStore } from "~/stores/config";
const configStore = useConfigStore();
const currentYear = new Date().getFullYear();

const quickLinks = [
    { path: "/news", label: "ข่าวสาร" },
    { path: "/gallery", label: "แกลเลอรี่" },
    { path: "/calendar", label: "ปฏิทินกิจกรรม" },
    { path: "/personnel", label: "บุคลากร" },
    { path: "/about", label: "เกี่ยวกับเรา" },
];
</script>
