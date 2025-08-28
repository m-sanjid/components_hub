import { Template } from "@/types";

export const categories = [
  "All",
  "Landing Pages",
  "Dashboards",
  "E-commerce",
  "Authentication",
  "Forms",
  "Blogs",
  "Portfolios",
];

export const templates: Template[] = [
  {
    id: 1,
    title: "Notion-like Portfolio",
    description:
      "A clean and modern portfolio template built with Next.js, featuring MDX-powered blogs, projects showcase, skills section, and an interactive contact form. Includes subtle Framer Motion animations and dark mode support.",
    image: "/templates/p_template.png",
    category: "Portfolios",
    tags: [
      "Portfolio",
      "MDX Blog",
      "Projects",
      "Skills",
      "Contact",
      "Animations",
    ],
    featured: true,
    previewUrl: "https://portfoliotemplate-zeta.vercel.app",
    codeUrl: "https://github.com/m-sanjid/notion_like_portfolio",
    downloadUrl:
      "https://github.com/velnor-ui/notion_like_portfolio/archive/refs/heads/main.zip",
    price: 0,
    features: [
      {
        title: "MDX Blog Support",
        description: [
          "Write blogs using MDX with frontmatter metadata.",
          "Code syntax highlighting and markdown styling.",
          "SEO optimized blog pages.",
        ],
      },
      {
        title: "Projects Showcase",
        description: [
          "Showcase your projects with images, live demo links, and GitHub code.",
          "Supports project details in MDX format.",
          "Filter and categorize projects easily.",
        ],
      },
      {
        title: "Skills & Tech Stack",
        description: [
          "Highlight your skills with animated badges.",
          "Icons mapped to technologies automatically.",
          "Easily editable via JSON/MDX.",
        ],
      },
      {
        title: "Responsive & Accessible",
        description: [
          "Mobile-first responsive design with Tailwind CSS.",
          "Dark mode with next-themes integration.",
          "ARIA-compliant for accessibility.",
        ],
      },
      {
        title: "Interactive Contact Form",
        description: [
          "Animated form with validation and error handling.",
          "Easily connect with Formspree, Resend, or custom API.",
          "Framer Motion micro-interactions.",
        ],
      },
      {
        title: "Well-Documented",
        description: [
          "Step-by-step setup guide included.",
          "Clean and modular file structure.",
          "Ready for deployment on Vercel.",
        ],
      },
    ],
    screenshots: [
      "/templates/p_template.webp",
      "/templates/p_template1.webp",
      "/templates/p_template2.webp",
      "/templates/p_template3.webp",
      "/templates/p_template4.webp",
      "/templates/p_template5.webp",
    ],
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "MDX",
    ],
  },
  {
    id: 2,
    title: "Premium Portfolio Template",
    description:
      "A modern and minimalist portfolio template built for professionals. Features subtle Framer Motion animations, an MDX-powered blog, and beautifully crafted project showcases.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
    category: "Portfolios",
    tags: ["Portfolio", "Blog", "Animations", "Minimal"],
    featured: true,
    previewUrl: "https://portfolio-template-delta-wine.vercel.app/",
    codeUrl: "https://github.com/your-org/ecommerce-store",
    downloadUrl: "https://sanjid4.gumroad.com/l/portfolio",
    price: 29.99,
    features: [
      {
        title: "Minimalist Design",
        description: [
          "Clean, distraction-free UI with focus on content and projects.",
          "Perfect balance of whitespace and typography.",
        ],
      },
      {
        title: "Subtle Micro-interactions",
        description: [
          "Crafted with Framer Motion for smooth, modern animations.",
          "Hover, scroll, and navigation transitions included.",
        ],
      },
      {
        title: "MDX Blog Integration",
        description: [
          "Write blogs with markdown + components.",
          "Built-in syntax highlighting for code snippets.",
        ],
      },
      {
        title: "Responsive Layout",
        description: [
          "Looks stunning across mobile, tablet, and desktop.",
          "Optimized for performance and accessibility.",
        ],
      },
      {
        title: "Dark Mode Ready",
        description: [
          "Seamless theme switching with persistence.",
          "Elegant dark/light palettes included.",
        ],
      },
      {
        title: "Projects Showcase",
        description: [
          "Dedicated sections for case studies and projects.",
          "Supports images, videos, and interactive demos.",
        ],
      },
      {
        title: "Fully Customizable",
        description: [
          "Easily adapt colors, fonts, and layout.",
          "Well-structured, developer-friendly codebase.",
        ],
      },
    ],
    screenshots: [
      "/templates/p2_template.webp",
      "/templates/p2_template1.webp",
      "/templates/p2_template2.webp",
      "/templates/p2_template3.webp",
      "/templates/p2_template4.webp",
    ],
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "MDX",
    ],
  },
  {
    id: 3,
    title: "SaaS Landing Page",
    description:
      "A conversion-focused landing page for SaaS products with pricing tables and feature highlights.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    category: "Landing Pages",
    tags: ["Marketing", "Conversion", "Features"],
    featured: true,
    previewUrl: "https://example.com/preview/saas-landing",
    codeUrl: "https://github.com/your-org/saas-landing",
    downloadUrl: "https://example.com/download/saas-landing.zip",
    price: 49.99,
    features: [
      {
        title: "Responsive Design",
        description: ["Responsive design for all devices.", "fjafkjfdk"],
      },
    ],
    screenshots: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    ],
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "motion",
      "next-view-transitions",
    ],
  },
  {
    id: 4,
    title: "Bento Grid Portfolio",
    description:
      "A sleek and minimalist bento-style portfolio template designed for creators, developers, and designers to showcase their work in a modern grid layout.",
    image:
      "https://images.unsplash.com/photo-1671726203455-abc123example?q=80&w=1200&auto=format&fit=crop",
    category: "Portfolios",
    tags: ["Bento Grid", "Projects", "Showcase", "Minimal"],
    featured: true,
    previewUrl: "https://grid-folio-six.vercel.app/",
    codeUrl: "https://github.com/m-sanjid/grid-folio",
    downloadUrl:
      "https://github.com/m-sanjid/grid-folio/archive/refs/heads/main.zip",
    price: 0,
    features: [
      {
        title: "Bento-Style Grid",
        description: [
          "Unique grid layout inspired by Notion and Apple design trends.",
          "Highlight your projects, skills, and achievements in stylish blocks.",
        ],
      },
      {
        title: "Fully Responsive",
        description: [
          "Optimized for mobile, tablet, and desktop devices.",
          "Seamless browsing experience across all screen sizes.",
        ],
      },
      {
        title: "Customizable Sections",
        description: [
          "Easily reorder or edit blocks to fit your personal brand.",
          "Supports projects, skills, resume, contact, and more.",
        ],
      },
    ],
    screenshots: [
      "/templates/g_template.webp",
      "/templates/g_template1.webp",
      "/templates/g_template2.webp",
    ],
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
    ],
  },
];

