import { News } from '../models/news.schema'
import { Personnel } from '../models/personnel.schema'
import { Banner } from '../models/banner.schema'
import { SchoolConfig } from '../models/schoolConfig.schema'

/**
 * Data Seeding Script for Ratchaprachanukroh 41 Yala School
 * Populates the database with initial Thai school context data
 * 
 * Run manually via: node --loader ts-node/esm server/scripts/seed.ts
 * Or auto-run on first server start (optional)
 */
export default defineNitroPlugin(async () => {
  const config = useRuntimeConfig()
  
  // Only seed in development mode and if SEED_DB is true
  if (config.public.seedDb !== 'true') {
    return
  }

  console.log('🌱 Starting database seeding...')

  try {
    // Clear existing data (optional - comment out to preserve data)
    await Promise.all([
      News.deleteMany({}),
      Personnel.deleteMany({}),
      Banner.deleteMany({}),
      SchoolConfig.deleteMany({}),
    ])

    // 1. Seed School Config (Singleton)
    const schoolConfig = await SchoolConfig.create({
      schoolName: 'โรงเรียนราชประชานุเคราะห์ ๔๑',
      schoolNameEn: 'Ratchaprachanukroh 41 School',
      contact: {
        phone: '073-212345',
        email: 'info@rpc41.ac.th',
        fax: '073-212346',
      },
      location: {
        address: '123 ถนนสิโรรส ตำบลสะเตง อำเภอเมือง',
        province: 'ยะลา',
        postalCode: '95000',
        mapUrl: 'https://www.google.com/maps/embed?pb=...',
      },
      vision: 'มุ่งมั่นพัฒนาคุณภาพการศึกษา สร้างคนดี มีคุณธรรม จริยธรรม นำสังคม พร้อมก้าวสู่ประชาคมอาเซียน',
      mission: 'จัดการศึกษาที่มีคุณภาพ เน้นผู้เรียนเป็นสำคัญ ส่งเสริมความเป็นเลิศทางวิชาการและคุณธรรม',
      history: '<h2>ประวัติโรงเรียน</h2><p>โรงเรียนราชประชานุเคราะห์ ๔๑ ตั้งอยุ่ในจังหวัดยะลา ก่อตั้งขึ้นเมื่อปี พ.ศ. 2505 เพื่อให้การศึกษาแก่เยาวชนในพื้นที่จังหวัดชายแดนภาคใต้...</p>',
      directorMessage: 'ยินดีต้อนรับทุกท่านสู่เว็บไซต์โรงเรียนราชประชานุเคราะห์ ๔๑ จังหวัดยะลา โรงเรียนของเรามุ่งมั่นพัฒนาคุณภาพการศึกษาอย่างต่อเนื่อง...',
      socialMedia: {
        facebook: 'https://facebook.com/rpc41yala',
        line: '@rpc41',
        youtube: 'https://youtube.com/@rpc41',
      },
    })

    // 2. Seed Banners
    const banners = await Banner.insertMany([
      {
        imageUrl: '/images/banners/banner-1.png',
        title: 'ยินดีต้อนรับสู่ โรงเรียนราชประชานุเคราะห์ ๔๑',
        subtitle: 'สถาบันการศึกษาคุณภาพแห่งจังหวัดยะลา',
        isActive: true,
        orderIndex: 1,
      },
      {
        imageUrl: '/images/banners/banner-2.png',
        title: 'เปิดรับสมัครนักเรียนใหม่ ปีการศึกษา 2568',
        subtitle: 'รับสมัครตั้งแต่วันนี้ - 31 มีนาคม 2568',
        link: '/news/admission-2568',
        isActive: true,
        orderIndex: 2,
      },
      {
        imageUrl: '/images/banners/banner-3.png',
        title: 'โครงการพัฒนาทักษะด้านเทคโนโลยี',
        subtitle: 'เพื่ออนาคตที่สดใส',
        isActive: true,
        orderIndex: 3,
      },
    ])

    // 3. Seed News/Activities
    const news = await News.insertMany([
      {
        slug: 'wai-kru-day-2024',
        title: 'พิธีไหว้ครู ประจำปีการศึกษา 2567',
        coverImage: '/images/news/wai-kru-2024.png',
        content: '<p>โรงเรียนราชประชานุเคราะห์ ๔๑ จัดพิธีไหว้ครู ประจำปีการศึกษา 2567 ขึ้นในวันพฤหัสบดีที่ 15 มิถุนายน 2567 เพื่อให้นักเรียนได้แสดงความกตัญญกตเวทีต่อครูอาจารย์...</p>',
        category: 'activity',
        gallery: [
          '/images/gallery/wai-kru-1.png',
          '/images/gallery/wai-kru-2.png',
          '/images/gallery/wai-kru-3.png',
        ],
        isPublished: true,
        publishedAt: new Date('2024-06-16'),
        viewCount: 245,
      },
      {
        slug: 'sports-day-2024',
        title: 'กีฬาสีภายใน ประจำปี 2567',
        coverImage: '/images/news/sports-day-2024.png',
        content: '<p>โรงเรียนจัดงานกีฬาสีภายในประจำปี 2567 ระหว่างวันที่ 20-22 ธันวาคม 2567 นักเรียนแบ่งออกเป็น 4 สีคือ แดง เหลือง เขียว และน้ำเงิน...</p>',
        category: 'activity',
        gallery: [
          '/images/gallery/sports-1.png',
          '/images/gallery/sports-2.png',
        ],
        isPublished: true,
        publishedAt: new Date('2024-12-23'),
        viewCount: 512,
      },
      {
        slug: 'academic-excellence-award',
        title: 'นักเรียนได้รับรางวัลระดับประเทศ',
        coverImage: '/images/news/award.png',
        content: '<p>ด.ญ.สมหมาย ใจดี นักเรียนชั้น ม.6 ได้รับรางวัลชนะเลิศการประกวดโครงงานวิทยาศาสตร์ระดับประเทศ...</p>',
        category: 'academic',
        gallery: [],
        isPublished: true,
        publishedAt: new Date('2024-11-15'),
        viewCount: 386,
      },
      {
        slug: 'new-building-announcement',
        title: 'แจ้งการก่อสร้างอาคารเรียนใหม่',
        coverImage: '/images/news/building.png',
        content: '<p>ทางโรงเรียนขอแจ้งให้ทราบว่า จะมีการก่อสร้างอาคารเรียนใหม่ 4 ชั้น เริ่มตั้งแต่เดือนมกราคม 2568...</p>',
        category: 'general',
        gallery: [],
        isPublished: true,
        publishedAt: new Date('2024-12-01'),
        viewCount: 189,
      },
      {
        slug: 'scholarship-program-2025',
        title: 'ทุนการศึกษาสำหรับนักเรียนยากจน ปี 2568',
        coverImage: '/images/news/scholarship.png',
        content: '<p>มูลนิธิราชประชานุเคราะห์เปิดรับสมัครทุนการศึกษาสำหรับนักเรียนที่มีผลการเรียนดีแต่ขาดแคลนทุนทรัพย์...</p>',
        category: 'general',
        gallery: [],
        isPublished: false,  // Draft
        viewCount: 0,
      },
    ])

    // 4. Seed Personnel
    const personnel = await Personnel.insertMany([
      {
        name: 'นายสมชาย ใจดี',
        position: 'ผู้อำนวยการโรงเรียน',
        photo: '/images/staff/staff-1.jpg',
        department: 'administrators',
        orderIndex: 1,
        email: 'director@rpc41.ac.th',
        phone: '073-212345 ต่อ 101',
      },
      {
        name: 'นางสมหญิง รักเรียน',
        position: 'รองผู้อำนวยการฝ่ายวิชาการ',
        photo: '/images/staff/staff-2.jpg',
        department: 'administrators',
        orderIndex: 2,
        email: 'academic@rpc41.ac.th',
        phone: '073-212345 ต่อ 102',
      },
      {
        name: 'นายประสิทธิ์ สอนดี',
        position: 'รองผู้อำนวยการฝ่ายบริหาร',
        photo: '/images/staff/staff-3.jpg',
        department: 'administrators',
        orderIndex: 3,
      },
      {
        name: 'นายวิชัย สุขเจริญ',
        position: 'ครูสอนวิชาคณิตศาสตร์',
        photo: '/images/staff/staff-4.jpg',
        department: 'teachers',
        orderIndex: 1,
      },
      {
        name: 'นางสมจิตร ศรีสุข',
        position: 'ครูสอนวิชาภาษาไทย',
        photo: '/images/staff/staff-5.jpg',
        department: 'teachers',
        orderIndex: 2,
      },
      {
        name: 'นายธนากร เก่งเรียน',
        position: 'ครูสอนวิชาวิทยาศาสตร์',
        photo: '/images/staff/staff-6.jpg',
        department: 'teachers',
        orderIndex: 3,
      },
      {
        name: 'นางสาวพิมพ์ชนก สวยงาม',
        position: 'ครูสอนวิชาภาษาอังกฤษ',
        photo: '/images/staff/staff-7.jpg',
        department: 'teachers',
        orderIndex: 4,
      },
      {
        name: 'นายสมบูรณ์ ช่วยงาน',
        position: 'เจ้าหน้าที่ธุรการ',
        photo: '/images/staff/staff-8.jpg',
        department: 'support_staff',
        orderIndex: 1,
      },
      {
        name: 'นายสุรชัย รักษ์ดี',
        position: 'นักการภารโรง',
        photo: '/images/staff/staff-9.jpg',
        department: 'support_staff',
        orderIndex: 2,
      },
    ])

    console.log('✅ Seeding completed successfully!')
    console.log(`   - SchoolConfig: 1 document`)
    console.log(`   - Banners: ${banners.length} documents`)
    console.log(`   - News: ${news.length} documents`)
    console.log(`   - Personnel: ${personnel.length} documents`)

  } catch (error) {
    console.error('❌ Seeding error:', error)
  }
})
