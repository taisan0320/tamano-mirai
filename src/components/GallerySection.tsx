"use client";

import { useState } from "react";
import { galleryPhotos, type GalleryPhoto } from "@/lib/gallery";

function LightboxModal({
  photo,
  onClose,
}: {
  photo: GalleryPhoto;
  onClose: () => void;
}) {
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

export default function GallerySection() {
  const [selected, setSelected] = useState<GalleryPhoto | null>(null);

  if (galleryPhotos.length === 0) {
    return (
      <section className="bg-paper-alt border-t border-border-line">
        <div className="max-w-[1400px] mx-auto px-6 py-20 lg:py-28">
          <div className="mb-12">
            <p className="section-label text-ink-muted mb-4">Photo Gallery · 活動の記録</p>
            <h2 className="font-serif-h text-4xl sm:text-5xl lg:text-6xl font-black leading-tight text-ink">
              現場の<span className="accent-coral">一瞬</span>を。
            </h2>
          </div>
          <div className="py-20 flex flex-col items-center justify-center text-center border border-dashed border-border-line rounded-sm bg-paper">
            <p className="section-label text-ink-muted mb-2">Coming Soon</p>
            <p className="text-[14px] text-ink-soft">活動写真を順次掲載します。</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-paper-alt border-t border-border-line">
      <div className="max-w-[1400px] mx-auto px-6 pt-20 pb-8 lg:pt-28">
        <p className="section-label text-ink-muted mb-4">Photo Gallery · 活動の記録</p>
        <h2 className="font-serif-h text-4xl sm:text-5xl lg:text-6xl font-black leading-tight text-ink mb-10">
          現場の<span className="accent-coral">一瞬</span>を。
        </h2>
      </div>

      {/* 横スクロールストリップ */}
      <div className="overflow-x-auto no-scrollbar">
        <div className="flex gap-3 px-6 pb-12" style={{ width: "max-content" }}>
          {galleryPhotos.map((photo) => (
            <button
              key={photo.src}
              onClick={() => setSelected(photo)}
              className="shrink-0 overflow-hidden rounded-sm cursor-zoom-in group"
              style={{ height: "220px", width: "auto" }}
              aria-label={photo.alt}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="h-full w-auto object-cover group-hover:scale-[1.03] transition-transform duration-500"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </div>

      {selected && (
        <LightboxModal photo={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
