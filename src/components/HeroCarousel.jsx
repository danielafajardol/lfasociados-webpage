// src/components/HeroCarousel.jsx
import { useEffect, useMemo, useRef, useState } from "react";

/**
 * Simple, accessible, auto-playing carousel.
 * - Slides every 5s by default
 * - Loops
 * - Pauses on hover or when window/tab is hidden
 * - Arrow-key navigation (← →)
 * - Dots navigation with aria-controls
 */
export default function HeroCarousel({
  images = [],
  intervalMs = 5000,
  height = 320,
}) {
  const [index, setIndex] = useState(0);
  const trackRef = useRef(null);
  const timerRef = useRef(null);

  const count = images.length;

  // Preload images once
  useEffect(() => {
    images.forEach((img) => {
      if (!img?.src) return;
      const i = new Image();
      i.src = img.src;
    });
  }, [images]);

  // Auto-advance
  useEffect(() => {
    if (count <= 1) return;
    start();
    return stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, count, intervalMs]);

  // Pause when tab is hidden
  useEffect(() => {
    const vis = () => {
      if (document.hidden) stop();
      else start();
    };
    document.addEventListener("visibilitychange", vis);
    return () => document.removeEventListener("visibilitychange", vis);
  }, []);

  const start = () => {
    stop();
    timerRef.current = setTimeout(() => {
      setIndex((i) => (i + 1) % count);
    }, intervalMs);
  };
  const stop = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const goTo = (i) => setIndex(((i % count) + count) % count);
  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  // For reduced motion users, disable transition
  const prefersReducedMotion = useMemo(() => {
    return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  }, []);

  return (
    <div
      className="hero-carousel"
      style={{ height }}
      onMouseEnter={stop}
      onMouseLeave={start}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") { e.preventDefault(); next(); }
        if (e.key === "ArrowLeft")  { e.preventDefault(); prev(); }
      }}
      role="region"
      aria-label="Hero image carousel"
      tabIndex={0}
    >
      <div
        ref={trackRef}
        className={`hero-carousel-track${prefersReducedMotion ? " no-motion" : ""}`}
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((img, i) => {
          const isLogo = img?.alt?.toLowerCase().includes("logo");
          return (
            <div className="hero-carousel-slide" key={i} aria-hidden={i !== index}>
              {img?.src ? (
                <img
                  src={img.src}
                  alt={img?.alt || ""}
                  loading="eager"
                  className={isLogo ? "contain" : ""}
                />
              ) : (
                <div className="hero-carousel-placeholder">Add images…</div>
              )}
            </div>
          );
        })}
      </div>

      {/* Dots */}
      <div className="hero-carousel-dots" role="tablist" aria-label="Hero slides">
        {images.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === index ? "active" : ""}`}
            role="tab"
            aria-selected={i === index}
            aria-controls={`hero-slide-${i}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  );
}
