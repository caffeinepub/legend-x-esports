import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Roster", href: "#roster" },
    { label: "News", href: "#news" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <a href="#home" className="flex items-center gap-1 group select-none">
            <div className="flex flex-col leading-none">
              <span
                className="font-black tracking-widest uppercase text-foreground group-hover:text-primary transition-colors duration-200"
                style={{ fontSize: "0.85rem", letterSpacing: "0.18em" }}
              >
                Legend
              </span>
              <span
                className="font-black text-primary group-hover:text-accent transition-colors duration-200 text-center"
                style={{ fontSize: "1.35rem", lineHeight: "1", letterSpacing: "0.05em" }}
              >
                X
              </span>
              <span
                className="font-black tracking-widest uppercase text-foreground group-hover:text-primary transition-colors duration-200"
                style={{ fontSize: "0.85rem", letterSpacing: "0.18em" }}
              >
                Arena
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-semibold tracking-wider uppercase text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://www.youtube.com/@MrQLegendYT"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glow px-5 py-2 text-sm font-bold tracking-wider uppercase rounded"
            >
              Visit Website
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-foreground hover:text-primary transition-colors p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span
                className={`block h-0.5 bg-current transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`}
              />
              <span
                className={`block h-0.5 bg-current transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-0.5 bg-current transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-border">
          <div className="px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-semibold tracking-wider uppercase text-muted-foreground hover:text-primary transition-colors duration-200 py-1"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://www.youtube.com/@MrQLegendYT"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glow px-5 py-2 text-sm font-bold tracking-wider uppercase rounded text-center mt-2"
            >
              Visit Website
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
