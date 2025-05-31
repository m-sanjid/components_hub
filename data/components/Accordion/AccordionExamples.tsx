"use client";

import { AnimatedAccordion } from "./AnimatedAccordion";
import {
  IconRocket,
  IconSettings,
  IconHelp,
  IconCode,
  IconBook,
  IconUsers,
} from "@tabler/icons-react";
import { ReactNode } from "react";
import { FileText, Settings, User, Lock, HelpCircle } from "lucide-react";

interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
  icon?: ReactNode;
}

export const basicItems: AccordionItem[] = [
  {
    id: "item-1",
    title: "Getting Started",
    content:
      "Learn how to get started with our platform and explore its features.",
  },
  {
    id: "item-2",
    title: "Installation",
    content: "Follow these steps to install and configure the platform.",
  },
  {
    id: "item-3",
    title: "Configuration",
    content: "Customize your settings and preferences to match your needs.",
  },
];

const multipleItems: AccordionItem[] = [
  {
    id: "item-1",
    title: "Features",
    content: "Explore the key features of our platform.",
  },
  {
    id: "item-2",
    title: "Pricing",
    content: "View our pricing plans and choose the one that fits your needs.",
  },
  {
    id: "item-3",
    title: "Support",
    content: "Get help and support from our team.",
  },
];

const itemsWithIcons: AccordionItem[] = [
  {
    id: "item-1",
    title: "Quick Start",
    content: "Get up and running quickly with our platform.",
    icon: <IconRocket className="h-5 w-5" />,
  },
  {
    id: "item-2",
    title: "Settings",
    content: "Configure your account and preferences.",
    icon: <IconSettings className="h-5 w-5" />,
  },
  {
    id: "item-3",
    title: "Help & Support",
    content: "Find answers to common questions and get support.",
    icon: <IconHelp className="h-5 w-5" />,
  },
];

