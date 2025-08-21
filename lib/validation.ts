import { z } from "zod";

export const newsletterSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(5, "Email must be at least 5 characters")
    .max(254, "Email must be less than 254 characters")
    .transform((email) => email.toLowerCase().trim()),
});

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length >= 5 && email.length <= 254;
};

export const isDisposableEmail = (email: string): boolean => {
  const disposableDomains = [
    "10minutemail.com",
    "guerrillamail.com",
    "tempmail.org",
    "mailinator.com",
    // Add more disposable email domains as needed
  ];

  const domain = email.split("@")[1]?.toLowerCase();
  return disposableDomains.includes(domain);
};
