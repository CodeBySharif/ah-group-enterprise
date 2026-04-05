"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, User, Sparkles } from "lucide-react";
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

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none",
        "pt-[max(1rem,env(safe-area-inset-top))]",
        "pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))]"
      )}
    >
      <div className="pointer-events-auto w-full min-w-0 max-w-4xl relative">
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={cn(
            "flex min-w-0 max-w-full items-center justify-between gap-2 px-3 py-2.5 sm:px-4 rounded-[2rem] transition-all duration-500 w-full border border-white/40",
            scrolled
              ? "bg-white/80 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.06)] border-slate-200/50"
              : "bg-white/40 backdrop-blur-lg border-white/20 shadow-sm"
          )}
        >
          <Link href="/" className="flex items-center gap-2 sm:gap-3 pl-1 sm:pl-2 group shrink-0 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform shrink-0">
              <Sparkles size={20} fill="currentColor" />
            </div>
            <span className="font-[900] text-lg sm:text-xl tracking-tight text-slate-900 truncate">
              AH
            </span>
          </Link>

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

          <div className="flex items-center gap-2 pr-1 shrink-0">
            <Link
              href="/owner"
              className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-2xl hover:bg-indigo-600 transition-all shadow-lg active:scale-95"
            >
              <User size={16} />
              <span>Owner</span>
            </Link>
            <button
              type="button"
              className="md:hidden w-11 h-11 flex items-center justify-center text-slate-800 hover:bg-slate-100 rounded-2xl transition-colors"
              aria-expanded={isOpen}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </motion.nav>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 right-0 top-[calc(100%+0.5rem)] p-4 rounded-[2.5rem] bg-white shadow-2xl border border-slate-200 md:hidden z-[60]"
            >
              <div className="flex flex-col gap-3">
                {NavLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="px-6 py-4 rounded-2xl bg-slate-50 font-bold text-lg text-slate-800 hover:bg-slate-100 active:bg-slate-100"
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
    </div>
  );
}
