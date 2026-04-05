"use client";

import React from "react";
import { Star, MessageCircle, Quote, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const TestimonialsList = [
  {
    name: "Sarah Johnson",
    role: "Local Bakery Owner",
    message: "The custom stickers from AH Shop boosted our brand identity instantly. High quality and fast delivery!",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "E-commerce Seller",
    message: "Excellent printing quality. My product packaging looks so much more professional now. Highly recommend!",
    rating: 5,
  },
  {
    name: "Emma Williams",
    role: "Parent",
    message: "My kids absolutely love the learning books. They are so interactive and the colors are vibrant!",
    rating: 4,
  },
  {
    name: "David Smith",
    role: "Small Business Owner",
    message: "Great customer service and the anti-bug spray actually works miracles for our outdoor cafe area.",
    rating: 5,
  },
  {
    name: "Lisa Anderson",
    role: "Freelance Designer",
    message: "As a designer, I'm picky about print quality. AH Shop exceeded my expectations. Best in the business!",
    rating: 5,
  },
];

export default function Testimonials() {
  const doubledTestimonials = [...TestimonialsList, ...TestimonialsList];

  return (
    <section id="feedback" className="py-20 bg-slate-900 overflow-hidden relative border-y border-white/5">
      {/* Background Ornaments */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-20">
         <div className="absolute top-1/2 left-0 w-96 h-96 bg-indigo-600 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-6 mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-[900] uppercase tracking-widest mb-6 border border-emerald-500/20">
            <CheckCircle size={14} />
            <span>Verified Stories</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-[900] text-white mb-6">
            Trusted by <span className="text-emerald-400">The Modern World</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto font-bold">
            Join hundreds of successful business owners and happy parents who 
            trust AH Shop.
          </p>
        </div>

        <div className="relative flex overflow-hidden">
          <div className="animate-marquee-slow flex gap-6 px-6">
            {doubledTestimonials.map((t, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="inline-block w-[min(400px,calc(100vw-3rem))] shrink-0 p-6 sm:p-10 rounded-[2.5rem] bg-white whitespace-normal group hover:shadow-2xl hover:shadow-indigo-900/40 transition-all duration-300"
              >
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className={i < t.rating ? "fill-amber-400 text-amber-400" : "text-slate-200"} />
                  ))}
                </div>
                
                <Quote className="text-indigo-100 mb-6 group-hover:text-indigo-200 transition-colors" size={40} />
                
                <p className="text-slate-700 mb-10 font-[500] text-lg leading-relaxed italic tracking-tight">
                  "{t.message}"
                </p>
                
                <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-indigo-100">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-base">{t.name}</h4>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
