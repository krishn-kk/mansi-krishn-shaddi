import { useEffect, useRef, useState, type CSSProperties } from "react";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ceremonies = [
  { day: "Day 01", date: "22 Nov", name: "Haldi", time: "11:00 AM", venue: "Home", address: "Workshop colony", directions: "https://maps.app.goo.gl/X16diHdQzpcoAWAe9", dot: "bg-haldi", border: "border-haldi", text: "text-haldi", line: "A morning washed in gold and blessings.", dress: ["bg-haldi", "bg-gold", "bg-ivory-deep"] },
  { day: "Day 02", date: "23 Nov", name: "Matkor & Rasam", time: "Time to be shared", venue: "Home", address: "Workshop colony", directions: "https://maps.app.goo.gl/X16diHdQzpcoAWAe9", dot: "bg-terracotta", border: "border-terracotta", text: "text-terracotta", line: "Earth, song, and traditions passed down with love.", dress: ["bg-terracotta", "bg-gold", "bg-ivory-deep"] },
  { day: "Day 03", date: "24 Nov", name: "Barat & Shaadi", time: "8:00 AM", venue: "Celebration Point Community Hall", address: "Patna, Bihar", directions: "https://maps.app.goo.gl/xA1ivmRgw5GrXmiW6", dot: "bg-maroon", border: "border-maroon", text: "text-maroon", line: "A joyful procession, a sacred promise, one forever.", dress: ["bg-maroon", "bg-gold", "bg-ivory-deep"] },
  { day: "Day 05", date: "26 Nov", name: "Reception", time: "Time to be shared", venue: "Home", address: "Workshop colony", directions: "https://maps.app.goo.gl/X16diHdQzpcoAWAe9", dot: "bg-navy", border: "border-navy", text: "text-navy", line: "An evening of celebration beneath a thousand lights.", dress: ["bg-navy", "bg-gold", "bg-ivory-deep"] },
] as const;

export type Ceremony = (typeof ceremonies)[number];

const chapterMeta = [
  { label: "Chapter one", subtitle: "A little sunshine, a lot of love." },
  { label: "Chapter two", subtitle: "Where traditions become treasured memories." },
  { label: "Chapter three", subtitle: "Two hearts. One forever." },
  { label: "Chapter four", subtitle: "And so, our forever begins." },
] as const;

const nodeTokens = ["haldi", "terracotta", "maroon", "navy"] as const;

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

