# Cinematic enhancement plan

## Existing architecture retained

- Static HTML pages in English and Kannada (`kn/`), with shared CSS and JavaScript.
- `js/main.js` remains the source of truth for phone, WhatsApp, map, mobile navigation, gallery filtering and the enquiry handoff.
- Existing images remain the visual fallback and are not replaced by generated media.

## Enhancement strategy

1. Load the cinematic layer only for the home page and gallery.
2. Keep the original hero image, CTA links and semantic content in the document at all times.
3. On capable desktop devices, dynamically load Three.js and render a small, procedural golden-hour scene over the hero photography.
4. On mobile, reduced-motion, unavailable-WebGL and low-capability devices, retain the optimized 2D hero with touch-friendly hotspots.
5. Use CSS perspective for the existing experience cards and gallery, so those pages retain meaningful content even when WebGL is unavailable.

## Deployment check

Before publishing, test the English and Kannada home, gallery and contact pages on a real Android and iPhone; verify the WhatsApp handoff, call link, language switcher, gallery filtering, keyboard Escape behaviour and browser fallback when JavaScript is disabled.
