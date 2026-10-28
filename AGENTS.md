<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

The "Four chapters of joy" ceremony timeline lives in `src/components/CeremonyTimeline.tsx`, which also exports the `ceremonies` data used by the RSVP checkboxes in `WeddingInvitation.tsx` — edit event details (dates, venues, map links, dress palette) in that file only. Timeline animation CSS lives in `src/styles.css` under "Cinematic ceremony chapters"; animations are CSS + IntersectionObserver by design (no Framer Motion dependency). Entrance auto-opens 1.5s after load; music must start inside the user's tap handler when driven by a click.
