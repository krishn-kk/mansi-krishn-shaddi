import { useEffect, useRef, useState, type CSSProperties } from "react";
import { MapPin } from "lucide-react";
import haldiIllustration from "@/assets/ceremony-haldi.webp";
import matkorIllustration from "@/assets/ceremony-matkor.webp";
import shaadiIllustration from "@/assets/ceremony-shaadi.webp";
import receptionIllustration from "@/assets/ceremony-reception.webp";

export const ceremonies = [
  { day: "Day 01", date: "22 Nov", name: "Haldi", time: "11:00 AM", venue: "Home", address: "Workshop colony", directions: "https://maps.app.goo.gl/X16diHdQzpcoAWAe9", dot: "bg-haldi", border: "border-haldi", text: "text-haldi", line: "A morning washed in gold and blessings.", dress: ["bg-haldi", "bg-gold", "bg-ivory-deep"] },
  { day: "Day 02", date: "23 Nov", name: "Matkor & Rasam", time: "Time to be shared", venue: "Home", address: "Workshop colony", directions: "https://maps.app.goo.gl/X16diHdQzpcoAWAe9", dot: "bg-terracotta", border: "border-terracotta", text: "text-terracotta", line: "Earth, song, and traditions passed down with love.", dress: ["bg-terracotta", "bg-gold", "bg-ivory-deep"] },
  { day: "Day 03", date: "24 Nov", name: "Barat & Shaadi", time: "8:00 AM", venue: "Celebration Point Community Hall", address: "Patna, Bihar", directions: "https://maps.app.goo.gl/xA1ivmRgw5GrXmiW6", dot: "bg-maroon", border: "border-maroon", text: "text-maroon", line: "A joyful procession, a sacred promise, one forever.", dress: ["bg-maroon", "bg-gold", "bg-ivory-deep"] },
  { day: "Day 05", date: "26 Nov", name: "Reception", time: "7:00 PM", venue: "Home", address: "Workshop colony", directions: "https://maps.app.goo.gl/X16diHdQzpcoAWAe9", dot: "bg-navy", border: "border-navy", text: "text-navy", line: "An evening of celebration beneath a thousand lights.", dress: ["bg-navy", "bg-gold", "bg-ivory-deep"] },
] as const;

export type Ceremony = (typeof ceremonies)[number];

const chapterMeta = [
  { label: "Chapter one", subtitle: "A little sunshine, a lot of love." },
  { label: "Chapter two", subtitle: "Where traditions become treasured memories." },
  { label: "Chapter three", subtitle: "Two hearts. One forever." },
  { label: "Chapter four", subtitle: "And so, our forever begins." },
] as const;

const nodeTokens = ["haldi", "terracotta", "maroon", "navy"] as const;

const chapterArtwork = [
  { src: haldiIllustration, alt: "Illustration of a couple celebrating Haldi together" },
  { src: matkorIllustration, alt: "Illustration of a couple beside a traditional Matkor kalash and diyas" },
  { src: shaadiIllustration, alt: "Illustration of a bride and groom exchanging a wedding garland" },
  { src: receptionIllustration, alt: "Illustration of a couple dancing beneath a chandelier at their reception" },
] as const;

type Particle = { left: string; top: string; delay: string; drift?: string; dx?: string; dy?: string; mdOnly?: boolean };

const haldiPetals: Particle[] = [
  { left: "-30px", top: "10px", delay: ".1s", drift: "16px" },
  { left: "12px", top: "2px", delay: ".7s", drift: "-14px" },
  { left: "-16px", top: "30px", delay: "1.3s", drift: "10px" },
  { left: "24px", top: "18px", delay: "1.8s", drift: "-12px", mdOnly: true },
  { left: "-42px", top: "6px", delay: "2.3s", drift: "18px", mdOnly: true },
  { left: "4px", top: "44px", delay: "2.8s", drift: "-16px", mdOnly: true },
];

const diyaFlames: Particle[] = [
  { left: "-28px", top: "-6px", delay: "0s" },
  { left: "14px", top: "22px", delay: ".4s" },
  { left: "-8px", top: "52px", delay: ".8s" },
];

const rosePetals: Particle[] = [
  { left: "-52px", top: "0px", delay: ".2s", drift: "-26px" },
  { left: "22px", top: "10px", delay: ".9s", drift: "26px" },
  { left: "-20px", top: "40px", delay: "1.6s", drift: "-34px" },
  { left: "40px", top: "26px", delay: "2.2s", drift: "30px", mdOnly: true },
  { left: "-66px", top: "58px", delay: "2.8s", drift: "-24px", mdOnly: true },
  { left: "8px", top: "70px", delay: "3.4s", drift: "34px", mdOnly: true },
];

