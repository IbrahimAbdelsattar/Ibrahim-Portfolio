import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, MessageCircle, Brain } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Mail, href: "mailto:ibrahim@example.com", label: "Email" },
    { icon: MessageCircle, href: "https://wa.me/", label: "WhatsApp" },
  ];

  return (
    <footer className="relative border-t border-white/10 dark:border-white/10 bg-card/35 backdrop-blur-2xl overflow-x-clip">
      <div className="container mx-auto px-4 lg:px-8 py-6 pb-safe">
        <div className="text-center">
          <p className="text-muted-foreground text-xs sm:text-sm px-2">
            © {currentYear} Ibrahim Abdelsattar. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
