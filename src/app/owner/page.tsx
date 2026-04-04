import React from "react";
import OwnerDashboardClient from "@/components/OwnerDashboardClient";
import { getProducts, getOrders } from "@/lib/googleSheets";

export default async function OwnerDashboard() {
  // Fetch real data from both sheets server-side
  const [products, orders] = await Promise.all([
    getProducts(),
    getOrders()
  ]);

  return (
    <OwnerDashboardClient 
      initialProducts={products} 
      initialOrders={orders} 
    />
  );
}
