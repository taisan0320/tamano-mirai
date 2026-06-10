"use client";

import { useState } from "react";

interface SpeakerPhotoProps {
  src: string;
  alt: string;
  initial: string;
}

export default function SpeakerPhoto({ src, alt, initial }: SpeakerPhotoProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="w-24 h-24 rounded-full bg-forest/10 flex items-center justify-center overflow-hidden shrink-0">
      {!failed ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover object-top"
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="text-3xl font-bold text-forest/30 select-none">{initial}</span>
      )}
    </div>
  );
}
