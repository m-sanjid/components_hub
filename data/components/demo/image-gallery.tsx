"use client";

import { GalleryRoot, GalleryGrid } from "../code/image-gallery";

const IMAGES = [
  "/images/911carrera.avif",
  "/images/gt3.avif",
  "/images/gt3rs.avif",
  "/images/m5.webp",
  "/images/m340i.jpg",
];

export default function GalleryExamplePage() {
  return (
    <main className="container mx-auto max-w-6xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-semibold tracking-tight">
        Gallery Demo
      </h1>
      <p className="text-muted-foreground mb-8">
        Click an image to open the fullscreen viewer. Use ← / → to navigate, Esc
        to close.
      </p>

      <GalleryRoot images={IMAGES} title="Demo Gallery">
        <GalleryGrid />
      </GalleryRoot>
    </main>
  );
}
