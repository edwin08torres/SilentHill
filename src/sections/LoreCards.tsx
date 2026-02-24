import { memo, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  {
    title: "La Niebla",
    description:
      "No es solo clima. Es el velo entre lo que quieres ver y lo que realmente existe. Cuanto más te adentras, menos puedes distinguir la realidad de tu propia mente.",
    bg: "bg-zinc-900",
  },
  {
    title: "El Otro Mundo",
    description:
      "Debajo de cada superficie limpia hay otra capa: óxido, sangre seca, metal retorcido. El Otro Mundo no aparece — siempre estuvo ahí, esperando que dejaras de mirar hacia otro lado.",
    bg: "bg-zinc-950",
  },
  {
    title: "La Culpa",
    description:
      "Silent Hill no crea monstruos. Tú los traes contigo. Cada criatura, cada pesadilla, es un espejo de lo que intentaste enterrar. La ciudad solo te obliga a mirar.",
    bg: "bg-black",
  },
];

export const LoreCards = memo(function LoreCards() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsWrapperRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const wrapper = cardsWrapperRef.current;
    const cards = gsap.utils.toArray<HTMLElement>(".lore-card");

    if (!section || !wrapper || cards.length === 0) return;
    if (window.innerWidth < 768) return;

    const ctx = gsap.context(() => {
      gsap.set(cards[1], { yPercent: 100, autoAlpha: 1 });
      gsap.set(cards[2], { yPercent: 100, autoAlpha: 1 });

      cards.forEach((card) => {
        gsap.set(card, { transformOrigin: "top center" });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: 1,
        },
      });

      tl.to(cards[1], { yPercent: 0, ease: "none" }, 0).to(
        cards[0],
        {
          scale: 0.9,
          y: -20,
          filter: "brightness(0.3)",
          ease: "none",
        },
        0,
      );

      tl.to(cards[2], { yPercent: 0, ease: "none" }, 1)
        .to(
          cards[1],
          {
            scale: 0.94,
            y: -10,
            filter: "brightness(0.4)",
            ease: "none",
          },
          1,
        )
        .to(
          cards[0],
          {
            scale: 0.82,
            y: -40,
            filter: "brightness(0.1)",
            ease: "none",
          },
          1,
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#030303] h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="absolute top-16 left-1/2 -translate-x-1/2 text-center z-0 w-full pointer-events-none">
        <p className="text-[0.65rem] uppercase tracking-[0.6em] text-red-800/60 font-bold mb-4">
          Fragmentos
        </p>
        <h2 className="text-3xl md:text-4xl xl:text-6xl font-black tracking-[0.12em] text-white/85 uppercase">
          El Lore
        </h2>
      </div>

      <div
        ref={cardsWrapperRef}
        className="relative w-[90vw] max-w-5xl h-[60vh] md:h-[70vh] mt-16 overflow-hidden rounded-[2rem]"
      >
        {CARDS.map((card, i) => (
          <div
            key={card.title}
            className={`lore-card absolute inset-0 w-full h-full border border-white/10 ${card.bg} shadow-[0_-30px_60px_rgba(0,0,0,0.9)] will-change-transform`}
            style={{ zIndex: i + 1 }}
          >
            <div className="absolute bottom-0 left-0 w-full p-10 xl:p-16 flex flex-col justify-end bg-gradient-to-t from-black via-black/60 to-transparent h-full">
              <div className="w-10 h-px bg-red-900/40 mb-5" />
              <h3 className="text-2xl md:text-3xl xl:text-5xl font-black tracking-widest text-white/90 uppercase mb-3 md:mb-5">
                {card.title}
              </h3>
              <p className="text-xs md:text-sm xl:text-base text-white/40 max-w-lg leading-relaxed tracking-wide italic">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});
