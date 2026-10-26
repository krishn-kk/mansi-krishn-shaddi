import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { CalendarPlus, Check, MapPin, Music, VolumeX } from "lucide-react";
import heroImage from "@/assets/wedding-hero.jpg";
import coverImage from "@/assets/wedding-gate-cinematic-v2.webp";
import coverImageMobile from "@/assets/wedding-gate-mobile-v1.webp";
import storyPalace from "@/assets/story-palace.webp";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CeremonyTimeline, ceremonies } from "@/components/CeremonyTimeline";

const WHATSAPP_NUMBER = "919583191615";
const MUSIC_VIDEO_ID = "_BduB3uQciw";

const target = new Date("2026-11-22T11:00:00+05:30").getTime();
const pad = (value: number) => String(Math.max(0, value)).padStart(2, "0");

function useCountdown() {
  const calculate = () => {
    const distance = Math.max(0, target - Date.now());
    return { days: Math.floor(distance / 86400000), hours: Math.floor(distance / 3600000) % 24, minutes: Math.floor(distance / 60000) % 60, seconds: Math.floor(distance / 1000) % 60 };
  };
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    setCountdown(calculate());
    const id = window.setInterval(() => setCountdown(calculate()), 1000);
    return () => window.clearInterval(id);
  }, []);
  return countdown;
}

function Monogram({ small = false }: { small?: boolean }) {
  return <div aria-label="Krishn and Mansi" className={`${small ? "h-12 w-12 text-lg" : "h-20 w-20 text-2xl"} grid place-items-center rounded-full border border-gold/70 font-display italic text-gold`}><span>K <span className="text-[.6em]">&</span> M</span></div>;
}

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" /></svg>;
}

function Countdown() {
  const count = useCountdown();
  return <div className="mx-auto grid max-w-2xl grid-cols-4 border-y border-gold/35 py-3 md:py-4">
    {Object.entries(count).map(([label, value]) => <div className="border-r border-gold/30 px-1 text-center last:border-r-0" key={label}>
      <span key={value} className="digit-change block font-display text-3xl text-maroon tabular-nums sm:text-4xl md:text-5xl">{label === "days" ? value : pad(value)}</span>
      <span className="mt-0.5 block font-display text-[9px] capitalize text-muted-foreground sm:text-xs">{label}</span>
    </div>)}
  </div>;
}

type YTPlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  mute: () => void;
  unMute: () => void;
  setVolume: (volume: number) => void;
  destroy: () => void;
};

let youTubeApiPromise: Promise<any> | null = null;
function loadYouTubeApi() {
  if (youTubeApiPromise) return youTubeApiPromise;
  youTubeApiPromise = new Promise((resolve) => {
    const existing = (window as any).YT;
    if (existing?.Player) { resolve(existing); return; }
    const previous = (window as any).onYouTubeIframeAPIReady;
    (window as any).onYouTubeIframeAPIReady = () => { previous?.(); resolve((window as any).YT); };
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    document.head.appendChild(script);
  });
  return youTubeApiPromise;
}