export const allTemplates = [
  {
    name: "notion-like-portfolio",
    id: 1,
    title: "Notion-like Portfolio",
  },
  {
    name: "premium-portfolio-template",
    id: 2,
    title: "Premium Portfolio Template",
  },
  {
    name: "saas-landing-page",
    id: 3,
    title: "SaaS Landing Page",
  },
  {
    name: "developer-portfolio",
    id: 4,
    title: "Developer Portfolio",
  },
];

export const template: Template = {
  id: 1,
  title: "Modern Dashboard",
  description:
    "A clean and modern dashboard template with charts, tables, and analytics widgets. Perfect for SaaS applications and business intelligence tools.",
  image: "/templates/g_template.webp",
  category: "Dashboards",
  tags: ["Admin", "Analytics", "Charts", "Responsive", "Dark Mode"],
  featured: true,
  previewUrl: "#",
  codeUrl: "#",
  price: 49.99,
  features: [
    {
      title: "Responsive Design",
      description: ["Responsive design for all devices.", "fjafkjfdk"],
    },
    {
      title: "Dark Mode Support",
      description: ["Dark mode support for all devices.", "fjafkjfdk"],
    },
    {
      title: "Interactive Charts",
      description: ["Interactive charts for all devices.", "fjafkjfdk"],
    },
    {
      title: "Data Tables",
      description: ["Data tables for all devices.", "fjafkjfdk"],
    },
    {
      title: "User Management",
      description: ["User management for all devices.", "fjafkjfdk"],
    },
    {
      title: "Customizable Components",
      description: ["Customizable components for all devices.", "fjafkjfdk"],
    },
    {
      title: "Documentation Included",
      description: ["Documentation included for all devices.", "fjafkjfdk"],
    },
  ],
  screenshots: [
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
  ],
};

