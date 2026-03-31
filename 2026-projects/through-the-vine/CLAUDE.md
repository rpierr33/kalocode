# Through the Vine — Project Directives

## NON-NEGOTIABLE DIRECTIVES
- This is a REAL business website for "Through the Vine," an upscale wine bar & brunch spot in Flagler Village, Fort Lauderdale, FL.
- The finished product MUST be fully functional and aesthetically stunning. NO generic AI-built UI. Every pixel must feel hand-crafted by a senior designer.
- All design, frontend, backend, UI, and CRM decisions must reflect 20+ years of domain expertise in hospitality/restaurant web design.

## Business Details
- **Name:** Through the Vine
- **Type:** Wine Bar & Brunch Restaurant
- **Location:** 444 NE 7th Street, Unit #1A, Fort Lauderdale, FL 33304 (Flagler Village)
- **Tagline:** "Hidden Wine Bar in Flagler Village"
- **Instagram:** @throughthevineftl
- **Happy Hour:** Wednesday–Friday, 4PM–6PM ($6 Beers, $9 Wine, $10 Small Plates)
- **Pool Service:** Partnered for food & drink service by the pool at a luxury residential complex
- **Vibe:** Upscale but approachable. Dark green velvet banquettes, concrete tables, moody lighting, neon signage, colorful wall art. European craft beer focus (Chimay, Duvel, Delirium Tremens, Lindemans, Stella Artois).

## Asset Directory
All assets are sourced from: `/Users/ralphpierre/throughthevineftl/`

### Logos
- `logo-trans.pdf.png` — **PRIMARY LOGO.** Must be used in navbar and footer. Wine bottle + glass in circle with "THROUGH THE VINE" text. Warm brown/cream palette.
- `logo2.jpg` — Secondary logo (white background variant). Can be used in other places on the site but NOT as the primary nav/footer logo.

### Videos
- `intro-vid.mp4` — Hero/intro video (venue atmosphere)
- `walk-thru-busy.mp4` — Walkthrough of busy venue (nightlife energy)
- `foods.mp4` — Food showcase reel
- `by-the-pool.mp4` — Pool area service

### Image Catalog (all from Instagram @throughthevineftl)
**Food/Brunch:**
- 0001: French toast with berry compote, whipped cream, syrup
- 0002: Cheesecake with strawberry compote, whipped cream, lemon zest
- 0003: Spread of 4 dishes — brunch spread (cast iron skillet, french toast, croque madame)
- 0004: Blueberry pancakes with powdered sugar, butter, coffee, syrups
- 0006: Cast iron skillet dish with cornbread toast, topped with fresh salsa/greens
- 0009: Bruschetta on grilled bread with balsamic drizzle, microgreens
- 0010: Overhead brunch spread — pancakes, chicken, french toast, pastries
- 0011: Cast iron skillet egg dish with cornbread, salsa
- 0012: Red velvet cake/crepe stack with whipped cream, berry sauce
- 0014: Bruschetta (duplicate angle of 0009)
- 0015: Flatbread pizza — margherita style with fresh mozzarella, microgreens on wood board
- 0018: Grilled cheese sandwich with tomato bisque
- 0022: Flatbread pizza — loaded, meat/veggie on wood board
- 0023: Salad bowl with crispy topping, tomatoes, mixed greens, balsamic
- 0024: Hummus with grilled pita and cucumber slices
- 0025: Croque madame — toast with ham, poached egg, cream sauce, microgreens
- 0029: Brunch spread — croque madame with pancakes and tea tower
- 0032: Cuban sandwich on wood board with house chips
- 0033: Fried chicken with honeycomb, cornbread, honey butter, chives
- 0034: Hummus with pita and cucumbers (similar to 0024)
- 0035: Cuban sandwich with chips (similar angle to 0032)

