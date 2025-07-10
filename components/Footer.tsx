import React from "react";
import {
  IconBrandX,
  IconBrandGithub,
  IconBrandLinkedin,
} from "@tabler/icons-react";
import Logo from "./Logo";

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
        { name: "Documentation", href: "/documents" },
        { name: "Guides", href: "#" },
        { name: "Support", href: "#" },
        { name: "API Reference", href: "#" },
      ],
    },
  ];

  return (
    <footer className="border-border bg-card border-t">
      <div className="container mx-auto max-w-6xl px-4 py-12 md:px-0">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-6">
          <div className="col-span-2">
            <div className="mb-4 flex items-center gap-2">
              <Logo />
            </div>
            <p className="text-muted-foreground mb-4 max-w-xs text-sm">
              Beautiful, responsive UI components and templates for modern web
              applications.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-muted-foreground bg-secondary hover:text-foreground flex h-8 w-8 items-center justify-center rounded-full transition-colors"
                aria-label="GitHub"
              >
                <IconBrandGithub className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="text-muted-foreground bg-secondary hover:text-foreground flex h-8 w-8 items-center justify-center rounded-full transition-colors"
                aria-label="Twitter"
              >
                <IconBrandX className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="text-muted-foreground bg-secondary hover:text-foreground flex h-8 w-8 items-center justify-center rounded-full transition-colors"
                aria-label="LinkedIn"
              >
                <IconBrandLinkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="mb-3 font-medium">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-border mt-12 border-t">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between px-4 py-6 md:flex-row">
          <p className="text-muted-foreground text-sm">
            &copy; {year} Components Hub. All rights reserved.
          </p>
          <div className="mt-4 flex gap-4 md:mt-0">
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
