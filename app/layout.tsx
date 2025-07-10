import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";

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
        <div className="mx-auto min-h-screen max-w-6xl">
          <Toaster />
          <Navbar />
          {children}
          {/* <FloatingCTA /> */}
        </div>
        <Footer />
      </body>
    </html>
  );
}
