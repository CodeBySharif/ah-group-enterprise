import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import StickerForm from "@/components/StickerForm";
import { getProducts } from "@/lib/googleSheets";

export default async function Home() {
  // Fetch real product data from Google Sheets
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <div className="space-y-0">
        <Products products={products} />
        <Services />
        <Testimonials />
        <StickerForm />
      </div>

      {/* Footer */}
      <footer className="py-16 bg-gray-900 text-white text-center">
        <div className="container mx-auto px-6 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
            <div className="text-left">
              <h3 className="text-2xl font-bold text-indigo-400 mb-2">AH SHOP</h3>
              <p className="text-gray-400 max-w-xs font-bold leading-relaxed">
                Your partner for high-quality printing, custom stickers, and educational excellence.
              </p>
            </div>
            <div className="flex space-x-12">
              <div className="text-left">
                <h4 className="font-bold mb-4 uppercase text-xs tracking-widest text-gray-500">Quick Links</h4>
                <ul className="space-y-2 text-sm text-gray-400 flex flex-col md:flex-row gap-4 md:gap-8 font-bold">
                  <li><a href="#products" className="hover:text-indigo-400 transition-colors">Products</a></li>
                  <li><a href="#services" className="hover:text-indigo-400 transition-colors">Services</a></li>
                  <li><a href="#stickers" className="hover:text-indigo-400 transition-colors">Order Stickers</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800">
            <p className="text-gray-500 text-xs font-black uppercase tracking-widest">
              © {new Date().getFullYear()} AH SHOP. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
