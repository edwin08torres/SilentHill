import { characters } from "../data/characters";

export function CharacterGrid() {
  return (
    <section className="relative w-full min-h-screen bg-[#030303] py-32 z-10 flex flex-col items-center">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(80,0,0,0.06)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-red-900/20" />

      <div className="flex flex-col items-center text-center z-10 px-6">
        <p className="text-[0.5rem] uppercase tracking-[0.7em] text-red-900/30 mb-3">
          Expedientes del caso #73
        </p>
        <p className="text-[0.6rem] uppercase tracking-[0.6em] text-red-900/40 mb-5">
          — Archivo de Casos —
        </p>
        <h2 className="text-3xl xl:text-5xl font-black tracking-[0.25em] uppercase text-white/80">
          Almas Perdidas
        </h2>
        <div className="mt-6 w-10 h-px bg-red-900/20" />
        <p className="mt-5 text-sm tracking-[0.08em] text-white/20 max-w-sm italic">
          "Cada monstruo es un espejo de lo que no quieres ver."
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 w-full max-w-[90vw] mt-16 z-10">
        {characters.map((char) => (
          <div
            key={char.name}
            className="relative w-full aspect-3/4 bg-zinc-900 overflow-hidden group cursor-pointer border border-white/5 transition-all duration-700 hover:border-red-900/30"
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-red-900/20 group-hover:bg-red-800/40 transition-colors duration-700" />
            <div
              className="absolute inset-0 bg-contain bg-bottom bg-no-repeat grayscale opacity-60 transition-all duration-700 group-hover:grayscale-[0.3] group-hover:scale-110 group-hover:opacity-100 group-hover:sepia-[0.2]"
              style={{ backgroundImage: `url('${char.image}')` }}
            />
            <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 w-full">
              <p className="text-[0.55rem] uppercase tracking-[0.4em] text-red-900/50 mb-2">
                {char.role}
              </p>
              <h3 className="text-lg font-black tracking-widest uppercase text-white/90">
                {char.name}
              </h3>
              <p className="text-sm text-white/50 mt-2 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 italic">
                "{char.description}"
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
