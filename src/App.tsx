import { useRef } from "react";
import { usePreloader } from "./hooks/usePreloader";
import { useHorizontalScroll } from "./hooks/useHorizontalScroll";
import { useCustomCursor } from "./hooks/useCustomCursor";
import { IntroSection } from "./sections/IntroSection";
import { CharacterGrid } from "./sections/CharacterGrid";
import { HorizontalScroll } from "./sections/HorizontalScroll";
import { FooterSection } from "./sections/FooterSection";

function App() {
  const tintaVideoRef = useRef<HTMLVideoElement>(null);
  const splineContainerRef = useRef<HTMLDivElement>(null);

  const { preloaderRef, heroTitleRef, splineLoaded, setSplineLoaded } =
    usePreloader();
  const { containerRef, trackRef } = useHorizontalScroll({
    tintaVideoRef,
    splineContainerRef,
  });
  const { cursorRef } = useCustomCursor();

  return (
    <div
      className="overflow-x-hidden bg-[#030303] text-white cursor-none"
      style={{ fontFamily: "'Cinzel', Georgia, serif" }}
    >
      {/* Preloader */}
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

      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 bg-white rounded-full pointer-events-none z-100 mix-blend-difference"
      />

      {/* Fixed Atmosphere Layers */}
      <video
        src="/humo.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover pointer-events-none opacity-30 mix-blend-screen grayscale z-50 transform-gpu translate-z-0 will-change-transform"
      />
      <div className="fixed inset-0 z-40 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.9)_100%)]" />
      <div className="noise-overlay fixed inset-0 z-41 pointer-events-none mix-blend-overlay opacity-[0.03] transform-gpu translate-z-0" />

      {/* Sections */}
      <IntroSection />
      <CharacterGrid />
      <HorizontalScroll
        containerRef={containerRef}
        trackRef={trackRef}
        heroTitleRef={heroTitleRef}
        tintaVideoRef={tintaVideoRef}
        splineContainerRef={splineContainerRef}
        splineLoaded={splineLoaded}
        setSplineLoaded={setSplineLoaded}
      />
      <FooterSection />
    </div>
  );
}

export default App;
