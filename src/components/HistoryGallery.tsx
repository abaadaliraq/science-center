"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "./LanguageProvider";
import { historyEditorial } from "@/content/historyEditorial";

const allowed = /^\/images\/planetarium-history\/planetarium-0[123]\.jpg$/;

export default function HistoryGallery({ images, loading = false }: { images: string[]; loading?: boolean }) {
  const { language } = useLanguage();
  const copy = historyEditorial[language];
  const dialog = useRef<HTMLDialogElement>(null);
  const [failed, setFailed] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const visible = [...new Set(images)].filter((src) => allowed.test(src) && !failed.includes(src)).sort().slice(0, 3);
  useEffect(() => {
    if (!selected) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [selected]);
  return (
    <section className="history-gallery" aria-labelledby="history-gallery-title" aria-busy={loading}>
      <h2 id="history-gallery-title">{copy.galleryTitle}</h2>
      {visible.length === 0 ? (
        <div className="history-gallery-empty"><span className="history-gallery-symbol" aria-hidden="true" /><p>{loading ? copy.galleryLoading : copy.galleryEmpty}</p></div>
      ) : (
        <div className="history-gallery-grid">{visible.map((src) => {
          const number = src.match(/planetarium-(\d+)\.jpg$/)?.[1] ?? "";
          return (
            <figure key={src}>
              <button type="button" className="history-gallery-image" aria-label={`${copy.enlarge} ${number}`} onClick={() => { setSelected(src); dialog.current?.showModal(); }}>
                <Image src={src} alt={`${copy.galleryAlt} — ${number}`} fill sizes="(max-width: 700px) 100vw, 33vw" className="object-cover" onError={() => setFailed((previous) => [...previous, src])} />
                <span className="history-gallery-zoom" aria-hidden="true">↗</span>
              </button>
              <figcaption>{copy.photo} <bdi>{number}</bdi></figcaption>
            </figure>
          );
        })}</div>
      )}
      <dialog ref={dialog} className="history-lightbox" aria-label={copy.viewer} onClose={() => setSelected(null)} onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
        <div className="history-lightbox-toolbar"><button type="button" onClick={() => dialog.current?.close()} aria-label={copy.close}>{copy.close}<span aria-hidden="true">×</span></button></div>
        <div className="history-lightbox-image">{selected && <Image src={selected} alt={copy.galleryAlt} fill sizes="95vw" className="object-contain" onError={() => { setFailed((previous) => [...previous, selected]); dialog.current?.close(); }} />}</div>
      </dialog>
    </section>
  );
}
