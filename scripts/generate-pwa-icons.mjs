import sharp from "sharp";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public");
const brand = { r: 99, g: 102, b: 241 };

async function solidIcon(size, outName) {
  await sharp({
    create: {
      width: size,
      height: size,
      channels: 3,
      background: brand,
    },
  })
    .png()
    .toFile(join(publicDir, outName));
}

/** Maskable: full-bleed brand color (safe for adaptive icons). */
async function maskableIcon(size, outName) {
  await solidIcon(size, outName);
}

await solidIcon(192, "icon-192x192.png");
await solidIcon(512, "icon-512x512.png");
await maskableIcon(192, "icon-maskable-192x192.png");
await maskableIcon(512, "icon-maskable-512x512.png");

console.log("Wrote PWA icons to public/");
