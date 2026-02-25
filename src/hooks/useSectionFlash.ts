import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useSectionFlash() {
    useLayoutEffect(() => {
        const sections = gsap.utils.toArray<HTMLElement>("section[data-flash]");

        sections.forEach((section) => {
            ScrollTrigger.create({
                trigger: section,
                start: "top 5%",
                once: false,
                onEnter: () => flash(),
                onEnterBack: () => flash(),
            });
        });

        return () => ScrollTrigger.getAll()
            .filter(st => st.vars.id === "section-flash")
            .forEach(st => st.kill());
    }, []);
}

function flash() {
    const el = document.getElementById("section-flash-overlay");
    if (!el) return;

    gsap.killTweensOf(el);
    gsap.timeline()
        .set(el, { opacity: 0.18, display: "block" })
        .to(el, { opacity: 0, duration: 0.25, ease: "power2.out" })
        .set(el, { display: "none" });
}
