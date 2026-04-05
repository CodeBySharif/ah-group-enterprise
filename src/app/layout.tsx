import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import DevToolsBlocker from "@/components/DevToolsBlocker";
import { CartProvider } from "@/context/CartContext";
import FloatingCart from "@/components/FloatingCart";

const outfit = Outfit({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"] });

export const metadata: Metadata = {
  title: "AH Shop | Premium Printing, Custom Stickers & Kids' Learning",
  description:
    "Experience the next-generation marketplace for premium printing, bespoke stickers, and interactive children's books.",
  appleWebApp: {
    capable: true,
    title: "AH Shop",
    statusBarStyle: "black-translucent",
  },
  icons: {
    apple: "/icon-192x192.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#6366f1",
  // "cover" can desync layout vs visual viewport in some mobile / in-app browsers (right gutter).
  viewportFit: "auto",
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
          <div className="w-full min-w-0 max-w-full overflow-x-hidden">
            <DevToolsBlocker />
            <FloatingCart />
            {children}
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
