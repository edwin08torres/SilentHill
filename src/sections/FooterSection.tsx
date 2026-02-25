import { memo, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const FooterSection = memo(function FooterSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 20%",
          scrub: false,
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        ".footer-eyebrow",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", stagger: 0.15 },
      );

      tl.fromTo(
        ".footer-title",
        { opacity: 0, y: 40, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out" },
        "-=0.5",
      );

      tl.fromTo(
        ".footer-divider",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          ease: "power2.out",
          transformOrigin: "center center",
        },
        "-=0.7",
      );

      tl.fromTo(
        ".footer-quote",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
        "-=0.4",
      );

      tl.fromTo(
        ".footer-tech",
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.3",
      );

      tl.fromTo(
        ".footer-bottom-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.6,
          ease: "power2.out",
          transformOrigin: "center center",
        },
        "-=0.3",
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen w-full relative flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url('/gruge.jpg')] bg-cover bg-center transform-gpu translate-z-0" />
      <div className="absolute inset-0 bg-black/80" />

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04] animate-[fog-drift_25s_ease-in-out_infinite] transform-gpu"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 40%, transparent 100%)",
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] animate-[fog-drift_18s_ease-in-out_infinite_reverse] transform-gpu"
        style={{
          background:
            "linear-gradient(270deg, transparent 0%, rgba(180,0,0,0.08) 50%, transparent 100%)",
        }}
      />

      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-linear-to-t from-black/60 to-transparent pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center px-8 max-w-2xl">
        <p className="footer-eyebrow text-[0.5rem] uppercase tracking-[0.7em] text-red-900/60 mb-3">
          Recepción — Hotel Lakeview
        </p>
        <p className="footer-eyebrow text-[0.6rem] uppercase tracking-[0.6em] text-red-900/50 mb-8">
          Carta encontrada bajo la puerta, Hab. 312
        </p>

        <h2 className="footer-title text-2xl md:text-3xl xl:text-5xl font-black tracking-[0.25em] uppercase text-white/70 leading-tight">
          Encuéntrame
          <br />
          <span className="font-normal italic text-white/40">en la niebla</span>
        </h2>

        <div className="footer-divider mt-10 w-16 h-px bg-red-900/30" />

        <p className="footer-quote mt-10 text-sm tracking-[0.08em] text-white/45 italic leading-relaxed max-w-md">
          "There was a hole here. It's gone now."
        </p>

        <div className="footer-bottom-line mt-10 w-6 h-px bg-white/10" />

        <p className="footer-tech mt-8 text-[0.5rem] tracking-[0.4em] text-white/30 uppercase">
          React · GSAP · Spline · Three.js
        </p>

        <div className="footer-tech mt-8 flex flex-col items-center gap-4">
          <a
            href="https://edwintorrez.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[0.5rem] uppercase tracking-[0.5em] text-red-700/50 hover:text-red-500/80 transition-colors duration-500"
          >
            Ver portafolio ↗
          </a>
          <button
            onClick={() =>
              gsap.to(window, {
                scrollTo: 0,
                duration: 2,
                ease: "power3.inOut",
              })
            }
            className="text-[0.4rem] uppercase tracking-[0.5em] text-white/15 hover:text-white/40 transition-colors duration-500 cursor-pointer"
          >
            ↑ Volver al inicio
          </button>
        </div>
      </div>

      <p className="absolute bottom-6 text-[0.35rem] tracking-[0.5em] text-white/10 uppercase">
        © 2025 — Tributo no oficial
      </p>
    </section>
  );
});
