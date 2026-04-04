"use server";

import fs from "fs";
import path from "path";

export async function logToTxt(message: string, type: "info" | "error" = "info") {
  try {
    const logDir = path.join(process.cwd(), "txt");
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir);
    }

    const timestamp = new Date().toISOString();
    const fileName = type === "error" ? "error.txt" : "log.txt";
    const logPath = path.join(logDir, fileName);
    const logEntry = `[${timestamp}] [${type.toUpperCase()}] ${message}\n`;

    fs.appendFileSync(logPath, logEntry);
    return { success: true };
  } catch (err) {
    console.error("Failed to log to file:", err);
    return { success: false, error: "Logging failed" };
  }
}
