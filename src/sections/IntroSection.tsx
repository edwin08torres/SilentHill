export function IntroSection() {
  return (
    <section className="h-screen w-full relative flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[url('/forest.jpg')] bg-cover bg-center grayscale-[0.7] contrast-125 transform-gpu translate-z-0" />
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 flex flex-col items-center text-center px-8 max-w-3xl">
        <p className="text-[0.55rem] uppercase tracking-[0.7em] text-red-900/40 mb-10">
          Silent Hill Tribute
        </p>
        <p className="text-lg xl:text-2xl italic text-white/50 leading-relaxed tracking-wide">
          "In my restless dreams,
        </p>
        <p className="text-lg xl:text-2xl italic text-white/50 leading-relaxed tracking-wide">
          I see that town."
        </p>
        <div className="mt-8 w-12 h-px bg-red-900/20" />
        <h1 className="mt-8 text-[4rem] xl:text-[8rem] font-black tracking-[0.5em] uppercase leading-none text-white/90 drop-shadow-[0_0_100px_rgba(120,0,0,0.1)]">
          Silent Hill
        </h1>
        <p className="mt-10 text-xs tracking-[0.3em] text-white/20 uppercase">
          Desciende
        </p>
        <div className="mt-8 flex flex-col items-center gap-1 animate-bounce">
          <span className="block w-px h-12 bg-red-900/30" />
          <span className="block w-1 h-1 rounded-full bg-red-900/40" />
        </div>
      </div>
    </section>
  );
}
