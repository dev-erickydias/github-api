"use client";

import { useEffect, useRef } from "react";

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const transforms = {
      up: "translateY(40px)",
      down: "translateY(-40px)",
      left: "translateX(-40px)",
      right: "translateX(40px)",
      scale: "scale(0.9)",
    };

    el.style.opacity = "0";
    el.style.transform = transforms[direction] || transforms.up;
    el.style.transition = `all 0.7s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0) translateX(0) scale(1)";
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, direction]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