const richItems: AccordionItem[] = [
  {
    id: "item-1",
    title: "Product Features",
    content: (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Key Features</h3>
        <ul className="list-disc space-y-2 pl-4">
          <li>Feature 1: Description of the first feature</li>
          <li>Feature 2: Description of the second feature</li>
          <li>Feature 3: Description of the third feature</li>
        </ul>
        <div className="bg-muted rounded-md p-3">
          <p className="text-sm">Additional information about the features.</p>
        </div>
      </div>
    ),
  },
  {
    id: "item-2",
    title: "Pricing Plans",
    content: (
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-lg border p-4">
            <h4 className="font-semibold">Basic</h4>
            <p className="text-2xl font-bold">$9/mo</p>
            <ul className="mt-2 space-y-1">
              <li>Feature 1</li>
              <li>Feature 2</li>
            </ul>
          </div>
          <div className="rounded-lg border p-4">
            <h4 className="font-semibold">Pro</h4>
            <p className="text-2xl font-bold">$19/mo</p>
            <ul className="mt-2 space-y-1">
              <li>All Basic features</li>
              <li>Feature 3</li>
              <li>Feature 4</li>
            </ul>
          </div>
          <div className="rounded-lg border p-4">
            <h4 className="font-semibold">Enterprise</h4>
            <p className="text-2xl font-bold">$49/mo</p>
            <ul className="mt-2 space-y-1">
              <li>All Pro features</li>
              <li>Feature 5</li>
              <li>Feature 6</li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
];

const documentationItems: AccordionItem[] = [
  {
    id: "item-1",
    title: "API Reference",
    content: "Comprehensive documentation of our API endpoints and methods.",
    icon: <IconCode className="h-5 w-5" />,
  },
  {
    id: "item-2",
    title: "Guides",
    content: "Step-by-step guides for common tasks and workflows.",
    icon: <IconBook className="h-5 w-5" />,
  },
  {
    id: "item-3",
    title: "Community",
    content: "Join our community of developers and share your experiences.",
    icon: <IconUsers className="h-5 w-5" />,
  },
];

interface AccordionExampleProps {
  type?: "single" | "multiple";
  withIcons?: boolean;
  withRichContent?: boolean;
}

export function AccordionExample({
  type = "single",
  withIcons = false,
  withRichContent = false,
}: AccordionExampleProps) {
  let items = basicItems;

  if (type === "multiple") {
    items = multipleItems;
  } else if (withIcons) {
    items = itemsWithIcons;
  } else if (withRichContent) {
    items = richItems;
  }

  return (
    <AnimatedAccordion
      items={items}
      type={type}
      defaultOpen={type === "multiple" ? ["item-1"] : []}
    />
  );
}

// Demo component to showcase the accordion
export default function AccordionDemo() {
  const accordionItems = [
    {
      id: "overview",
      title: "Project Overview",
      icon: <FileText className="h-4 w-4" />,
      content: (
        <div className="space-y-3">
          <p>
            A comprehensive project management solution designed for modern
            teams seeking efficiency and clarity.
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <div className="h-1 w-1 rounded-full bg-neutral-400" />
              <span>Timeline tracking and milestone management</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="h-1 w-1 rounded-full bg-neutral-400" />
              <span>Team collaboration and communication tools</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="h-1 w-1 rounded-full bg-neutral-400" />
              <span>Resource allocation and budget tracking</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "account",
      title: "Account Management",
      icon: <User className="h-4 w-4" />,
      content: (
        <div className="space-y-3">
          <p>
            Manage your account settings and preferences in one centralized
            location.
          </p>
          <div className="grid grid-cols-1 gap-3">
            <div className="rounded-md border border-neutral-100 bg-neutral-50 p-3">
              <div className="text-sm font-medium text-neutral-900">
                Profile Settings
              </div>
              <div className="mt-1 text-xs text-neutral-500">
                Update personal information and preferences
              </div>
            </div>
            <div className="rounded-md border border-neutral-100 bg-neutral-50 p-3">
              <div className="text-sm font-medium text-neutral-900">
                Notification Preferences
              </div>
              <div className="mt-1 text-xs text-neutral-500">
                Control how and when you receive updates
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "security",
      title: "Security Settings",
      icon: <Lock className="h-4 w-4" />,
      content: (
        <div className="space-y-3">
          <p>Configure security measures to protect your account and data.</p>
          <div className="rounded-md border border-neutral-200 p-3">
            <div className="mb-2 flex items-center gap-2">
              <Lock className="h-3 w-3 text-neutral-600" />
              <span className="text-sm font-medium text-neutral-900">
                Two-Factor Authentication
              </span>
            </div>
            <p className="text-xs text-neutral-600">
              Add an extra layer of security to your account with 2FA
              verification.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "support",
      title: "Help & Documentation",
      icon: <HelpCircle className="h-4 w-4" />,
      content: (
        <div className="space-y-3">
          <p>
            Access resources and support to help you get the most out of our
            platform.
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              "User Guide",
              "API Documentation",
              "Community Forum",
              "Contact Support",
            ].map((item) => (
              <span
                key={item}
                className="inline-flex items-center rounded-md bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-700"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "advanced",
      title: "Advanced Configuration",
      icon: <Settings className="h-4 w-4" />,
      disabled: true,
      content: (
        <p>Advanced settings for system administrators and power users.</p>
      ),
    },
  ];

  return (
    <div className="mx-auto min-h-screen max-w-2xl space-y-8 bg-white p-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold text-neutral-900">
          Minimalist Accordion
        </h1>
        <p className="text-sm text-neutral-500">
          Clean design focused on content and usability
        </p>
      </div>

      <div className="space-y-8">
        <div>
          <h2 className="mb-4 text-lg font-medium text-neutral-800">
            Single Selection
          </h2>
          <AnimatedAccordion
            items={accordionItems}
            type="single"
            defaultOpen={["overview"]}
          />
        </div>

        <div>
          <h2 className="mb-4 text-lg font-medium text-neutral-800">
            Multiple Selection
          </h2>
          <AnimatedAccordion
            items={accordionItems}
            type="multiple"
            defaultOpen={["account"]}
          />
        </div>
      </div>
    </div>
  );
}
