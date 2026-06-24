'use client'

import { useRef, CSSProperties } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface BubbleTextProps {
    children: string;
    className?: string;
    style?: CSSProperties;
}

const BubbleText = ({ children, className = "", style }: BubbleTextProps) => {
    const containerRef = useRef<HTMLHeadingElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;
        
        const spans = containerRef.current.querySelectorAll("span");
        
        const enterListeners: (() => void)[] = [];
        const leaveListeners: (() => void)[] = [];

        spans.forEach((span, index) => {
            const handleMouseEnter = () => {
                gsap.to(span, { fontWeight: 900, color: "white", scale: 1.3, y: -10, duration: 0.35 });

                if (index > 0) {
                    gsap.to(spans[index - 1], { fontWeight: 500, color: "white", scale: 1.1, y: -5, duration: 0.35 });
                }
                if (index < spans.length - 1) {
                    gsap.to(spans[index + 1], { fontWeight: 500, color: "white", scale: 1.1, y: -5, duration: 0.35 });
                }
            };

            const handleMouseLeave = () => {
                gsap.to(span, { fontWeight: 100, color: "white", scale: 1, y: 0, duration: 0.35 });

                if (index > 0) {
                    gsap.to(spans[index - 1], { fontWeight: 100, color: "white", scale: 1, y: 0, duration: 0.35 });
                }
                if (index < spans.length - 1) {
                    gsap.to(spans[index + 1], { fontWeight: 100, color: "white", scale: 1, y: 0, duration: 0.35 });
                }
            };

            enterListeners.push(handleMouseEnter);
            leaveListeners.push(handleMouseLeave);

            span.addEventListener("mouseenter", handleMouseEnter);
            span.addEventListener("mouseleave", handleMouseLeave);
        });

        return () => {
            spans.forEach((span, index) => {
                span.removeEventListener("mouseenter", enterListeners[index]);
                span.removeEventListener("mouseleave", leaveListeners[index]);
            });
        };
    }, { scope: containerRef });

    return (
        <h1 ref={containerRef} className={`hover-text ${className}`} style={{ margin: 0, ...style }}>
            {children.split("").map((char, idx) => (
                <span
                    key={idx}
                    style={{
                        fontWeight: 100,
                        color: "white",
                        display: "inline-block",
                    }}
                >
                    {char === " " ? "\u00A0" : char}
                </span>
            ))}
        </h1>
    );
};

export default BubbleText;