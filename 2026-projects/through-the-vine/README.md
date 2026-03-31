# Through the Vine — Wine Bar & Brunch

A production-ready, full-stack website for Through the Vine Wine Bar, located at 444 NE 7th St, Unit 1A, Fort Lauderdale, FL 33304 (Flagler Village, inside EON Squared).

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Database:** PostgreSQL + Prisma ORM
- **Styling:** Tailwind CSS 3 + shadcn/ui (dark theme)
- **Auth:** NextAuth.js (credentials provider)
- **Animations:** Framer Motion
- **Fonts:** Cormorant Garamond (serif) + Inter (sans-serif)
- **Deployment:** Vercel

## Getting Started

### 1. Clone & Install

```bash
git clone <repo-url>
cd through-the-vine
npm install
```

### 2. Environment Variables

Copy the example env file and fill in your values:

```bash
cp .env.example .env
```

Required variables:
- `DATABASE_URL` — PostgreSQL connection string (e.g., from Neon, Railway, or local PG)
- `NEXTAUTH_SECRET` — Generate with `openssl rand -base64 32`
- `NEXTAUTH_URL` — `http://localhost:3000` for local, your Vercel URL for production

### 3. Database Setup

```bash
npx prisma db push    # Create tables
npm run db:seed       # Seed admin user + full menu
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Admin Dashboard

Access the admin portal at `/admin/login`.

### Default Credentials

| Field    | Value                        |
|----------|------------------------------|
| Email    | admin@throughthevine.com     |
| Password | TTV@dmin2025!                |

> **IMPORTANT:** Change this password immediately after first login.

### Admin Features

- **Dashboard:** KPI cards (today's orders, revenue, pending orders, new inquiries)
- **Orders:** View, accept, mark ready, complete, cancel, and refund orders
- **Reservations:** View and confirm/decline reservation requests
- **CRM:** View contact form inquiries, add notes, update status
- **Menu Management:** Coming soon
- **Settings:** Coming soon

## Pages

| Route             | Description                    |
|-------------------|--------------------------------|
| `/`               | Home — hero, about, events, menu preview, ordering, testimonials, contact |
| `/menu`           | Full menu with tabbed categories |
| `/order`          | Online ordering with cart       |
| `/reservations`   | Reservation request form        |
| `/admin/login`    | Admin login                     |
| `/admin`          | Admin dashboard overview        |
| `/admin/orders`   | Order management (auto-refreshes every 30s) |
| `/admin/reservations` | Reservation management      |
| `/admin/crm`      | Contact inquiry CRM             |

## Adding Food Photos

Food photos are mapped by filename. Current real photos from Instagram (@throughthevineftl) are already mapped to menu items.

To update or add new photos:
1. Place the image in `/public/images/`
2. Update the `imageUrl` field in the seed file (`prisma/seed.ts`) or directly in the database via Prisma Studio (`npm run db:studio`)

## Deploying to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard:
   - `DATABASE_URL`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` (set to your Vercel domain)
4. Deploy

The `postinstall` script runs `prisma generate` automatically during build.

After deploying, run the seed remotely or use Prisma Studio to verify data.

## TODOs

- [ ] Replace Toast ordering URL with actual client URL (currently placeholder)
- [ ] Replace OpenTable URL with actual client URL
- [ ] Add phone number and email when confirmed by client
- [ ] Update DoorDash / Uber Eats integration when available
- [ ] Implement Menu Management admin page
- [ ] Add Resend email notifications for new orders/inquiries
- [ ] Add full sides/add-ons ordering system
- [ ] Add social media links (TikTok, Facebook, Twitter)
