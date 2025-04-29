import React from "react";
import { IconBrandX, IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";
import Logo from "./Logo";

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "#" },
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
    {
      title: "Company",
      links: [
        { name: "About", href: "/about" },
        { name: "Blog", href: "/blog" },
        { name: "Careers", href: "/careers" },
        { name: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy", href: "#" },
        { name: "Terms", href: "#" },
        { name: "License", href: "#" },
      ],
    },
  ];

  return (
    <footer className="border-t border-border bg-card">
      <div className="container py-12 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Logo />
            </div>
            <p className="text-sm text-muted-foreground mb-4 max-w-xs">
              Beautiful, responsive UI components and templates for modern web
              applications.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="h-8 w-8 rounded-full flex items-center justify-center text-muted-foreground bg-secondary hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <IconBrandGithub className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="h-8 w-8 rounded-full flex items-center justify-center text-muted-foreground bg-secondary hover:text-foreground transition-colors"
                aria-label="Twitter"
              >
                <IconBrandX className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="h-8 w-8 rounded-full flex items-center justify-center text-muted-foreground bg-secondary hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <IconBrandLinkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="font-medium mb-3">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {year} Components Hub. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
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
