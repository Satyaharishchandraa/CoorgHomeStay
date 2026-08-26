# The Coorg Chimm's Camptime Homestay — Website

Static, dependency-free HTML/CSS/JS build (no framework/build step required — open `index.html` directly, or deploy the folder as-is to any static host).

## 1. Project structure

```
coorg-homestay/
├── index.html               Home
├── rooms.html                Rooms / Accommodation
├── about.html                About Us
├── gallery.html               Gallery (filterable masonry)
├── things-to-do.html          Things to Do in Coorg (attraction cards)
├── location.html               Location & directions
├── contact.html                Contact / booking enquiry form
├── privacy-policy.html
├── terms.html
├── travel-guide.html            SEO article: Coorg Travel Guide
├── best-time-to-visit.html       SEO article: seasonal guide
├── coffee-experience.html        SEO article: coffee plantations
├── how-to-reach.html             SEO article: road/rail/air
├── css/style.css                Full design system (tokens, components)
├── js/main.js                   SITE_CONFIG (phone/WhatsApp/address/map — edit once here),
│                                 nav toggle, gallery filter, enquiry form → WhatsApp handoff
├── images/favicon.svg            Placeholder mark (replace with real logo if you have one)
├── robots.txt
└── sitemap.xml
```
Build tooling (`src/`, `partials/`, `build.py`) that assembled these pages was intentionally left out of this delivered folder — the HTML files here are the full, final, standalone output; you don't need Python or Node to use or host them.

## 2. Design system
Deep forest green / roasted-coffee brown / warm beige / off-white, one muted clay accent — no gradients, no stock-photo look. Display type is Fraunces (serif), body is Work Sans. Signature motif: a hand-weight "contour line" (topographic elevation line) used as the section divider instead of plain hairlines, plus a mist-fade-in on the hero — a nod to Coorg's hill elevation and fog rather than a generic template flourish.

## 3. Image placeholders
No real property photos were available, so every image slot is a clearly labelled dashed-border placeholder (`<div class="img-ph">…[ADD PHOTO: …]…</div>`) instead of a stock photo. Replace each with a real `<img>` tag: descriptive filename (e.g. `coorg-homestay-nature-view.webp`), meaningful alt text, explicit `width`/`height`, `loading="lazy"` (skip lazy-loading on the hero image only), and WebP/AVIF format where possible.

## 4. SEO implementation
- Semantic HTML5, one `<h1>` per page, logical H2/H3 hierarchy
- Unique `<title>` and meta description per page
- Canonical URL on every page
- Open Graph + Twitter Card metadata on every page
- `robots.txt` + `sitemap.xml` (13 URLs)
- Breadcrumb navigation (visual + `BreadcrumbList` JSON-LD) on every subpage
- Internal linking between home, rooms, things-to-do, location, contact and the four guide articles

## 5. Structured data (JSON-LD)
- **LodgingBusiness** (homepage): name, address, phone, geo (placeholder), check-in/out, amenities, `aggregateRating` (4.5★ / 120+ reviews, matching the verified Google figures), `sameAs` placeholders for social profiles
- **WebSite** (homepage)
- **BreadcrumbList** (every subpage)
- No `Review`/`FAQPage` structured data was added sitewide by default — see the SEO checklist below before enabling it.

## 6. Local SEO strategy
NAP (Name, Address, Phone) is identical and consistent across the site footer, the Contact page, the Location page and the JSON-LD. `hasMap` in the schema and every "Get Directions" button point to the Google Maps link you provided. Content naturally references Uluguli, Suntikoppa, Kodagu and Madikeri without stuffing keywords into any single page.

## 7. Deployment instructions
This is a static site — any static host works:
1. **Netlify / Vercel**: drag-and-drop the folder (or connect a Git repo) — no build command needed.
2. **GitHub Pages**: push the folder to a repo and enable Pages on the main branch.
3. **Any shared hosting / cPanel**: upload the contents via FTP into the public root.
4. Update `https://www.coorgchimmscamptime.com/` in every canonical/OG/JSON-LD tag and in `sitemap.xml` to your real final domain before launch (find-and-replace across the folder).
5. Submit `sitemap.xml` in Google Search Console once the domain is live.

## 8. Information still needed from you
- [ ] Real photography for every `[ADD PHOTO: …]` placeholder
- [ ] Confirmed room names, descriptions, occupancy, amenities and prices (or a clear "rates on enquiry" policy)
- [ ] Exact GPS coordinates (latitude/longitude) for the schema `geo` field
- [ ] A short, real "About" story in the owner's words
- [ ] 3–5 genuine Google reviews you'd like featured (name, rating, text) — do not publish placeholder reviews as real
- [ ] Verified distances/travel times from the homestay to Madikeri, Suntikoppa and each attraction
- [ ] Social media links (Instagram/Facebook), if any, for the `sameAs` schema field
- [ ] A finalised cancellation policy and house rules for the Terms page, and a data-handling confirmation for the Privacy Policy (both are legal placeholders — have a professional review them before launch)
- [ ] An Open Graph cover image (1200×630px) at `images/og-cover.jpg`
- [ ] Confirmation of where booking-enquiry form submissions should ultimately go (currently the form hands off to WhatsApp with the enquiry pre-filled; wire it to email/CRM if preferred)

## 9. Pre-launch SEO checklist
- [ ] Replace all `[ADD …]` placeholders sitewide (`grep -r "\[ADD" .` / `grep -r "\[CONFIRM" .` to find them all)
- [ ] Add real photos with descriptive filenames + alt text; compress to WebP/AVIF
- [ ] Add the Google Maps `<iframe>` embed on the Location page (and homepage location section)
- [ ] Add real coordinates to the LodgingBusiness schema
- [ ] Validate all JSON-LD in Google's Rich Results Test before launch
- [ ] Only add `FAQPage` structured data if you confirm it still meets Google's current eligibility rules at launch time (these change periodically)
- [ ] Only add `Review`/rating markup once genuine reviews are in place, per Google's guidelines
- [ ] Set the real production domain everywhere (canonicals, OG, sitemap, robots.txt)
- [ ] Run Lighthouse (Performance/Accessibility/Best Practices/SEO) after adding real images, since placeholders are lightweight CSS blocks that won't reflect real image weight
- [ ] Verify color contrast once real photography sits behind any text overlays
- [ ] Submit sitemap to Google Search Console; verify property ownership

## 10. Self-audit — known gaps in this build
- **Images**: every visual is a CSS placeholder, by design (no real photos or stock photography were used, per the brief) — this is the single biggest thing to finish before launch.
- **Reviews**: homepage/FAQ mention the real 4.5★/120+ rating, but individual reviews are placeholders pending your input.
- **Map embed**: the Location and homepage map sections need the actual `<iframe>` embed code from Google Maps.
- **Coordinates**: schema `geo` fields are placeholders — real lat/long will sharpen local map-pack relevance.
- **Legal pages**: Privacy Policy and Terms are structurally complete but explicitly marked as placeholders pending legal review.
- **No broken/orphan pages**: every page is reachable from the header/footer nav and internally linked at least once; sitemap and robots.txt are in sync with the 13 shipped pages.
- **Performance**: with placeholder CSS blocks instead of images, the site is currently very light; real-world Lighthouse scores should be re-checked once photography is added, particularly LCP.
