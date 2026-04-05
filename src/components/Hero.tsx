"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Printer, Sparkles, Star, Users } from "lucide-react";
import Link from "next/link";

const BentoItem = ({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function Hero() {
  return (
    <section className="pt-28 pb-8 px-4 sm:px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 auto-rows-min md:auto-rows-[220px]">
        
        {/* Main Banner */}
        <BentoItem className="md:col-span-8 md:row-span-2 bento-card p-6 sm:p-8 md:p-12 min-h-[280px] md:min-h-0 bg-slate-900 group relative">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-500/10 blur-[80px] -z-0" />
          <div className="relative z-10 flex flex-col h-full justify-center">
            <span className="flex items-center gap-2 text-indigo-400 font-black text-sm uppercase tracking-widest mb-6">
              <Sparkles size={16} fill="currentColor" />
              <span>Next Gen Marketplace</span>
            </span>
            <h1 className="text-4xl md:text-6xl font-[900] text-white leading-tight mb-8">
              Experience <span className="text-indigo-400">Premium Printing</span> & Interactive Joy.
            </h1>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="#products" className="btn-premium">
                <span>Explore Shop</span>
                <ArrowRight size={20} />
              </Link>
              <Link href="#stickers" className="px-8 py-4 rounded-2xl font-bold bg-white/10 text-white backdrop-blur-md hover:bg-white/20 transition-all text-center">
                Order Stickers
              </Link>
            </div>
          </div>
        </BentoItem>

        {/* Feature: Kids Books */}
        <BentoItem delay={0.1} className="md:col-span-4 md:row-span-1 bento-card bg-indigo-600 p-8 group overflow-hidden">
          <div className="relative z-10">
            <BookOpen size={32} className="text-indigo-200 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2 leading-tight">Interactive <br/>Learning Books</h3>
            <p className="text-indigo-100/70 text-sm font-medium">Spark creativity in every child.</p>
          </div>
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" 
          />
        </BentoItem>

        {/* Feature: Trust */}
        <BentoItem delay={0.2} className="md:col-span-4 md:row-span-1 bento-card bg-emerald-500 group">
          <Link href="#feedback" className="block p-8 h-full">
            <Users size={32} className="text-emerald-100 mb-4" />
            <h3 className="text-xl font-bold text-white mb-1">500+ Happy</h3>
            <p className="text-emerald-50/70 text-sm font-bold">Customers</p>
            <div className="mt-4 flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-white/20 border-2 border-emerald-500" />
              ))}
              <div className="w-8 h-8 rounded-full bg-emerald-400 border-2 border-emerald-500 flex items-center justify-center text-[10px] font-bold text-white">+2k</div>
            </div>
          </Link>
        </BentoItem>

        {/* Highlight Card */}
        <BentoItem delay={0.3} className="md:col-span-4 md:row-span-1 bento-card flex items-center justify-center bg-white group">
          <div className="text-center group-hover:scale-110 transition-transform">
            <div className="flex items-center justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-amber-400 text-amber-400" />)}
            </div>
            <span className="text-3xl font-[900] text-slate-900 leading-none">4.9/5</span>
            <p className="text-[10px] font-black text-slate-400 mt-1 uppercase tracking-widest">Average Rating</p>
          </div>
        </BentoItem>

        {/* Action: Services */}
        <BentoItem delay={0.4} className="md:col-span-8 md:row-span-1 bento-card p-8 bg-indigo-50 border-indigo-100 flex flex-col md:flex-row items-center justify-between group">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <div className="flex items-center justify-center md:justify-start gap-4 mb-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg">
                <Printer size={24} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Need HQ Printing?</h3>
            </div>
            <p className="text-slate-500 font-medium max-w-sm">
              We provide high-resolution printing for stickers, documents, and promotional assets. Maximize your brand's potential.
            </p>
          </div>
          <Link href="#services" className="btn-premium whitespace-nowrap bg-indigo-600">
            <span>View Services</span>
          </Link>
        </BentoItem>

      </div>
      </div>
    </section>
  );
}