const receptionSparkles: Particle[] = [
  { left: "0px", top: "0px", delay: "0s", dx: "34px", dy: "-40px" },
  { left: "0px", top: "0px", delay: ".25s", dx: "-30px", dy: "-52px" },
  { left: "0px", top: "0px", delay: ".5s", dx: "46px", dy: "-8px" },
  { left: "0px", top: "0px", delay: ".75s", dx: "-42px", dy: "-14px" },
  { left: "0px", top: "0px", delay: "1s", dx: "12px", dy: "-60px" },
  { left: "0px", top: "0px", delay: "1.25s", dx: "-12px", dy: "-68px", mdOnly: true },
  { left: "0px", top: "0px", delay: "1.5s", dx: "52px", dy: "-34px", mdOnly: true },
];

function Particles({ index }: { index: number }) {
  if (index === 0) return <>{haldiPetals.map((p, i) => <span key={i} aria-hidden="true" className={`marigold-petal absolute h-3 w-2 rounded-[70%_30%_70%_30%] ${p.mdOnly ? "hidden md:block" : ""}`} style={{ left: p.left, top: p.top, "--p-delay": p.delay, "--drift": p.drift ?? "12px", background: "linear-gradient(135deg, color-mix(in oklab, var(--haldi) 78%, white), var(--gold))" } as CSSProperties} />)}</>;
  if (index === 1) return <>{diyaFlames.map((p, i) => <span key={i} aria-hidden="true" className="diya absolute flex flex-col items-center gap-0.5" style={{ left: p.left, top: p.top, "--p-delay": p.delay } as CSSProperties}>
    <span className="h-2.5 w-1.5 rounded-full" style={{ background: "radial-gradient(circle at 50% 30%, #fff8e1, color-mix(in oklab, var(--haldi) 60%, #e08a3c) 60%, transparent)", boxShadow: "0 0 10px 2px color-mix(in oklab, var(--haldi) 55%, transparent)" }} />
    <span className="h-1 w-3.5 rounded-full bg-terracotta/60" />
  </span>)}</>;
  if (index === 2) return <>{rosePetals.map((p, i) => <span key={i} aria-hidden="true" className={`rose-petal absolute h-3.5 w-2.5 rounded-[80%_20%_80%_20%] ${p.mdOnly ? "hidden md:block" : ""}`} style={{ left: p.left, top: p.top, "--p-delay": p.delay, "--drift": p.drift ?? "-24px", background: "linear-gradient(135deg, color-mix(in oklab, var(--maroon) 65%, var(--terracotta)), var(--terracotta))" } as CSSProperties} />)}</>;
  if (index === 3) return <>{receptionSparkles.map((p, i) => <span key={i} aria-hidden="true" className={`reception-sparkle absolute h-1 w-1 rounded-full bg-gold ${p.mdOnly ? "hidden md:block" : ""}`} style={{ left: p.left, top: p.top, "--p-delay": p.delay, "--dx": p.dx ?? "20px", "--dy": p.dy ?? "-30px" } as CSSProperties} />)}</>;
  return null;
}

