"use client";

import { useEffect, useRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
}

export default function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const dirClass =
    direction === "left"
      ? "opacity-0 -translate-x-8"
      : direction === "right"
      ? "opacity-0 translate-x-8"
      : direction === "none"
      ? "opacity-0"
      : "opacity-0 translate-y-8";

  return (
    <div
      ref={ref}
      className={cn(
        dirClass,
        "transition-all duration-700 ease-out",
        "data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0 data-[visible=true]:translate-x-0",
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
      data-visible="false"
      onTransitionEnd={() => {}}
    >
      {children}
    </div>
  );
}
