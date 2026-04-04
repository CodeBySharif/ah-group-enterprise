"use server";

import { logToTxt } from "./logger";
import { Product, Order } from "@/lib/googleSheets";

const GOOGLE_API_URL = process.env.GOOGLE_ORDER_SCRIPT_URL || "";

export async function manageProduct(action: "addProduct" | "updateProduct" | "deleteProduct", product: Partial<Product>) {
  if (!GOOGLE_API_URL) return { success: false, error: "API URL not configured" };

  try {
    const response = await fetch(GOOGLE_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, ...product }),
      redirect: "follow"
    });

    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    
    await logToTxt(`PRODUCT ${action.toUpperCase()} - ID: ${product.id}, Name: ${product.name}`, "info");
    return { success: true };
  } catch (error) {
    console.error("Product management error:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

export async function updateOrderStatus(id: string, status: Order["status"]) {
  if (!GOOGLE_API_URL) return { success: false, error: "API URL not configured" };

  try {
    console.log(`[updateOrderStatus] Sending - ID: "${id}", Status: "${status}" to ${GOOGLE_API_URL}`);
    
    const response = await fetch(GOOGLE_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "updateOrderStatus", id, status }),
      redirect: "follow"
    });

    const responseText = await response.text();
    console.log(`[updateOrderStatus] Response status: ${response.status}, Body: "${responseText}"`);

    if (!response.ok) throw new Error(`API Error: ${response.status} - ${responseText}`);
    if (responseText.includes("Error")) throw new Error(`Script Error: ${responseText}`);
    
    await logToTxt(`ORDER STATUS UPDATED - ID: ${id}, New Status: ${status}`, "info");
    return { success: true };
  } catch (error) {
    console.error("Order status update error:", error);
    await logToTxt(`STATUS UPDATE ERROR - ID: ${id}, Status: ${status}, Error: ${error instanceof Error ? error.message : "Unknown"}`, "error");
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

export async function addManualOrder(order: Partial<Order>) {
  if (!GOOGLE_API_URL) return { success: false, error: "API URL not configured" };

  try {
    const response = await fetch(GOOGLE_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "addOrder", ...order }),
      redirect: "follow"
    });

    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    
    return { success: true };
  } catch (error) {
    console.error("Manual order error:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}
