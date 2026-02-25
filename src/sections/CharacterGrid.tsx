import { memo, useRef, useState, useCallback, useEffect } from "react";
import { characters } from "@/data/characters";

interface CharacterGridProps {
  onHover?: () => void;
}

function useTilt(cardRef: React.RefObject<HTMLDivElement | null>) {
  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rotateX = (0.5 - y) * 14;
      const rotateY = (x - 0.5) * 14;
      el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03,1.03,1.03)`;

      const shine = el.querySelector<HTMLDivElement>(".card-shine");
      if (shine) {
        shine.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.12) 0%, transparent 60%)`;
        shine.style.opacity = "1";
      }
    },
    [cardRef],
  );

  const handleLeave = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform =
      "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    const shine = el.querySelector<HTMLDivElement>(".card-shine");
    if (shine) shine.style.opacity = "0";
  }, [cardRef]);

  return { handleMove, handleLeave };
}

function TiltCard({
  char,
  index,
  onHover,
}: {
  char: (typeof characters)[0];
  index: number;
  onHover?: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { handleMove, handleLeave } = useTilt(cardRef);

  return (
    <div
      ref={cardRef}
      className="group relative cursor-pointer transition-transform duration-300 ease-out will-change-transform"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onMouseEnter={onHover}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="relative w-full aspect-[3/4.5] overflow-hidden">
        <img
          src={char.image}
          alt={char.name}
          className="absolute inset-0 w-full h-full object-contain object-bottom transition-transform duration-[1.2s] ease-out group-hover:scale-[1.08] transform-gpu"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-red-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="card-shine absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300" />

        <div className="absolute top-5 left-5">
          <div className="flex items-center gap-2">
            <div className="w-4 h-px bg-red-900/60 group-hover:w-8 group-hover:bg-red-700/80 transition-all duration-500" />
            <span className="text-[0.5rem] uppercase tracking-[0.5em] text-red-900/60 group-hover:text-red-700/90 transition-colors duration-500 font-bold">
              #{String(index + 1).padStart(3, "0")}
            </span>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 border border-red-900/50 group-hover:border-red-600/80 group-hover:bg-red-900/30 transition-all duration-500 rotate-45" />
            <p className="text-[0.70rem] uppercase tracking-[0.5em] text-red-900/70 group-hover:text-red-700 group-hover:font-bold transition-colors duration-500">
              {char.role}
            </p>
          </div>
          <h3 className="text-xl font-black tracking-[0.15em] uppercase text-white/90 group-hover:text-white transition-colors duration-500">
            {char.name}
          </h3>
          <div className="mt-3 w-0 h-px bg-red-800/50 group-hover:w-full transition-all duration-700 ease-out" />
          <p className="text-[0.75rem] text-white/40 mt-3 leading-relaxed italic translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100 tracking-wide">
            "{char.description}"
          </p>
        </div>

        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)",
          }}
        />
      </div>
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-red-900/0 to-transparent group-hover:via-red-800/40 transition-all duration-700" />
    </div>
  );
}

function MobileCarousel() {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);

  const goTo = useCallback((idx: number) => {
    const clamped = Math.max(0, Math.min(idx, characters.length - 1));
    setActive(clamped);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.style.transform = `translateX(-${active * 100}%)`;
  }, [active]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };

  const onTouchEnd = () => {
    if (touchDeltaX.current < -50) goTo(active + 1);
    else if (touchDeltaX.current > 50) goTo(active - 1);
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div
        ref={trackRef}
        className="flex transition-transform duration-500 ease-out"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {characters.map((c, i) => (
          <div
            key={c.name}
            className="w-full shrink-0 relative"
            style={{ height: "70vh" }}
          >
            <img
              src={c.image}
              alt={c.name}
              className="absolute inset-0 w-full h-full object-contain object-bottom transform-gpu"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30" />

            <div className="absolute top-5 left-6">
              <div className="flex items-center gap-2">
                <div className="w-4 h-px bg-red-900/60" />
                <span className="text-[0.5rem] uppercase tracking-[0.5em] text-red-900/60 font-bold">
                  #{String(i + 1).padStart(3, "0")}
                </span>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 border border-red-900/50 rotate-45" />
                <p className="text-[0.65rem] uppercase tracking-[0.5em] text-red-900/70">
                  {c.role}
                </p>
              </div>
              <h3 className="text-2xl font-black tracking-[0.15em] uppercase text-white/90">
                {c.name}
              </h3>
              <div className="mt-3 w-16 h-px bg-red-800/50" />
              <p className="text-sm text-white/45 mt-3 leading-relaxed italic tracking-wide">
                "{c.description}"
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* dots */}
      <div className="flex justify-center gap-3 mt-6">
        {characters.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
              i === active ? "bg-red-800/80 scale-125" : "bg-white/15"
            }`}
            aria-label={`Personaje ${i + 1}`}
          />
        ))}
      </div>

      {/* swipe hint */}
      <p className="text-center text-[0.45rem] uppercase tracking-[0.5em] text-white/15 mt-3">
        Desliza ←→
      </p>
    </div>
  );
}

export const CharacterGrid = memo(function CharacterGrid({
  onHover,
}: CharacterGridProps) {
  return (
    <section className="relative w-full min-h-screen bg-[#030303] py-16 md:py-32 z-10 flex flex-col items-center">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(80,0,0,0.06)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-red-900/20" />

      <div className="flex flex-col items-center text-center z-10 px-6">
        <p className="text-[0.5rem] uppercase tracking-[0.7em] text-red-900/50 mb-3">
          Expedientes del caso #73
        </p>
        <p className="text-[0.6rem] uppercase tracking-[0.6em] text-red-900/60 mb-5">
          — Archivo de Casos —
        </p>
        <h2 className="text-3xl xl:text-5xl font-black tracking-[0.25em] uppercase text-white/80">
          Almas Perdidas
        </h2>
        <div className="mt-6 w-10 h-px bg-red-900/20" />
        <p className="mt-5 text-sm tracking-[0.08em] text-white/40 max-w-sm italic">
          "Cada monstruo es un espejo de lo que no quieres ver."
        </p>
      </div>

      {/* desktop: grid with 3D tilt */}
      <div className="hidden md:grid grid-cols-2 xl:grid-cols-4 gap-0 w-full max-w-[90vw] mt-16 z-10">
        {characters.map((char, index) => (
          <TiltCard
            key={char.name}
            char={char}
            index={index}
            onHover={onHover}
          />
        ))}
      </div>

      {/* mobile: swipeable carousel */}
      <div className="md:hidden w-full mt-10 z-10">
        <MobileCarousel />
      </div>
    </section>
  );
});
