import React from "react";
import {
  IconBrandX,
  IconBrandGithub,
  IconBrandLinkedin,
} from "@tabler/icons-react";
import Logo from "./Logo";
import { siteConfig } from "@/config/site";
import { Link } from "next-view-transitions";

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Product",
      links: [
        { name: "Components", href: "/components" },
        { name: "Templates", href: "/templates" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", href: "/components/installation" },
        { name: "Guides", href: "/components/cli" },
        { name: "Support", href: "/contact" },
        { name: "API Reference", href: "/api" },
      ],
    },
  ];

  return (
    <footer
      className="border-border bg-card z-30 mb-6 border-t"
      role="contentinfo"
    >
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-6">
          <div className="sm:col-span-2">
            <div className="mb-4 flex items-center gap-2">
              <Logo />
            </div>
            <p className="text-muted-foreground mb-4 max-w-xs text-sm">
              Beautiful, responsive UI components and templates for modern web
              applications.
            </p>
            <ul className="flex gap-4" aria-label="Social links">
              <li>
                <Link
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground bg-secondary hover:text-foreground focus-visible:ring-primary flex h-8 w-8 items-center justify-center rounded-full transition-colors focus-visible:ring-2 focus-visible:outline-none"
                  aria-label="GitHub"
                  title="GitHub"
                >
                  <IconBrandGithub className="h-4 w-4" aria-hidden="true" />
                </Link>
              </li>
              <li>
                <Link
                  href={siteConfig.links.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground bg-secondary hover:text-foreground focus-visible:ring-primary flex h-8 w-8 items-center justify-center rounded-full transition-colors focus-visible:ring-2 focus-visible:outline-none"
                  aria-label="X (Twitter)"
                  title="X (Twitter)"
                >
                  <IconBrandX className="h-4 w-4" aria-hidden="true" />
                </Link>
              </li>
              <li>
                <Link
                  href="https://linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground bg-secondary hover:text-foreground focus-visible:ring-primary flex h-8 w-8 items-center justify-center rounded-full transition-colors focus-visible:ring-2 focus-visible:outline-none"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                >
                  <IconBrandLinkedin className="h-4 w-4" aria-hidden="true" />
                </Link>
              </li>
            </ul>
          </div>

          {footerLinks.map((section) => (
            <nav
              key={section.title}
              aria-labelledby={`footer-${section.title}`}
            >
              <h3 id={`footer-${section.title}`} className="mb-3 font-medium">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground focus-visible:ring-primary px-4 py-2 text-sm transition-colors focus-visible:ring-2 focus-visible:outline-none"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>
      <div className="border-border mt-12 border-t">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between px-4 py-6 md:flex-row">
          <p className="text-muted-foreground text-sm">
            &copy; {year} Components Hub. All rights reserved.
          </p>
          <div className="mt-4 flex gap-4 md:mt-0">
            <Link
              href="/privacy-policy"
              className="text-muted-foreground hover:text-foreground focus-visible:ring-primary px-4 py-2 text-sm transition-colors focus-visible:ring-2 focus-visible:outline-none"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="text-muted-foreground hover:text-foreground focus-visible:ring-primary px-4 py-2 text-sm transition-colors focus-visible:ring-2 focus-visible:outline-none"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookie-policy"
              className="text-muted-foreground hover:text-foreground focus-visible:ring-primary px-4 py-2 text-sm transition-colors focus-visible:ring-2 focus-visible:outline-none"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
