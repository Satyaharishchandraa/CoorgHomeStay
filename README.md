# The Coorg Chimm's Camptime Homestay — Website

Static, dependency-free HTML/CSS/JS (no framework or build step — open `index.html` directly, or deploy the folder as-is to any static host).

## 1. Project structure

```
index.html                     Home
rooms.html                     The Entire Homestay (accommodation overview)
about.html                     About Us
gallery.html                   Gallery (filterable, real photography)
things-to-do.html              Things to Do in Coorg — 10 attractions, drive times, Maps links
10-best-places-to-visit.html   Quick-reference listicle version of the above
location.html                  Location, address, Google Maps embed
contact.html                   Contact / booking enquiry (entire-property, not per-room)
privacy-policy.html
terms.html
travel-guide.html              SEO guide + external resources section
best-time-to-visit.html        SEO guide
coffee-experience.html         SEO guide
how-to-reach.html              SEO guide
css/style.css                  Full design system (tokens, components)
js/main.js                     SITE_CONFIG (phone/WhatsApp/address — edit once here),
                                nav toggle, gallery filter, enquiry form -> WhatsApp handoff,
                                graceful fallback for any hotlinked image that fails to load
images/                        Real owner-supplied property photography (WebP)
robots.txt
sitemap.xml
IMAGE_HANDOFF.md               Where each property photo is used
ATTRACTION_IMAGE_CREDITS.md    Licenses for the Wikimedia Commons attraction photos
```

## 2. Accommodation model - read this first
The property is booked as **one private entire homestay**, not room-by-room: 3 bedrooms, 2 washrooms, 1 kitchen, 4-12 guests. Every page that mentions the stay (home, "rooms.html", contact, footer copy, JSON-LD) reflects this. There is a single "Enquire for Your Stay" / "Send Booking Enquiry" call to action - no per-room pricing or per-room booking anywhere on the site.

## 3. Design system
Deep forest green / roasted-coffee brown / warm beige / off-white, one muted clay accent. Display type is Fraunces (serif), body is Work Sans. Signature motif: a hand-weight "contour line" (topographic elevation line) used as the section divider, plus a mist-fade-in on the hero.

## 4. Images
Real property photography (owner-supplied) is in `images/` as optimized WebP, with descriptive filenames and accurate alt text - see `IMAGE_HANDOFF.md` for exactly where each one is used. The homepage hero and the "Entire Homestay" page's lead photo are not lazy-loaded and use `fetchpriority="high"`; everything below the fold uses `loading="lazy"`.

Attraction photos on the Things to Do / Explore Kodagu sections are hotlinked from Wikimedia Commons - see `ATTRACTION_IMAGE_CREDITS.md` for the license on each. **Before a production launch, download these locally, re-host them from `images/`, and keep the license notes** - this environment could not confirm every hotlinked URL resolves (no outbound network access here to test), so `js/main.js` includes an automatic fallback: any image that fails to load degrades to the site's existing dashed-placeholder style instead of a broken-image icon, but this should be treated as a safety net, not a substitute for verifying/self-hosting the files.

## 5. SEO implementation
- Semantic HTML5, one `<h1>` per page, logical H2/H3 hierarchy
- Unique `<title>` and meta description per page (14 pages)
- Canonical URL on every page
- Open Graph + Twitter Card metadata
- `robots.txt` + `sitemap.xml` (14 URLs, kept in sync)
- Breadcrumb navigation (visual + `BreadcrumbList` JSON-LD) on every subpage
- Internal linking between home, the homestay page, things-to-do, the 10-best-places quick guide, location, contact and the guide articles

## 6. Structured data (JSON-LD)
- **LodgingBusiness** (homepage): name, address, phone, verified amenities, `aggregateRating` (4.5 stars / 120+ Google reviews, shown as a current Google listing statistic), no invented coordinates, ratings, or prices
- **WebSite** (homepage)
- **BreadcrumbList** (every subpage)

## 7. Local SEO - NAP
Kept identical everywhere (footer of all 14 pages, contact page, location page, JSON-LD):

> The Coorg Chimm's Camptime Homestay
> Gaddehalla, Uluguli Village, Suntikoppa, Kodagu, Karnataka 571237, India
> +91 99726 26256

## 8. Google Maps
`location.html` embeds a keyless Google Maps iframe built from the verified address (`google.com/maps?q=...&output=embed`), and every "Get Directions" button links to the property's Google Maps share URL. No coordinates were invented.

## 9. Deployment
1. **Netlify / Vercel**: drag-and-drop the folder, or connect a Git repo - no build command needed.
2. **GitHub Pages**: push the folder and enable Pages on the main branch.
3. **Any shared hosting / cPanel**: upload via FTP into the public root.
4. Before launch, find-and-replace `https://www.coorgchimmscamptime.com/` with the real production domain across every canonical/OG/JSON-LD tag and in `sitemap.xml`.
5. Submit `sitemap.xml` in Google Search Console once live.

## 10. Still open (not blocking, but worth doing before/soon after launch)
- Download and self-host the Wikimedia attraction photos (see section 4)
- Real GPS coordinates, if you want them added to the schema `geo` field
- Genuine guest review quotes, if you'd like 2-3 featured on the homepage (only the real aggregate rating is shown today)
- Legal review of `privacy-policy.html` / `terms.html` - both use neutral, non-invented policy language today ("confirmed directly with the property") and are ready to publish as-is, but a professional pass is still recommended
- An Open Graph cover image at `images/og-cover.webp` is in place; swap it for a preferred hero-style shot if you'd like a different one for social previews
