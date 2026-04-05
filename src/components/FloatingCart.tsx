"use client";

import React, { useState } from "react";
import { ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { usePathname } from "next/navigation";
import CartModal from "./CartModal";
import { cn } from "@/lib/utils";

export default function FloatingCart() {
  const [isOpen, setIsOpen] = useState(false);
  const { totalItems } = useCart();
  const pathname = usePathname();

  // Don't show cart on the owner dashboard
  if (pathname.startsWith("/owner")) return null;

  return (
    <>
      <div
        className={cn(
          "fixed z-[60] pointer-events-none",
          "top-[max(1rem,env(safe-area-inset-top))]",
          "right-[max(1rem,env(safe-area-inset-right))]"
        )}
      >
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          className={cn(
            "pointer-events-auto w-14 h-14 rounded-2xl bg-white border border-slate-200 shadow-xl flex items-center justify-center text-slate-900 transition-all group relative",
            totalItems > 0 && "border-indigo-500 shadow-indigo-100"
          )}
        >
          <ShoppingBag size={24} className="group-hover:text-indigo-600 transition-colors" />
          
          <AnimatePresence>
            {totalItems > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-indigo-600 text-white text-[10px] font-black flex items-center justify-center shadow-lg shadow-indigo-200 border-2 border-white"
              >
                {totalItems}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      <CartModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
