"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  LayoutDashboard,
  Search,
  Edit,
  Trash2,
  CheckCircle2,
  Clock,
  XCircle,
  Plus,
  RefreshCw,
  X,
  Tag,
  Star,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Product, Order } from "@/lib/googleSheets";
import { manageProduct, updateOrderStatus } from "@/app/actions/manageMarket";

interface OwnerDashboardClientProps {
  initialProducts: Product[];
  initialOrders: Order[];
}

const EMPTY_PRODUCT: Omit<Product, "id"> = {
  name: "",
  price: 0,
  category: "",
  image: "",
  description: "",
  rating: 5,
  badge: "",
};

// ── Modal for Create / Edit Product ─────────────────────────────────────────
function ProductFormModal({
  product,
  onClose,
  onSave,
}: {
  product: Partial<Product> | null;
  onClose: () => void;
  onSave: (p: Product) => void;
}) {
  const isEdit = !!product?.id;
  const [form, setForm] = useState<Omit<Product, "id">>({
    name: product?.name ?? "",
    price: product?.price ?? 0,
    category: product?.category ?? "",
    image: product?.image ?? "",
    description: product?.description ?? "",
    rating: product?.rating ?? 5,
    badge: product?.badge ?? "",
  });
  const [saving, setSaving] = useState(false);

  const set = (k: keyof typeof form, v: any) => setForm((f) => ({ ...f, [k]: v }));

  const handleSave = async () => {
    if (!form.name.trim()) { alert("Product Name is required."); return; }
    if (!form.price || form.price <= 0) { alert("Price must be greater than 0."); return; }
    if (!form.image.trim()) { alert("Image URL is required."); return; }
    if (!form.description.trim()) { alert("Description is required."); return; }
    if (form.rating < 0 || form.rating > 5) { alert("Rating must be between 0 and 5."); return; }
    setSaving(true);
    const id = isEdit ? product!.id! : `prod_${Date.now()}`;
    const full: Product = { id, ...form };
    const action = isEdit ? "updateProduct" : "addProduct";
    const result = await manageProduct(action, full);
    setSaving(false);
    if (result.success) {
      onSave(full);
    } else {
      alert(`Failed to save: ${result.error}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xl"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl"
      >
        {/* Header */}
        <div className="bg-slate-900 text-white px-8 py-5 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-[900] tracking-tight">{isEdit ? "Edit Product" : "New Product"}</h2>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-0.5">
              {isEdit ? "Update details below" : "Fill in the product details"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/20 transition-all"
          >
            <X size={16} />
          </button>
        </div>

        {/* Form — compact, no scroll */}
        <div className="p-6 space-y-3">
          <Field label="Product Name *" value={form.name} onChange={(v) => set("name", v)} placeholder="e.g. Hydro Spray 500ml" />
          <div className="grid grid-cols-2 gap-3">
            <Field
              label="Price (RM) *"
              type="number"
              value={form.price.toString()}
              onChange={(v) => set("price", Math.max(0, parseFloat(v) || 0))}
              placeholder="e.g. 12.90"
              min={0}
            />
            <Field
              label="Rating * (0–5)"
              type="number"
              value={form.rating.toString()}
              onChange={(v) => set("rating", Math.min(5, Math.max(0, parseFloat(v) || 0)))}
              placeholder="e.g. 4.5"
              min={0}
              max={5}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Category" value={form.category} onChange={(v) => set("category", v)} placeholder="e.g. Pesticide" />
            <Field label="Badge (optional)" value={form.badge ?? ""} onChange={(v) => set("badge", v)} placeholder="e.g. New" />
          </div>
          <Field label="Image URL *" value={form.image} onChange={(v) => set("image", v)} placeholder="https://images.unsplash.com/photo-…" />
          <Field label="Description *" value={form.description} onChange={(v) => set("description", v)} placeholder="Short product description…" multiline />
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3.5 rounded-2xl border border-slate-200 text-slate-500 font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 py-3.5 rounded-2xl bg-indigo-600 text-white font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 disabled:opacity-60 disabled:cursor-wait"
          >
            {saving ? "Saving…" : isEdit ? "Save Changes" : "Create Product"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Field({
  label, value, onChange, placeholder, type = "text", multiline = false, min, max,
}: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; type?: string; multiline?: boolean; min?: number; max?: number;
}) {
  const base = "w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-100 text-sm font-bold text-slate-900 placeholder:text-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none";
  return (
    <div>
      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 block">{label}</label>
      {multiline ? (
        <textarea rows={2} className={base} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
      ) : (
        <input type={type} min={min} max={max} className={base} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
      )}
    </div>
  );
}

// ── Main Dashboard ────────────────────────────────────────────────────────────
export default function OwnerDashboardClient({ initialProducts, initialOrders }: OwnerDashboardClientProps) {
  const [activeTab, setActiveTab] = useState<"products" | "stickers">("products");
  const [products, setProducts] = useState(initialProducts);
  const [orders, setOrders] = useState(initialOrders);
  const [search, setSearch] = useState("");
  const [filterMonth, setFilterMonth] = useState("All Months");
  const [productModal, setProductModal] = useState<{ open: boolean; product: Partial<Product> | null }>({ open: false, product: null });

  // Stats
  const pendingStickers = useMemo(() => orders.filter((o) => o.status === "Pending").length, [orders]);
  const inProgressStickers = useMemo(() => orders.filter((o) => o.status === "In Progress").length, [orders]);

  // Months for filtering
  const availableMonths = useMemo(() => ["All Months", ...new Set(orders.map((o) => o.month))], [orders]);

  // Filtered Orders
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchSearch = o.name.toLowerCase().includes(search.toLowerCase()) || o.product.toLowerCase().includes(search.toLowerCase());
      const matchMonth = filterMonth === "All Months" || o.month === filterMonth;
      return matchSearch && matchMonth;
    });
  }, [orders, search, filterMonth]);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()));
  }, [products, search]);

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleStatusUpdate = async (id: string, status: Order["status"]) => {
    const previousOrders = orders;
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    const result = await updateOrderStatus(id, status);
    if (!result.success) {
      setOrders(previousOrders);
      alert(`Failed to update status: ${result.error}`);
    }
  };

  const handleDeleteProduct = async (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    const confirmed = confirm(`Are you sure you want to delete "${product.name}"?\n\nThis action cannot be undone.`);
    if (!confirmed) return;
    const result = await manageProduct("deleteProduct", { id: product.id });
    if (result.success) {
      setProducts((prev) => prev.filter((p) => p.id !== product.id));
    } else {
      alert(`Failed to delete: ${result.error}`);
    }
  };

  const handleProductSaved = (saved: Product) => {
    setProducts((prev) => {
      const exists = prev.find((p) => p.id === saved.id);
      if (exists) return prev.map((p) => (p.id === saved.id ? saved : p));
      return [...prev, saved];
    });
    setProductModal({ open: false, product: null });
  };

  return (
    <>
      <main className="min-h-screen bg-slate-900 text-white pb-20 relative overflow-hidden">
        {/* Background Ornaments */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
          <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-indigo-500 rounded-full blur-[180px]" />
          <div className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-emerald-500 rounded-full blur-[180px]" />
        </div>

        <div className="container mx-auto max-w-7xl relative z-10 px-6 py-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-8">
            <div className="flex flex-col gap-4">
              {/* <Link href="/" className="group flex items-center space-x-3 text-slate-400 hover:text-white transition-all bg-white/5 px-4 py-2 rounded-xl border border-white/5 w-fit font-black text-[10px] uppercase tracking-widest">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                <span>Exit Hub</span>
              </Link> */}
              <Link
                href="/"
                className="invisible group flex items-center space-x-3 text-slate-400 hover:text-white transition-all bg-white/5 px-4 py-2 rounded-xl border border-white/5 w-fit font-black text-[10px] uppercase tracking-widest"
              >
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                <span>Exit Hub</span>
              </Link>

              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-[1.5rem] bg-indigo-600 flex items-center justify-center shadow-xl shadow-indigo-900/40">
                  <LayoutDashboard size={32} />
                </div>
                <div>
                  <h1 className="text-4xl font-[1000] tracking-tighter leading-none mb-1">
                    Owner <span className="text-indigo-400">Suite</span>
                  </h1>
                  <p className="text-slate-500 font-bold text-xs uppercase tracking-[0.2em]">Full Operations Control</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Products</p>
                <h3 className="text-xl font-black">{products.length}</h3>
              </div>
              <div className="p-4 rounded-3xl bg-amber-500/10 border border-amber-500/20 backdrop-blur-sm">
                <p className="text-[10px] font-black text-amber-400 uppercase tracking-widest mb-1">Pending Stickers</p>
                <h3 className="text-xl font-black text-white">{pendingStickers}</h3>
              </div>
              <div className="p-4 rounded-3xl bg-indigo-600/20 border border-indigo-500/20 backdrop-blur-sm">
                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">In Progress</p>
                <h3 className="text-xl font-black text-white">{inProgressStickers}</h3>
              </div>
              <div className="p-4 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-sm">
                <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">Total Sale</p>
                <h3 className="text-xl font-black text-white">—</h3>
                <p className="text-[9px] text-slate-600 font-black uppercase tracking-widest mt-0.5">Orders coming soon</p>
              </div>
            </div>
          </div>

          {/* Tab Bar + Search */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-6 bg-slate-800/40 p-4 rounded-[2.5rem] border border-white/5 backdrop-blur-xl">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab("products")}
                className={cn("px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all", activeTab === "products" ? "bg-white text-slate-900 shadow-xl" : "text-slate-400 hover:text-white")}
              >
                Inventory
              </button>
              <button
                onClick={() => setActiveTab("stickers")}
                className={cn("px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all relative", activeTab === "stickers" ? "bg-white text-slate-900 shadow-xl" : "text-slate-400 hover:text-white")}
              >
                Stickers
                {pendingStickers > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white rounded-full flex items-center justify-center text-[10px] border-2 border-slate-900">{pendingStickers}</span>
                )}
              </button>
            </div>

            <div className="flex items-center gap-4 flex-grow max-w-2xl px-2">
              <div className="relative flex-grow">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                <input
                  type="text"
                  placeholder={activeTab === "stickers" ? "Search sticker requests..." : "Search products..."}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-900/50 border border-white/10 text-sm font-bold focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-700"
                />
              </div>
              {activeTab === "stickers" && (
                <select
                  value={filterMonth}
                  onChange={(e) => setFilterMonth(e.target.value)}
                  className="bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400 outline-none focus:border-indigo-500 transition-all appearance-none cursor-pointer"
                >
                  {availableMonths.map((m) => <option key={m} value={m}>{m}</option>)}
                </select>
              )}
              {/* + Button only shows on Inventory tab */}
              {activeTab === "products" && (
                <button
                  onClick={() => setProductModal({ open: true, product: null })}
                  className="flex items-center justify-center w-14 h-14 bg-indigo-600 text-white rounded-2xl flex-shrink-0 hover:bg-white hover:text-slate-900 transition-all shadow-lg active:scale-90 group"
                >
                  <Plus size={24} className="group-hover:rotate-90 transition-transform duration-300" />
                </button>
              )}
            </div>
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            {activeTab === "products" ? (
              <motion.div
                key="products"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {filteredProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => setProductModal({ open: true, product: p })}
                    className="bg-white rounded-[2.5rem] p-5 relative flex flex-col h-full shadow-2xl shadow-indigo-900/20 border-2 border-transparent hover:border-indigo-200 transition-all cursor-pointer group"
                  >
                    {/* Delete button — always visible top-right */}
                    <button
                      onClick={(e) => handleDeleteProduct(e, p)}
                      className="absolute top-4 right-4 z-10 w-9 h-9 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-400 hover:bg-rose-500 hover:text-white transition-all shadow-sm active:scale-90"
                    >
                      <Trash2 size={14} />
                    </button>

                    <div className="relative h-36 mb-4 bg-slate-50 rounded-2xl overflow-hidden">
                      <img src={p.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={p.name} />
                    </div>

                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">{p.category}</p>
                    <h3 className="text-base font-black text-slate-900 leading-tight mb-3 flex-grow">{p.name}</h3>

                    <div className="pt-3 border-t border-slate-50 flex items-center justify-between">
                      <span className="font-black text-slate-900">RM {p.price}</span>
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={10} className={i < Math.floor(p.rating) ? "fill-amber-400 text-amber-400" : "text-slate-200"} />
                        ))}
                      </div>
                    </div>

                    {/* Edit hint */}
                    <div className="mt-3 flex items-center gap-2 text-[9px] font-black text-slate-300 uppercase tracking-widest">
                      <Edit size={10} />
                      Click to edit
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="stickers"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-[3rem] overflow-hidden shadow-2xl shadow-indigo-900/20"
              >
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-slate-900 text-white/50 text-[10px] font-black uppercase tracking-widest">
                        <th className="px-10 py-8 text-left">Customer</th>
                        <th className="px-6 py-8 text-left">Product / Req</th>
                        <th className="px-6 py-8 text-center">Qty / Total</th>
                        <th className="px-6 py-8 text-left">Month</th>
                        <th className="px-6 py-8 text-center">Status</th>
                        <th className="pr-10 py-8 text-right">Update</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-600 font-bold divide-y divide-slate-50">
                      {filteredOrders.length > 0 ? (
                        filteredOrders.map((o, i) => (
                          <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-10 py-8">
                              <div className="flex flex-col">
                                <span className="text-slate-900 text-base font-black leading-none mb-1.5">{o.name}</span>
                                <span className="text-[10px] tracking-wider font-black text-slate-400 uppercase">{o.phone}</span>
                              </div>
                            </td>
                            <td className="px-6 py-8">
                              <div className="max-w-xs">
                                <span className="text-slate-900 text-sm font-black block mb-1">{o.product}</span>
                                <span className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{o.requirements}</span>
                              </div>
                            </td>
                            <td className="px-6 py-8 text-center">
                              <div className="flex flex-col items-center">
                                <span className="text-slate-900 font-black">{o.quantity} Units</span>
                                <span className="text-[10px] font-black text-emerald-600 tracking-widest uppercase mt-1">
                                  RM {(parseFloat(o.price) * parseInt(o.quantity)).toLocaleString()}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-8">
                              <span className="text-xs font-black text-slate-900 uppercase tracking-widest">{o.month}</span>
                            </td>
                            <td className="px-6 py-8">
                              <div className="flex items-center justify-center">
                                <StatusBadge status={o.status} />
                              </div>
                            </td>
                            <td className="pr-10 py-8 text-right">
                              <select
                                value={o.status}
                                onChange={(e) => handleStatusUpdate(o.id, e.target.value as any)}
                                className="bg-slate-100 border-0 rounded-xl px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-900 outline-none hover:bg-indigo-600 hover:text-white transition-all cursor-pointer"
                              >
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                                <option value="Canceled">Canceled</option>
                              </select>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="py-20 text-center text-slate-400 font-black uppercase tracking-widest text-sm">
                            No matching sticker requests found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Product Create/Edit Modal */}
      <AnimatePresence>
        {productModal.open && (
          <ProductFormModal
            product={productModal.product}
            onClose={() => setProductModal({ open: false, product: null })}
            onSave={handleProductSaved}
          />
        )}
      </AnimatePresence>
    </>
  );
}

// ── Status Badge ─────────────────────────────────────────────────────────────
const StatusBadge = ({ status }: { status: Order["status"] }) => {
  const styles = {
    Pending: "bg-amber-50 text-amber-600 border-amber-100",
    "In Progress": "bg-indigo-50 text-indigo-600 border-indigo-100",
    Completed: "bg-emerald-50 text-emerald-600 border-emerald-100",
    Canceled: "bg-rose-50 text-rose-600 border-rose-100",
  };
  const Icons = { Pending: Clock, "In Progress": RefreshCw, Completed: CheckCircle2, Canceled: XCircle };
  const Icon = Icons[status];
  return (
    <div className={cn("px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-2 border", styles[status])}>
      <Icon size={12} className={status === "In Progress" ? "animate-spin-slow" : ""} />
      {status}
    </div>
  );
};
