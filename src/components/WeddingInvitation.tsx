import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { CalendarPlus, Check, MapPin, Music, VolumeX } from "lucide-react";
import heroImage from "@/assets/wedding-hero.jpg";
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

function Countdown() {
  const count = useCountdown();
  return <div className="mx-auto grid max-w-3xl grid-cols-4 border-y border-gold/35 py-6 md:py-10">
    {Object.entries(count).map(([label, value]) => <div className="border-r border-gold/30 px-1 text-center last:border-r-0" key={label}>
      <span key={value} className="digit-change block font-display text-4xl text-maroon tabular-nums sm:text-6xl md:text-7xl">{label === "days" ? value : pad(value)}</span>
      <span className="mt-2 block text-[9px] uppercase text-muted-foreground sm:text-xs">{label}</span>
    </div>)}
  </div>;
}

function MusicToggle() {
  const [playing, setPlaying] = useState(false);
  const contextRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const toggle = () => {
    if (!contextRef.current) {
      const AudioCtx = window.AudioContext ?? window.webkitAudioContext;
      if (!AudioCtx) return;
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
      contextRef.current = context; gainRef.current = gain;
    }
    const next = !playing;
    if (gainRef.current) gainRef.current.gain.setTargetAtTime(next ? 0.025 : 0, contextRef.current?.currentTime ?? 0, 0.2);
    setPlaying(next);
  };
  return <Button type="button" variant="outline" size="icon" onClick={toggle} aria-label={playing ? "Mute ambient music" : "Play ambient music"} title={playing ? "Mute music" : "Play music"} className="fixed right-4 top-4 z-50 rounded-full border-gold/50 bg-background/80 backdrop-blur-md">{playing ? <Music /> : <VolumeX />}</Button>;
}

