# Twin Disc website MVP

Lean Astro storefront/RFQ prototype for the public-safe Twin Disc catalogue.

## What is included

- Static Astro site
- Searchable launch catalogue
- 18 draft products exposed; the 2 HOLD products stay hidden
- Product detail pages
- RFQ flow with compatibility prompts
- No checkout, database or email dependency yet
- No confidential SAP/customer data

## Run locally

```bash
cd 50-Code/site
npm install
npm run dev
```

Then open the local URL Astro prints.

## Production build

```bash
npm run build
npm run preview
```

## Vercel

Import `jenozu/twin-disc` and set the **Root Directory** to:

```
50-Code/site
```

Use the Astro preset/autodetection. No environment variables are needed for this first static prototype.

## Before public launch

1. Choose the public business name/domain.
2. Connect RFQ form delivery (e.g. Resend/API route) and anti-spam.
3. Add approved contact information and privacy terms.
4. Add only product claims/images you are permitted to publish.
5. Verify current orderability for held/superseded products before exposing them.
6. Decide whether the final site stays RFQ-only or later adds checkout.
