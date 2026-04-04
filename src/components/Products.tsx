"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Plus, X, ShoppingBag, Tag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Product } from "@/lib/googleSheets";

interface ProductsProps {
  products: Product[];
}

export default function Products({ products }: ProductsProps) {
  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation(); // Don't open modal when clicking "+"
    addToCart(product);
  };

  if (!products || products.length === 0) {
    return (
      <section id="products" className="py-20 bg-slate-900 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-slate-400 font-bold">No products available at the moment.</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="products" className="py-20 bg-slate-900 overflow-hidden relative">
        {/* Background Ornaments */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
           <div className="absolute top-1/4 -left-20 w-80 h-80 bg-indigo-500 rounded-full blur-[120px]" />
           <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-emerald-500 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-[900] text-white mb-6">
              Featured <span className="text-indigo-400">Product Line</span>
            </h2>
            <p className="text-slate-400 max-w-xl font-bold leading-relaxed">
              High-quality standards for your business and family, now in our premium dark collection.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  opacity: { duration: 0.6, delay: idx * 0.05 },
                  y: { duration: 0.6, delay: idx * 0.05 },
                  scale: { duration: 0.2, ease: "easeOut" },
                  default: { duration: 0.2, ease: "easeOut" }
                }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -12,
                }}
                onClick={() => setSelectedProduct(product)}
                className="bento-card bg-white group relative flex flex-col h-full shadow-2xl shadow-indigo-900/40 hover:shadow-indigo-500/30 transition-shadow duration-300 cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden rounded-t-[2rem]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                    {product.badge && (
                      <span className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-[9px] font-black uppercase tracking-widest shadow-lg">
                        {product.badge}
                      </span>
                    )}
                  </div>
                  {/* Tap hint overlay */}
                  <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/10 transition-all duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[9px] font-black text-white uppercase tracking-widest bg-indigo-600/80 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                      Tap for details
                    </span>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className={i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-slate-200"}
                      />
                    ))}
                    <span className="text-[10px] font-black text-slate-400 ml-1 tracking-widest">{product.rating}</span>
                  </div>
                  
                  <h3 className="text-base font-[900] text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors leading-tight">
                    {product.name}
                  </h3>
                  
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50">
                    <div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5 block">Price</span>
                      <span className="text-xl font-black text-slate-900">RM {product.price}</span>
                    </div>
                    <button 
                      onClick={(e) => handleAddToCart(e, product)}
                      className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center hover:bg-indigo-600 transition-all shadow-md active:scale-95"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProduct(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xl"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-[3rem] overflow-hidden shadow-2xl w-full max-w-lg relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-5 right-5 z-10 w-10 h-10 rounded-2xl bg-slate-900/10 backdrop-blur-sm flex items-center justify-center text-slate-900 hover:bg-slate-900 hover:text-white transition-all"
              >
                <X size={18} />
              </button>

              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
                {selectedProduct.badge && (
                  <span className="absolute top-5 left-5 px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-[9px] font-black uppercase tracking-widest shadow-lg">
                    {selectedProduct.badge}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-8">
                {/* Category pill */}
                <div className="flex items-center gap-2 mb-4">
                  <Tag size={12} className="text-indigo-500" />
                  <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">{selectedProduct.category}</span>
                </div>

                <h2 className="text-2xl font-[900] text-slate-900 leading-tight mb-3">{selectedProduct.name}</h2>

                {/* Stars */}
                <div className="flex items-center gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className={i < Math.floor(selectedProduct.rating) ? "fill-amber-400 text-amber-400" : "text-slate-200"} />
                  ))}
                  <span className="text-xs font-black text-slate-400 ml-1">{selectedProduct.rating}</span>
                </div>

                {/* Description — full text, scrollable if long */}
                {selectedProduct.description && (
                  <div className="bg-slate-50 rounded-2xl p-5 mb-6 max-h-36 overflow-y-auto">
                    <p className="text-slate-600 font-bold text-sm leading-relaxed">{selectedProduct.description}</p>
                  </div>
                )}

                {/* Price + Add to Cart */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-0.5">Price</span>
                    <span className="text-3xl font-[900] text-slate-900">RM {selectedProduct.price}</span>
                  </div>
                  <button
                    onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}
                    className="flex items-center gap-3 px-7 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl active:scale-95"
                  >
                    <ShoppingBag size={18} />
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
