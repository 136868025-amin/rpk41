# 🏫 Ratchaprachanukroh 41 Yala School Website

Official website for โรงเรียนราชประชานุเคราะห์ ๔๑ จังหวัดยะลา

## 🚀 Tech Stack

- **Frontend**: Nuxt 3 (Vue 3, TypeScript)
- **Styling**: Tailwind CSS (Blue & White theme)
- **Database**: MongoDB with Mongoose ODM
- **Server**: Nuxt Server API

## 📦 Installation

```bash
# Install dependencies
npm install

# Install MongoDB locally or use MongoDB Atlas
# Update .env with your MongoDB connection string
```

## 🔧 Configuration

1. Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

2. Update environment variables:

```env
MONGODB_URI=mongodb://localhost:27017/ratchaprachanukroh41
SEED_DB=true  # Set to true for first run to seed data
```

## 🌱 Database Setup

The project includes automatic database seeding with Thai school context data.

### Collections:

- **News**: ข่าวสารและกิจกรรม (News and Activities)
- **Personnel**: บุคลากร (Staff Directory)
- **Banners**: แบนเนอร์หน้าแรก (Homepage Slider)
- **SchoolConfig**: ข้อมูลโรงเรียน (School Information - Singleton)

### Seed Data:

Set `SEED_DB=true` in `.env` to automatically populate the database with sample data including:

- School configuration (Contact, Vision, Mission)
- 3 Homepage banners
- 5 News articles (Wai Kru Day, Sports Day, etc.)
- 9 Personnel members (Director, Teachers, Staff)

## 🏃 Development

```bash
# Start development server
npm run dev

# Server will be running at http://localhost:3000
```

## 📊 Database Schema

### News Schema

```typescript
{
  slug: string (unique)
  title: string
  coverImage: string
  content: string (HTML)
  category: 'academic' | 'activity' | 'general'
  gallery: string[]
  viewCount: number
  isPublished: boolean
  publishedAt?: Date
}
```

### Personnel Schema

```typescript
{
  name: string
  position: string
  photo: string
  department: 'administrators' | 'teachers' | 'support_staff'
  orderIndex: number
  email?: string
  phone?: string
}
```

### Banner Schema

```typescript
{
  imageUrl: string
  title: string
  subtitle?: string
  link?: string
  isActive: boolean
  orderIndex: number
}
```

### SchoolConfig Schema (Singleton)

```typescript
{
  schoolName: string
  contact: { phone, email, fax }
  location: { address, province, postalCode, mapUrl }
  vision: string
  mission: string
  history: string (HTML)
  directorMessage?: string
  socialMedia: { facebook, line, youtube, instagram }
}
```

## 🎨 Theme Colors

- **Primary**: Blue (#1E40AF) - Trust and Wisdom
- **Secondary**: White (#FFFFFF) - Purity
- **Accent**: Light Blue (#3B82F6)

## 📁 Project Structure

```
rpg/
├── server/
│   ├── models/
│   │   ├── news.schema.ts
│   │   ├── personnel.schema.ts
│   │   ├── banner.schema.ts
│   │   └── schoolConfig.schema.ts
│   └── plugins/
│       ├── mongoose.ts
│       └── seed.ts
├── pages/          # Frontend pages (to be created)
├── components/     # Vue components (to be created)
└── src/
    └── input.css   # Tailwind CSS
```

## 🔜 Next Steps

**Phase 2**: Backend API Development

- Create API routes for CRUD operations
- Add authentication & authorization

**Phase 3**: Frontend Pages

- Home page with slider and latest news
- About page
- News/Activities listing and detail pages
- Personnel directory
- Contact page

**Phase 4**: Admin Dashboard

- Admin authentication
- Content management system
- Image upload functionality

**Phase 5**: UI/UX Polish

- Responsive design refinement
- Animations and transitions
- SEO optimization

## 📝 License

© 2024 Ratchaprachanukroh 41 School, Yala
