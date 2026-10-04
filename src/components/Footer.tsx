import { Github, Linkedin, Mail } from "lucide-react";

/**
 * Every href here is a real, reachable destination. Entries with no verified
 * destination are omitted rather than rendered as dead placeholders.
 */
const socialLinks = [
  {
    icon: Github,
    href: "https://github.com/IbrahimAbdelsattar",
    label: "GitHub",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/ibrahim-abdelsattar/",
    label: "LinkedIn",
  },
  {
    icon: Mail,
    href: "mailto:ibrahimabdelsattar042@gmail.com",
    label: "Email",
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10 dark:border-white/10 bg-card/35 backdrop-blur-2xl overflow-x-clip">
      <div className="container mx-auto px-4 lg:px-8 py-6 pb-safe">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-xs sm:text-sm px-2 text-center sm:text-left">
            © {currentYear} Ibrahim Abdelsattar. All rights reserved.
          </p>

          <ul className="flex items-center gap-1">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="flex items-center justify-center h-11 w-11 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
