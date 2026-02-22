import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function usePreloader() {
    const preloaderRef = useRef<HTMLDivElement>(null);
    const heroTitleRef = useRef<HTMLHeadingElement>(null);
    const [splineLoaded, setSplineLoaded] = useState(false);

    useEffect(() => {
        if (!splineLoaded) return;

        const timer = setTimeout(() => {
            gsap.to(preloaderRef.current, {
                opacity: 0,
                duration: 1.5,
                ease: "power2.inOut",
                onComplete: () => {
                    gsap.set(preloaderRef.current, { display: "none" });
                    gsap.from(heroTitleRef.current, {
                        y: 30,
                        opacity: 0,
                        duration: 2,
                        ease: "power3.out",
                    });
                    ScrollTrigger.refresh();
                },
            });
        }, 800);

        return () => clearTimeout(timer);
    }, [splineLoaded]);

    return { preloaderRef, heroTitleRef, splineLoaded, setSplineLoaded };
}
