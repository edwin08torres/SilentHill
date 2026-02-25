import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Lenis from "lenis";
import { useHorizontalScroll } from "./hooks/useHorizontalScroll";
import { useCustomCursor } from "./hooks/useCustomCursor";
import { useAudio } from "./hooks/useAudio";
import { AudioToggle } from "./components/AudioToggle";
import { ScrollProgress } from "./components/ScrollProgress";
import { SectionNav } from "./components/SectionNav";
import { CinematicPreloader } from "./components/CinematicPreloader";
import { IntroSection } from "./sections/IntroSection";
import { CharacterGrid } from "./sections/CharacterGrid";
import { HorizontalScroll } from "./sections/HorizontalScroll";
import { FooterSection } from "./sections/FooterSection";
import { LoreCards } from "./sections/LoreCards";
import { BestiarySection } from "./sections/BestiarySection";
import { ZoomTransition } from "./sections/ZoomTransition";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

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
      <ScrollProgress />
      <SectionNav />

      <video
        src="/humo.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="hidden md:block fixed top-0 left-0 w-full h-full object-cover pointer-events-none opacity-[8%] z-50"
      />
      <div className="fixed inset-0 z-40 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />

      <div
        className="fixed inset-0 z-[200] pointer-events-none opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "150px 150px",
        }}
      />

      <div data-section>
        <IntroSection />
      </div>
      <div data-section>
        <CharacterGrid onHover={playHover} />
      </div>
      <div data-section>
        <HorizontalScroll
          containerRef={containerRef}
          trackRef={trackRef}
          heroTitleRef={heroTitleRef}
          tintaVideoRef={tintaVideoRef}
        />
      </div>
      <div data-section>
        <LoreCards />
      </div>
      <div data-section>
        <BestiarySection />
      </div>
      <div data-section>
        <ZoomTransition />
      </div>
      <div data-section>
        <FooterSection />
      </div>
    </div>
  );
}

export default App;
