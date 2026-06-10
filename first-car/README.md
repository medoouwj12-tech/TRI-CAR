# فرست كار | First Car

A premium luxury car rental & VIP trip booking platform.

## Tech stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** + custom luxury gold/black theme
- **Framer Motion** for cinematic animations
- **next-themes** for dark/light mode
- **next-intl** for EN / AR with full RTL support
- **Prisma** + **PostgreSQL** for the admin fleet
- **Shadcn-style** UI primitives built on Radix

## Brand

- **Name:** فرست كار (First Car)
- **Palette:** Deep Black `#050505` + Rich Gold `#D4AF37` / `#F1D989`
- **Vibe:** Luxury · VIP · Prestige · Speed

## Quick start

```bash
npm install
cp .env.example .env
# Edit DATABASE_URL
npx prisma generate
npx prisma db push    # create tables
npm run dev
```

Visit:

- `http://localhost:3000` → defaults to `/ar` (RTL)
- `http://localhost:3000/en` → English (LTR)

## Project structure

```
src/
  app/
    [locale]/        # locale-scoped routes (en | ar)
      layout.tsx     # html lang/dir, fonts, providers
      page.tsx       # landing page (Hero + Fleet teaser)
    page.tsx         # root redirect to /ar
    globals.css      # tokens, gold utilities, scrollbar
  components/        # Logo, Navbar, Footer, Hero, ThemeToggle, ...
  i18n/              # routing + request config
  lib/               # utils, prisma client
messages/
  ar.json, en.json
prisma/
  schema.prisma
middleware.ts        # next-intl locale routing
```

## What's built in this initial module

- [x] Next.js project with Tailwind + Framer Motion + next-themes
- [x] next-intl (EN/AR) with auto RTL/LTR
- [x] Rich-Gold inline SVG logo (فرست كار / First Car)
- [x] Navbar: Logo, Dark/Light toggle, AR/EN toggle, "احجز الآن" CTA
- [x] Footer
- [x] Cinematic Hero with parallax, stats, gold/black search form
- [x] `prisma/schema.prisma` — User, Car, BookingRequest

## Next (awaiting your approval)

- [ ] Fleet grid + filters
- [ ] Car details page + sticky WhatsApp CTA
- [ ] Multi-step booking form → WhatsApp deep link
- [ ] Admin dashboard (add/edit/delete cars, view requests)
- [ ] API routes
