<template>
  <div>
    <AppLoader />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - โรงเรียนราชประชานุเคราะห์ ๔๑` : 'โรงเรียนราชประชานุเคราะห์ ๔๑ จังหวัดยะลา'
  }
})

useSeoMeta({
  title: 'โรงเรียนราชประชานุเคราะห์ ๔๑ จังหวัดยะลา',
  ogTitle: 'โรงเรียนราชประชานุเคราะห์ ๔๑ จังหวัดยะลา',
  description: 'มุ่งมั่นพัฒนาคุณภาพการศึกษา สร้างคนดี มีคุณธรรม จริยธรรม นำสังคม พร้อมก้าวสู่ประชาคมอาเซียน',
  ogDescription: 'มุ่งมั่นพัฒนาคุณภาพการศึกษา สร้างคนดี มีคุณธรรม จริยธรรม นำสังคม พร้อมก้าวสู่ประชาคมอาเซียน',
  ogImage: 'https://rpk41.vercel.app/images/banners/banner-1.png', // Fallback image
  twitterCard: 'summary_large_image',
})
</script>
