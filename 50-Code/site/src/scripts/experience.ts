/* Shared lightweight progressive-enhancement runtime. */
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const items = document.querySelectorAll<HTMLElement>("[data-reveal]");
if (!reduced && "IntersectionObserver" in window) {
  document.documentElement.classList.add("xp-motion");
  const observer = new IntersectionObserver((entries, watcher) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        watcher.unobserve(entry.target);
      }
    }
  }, { threshold: 0.08, rootMargin: "0px 0px -10px 0px" });
  items.forEach((item) => observer.observe(item));
} else {
  items.forEach((item) => item.classList.add("is-visible"));
}
const progress = document.querySelector<HTMLElement>(".xp-reading-progress");
if (progress) {
  let scheduled = false;
  const updateProgress = () => {
    const available = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = available > 0 ? Math.min(1, Math.max(0, window.scrollY / available)) : 0;
    progress.style.transform = "scaleX(" + ratio + ")";
    scheduled = false;
  };
  window.addEventListener("scroll", () => {
    if (!scheduled) { scheduled = true; requestAnimationFrame(updateProgress); }
  }, { passive: true });
  updateProgress();
}