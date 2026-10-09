# TWD Website Rework Plan

This document tracks the visual/interactivity rework of the Astro website.

## Goal

Upgrade the existing TWD site from a solid static industrial catalogue into a polished, high-end, interactive technical parts experience without sacrificing clarity, speed, accessibility, or the RFQ-first workflow.

The external design guide is being used primarily for its **Astro-friendly interaction stack**, not its agency/portfolio content structure.

## Rework tech stack

- **Framework:** Astro
- **Styling:** existing plain CSS + design tokens/variables
- **Smooth scroll:** Lenis
- **Scroll animation:** GSAP + ScrollTrigger
- **Lightweight/basic scroll effects:** native CSS where it is the better tool
- **Page transitions:** Astro View Transitions / ClientRouter
- **Motion accessibility:** `prefers-reduced-motion` respected throughout

## Safety / rollback

- Current pre-rework implementation archived on branch: `website-v1-archive`
- Rework branch: `website-premium-v2`
- Existing `website-mvp` branch remains untouched by the rework until we decide to merge
- Each batch gets its own verification checkpoint before moving on

---

# Batch 1 — Foundation + motion infrastructure

## 1.1 Archive and branch setup
- [x] Create `website-v1-archive` from the current website
- [x] Create `website-premium-v2` as the working rework branch
- [x] Add this `rework.md` tracker

## 1.2 Motion dependencies
- [ ] Add GSAP
- [ ] Add ScrollTrigger integration
- [ ] Add Lenis
- [ ] Import Lenis recommended CSS
- [ ] Keep Astro as the framework; no React/Framer dependency

## 1.3 Shared motion runtime
- [ ] Create one reusable motion bootstrap module
- [ ] Synchronize Lenis with GSAP's ticker
- [ ] Synchronize Lenis scroll events with ScrollTrigger
- [ ] Add lifecycle cleanup/re-init for Astro client-side navigation
- [ ] Respect reduced-motion preferences
- [ ] Add reusable `data-reveal` hooks for later batches

## 1.4 View transitions
- [ ] Enable Astro ClientRouter site-wide
- [ ] Add restrained page-transition timing
- [ ] Avoid transitions on reduced-motion preferences

## 1.5 Design/motion tokens
- [ ] Add shared duration/easing/distance tokens
- [ ] Keep the existing industrial colour/typography system
- [ ] Add motion utility classes only; no major page redesign yet

## 1.6 Batch 1 verification
- [ ] `npm install`
- [ ] `npm run build`
- [ ] Verify homepage, catalogue, product page and RFQ still render
- [ ] Verify reduced-motion path
- [ ] Confirm no duplicate animation/Lenis instances after navigation
- [ ] Commit Batch 1 checkpoint

---

# Batch 2 — Homepage + signature interaction

## 2.1 Hero motion
- [ ] Staggered headline/supporting-copy entrance
- [ ] Search UI entrance
- [ ] Very subtle technical-panel depth/parallax
- [ ] Keep hero readable immediately; animation must not block use

## 2.2 Scroll-reveal system
- [ ] Apply consistent reveal rhythm to section headings
- [ ] Apply restrained row/list entrances
- [ ] Avoid animating every element

## 2.3 Product-family showcase
- [ ] Build a premium product-family section for PTO, clutch, pump drive, friction components and drive rings
- [ ] Use sticky/scroll progression only if it improves comprehension
- [ ] Link family exploration back into catalogue search

## 2.4 Signature interaction
- [ ] Build one TWD-specific "Part Identification" scroll sequence
- [ ] Visual flow: machine → engine → PTO/clutch → model/serial → verified part/RFQ
- [ ] Keep it technically useful rather than decorative
- [ ] Provide a simple non-animated fallback

## 2.5 Batch 2 verification
- [ ] Desktop visual review
- [ ] Mobile visual review
- [ ] Scroll performance check
- [ ] Reduced-motion check
- [ ] Build verification and checkpoint commit

---

# Batch 3 — Catalogue + product pages

## 3.1 Catalogue
- [ ] Sticky search/filter tooling
- [ ] Smooth filtering/result transitions
- [ ] Product-family filters
- [ ] Refine result-row hover/focus states
- [ ] Preserve query string behavior
- [ ] Keep part numbers visually dominant

## 3.2 Product pages
- [ ] Refine technical-spec-sheet hierarchy
- [ ] Animate spec/evidence sections subtly
- [ ] Add structured compatibility/evidence blocks where data supports them
- [ ] Add related family/part navigation
- [ ] Improve sticky RFQ panel interaction
- [ ] Do not publish unsupported fitment claims

## 3.3 Batch 3 verification
- [ ] Test all launch product routes
- [ ] Search/filter test
- [ ] Keyboard navigation test
- [ ] Mobile product-page test
- [ ] Build verification and checkpoint commit

---

# Batch 4 — RFQ + micro-interactions + transitions

## 4.1 RFQ experience
- [ ] Refine technical intake hierarchy
- [ ] Progressive visual grouping for Part → Machine → Drive → Contact
- [ ] Contextual helper text
- [ ] Better focus/error/success motion
- [ ] Keep one-page form unless testing proves a wizard is better

## 4.2 Micro-interactions
- [ ] Nav underline/active feedback
- [ ] Button hover/press refinement
- [ ] Row-arrow movement
- [ ] Search-focus transitions
- [ ] Technical-panel status feedback
- [ ] No novelty cursor effects

## 4.3 Page transitions
- [ ] Refine Astro transitions between homepage/catalogue/product/RFQ
- [ ] Keep transition duration short
- [ ] Ensure back/forward navigation behaves correctly

## 4.4 Batch 4 verification
- [ ] RFQ validation test
- [ ] Page navigation test
- [ ] Back/forward browser test
- [ ] Reduced-motion test
- [ ] Build verification and checkpoint commit

---

# Batch 5 — Mobile, accessibility, performance + deployment QA

## 5.1 Responsive QA
- [ ] Mobile navigation
- [ ] Search controls
- [ ] Catalogue rows
- [ ] Product technical sheet
- [ ] RFQ fields
- [ ] Signature interaction fallback

## 5.2 Accessibility
- [ ] Keyboard-only pass
- [ ] Focus-order pass
- [ ] Contrast pass
- [ ] Reduced-motion pass
- [ ] Live-region/form-status pass
- [ ] Semantic structure review

## 5.3 Performance
- [ ] Check JS payload added by motion stack
- [ ] Limit ScrollTrigger instances
- [ ] Avoid unnecessary pinned sections
- [ ] Confirm no layout thrashing/jank
- [ ] Test slower/mobile device behavior
- [ ] Confirm static build remains deployable behind existing Traefik/Nginx container

## 5.4 Final QA
- [ ] `npm run build`
- [ ] Verify all public routes
- [ ] Browser smoke test
- [ ] Review live VPS deployment
- [ ] Compare against archived `website-v1-archive`
- [ ] Decide whether to merge rework into the production website branch

---

# Working rule

Every effect must earn its place. The site should feel more premium because motion improves hierarchy, continuity and feedback—not because everything moves.
