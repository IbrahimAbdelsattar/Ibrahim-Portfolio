#!/usr/bin/env node
/**
 * Generates AVIF + WebP responsive variants for every raster image served by the site.
 *
 * Source images are never modified or deleted. For each source we emit one variant per
 * configured width, per format, into `public/optimized/`, and record intrinsic dimensions
 * plus the generated width ladder in `src/generated/images-manifest.json` so the
 * <ResponsiveImage /> component can emit <picture> without layout shift.
 *
 * Re-running is incremental: a cache keyed on (settings hash, source size, source mtime,
 * width ladder) skips work that is already on disk. Pass --force to re-encode everything.
 */

import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC_DIR = path.join(ROOT, "public");
const OUT_DIR = path.join(PUBLIC_DIR, "optimized");
const CACHE_FILE = path.join(OUT_DIR, ".cache.json");
const MANIFEST_FILE = path.join(ROOT, "src", "generated", "images-manifest.json");

const FORCE = process.argv.includes("--force");

const SETTINGS = {
  avif: { quality: 50, effort: 4 },
  webp: { quality: 72, effort: 5 },
  publicCopyJpeg: { quality: 82, mozjpeg: true },
  publicCopyPng: { compressionLevel: 9, quality: 82 },
  publicCopyMaxWidth: 840,
  minSourceBytes: 8 * 1024,
};

const FORMATS = ["avif", "webp"];
const RASTER = /\.(png|jpe?g)$/i;

/**
 * Images outside /public that the site references through Vite's asset pipeline. Vite does
 * not transcode them, so we also emit an optimized public copy that <ResponsiveImage /> can
 * fall back to. Those copies must then be skipped when scanning /public for sources.
 *
 * `include` is deliberately narrow: anything listed here is copied into the deploy, so only
 * assets the site actually renders belong here.
 */
const EXTRA_SOURCES = [
  {
    from: "src/assets",
    to: "assets",
    include: ["profile-main.jpg"],
    widths: [320, 640],
  },
];
const GENERATED_DIRS = new Set(EXTRA_SOURCES.map((entry) => entry.to));

/**
 * Width ladder per source, picked from the rendered slot size on the site:
 *  - project banners live in a `h-44 sm:h-48` card strip -> 400w covers 1x, 800w covers 2x
 *  - certificates live in a `h-36 sm:h-40` card -> same ladder, 1200w for the full-size modal
 *  - gallery screenshots open in a `md:w-3/5` modal column -> 640w / 1280w
 */
function widthsFor(rel) {
  const parts = rel.split("/").filter(Boolean);
  if (parts[0] === "project-images" && parts.length > 2) return [640, 1280];
  return [400, 800, 1200];
}

const SETTINGS_HASH = createHash("sha256")
  .update(JSON.stringify({ version: 4, SETTINGS, EXTRA_SOURCES, widthsFor: widthsFor.toString() }))
  .digest("hex")
  .slice(0, 12);

/** Percent-encodes a source name so it is safe inside a `srcset` attribute (no whitespace). */
const encodeBase = (base) => encodeURIComponent(base);

/**
 * URL prefix of a source's generated variants, relative to /public/optimized (no leading or
 * trailing slash, no width/extension). `outRel` is the source's path *within the output tree*,
 * which is its /public path for served images and `<dir>/<name>` for the extra asset copies.
 */
const variantBase = (outRel) => {
  const dir = path.posix.dirname(outRel);
  const base = path.posix.basename(outRel, path.posix.extname(outRel));
  return [dir === "." ? "" : dir, encodeBase(base)].filter(Boolean).join("/");
};

const variantUrl = (outRel, width, ext) => `/optimized/${variantBase(outRel)}-${width}.${ext}`;

const variantAbsPath = (outRel, width, ext) => path.join(ROOT, "public", variantUrl(outRel, width, ext));

