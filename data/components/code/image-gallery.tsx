"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

// ----------------------
// Context
// ----------------------
interface GalleryContextProps {
  images: string[];
  title?: string;
  index: number | null;
  setIndex: (i: number | null) => void;
  next: () => void;
  prev: () => void;
}
const GalleryContext = createContext<GalleryContextProps | null>(null);
function useGallery() {
  const ctx = useContext(GalleryContext);
  if (!ctx) throw new Error("Gallery.* must be used inside <Gallery.Root>");
  return ctx;
}

// ----------------------
// Root Provider
// ----------------------
function Root({
  images,
  title,
  children,
}: {
  images: string[];
  title?: string;
  children: React.ReactNode;
}) {
  const [index, setIndex] = useState<number | null>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  const next = useCallback(
    () => setIndex((i) => (i === null ? 0 : (i + 1) % images.length)),
    [images.length],
  );
  const prev = useCallback(
    () =>
      setIndex((i) =>
        i === null ? 0 : (i - 1 + images.length) % images.length,
      ),
    [images.length],
  );

  // keyboard support
  useEffect(() => {
    if (index === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIndex(null);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [index, next, prev]);

  return (
    <GalleryContext.Provider
      value={{ images, title, index, setIndex, next, prev }}
    >
      {children}
      <AnimatePresence>
        {index !== null && <Viewer stripRef={stripRef} />}
      </AnimatePresence>
    </GalleryContext.Provider>
  );
}

// ----------------------
// Grid
// ----------------------
function Grid() {
  const { images, title, setIndex } = useGallery();
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {images.map((src, i) => (
        <motion.div
          key={i}
          layoutId={`img-${i}`}
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 250, damping: 20 }}
          className="group cursor-pointer"
          onClick={() => setIndex(i)}
        >
          <div className="bg-muted relative aspect-video overflow-hidden rounded-xl shadow-md ring-1 ring-black/5">
            <Image
              src={src}
              alt={`${title ?? "image"} ${i + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ----------------------
// Viewer
// ----------------------
function Viewer({
  stripRef,
}: {
  stripRef: React.RefObject<HTMLDivElement | null>;
}) {
  const { index, setIndex, images, next, prev } = useGallery();
  const [firstOpen, setFirstOpen] = useState(true); // track if initial maximize

  if (index === null) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col bg-black/80 backdrop-blur-lg"
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Titlebar */}
      <div className="flex items-center justify-between border-b border-white/10 bg-black/40 px-4 py-2">
        <span className="text-xs text-white/70">
          {index + 1} / {images.length}
        </span>
        <button
          aria-label="Close"
          onClick={() => setIndex(null)}
          className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Main image */}
      <div className="relative flex flex-1 items-center justify-center">
        {firstOpen ? (
          <motion.div
            key={images[index]}
            layoutId={`img-${index}`}
            className="relative aspect-video w-full max-w-5xl overflow-hidden rounded-xl"
            initial={{ opacity: 0.8, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 180, damping: 20 }}
            onAnimationComplete={() => setFirstOpen(false)}
          >
            <Image
              src={images[index]}
              alt={`Image ${index + 1}`}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        ) : (
          <motion.div
            key={images[index]}
            className="relative aspect-video w-full max-w-5xl overflow-hidden rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={images[index]}
              alt={`Image ${index + 1}`}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        )}
        <NavButton dir="left" onClick={prev} />
        <NavButton dir="right" onClick={next} />
      </div>

      {/* Thumbnails */}
      <ThumbnailStrip stripRef={stripRef} />
    </motion.div>
  );
}

// ----------------------
// NavButton
// ----------------------
function NavButton({
  dir,
  onClick,
}: {
  dir: "left" | "right";
  onClick: () => void;
}) {
  const Icon = dir === "left" ? ChevronLeft : ChevronRight;
  const pos = dir === "left" ? "left-4" : "right-4";
  return (
    <button
      aria-label={dir === "left" ? "Previous" : "Next"}
      onClick={onClick}
      className={`absolute top-1/2 ${pos} -translate-y-1/2 rounded-full bg-white/10 p-3 text-white ring-1 ring-white/20 backdrop-blur-sm transition-colors hover:bg-white/20`}
    >
      <Icon className="h-6 w-6" />
    </button>
  );
}

// ----------------------
// Thumbnail Strip (Improved)
// ----------------------
function ThumbnailStrip({
  stripRef,
}: {
  stripRef: React.RefObject<HTMLDivElement | null>;
}) {
  const { images, index, setIndex } = useGallery();

  // Auto-center active thumbnail
  useEffect(() => {
    if (index === null || !stripRef.current) return;
    const el = stripRef.current.children[index] as HTMLElement | undefined;
    el?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [index, stripRef]);

  return (
    <div className="border-t border-white/10 px-4 py-2">
      <div
        ref={stripRef}
        className="scrollbar-hide flex snap-x snap-mandatory justify-center gap-3 overflow-x-auto py-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {images.map((src, i) => {
          const isActive = index === i;
          return (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className="relative h-20 w-28 flex-shrink-0 snap-center rounded-xl transition-all duration-300"
              aria-label={`Show image ${i + 1}`}
            >
              <div className="relative h-full w-full overflow-hidden rounded-xl">
                <Image
                  src={src}
                  alt={`Thumbnail ${i + 1}`}
                  fill
                  className="z-20 object-cover"
                  sizes="112px"
                />
              </div>
              {isActive && (
                <motion.div
                  layoutId="active-thumb"
                  className="pointer-events-none absolute -inset-1 z-10 rounded-2xl bg-white"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ----------------------
// Attach subcomponents
// ----------------------
export const Gallery = {
  Root,
  Grid,
  Viewer,
  ThumbnailStrip,
  NavButton,
};
