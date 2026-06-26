"use client";

import { useState } from "react";
import { galleryPhotos, type GalleryPhoto } from "@/lib/gallery";

function LightboxModal({ photo, onClose }: { photo: GalleryPhoto; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <button
        className="absolute top-4 right-5 text-white/70 hover:text-white text-3xl font-light leading-none"
        aria-label="閉じる"
      >
        ×
      </button>
      <img
        src={photo.src}
        alt={photo.alt}
        className="max-h-[90vh] max-w-[90vw] object-contain rounded-sm"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

export default function GalleryStrip() {
  const [selected, setSelected] = useState<GalleryPhoto | null>(null);

  if (galleryPhotos.length === 0) return null;

  return (
    <>
      <div className="overflow-x-auto no-scrollbar border-y border-border-line bg-paper-alt py-4">
        <div className="flex gap-2 px-4" style={{ width: "max-content" }}>
          {galleryPhotos.map((photo) => (
            <button
              key={photo.src}
              onClick={() => setSelected(photo)}
              className="shrink-0 overflow-hidden rounded-sm cursor-zoom-in group"
              style={{ height: "180px", width: "auto" }}
              aria-label={photo.alt}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="h-full w-auto object-cover group-hover:scale-[1.04] transition-transform duration-500"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </div>

      {selected && (
        <LightboxModal photo={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
