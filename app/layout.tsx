import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";
import { ProgressiveBlur } from "@/components/motion-primitives/progressive-blur";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Components Hub",
  description: "Components Hub",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Toaster />
        <Navbar />
        <div className="">
          <ProgressiveBlur
            direction="top"
            blurIntensity={3}
            className="fixed top-0 right-0 left-0 z-10 h-28 w-screen md:h-32"
          />
          {children}
          <ProgressiveBlur
            direction="bottom"
            blurIntensity={1}
            className="fixed right-0 bottom-0 left-0 z-10 h-10 w-screen md:h-20"
          />
          {/* <FloatingCTA /> */}
        </div>
        <Footer />
      </body>
    </html>
  );
}