function MusicToggle() {
  const [playing, setPlaying] = useState(false);
  const hostRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const audioRef = useRef<{ context: AudioContext; gain: GainNode } | null>(null);

  const startFallbackAudio = () => {
    const AudioCtx = window.AudioContext ?? window.webkitAudioContext;
    if (!AudioCtx) return null;
    const context = new AudioCtx();
    const gain = context.createGain();
    gain.gain.value = 0.025;
    gain.connect(context.destination);
    [196, 246.94, 293.66].forEach((frequency, index) => {
      const oscillator = context.createOscillator();
      oscillator.type = "sine"; oscillator.frequency.value = frequency;
      const voice = context.createGain(); voice.gain.value = 0.34 / (index + 1);
      oscillator.connect(voice).connect(gain); oscillator.start();
    });
    return { context, gain };
  };

  const start = () => {
    if (playerRef.current || audioRef.current) return;
    void loadYouTubeApi().then((YT) => {
      if (playerRef.current || audioRef.current) return;
      if (!YT?.Player || !hostRef.current) { audioRef.current = startFallbackAudio(); setPlaying(true); return; }
      playerRef.current = new YT.Player(hostRef.current, {
        videoId: MUSIC_VIDEO_ID,
        playerVars: { autoplay: 1, controls: 0, disablekb: 1, loop: 1, playlist: MUSIC_VIDEO_ID, playsinline: 1, iv_load_policy: 3, modestbranding: 1 },
        events: {
          onReady: (event: { target: YTPlayer }) => {
            event.target.unMute();
            event.target.setVolume(45);
            event.target.playVideo();
            setPlaying(true);
          },
          onError: () => { audioRef.current = startFallbackAudio(); setPlaying(true); },
        },
      });
    });
  };

  const toggle = () => {
    if (!playerRef.current && !audioRef.current) { start(); return; }
    const next = !playing;
    if (playerRef.current) {
      if (next) { playerRef.current.unMute(); playerRef.current.playVideo(); }
      else playerRef.current.mute();
    } else if (audioRef.current) {
      audioRef.current.gain.gain.setTargetAtTime(next ? 0.025 : 0, audioRef.current.context.currentTime, 0.2);
    }
    setPlaying(next);
  };

  const startRef = useRef(start);
  startRef.current = start;
  useEffect(() => {
    const beginMusic = () => startRef.current();
    window.addEventListener("wedding-music-start", beginMusic);
    return () => window.removeEventListener("wedding-music-start", beginMusic);
  }, []);

  useEffect(() => () => { try { playerRef.current?.destroy(); } catch { /* player already gone */ } void audioRef.current?.context.close(); }, []);

  return <>
    <div ref={hostRef} aria-hidden="true" className="pointer-events-none fixed bottom-0 left-0 h-px w-px overflow-hidden opacity-0" />
    <Button type="button" variant="outline" size="icon" onClick={toggle} aria-label={playing ? "Mute the music" : "Play the music"} title={playing ? "Mute music" : "Play music"} className="fixed right-4 top-4 z-50 rounded-full border-gold/50 bg-background/80 backdrop-blur-md">{playing ? <Music /> : <VolumeX />}</Button>
  </>;
}

function downloadCalendar() {
  const entries: [string, string, string, string][] = [
    ["20261122T053000Z", "20261122T073000Z", "Haldi — Krishn & Mansi", "Home, Workshop colony"],
    ["20261123T033000Z", "20261123T053000Z", "Matkor & Rasam — Krishn & Mansi", "Home, Workshop colony"],
    ["20261124T023000Z", "20261124T073000Z", "Barat & Shaadi — Krishn & Mansi", "Celebration Point Community Hall, Patna, Bihar"],
    ["20261126T133000Z", "20261126T153000Z", "Reception — Krishn & Mansi", "Home, Workshop colony"],
  ];
  const escapeIcs = (value: string) => value.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
  const events = entries.map(([start, end, summary, location]) => `BEGIN:VEVENT\nDTSTART:${start}\nDTEND:${end}\nSUMMARY:${escapeIcs(summary)}\nLOCATION:${escapeIcs(location)}\nEND:VEVENT`).join("\n");
  const file = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Krishn and Mansi//Wedding//EN\n${events}\nEND:VCALENDAR`;
  const url = URL.createObjectURL(new Blob([file], { type: "text/calendar" }));
  const link = document.createElement("a"); link.href = url; link.download = "krishn-mansi-wedding.ics"; link.click(); URL.revokeObjectURL(url);
}

