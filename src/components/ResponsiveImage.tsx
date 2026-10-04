import type { CSSProperties } from "react";
import manifestJson from "@/generated/images-manifest.json";

/**
 * A single entry per source image, produced by `scripts/optimize-images.mjs`.
 * `base` is the shared URL prefix of every generated variant, so a variant at width `w` is
 * always `/optimized/${base}-${w}.avif` (or `.webp`).
 *
 * `widths` is the ladder shared by both formats; `webpWidths` only appears when the WebP
 * ladder genuinely differs, which keeps the manifest small enough to inline.
 */
export interface ImageVariantEntry {
  width: number;
  height: number;
  base: string;
  widths: number[];
  webpWidths?: number[];
}

const manifest = manifestJson as unknown as Record<string, ImageVariantEntry>;

const getImageVariant = (src: string): ImageVariantEntry | undefined =>
  manifest[src];

const srcSetFor = (base: string, widths: number[], ext: "avif" | "webp") =>
  widths.map((w) => `/optimized/${base}-${w}.${ext} ${w}w`).join(", ");

interface ResponsiveImageProps {
  /** Public URL of the fallback image, used as the manifest key. */
  src: string;
  alt: string;
  /** Layout width hint. Required for the browser to pick a sensible variant. */
  sizes?: string;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
  decoding?: "async" | "sync" | "auto";
  className?: string;
  style?: CSSProperties;
  draggable?: boolean;
  /** Escape hatch when the intrinsic size must not drive layout. */
  intrinsic?: boolean;
}

const ResponsiveImage = ({
  src,
  alt,
  sizes = "100vw",
  loading = "lazy",
  fetchPriority = "auto",
  decoding = "async",
  className,
  style,
  draggable,
  intrinsic = true,
}: ResponsiveImageProps) => {
  const entry = getImageVariant(src);
  const avifWidths = entry?.widths ?? [];
  const webpWidths = entry?.webpWidths ?? avifWidths;
  const hasVariants = avifWidths.length > 0 && webpWidths.length > 0;
  // React 18 forwards this native browser attribute using its lowercase spelling.
  const priorityAttribute = { fetchpriority: fetchPriority };

  return (
    // `display: contents` keeps the wrapper out of layout, so the <img> behaves exactly as it
    // would without a <picture> around it (absolute positioning, flex items, block flow).
    <picture style={{ display: "contents" }}>
      {hasVariants && (
        <source type="image/avif" srcSet={srcSetFor(entry.base, avifWidths, "avif")} sizes={sizes} />
      )}
      {hasVariants && (
        <source type="image/webp" srcSet={srcSetFor(entry.base, webpWidths, "webp")} sizes={sizes} />
      )}
      <img
        src={src}
        alt={alt}
        width={intrinsic ? entry?.width : undefined}
        height={intrinsic ? entry?.height : undefined}
        loading={loading}
        {...priorityAttribute}
        decoding={decoding}
        draggable={draggable}
        className={className}
        style={style}
      />
    </picture>
  );
};

export default ResponsiveImage;
