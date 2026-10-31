# Mansi Krishn Shaddi

Build a premium, cinematic wedding e-invitation website for Krishn & Mansi's wedding. 

This should feel like a luxury digital keepsake — emotionally rich, elegant, and 

technically polished. Mobile-first (most guests will open this on WhatsApp via phone), 

but should look equally stunning on desktop.

## COUPLE & EVENT DETAILS

Couple: Krishn & Mansi

Ceremonies:

1. Haldi — 22 November, 11:00 AM

2. Matkor & Rasam — 23 November

3. Barat & Shaadi — 24 November, 8:00 AM

4. Reception — 26 November

## STRUCTURE & FLOW

1. LANDING / OPENING SCREEN

   - Full-bleed hero with a soft animated entrance (fade + gentle scale, not a jarring pop)

   - "Tap to Open" / "Begin Our Story" interaction — a wax-seal or ring motif that 

     opens/unfolds on tap, revealing the site (this should feel like unwrapping an 

     invitation, not just a button click)

   - Elegant monogram "K & M" as a recurring visual anchor throughout the site

   - Soft ambient background music toggle (mute/unmute icon, always visible, 

     autoplay muted by default per browser rules)

2. HERO / INTRO SECTION

   - Couple names in a premium serif/script pairing

   - A short romantic tagline (something like "Four days. One forever." — write 2-3 

     tagline options)

   - Subtle looping background animation (falling petals, soft light particles, or 

     a slow-pan couple photo — use a placeholder image with a clearly marked 

     {{COUPLE_PHOTO}} token so I can swap it)

3. OUR STORY (optional short section)

   - A brief editorial-style narrative block (placeholder text, 3-4 sentences) 

     with a timeline-style scroll reveal

4. SAVE THE DATE + LIVE COUNTDOWN

   - Large animated countdown timer (days/hours/minutes/seconds) counting down to 

     the Haldi ceremony (22 Nov, 11:00 AM) as the "story begins"

   - Each digit should have a smooth flip/slide animation on update, not just a 

     static number swap

   - "Add to Calendar" button (generates .ics for all 4 events)

5. CEREMONY TIMELINE (this is the centerpiece — make it the strongest section)

   - A vertical, scroll-triggered timeline (not a flat list) representing the 

     4-day celebration as a journey

   - Each ceremony gets its own full "chapter" card with:

     - Day number / date badge (Day 1, Day 2, Day 3, Day 5 — or actual dates)

     - Ceremony name in large type: Haldi / Matkor & Rasam / Barat & Shaadi / Reception

     - Time

     - A short poetic one-liner per ceremony (e.g., Haldi: "A morning washed in 

       gold and blessings")

     - A distinct color accent per ceremony (e.g., Haldi = turmeric yellow, 

       Matkor/Rasam = earthy terracotta, Barat/Shaadi = deep red & gold, 

       Reception = elegant navy & gold) — this creates visual rhythm as guests scroll

     - Placeholder venue field (token: {{VENUE_NAME}}, {{VENUE_ADDRESS}}) with a 

       "Get Directions" button linking to Google Maps

   - Scroll-linked progress indicator (a thread/vine/light trail that visually 

     "grows" as the user scrolls through the 4 days)

6. DRESS CODE / THEME PER EVENT (optional but elevates the site)

   - Small color-swatch chips per ceremony suggesting guest attire palette, 

     matching each ceremony's accent color

7. GALLERY / MOMENTS SECTION

   - Masonry or carousel photo gallery with placeholder images (clearly tokened 

     {{GALLERY_IMAGE_1}} etc.) and a tasteful hover/tap zoom

8. RSVP SECTION

   - Clean form: Name, Number of guests attending, Which ceremonies they'll attend 

     (checkboxes for all 4), optional message to the couple

   - Submit confirmation with a warm animated response (not just a generic toast)

9. VENUE / LOGISTICS

   - Map embeds or "Get Directions" CTAs per venue

   - Optional: accommodation/travel info block for out-of-town guests

10. CLOSING SECTION

    - Warm sign-off from the couple + families

    - Recurring "K & M" monogram

    - Subtle "Made with love" footer

## DESIGN DIRECTION

- Aesthetic: modern luxury Indian wedding — think editorial invitation meets premium 

  product landing page. Avoid generic "template" look — no default purple gradients, 

  no cliché heart icons, no stock clip-art motifs

- Typography: pair an elegant serif or calligraphic display font for names/headings 

  with a clean, highly legible sans-serif for body text

- Color system: warm ivory/cream base with gold accents as the connective thread, 

  and each ceremony introducing its own accent color within that palette (not 

  clashing — think a cohesive jewel-tone family: turmeric, terracotta, deep red/maroon, 

  navy)

- Motion: purposeful micro-interactions only — scroll-reveal fades/slides, subtle 

  parallax on hero images, smooth section transitions. Nothing gimmicky or slow to load

- Generous whitespace, confident large typography, no clutter

## TECHNICAL REQUIREMENTS

- Fully responsive, mobile-first (assume 80%+ traffic from WhatsApp-shared mobile links)

- Fast load — optimize images, lazy-load gallery/below-fold sections

- Smooth scroll behavior throughout

- Include proper meta tags (title, description, Open Graph image, Twitter card) so 

  the link preview looks premium when shared on WhatsApp — placeholder OG image token: 

  {{OG_IMAGE}}

- Use semantic HTML and accessible markup (proper heading hierarchy, alt text on images)

- All copy (names, venues, taglines) should be easy for me to find and edit — use 

  clear placeholder tokens where I've indicated

## WHAT TO AVOID

- No generic "wedding template" clip art or default heart/ring emoji-style icons

- No autoplay-loud music, no intrusive popups

- No cluttered, tiny "vendor logo wall" footer

- Don't make the RSVP form the visual focus — the ceremony timeline is the hero, 

  RSVP is a utility

Build this as a single cohesive scrolling experience with smooth section-to-section 

transitions, not disjointed pages.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://mansi-krishn-shaddi.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/f309a94b-3966-4a04-b17c-c5c2ec398f1c).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
