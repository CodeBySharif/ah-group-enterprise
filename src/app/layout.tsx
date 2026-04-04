import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import DevToolsBlocker from "@/components/DevToolsBlocker";
import { CartProvider } from "@/context/CartContext";
import FloatingCart from "@/components/FloatingCart";

const outfit = Outfit({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"] });

export const metadata: Metadata = {
  title: "AH Shop | Premium Printing, Custom Stickers & Kids' Learning",
  description: "Experience the next-generation marketplace for premium printing, bespoke stickers, and interactive children's books.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${outfit.className} antialiased`}>
        <CartProvider>
          <DevToolsBlocker />
          <FloatingCart />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
