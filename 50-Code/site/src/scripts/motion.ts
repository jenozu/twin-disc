import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;
let initialized = false;

const reducedMotionQuery = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const tick = (time: number) => {
  lenis?.raf(time * 1000);
};

const initRevealHooks = () => {
  const revealElements = gsap.utils.toArray<HTMLElement>("[data-reveal]");

  revealElements.forEach((element) => {
    const y = Number(element.dataset.revealY ?? 18);
    const delay = Number(element.dataset.revealDelay ?? 0);

    gsap.fromTo(
      element,
      { autoAlpha: 0, y },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.72,
        delay,
        ease: "power3.out",
        clearProps: "transform,opacity,visibility",
        scrollTrigger: {
          trigger: element,
          start: "top 88%",
          once: true,
        },
      },
    );
  });
};

export const teardownMotion = () => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  gsap.killTweensOf("[data-reveal]");

  gsap.ticker.remove(tick);

  if (lenis) {
    lenis.destroy();
    lenis = null;
  }

  initialized = false;
  document.documentElement.removeAttribute("data-motion");
};

export const bootMotion = () => {
  teardownMotion();

  if (reducedMotionQuery()) {
    document.documentElement.dataset.motion = "reduced";
    gsap.set("[data-reveal]", { clearProps: "all" });
    return;
  }

  document.documentElement.dataset.motion = "enhanced";

  lenis = new Lenis({
    lerp: 0.085,
    smoothWheel: true,
    anchors: true,
    stopInertiaOnNavigate: true,
    respectReducedMotion: true,
  });

  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  initRevealHooks();
  ScrollTrigger.refresh();
  initialized = true;
};

export const isMotionInitialized = () => initialized;
