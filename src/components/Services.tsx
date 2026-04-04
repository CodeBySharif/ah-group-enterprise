"use client";

import React from "react";
import { motion } from "framer-motion";
import { Printer, Sticker, Zap, Target } from "lucide-react";
import { cn } from "@/lib/utils";

const ServicesList = [
  {
    title: "Document Printing",
    icon: Printer,
    desc: "Professional high-resolution results for businesses and marketing material.",
    features: ["B&W & Full Color", "Next-Day Delivery"],
    color: "bg-indigo-600",
    size: "large",
  },
  {
    title: "Custom Stickers",
    icon: Sticker,
    desc: "From packaging to branded assets with weatherproof options.",
    features: ["Any Shape/Size", "Weatherproof"],
    color: "bg-emerald-500",
    size: "large",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-12 px-6">
          <h2 className="text-3xl md:text-5xl font-[900] text-slate-900 mb-6">
            Core <span className="text-indigo-600">Services Hub</span>
          </h2>
          <p className="text-slate-500 max-w-lg mx-auto font-bold text-sm">
            Precision-driven printing and custom sticker solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-[280px]">
          {ServicesList.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={cn(
                "bento-card group flex flex-col p-8 relative overflow-hidden",
                service.color
              )}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[60px] rounded-full -mr-16 -mt-16 pointer-events-none" />

              <div className="relative z-10 flex flex-col h-full">
                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                  <service.icon size={24} strokeWidth={2.5} />
                </div>
                
                <h3 className="text-2xl font-[900] text-white mb-3 tracking-tight leading-tight">
                  {service.title}
                </h3>
                
                <p className="text-white/80 font-bold mb-6 max-w-sm text-sm">
                  {service.desc}
                </p>
                
                <div className="mt-auto flex flex-wrap gap-2">
                  {service.features.map((feature, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-white text-[9px] font-black uppercase tracking-widest">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              <div className="absolute bottom-6 right-6 opacity-10 group-hover:opacity-30 transition-opacity">
                <Zap size={80} strokeWidth={1} className="text-white" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
