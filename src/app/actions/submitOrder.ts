"use server";

import { logToTxt } from "./logger";

// This will be your Apps Script Deployment URL (ending in /exec)
const GOOGLE_ORDER_URL = process.env.GOOGLE_ORDER_SCRIPT_URL || "";

export async function submitOrder(formData: {
  name: string;
  phone: string;
  product: string;
  price: string;
  quantity: string;
  requirements: string;
  category: string;
}) {
  try {
    // 1. Prepare Month & Unique ID
    const now = new Date();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthLabel = `${months[now.getMonth()]} ${now.getFullYear()}`;
    const uniqueId = `order_${now.getTime()}_${Math.floor(Math.random() * 1000)}`;

    // 2. Log to local .txt for backup
    await logToTxt(
      `ORDER SUBMITTED - ID: ${uniqueId}, Month: ${monthLabel}, Category: ${formData.category}, Product: ${formData.product}, By: ${formData.name}`,
      "info"
    );

    // 3. Send to Google Sheets if URL is configured
    if (GOOGLE_ORDER_URL) {
      const response = await fetch(GOOGLE_ORDER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "addOrder",
          id: uniqueId, // Send the unique ID
          ...formData,
          month: monthLabel,
          timestamp: now.toISOString(),
        }),
        redirect: "follow"
      });

      if (!response.ok) {
        const errorText = await response.text().catch(() => "No error details");
        throw new Error(`Google Sheets error: ${response.status} - ${errorText.substring(0, 50)}`);
      }
    }

    return { success: true };
  } catch (error) {
    console.error("Order submission error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    await logToTxt(`ORDER ERROR: ${errorMessage}`, "error");
    return { success: false, error: errorMessage };
  }
}
