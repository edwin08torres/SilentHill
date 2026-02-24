import { memo, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CREATURES = [
  {
    name: "Bubble Head Nurse",
    description:
      "El uniforme rasgado. La cabeza abultada, deforme, incapaz de sostener el peso de lo que representa. No ataca por maldad — ataca porque fue creada por el deseo reprimido y la culpa sexual de James Sunderland. Es su vergüenza hecha carne.",
  },
  {
    name: "Lying Figure",
    description:
      "Un cuerpo humano retorcido sobre sí mismo, envuelto en su propia piel como una mortaja. No puede erguirse. Nunca podrá. Representa la parálisis total, el colapso del yo ante una realidad demasiado pesada para soportar.",
  },
  {
    name: "Mandarin",
    description:
      "Piernas. Solo piernas. Sin torso, sin cabeza, sin historia. Camina por los pasillos del Otro Mundo como un fragmento de algo que alguna vez fue completo. Lo que queda cuando una persona pierde todo sentido de identidad.",
  },
];

export const BestiarySection = memo(function BestiarySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const sidebar = sidebarRef.current;
    const rightCol = rightColRef.current;
    if (!section || !sidebar || !rightCol) return;
    if (window.innerWidth < 768) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${rightCol.offsetHeight - sidebar.offsetHeight}`,
        pin: sidebar,
        invalidateOnRefresh: true,
      });

      const items = gsap.utils.toArray<HTMLElement>(".bestiary-item");

      items.forEach((item, i) => {
        gsap.fromTo(
          item,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 75%",
              end: "top 35%",
              scrub: 1,
            },
          },
        );

        if (i < items.length - 1) {
          gsap.fromTo(
            item,
            { y: 0, opacity: 1 },
            {
              y: -60,
              opacity: 0,
              ease: "power2.in",
              scrollTrigger: {
                trigger: item,
                start: "bottom 55%",
                end: "bottom 15%",
                scrub: 1,
              },
            },
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-[#030303] py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-16 md:gap-24 items-start">
        <div
          ref={sidebarRef}
          className="w-full md:w-5/12 flex flex-col gap-6 will-change-transform"
        >
          <p className="text-[0.65rem] uppercase tracking-[0.6em] text-red-800/60 font-bold">
            Registros Médicos
          </p>
          <h2
            className="text-4xl md:text-5xl xl:text-7xl font-black tracking-widest text-white/90 uppercase"
            style={{ fontFamily: "'Cinzel', Georgia, serif" }}
          >
            Anomalías
          </h2>
          <img
            src="/nurse.png"
            alt="Eddie"
            className="w-full aspect-4/5 object-contain rounded-2xl grayscale opacity-60 mt-4 border border-white/10"
          />
        </div>

        <div ref={rightColRef} className="w-full md:w-7/12 flex flex-col">
          {CREATURES.map((creature, i) => (
            <div
              key={creature.name}
              className="bestiary-item min-h-[70vh] md:min-h-screen flex flex-col justify-center py-16 md:py-24"
              style={{ paddingTop: i === 0 ? "4rem" : undefined }}
            >
              <p className="text-[0.6rem] uppercase tracking-[0.5em] text-red-800/40 font-bold mb-6">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="text-xl md:text-2xl font-bold tracking-widest text-white/80 uppercase mb-4">
                {creature.name}
              </h3>
              <div className="w-12 h-px bg-red-900/40 mb-6" />
              <p className="text-base text-white/40 leading-relaxed tracking-wide italic max-w-md">
                {creature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