// Mock data for the showcase
export const components = [
  {
    id: 1,
    name: "Buttons",
    description:
      "Customizable button components with various states and styles",
    image: "/api/placeholder/600/400",
    tags: ["UI", "Interactive"],
    features: ["Hover effects", "Loading states", "Icon support", "Variants"],
  },
  {
    id: 2,
    name: "Cards",
    description: "Flexible card layouts for displaying content and data",
    image: "/api/placeholder/600/400",
    tags: ["Layout", "Content"],
    features: [
      "Hover animations",
      "Gradient overlays",
      "Responsive",
      "Customizable",
    ],
  },
  {
    id: 3,
    name: "Form Controls",
    description: "Input fields, checkboxes, and form elements with validation",
    image: "/api/placeholder/600/400",
    tags: ["Input", "Validation"],
    features: [
      "Real-time validation",
      "Error states",
      "Success states",
      "Accessibility",
    ],
  },
  {
    id: 4,
    name: "Navigation",
    description: "Responsive navigation bars with dropdown support",
    image: "/api/placeholder/600/400",
    tags: ["Layout", "Interactive"],
    features: [
      "Mobile-friendly",
      "Dropdown menus",
      "Active states",
      "Animations",
    ],
  },
  {
    id: 5,
    name: "Modals & Dialogs",
    description:
      "Customizable overlay components for prompts and notifications",
    image: "/api/placeholder/600/400",
    tags: ["UI", "Interactive"],
    features: [
      "Backdrop blur",
      "Keyboard navigation",
      "Focus trap",
      "Animations",
    ],
  },
  {
    id: 6,
    name: "Data Tables",
    description: "Powerful tables with sorting, filtering, and pagination",
    image: "/api/placeholder/600/400",
    tags: ["Data", "Interactive"],
    features: ["Sorting", "Filtering", "Pagination", "Responsive"],
  },
];

// Mock testimonials
export const testimonials = [
  {
    id: 1,
    name: "Alex Johnson",
    title: "Senior Frontend Developer",
    quote:
      "This library has cut our development time in half. The components are incredibly flexible and the documentation is top-notch.",
    avatar: "/api/placeholder/64/64",
  },
  {
    id: 2,
    name: "Sarah Chen",
    title: "UI/UX Designer",
    quote:
      "As a designer, I appreciate how these components can be styled to match our brand guidelines without sacrificing functionality.",
    avatar: "/api/placeholder/64/64",
  },
  {
    id: 3,
    name: "Michael Rivera",
    title: "Full Stack Developer",
    quote:
      "The accessibility features built into these components saved us countless hours of development and testing.",
    avatar: "/api/placeholder/64/64",
  },
];

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
  socials: {
    linkedin: string;
    github: string;
    twitter: string;
    mail: string;
  };
}
export const TeamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Alice Johnson",
    role: "Product Designer",
    bio: "Alice is a passionate product designer with over 5 years of experience in creating innovative and user-centered products.",
    image:
      "https://img.freepik.com/premium-photo/tik-tok-icon_665280-69394.jpg?ga=GA1.1.2123848024.1747422116&semt=ais_hybrid&w=740",
    socials: {
      linkedin: "https://linkedin.com/in/alice-johnson",
      github: "https://github.com/alice-johnson",
      twitter: "https://twitter.com/alice_johnson",
      mail: "alice.johnson@example.com",
    },
  },
  {
    id: 2,
    name: "Bob Smith",
    role: "Frontend Developer",
    bio: "Bob is a skilled frontend developer with expertise in React and Next.js. He has a passion for creating responsive and user-friendly interfaces.",
    image:
      "https://img.freepik.com/premium-photo/men-design-logo-avatar_665280-69418.jpg?ga=GA1.1.2123848024.1747422116&semt=ais_hybrid&w=740",
    socials: {
      linkedin: "https://linkedin.com/in/bob-smith",
      github: "https://github.com/bob-smith",
      twitter: "https://twitter.com/bob_smith",
      mail: "bob.smith@example.com",
    },
  },
  {
    id: 3,
    name: "Max Payne",
    role: "Project Manager",
    bio: "Max Payne is a skilled project manager with expertise in leading cross-functional teams and ensuring project success.",
    image:
      "https://img.freepik.com/premium-photo/men-design-logo-avatar_665280-69424.jpg?ga=GA1.1.2123848024.1747422116&semt=ais_hybrid&w=740",
    socials: {
      linkedin: "https://linkedin.com/in/max-payne",
      github: "https://github.com/max-payne",
      twitter: "https://twitter.com/max_payne",
      mail: "max.payne@example.com",
    },
  },
  {
    id: 4,
    name: "Dave Wilson",
    role: "Backend Developer",
    bio: "Dave is a skilled backend developer with expertise in Node.js and Express.js. He has a passion for building scalable and secure server-side applications.",
    image:
      "https://img.freepik.com/premium-photo/men-design-logo-avatar_665280-69427.jpg?ga=GA1.1.2123848024.1747422116&semt=ais_hybrid&w=740",
    socials: {
      linkedin: "https://linkedin.com/in/dave-wilson",
      github: "https://github.com/dave-wilson",
      twitter: "https://twitter.com/dave_wilson",
      mail: "dave.wilson@example.com",
    },
  },
];
