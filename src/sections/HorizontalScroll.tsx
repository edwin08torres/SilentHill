import Spline from "@splinetool/react-spline";

interface HorizontalScrollProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  trackRef: React.RefObject<HTMLDivElement | null>;
  heroTitleRef: React.RefObject<HTMLHeadingElement | null>;
  tintaVideoRef: React.RefObject<HTMLVideoElement | null>;
  splineContainerRef: React.RefObject<HTMLDivElement | null>;
  splineLoaded: boolean;
  setSplineLoaded: (loaded: boolean) => void;
}

export function HorizontalScroll({
  containerRef,
  trackRef,
  heroTitleRef,
  tintaVideoRef,
  splineContainerRef,
  splineLoaded,
  setSplineLoaded,
}: HorizontalScrollProps) {
  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden"
    >
      <div
        ref={trackRef}
        className="flex h-full w-[300vw] will-change-transform"
      >
        {/* Hero — Silent Hill Title */}
        <div className="seccion-hero w-screen h-screen shrink-0 flex items-center relative">
          <div className="absolute inset-0 bg-linear-to-r from-black/60 via-transparent to-transparent z-1 pointer-events-none" />
          <div className="w-1/2 flex flex-col justify-center pl-16 xl:pl-24 z-10 pointer-events-none">
            <h1
              ref={heroTitleRef}
              className="text-[8rem] xl:text-[12rem] font-black tracking-[0.2em] uppercase leading-[0.85] text-white/90 drop-shadow-[0_0_60px_rgba(255,255,255,0.1)]"
              style={{ textShadow: "0 0 80px rgba(120,0,0,0.15)" }}
            >
              Silent
              <br />
              Hill
            </h1>
            <div className="mt-8 w-16 h-px bg-red-900/30" />
            <p className="mt-6 text-base xl:text-lg tracking-[0.15em] text-white/30 uppercase italic">
              There was a hole here. It's gone now.
            </p>
          </div>
          <div
            ref={splineContainerRef}
            className={`absolute top-0 right-0 w-1/2 h-full z-0 pointer-events-none transition-opacity duration-1000 ${
              splineLoaded ? "opacity-100" : "opacity-0"
            }`}
          >
            <Spline
              scene="https://prod.spline.design/M16b3dwvoYhk47wd/scene.splinecode"
              className="w-full h-full cursor-move scale-125"
              onLoad={() => setSplineLoaded(true)}
            />
          </div>
        </div>

        {/* Brookhaven Hospital */}
        <div className="w-screen h-screen shrink-0 flex flex-col items-center justify-center px-12 xl:px-24 relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(80,0,0,0.08)_0%,transparent_70%)] pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-px bg-red-900/15" />
          <p className="reveal-text text-[0.65rem] uppercase tracking-[0.6em] text-red-800/40 mb-10 font-bold animate-[flicker_6s_linear_infinite]">
            Brookhaven Hospital
          </p>
          <h2 className="reveal-text text-5xl xl:text-7xl font-black text-center leading-[1.1] max-w-3xl tracking-[0.08em] text-white/80">
            El óxido de
            <br />
            <span className="font-normal italic text-white/25 tracking-[0.12em]">
              la mente
            </span>
          </h2>
          <div className="mt-8 w-12 h-px bg-red-900/20" />
          <p className="reveal-text mt-8 text-sm xl:text-base text-white/20 text-center max-w-lg leading-relaxed tracking-[0.05em] italic">
            Los pasillos se retuercen sobre sí mismos. Las paredes respiran. La
            realidad se deshace capa por capa, revelando lo que siempre estuvo
            debajo.
          </p>
        </div>

        {/* La Verdad */}
        <div className="seccion-verdad w-screen h-screen shrink-0 relative flex items-center justify-center bg-black overflow-hidden">
          <video
            ref={tintaVideoRef}
            src="/tinta.mp4"
            loop
            muted
            playsInline
            style={{ opacity: 0, visibility: "hidden" }}
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay z-0 scale-110 transform-gpu will-change-[opacity,transform] backface-hidden"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-black/30 z-1 pointer-events-none" />
          <h2 className="reveal-text relative z-10 text-[10rem] xl:text-[16rem] font-black uppercase leading-[0.8] text-red-700 mix-blend-screen tracking-[0.15em] text-center drop-shadow-[0_0_120px_rgba(200,0,0,0.3)]">
            La
            <br />
            Verdad
          </h2>
        </div>
      </div>
    </div>
  );
}
