"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Send, 
  CheckCircle, 
  AlertCircle, 
  Loader2, 
  Sticker, 
  User, 
  Building, 
  Info, 
  DollarSign,
  Package,
  Utensils,
  Briefcase,
  Heart,
  Layers,
  HelpCircle,
  Hash
} from "lucide-react";
import { cn } from "@/lib/utils";
import { logToTxt } from "@/app/actions/logger";
import { submitOrder } from "@/app/actions/submitOrder";

const stickerCategories = [
  { id: "Product Label", icon: Package, label: "Product Label", desc: "For jars, bottles & boxes" },
  { id: "Food Packaging", icon: Utensils, label: "Food Packaging", desc: "Safe for food containers" },
  { id: "Business Logo", icon: Briefcase, label: "Business Logo", desc: "Perfect for branding" },
  { id: "Thank You", icon: Heart, label: "Thank You", desc: "Customer appreciation" },
  { id: "Custom Shape", icon: Layers, label: "Custom Shape", desc: "Unique die-cut designs" },
  { id: "Others", icon: HelpCircle, label: "Others", desc: "Special requirements" },
];

export default function StickerForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    productName: "",
    details: "",
    price: "",
    quantity: "",
    contact: "",
    owner: "",
    stickerType: "Product Label",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const result = await submitOrder({
        name: formData.owner,
        phone: formData.contact,
        product: formData.productName,
        price: formData.price,
        quantity: formData.quantity,
        requirements: formData.details,
        category: formData.stickerType,
      });

      if (result.success) {
        setStatus("success");
        setFormData({
          productName: "",
          details: "",
          price: "",
          quantity: "",
          contact: "",
          owner: "",
          stickerType: "Product Label",
        });
      } else {
        throw new Error(result.error);
      }
    } catch (err) {
      console.error("Submission error:", err);
      setStatus("error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (status === "success") {
    return (
      <section id="stickers" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bento-card p-12 text-center flex flex-col items-center bg-indigo-600 text-white border-0 shadow-2xl shadow-indigo-100"
          >
            <div className="w-20 h-20 bg-white/20 rounded-[1.5rem] flex items-center justify-center mb-6 backdrop-blur-md">
              <CheckCircle size={40} />
            </div>
            <h2 className="text-3xl font-black mb-4">Request Sent!</h2>
            <p className="text-indigo-100 mb-8 max-w-sm font-bold text-base">
              We've received your request. We'll reach out to you within 24 hours.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="px-10 py-4 rounded-xl bg-white text-indigo-600 font-black text-base shadow-xl hover:-translate-y-1 transition-all active:scale-95"
            >
              New Request
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="stickers" className="py-20 bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-[900] text-slate-900 mb-6">
            Sticker <span className="text-indigo-600">Order System</span>
          </h2>
          <p className="text-slate-500 max-w-lg mx-auto font-bold text-sm">
            Launch your custom stickers with our intuitive configuration engine.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Step 1: Select Category - WRAPPED IN CARD WITH DARK OUTLINE */}
          <div className="bento-card p-8 md:p-12 bg-white border-2 border-slate-900 shadow-xl flex flex-col h-full">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-10 self-start">
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center">1</span>
              <span>Select Category</span>
            </div>
            <div className="grid grid-cols-2 gap-4 flex-grow">
              {stickerCategories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setFormData(p => ({ ...p, stickerType: cat.id }))}
                  className={cn(
                    "bento-card p-6 flex flex-col items-center justify-center text-center transition-all group border-2 h-full min-h-[140px]",
                    formData.stickerType === cat.id 
                      ? "bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-100" 
                      : "bg-white hover:bg-slate-50 border-transparent"
                  )}
                >
                  <cat.icon size={28} className={cn("mb-4 transition-transform group-hover:scale-110", formData.stickerType === cat.id ? "text-white" : "text-indigo-600")} />
                  <span className="font-black text-sm mb-1 leading-tight">{cat.label}</span>
                  <span className={cn("text-[10px] font-bold uppercase tracking-wider", formData.stickerType === cat.id ? "text-indigo-200" : "text-slate-400")}>
                    {cat.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Order Details - DARK BLUE THEME */}
          <form onSubmit={handleSubmit} className="bento-card p-8 md:p-12 bg-slate-900 shadow-2xl border-white/10 flex flex-col h-full">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/50 text-[10px] font-black uppercase tracking-[0.2em] mb-10 self-start">
              <span className="w-5 h-5 rounded-full bg-indigo-500 text-white flex items-center justify-center">2</span>
              <span>Order Details</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-grow">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Name</label>
                <div className="relative">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                  <input
                    type="text"
                    name="owner"
                    value={formData.owner}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Johnathan Doe"
                    className="w-full pl-12 pr-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-bold text-sm placeholder:text-slate-700"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Contact Detail</label>
                <div className="relative">
                  <Building className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                  <input
                    type="text"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    required
                    placeholder="WhatsApp / Mobile"
                    className="w-full pl-12 pr-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-bold text-sm placeholder:text-slate-700"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Product</label>
                <div className="relative">
                  <Info className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                  <input
                    type="text"
                    name="productName"
                    value={formData.productName}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Vintage Honey Jar Labels"
                    className="w-full pl-12 pr-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-bold text-sm placeholder:text-slate-700"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Price</label>
                <div className="relative">
                  <DollarSign className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    placeholder="Target Price"
                    className="w-full pl-12 pr-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-bold text-sm placeholder:text-slate-700"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Quantity</label>
                <div className="relative">
                  <Hash className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                  <input
                    type="text"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                    placeholder="No. of stickers"
                    className="w-full pl-12 pr-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-bold text-sm placeholder:text-slate-700"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Design Requirement</label>
                <textarea
                  name="details"
                  value={formData.details}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Colors, specific design requirements..."
                  className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-bold text-sm placeholder:text-slate-700"
                />
              </div>

              <div className="sm:col-span-2 pt-6 mt-auto">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className={cn(
                    "w-full py-6 rounded-2xl flex items-center justify-center gap-4 text-xl font-black shadow-2xl transition-all",
                    status === "loading" ? "bg-white/10 text-white/20 cursor-not-allowed" : "bg-white text-slate-900 hover:bg-indigo-500 hover:text-white"
                  )}
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 size={24} className="animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <span>Order Now</span>
                      <Send size={24} />
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
