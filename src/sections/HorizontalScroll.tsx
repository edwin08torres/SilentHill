import { memo } from "react";

export const HorizontalScroll = memo(function HorizontalScroll({
  containerRef,
  trackRef,
  heroTitleRef,
  tintaVideoRef,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
  trackRef: React.RefObject<HTMLDivElement | null>;
  heroTitleRef: React.RefObject<HTMLHeadingElement | null>;
  tintaVideoRef: React.RefObject<HTMLVideoElement | null>;
}) {
  const mobileSections = [
    {
      label: "Brookhaven Hospital",
      title: (
        <>
          El óxido de
          <br />
          <span className="font-normal italic text-white/40 tracking-[0.12em]">
            la mente
          </span>
        </>
      ),
      body: "Los pasillos se retuercen sobre sí mismos. Las paredes respiran. La realidad se deshace capa por capa, revelando lo que siempre estuvo debajo.",
    },
    {
      label: "Prisión Toluca",
      title: (
        <>
          El peso de
          <br />
          <span className="font-normal italic text-white/40 tracking-[0.12em]">
            la culpa
          </span>
        </>
      ),
      body: "Nadie te encerró aquí. Tú mismo construiste los barrotes. Cada celda tiene tu nombre.",
      image: "/prison1.webp",
    },
  ];

  return (
    <>
      <div
        ref={containerRef}
        className="hidden md:block relative h-screen w-full overflow-hidden"
      >
        <div ref={trackRef} className="flex h-full w-[400vw]">
          <div className="seccion-hero w-screen h-screen shrink-0 flex items-center relative">
            <div className="absolute inset-0 bg-linear-to-r from-black/60 via-transparent to-transparent z-1 pointer-events-none" />
            <div className="w-1/2 flex flex-col justify-center pl-16 xl:pl-24 z-10 pointer-events-none">
              <h1
                ref={heroTitleRef}
                className="text-[8rem] xl:text-[12rem] font-black tracking-[0.2em] uppercase leading-[0.85] text-white/90"
              >
                Silent
                <br />
                Hill
              </h1>
              <div className="mt-8 w-16 h-px bg-red-900/30" />
              <p className="mt-6 text-base xl:text-lg tracking-[0.15em] text-white/50 uppercase italic">
                There was a hole here. It's gone now.
              </p>
            </div>
          </div>

          <div className="w-screen h-screen shrink-0 flex flex-col items-center justify-center px-12 xl:px-24 relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(80,0,0,0.08)_0%,transparent_70%)] pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-px bg-red-900/15" />
            <p className="reveal-text text-[0.65rem] uppercase tracking-[0.6em] text-red-800/60 mb-10 font-bold animate-[flicker_6s_linear_infinite]">
              Brookhaven Hospital
            </p>
            <h2 className="reveal-text text-5xl xl:text-7xl font-black text-center leading-[1.1] max-w-3xl tracking-[0.08em] text-white/80">
              El óxido de
              <br />
              <span className="font-normal italic text-white/40 tracking-[0.12em]">
                la mente
              </span>
            </h2>
            <div className="mt-8 w-12 h-px bg-red-900/20" />
            <p className="reveal-text mt-8 text-sm xl:text-base text-white/40 text-center max-w-lg leading-relaxed tracking-[0.05em] italic">
              Los pasillos se retuercen sobre sí mismos. Las paredes respiran.
              La realidad se deshace capa por capa, revelando lo que siempre
              estuvo debajo.
            </p>
          </div>

          <div className="seccion-prision w-screen h-screen shrink-0 relative overflow-hidden flex items-center justify-center">
            <img
              src="/prison1.webp"
              alt=""
              className="prison-bg absolute inset-0 w-[110%] h-[110%] object-cover opacity-20 -left-[5%] -top-[5%] transform-gpu"
            />
            <img
              src="/prison2.jpg"
              alt=""
              className="prison-fg absolute bottom-8 right-8 w-[45%] h-auto opacity-50 transform-gpu"
            />
            <div className="relative z-10 flex flex-col items-center text-center px-12">
              <p className="reveal-text text-[0.65rem] uppercase tracking-[0.6em] text-red-800/60 mb-10 font-bold">
                Prisión Toluca
              </p>
              <h2 className="reveal-text text-5xl xl:text-7xl font-black leading-[1.1] max-w-3xl tracking-[0.08em] text-white/80">
                El peso de
                <br />
                <span className="font-normal italic text-white/40 tracking-[0.12em]">
                  la culpa
                </span>
              </h2>
              <div className="mt-8 w-12 h-px bg-red-900/20" />
              <p className="reveal-text mt-8 text-sm xl:text-base text-white/40 text-center max-w-lg leading-relaxed tracking-[0.05em] italic">
                Nadie te encerró aquí. Tú mismo construiste los barrotes. Cada
                celda tiene tu nombre.
              </p>
            </div>
          </div>

          <div className="seccion-verdad w-screen h-screen shrink-0 relative flex items-center justify-center bg-black overflow-hidden">
            <video
              ref={tintaVideoRef}
              src="/tinta.mp4"
              loop
              muted
              playsInline
              style={{ opacity: 0, visibility: "hidden" }}
              className="absolute inset-0 w-full h-full object-cover z-0 scale-110 transform-gpu backface-hidden"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-black/30 z-1 pointer-events-none" />
            <h2 className="reveal-text relative z-10 text-[10rem] xl:text-[16rem] font-black uppercase leading-[0.8] text-red-700 tracking-[0.15em] text-center">
              La
              <br />
              Verdad
            </h2>
          </div>
        </div>
      </div>

      <div className="md:hidden flex flex-col">
        <div className="seccion-hero relative h-[70vh] flex items-center bg-black overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent pointer-events-none" />
          <div className="relative z-10 flex flex-col justify-center px-8 pt-16">
            <h1 className="text-[5rem] font-black tracking-[0.15em] uppercase leading-[0.85] text-white/90">
              Silent
              <br />
              Hill
            </h1>
            <div className="mt-6 w-12 h-px bg-red-900/30" />
            <p className="mt-5 text-xs tracking-[0.15em] text-white/50 uppercase italic">
              There was a hole here. It's gone now.
            </p>
          </div>
        </div>

        {mobileSections.map((sec) => (
          <div
            key={sec.label}
            className="relative min-h-[70vh] flex flex-col items-center justify-center px-8 py-12 bg-[#030303]"
          >
            {sec.image && (
              <img
                src={sec.image}
                alt=""
                className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none"
              />
            )}
            <div className="relative z-10 flex flex-col items-center text-center">
              <p className="text-[0.6rem] uppercase tracking-[0.6em] text-red-800/60 mb-8 font-bold">
                {sec.label}
              </p>
              <h2 className="text-4xl font-black leading-[1.1] tracking-[0.08em] text-white/80">
                {sec.title}
              </h2>
              <div className="mt-6 w-10 h-px bg-red-900/20" />
              <p className="mt-6 text-sm text-white/40 max-w-sm leading-relaxed tracking-wide italic">
                {sec.body}
              </p>
            </div>
          </div>
        ))}

        <div className="relative min-h-[60vh] flex items-center justify-center bg-black overflow-hidden">
          <h2 className="text-[4rem] font-black uppercase leading-[0.8] text-red-700 tracking-widest text-center">
            La
            <br />
            Verdad
          </h2>
        </div>
      </div>
    </>
  );
});