export function WeddingInvitation() {
  const [stage, setStage] = useState<"closed" | "opening" | "open">("closed");
  const [submitted, setSubmitted] = useState(false);
  const petals = useMemo(() => Array.from({ length: 10 }, (_, index) => ({ left: `${7 + index * 9}%`, delay: `${(index * 1.7) % 8}s`, duration: `${9 + (index % 4) * 2}s` })), []);

  const [rsvpError, setRsvpError] = useState<string | null>(null);

  useEffect(() => {
    const lock = (el: HTMLElement) => { el.style.overflowY = "clip"; el.style.overflowX = "clip"; };
    const unlock = (el: HTMLElement) => { el.style.overflowY = ""; el.style.overflowX = ""; };
    if (stage === "open") { unlock(document.documentElement); unlock(document.body); return; }
    lock(document.documentElement); lock(document.body);
    return () => { unlock(document.documentElement); unlock(document.body); };
  }, [stage]);

  const openInvitation = () => {
    if (stage !== "closed") return;
    window.dispatchEvent(new Event("wedding-music-start"));
    setStage("opening");
    window.setTimeout(() => setStage("open"), 2150);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const guests = String(form.get("guests") ?? "1").trim();
    const selected = form.getAll("ceremonies").map(String);
    const note = String(form.get("message") ?? "").trim();
    if (!name || !guests) { setRsvpError("Please share your name and number of guests."); return; }
    if (selected.length === 0) { setRsvpError("Please choose at least one celebration you’ll attend."); return; }
    setRsvpError(null);

    void supabase.from("rsvps").insert({ name, guest_count: Number(guests), ceremonies_attending: selected, message: note || null });

    const lines = [
      "Hello Krishn & Mansi ❤️",
      "",
      "Thank you for inviting us to celebrate your special days.",
      "",
      `Name: ${name}`,
      `Number of Guests: ${guests}`,
      "",
      "We'll be joining you for:",
      ...selected.map((celebration) => `• ${celebration}`),
      ...(note ? ["", "A note for you:", note] : []),
      "",
      "Looking forward to celebrating with you both! ✨",
    ];
    const encodedMessage = encodeURIComponent(lines.join("\n"));
    window.location.href = `https://api.whatsapp.com/send/?phone=${WHATSAPP_NUMBER}&text=${encodedMessage}&type=phone_number&app_absent=0`;
    setSubmitted(true);
  };

  return <main className="invitation-page bg-background text-foreground">
    <MusicToggle />
    {stage !== "open" && <section aria-label="Closed wedding invitation" className={`cover-gate fixed inset-0 z-40 h-[100dvh] w-screen overflow-hidden bg-maroon text-primary-foreground ${stage === "opening" ? "cover-out" : ""}`}>
      <div className="absolute inset-0 grid grid-cols-2">
        <div aria-hidden="true" className={`relative overflow-hidden ${stage === "opening" ? "door-left" : ""}`}>
          <picture className="contents"><source media="(max-width: 767px)" srcSet={coverImageMobile} /><img src={coverImage} alt="" width={1920} height={1080} className="gate-image absolute left-0 top-0 h-full w-[200%] max-w-none object-cover" /></picture>
        </div>
        <div aria-hidden="true" className={`relative overflow-hidden ${stage === "opening" ? "door-right" : ""}`}>
          <picture className="contents"><source media="(max-width: 767px)" srcSet={coverImageMobile} /><img src={coverImage} alt="" width={1920} height={1080} className="gate-image absolute right-0 top-0 h-full w-[200%] max-w-none object-cover" /></picture>
        </div>
      </div>
      <div aria-hidden="true" className="cover-vignette pointer-events-none absolute inset-0" />
      <div aria-hidden="true" className="cover-frame pointer-events-none absolute inset-0 z-[2]"><span className="absolute inset-[10px] border border-gold/80 md:inset-[18px]" /><span className="absolute inset-[15px] border border-gold/25 md:inset-[23px]" /></div>
      <div aria-hidden="true" className={`pointer-events-none absolute inset-0 opacity-0 ${stage === "opening" ? "golden-backdrop" : ""}`} style={{ background: "radial-gradient(ellipse 60% 70% at 50% 52%, color-mix(in oklab, var(--haldi) 60%, white), var(--gold) 45%, color-mix(in oklab, var(--gold) 55%, var(--maroon)) 75%, transparent)" }} />
      <div aria-hidden="true" className={`pointer-events-none absolute left-1/2 top-1/2 z-10 h-[70vmax] w-[70vmax] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 ${stage === "opening" ? "golden-flare" : ""}`} style={{ background: "radial-gradient(closest-side, color-mix(in oklab, var(--haldi) 65%, white), var(--gold) 42%, transparent 72%)" }} />
      <div className={`cover-content absolute inset-0 flex flex-col items-center justify-center px-5 pb-[12dvh] text-center md:pb-0 ${stage === "opening" ? "cover-content-fade" : "invitation-enter"}`}>
        <p className="text-[9px] uppercase tracking-[.3em] text-primary-foreground/80 md:text-[10px] md:tracking-[.35em]">A wedding invitation</p>
        <h1 className="mt-4 whitespace-nowrap font-display text-[2.65rem] leading-none sm:text-5xl md:mt-6 md:text-7xl">Krishn <span className="italic text-gold">&</span> Mansi</h1>
        <div className="mt-6 md:mt-9">
          <Button type="button" variant="seal" onClick={openInvitation} aria-label="Open Krishn and Mansi's wedding invitation" className={`h-24 w-24 px-0 py-0 md:h-28 md:w-28 ${stage === "opening" ? "" : "seal-breathe"}`}>
            <span className="relative block h-full w-full">
              <span className="absolute inset-0 grid place-items-center font-display text-2xl italic"><span>K <span className="text-[.7em] not-italic">&</span> M</span></span>
              <span className="absolute inset-x-0 bottom-0 translate-y-[5px] whitespace-nowrap text-center font-sans text-[7px] uppercase not-italic tracking-[.2em] md:text-[8px] md:tracking-[.25em]">Enter our celebration</span>
            </span>
          </Button>
        </div>
        <p className="mt-6 font-display text-xl italic text-primary-foreground/80 md:mt-9">Begin our forever</p>
        <p className="mt-4 text-[9px] uppercase tracking-[.25em] text-primary-foreground/65 md:mt-8 md:tracking-[.28em]">22—26 November 2026</p>
      </div>
    </section>}

    <section className="invitation-hero relative flex h-80 items-center justify-center overflow-hidden border-x border-t border-gold/40 px-6 py-6 text-center md:py-8">
      {/* Replace this imported image with {{COUPLE_PHOTO}} when available. */}
      <img data-placeholder-token="{{COUPLE_PHOTO}}" src={heroImage} alt="Placeholder for Krishn and Mansi's couple portrait" width={1280} height={1600} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-background/55" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background" />
      <div aria-hidden="true" className="silk-sheen absolute inset-0" />
      {petals.map((petal, index) => <span aria-hidden="true" key={index} className="petal-fall absolute -top-6 h-3 w-2 rounded-[70%_30%] bg-maroon/40" style={{ left: petal.left, animationDelay: petal.delay, ["--petal-duration" as string]: petal.duration }} />)}
      <div className="relative z-10 flex max-w-4xl flex-col items-center invitation-enter">
        <Monogram small />
        <p className="mt-3 text-[9px] text-maroon sm:text-[10px]">Together with their families</p>
        <h2 className="mt-1 whitespace-nowrap font-display text-[clamp(2.6rem,11vw,4.5rem)] leading-none text-maroon md:text-7xl">Krishn <span className="italic text-gold">&</span> Mansi</h2>
        <p className="mt-2 font-display text-lg italic sm:text-2xl">Four days. One forever.</p>
        <p className="mt-1.5 font-display text-sm tracking-[.12em] text-muted-foreground sm:text-base">22 — 26 November 2026</p>
        <a href="#story" aria-label="Continue to our story" className="mt-3 font-display text-xl leading-none text-gold">⌄</a>
      </div>
    </section>

    <section id="story" className="story-section relative overflow-hidden border-x border-gold/40 px-5 py-5 md:px-10 md:py-7">
      <div className="story-layout mx-auto grid max-w-6xl grid-cols-[.9fr_1.1fr] items-center gap-4 md:grid-cols-[1fr_1.15fr] md:gap-14">
        <div>
          <div className="flex items-center gap-3"><span className="h-px w-12 bg-gold/50" /><p className="text-[9px] uppercase tracking-[.18em] text-gold">Our story</p><span className="h-px flex-1 bg-gold/50" /></div>
          <h2 className="mt-2 font-display text-[clamp(1.65rem,7vw,2.4rem)] font-semibold leading-[.92] text-maroon md:text-5xl">Written in the stars,<br />celebrated with you.</h2>
          <div className="mt-4 hidden font-display text-sm leading-snug text-muted-foreground md:block lg:text-base">
            <p>Some stories begin with a grand moment. Ours grew quietly—in shared laughter, familiar silences, and the comforting discovery of home in one another.</p>
            <p className="mt-2">Now, surrounded by the people who shaped our worlds, we begin our most beautiful chapter. Your presence will make these days part of our forever.</p>
          </div>
        </div>
        <figure className="story-art">
          <img src={storyPalace} alt="Illustrated Rajwada palace framed by jasmine and peacocks" width={1536} height={1024} loading="lazy" className="mx-auto max-h-56 w-full object-contain md:max-h-64" />
        </figure>
      </div>
      <a href="#save-the-date" aria-label="Continue to save the date" className="mx-auto mt-1 block w-fit font-display text-xl leading-none text-gold">⌄</a>
    </section>

    <section id="save-the-date" className="countdown-section relative overflow-hidden border-x border-b border-gold/40 bg-ivory-deep/30 px-4 py-6 text-center md:py-8">
      <div className="mx-auto mb-3 flex max-w-xl items-center gap-3"><span className="h-px flex-1 bg-gold/45" /><h2 className="whitespace-nowrap font-display text-lg font-semibold uppercase tracking-[.16em] text-maroon md:text-2xl">Save the date</h2><span className="h-px flex-1 bg-gold/45" /></div>
      <Countdown />
      <Button variant="invitation" size="sm" onClick={downloadCalendar} className="mt-3 px-5 md:px-8"><CalendarPlus /> Add all events to calendar</Button>
    </section>

    <CeremonyTimeline />

    <section className="rsvp-section relative overflow-hidden border-x border-t border-gold/40 px-5 py-7 md:px-10 md:py-9"><div className="mx-auto max-w-5xl">
      <div className="mb-5 flex items-center gap-3"><span className="h-px flex-1 bg-gold/45" /><h2 className="whitespace-nowrap font-display text-3xl font-semibold text-maroon md:text-4xl">Will you join us?</h2><span className="h-px flex-1 bg-gold/45" /></div>
      {submitted ? <div className="invitation-enter flex min-h-64 flex-col items-center justify-center border-y border-gold/40 text-center"><span className="grid h-12 w-12 place-items-center rounded-full bg-maroon text-primary-foreground"><Check /></span><h3 className="mt-4 font-display text-3xl text-maroon">Your RSVP is ready on WhatsApp.</h3><p className="mt-2 text-sm text-muted-foreground">Just press send in the chat that opened — we can’t wait to celebrate with you.</p></div> : <form onSubmit={submit} className="rsvp-form grid grid-cols-2 gap-x-3 gap-y-3 border-y border-gold/35 px-3 py-4 md:gap-x-7 md:gap-y-4 md:px-6 md:py-5" noValidate>
        <label className="block font-display text-sm font-semibold">Your name<Input required name="name" className="mt-1 h-9 bg-background/65" placeholder="Your name" /></label>
        <label className="block font-display text-sm font-semibold">Number of guests<Input required name="guests" type="number" min="1" max="10" defaultValue="1" className="mt-1 h-9 bg-background/65" /></label>
        <fieldset className="col-span-2"><legend className="mb-2 font-display text-sm font-semibold">Which event(s) will you attend?</legend><div className="grid grid-cols-4 gap-2">{ceremonies.map((event) => <label key={event.name} className="flex items-center gap-1 text-[9px] leading-tight sm:gap-2 sm:text-sm"><Checkbox name="ceremonies" value={event.name} />{event.name}</label>)}</div></fieldset>
        <label className="col-span-2 block font-display text-sm font-semibold">A note for us <span className="font-normal text-muted-foreground">(optional)</span><Textarea name="message" className="mt-1 h-10 min-h-10 bg-background/65 py-2" placeholder="Your message…" /></label>
        {rsvpError && <p role="alert" className="col-span-2 border border-terracotta/50 bg-terracotta/10 px-4 py-3 text-sm text-terracotta">{rsvpError}</p>}
        <Button type="submit" variant="invitation" size="lg" className="col-span-2 min-h-11 w-full border border-gold/60 px-8 shadow-[var(--shadow-gold)] transition-all duration-300 hover:shadow-[0_18px_45px_color-mix(in_oklab,var(--gold)_45%,transparent)] active:scale-[.97]"><WhatsAppIcon className="h-4 w-4" /> Send RSVP on WhatsApp</Button>
      </form>}
    </div></section>

    <section className="travel-section relative overflow-hidden border-x border-gold/40 bg-ivory-deep/30 px-5 py-5 md:px-10 md:py-6">
      <img aria-hidden="true" src={storyPalace} alt="" className="pointer-events-none absolute bottom-0 right-0 h-full w-2/5 object-contain object-right-bottom opacity-[.12]" />
      <div className="relative mx-auto max-w-5xl">
        <div className="mx-auto mb-4 flex max-w-lg items-center gap-3"><span className="h-px flex-1 bg-gold/45" /><div className="text-center"><p className="text-[8px] uppercase tracking-[.2em] text-gold">Travel</p><h2 className="whitespace-nowrap font-display text-2xl font-semibold text-maroon md:text-3xl">For your journey</h2></div><span className="h-px flex-1 bg-gold/45" /></div>
        <div className="grid grid-cols-[.9fr_1.1fr] items-center divide-x divide-gold/40">
          <div className="pr-4"><h3 className="font-display text-2xl font-semibold text-maroon md:text-3xl">Travel & stay</h3><p className="mt-1 text-xs leading-snug text-muted-foreground md:text-sm">Travel and stay arrangements are provided for <span className="font-medium text-maroon">Baraat guests only</span>.</p></div>
          <div className="flex items-start gap-2 pl-4"><MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold" /><div><p className="font-display text-lg font-semibold leading-none text-maroon md:text-xl">Celebration Point, Patna</p><p className="mt-1 text-xs text-muted-foreground">7:00 PM</p><a href="https://maps.app.goo.gl/xA1ivmRgw5GrXmiW6" target="_blank" rel="noreferrer" className="mt-1 inline-flex border-b border-maroon/50 font-display text-xs font-semibold text-maroon">Get directions <span aria-hidden="true" className="ml-1">→</span></a></div></div>
        </div>
      </div>
    </section>

    <footer className="invitation-footer relative flex flex-col items-center justify-center overflow-hidden border-x border-b border-gold/40 bg-maroon px-6 py-5 text-center text-primary-foreground md:py-6"><Monogram small /><p className="mt-2 font-display text-xl italic md:text-2xl">With love, laughter, and our whole hearts.</p><p className="mt-1 text-[9px] uppercase tracking-[.28em] text-primary-foreground/65">Krishn & Mansi · November 2026</p></footer>
  </main>;
}

declare global { interface Window { webkitAudioContext?: typeof AudioContext } }
