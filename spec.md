# Specification

## Summary
**Goal:** Replace the existing profile avatar and PWA icons with the new uploaded gaming artwork image, and update all frontend components to use this new image everywhere (except the hero background).

**Planned changes:**
- Replace `profile-avatar.dim_512x512.png` with the new uploaded image (masked figure in white turtleneck, Gucci cap, neon red halo, dark esports background) resized to 512×512
- Replace `pwa-icon.dim_192x192.png` with the new image resized to 192×192
- Replace `pwa-icon.dim_512x512.png` with the new image resized to 512×512
- Update all frontend components (Navbar, AboutSection, RosterSection, PlayerCard, Footer, NewsSection, AnnouncementCard, PWAInstallBanner, LandingPage) to use `/assets/generated/profile-avatar.dim_512x512.png` wherever a profile image, player avatar, or logo is displayed
- Leave the hero background image (`hero-bg.dim_1920x1080.png`) unchanged

**User-visible outcome:** The new gaming artwork appears as the profile avatar, brand logo, player card image, and PWA home screen icon throughout the entire app, replacing all old placeholders.
