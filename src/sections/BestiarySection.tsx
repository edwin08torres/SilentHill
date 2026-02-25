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
  const desktopSectionRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  const mobileSectionRef = useRef<HTMLDivElement>(null);
  const mobileViewportRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const isMobile = window.innerWidth < 768;

    if (!isMobile) {
      const section = desktopSectionRef.current;
      const sidebar = sidebarRef.current;
      const rightCol = rightColRef.current;
      if (!section || !sidebar || !rightCol) return;

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
    }

    const mobileSection = mobileSectionRef.current;
    const mobileViewport = mobileViewportRef.current;
    if (!mobileSection || !mobileViewport) return;

    const totalScroll = window.innerHeight * CREATURES.length;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: mobileSection,
        start: "top top",
        end: `+=${totalScroll}`,
        pin: mobileViewport,
        pinSpacing: false,
      });

      const mobileItems = gsap.utils.toArray<HTMLElement>(".mobile-creature");

      gsap.set(mobileItems, { autoAlpha: 0, y: 40 });
      gsap.set(mobileItems[0], { autoAlpha: 1, y: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mobileSection,
          start: "top top",
          end: `+=${totalScroll}`,
          scrub: 1,
        },
      });

      for (let i = 0; i < mobileItems.length - 1; i++) {
        const pos = i;
        tl.to(
          mobileItems[i],
          { autoAlpha: 0, y: -40, ease: "power2.in" },
          pos,
        ).fromTo(
          mobileItems[i + 1],
          { autoAlpha: 0, y: 40 },
          { autoAlpha: 1, y: 0, ease: "power2.out" },
          pos + 0.3,
        );
      }
    }, mobileSection);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div
        ref={mobileSectionRef}
        className="md:hidden relative bg-[#030303]"
        style={{ height: `${(CREATURES.length + 1) * 100}vh` }}
      >
        <div
          ref={mobileViewportRef}
          className="h-screen w-full overflow-hidden relative"
        >
          <img
            src="/nurse.png"
            alt="Nurse"
            className="absolute inset-0 w-full h-full object-cover object-center grayscale opacity-25 pointer-events-none"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-black/60 pointer-events-none" />

          <div className="relative z-10 h-full flex flex-col px-8 pt-16">
            <p className="text-[0.6rem] uppercase tracking-[0.6em] text-red-800/60 font-bold mb-3">
              Registros Médicos
            </p>
            <h2
              className="text-4xl font-black tracking-widest text-white/90 uppercase mb-12"
              style={{ fontFamily: "'Cinzel', Georgia, serif" }}
            >
              Anomalías
            </h2>

            <div className="relative flex-1">
              {CREATURES.map((creature, i) => (
                <div
                  key={creature.name}
                  className="mobile-creature absolute inset-x-0 bottom-0 flex flex-col justify-end pb-16"
                >
                  <div className="bg-black/50 backdrop-blur-md rounded-xl p-5 mx-2">
                    <p className="text-[0.6rem] uppercase tracking-[0.5em] text-red-800/40 font-bold mb-4">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="text-xl font-bold tracking-widest text-white/85 uppercase mb-3">
                      {creature.name}
                    </h3>
                    <div className="w-10 h-px bg-red-900/40 mb-4" />
                    <p className="text-sm text-white/50 leading-relaxed tracking-wide italic max-w-xs">
                      {creature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section
        ref={desktopSectionRef}
        className="hidden md:block relative w-full bg-[#030303] py-32"
      >
        <div className="max-w-7xl mx-auto px-12 flex flex-row gap-24 items-start">
          <div
            ref={sidebarRef}
            className="w-5/12 flex flex-col gap-6 will-change-transform"
          >
            <p className="text-[0.65rem] uppercase tracking-[0.6em] text-red-800/60 font-bold">
              Registros Médicos
            </p>
            <h2
              className="text-5xl xl:text-7xl font-black tracking-widest text-white/90 uppercase"
              style={{ fontFamily: "'Cinzel', Georgia, serif" }}
            >
              Anomalías
            </h2>
            <img
              src="/nurse.png"
              alt="Nurse"
              className="w-full aspect-4/5 object-contain rounded-2xl grayscale opacity-60 mt-4 border border-white/10"
            />
          </div>

          <div ref={rightColRef} className="w-7/12 flex flex-col">
            {CREATURES.map((creature, i) => (
              <div
                key={creature.name}
                className="bestiary-item min-h-screen flex flex-col justify-center py-24"
                style={{ paddingTop: i === 0 ? "4rem" : undefined }}
              >
                <p className="text-[0.6rem] uppercase tracking-[0.5em] text-red-800/40 font-bold mb-6">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="text-2xl font-bold tracking-widest text-white/80 uppercase mb-4">
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
    </>
  );
});
