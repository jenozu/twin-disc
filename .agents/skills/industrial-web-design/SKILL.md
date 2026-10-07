---
name: industrial-web-design
description: Design and refine modern B2B industrial websites so they feel credible, specific, polished, and human-made rather than like generic AI/SaaS templates. Use for industrial parts catalogues, RFQ flows, product pages, search interfaces, and visual redesigns. Do not use for unrelated app logic or backend architecture.
---

# Industrial Web Design

Design from the industry's actual visual language: machinery, engineered components, part numbers, technical documentation, service work, metal, measurement, and procurement. The goal is modern industrial credibility, not "tech startup" polish.

## Direction

Before coding, choose one clear visual idea tied to the business. State a compact system for:
- 4–6 colors;
- one or two intentional typefaces;
- spacing/grid behavior;
- the single memorable visual device.

For this project, prefer restrained neutral surfaces, confident dark text, one functional accent, crisp rules, strong typography, and generous whitespace. Dense technical information may be compact, but never cramped.

Avoid generic AI defaults unless the brief explicitly calls for them:
- repeated rounded cards for every section;
- decorative gradients;
- eyebrow labels above every heading;
- "01 / 02 / 03" markers unless content is truly sequential;
- identical shadows and border radii everywhere;
- overuse of pills, glassmorphism, floating blobs, or icon grids;
- oversized marketing claims unsupported by evidence;
- arbitrary animation.

## Industrial B2B priorities

Make part-number search and technical identification feel primary. A buyer should quickly understand:
1. what the part is;
2. what evidence supports compatibility;
3. what information is still required;
4. how to request a quote.

Use real product terminology and real catalogue data. Visually distinguish confirmed compatibility from family-level context and unverified hypotheses.

Prefer tables, specification groups, technical callouts, and restrained dividers when they communicate structure better than cards.

Copy should be direct and procurement-friendly. Use sentence case. Buttons describe actions precisely: "Request quote", "Search parts", "Send equipment details".

## Quality floor

Every implementation must be responsive, keyboard usable, visually accessible, and respect reduced motion. Keep body copy readable and generally below ~80 characters per line. Use visible focus states and meaningful semantic HTML.

When reviewing an existing page, fetch the current Vercel Web Interface Guidelines before the audit and fix high-impact accessibility/interaction issues along with visual polish.

## Self-critique

After implementation, review the rendered page or screenshot. Ask:
- Could this design belong to any SaaS company?
- Does the hierarchy reflect how an industrial buyer actually searches?
- Is one visual idea carrying the identity, or are there many decorations competing?
- Can any decorative element be removed without losing meaning?

If the page still looks templated, revise the layout or typography rather than adding more decoration.
