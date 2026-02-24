import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface HorizontalScrollRefs {
    tintaVideoRef: React.RefObject<HTMLVideoElement | null>;
}

export function useHorizontalScroll({ tintaVideoRef }: HorizontalScrollRefs) {
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const track = trackRef.current;
        const container = containerRef.current;
        if (!track || !container) return;
        if (window.innerWidth < 768) return;

        const ctx = gsap.context(() => {
            const horizontalTween = gsap.to(track, {
                x: () => -(track.scrollWidth - window.innerWidth),
                ease: "none",
                scrollTrigger: {
                    trigger: container,
                    pin: true,
                    scrub: 0.3,
                    end: () => "+=" + (track.scrollWidth - window.innerWidth),
                    invalidateOnRefresh: true,
                    refreshPriority: 1,
                },
            });

            gsap.utils.toArray<HTMLElement>(".reveal-text").forEach((text) => {
                gsap.from(text, {
                    y: 50,
                    opacity: 0,
                    duration: 1.5,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: text,
                        containerAnimation: horizontalTween,
                        start: "left center+=200",
                        toggleActions: "play none none reverse",
                    },
                });
            });

            gsap.to(".prison-bg", {
                x: "15%",
                ease: "none",
                force3D: true,
                scrollTrigger: {
                    trigger: ".seccion-prision",
                    containerAnimation: horizontalTween,
                    start: "left right",
                    end: "right left",
                    scrub: true,
                },
            });

            gsap.to(".prison-fg", {
                x: "-40%",
                ease: "none",
                force3D: true,
                scrollTrigger: {
                    trigger: ".seccion-prision",
                    containerAnimation: horizontalTween,
                    start: "left right",
                    end: "right left",
                    scrub: true,
                },
            });

            ScrollTrigger.create({
                trigger: ".seccion-verdad",
                containerAnimation: horizontalTween,
                start: "left right",
                end: "right left",
                onEnter: () => {
                    gsap.set(tintaVideoRef.current, { autoAlpha: 0.85 });
                    tintaVideoRef.current?.play();
                },
                onLeave: () => {
                    tintaVideoRef.current?.pause();
                    gsap.set(tintaVideoRef.current, { autoAlpha: 0 });
                },
                onEnterBack: () => {
                    gsap.set(tintaVideoRef.current, { autoAlpha: 0.85 });
                    tintaVideoRef.current?.play();
                },
                onLeaveBack: () => {
                    tintaVideoRef.current?.pause();
                    gsap.set(tintaVideoRef.current, { autoAlpha: 0 });
                },
            });
        }, container);

        return () => ctx.revert();
    }, []);

    return { containerRef, trackRef };
}
