# Specification

## Summary
**Goal:** Replace the existing bullet-with-smoke-trail SVG animation in the HeroSection CTA button with a small inline cartoon shooting scene animation.

**Planned changes:**
- Remove the looping black bullet/smoke-trail SVG animation from the CTA button span in `HeroSection.tsx`
- Add a new inline SVG/CSS keyframe cartoon animation in its place featuring:
  - A small cartoon/chibi-style boy on the left side in a shooting pose aimed right
  - A bullseye/aiming target board on the right side
  - A looping shooting animation where the boy fires and the target reacts with a hit flash or shake effect
- Keep the animation size approximately 80–120px wide and 40–50px tall to match the original size and avoid layout disruption
- Use bold outlines and bright colors in a cartoon/chibi art style
- No external image files; fully self-contained inline SVG or CSS keyframes

**User-visible outcome:** The CTA button displays a looping cartoon boy-shooting-target animation instead of the old bullet animation, with the same compact size and no layout changes.
