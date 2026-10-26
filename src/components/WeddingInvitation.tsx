import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { CalendarPlus, Check, MapPin, Music, VolumeX } from "lucide-react";
import heroImage from "@/assets/wedding-hero.jpg";
import coverImage from "@/assets/wedding-cover.jpg";
import galleryImage1 from "@/assets/wedding-gallery-01.jpeg.asset.json";
import galleryImage2 from "@/assets/wedding-gallery-02.jpeg.asset.json";
import galleryImage3 from "@/assets/wedding-gallery-03.jpeg.asset.json";
import galleryImage4 from "@/assets/wedding-gallery-04.jpeg.asset.json";
import galleryImage5 from "@/assets/wedding-gallery-05.jpeg.asset.json";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ceremonies = [
  { day: "Day 01", date: "22 Nov", name: "Haldi", time: "11:00 AM", venue: "Home", address: "Workshop colony", directions: "https://maps.app.goo.gl/X16diHdQzpcoAWAe9", dot: "bg-haldi", border: "border-haldi", text: "text-haldi", line: "A morning washed in gold and blessings.", dress: ["bg-haldi", "bg-gold", "bg-ivory-deep"] },
  { day: "Day 02", date: "23 Nov", name: "Matkor & Rasam", time: "Time to be shared", venue: "Home", address: "Workshop colony", directions: "https://maps.app.goo.gl/X16diHdQzpcoAWAe9", dot: "bg-terracotta", border: "border-terracotta", text: "text-terracotta", line: "Earth, song, and traditions passed down with love.", dress: ["bg-terracotta", "bg-gold", "bg-ivory-deep"] },
  { day: "Day 03", date: "24 Nov", name: "Barat & Shaadi", time: "8:00 AM", venue: "Celebration Point Community Hall", address: "Patna, Bihar", directions: "https://maps.app.goo.gl/xA1ivmRgw5GrXmiW6", dot: "bg-maroon", border: "border-maroon", text: "text-maroon", line: "A joyful procession, a sacred promise, one forever.", dress: ["bg-maroon", "bg-gold", "bg-ivory-deep"] },
  { day: "Day 05", date: "26 Nov", name: "Reception", time: "Time to be shared", venue: "Home", address: "Workshop colony", directions: "https://maps.app.goo.gl/X16diHdQzpcoAWAe9", dot: "bg-navy", border: "border-navy", text: "text-navy", line: "An evening of celebration beneath a thousand lights.", dress: ["bg-navy", "bg-gold", "bg-ivory-deep"] },
] as const;

const galleryImages = [
  { src: galleryImage1.url, alt: "Krishn and Mansi together beneath a floral arch" },
  { src: galleryImage2.url, alt: "Krishn and Mansi sharing a joyful moment at their celebration" },
  { src: galleryImage3.url, alt: "Krishn and Mansi standing together at a celebration" },
  { src: galleryImage4.url, alt: "Krishn and Mansi celebrating together beneath the lights" },
  { src: galleryImage5.url, alt: "Krishn and Mansi sharing a dance" },
];

const WHATSAPP_NUMBER = "919583191615";
const MUSIC_VIDEO_ID = "_BduB3uQciw";

const target = new Date("2026-11-22T11:00:00+05:30").getTime();
const pad = (value: number) => String(Math.max(0, value)).padStart(2, "0");

