import { memo, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface CinematicPreloaderProps {
  heroTitleRef: React.RefObject<HTMLHeadingElement | null>;
}

export const CinematicPreloader = memo(function CinematicPreloader({
  heroTitleRef,
}: CinematicPreloaderProps) {
  const preloaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const preloader = preloaderRef.current;
    if (!preloader) return () => {};

    const targets = [
      ".pl-top-line",
      ".pl-bottom-line",
      ".pl-eyebrow",
      ".pl-main-title",
      ".pl-subtitle",
      ".pl-bar-fill",
      ".pl-bar-track",
    ];
    targets.forEach((t) => gsap.set(t, { clearProps: "all" }));

    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo(
      ".pl-top-line, .pl-bottom-line",
      { scaleX: 0 },
      {
        scaleX: 1,
        transformOrigin: "center center",
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
      },
    );

    tl.fromTo(
      ".pl-eyebrow",
      { opacity: 0, letterSpacing: "0.2em" },
      { opacity: 1, letterSpacing: "0.6em", duration: 0.6, ease: "power2.out" },
      "-=0.4",
    );

    tl.fromTo(
      ".pl-main-title",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
      "-=0.3",
    );

    tl.fromTo(
      ".pl-subtitle",
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: "power2.out" },
      "-=0.3",
    );

    tl.fromTo(
      ".pl-bar-fill",
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.8,
        ease: "power2.inOut",
        transformOrigin: "left center",
      },
      "-=0.1",
    );

    tl.to({}, { duration: 0.3 });

    tl.to(".pl-main-title", {
      opacity: 0,
      y: -30,
      duration: 0.5,
      ease: "power2.in",
    });

    tl.to(
      ".pl-eyebrow, .pl-subtitle, .pl-top-line, .pl-bottom-line, .pl-bar-track",
      {
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
      },
      "-=0.3",
    );

    tl.to(
      preloader,
      {
        opacity: 0,
        duration: 0.6,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(preloader, { display: "none" });
          gsap.fromTo(
            heroTitleRef.current,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 2, ease: "power3.out" },
          );
          ScrollTrigger.refresh();
        },
      },
      "-=0.1",
    );

    return () => {
      tl.kill();
      targets.forEach((t) => gsap.set(t, { clearProps: "all" }));
    };
  }, [heroTitleRef]);

  return (
    <div
      ref={preloaderRef}
      style={{ zIndex: 9999 }}
      className="fixed inset-0 bg-[#030303] flex items-center justify-center"
    >
      <div className="flex flex-col items-center gap-5 px-8 text-center">
        <div className="pl-top-line w-20 h-px bg-red-900/60" />

        <p className="pl-eyebrow text-[0.6rem] md:text-xs uppercase tracking-[0.6em] text-red-600/80 font-bold">
          Archivo Clasificado · Caso #73
        </p>

        <h1
          className="pl-main-title text-5xl md:text-8xl font-black uppercase tracking-[0.15em] text-white"
          style={{ fontFamily: "'Cinzel', Georgia, serif" }}
        >
          Silent Hill
        </h1>

        <p className="pl-subtitle text-xs md:text-sm uppercase tracking-[0.5em] text-white/40">
          Iniciando transmisión...
        </p>

        <div className="pl-bar-track w-48 md:w-64 mt-3">
          <div className="w-full h-[2px] bg-white/10 overflow-hidden relative">
            <div className="pl-bar-fill absolute inset-0 bg-red-800/80" />
          </div>
        </div>

        <div className="pl-bottom-line w-12 h-px bg-red-900/40 mt-1" />
      </div>
    </div>
  );
});
