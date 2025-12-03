<template>
    <footer class="bg-slate-900 text-slate-300">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <!-- School Info -->
                <div class="lg:col-span-2">
                    <div class="flex items-center gap-3 mb-4">
                        <div
                            class="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center text-white font-bold text-2xl overflow-hidden">
                            <img v-if="configStore.config?.logo" :src="configStore.config.logo"
                                class="w-full h-full object-cover" />
                            <span v-else>ร</span>
                        </div>
                        <div>
                            <div class="text-lg font-bold text-white">
                                {{
                                    configStore.config?.schoolName ||
                                    "โรงเรียนราชประชานุเคราะห์ 41"
                                }}
                            </div>
                            <div class="text-sm">
                                {{
                                    configStore.config?.location?.province
                                        ? `จังหวัด${configStore.config.location.province}`
                                        : "จังหวัดยะลา"
                                }}
                            </div>
                        </div>
                        <a v-if="configStore.config?.socialMedia?.youtube"
                            :href="configStore.config.socialMedia.youtube" target="_blank"
                            class="w-10 h-10 bg-slate-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors">
                            <span class="text-xl">▶️</span>
                        </a>
                    </div>
                </div>

                <!-- Quick Links -->
                <div>
                    <h3 class="text-white font-bold mb-4">ลิงก์ด่วน</h3>
                    <ul class="space-y-2">
                        <li>
                            <NuxtLink to="/news" class="text-sm hover:text-primary-400 transition-colors">
                                ข่าวสาร
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/gallery" class="text-sm hover:text-primary-400 transition-colors">
                                แกลเลอรี่
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/calendar" class="text-sm hover:text-primary-400 transition-colors">
                                ปฏิทินกิจกรรม
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/personnel" class="text-sm hover:text-primary-400 transition-colors">
                                บุคลากร
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/about" class="text-sm hover:text-primary-400 transition-colors">
                                เกี่ยวกับเรา
                            </NuxtLink>
                        </li>
                    </ul>
                </div>

                <!-- Contact Info -->
                <div>
                    <h3 class="text-white font-bold mb-4">ติดต่อเรา</h3>
                    <ul class="space-y-3 text-sm">
                        <li class="flex items-start gap-2">
                            <span class="text-primary-400">📍</span>
                            <span>{{
                                configStore.config?.location?.address ||
                                "123 ถนนสมมุติ ตำบลสะเตง อำเภอเมือจังหวัดยะลา 95000"
                            }}</span>
                        </li>
                        <li class="flex items-center gap-2">
                            <span class="text-primary-400">📞</span>
                            <span>{{
                                configStore.config?.contact?.phone || "073-123-456"
                                }}</span>
                        </li>
                        <li class="flex items-center gap-2">
                            <span class="text-primary-400">📧</span>
                            <span>{{
                                configStore.config?.contact?.email || "info@rpk41.ac.th"
                                }}</span>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Bottom Bar -->
            <div class="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-400">
                <p>
                    &copy; {{ currentYear }} โรงเรียนราชประชานุเคราะห์ 41 จังหวัดยะลา. All
                    rights reserved.
                </p>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
import { useConfigStore } from "~/stores/config";
const configStore = useConfigStore();
const currentYear = new Date().getFullYear();
</script>
