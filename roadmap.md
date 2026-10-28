# Roadmap

- [x] Cover seal: center "K & M" in the red circle; nudge "Enter our celebration" ~5px lower (fixed oval-size class conflict + absolute centering)
- [x] Replace WhatsApp RSVP flow per pasted brief: same-tab redirect (window.location.href) to api.whatsapp.com with type=phone_number&app_absent=0, WhatsApp icon button with wine/gold styling, single handler, inline validation
- [x] Verify end-to-end with Playwright: seal alignment, validation, generated WhatsApp URL (phone 919583191615, encoded message, bullets, emoji)
- [ ] Cinematic "Four chapters of joy" rework (brief: I_want_to_transform_the_existing_Four_Chapters_pasted.md): glowing gold scroll line, per-chapter reveal + particles (marigolds, diyas, roses, sparkles), Baraat gold frame + arches, chapter subtitles — keep all event data untouched
- [ ] Opening + music update (brief: Update_the_opening_behavior_and_background_music_pasted.md): auto-open 1.5s, music starts from tap, "Tap to Play Music ♪" prompt when autoplay blocked, persistent single player, play/pause/resume
- [ ] Playwright verify: timeline animations on desktop + mobile, auto-open, music prompt behavior, build OK
