# TWD — Lumo-inspired interactive experiment

Branch: feat/twd-lumo-interactive-redesign
Baseline: website-mvp, Astro app at 50-Code/site/
Production: UNCHANGED — no merge, deployment, DNS, VPS, or production configuration changes.

## New experience

- Cinematic editorial hero with a custom conceptual industrial powertrain illustration (not an actual Twin Disc part drawing).
- Direct part-number and model-family search.
- Four-option interactive product explorer that updates an abstract machine visual, copy and catalogue link.
- Scroll-linked four-stage part identification walkthrough with sticky visual.
- Product tiles based on the existing public product list.
- Catalogue family chips that work with existing text search.
- Redesigned product/model detail surfaces, specification tables, FAQs, quote calls-to-action and RFQ form.
- Progressive reveal animation, reading progress and reduced-motion fallback.

## Data safeguards

Existing data files are unchanged, as are HOLD/DRAFT publication rules. Fitment and availability still require verification before ordering. The mechanical illustration is conceptual and is labelled accordingly. This is an independent reseller prototype, not an official Twin Disc website. RFQ remains a client-side prototype; the form does not send emails until a backend is integrated.

## Preview locally

Switch to the experiment branch and run:

    cd 50-Code/site
    npm install
    npm run dev

For a production preview:

    npm run build
    npm run preview

## Verification

GitHub Actions workflow twd-lumo-verify.yml builds Astro and verifies generated routes. Workflow twd-lumo-browser.yml runs an isolated Playwright desktop/mobile smoke test when the workflow/test script changes or on manual dispatch. It uploads screenshots as GitHub Actions artifacts.

## Release checklist

1. Visually review desktop and mobile screenshots / preview.
2. Replace conceptual illustrations with approved real imagery where licensing and accuracy permit.
3. Integrate and test RFQ backend, privacy policy, anti-spam, and consent.
4. Obtain explicit approval before merging, deploying, or changing production.
