# First Car — فرست كار

Luxury car rental & VIP chauffeur booking platform for Egypt. Bilingual (Arabic/English), WhatsApp-first booking flow, and admin dashboard.

## Stack

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** + Framer Motion
- **next-intl** (AR / EN, RTL)
- **Prisma** + PostgreSQL
- **bcryptjs** admin auth with signed session cookies

## Quick start

```bash
npm install
cp .env.example .env
npm run dev
```

Open [http://localhost:3000/ar](http://localhost:3000/ar)

### Without database

The site works out of the box with a static car catalog. Bookings are sent via WhatsApp; DB persistence is best-effort.

### With database

```bash
# Start PostgreSQL, set DATABASE_URL in .env
npm run db:push
npm run db:seed
npm run dev
```

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `SESSION_SECRET` | Production | Min 32 chars — signs admin session cookies |
| `DATABASE_URL` | Optional | PostgreSQL connection string |
| `ADMIN_EMAIL` | Optional | Admin login email (default: admin@firstcar.eg) |
| `ADMIN_PASSWORD_HASH` | Production | bcrypt hash — generate with `npm run admin:hash` |
| `ADMIN_PASSWORD` | Dev only | Plain password when hash not set (default: admin123) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Optional | WhatsApp number for booking links |

Generate admin password hash:

```bash
npm run admin:hash -- "your-secure-password"
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run db:push` | Sync Prisma schema to DB |
| `npm run db:seed` | Seed cars + admin user |
| `npm run db:studio` | Prisma Studio |
| `npm run admin:hash` | Generate `ADMIN_PASSWORD_HASH` |

## Routes

| Path | Description |
|------|-------------|
| `/ar`, `/en` | Homepage |
| `/ar/fleet` | Full car catalog with filters |
| `/ar/fleet/[id]` | Car details + booking form |
| `/ar/admin` | Admin login |
| `/ar/admin/dashboard` | Cars & bookings management |

## Security notes

- Admin sessions use **HMAC-signed cookies** (`SESSION_SECRET`)
- Passwords verified with **bcrypt** (DB user or env hash)
- Auth & booking APIs have **rate limiting**
- Set `ADMIN_PASSWORD_HASH` and `SESSION_SECRET` before production deploy
- Use HTTPS in production (`secure` cookie flag enabled automatically)

## Project structure

```
src/
  app/[locale]/     # Localized pages
  app/api/          # REST API routes
  components/       # UI components
  lib/              # Data, auth, utilities
  i18n/             # next-intl routing
prisma/             # Schema + seed
messages/           # AR / EN translations
```

## License

Private — First Car Egypt.
