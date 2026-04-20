/**
 * Scroll-driven custom properties (see site.css :root).
 * Requires: .hero, .section-two in the document.
 */
(function initScrollDrivenLayers() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const root = document.documentElement;
  const hero = document.querySelector(".hero");
  const sectionTwo = document.querySelector(".section-two");
  if (!hero || !sectionTwo) return;

  const SCROLL = {
    parallaxFactor: 0.12,
    parallaxMaxVh: 0.18,
    atmosphereViewportDivisor: 0.9,
    atmosphereOpacityMin: 0.34,
    atmosphereOpacityRange: 0.24,
  };

  let ticking = false;

  function updateScrollVars() {
    const scrollY = window.scrollY || 0;
    const vh = window.innerHeight || 1;

    const heroParallax = Math.min(
      scrollY * SCROLL.parallaxFactor,
      vh * SCROLL.parallaxMaxVh
    );
    root.style.setProperty("--hero-parallax", `${heroParallax}px`);

    const rect = sectionTwo.getBoundingClientRect();
    const rawProgress = 1 - rect.top / (vh * SCROLL.atmosphereViewportDivisor);
    const progress = Math.max(0, Math.min(1, rawProgress));
    const atmo =
      SCROLL.atmosphereOpacityMin + progress * SCROLL.atmosphereOpacityRange;
    root.style.setProperty("--section-two-atmo", String(atmo));
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      updateScrollVars();
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  updateScrollVars();
})();
