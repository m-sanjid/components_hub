import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";
import { ProgressiveBlur } from "@/components/motion-primitives/progressive-blur";
import { siteConfig } from "@/config/site";
import { generateDefaultOGImage } from "@/lib/og-image";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: "%s | " + siteConfig.name,
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: generateDefaultOGImage(siteConfig.name, siteConfig.description),
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [generateDefaultOGImage(siteConfig.name, siteConfig.description)],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link
          rel="preconnect"
          href="https://cdn.jsdelivr.net"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          disableTransitionOnChange
        >
          <a
            href="#content"
            className="focus:bg-primary focus:text-primary-foreground sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:px-3 focus:py-2"
          >
            Skip to content
          </a>
          <Toaster />
          <Navbar />
          <div className="m-0 p-0 relative">
            <ProgressiveBlur
              direction="top"
              blurIntensity={3}
              className="top-0 right-0 fixed left-0 z-10 h-28 w-screen md:h-32"
            />
            <main id="content">{children}</main>
            <ProgressiveBlur
              blurIntensity={1}
              direction="bottom"
              className="fixed right-0 bottom-0 left-0 z-10 h-10 w-screen md:h-12"
            />
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
