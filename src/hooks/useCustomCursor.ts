import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";

export function useCustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;
        if (window.innerWidth < 768) return;

        gsap.set(cursor, { xPercent: -50, yPercent: -50 });

        const xTo = gsap.quickTo(cursor, "x", { duration: 0.2, ease: "power3" });
        const yTo = gsap.quickTo(cursor, "y", { duration: 0.2, ease: "power3" });

        const handleMouseMove = (e: MouseEvent) => {
            xTo(e.clientX);
            yTo(e.clientY);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return { cursorRef };
}