async function walk(dir, base = "") {
  const out = [];
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const entry of entries) {
    const rel = base ? `${base}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      if (entry.name === "optimized") continue;
      out.push(...(await walk(path.join(dir, entry.name), rel)));
    } else if (RASTER.test(entry.name)) {
      out.push(rel);
    }
  }
  return out;
}

async function pool(items, limit, worker) {
  const out = new Array(items.length);
  let cursor = 0;
  await Promise.all(
    Array.from({ length: Math.max(1, Math.min(limit, items.length)) }, async () => {
      while (cursor < items.length) {
        const index = cursor++;
        out[index] = await worker(items[index], index);
      }
    })
  );
  return out;
}

/** Every file under `dir`, as paths relative to it (unlike walk(), matches any extension). */
async function listFiles(dir, base = "") {
  const out = [];
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const entry of entries) {
    const rel = base ? `${base}/${entry.name}` : entry.name;
    if (entry.isDirectory()) out.push(...(await listFiles(path.join(dir, entry.name), rel)));
    else out.push(rel);
  }
  return out;
}

async function removeEmptyDirs(dir) {
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const child = path.join(dir, entry.name);
    await removeEmptyDirs(child);
    if ((await fs.readdir(child)).length === 0) await fs.rmdir(child);
  }
}

async function dirSize(dir) {
  let total = 0;
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return 0;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    total += entry.isDirectory() ? await dirSize(full) : (await fs.stat(full)).size;
  }
  return total;
}

const encodeVariant = (buffer, width, ext) =>
  sharp(buffer, { failOn: "none" })
    .rotate()
    .resize({ width, withoutEnlargement: true, kernel: "lanczos3" })
    [ext === "avif" ? "avif" : "webp"](ext === "avif" ? SETTINGS.avif : SETTINGS.webp)
    .toBuffer();

async function writeIfChanged(file, buffer) {
  try {
    if ((await fs.readFile(file)).equals(buffer)) return false;
  } catch {
    /* not written yet */
  }
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, buffer);
  return true;
}

const human = (bytes) => `${(bytes / 1048576).toFixed(2)} MB`;

async function main() {
  const started = Date.now();
  await fs.mkdir(OUT_DIR, { recursive: true });

  let cache = {};
  if (!FORCE) {
    try {
      cache = JSON.parse(await fs.readFile(CACHE_FILE, "utf8"));
    } catch {
      cache = {};
    }
  }

  /** @type {{key:string,rel:string,outRel:string,abs:string,url:string,widths:number[],publicCopy:boolean}[]} */
  const jobs = [];

  for (const rel of await walk(PUBLIC_DIR)) {
    if (GENERATED_DIRS.has(rel.split("/")[0])) continue;
    const abs = path.join(PUBLIC_DIR, rel);
    if ((await fs.stat(abs)).size < SETTINGS.minSourceBytes) continue;
    jobs.push({ key: rel, rel, outRel: rel, abs, url: "/" + rel, widths: widthsFor(rel), publicCopy: false });
  }

  for (const extra of EXTRA_SOURCES) {
    const wanted = extra.include ? new Set(extra.include) : null;
    for (const rel of await walk(path.join(ROOT, extra.from))) {
      if (wanted && !wanted.has(rel)) continue;
      const abs = path.join(ROOT, extra.from, rel);
      if ((await fs.stat(abs)).size < SETTINGS.minSourceBytes) continue;
      jobs.push({
        key: `extra:${extra.from}/${rel}`,
        rel,
        outRel: `${extra.to}/${rel}`,
        abs,
        url: `/${extra.to}/${rel}`,
        widths: extra.widths,
        publicCopy: true,
      });
    }
  }

  if (jobs.length === 0) {
    console.log("[images] no sources found - nothing to do");
    return;
  }

  const manifest = {};
  const nextCache = {};
  let encoded = 0;
  let cached = 0;
  let written = 0;
  let sourceBytes = 0;

  const concurrency = Math.max(2, Math.min(8, (os.cpus().length || 4) - 1));

  await pool(jobs, concurrency, async (job) => {
    const stat = await fs.stat(job.abs);
    sourceBytes += stat.size;

    const signature = `${SETTINGS_HASH}:${stat.size}:${Math.round(stat.mtimeMs)}:${job.widths.join(",")}`;
    const hit = cache[job.key];
    let entry = null;

    if (hit?.signature === signature) {
      const avifWidths = hit.entry.widths ?? [];
      const webpWidths = hit.entry.webpWidths ?? avifWidths;
      const complete =
        avifWidths.length > 0 &&
        avifWidths.every((w) => existsSync(variantAbsPath(job.outRel, w, "avif"))) &&
        webpWidths.every((w) => existsSync(variantAbsPath(job.outRel, w, "webp")));
      if (complete) {
        entry = hit.entry;
        cached++;
      }
    }

    if (!entry) {
      const buffer = await fs.readFile(job.abs);
      const meta = await sharp(buffer, { failOn: "none" }).metadata();
      const sourceWidth = meta.width ?? 0;

      // Ascending, unique, and never wider than the source: `srcset` width descriptors are
      // only valid in ascending order, and upscaling would invent detail and waste bytes.
      const widths = [...new Set(job.widths.filter((w) => w < sourceWidth))];
      if (widths.length === 0) widths.push(sourceWidth);
      widths.sort((a, b) => a - b);

      const produced = { avif: [], webp: [] };

      for (const fmt of FORMATS) {
        const buffers = await pool(widths, Math.max(1, Math.floor(concurrency / 2)), (width) =>
          encodeVariant(buffer, width, fmt)
        );
        for (let i = 0; i < widths.length; i++) {
          if (await writeIfChanged(variantAbsPath(job.outRel, widths[i], fmt), buffers[i])) written++;
          produced[fmt].push(widths[i]);
        }
      }

      if (job.publicCopy) {
        const resized = sharp(buffer, { failOn: "none" })
          .rotate()
          .resize({ width: Math.min(SETTINGS.publicCopyMaxWidth, sourceWidth), withoutEnlargement: true, kernel: "lanczos3" });
        const copy = /\.png$/i.test(job.rel)
          ? await resized.png(SETTINGS.publicCopyPng).toBuffer()
          : await resized.jpeg(SETTINGS.publicCopyJpeg).toBuffer();
        if (await writeIfChanged(path.join(ROOT, "public", job.url), copy)) written++;
      }

      entry = {
        width: sourceWidth,
        height: meta.height ?? 0,
        base: variantBase(job.outRel),
        widths: produced.avif,
        // Only recorded when the WebP ladder genuinely differs from the AVIF one.
        webpWidths: produced.webp.join(",") === produced.avif.join(",") ? undefined : produced.webp,
      };
      encoded++;
    }

    manifest[job.url] = entry;
    nextCache[job.key] = { signature, entry };
  });

  await fs.writeFile(CACHE_FILE, JSON.stringify(nextCache));
  await fs.mkdir(path.dirname(MANIFEST_FILE), { recursive: true });
  await fs.writeFile(MANIFEST_FILE, JSON.stringify(manifest));

  // Drop variants that no longer belong to any manifest entry (renamed sources, changed ladders).
  // `entry.base` is already relative to /public/optimized, so the absolute path follows directly.
  const keep = new Set();
  for (const entry of Object.values(manifest)) {
    for (const width of entry.widths) {
      keep.add(path.resolve(OUT_DIR, `${entry.base}-${width}.avif`));
    }
    for (const width of entry.webpWidths ?? entry.widths) {
      keep.add(path.resolve(OUT_DIR, `${entry.base}-${width}.webp`));
    }
  }
  let pruned = 0;
  for (const rel of await listFiles(OUT_DIR)) {
    const abs = path.resolve(path.join(OUT_DIR, rel));
    if (rel === ".cache.json" || keep.has(abs)) continue;
    await fs.rm(abs);
    pruned++;
  }
  await removeEmptyDirs(OUT_DIR);

  const variantBytes = await dirSize(OUT_DIR);

  // Report what a browser actually pays: one image at the smallest width we generated.
  let servedBytes = 0;
  let originalBytes = 0;
  for (const job of jobs) {
    const smallest = manifest[job.url].widths[0];
    if (!smallest) continue;
    const variant = (await fs.stat(variantAbsPath(job.outRel, smallest, "avif")).catch(() => ({ size: 0 }))).size;
    const original = job.publicCopy ? (await fs.stat(path.join(ROOT, "public", job.url)).catch(() => ({ size: 0 }))).size : (await fs.stat(job.abs)).size;
    servedBytes += variant;
    originalBytes += original;
  }

  console.log(`[images] ${jobs.length} sources (${human(sourceBytes)}) | ${encoded} encoded, ${cached} cached, ${written} written, ${pruned} pruned`);
  console.log(`[images] variants ${human(variantBytes)} on disk | ${Object.keys(manifest).length} manifest entries`);
  console.log(`[images] serving all ${jobs.length} images once: ${human(originalBytes)} -> ${human(servedBytes)} AVIF (${Math.round((1 - servedBytes / originalBytes) * 100)}% smaller)`);
  console.log(`[images] manifest -> ${path.relative(ROOT, MANIFEST_FILE)} | done in ${((Date.now() - started) / 1000).toFixed(1)}s`);
}

main().catch((error) => {
  console.error("[images] failed:", error);
  process.exit(1);
});