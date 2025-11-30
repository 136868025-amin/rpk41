<template>
    <footer class="bg-slate-900 text-slate-300">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <!-- School Info -->
                <div class="lg:col-span-2">
                    <div class="flex items-center gap-3 mb-4">
                        <div class="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center text-white font-bold text-2xl">
                            ร
                        </div>
                        <div>
                            <div class="text-lg font-bold text-white">โรงเรียนราชประชานุเคราะห์ 41</div>
                            <div class="text-sm">จังหวัดยะลา</div>
                        </div>
                    </div>
                    <p class="text-sm text-slate-400 leading-relaxed mb-4">
                        โรงเรียนราชประชานุเคราะห์ 41 จังหวัดยะลา มุ่งมั่นพัฒนาคุณภาพการศึกษา 
                        เพื่อสร้างคนดี มีความรู้ และพร้อมสู่สังคมโลก
                    </p>
                    <div class="flex gap-3">
                        <a href="#" class="w-10 h-10 bg-slate-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors">
                            <span class="text-xl">📘</span>
                        </a>
                        <a href="#" class="w-10 h-10 bg-slate-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors">
                            <span class="text-xl">📷</span>
                        </a>
                        <a href="#" class="w-10 h-10 bg-slate-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors">
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
                            <span>123 ถนนสมมุติ ตำบลสะเตง<br>อำเภอเมือง จังหวัดยะลา 95000</span>
                        </li>
                        <li class="flex items-center gap-2">
                            <span class="text-primary-400">📞</span>
                            <span>073-123-456</span>
                        </li>
                        <li class="flex items-center gap-2">
                            <span class="text-primary-400">📧</span>
                            <span>info@rpk41.ac.th</span>
                        </li>
                        <li class="flex items-center gap-2">
                            <span class="text-primary-400">🕐</span>
                            <span>จันทร์-ศุกร์ 08:00-16:30 น.</span>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Bottom Bar -->
            <div class="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-400">
                <p>&copy; {{ currentYear }} โรงเรียนราชประชานุเคราะห์ 41 จังหวัดยะลา. All rights reserved.</p>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>
