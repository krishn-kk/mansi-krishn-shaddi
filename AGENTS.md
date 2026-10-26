# AGENTS.md — Krishn & Mansi Wedding Invitation

## Project purpose
This repository contains an interactive digital wedding invitation for **Krishn & Mansi**, originally built with Lovable. Preserve the existing site and improve it incrementally. The experience should feel like opening a luxurious, romantic, cinematic Indian Rajwada invitation—not a generic website.

## Before changing code
1. Inspect the repository structure, package scripts, dependencies, routing, styles, assets, and current UI implementation. Do not assume React, TypeScript, Tailwind, or Framer Motion until confirmed by the code.
2. Identify the existing entry screen, main invitation, countdown, **Four Chapters of Joy**, travel/stay, RSVP, music controls, and closing sections.
3. Preserve all existing wedding dates, times, venues, map links, contact details, working features, and copy unless an explicit task requests a change. Never invent event information.
4. Make focused, reviewable changes. Avoid unnecessary refactors, dependency additions, and broad redesigns.
5. Check responsiveness, accessibility, performance, and existing build/lint/test commands before completion. Report what was actually run and any limitations.

## Visual identity
- Deep wine/burgundy, warm champagne/ivory silk, muted antique gold, restrained warm brown.
- Elegant editorial serif typography; romantic, luxurious, readable, and uncluttered.
- Motifs: Rajwada palace arches, jasmine/mogra, red roses, marigolds where appropriate, brass diyas, warm candlelight, subtle gold ornamentation.
- Avoid generic SaaS cards, neon colors, oversaturated orange, heavy mandalas, cartoon emojis, excessive ornamentation, and busy backgrounds.
- Maintain ample negative space and contrast. Decorations must never cover text or controls.

## Existing experience to preserve
1. **Entry screen:** Deep wine Rajwada/palace gateway, floral/candlelight atmosphere, names **Krishn & Mansi**, central interactive **K & M** seal, and “Enter Our Celebration” / “Begin Our Forever” invitation.
2. **Opening:** On intentional guest interaction, gently reveal the champagne silk invitation with a tasteful golden transition (~1.5–2.5 seconds). Do not block interaction or trap users in an animation.
3. **Hero:** Ivory/champagne silk with wine-colored names, gold accents, jasmine, rose petals, antique trays, and existing wedding dates/copy.
4. **Save the Date:** Refined countdown with stable number widths, understated gold details, and responsive layout. Verify the actual countdown target in the code; do not assume it from display text.
5. **Four Chapters of Joy:** Existing event content and functional location links must remain intact.
6. **Travel & Stay, RSVP, closing:** Preserve visual continuity and existing correct information.

## Primary enhancement: Four Chapters of Joy
Keep the existing alternating desktop timeline layout; use a readable left-aligned timeline on narrow mobile screens. Add cinematic but restrained, one-time scroll-triggered reveals:

- **Haldi — “A Golden Beginning”:** Warm sunlight, a few softly falling marigold petals; optional subtitle “A little sunshine, a lot of love.”
- **Matkor & Rasam — “Roots, Rituals & Blessings”:** Delicate brass diyas, subtle terracotta accents, sequential warm glows; optional subtitle “Where traditions become treasured memories.”
- **Baraat & Shaadi — “The Royal Union”:** Most prominent chapter, restrained wine/gold detailing, faint palace arch motifs, drifting rose petals; optional subtitle “Two hearts. One forever.”
- **Reception — “A Night of Endless Memories”:** Champagne-gold bokeh, a few softly dispersing gold particles; optional subtitle “And so, our forever begins.”

Use a thin antique-gold central timeline with subtle progress illumination and softly glowing nodes. Animate transforms and opacity rather than layout. Keep particle counts small, effects non-blocking, and decorations behind content. Honor `prefers-reduced-motion` and provide a fully usable no-animation experience. Do not use emoji as visible decorative UI.

## WhatsApp RSVP — required behavior
The RSVP form collects:
- Guest name (required)
- Number of guests (required; positive integer)
- Celebrations attending (at least one): Haldi; Matkor & Rasam; Baraat & Shaadi; Reception
- Optional note

The primary button reads **Send RSVP on WhatsApp** and matches the invitation's burgundy/antique-gold design. Validate inputs with accessible inline messages. On the guest's button click, create a personalized message using current form state, encode it with `encodeURIComponent`, and navigate to the official click-to-chat URL:

`https://api.whatsapp.com/send/?phone=919583191615&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`

Suggested message:

```text
Hello Krishn & Mansi ❤️

Thank you for inviting us to celebrate your special days.

Name: [Guest Name]
Number of Guests: [Count]

We'll be joining you for:
• [Selected celebration]
• [Selected celebration]

A note for you:
[Optional note]

Looking forward to celebrating with you both! ✨
```

Omit the entire note section if blank. **Do not attempt to auto-send**: WhatsApp must open with the message prefilled so the guest can review and tap Send. Use a single reliable click handler and verify special characters, line breaks, mobile, and desktop behavior. Do not claim an RSVP was sent until the guest actually sends it in WhatsApp. Avoid introducing a backend just for this flow.

## Travel & Stay copy
When explicitly asked to revise this section, use:
- Heading: **For Your Journey**
- Subheading: **Travel & Stay**
- Detail: **Travel and stay arrangements are provided for Baraat guests only.**
- Location: **Celebration Point, Patna**
- Time: **7:00 PM**

Do not infer a date, map URL, hotel, or additional logistics. Preserve correct existing details unless the task specifically authorizes replacing them.

## Background music
The user identified this YouTube Short as an **audio reference**:
`https://youtube.com/shorts/_BduB3uQciw?si=PaEGimTeTownUMyK`

Do not scrape, download, or embed audio from YouTube without appropriate rights. Use a locally supplied, authorized audio asset if available. Start playback only after a user gesture, keep an accessible mute/unmute control, and handle browser autoplay restrictions and playback failures gracefully. Do not show an intrusive player.

## Other refinement opportunities
- Preserve the dramatic contrast of the burgundy entrance and champagne silk interior.
- Improve visual continuity of the Save the Date/countdown section without turning it into a dashboard.
- A section tentatively titled **“A few pages before forever”** may later become a tasteful memory gallery, but do not fabricate or add personal photos without user-provided assets and explicit instruction.

## Mobile, accessibility, and performance
- Mobile-first: names, dates, controls, RSVP fields, and venue links must not clip or overlap.
- Use semantic headings, labels, keyboard-operable buttons, visible focus states, readable contrast, and useful error messages.
- Prefer existing project animation utilities; use IntersectionObserver/CSS where sufficient. Avoid excessive particles and unnecessary dependencies.
- Use performant `transform`/`opacity` animations, respect reduced motion, and avoid layout shift.
- Keep external links safe and functional.

## Workflow for Codex tasks
1. Summarize the relevant existing implementation and proposed focused changes.
2. Implement only the requested scope, preserving existing wedding data and design.
3. Run available relevant checks and inspect the resulting diff.
4. Explain changed files, what was tested, anything requiring manual verification, and any deployment implications.
5. If uncertain about event data or visual assets, ask rather than guessing.

## Suggested first task
“Inspect this repository and enhance only the **Four Chapters of Joy** section according to AGENTS.md. Preserve all existing dates, times, venues, links, and other sections. Implement restrained ceremony-specific animations, a subtly illuminated timeline, mobile responsiveness, and reduced-motion support. Run available checks and summarize the diff.”
