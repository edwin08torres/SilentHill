import sharp from "sharp";
import { readdir } from "fs/promises";
import { join } from "path";

const publicDir = "./public";

async function compressImages() {
  // Compress JPGs
  console.log("--- Compressing JPGs ---");

  const forestInfo = await sharp(join(publicDir, "forest.jpg")).metadata();
  console.log(`forest.jpg original: ${forestInfo.width}x${forestInfo.height}`);
  await sharp(join(publicDir, "forest.jpg"))
    .resize(1920, null, { withoutEnlargement: true })
    .jpeg({ quality: 65, mozjpeg: true })
    .toFile(join(publicDir, "forest_opt.jpg"));
  console.log("forest.jpg → compressed");

  const grugeInfo = await sharp(join(publicDir, "gruge.jpg")).metadata();
  console.log(`gruge.jpg original: ${grugeInfo.width}x${grugeInfo.height}`);
  await sharp(join(publicDir, "gruge.jpg"))
    .resize(1920, null, { withoutEnlargement: true })
    .jpeg({ quality: 50, mozjpeg: true })
    .toFile(join(publicDir, "gruge_opt.jpg"));
  console.log("gruge.jpg → compressed");

  // Convert PNGs to WebP
  console.log("\n--- Converting PNGs to WebP ---");
  const pngs = [
    "James.png",
    "Maria.png",
    "Angela.png",
    "Eddie.png",
    "RedPiramed.png",
  ];

  for (const png of pngs) {
    const name = png.replace(".png", "");
    const info = await sharp(join(publicDir, png)).metadata();
    console.log(`${png} original: ${info.width}x${info.height}`);

    await sharp(join(publicDir, png))
      .resize(800, null, { withoutEnlargement: true })
      .webp({ quality: 75 })
      .toFile(join(publicDir, `${name}.webp`));
    console.log(`${png} → ${name}.webp`);
  }

  console.log("\nDone! Check file sizes.");
}

compressImages().catch(console.error);
