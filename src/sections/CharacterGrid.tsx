import { memo } from "react";
import { characters } from "../data/characters";

interface CharacterGridProps {
  onHover?: () => void;
}

export const CharacterGrid = memo(function CharacterGrid({
  onHover,
}: CharacterGridProps) {
  return (
    <section
      data-flash
      className="relative w-full min-h-screen bg-[#030303] py-32 z-10 flex flex-col items-center"
    >
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

      <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-0 w-full max-w-[90vw] mt-16 z-10">
        {characters.map((char, index) => (
          <div
            key={char.name}
            className="group relative cursor-pointer"
            onMouseEnter={onHover}
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
                <div className="mt-3 w-full md:w-0 h-px bg-red-800/50 md:group-hover:w-full transition-all duration-700 ease-out" />
                <p className="text-[0.65rem] md:text-[0.75rem] text-white/40 mt-3 leading-relaxed italic translate-y-0 opacity-100 md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-500 delay-100 tracking-wide">
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
        ))}
      </div>
    </section>
  );
});
