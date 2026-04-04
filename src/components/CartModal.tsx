"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { items, updateQuantity, removeFromCart, totalPrice, totalItems, clearCart } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-xl"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-6 pointer-events-none"
          >
            <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl shadow-black/30 overflow-hidden pointer-events-auto flex flex-col h-full max-h-[85vh] border border-slate-100">
              {/* Header */}
              <div className="p-6 md:px-10 md:py-8 border-b border-white/10 flex items-center justify-between bg-slate-900 text-white flex-shrink-0">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-900/50">
                    <ShoppingBag size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-black tracking-tight leading-tight">My Basket</h2>
                    <p className="text-[10px] font-black text-indigo-300 uppercase tracking-widest">{totalItems} Total items</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 text-white/50 flex items-center justify-center hover:bg-white/20 hover:text-white transition-all active:scale-90 shadow-sm"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Center Area (Items or Empty State) */}
              <div className="flex-grow overflow-hidden flex flex-col">
                {items.length === 0 ? (
                  <div className="flex-grow flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in duration-500">
                    <div className="w-24 h-24 rounded-full bg-indigo-50/50 flex items-center justify-center text-indigo-200 mb-6 shadow-inner border border-indigo-100/20">
                      <ShoppingBag size={48} />
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mb-2">Cart is Empty</h3>
                    <p className="text-slate-500 font-bold max-w-xs text-sm leading-relaxed">
                      Discover our premium products and start adding to your basket.
                    </p>
                  </div>
                ) : (
                  <div className="w-full h-full overflow-y-auto pr-0 py-6 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                    <div className="pl-4 pr-1 space-y-3">
                      {items.map((item) => (
                        <motion.div
                          layout
                          key={item.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-4 p-3 rounded-[2.5rem] bg-slate-50 border border-slate-100 group hover:border-indigo-100 transition-colors"
                        >
                          {/* Image (Fixed) */}
                          <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-sm flex-shrink-0 border border-white">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>

                          {/* Name (Grow Column) */}
                          <div className="flex-grow min-w-0 pr-4">
                            <h4 className="font-black text-slate-900 leading-tight truncate text-sm md:text-base">
                              {item.name}
                            </h4>
                          </div>

                          {/* Action Items - TIED TO RIGHT */}
                          <div className="flex items-center gap-4 md:gap-7 ml-auto flex-shrink-0">
                            {/* Trash Icon */}
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="w-8 h-8 rounded-xl text-slate-200 hover:text-rose-500 transition-all flex items-center justify-center"
                            >
                              <Trash2 size={14} />
                            </button>

                            {/* Price Column - ALIGN LEFT */}
                            <div className="min-w-[80px]">
                              <span className="font-black text-indigo-600 text-base md:text-base whitespace-nowrap text-left block">
                                RM {item.price}
                              </span>
                            </div>
                            
                            {/* Quantity Controls - FLUSH RIGHT */}
                            <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl shadow-sm border border-slate-100 flex-shrink-0">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-7 h-7 rounded-lg text-slate-400 flex items-center justify-center hover:bg-slate-50 hover:text-slate-900 active:scale-90 transition-all font-black"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="text-xs font-black text-slate-900 w-4 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700 active:scale-90 transition-all font-black shadow-md shadow-indigo-100"
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="p-6 md:px-12 md:py-8 bg-slate-50 border-t border-slate-100 space-y-5 flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Basket Value</p>
                      <h3 className="text-2xl md:text-3xl font-[900] text-slate-900 leading-none">
                        RM {totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </h3>
                    </div>
                    <button
                      onClick={clearCart}
                      className="px-4 py-2 rounded-xl bg-rose-50/50 text-rose-600 hover:bg-rose-100 transition-colors text-[10px] font-black uppercase tracking-[0.2em] shadow-sm border border-rose-100/50"
                    >
                      Empty Cart
                    </button>
                  </div>
                  <button className="w-full py-5 md:py-6 bg-slate-900 text-white rounded-[2rem] font-black text-lg flex items-center justify-center gap-4 hover:bg-indigo-600 transition-all shadow-xl shadow-indigo-900/10 active:scale-95 group">
                    <span>Finalize Order</span>
                    <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
