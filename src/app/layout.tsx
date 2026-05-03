import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Tiles Gallery — Discover Your Perfect Aesthetic",
  description: "Explore our curated collection of premium tiles — ceramic, marble, terracotta, zellige, and more.",
  keywords: "tiles, ceramic, marble, terracotta, tile gallery, interior design",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="tilegallery">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=Josefin+Sans:wght@300;400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen flex flex-col">
        <Toaster position="top-center" toastOptions={{ style: { fontFamily: "Josefin Sans, sans-serif", fontSize: "0.85rem", letterSpacing: "0.05em", background: "#2c2a27", color: "#f5f0e8", border: "1px solid #c2622d" } }} />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
