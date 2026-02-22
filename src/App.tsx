import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { usePreloader } from "./hooks/usePreloader";
import { useHorizontalScroll } from "./hooks/useHorizontalScroll";
import { useCustomCursor } from "./hooks/useCustomCursor";
import { IntroSection } from "./sections/IntroSection";
import { CharacterGrid } from "./sections/CharacterGrid";
import { HorizontalScroll } from "./sections/HorizontalScroll";
import { FooterSection } from "./sections/FooterSection";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const tintaVideoRef = useRef<HTMLVideoElement>(null);

  const { preloaderRef, heroTitleRef } = usePreloader();
  const { containerRef, trackRef } = useHorizontalScroll({ tintaVideoRef });
  const { cursorRef } = useCustomCursor();

  useLayoutEffect(() => {
    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div
      className="overflow-x-hidden bg-[#030303] text-white cursor-none"
      style={{ fontFamily: "'Cinzel', Georgia, serif" }}
    >
      <div
        ref={preloaderRef}
        className="fixed inset-0 z-999 bg-[#030303] flex flex-col items-center justify-center pointer-events-none"
      >
        <div className="rounded-full w-32 h-32 flex items-center justify-center animate-[siren-pulse_3s_ease-in-out_infinite]">
          <div className="flex flex-col items-center">
            <p className="text-red-800/60 tracking-[0.5em] uppercase text-[0.55rem] font-bold">
              Recibiendo
            </p>
            <p className="text-white/30 tracking-[0.4em] uppercase text-[0.5rem] mt-1">
              transmisión...
            </p>
          </div>
        </div>
        <div className="mt-8 w-40 h-px bg-white/10 overflow-hidden">
          <div className="h-full bg-red-900/60 animate-[preloader-bar_2s_ease-in-out_infinite]" />
        </div>
      </div>

      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 bg-white rounded-full pointer-events-none z-100"
      />

      <video
        src="/humo.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover pointer-events-none opacity-15 z-50"
      />
      <div className="fixed inset-0 z-40 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.9)_100%)]" />

      <IntroSection />
      <CharacterGrid />
      <HorizontalScroll
        containerRef={containerRef}
        trackRef={trackRef}
        heroTitleRef={heroTitleRef}
        tintaVideoRef={tintaVideoRef}
      />
      <FooterSection />
    </div>
  );
}

export default App;
