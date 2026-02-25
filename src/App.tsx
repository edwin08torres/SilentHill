import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useHorizontalScroll } from "./hooks/useHorizontalScroll";
import { useCustomCursor } from "./hooks/useCustomCursor";
import { useAudio } from "./hooks/useAudio";
import { AudioToggle } from "./components/AudioToggle";
import { CinematicPreloader } from "./components/CinematicPreloader";
import { IntroSection } from "./sections/IntroSection";
import { CharacterGrid } from "./sections/CharacterGrid";
import { HorizontalScroll } from "./sections/HorizontalScroll";
import { FooterSection } from "./sections/FooterSection";
import { LoreCards } from "./sections/LoreCards";
import { BestiarySection } from "./sections/BestiarySection";
import { ZoomTransition } from "./sections/ZoomTransition";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const tintaVideoRef = useRef<HTMLVideoElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);

  const { containerRef, trackRef } = useHorizontalScroll({ tintaVideoRef });
  const { cursorRef } = useCustomCursor();
  const { isPlaying, toggle, playHover } = useAudio();

  useLayoutEffect(() => {
    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      lenis.destroy();
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      className="overflow-x-hidden bg-[#030303] text-white md:cursor-none"
      style={{ fontFamily: "'Cinzel', Georgia, serif" }}
    >
      <CinematicPreloader heroTitleRef={heroTitleRef} />

      <div
        ref={cursorRef}
        className="hidden md:block fixed top-0 left-0 w-8 h-8 bg-white rounded-full pointer-events-none z-100"
      />
      <AudioToggle isPlaying={isPlaying} onToggle={toggle} />

      <video
        src="/humo.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="hidden md:block fixed top-0 left-0 w-full h-full object-cover pointer-events-none opacity-[8%] z-50"
      />
      <div className="fixed inset-0 z-40 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />

      <IntroSection />
      <CharacterGrid onHover={playHover} />
      <HorizontalScroll
        containerRef={containerRef}
        trackRef={trackRef}
        heroTitleRef={heroTitleRef}
        tintaVideoRef={tintaVideoRef}
      />
      <LoreCards />
      <BestiarySection />
      <ZoomTransition />
      <FooterSection />
    </div>
  );
}

export default App;
