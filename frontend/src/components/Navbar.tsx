import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Roster', href: '#roster' },
  { label: 'News', href: '#news' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-esports-dark/95 backdrop-blur-md border-b border-esports-dark-4'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            {/* Profile Avatar */}
            <div className="relative flex-shrink-0">
              <img
                src="/assets/quality_restoration_20260128182709920-1.jpg"
                alt="MRQ Legend Profile"
                className="h-9 w-9 md:h-10 md:w-10 rounded-full object-cover object-top border-2 border-esports-red shadow-[0_0_8px_oklch(0.55_0.22_25/0.6)] group-hover:shadow-[0_0_14px_oklch(0.55_0.22_25/0.9)] transition-shadow duration-300"
              />
              {/* Online indicator dot */}
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-esports-red border-2 border-esports-dark" />
            </div>
            <span className="font-display text-xl md:text-2xl tracking-widest text-foreground group-hover:text-esports-red transition-colors">
              LEGEND <span className="text-esports-red">X</span> ESPORTS
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-heading text-sm tracking-widest uppercase text-esports-gray-light hover:text-esports-red transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-esports-red group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-foreground hover:text-esports-red transition-colors p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-esports-dark-2/98 backdrop-blur-md border-t border-esports-dark-4">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="font-heading text-sm tracking-widest uppercase text-esports-gray-light hover:text-esports-red transition-colors py-3 border-b border-esports-dark-4 last:border-0"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