function useInViewOnce<T extends HTMLElement>(threshold: number, onEnter?: () => void) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  const callbackRef = useRef(onEnter);
  callbackRef.current = onEnter;
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") { setInView(true); callbackRef.current?.(); return; }
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setInView(true);
        callbackRef.current?.();
        observer.disconnect();
      }
    }, { threshold, rootMargin: "0px 0px -10% 0px" });
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function Chapter({ event, index, onEnter }: { event: Ceremony; index: number; onEnter?: (() => void) | undefined }) {
  const { ref, inView } = useInViewOnce<HTMLElement>(0.22, onEnter);
  const meta = chapterMeta[index] ?? chapterMeta[0];
  const artwork = chapterArtwork[index] ?? chapterArtwork[0];
  const odd = index % 2 === 1;
  const nodeStyle = { "--node-color": `var(--${nodeTokens[index]})` } as CSSProperties;

  const body = (
    <div className="chapter-body relative py-2">
      <p className="font-display text-[clamp(.68rem,2.4vw,.95rem)] font-semibold text-maroon md:text-base">
        {event.date} · {event.time}
      </p>
      <h3 className="mt-0.5 font-display text-[clamp(1.35rem,6vw,2rem)] font-semibold leading-none text-maroon md:text-4xl">{event.name}</h3>
      <p className="mt-1.5 font-display text-[clamp(.72rem,2.8vw,1rem)] leading-tight text-foreground/75 md:text-lg">{meta.subtitle}</p>
      <div className="mt-3 flex items-start gap-2">
        <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-gold md:h-5 md:w-5" />
        <div>
          <p className="font-display text-[clamp(.8rem,3vw,1rem)] font-semibold leading-none text-foreground md:text-lg">{event.venue}</p>
          <p className="mt-1 text-[clamp(.62rem,2.3vw,.78rem)] leading-tight text-muted-foreground md:text-sm">{event.address}</p>
          <a href={event.directions} target="_blank" rel="noreferrer" className="mt-1.5 inline-flex min-h-6 items-center border-b border-maroon/50 font-display text-[clamp(.65rem,2.4vw,.8rem)] font-semibold leading-none text-maroon transition-colors hover:border-gold hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold">
            Get directions <span aria-hidden="true" className="ml-1">→</span>
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <article ref={ref} className={`chapter chapter-${index} relative grid min-h-44 grid-cols-2 items-center gap-7 py-2 md:min-h-64 md:gap-16 md:py-3 lg:gap-24 ${odd ? "from-right" : "from-left"} ${inView ? "in-view" : ""}`}>
      {index === 2 && <>
        <span aria-hidden="true" className="pointer-events-none absolute -top-14 left-1/2 z-0 hidden h-60 w-72 -translate-x-1/2 rounded-t-full border border-maroon/10 md:block" />
        <span aria-hidden="true" className="pointer-events-none absolute -top-8 left-1/2 z-0 hidden h-52 w-56 -translate-x-1/2 rounded-t-full border border-maroon/[.07] md:block" />
      </>}
      {index === 3 && <span aria-hidden="true" className="node-halo absolute left-[calc(50%-13px)] top-1/2 z-0 h-7 w-7 -translate-y-1/2 rounded-full border border-gold/45" />}
      <span aria-hidden="true" className={`chapter-node absolute left-[calc(50%-6px)] top-1/2 z-10 h-3 w-3 -translate-y-1/2 rotate-45 ring-4 ring-background ${event.dot}`} style={nodeStyle} />
      <div aria-hidden="true" className="pointer-events-none absolute left-[calc(50%-6px)] top-1/2 z-0 h-0 w-0">
        <span aria-hidden="true" className={`chapter-ripple absolute -ml-1.5 -mt-1.5 h-3 w-3 rounded-full ${event.dot}`} style={nodeStyle} />
        <Particles index={index} />
      </div>
      <figure className={`chapter-art relative z-[1] col-start-1 row-start-1 aspect-[4/3] w-full max-w-xl self-center md:h-52 md:aspect-auto lg:h-56 ${odd ? "md:col-start-1" : "md:col-start-2"}`}>
        <img
          src={artwork.src}
          alt={artwork.alt}
          width={index < 2 ? 1254 : 1536}
          height={index < 2 ? 1254 : 1024}
          loading="lazy"
          className="h-full w-full object-contain"
        />
      </figure>
      <div className={`relative z-10 col-start-2 row-start-1 self-center ${odd ? "md:col-start-2" : "md:col-start-1"}`}>{body}</div>
    </article>
  );
}

export function CeremonyTimeline() {
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const [shimmer, setShimmer] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const update = () => {
      frame = 0;
      const track = trackRef.current;
      const fill = fillRef.current;
      if (!track || !fill) return;
      const rect = track.getBoundingClientRect();
      const progress = motion.matches ? 1 : Math.min(1, Math.max(0, (window.innerHeight * .65 - rect.top) / rect.height));
      fill.style.transform = `scaleY(${progress})`;
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    motion.addEventListener("change", schedule);
    const resizeObserver = typeof ResizeObserver !== "undefined" ? new ResizeObserver(schedule) : null;
    if (trackRef.current) resizeObserver?.observe(trackRef.current);
    update();
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      motion.removeEventListener("change", schedule);
      resizeObserver?.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section aria-labelledby="chapters-heading" className="ceremony-timeline relative overflow-x-clip px-4 py-12 md:px-5 md:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-5 text-center md:mb-7"><div className="mx-auto flex max-w-xl items-center gap-2 sm:gap-3"><span className="h-px flex-1 bg-gold/45" /><h2 id="chapters-heading" className="whitespace-nowrap font-display text-xl uppercase tracking-[.06em] text-maroon sm:text-3xl sm:tracking-[.08em] md:text-5xl">Four chapters of joy</h2><span className="h-px flex-1 bg-gold/45" /></div></div>
        <div ref={trackRef} className="relative">
          <div aria-hidden="true" className="absolute bottom-0 left-1/2 top-0 w-px bg-gold/35" />
          <div ref={fillRef} aria-hidden="true" className="timeline-fill absolute bottom-0 left-[calc(50%-1px)] top-0 w-[3px] origin-top" style={{ transform: "scaleY(0)", background: "linear-gradient(to bottom, var(--gold), color-mix(in oklab, var(--gold) 70%, var(--haldi)))" }} />
          {shimmer && <span aria-hidden="true" className="line-shimmer absolute left-[calc(50%-3px)] top-0 z-10 h-[18%] w-[7px]" style={{ background: "linear-gradient(to bottom, transparent, color-mix(in oklab, var(--gold) 75%, white), transparent)" }} />}
          <div>
            {ceremonies.map((event, index) => <Chapter key={event.name} event={event} index={index} onEnter={index === 2 ? () => setShimmer(true) : undefined} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
