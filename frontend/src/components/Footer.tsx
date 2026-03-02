import { SiYoutube, SiInstagram, SiFacebook } from "react-icons/si";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const appId = encodeURIComponent(
    typeof window !== "undefined" ? window.location.hostname : "legend-x-arena"
  );

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Roster", href: "#roster" },
    { label: "News", href: "#news" },
  ];

  const socialLinks = [
    {
      icon: SiYoutube,
      href: "https://www.youtube.com/@MrQLegendYT",
      label: "YouTube",
    },
    {
      icon: SiInstagram,
      href: "https://www.instagram.com/mrqlegend",
      label: "Instagram",
    },
    {
      icon: SiFacebook,
      href: "https://www.facebook.com/mrqlegend",
      label: "Facebook",
    },
  ];

  return (
    <footer className="bg-background border-t border-border pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            {/* Brand Logo — Legend / X / Arena */}
            <div className="flex flex-col leading-none gap-0.5">
              <span
                className="font-black uppercase tracking-widest text-foreground"
                style={{ fontSize: "1.1rem", letterSpacing: "0.18em" }}
              >
                Legend
              </span>
              <span
                className="font-black uppercase text-primary"
                style={{ fontSize: "2rem", lineHeight: "1", letterSpacing: "0.05em" }}
              >
                X
              </span>
              <span
                className="font-black uppercase tracking-widest text-foreground"
                style={{ fontSize: "1.1rem", letterSpacing: "0.18em" }}
              >
                Arena
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Pakistan's premier esports team. Competing at the highest level
              and inspiring the next generation of gamers.
            </p>
            {/* Social Links */}
            <div className="flex gap-4 mt-2">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-bold tracking-widest uppercase text-foreground">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-bold tracking-widest uppercase text-foreground">
              Contact
            </h3>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="mailto:contact@legendxarena.com"
                  className="hover:text-primary transition-colors duration-200"
                >
                  Dollars.ai
                </a>
              </li>
              <li>Pakistan</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {currentYear} Legend X Arena. All rights reserved.</p>
          <p>
            Built with{" "}
            <span className="text-primary">♥</span>{" "}
            using{" "}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors duration-200 underline underline-offset-2"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
