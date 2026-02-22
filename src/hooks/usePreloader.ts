import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function usePreloader() {
    const preloaderRef = useRef<HTMLDivElement>(null);
    const heroTitleRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
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
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return { preloaderRef, heroTitleRef };
}
