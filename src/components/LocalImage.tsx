"use client";

import Image from "next/image";
import { useState } from "react";

type LocalImageProps = {
  src: string;
  alt: string;
  available: boolean;
  hero?: boolean;
};

/** Keep the authored placeholder visible for absent or unreadable local assets. */
export default function LocalImage({ src, alt, available, hero = false }: LocalImageProps) {
  const [failed, setFailed] = useState(false);
  if (!available || failed) return null;

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="100vw"
      preload={hero}
      className="object-cover"
      onError={() => setFailed(true)}
    />
  );
}
