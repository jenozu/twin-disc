# TWD Emil redesign — design decision

This branch starts from the current deployed `website-mvp` site content, copied onto a feature branch that itself was created from the latest `main`.

## Directions considered

### 1. Graphite + ice blue
Very technical and familiar for industrial B2B. Strong clarity, but close to the existing visual language and therefore not enough of a rework.

### 2. Foundry teal + warm porcelain + copper — selected
Deep navy/ink grounds the technical content; muted teal provides a distinct, trustworthy interactive accent; warm porcelain keeps long technical pages from feeling sterile; restrained copper is reserved for warnings or important secondary emphasis. This feels premium and independent without mimicking Twin Disc brand colours.

### 3. Charcoal + safety orange + white
High energy and visibly industrial, but too aggressive for long catalogue/RFQ sessions and too easy to make the interface look like a construction-equipment template.

## Selected palette

- Ink: `#0D1720`
- Surface dark: `#111E26`
- Canvas: `#FAF9F6`
- Warm paper: `#F4F1EA`
- Surface: `#FFFFFF`
- Teal accent: `#0F6B63`
- Teal hover: `#0A5751`
- Teal soft: `#DCEEEA`
- Copper highlight: `#C7783E`
- Border: `#D8DDD9`
- Body text: `#142129`
- Muted text: `#6F7B77`

## Emil design-engineering rules applied

- Motion is used only for feedback, continuity, or first-impression hierarchy.
- Frequent interactions avoid decorative animation.
- Button press feedback uses a small transform and a short ease-out.
- Hover effects are gated to fine pointers.
- UI transitions stay under 300ms.
- Animations target transform/opacity rather than layout properties.
- Reduced-motion users keep clarity without movement-heavy effects.
- Focus states remain explicit and keyboard-visible.
- No `transition: all`; exact properties are named.
