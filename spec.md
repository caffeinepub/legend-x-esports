# Specification

## Summary
**Goal:** Replace the second CTA button's text in HeroSection with a visually unique animated yellow/red gradient button.

**Planned changes:**
- In `HeroSection.tsx`, locate the second anchor element in the CTA buttons container
- Remove its existing text content
- Apply a yellow-to-red gradient background (`#FFD700`/amber → `#EF4444`/rose)
- Add a continuous CSS animation (pulse glow, shimmer sweep, or fire-flicker effect)
- Apply a visually distinct shape or border treatment (e.g., angled clip-path or animated border)
- Set bold uppercase label text (e.g., `JOIN NOW` or `ENLIST`)
- Preserve the original `href`/link target of the anchor

**User-visible outcome:** The second hero CTA button now displays as a bold, animated yellow-and-red gradient button that visually stands out from the other CTA buttons on the page.
