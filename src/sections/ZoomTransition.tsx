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
          end: `+=${window.innerWidth < 768 ? 120 : 200}%`,
          scrub: 1,
          pin: true,
        },
      });

      tl.to(
        ".zoom-text-mask",
        {
          scale: 40,
          ease: "power2.inOut",
          duration: 1,
        },
        0,
      );

      tl.to(
        ".zoom-subtitle",
        {
          opacity: 0,
          ease: "power2.in",
          duration: 0.2,
        },
        0,
      );

      tl.to(
        ".zoom-fade-cover",
        {
          opacity: 1,
          ease: "power2.inOut",
          duration: 0.25,
        },
        0.72,
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-[#030303] overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <img
          src="/prison2.jpg"
          alt=""
          className="w-full h-full object-cover opacity-80 scale-110 transform-gpu"
        />
        <div className="absolute inset-0 bg-red-950/20 mix-blend-overlay" />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-black/50" />
      </div>

      <div className="absolute inset-0 z-10 bg-black mix-blend-multiply flex items-center justify-center pointer-events-none">
        <div className="zoom-text-mask flex flex-col items-center gap-0 leading-none will-change-transform">
          <span
            className="text-[18vw] md:text-[14vw] font-black uppercase text-white tracking-[0.05em]"
            style={{ fontFamily: "'Cinzel', Georgia, serif", lineHeight: 0.85 }}
          >
            Silent
          </span>
          <span
            className="text-[18vw] md:text-[14vw] font-black uppercase text-white tracking-[0.15em]"
            style={{ fontFamily: "'Cinzel', Georgia, serif", lineHeight: 0.85 }}
          >
            Hill
          </span>
        </div>
      </div>

      <div className="absolute inset-0 z-20 flex flex-col items-center justify-end pb-[38vh] md:pb-[35vh] pointer-events-none">
        <p className="zoom-subtitle text-[0.5rem] md:text-[0.6rem] uppercase tracking-[0.7em] text-white/40 font-bold">
          There was a hole here. It's gone now.
        </p>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none animate-pulse">
        <p className="zoom-subtitle text-[0.5rem] uppercase tracking-[0.5em] text-white/20">
          Scroll
        </p>
        <div className="zoom-subtitle w-px h-6 bg-white/10" />
      </div>

      <div className="zoom-fade-cover absolute inset-0 z-30 bg-[#030303] opacity-0 pointer-events-none" />
    </section>
  );
});
