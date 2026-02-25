import { memo, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const ScrollProgress = memo(function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        gsap.set(bar, { scaleY: self.progress });
      },
    });

    return () => st.kill();
  }, []);

  return (
    <div className="fixed top-0 right-0 w-[2px] h-full z-50 pointer-events-none">
      <div
        ref={barRef}
        className="w-full h-full origin-top bg-red-900/40"
        style={{ transform: "scaleY(0)" }}
      />
    </div>
  );
});
