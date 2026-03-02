# Specification

## Summary
**Goal:** Fully revert the frontend to its Version 44 state, undoing all changes introduced in Version 45 and Version 46.

**Planned changes:**
- Restore all frontend component styles and layouts (HeroSection, Navbar, AboutSection, RosterSection, NewsSection, Footer, etc.) to match Version 44 exactly
- Revert CSS custom properties in index.css to Version 44 values
- Revert Tailwind configuration in tailwind.config.js to Version 44 values
- Restore HeroSection shooting animation to its Version 44 state
- Remove any visual or behavioral differences introduced after Version 44

**User-visible outcome:** The frontend looks and behaves exactly as it did in Version 44, with no remnants of Version 45 or Version 46 changes.
