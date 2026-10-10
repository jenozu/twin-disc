/** Lightweight reveal behaviour without a scroll-jacking library. */
let observer: IntersectionObserver | null = null;
let scrollHandler: (() => void) | null = null;
let motionPreference: MediaQueryList | null = null;
let preferenceHandler: (() => void) | null = null;

export const teardownMotion = () => {
  observer?.disconnect();
  observer = null;
  if (scrollHandler) window.removeEventListener("scroll", scrollHandler);
  scrollHandler = null;
  if (motionPreference && preferenceHandler) {
    motionPreference.removeEventListener("change", preferenceHandler);
  }
  motionPreference = null;
  preferenceHandler = null;
  document.documentElement.removeAttribute("data-motion");
  document.querySelector(".site-header")?.classList.remove("is-scrolled");
};

export const bootMotion = () => {
  teardownMotion();
  motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
  const revealElements = [...document.querySelectorAll<HTMLElement>("[data-reveal]")];
  const updateHeader = () => {
    document.querySelector(".site-header")?.classList.toggle("is-scrolled", window.scrollY > 16);
  };
  scrollHandler = updateHeader;
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  const showAll = () => {
    revealElements.forEach((element) => element.classList.add("is-visible"));
  };
  const observe = () => {
    observer?.disconnect();
    observer = null;
    if (motionPreference?.matches || !("IntersectionObserver" in window)) {
      document.documentElement.dataset.motion = "reduced";
      showAll();
      return;
    }
    document.documentElement.dataset.motion = "enhanced";
    observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("is-visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -24px 0px" },
    );
    revealElements.forEach((element) => {
      if (element.getBoundingClientRect().top < window.innerHeight) {
        element.classList.add("is-visible");
      } else {
        observer?.observe(element);
      }
    });
  };
  preferenceHandler = observe;
  motionPreference.addEventListener("change", preferenceHandler);
  observe();
};

export const isMotionInitialized = () => document.documentElement.dataset.motion === "enhanced";
