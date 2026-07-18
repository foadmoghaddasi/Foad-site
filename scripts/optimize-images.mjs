import { readdir, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceDirectories = [path.join(root, "src/assets"), path.join(root, "public")];
const sourceExtensions = new Set([".png", ".jpg", ".jpeg"]);
const smallImageThreshold = 20 * 1024;
const articleSegment = `${path.sep}articles${path.sep}`;
const maxOutputHeight = 16_000;

const formatBytes = (bytes) => `${(bytes / 1024 / 1024).toFixed(2)} MB`;
const outputPath = (source, suffix, extension) => {
  const parsed = path.parse(source);
  return path.join(parsed.dir, `${parsed.name}${suffix}.${extension}`);
};

const walk = async (directory) => {
  try {
    const entries = await readdir(directory, { withFileTypes: true });
    const nested = await Promise.all(entries.map((entry) => {
      const target = path.join(directory, entry.name);
      if (entry.isDirectory()) return walk(target);
      return sourceExtensions.has(path.extname(entry.name).toLowerCase()) ? [target] : [];
    }));
    return nested.flat();
  } catch (error) {
    if (error?.code === "ENOENT") return [];
    throw error;
  }
};

const maxWidthFor = (source) => {
  if (source.includes(articleSegment)) return 1600;
  if (/\b(appcase|panelcase|frame18)\b/i.test(path.basename(source, path.extname(source)))) return 1600;
  return 800;
};

const needsOutput = async (source, destination, width) => {
  try {
    const [sourceStat, destinationStat, metadata] = await Promise.all([
      stat(source),
      stat(destination),
      sharp(destination).metadata(),
    ]);
    return destinationStat.mtimeMs < sourceStat.mtimeMs || (metadata.width ?? 0) > width || (metadata.height ?? 0) > maxOutputHeight;
  } catch (error) {
    if (error?.code === "ENOENT") return true;
    throw error;
  }
};

const makeWebp = async (source, destination, width) => {
  if (!(await needsOutput(source, destination, width))) return false;
  await sharp(source, { animated: false })
    .rotate()
    .resize({ width, height: maxOutputHeight, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 80, alphaQuality: 100, smartSubsample: true })
    .toFile(destination);
  return true;
};

const makeAvif = async (source, destination, width) => {
  if (!(await needsOutput(source, destination, width))) return false;
  await sharp(source, { animated: false })
    .rotate()
    .resize({ width, height: maxOutputHeight, fit: "inside", withoutEnlargement: true })
    .avif({ quality: 50, effort: 4 })
    .toFile(destination);
  return true;
};

const main = async () => {
  const files = (await Promise.all(sourceDirectories.map(walk))).flat().sort();
  const report = { scanned: files.length, optimized: 0, skipped: 0, webp: 0, avif: 0, thumbnails: 0, originalBytes: 0, deliveryBytes: 0 };

  for (const source of files) {
    const [sourceStat, metadata] = await Promise.all([stat(source), sharp(source).metadata()]);
    const width = metadata.width ?? 0;
    const height = metadata.height ?? 0;
    report.originalBytes += sourceStat.size;

    if (!width || !height || (sourceStat.size < smallImageThreshold && width <= 800 && height <= 800)) {
      report.skipped += 1;
      report.deliveryBytes += sourceStat.size;
      continue;
    }

    const maxWidth = maxWidthFor(source);
    const webpPath = outputPath(source, "", "webp");
    const createdWebp = await makeWebp(source, webpPath, maxWidth);
    const webpStat = await stat(webpPath);
    report.deliveryBytes += webpStat.size;
    report.optimized += 1;
    if (createdWebp) report.webp += 1;

    const isArticleCover = source.includes(articleSegment) && path.parse(source).name === "cover";
    if (isArticleCover) {
      const thumbPath = outputPath(source, "-thumb", "webp");
      if (await makeWebp(source, thumbPath, 700)) report.thumbnails += 1;
    }

    if (!metadata.hasAlpha && width >= 800) {
      const avifPath = outputPath(source, "", "avif");
      if (await makeAvif(source, avifPath, maxWidth)) report.avif += 1;
    }
  }

  const reduction = report.originalBytes ? (1 - report.deliveryBytes / report.originalBytes) * 100 : 0;
  console.log(`Scanned: ${report.scanned} PNG/JPG/JPEG files`);
  console.log(`Optimized: ${report.optimized}; skipped as already small: ${report.skipped}`);
  console.log(`Created: ${report.webp} WebP, ${report.avif} AVIF, ${report.thumbnails} article thumbnails`);
  console.log(`Original delivery size: ${formatBytes(report.originalBytes)}`);
  console.log(`Optimized delivery size: ${formatBytes(report.deliveryBytes)}`);
  console.log(`Estimated delivery reduction: ${reduction.toFixed(1)}%`);
};

main().catch((error) => {
  console.error(`Image optimization failed: ${error instanceof Error ? error.message : "Unknown error"}`);
  process.exitCode = 1;
});
