export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  rating: number;
  badge?: string;
}

export interface Order {
  id: string; // The unique ID from column 11
  timestamp: string;
  month: string;
  name: string;
  phone: string;
  product: string;
  price: string;
  quantity: string;
  requirements: string;
  category: string;
  status: "Pending" | "In Progress" | "Completed" | "Canceled";
}

const SHEET_URL = process.env.GOOGLE_SHEET_URL || "";
const ORDER_SHEET_URL = process.env.GOOGLE_ORDER_SHEET_URL || "";

/**
 * Robust CSV parser that correctly handles commas inside quoted fields.
 * This prevents fields like "Requirements" from breaking column indices.
 */
function parseCSVRow(row: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < row.length; i++) {
    const char = row[i];
    if (char === '"') {
      if (inQuotes && row[i + 1] === '"') {
        current += '"';
        i++; // skip escaped double-quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

/**
 * Fetches product data from your published Google Sheet (CSV format).
 */
export async function getProducts(): Promise<Product[]> {
  if (!SHEET_URL) return [];
  try {
    const response = await fetch(SHEET_URL, { 
      next: { revalidate: 0 },
      cache: 'no-store'
    });
    const text = await response.text();
    const rows = text.split("\n").filter(row => row.trim() !== "");
    const headers = parseCSVRow(rows[0]).map(h => h.toLowerCase());
    const dataRows = rows.slice(1);
    
    return dataRows.map((row) => {
      const values = parseCSVRow(row);
      const product: any = {};
      headers.forEach((header, index) => {
        const val = values[index] || "";
        if (header === 'price' || header === 'rating') {
          product[header] = parseFloat(val || "0");
        } else {
          product[header] = val;
        }
      });
      return product as Product;
    }).filter(p => p.name);
  } catch (error) {
    console.error("Error fetching Products:", error);
    return [];
  }
}

/**
 * Fetches order data from your published Google Sheet (CSV format).
 */
export async function getOrders(): Promise<Order[]> {
  if (!ORDER_SHEET_URL) return [];
  try {
    const response = await fetch(ORDER_SHEET_URL, { 
      next: { revalidate: 0 },
      cache: 'no-store'
    });
    const text = await response.text();
    const rows = text.split("\n").filter(row => row.trim() !== "");
    if (rows.length < 2) return [];

    const dataRows = rows.slice(1);
    return dataRows.map((row) => {
      const values = parseCSVRow(row); // Robust parser handles commas in fields!
      return {
        timestamp: values[0] || "",
        month:     values[1] || "",
        name:      values[2] || "",
        phone:     values[3] || "",
        product:   values[4] || "",
        price:     values[5] || "",
        quantity:  values[6] || "",
        requirements: values[7] || "",
        category:  values[8] || "",
        status:    (values[9] as any) || "Pending",
        id:        values[10] || "", // OrderID is Column K / index 10
      };
    }).filter(o => o.name);
  } catch (error) {
    console.error("Error fetching Orders:", error);
    return [];
  }
}
