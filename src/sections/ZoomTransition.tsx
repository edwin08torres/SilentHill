import { memo, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const ZoomTransition = memo(function ZoomTransition() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=250%",
          scrub: 1,
          pin: true,
        },
      });

      tl.to(
        ".zoom-hole",
        {
          scale: 200,
          ease: "power3.inOut",
          duration: 1,
        },
        0,
      );

      tl.to(
        ".zoom-ring-1",
        {
          scale: 180,
          opacity: 0,
          ease: "power2.inOut",
          duration: 1,
        },
        0.05,
      );

      tl.to(
        ".zoom-ring-2",
        {
          scale: 160,
          opacity: 0,
          ease: "power2.inOut",
          duration: 1,
        },
        0.1,
      );

      tl.to(
        ".zoom-text-top",
        {
          opacity: 0,
          scale: 1.3,
          y: -80,
          ease: "power3.inOut",
          duration: 0.6,
        },
        0,
      );

      tl.to(
        ".zoom-text-bottom",
        {
          opacity: 0,
          scale: 1.3,
          y: 80,
          ease: "power3.inOut",
          duration: 0.6,
        },
        0.05,
      );

      tl.to(
        ".zoom-label",
        {
          opacity: 0,
          scale: 0.8,
          ease: "power2.in",
          duration: 0.3,
        },
        0,
      );

      tl.to(
        ".zoom-vignette",
        {
          opacity: 0,
          ease: "power2.inOut",
          duration: 0.8,
        },
        0.2,
      );

      tl.to(
        ".zoom-scanlines",
        {
          opacity: 0,
          ease: "none",
          duration: 0.5,
        },
        0.3,
      );

      tl.fromTo(
        ".zoom-reveal-text",
        {
          opacity: 0,
          scale: 0.7,
          y: 30,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          ease: "power2.out",
          duration: 0.4,
        },
        0.7,
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-black overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <img
          src="/prison2.jpg"
          alt=""
          className="w-full h-full object-cover opacity-70 scale-110 transform-gpu"
        />
        <div className="absolute inset-0 bg-red-950/30 mix-blend-overlay" />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/40" />
      </div>

      <div className="zoom-reveal-text absolute inset-0 z-5 flex items-end justify-center pb-24 pointer-events-none opacity-0">
        <p
          className="text-[0.6rem] md:text-xs uppercase tracking-[0.5em] text-white/30"
          style={{ fontFamily: "'Cinzel', Georgia, serif" }}
        >
          No hay vuelta atrás
        </p>
      </div>

      <div className="absolute inset-0 z-10 bg-black mix-blend-multiply flex items-center justify-center pointer-events-none">
        <div className="zoom-hole w-3 h-3 md:w-6 md:h-6 bg-white rounded-full shadow-[0_0_80px_20px_rgba(255,255,255,0.4),0_0_200px_60px_rgba(139,0,0,0.15)]" />
      </div>

      <div className="absolute inset-0 z-11 flex items-center justify-center pointer-events-none">
        <div className="zoom-ring-1 w-10 h-10 md:w-16 md:h-16 rounded-full border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)]" />
      </div>
      <div className="absolute inset-0 z-11 flex items-center justify-center pointer-events-none">
        <div className="zoom-ring-2 w-20 h-20 md:w-32 md:h-32 rounded-full border border-white/5" />
      </div>

      <div
        className="zoom-scanlines absolute inset-0 z-15 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.08) 2px, rgba(255,255,255,0.08) 4px)",
        }}
      />

      <div className="zoom-vignette absolute inset-0 z-16 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,transparent_10%,rgba(0,0,0,0.7)_70%,rgba(0,0,0,0.95)_100%)]" />

      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
        <div className="flex flex-col items-center gap-4 md:gap-6">
          <p className="zoom-label text-[0.5rem] md:text-[0.6rem] uppercase tracking-[0.7em] text-red-800/50 font-bold">
            Observatorio — Lago Toluca
          </p>

          <div className="flex flex-col items-center justify-between h-[35vh] md:h-[45vh]">
            <div className="flex flex-col items-center gap-2">
              <p
                className="zoom-text-top text-2xl md:text-5xl xl:text-6xl font-black tracking-[0.3em] md:tracking-[0.4em] text-white/90 uppercase text-center"
                style={{
                  fontFamily: "'Cinzel', Georgia, serif",
                  textShadow:
                    "0 0 40px rgba(0,0,0,0.8), 0 0 80px rgba(0,0,0,0.5)",
                }}
              >
                There was a hole here
              </p>
            </div>

            <div className="flex flex-col items-center gap-2">
              <p
                className="zoom-text-bottom text-2xl md:text-5xl xl:text-6xl font-black tracking-[0.3em] md:tracking-[0.4em] text-white/90 uppercase text-center"
                style={{
                  fontFamily: "'Cinzel', Georgia, serif",
                  textShadow:
                    "0 0 40px rgba(0,0,0,0.8), 0 0 80px rgba(0,0,0,0.5)",
                }}
              >
                It's gone now
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
