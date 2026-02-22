import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface HorizontalScrollRefs {
    tintaVideoRef: React.RefObject<HTMLVideoElement | null>;
    splineContainerRef: React.RefObject<HTMLDivElement | null>;
}

export function useHorizontalScroll({ tintaVideoRef, splineContainerRef }: HorizontalScrollRefs) {
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const track = trackRef.current;
        const container = containerRef.current;
        if (!track || !container) return;

        const ctx = gsap.context(() => {
            const horizontalTween = gsap.to(track, {
                x: () => -(track.scrollWidth - window.innerWidth),
                ease: "none",
                scrollTrigger: {
                    trigger: container,
                    pin: true,
                    scrub: 1,
                    end: () => "+=" + (track.scrollWidth - window.innerWidth),
                    invalidateOnRefresh: true,
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

            ScrollTrigger.create({
                trigger: ".seccion-hero",
                containerAnimation: horizontalTween,
                start: "left left",
                end: "right left",
                onLeave: () => {
                    gsap.set(splineContainerRef.current, { opacity: 0 });
                },
                onEnterBack: () => {
                    gsap.set(splineContainerRef.current, { opacity: 1 });
                },
            });
        }, container);

        return () => ctx.revert();
    }, []);

    return { containerRef, trackRef };
}
