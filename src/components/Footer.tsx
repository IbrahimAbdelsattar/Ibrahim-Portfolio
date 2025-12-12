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
    <footer className="relative border-t border-border/50 bg-background/50 backdrop-blur-xl">
      <div className="container mx-auto px-4 lg:px-8 py-6">
        <div className="text-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} Ibrahim Abdelsattar. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
