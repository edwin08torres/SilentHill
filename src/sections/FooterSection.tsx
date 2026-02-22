import { memo } from "react";

export const FooterSection = memo(function FooterSection() {
  return (
    <section className="h-screen w-full relative flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[url('/gruge.jpg')] bg-cover bg-center transform-gpu translate-z-0" />
      <div className="absolute inset-0 bg-black/85" />

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04] animate-[fog-drift_25s_ease-in-out_infinite] transform-gpu"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 40%, transparent 100%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-8 max-w-2xl">
        <p className="text-[0.5rem] uppercase tracking-[0.7em] text-red-900/60 mb-3">
          Recepción — Hotel Lakeview
        </p>
        <p className="text-[0.6rem] uppercase tracking-[0.6em] text-red-900/50 mb-8">
          Carta encontrada bajo la puerta, Hab. 312
        </p>
        <h2 className="text-3xl xl:text-5xl font-black tracking-[0.25em] uppercase text-white/70 leading-tight">
          Encuéntrame
          <br />
          <span className="font-normal italic text-white/40">en la niebla</span>
        </h2>
        <div className="mt-10 w-8 h-px bg-red-900/15" />
        <p className="mt-10 text-sm tracking-[0.08em] text-white/45 italic leading-relaxed max-w-md">
          "There was a hole here. It's gone now."
        </p>
        <div className="mt-10 w-6 h-px bg-white/10" />
        <p className="mt-8 text-[0.5rem] tracking-[0.4em] text-white/30 uppercase">
          React · GSAP · Spline · Three.js
        </p>
      </div>
    </section>
  );
});