function useCountdown() {
  const calculate = () => {
    const distance = Math.max(0, target - Date.now());
    return { days: Math.floor(distance / 86400000), hours: Math.floor(distance / 3600000) % 24, minutes: Math.floor(distance / 60000) % 60, seconds: Math.floor(distance / 1000) % 60 };
  };
  const [countdown, setCountdown] = useState(calculate);
  useEffect(() => { const id = window.setInterval(() => setCountdown(calculate()), 1000); return () => window.clearInterval(id); }, []);
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
  return <div className="mx-auto grid max-w-3xl grid-cols-4 border-y border-gold/35 py-6 md:py-10">
    {Object.entries(count).map(([label, value]) => <div className="border-r border-gold/30 px-1 text-center last:border-r-0" key={label}>
      <span key={value} className="digit-change block font-display text-4xl text-maroon tabular-nums sm:text-6xl md:text-7xl">{label === "days" ? value : pad(value)}</span>
      <span className="mt-2 block text-[9px] uppercase text-muted-foreground sm:text-xs">{label}</span>
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
    ["20261126T123000Z", "20261126T153000Z", "Reception — Krishn & Mansi", "Home, Workshop colony"],
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
  const storyRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const petals = useMemo(() => Array.from({ length: 10 }, (_, index) => ({ left: `${7 + index * 9}%`, delay: `${(index * 1.7) % 8}s`, duration: `${9 + (index % 4) * 2}s` })), []);

  useEffect(() => {
    const update = () => {
      const section = storyRef.current; if (!section) return;
      const rect = section.getBoundingClientRect();
      setProgress(Math.min(100, Math.max(0, ((window.innerHeight * .55 - rect.top) / rect.height) * 100)));
    };
    window.addEventListener("scroll", update, { passive: true }); update();
    return () => window.removeEventListener("scroll", update);
  }, []);

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

  return <main className="bg-background text-foreground">
    <MusicToggle />
    {stage !== "open" && <section aria-label="Closed wedding invitation" className={`fixed inset-0 z-40 overflow-hidden bg-maroon text-primary-foreground ${stage === "opening" ? "cover-out" : ""}`}>
      <div className="absolute inset-0 grid grid-cols-2">
        <div aria-hidden="true" className={`relative overflow-hidden ${stage === "opening" ? "door-left" : ""}`}>
          <img src={coverImage} alt="" width={1024} height={1536} className="absolute left-0 top-0 h-full w-[200%] max-w-none object-cover" />
        </div>
        <div aria-hidden="true" className={`relative overflow-hidden ${stage === "opening" ? "door-right" : ""}`}>
          <img src={coverImage} alt="" width={1024} height={1536} className="absolute right-0 top-0 h-full w-[200%] max-w-none object-cover" />
        </div>
      </div>
      <div aria-hidden="true" className={`pointer-events-none absolute inset-0 opacity-0 ${stage === "opening" ? "golden-backdrop" : ""}`} style={{ background: "radial-gradient(ellipse 60% 70% at 50% 52%, color-mix(in oklab, var(--haldi) 60%, white), var(--gold) 45%, color-mix(in oklab, var(--gold) 55%, var(--maroon)) 75%, transparent)" }} />
      <div aria-hidden="true" className={`pointer-events-none absolute left-1/2 top-1/2 z-10 h-[70vmax] w-[70vmax] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 ${stage === "opening" ? "golden-flare" : ""}`} style={{ background: "radial-gradient(closest-side, color-mix(in oklab, var(--haldi) 65%, white), var(--gold) 42%, transparent 72%)" }} />
      <div className={`absolute inset-0 flex flex-col items-center justify-center px-6 text-center ${stage === "opening" ? "cover-content-fade" : "invitation-enter"}`}>
        <p className="text-[10px] uppercase tracking-[.35em] text-primary-foreground/80">A wedding invitation</p>
        <h1 className="mt-6 font-display text-5xl leading-tight sm:text-7xl">Krishn <span className="italic text-gold">&</span> Mansi</h1>
        <div className="mt-9">
          <Button type="button" variant="seal" onClick={openInvitation} aria-label="Open Krishn and Mansi's wedding invitation" className={stage === "opening" ? "" : "seal-breathe"}>
            <span className="relative block h-full w-full">
              <span className="absolute inset-0 grid place-items-center font-display text-2xl italic"><span>K <span className="text-[.7em] not-italic">&</span> M</span></span>
              <span className="absolute inset-x-0 bottom-0 translate-y-[5px] text-center font-sans text-[8px] uppercase not-italic tracking-[.25em]">Enter our celebration</span>
            </span>
          </Button>
        </div>
        <p className="mt-9 font-display text-xl italic text-primary-foreground/75">Begin our forever</p>
      </div>
    </section>}

    <section className="relative flex min-h-[92dvh] items-center justify-center overflow-hidden px-6 py-24 text-center">
      {/* Replace this imported image with {{COUPLE_PHOTO}} when available. */}
      <img data-placeholder-token="{{COUPLE_PHOTO}}" src={heroImage} alt="Placeholder for Krishn and Mansi's couple portrait" width={1280} height={1600} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-background/45" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-transparent to-background" />
      {petals.map((petal, index) => <span aria-hidden="true" key={index} className="petal-fall absolute -top-6 h-3 w-2 rounded-[70%_30%] bg-maroon/40" style={{ left: petal.left, animationDelay: petal.delay, ["--petal-duration" as string]: petal.duration }} />)}
      <div className="relative z-10 flex max-w-4xl flex-col items-center invitation-enter">
        <Monogram />
        <p className="mt-8 text-[10px] uppercase text-maroon">Together with their families</p>
        <h2 className="mt-3 font-display text-6xl leading-[.86] text-maroon sm:text-8xl md:text-[8rem]">Krishn <span className="block text-4xl italic text-gold sm:text-6xl">&</span> Mansi</h2>
        <p className="mt-7 font-display text-2xl italic sm:text-3xl">Four days. One forever.</p>
        <p className="mt-4 text-xs uppercase text-muted-foreground">22—26 November 2026</p>
        <a href="#story" className="mt-14 border-b border-gold pb-2 text-[10px] uppercase text-maroon">Discover our celebration</a>
      </div>
    </section>

    <section id="story" className="px-6 py-24 md:py-36">
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[1fr_1.5fr] md:gap-20">
        <div><p className="text-[10px] uppercase text-gold">Our story</p><h2 className="mt-4 font-display text-5xl text-maroon md:text-6xl">Written in the stars,<br /><em>celebrated with you.</em></h2></div>
        <div className="border-l border-gold/50 pl-7 font-display text-xl leading-relaxed text-muted-foreground md:text-2xl">
          <p>Some stories begin with a grand moment. Ours grew quietly—in shared laughter, familiar silences, and the comforting discovery of home in one another.</p>
          <p className="mt-6">Now, surrounded by the people who shaped our worlds, we begin our most beautiful chapter. Your presence will make these days part of our forever.</p>
        </div>
      </div>
    </section>

    <section className="bg-ivory-deep/55 px-4 py-24 text-center md:py-32">
      <p className="text-[10px] uppercase text-gold">Until the story begins</p>
      <h2 className="mb-12 mt-4 font-display text-5xl text-maroon md:text-7xl">Save the date</h2>
      <Countdown />
      <Button variant="invitation" size="lg" onClick={downloadCalendar} className="mt-10"><CalendarPlus /> Add all events to calendar</Button>
    </section>

    <section ref={storyRef} className="relative px-5 py-24 md:py-36">
      <div className="mx-auto max-w-5xl">
        <div className="mb-20 text-center"><p className="text-[10px] uppercase text-gold">The celebration</p><h2 className="mt-4 font-display text-5xl text-maroon md:text-7xl">Four chapters of joy</h2></div>
        <div className="relative">
          <div className="absolute bottom-0 left-[17px] top-0 w-px bg-border md:left-1/2" />
          <div className="absolute left-[16px] top-0 w-[3px] bg-gold transition-[height] duration-300 md:left-[calc(50%-1px)]" style={{ height: `${progress}%` }} />
          <div className="space-y-16 md:space-y-24">
            {ceremonies.map((event, index) => <article key={event.name} className={`relative ml-12 grid gap-8 md:ml-0 md:grid-cols-2 md:gap-20 ${index % 2 ? "md:[&>div:first-child]:col-start-2" : ""}`}>
              <span className={`absolute -left-[39px] top-4 z-10 h-3 w-3 rounded-full ring-4 ring-background md:left-[calc(50%-6px)] ${event.dot}`} />
              <div className={`${index % 2 ? "md:col-start-2" : "md:text-right"}`}>
                <div className={`mb-5 inline-flex items-center gap-3 border-l-2 pl-4 ${event.border} ${index % 2 ? "" : "md:border-l-0 md:border-r-2 md:pl-0 md:pr-4"}`}>
                  <span className="text-[10px] uppercase text-muted-foreground">{event.day}</span><span className="font-display text-2xl text-maroon">{event.date}</span>
                </div>
                <h3 className="font-display text-5xl leading-none text-foreground md:text-6xl">{event.name}</h3>
                <p className="mt-5 font-display text-xl italic text-muted-foreground">“{event.line}”</p>
                <p className={`mt-5 text-xs font-medium uppercase ${event.text}`}>{event.time}</p>
                <div className={`mt-7 flex items-center gap-3 ${index % 2 ? "" : "md:justify-end"}`}><span className="text-[9px] uppercase text-muted-foreground">Dress palette</span>{event.dress.map((color) => <span key={color} className={`h-5 w-5 rounded-full border border-background shadow-sm ${color}`} />)}</div>
                <div className={`mt-8 border-t border-border pt-6 ${index % 2 ? "" : "md:ml-auto"}`}>
                  <p className="font-display text-xl">{event.venue}</p><p className="mt-1 text-xs text-muted-foreground">{event.address}</p>
                  <Button asChild variant="outline" size="sm" className="mt-4 border-gold/50 bg-transparent"><a href={event.directions} target="_blank" rel="noreferrer"><MapPin /> Get directions</a></Button>
                </div>
              </div>
            </article>)}
          </div>
        </div>
      </div>
    </section>

    <section className="bg-maroon px-5 py-24 text-primary-foreground md:py-32">
      <div className="mx-auto max-w-6xl"><div className="mb-12 md:flex md:items-end md:justify-between"><div><p className="text-[10px] uppercase text-gold">Moments</p><h2 className="mt-3 font-display text-5xl md:text-7xl">A few pages before forever</h2></div><p className="mt-4 max-w-xs text-sm text-primary-foreground/65">A handful of moments, held close.</p></div>
        <div className="grid auto-rows-[12rem] grid-cols-2 gap-3 md:auto-rows-[14rem] md:grid-cols-4 md:gap-5">
          {galleryImages.map((image, index) => <figure key={image.src} className={`group relative min-h-0 overflow-hidden ${index === 0 ? "row-span-2" : ""} ${index === 1 || index === 4 ? "md:col-span-2" : ""}`}>
            <img src={image.src} alt={image.alt} width={1280} height={1600} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </figure>)}
        </div>
      </div>
    </section>

    <section className="px-5 py-24 md:py-36"><div className="mx-auto grid max-w-5xl gap-16 md:grid-cols-[.8fr_1.2fr] md:gap-24">
      <div><p className="text-[10px] uppercase text-gold">Kindly respond</p><h2 className="mt-4 font-display text-5xl text-maroon md:text-6xl">Will you join us?</h2><p className="mt-5 text-sm leading-relaxed text-muted-foreground">Your blessings are the greatest gift. Please let us know which moments we’ll share together.</p></div>
      {submitted ? <div className="invitation-enter flex min-h-96 flex-col items-center justify-center border-y border-gold/40 text-center"><span className="grid h-14 w-14 place-items-center rounded-full bg-maroon text-primary-foreground"><Check /></span><h3 className="mt-6 font-display text-4xl text-maroon">Your RSVP is ready on WhatsApp.</h3><p className="mt-3 text-sm text-muted-foreground">Just press send in the chat that opened — we can’t wait to celebrate with you.</p></div> : <form onSubmit={submit} className="space-y-7" noValidate>
        <label className="block text-xs uppercase">Your name<Input required name="name" className="mt-2 h-12 border-x-0 border-t-0 rounded-none px-0" placeholder="Full name" /></label>
        <label className="block text-xs uppercase">Number of guests<Input required name="guests" type="number" min="1" max="10" defaultValue="1" className="mt-2 h-12 border-x-0 border-t-0 rounded-none px-0" /></label>
        <fieldset><legend className="mb-4 text-xs uppercase">Celebrations you’ll attend</legend><div className="grid gap-4 sm:grid-cols-2">{ceremonies.map((event) => <label key={event.name} className="flex items-center gap-3 text-sm"><Checkbox name="ceremonies" value={event.name} />{event.name}</label>)}</div></fieldset>
        <label className="block text-xs uppercase">A note for us <span className="normal-case text-muted-foreground">(optional)</span><Textarea name="message" className="mt-2 min-h-28 border-x-0 border-t-0 rounded-none px-0" placeholder="Write a little something…" /></label>
        {rsvpError && <p role="alert" className="border border-terracotta/50 bg-terracotta/10 px-4 py-3 text-sm text-terracotta">{rsvpError}</p>}
        <Button type="submit" variant="invitation" size="lg" className="border border-gold/60 px-8 shadow-[var(--shadow-gold)] transition-all duration-300 hover:shadow-[0_18px_45px_color-mix(in_oklab,var(--gold)_45%,transparent)] active:scale-[.97]"><WhatsAppIcon className="h-4 w-4" /> Send RSVP on WhatsApp</Button>
      </form>}
    </div></section>

    <section className="bg-ivory-deep/50 px-5 py-24 md:py-32"><div className="mx-auto max-w-2xl text-center">
      <p className="text-[10px] uppercase text-gold">For your journey</p>
      <h2 className="mt-4 font-display text-4xl text-maroon md:text-5xl">Travel & stay</h2>
      <div className="mt-10 border border-gold/35 bg-card/80 px-7 py-12 shadow-[var(--shadow-gold)]">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-full border border-gold/50 text-gold"><MapPin /></span>
        <p className="mx-auto mt-7 max-w-sm text-sm leading-relaxed text-muted-foreground">Travel and stay arrangements are provided for <span className="font-medium text-maroon">Baraat guests only</span>. We look forward to welcoming you warmly.</p>
        <p className="mt-9 font-display text-3xl text-maroon">Celebration Point, Patna</p>
        <p className="mt-2 text-xs uppercase tracking-[.2em] text-muted-foreground">Time · 7:00 PM</p>
        <Button asChild variant="outline" size="sm" className="mt-7 border-gold/50 bg-transparent"><a href="https://maps.app.goo.gl/xA1ivmRgw5GrXmiW6" target="_blank" rel="noreferrer"><MapPin /> Get directions</a></Button>
      </div>
    </div></section>

    <footer className="flex min-h-[70dvh] flex-col items-center justify-center bg-maroon px-6 py-24 text-center text-primary-foreground"><Monogram /><p className="mt-10 font-display text-4xl italic sm:text-5xl">With love, laughter,<br />and our whole hearts.</p><p className="mt-7 max-w-md text-sm leading-relaxed text-primary-foreground/65">We look forward to beginning forever in the company of those we love most.</p><p className="mt-12 text-xs uppercase text-gold">Krishn & Mansi · November 2026</p><div className="mt-16 h-px w-16 bg-gold/40" /><p className="mt-5 text-[9px] uppercase text-primary-foreground/45">Made with love</p></footer>
  </main>;
}

declare global { interface Window { webkitAudioContext?: typeof AudioContext } }