function Chapter({ event, index, onEnter }: { event: Ceremony; index: number; onEnter?: () => void }) {
  const { ref, inView } = useInViewOnce<HTMLElement>(0.22, onEnter);
  const meta = chapterMeta[index];
  const odd = index % 2 === 1;
  const nodeStyle = { "--node-color": `var(--${nodeTokens[index]})` } as CSSProperties;

  const body = (
    <div className="chapter-body">
      <p className="text-[9px] uppercase tracking-[.35em] text-gold">{meta.label}</p>
      <div className={`mb-5 mt-3 inline-flex items-center gap-3 border-l-2 pl-4 ${event.border} ${odd ? "" : "md:border-l-0 md:border-r-2 md:pl-0 md:pr-4"}`}>
        <span className="text-[10px] uppercase text-muted-foreground">{event.day}</span><span className="font-display text-2xl text-maroon">{event.date}</span>
      </div>
      <h3 className={`font-display leading-none text-foreground ${index === 2 ? "text-6xl md:text-7xl" : "text-5xl md:text-6xl"}`}>{event.name}</h3>
      <p className="mt-4 font-display text-xl italic text-foreground/70">{meta.subtitle}</p>
      <p className="mt-5 font-display text-xl italic text-muted-foreground">“{event.line}”</p>
      <p className={`mt-5 text-xs font-medium uppercase ${event.text}`}>{event.time}</p>
      <div className={`mt-7 flex items-center gap-3 ${odd ? "" : "md:justify-end"}`}><span className="text-[9px] uppercase text-muted-foreground">Dress palette</span>{event.dress.map((color) => <span key={color} className={`h-5 w-5 rounded-full border border-background shadow-sm ${color}`} />)}</div>
      <div className={`mt-8 border-t border-gold/35 pt-6 ${odd ? "" : "md:ml-auto md:max-w-sm"}`}>
        <p className="font-display text-xl">{event.venue}</p><p className="mt-1 text-xs text-muted-foreground">{event.address}</p>
        <Button asChild variant="outline" size="sm" className="mt-4 border-gold/50 bg-transparent transition-all duration-300 hover:border-gold hover:bg-gold/10"><a href={event.directions} target="_blank" rel="noreferrer"><MapPin /> Get directions</a></Button>
      </div>
    </div>
  );

  return (
    <article ref={ref} className={`chapter relative ml-12 md:ml-0 md:grid md:grid-cols-2 md:gap-20 ${odd ? "from-right" : "from-left"} ${inView ? "in-view" : ""}`}>
      {index === 2 && <>
        <span aria-hidden="true" className="pointer-events-none absolute -top-14 left-1/2 z-0 hidden h-60 w-72 -translate-x-1/2 rounded-t-full border border-maroon/10 md:block" />
        <span aria-hidden="true" className="pointer-events-none absolute -top-8 left-1/2 z-0 hidden h-52 w-56 -translate-x-1/2 rounded-t-full border border-maroon/[.07] md:block" />
      </>}
      {index === 3 && <span aria-hidden="true" className="node-halo absolute -left-[45px] top-[8px] z-0 h-7 w-7 rounded-full border border-gold/45 md:left-[calc(50%-13px)]" />}
      <span aria-hidden="true" className={`chapter-node absolute -left-[39px] top-4 z-10 h-3 w-3 rounded-full ring-4 ring-background md:left-[calc(50%-6px)] ${event.dot}`} style={nodeStyle} />
      <div aria-hidden="true" className="pointer-events-none absolute -left-[39px] top-4 z-0 h-0 w-0 md:left-[calc(50%-6px)]">
        <span aria-hidden="true" className={`chapter-ripple absolute -ml-1.5 -mt-1.5 h-3 w-3 rounded-full ${event.dot}`} style={nodeStyle} />
        <Particles index={index} />
      </div>
      <div className={`relative z-10 ${odd ? "md:col-start-2" : "md:text-right"}`}>
        {index === 2 ? (
          <div className="relative border border-gold/45 p-5 shadow-[var(--shadow-gold)] md:p-7">
            <span aria-hidden="true" className="pointer-events-none absolute inset-1.5 border border-gold/25" />
            {["-left-px -top-px", "-right-px -top-px", "-left-px -bottom-px", "-right-px -bottom-px"].map((corner) => (
              <span key={corner} aria-hidden="true" className={`absolute ${corner} h-1.5 w-1.5 rotate-45 bg-gold/80`} />
            ))}
            {body}
          </div>
        ) : body}
      </div>
    </article>
  );
}

export function CeremonyTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [shimmer, setShimmer] = useState(false);

  useEffect(() => {
    const update = () => {
      const section = sectionRef.current; if (!section) return;
      const rect = section.getBoundingClientRect();
      setProgress(Math.min(100, Math.max(0, ((window.innerHeight * .55 - rect.top) / rect.height) * 100)));
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <section ref={sectionRef} className="relative px-5 py-24 md:py-36">
      <div className="mx-auto max-w-5xl">
        <div className="mb-20 text-center"><p className="text-[10px] uppercase text-gold">The celebration</p><h2 className="mt-4 font-display text-5xl text-maroon md:text-7xl">Four chapters of joy</h2></div>
        <div className="relative">
          <div className="absolute bottom-0 left-[17px] top-0 w-px bg-gold/25 md:left-1/2" />
          <div className="timeline-fill absolute left-[16px] top-0 w-[3px] md:left-[calc(50%-1px)]" style={{ height: `${progress}%`, background: "linear-gradient(to bottom, var(--gold), color-mix(in oklab, var(--gold) 70%, var(--haldi)))" }} />
          {shimmer && <span aria-hidden="true" className="line-shimmer absolute left-[14px] top-0 z-10 h-[18%] w-[7px] md:left-[calc(50%-3px)]" style={{ background: "linear-gradient(to bottom, transparent, color-mix(in oklab, var(--gold) 75%, white), transparent)" }} />}
          <div className="space-y-16 md:space-y-24">
            {ceremonies.map((event, index) => <Chapter key={event.name} event={event} index={index} onEnter={index === 2 ? () => setShimmer(true) : undefined} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