**Drinks/Beer/Wine:**
- 0005: Lindemans Framboise — Belgian raspberry lambic with snifter glass
- 0013: Stella Artois — bottle with branded chalice
- 0019: Ken Wright Cellars Pinot Noir — wine bottle with glass, notebook
- 0020: Chimay Grande Réserve — blue label Trappist ale with goblet
- 0026: Delirium Tremens — Belgian strong ale with signature glass
- 0028: Duvel — Belgian strong blond with frosted tulip glass
- 0030: Table scene — wine glass, cocktail, menu, flowers

**Venue/Ambiance:**
- 0008: Pool area — luxury apartment complex with "Through the Vine" branding overlay
- 0016: Afternoon tea tower with pastries, flowers, moody interior
- 0021: Exterior at night — neon "THROUGH THE VINE" sign, blue/purple lighting, glass doors
- 0027: Exterior at night — neon sign through trees (artistic shot)
- 0030: Table setting with drinks, menu, flowers

**People/Staff:**
- 0007: Bartender/owner(?) at bar — St. Patrick's Day themed, holding cocktails
- 0031: Executive Chef — red beard, tattooed, branded maroon chef jacket, food display

**Promotional:**
- 0017: Happy Hour flyer — Wed-Fri 4PM-6PM, $6 beers, $9 wine, $10 small plates

## Image Quality Rule (NON-NEGOTIABLE)
- NEVER use a blurry, low-res, or portrait-phone-screenshot image in a prominent position (hero, banner, full-width background, poster).
- Before assigning an image to any large display area, verify it is HIGH RESOLUTION and landscape-oriented.
- If no suitable image exists in the asset library, use a solid dark gradient or CSS-only background — NEVER stretch or display a bad image.
- Known bad images in this project: `throughthevineftl_0021.jpg` (TikTok screenshot, blurry), `throughthevineftl_0027.jpg` (portrait, low-res through trees — acceptable as small card, NOT as hero/banner).

## Design Language (DO NOT DEVIATE)
- Dark, moody, luxurious — matches the actual venue's aesthetic
- Color palette derived from the logo and venue: deep browns, warm cream/champagne, gold accents, dark greens (from the velvet banquettes)
- Typography: elegant serif for headings, clean sans-serif for body
- Smooth, sophisticated animations — not flashy, not generic
- The website must FEEL like walking into the venue — intimate, upscale, inviting
- Mobile-first — most visitors will come from Instagram

## Tech Stack
- Next.js 15 (App Router)
- Tailwind CSS v4 (with !important overrides for CSS variable issues per global feedback)
- Prisma + PostgreSQL (raw PG, NOT Supabase)
- Framer Motion for animations
- Resend for email notifications (mock mode until RESEND_API_KEY provided)
- Mock mode for all backend features until credentials are provided

## Execution Rules (from build advisor — internalized as self-constraints)
1. **Complete files only.** Every file output must be the FULL file with its full path. Never truncate. Never summarize. Never write "rest of file here" or similar. Real, working code only.
2. **Session strategy for long scripts.** If the script is large, break execution into logical sessions:
   - Session 1: Schema, seed data, auth, all API routes
   - Session 2: All public-facing pages (home, menu, order flow, etc.)
   - Session 3: Admin dashboard + CRM
   Do NOT produce half-baked versions of everything. Fully complete each session's scope before moving on.
3. **Toast ordering URL.** Do NOT fabricate a Toast URL. Use a placeholder that the client must verify from their Toast dashboard. Flag this clearly.
4. **Photo-to-menu matching.** Use the image catalog already documented above to map real photos to the correct menu items in the seed file. Do not guess — use the visual review already completed.
5. **Email notifications.** Include Resend integration for admin email alerts on new orders and contact form submissions. RESEND_API_KEY goes in .env.example with a placeholder.
6. **Admin credentials.** The seed/default admin password MUST be flagged prominently in README and first-login flow. Client must change it immediately after first login.
7. **No context-limit excuses.** If hitting limits, stop at a clean boundary (end of a complete file/section), clearly state what's done and what remains, and continue in the next pass. Never leave a file half-written.
