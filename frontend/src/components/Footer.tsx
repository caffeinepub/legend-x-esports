import { Heart } from 'lucide-react';
import { SiX, SiDiscord, SiTwitch, SiYoutube, SiInstagram } from 'react-icons/si';

const socialLinks = [
  { icon: SiX, label: 'X (Twitter)', href: 'https://x.com' },
  { icon: SiDiscord, label: 'Discord', href: 'https://discord.gg' },
  { icon: SiTwitch, label: 'Twitch', href: 'https://twitch.tv' },
  { icon: SiYoutube, label: 'YouTube', href: 'https://youtube.com/@mrqlegendff?si=IUBFSTd9J-PGWeNQ' },
  { icon: SiInstagram, label: 'Instagram', href: 'https://instagram.com' },
];

const footerLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Roster', href: '#roster' },
  { label: 'News', href: '#news' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const appId = encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'legend-x-esports');

  return (
    <footer id="contact" className="relative bg-esports-dark border-t border-esports-dark-4 overflow-hidden">
      {/* Top divider glow */}
      <div className="section-divider" />

      {/* Background accent */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at bottom center, oklch(0.55 0.22 25), transparent 60%)' }}
      />

      <div className="container mx-auto px-4 sm:px-6 py-16 relative z-10">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/assets/generated/legend-x-logo.dim_512x512.png"
                alt="Legend X Esports"
                className="h-10 w-10 object-contain"
              />
              <span className="font-display text-xl tracking-widest">
                LEGEND <span className="text-esports-red">X</span> ESPORTS
              </span>
            </div>
            <p className="font-body text-sm text-esports-gray leading-relaxed mb-6">
              Professional esports organization dedicated to excellence, competition, and building the next generation of champions.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2 bg-esports-dark-3 border border-esports-dark-4 text-esports-gray hover:text-esports-red hover:border-esports-red/40 hover:bg-esports-red/10 transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-sm tracking-widest uppercase text-esports-red mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-esports-gray hover:text-foreground transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-esports-red group-hover:w-4 transition-all duration-200" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-sm tracking-widest uppercase text-esports-red mb-4">
              Contact Us
            </h4>
            <div className="space-y-3 font-body text-sm text-esports-gray">
              <p>
                For partnerships, sponsorships, or general inquiries, reach out to us on our social channels or via email.
              </p>
              <a
                href="mailto:contact@legendxesports.gg"
                className="block text-esports-gray-light hover:text-esports-red transition-colors"
              >
                contact@legendxesports.gg
              </a>
              <div className="pt-2">
                <span className="font-heading text-xs tracking-widest uppercase text-esports-gray">
                  Based in the Philippines
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-esports-dark-4 mb-6" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-esports-gray font-body">
          <p>
            &copy; {year} <span className="text-esports-gray-light">Legend X Esports</span>. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5">
            Built with{' '}
            <Heart
              size={12}
              className="text-esports-red fill-esports-red animate-pulse-glow"
            />{' '}
            using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-esports-gray-light hover:text-esports-red transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