function downloadCalendar() {
  const entries = [
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
  const [opened, setOpened] = useState(false);
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

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    const form = new FormData(event.currentTarget);
    const { error } = await supabase.from("rsvps").insert({
      name: String(form.get("name") ?? "").trim(),
      guest_count: Number(form.get("guests") ?? 1),
      ceremonies_attending: form.getAll("ceremonies").map(String),
      message: String(form.get("message") ?? "").trim() || null,
    });
    setSubmitting(false);
    if (error) { setSubmitError("Something went wrong while sending your RSVP. Please try again in a moment."); return; }
    setSubmitted(true);
  };

  return <main className="bg-background text-foreground">
    <MusicToggle />
    {!opened && <section className="fixed inset-0 z-40 grid min-h-dvh place-items-center overflow-hidden bg-maroon px-6 text-center text-primary-foreground">
      <img src={heroImage} alt="Ivory silk, jasmine, and rose petals" width={1280} height={1600} className="absolute inset-0 h-full w-full object-cover opacity-20 mix-blend-luminosity" />
      <div className="relative flex flex-col items-center invitation-enter">
        <p className="mb-7 text-[10px] uppercase">A wedding invitation</p>
        <h1 className="font-display text-5xl sm:text-7xl">Krishn <span className="italic text-gold">&</span> Mansi</h1>
        <div className="my-8 h-px w-20 bg-gold/60" />
        <Button variant="seal" onClick={() => setOpened(true)} aria-label="Open Krishn and Mansi's wedding invitation">
          <span className="flex flex-col items-center font-display text-xl"><span>K & M</span><span className="mt-1 font-sans text-[8px] uppercase">Tap to open</span></span>
        </Button>
        <p className="mt-8 font-display text-xl italic text-primary-foreground/75">Begin our story</p>
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
      <div className="mx-auto max-w-6xl"><div className="mb-12 md:flex md:items-end md:justify-between"><div><p className="text-[10px] uppercase text-gold">Moments</p><h2 className="mt-3 font-display text-5xl md:text-7xl">A few pages before forever</h2></div><p className="mt-4 max-w-xs text-sm text-primary-foreground/65">Photographs to be added as our story unfolds.</p></div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
          {["{{GALLERY_IMAGE_1}}", "{{GALLERY_IMAGE_2}}", "{{GALLERY_IMAGE_3}}", "{{GALLERY_IMAGE_4}}"].map((token, index) => <figure key={token} className={`${index % 3 === 0 ? "row-span-2" : ""} group relative min-h-52 overflow-hidden md:min-h-72`}>
            <img data-placeholder-token={token} src={heroImage} alt={`Gallery placeholder ${index + 1} for Krishn and Mansi`} width={1280} height={1600} loading="lazy" className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 ${index === 1 ? "object-left" : index === 2 ? "object-right" : ""}`} />
            <figcaption className="absolute inset-x-3 bottom-3 border border-primary-foreground/30 bg-maroon/65 px-3 py-2 text-center text-[9px] uppercase backdrop-blur-sm">{token}</figcaption>
          </figure>)}
        </div>
      </div>
    </section>

    <section className="px-5 py-24 md:py-36"><div className="mx-auto grid max-w-5xl gap-16 md:grid-cols-[.8fr_1.2fr] md:gap-24">
      <div><p className="text-[10px] uppercase text-gold">Kindly respond</p><h2 className="mt-4 font-display text-5xl text-maroon md:text-6xl">Will you join us?</h2><p className="mt-5 text-sm leading-relaxed text-muted-foreground">Your blessings are the greatest gift. Please let us know which moments we’ll share together.</p></div>
      {submitted ? <div className="invitation-enter flex min-h-96 flex-col items-center justify-center border-y border-gold/40 text-center"><span className="grid h-14 w-14 place-items-center rounded-full bg-maroon text-primary-foreground"><Check /></span><h3 className="mt-6 font-display text-4xl text-maroon">With all our hearts, thank you.</h3><p className="mt-3 text-sm text-muted-foreground">We can’t wait to celebrate with you.</p></div> : <form onSubmit={submit} className="space-y-7">
        <label className="block text-xs uppercase">Your name<Input required name="name" className="mt-2 h-12 border-x-0 border-t-0 rounded-none px-0" placeholder="Full name" /></label>
        <label className="block text-xs uppercase">Number of guests<Input required name="guests" type="number" min="1" max="10" defaultValue="1" className="mt-2 h-12 border-x-0 border-t-0 rounded-none px-0" /></label>
        <fieldset><legend className="mb-4 text-xs uppercase">Celebrations you’ll attend</legend><div className="grid gap-4 sm:grid-cols-2">{ceremonies.map((event) => <label key={event.name} className="flex items-center gap-3 text-sm"><Checkbox name="ceremonies" value={event.name} />{event.name}</label>)}</div></fieldset>
        <label className="block text-xs uppercase">A note for us <span className="normal-case text-muted-foreground">(optional)</span><Textarea name="message" className="mt-2 min-h-28 border-x-0 border-t-0 rounded-none px-0" placeholder="Write a little something…" /></label>
        {submitError && <p role="alert" className="border border-terracotta/50 bg-terracotta/10 px-4 py-3 text-sm text-terracotta">{submitError}</p>}
        <Button type="submit" variant="invitation" size="lg" disabled={submitting}>{submitting ? "Sending…" : "Send my RSVP"}</Button>
      </form>}
    </div></section>

    <section className="bg-ivory-deep/50 px-5 py-20"><div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2"><div><p className="text-[10px] uppercase text-gold">For your journey</p><h2 className="mt-4 font-display text-4xl text-maroon">Travel & stay</h2><p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">{"{{ACCOMMODATION_AND_TRAVEL_INFO}}"}</p></div><div className="border-l border-gold/40 pl-7"><MapPin className="text-gold" /><p className="mt-4 text-[10px] uppercase text-gold">Ceremony venues</p><div className="mt-4 space-y-6">{[{ name: "Home", address: "Workshop colony", href: "https://maps.app.goo.gl/X16diHdQzpcoAWAe9", events: "Haldi · Matkor & Rasam · Reception" }, { name: "Celebration Point Community Hall", address: "Patna, Bihar", href: "https://maps.app.goo.gl/xA1ivmRgw5GrXmiW6", events: "Barat & Shaadi" }].map((venue) => <div key={venue.name}><p className="font-display text-2xl">{venue.name}</p><p className="mt-1 text-sm text-muted-foreground">{venue.address}</p><p className="mt-2 text-xs text-muted-foreground">{venue.events}</p><Button asChild variant="outline" size="sm" className="mt-3 border-gold/50 bg-transparent"><a href={venue.href} target="_blank" rel="noreferrer"><MapPin /> Get directions</a></Button></div>)}</div></div></div></section>

    <footer className="flex min-h-[70dvh] flex-col items-center justify-center bg-maroon px-6 py-24 text-center text-primary-foreground"><Monogram /><p className="mt-10 font-display text-4xl italic sm:text-5xl">With love, laughter,<br />and our whole hearts.</p><p className="mt-7 max-w-md text-sm leading-relaxed text-primary-foreground/65">We look forward to beginning forever in the company of those we love most.</p><p className="mt-12 text-xs uppercase text-gold">Krishn & Mansi · November 2026</p><div className="mt-16 h-px w-16 bg-gold/40" /><p className="mt-5 text-[9px] uppercase text-primary-foreground/45">Made with love</p></footer>
  </main>;
}

declare global { interface Window { webkitAudioContext?: typeof AudioContext } }