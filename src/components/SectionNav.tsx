import { memo, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SECTIONS = [
  { id: "intro", label: "Inicio" },
  { id: "personajes", label: "Almas Perdidas" },
  { id: "galeria", label: "Galería" },
  { id: "lore", label: "Lore" },
  { id: "bestiario", label: "Bestiario" },
  { id: "zoom", label: "Silent Hill" },
  { id: "footer", label: "Final" },
];

export const SectionNav = memo(function SectionNav() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    const timer = setTimeout(() => {
      const sections = document.querySelectorAll("[data-section]");

      sections.forEach((section, i) => {
        const st = ScrollTrigger.create({
          trigger: section as HTMLElement,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActive(i),
          onEnterBack: () => setActive(i),
        });
        triggers.push(st);
      });
    }, 500);

    return () => {
      clearTimeout(timer);
      triggers.forEach((st) => st.kill());
    };
  }, []);

  const scrollTo = (index: number) => {
    const sections = document.querySelectorAll("[data-section]");
    const target = sections[index] as HTMLElement;
    if (!target) return;

    gsap.to(window, {
      scrollTo: { y: target, offsetY: 0 },
      duration: 1.5,
      ease: "power3.inOut",
    });
  };

  return (
    <nav className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 z-50 flex-col items-end gap-4 pointer-events-auto">
      {SECTIONS.map((section, i) => (
        <button
          key={section.id}
          onClick={() => scrollTo(i)}
          className="group flex items-center gap-3 cursor-pointer"
          aria-label={`Ir a ${section.label}`}
        >
          <span
            className={`text-[0.4rem] uppercase tracking-[0.4em] transition-all duration-500 ${
              active === i
                ? "text-white/50 translate-x-0"
                : "text-transparent group-hover:text-white/30 translate-x-2 group-hover:translate-x-0"
            }`}
          >
            {section.label}
          </span>
          <div className="relative flex items-center justify-center w-3 h-3">
            <div
              className={`rounded-full transition-all duration-500 ${
                active === i
                  ? "w-2 h-2 bg-red-800/80"
                  : "w-1.5 h-1.5 bg-white/15 group-hover:bg-white/40"
              }`}
            />
            {active === i && (
              <div className="absolute inset-0 rounded-full border border-red-900/30 animate-ping" />
            )}
          </div>
        </button>
      ))}
    </nav>
  );
});
