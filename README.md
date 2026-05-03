# 🏛️ Tiles Gallery

> A premium tile showcase platform for discovering extraordinary ceramic, marble, terracotta, zellige, and artisan tiles from around the world.

## 🌐 Live URL

**[https://tiles-gallery.vercel.app](https://tiles-gallery.vercel.app)**

---

## 📖 Project Purpose

Tiles Gallery is a full-stack Next.js web application that serves as a curated tile discovery platform. Users can browse an extensive collection of premium tiles from global artisans, view detailed specifications, and manage their profiles — all within an elegantly designed, fully responsive interface.

---

## ✨ Key Features

- **Hero Banner** — "Discover Your Perfect Aesthetic" with animated tile mosaic background
- **Marquee** — Smooth scrolling ticker for new arrivals and featured collections
- **Featured Tiles** — Top 4 editor-picked tiles fetched from API
- **Gallery with Live Search** — Real-time filtering by name, material, or category
- **Tile Detail Page** — Large preview, specs, tags, creator info, and related tiles (private route)
- **Email/Password Auth** — Full registration and login with validation and toast feedback
- **Google OAuth** — One-click social login
- **My Profile Page** — Account info display with member since date
- **Update Profile** — Edit name and photo URL with live preview
- **Loading Skeletons** — Shimmer animations during data fetch
- **Custom 404 Page** — On-brand tile mosaic not-found page
- **Route Protection** — Middleware redirects unauthenticated users
- **Fully Responsive** — Mobile, tablet, and desktop optimised

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + DaisyUI |
| Authentication | BetterAuth |
| Database | MongoDB (via MongoDB Atlas) |
| Animations | Animate.css |
| Marquee | react-fast-marquee |
| Toasts | react-hot-toast |
| Hosting | Vercel |

---

## 📦 NPM Packages Used

| Package | Purpose |
|---|---|
| `better-auth` | Authentication with MongoDB adapter and Google OAuth |
| `mongoose` | MongoDB object modelling |
| `mongodb` | MongoDB Node.js driver (BetterAuth adapter) |
| `daisyui` | Tailwind CSS component library |
| `react-hot-toast` | Lightweight toast notification system |
| `react-fast-marquee` | Smooth CSS-powered scrolling marquee |
| `animate.css` | Cross-browser CSS animation library (Challenge requirement) |

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- MongoDB Atlas account
- Google OAuth credentials

### Installation

```bash
git clone https://github.com/your-username/tiles-gallery.git
cd tiles-gallery
npm install
cp .env.example .env.local
# Fill in your values
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🔐 Environment Variables

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tiles-gallery
BETTER_AUTH_SECRET=your-random-32-character-secret-key
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create project → Enable Google+ API
3. Credentials → Create OAuth 2.0 Client ID
4. Add redirect URI: `http://localhost:3000/api/auth/callback/google`
5. For production: `https://your-domain.vercel.app/api/auth/callback/google`

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx                  # Home page
│   ├── layout.tsx                # Root layout
│   ├── not-found.tsx             # Custom 404
│   ├── all-tiles/page.tsx        # Gallery + search
│   ├── tile/[id]/page.tsx        # Tile detail (private)
│   ├── login/page.tsx            # Login
│   ├── register/page.tsx         # Register
│   ├── my-profile/page.tsx       # Profile (private)
│   ├── my-profile/update/        # Update profile (private)
│   └── api/
│       ├── auth/[...all]/        # BetterAuth handler
│       └── tiles/                # Tiles API
├── components/
│   ├── layout/Navbar.tsx
│   ├── layout/Footer.tsx
│   └── tiles/TileCard.tsx
├── data/tiles.json               # 12 tile entries
├── lib/
│   ├── auth.ts                   # BetterAuth server config
│   ├── auth-client.ts            # Client hooks
│   └── tiles.ts                  # Data utilities
├── types/index.ts
└── middleware.ts                 # Route protection
```

---

## 🛣️ Route Permissions

| Route | Access |
|---|---|
| `/` | Public |
| `/all-tiles` | Public |
| `/login` | Public |
| `/register` | Public |
| `/tile/[id]` | **Private** |
| `/my-profile` | **Private** |
| `/my-profile/update` | **Private** |

---

## 🌍 Deployment on Vercel

```bash
npm install -g vercel
vercel --prod
```

Add all environment variables in **Vercel Dashboard → Settings → Environment Variables**. The included `vercel.json` ensures routes don't 404 on reload.

---

## 📊 Tile Data Format

```json
{
  "id": "tile_001",
  "title": "Ceramic Azure Blue",
  "description": "Premium ceramic tile with azure blue glaze...",
  "image": "https://images.unsplash.com/...",
  "category": "ceramic",
  "price": 45.99,
  "currency": "USD",
  "dimensions": "60x60 cm",
  "material": "Ceramic",
  "inStock": true,
  "tags": ["Minimalist", "Blue", "Modern", "Bathroom"],
  "creator": "Artisan Ceramics Co.",
  "style": "Contemporary Mediterranean"
}
```

---

## 🎨 Design

- **Colours**: Terracotta `#c2622d` · Brass `#b5a050` · Cream `#f5f0e8` · Charcoal `#2c2a27`
- **Fonts**: Cormorant Garamond (display) + Josefin Sans (body)
- **Animations**: Animate.css page entrances + custom hover micro-interactions

---

## 📝 License

MIT © 2025 Tiles Gallery
