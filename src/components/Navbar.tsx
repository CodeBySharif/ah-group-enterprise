"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, User, ShoppingBag, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const NavLinks = [
  { name: "Shop", href: "#products" },
  { name: "Services", href: "#services" },
  { name: "Reviews", href: "#feedback" },
  { name: "Order", href: "#stickers" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-6 pointer-events-none">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={cn(
          "pointer-events-auto flex items-center justify-between px-4 py-2.5 rounded-[2rem] transition-all duration-500 max-w-4xl w-full border border-white/40",
          scrolled
            ? "bg-white/80 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.06)] border-slate-200/50"
            : "bg-white/40 backdrop-blur-lg border-white/20 shadow-sm"
        )}
      >
        <Link href="/" className="flex items-center gap-3 pl-2 group">
          <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
            <Sparkles size={20} fill="currentColor" />
          </div>
          <span className="font-[900] text-xl tracking-tight text-slate-900">AH</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-1.5 p-1 bg-slate-900 rounded-2xl border border-white/10">
          {NavLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="px-5 py-2 text-sm font-bold text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* <div className="flex items-center gap-2 pr-2">
          <Link
            href="/owner"
            className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-2xl hover:bg-indigo-600 transition-all shadow-lg active:scale-95"
          >
            <User size={16} />
            <span>Owner</span>
          </Link>
          
          <button 
            className="md:hidden w-10 h-10 flex items-center justify-center text-slate-800 hover:bg-slate-100 rounded-2xl transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div> */}
        <Link
          href="/owner"
          className="invisible md:flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-2xl hover:bg-indigo-600 transition-all shadow-lg active:scale-95"
        >
          <User size={16} />
          <span>Owner</span>
        </Link>

      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute top-16 left-6 right-6 p-6 rounded-[2.5rem] bg-white shadow-2xl border border-slate-200 pointer-events-auto md:hidden"
          >
            <div className="flex flex-col gap-4">
              {NavLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-4 rounded-2xl bg-slate-50 font-bold text-lg text-slate-800 hover:bg-slate-100"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/owner"
                onClick={() => setIsOpen(false)}
                className="px-6 py-4 rounded-2xl bg-indigo-600 text-white font-black text-center shadow-lg"
              >
                OWNER DASHBOARD
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
