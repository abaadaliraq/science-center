"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { proposalContent, proposalImages } from "@/content/proposal";
import { useLanguage } from "../LanguageProvider";
import ProposalImage from "./ProposalImage";

const maxZoom = 4;
const zoomStep = .5;

export default function ProposalMasterplan({ version }: { version?: string }) {
  const { language } = useLanguage();
  const copy = proposalContent[language];
  const dialog = useRef<HTMLDialogElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const zoomCenter = useRef<{ x: number; y: number } | null>(null);
  const [open, setOpen] = useState(false);
  const [failed, setFailed] = useState(false);
  const [zoom, setZoom] = useState(1);
  const src = `/images/proposal/${proposalImages.masterplan}?v=${version}`;

  useLayoutEffect(() => {
    const view = viewport.current;
    const center = zoomCenter.current;
    if (!view || !center) return;
    view.scrollLeft = center.x * view.scrollWidth - view.clientWidth / 2;
    view.scrollTop = center.y * view.scrollHeight - view.clientHeight / 2;
    zoomCenter.current = null;
  }, [zoom]);

  function changeZoom(value: number) {
    const next = Math.min(maxZoom, Math.max(1, value));
    const view = viewport.current;
    if (!view || next === zoom) return;
    zoomCenter.current = {
      x: (view.scrollLeft + view.clientWidth / 2) / view.scrollWidth,
      y: (view.scrollTop + view.clientHeight / 2) / view.scrollHeight,
    };
    setZoom(next);
  }

  function handleImageError() {
    setFailed(true);
    dialog.current?.close();
  }

  return (
    <figure className="proposal-masterplan" data-proposal-reveal>
      {!version || failed ? (
        <div className="proposal-masterplan-preview">
          <ProposalImage asset="masterplan" alt={copy.masterplanAlt} contain />
        </div>
      ) : (
        <button type="button" className="proposal-masterplan-preview" aria-haspopup="dialog" aria-label={copy.masterplanOpen} onClick={() => {
          dialog.current?.showModal();
          zoomCenter.current = null;
          setZoom(1);
          setOpen(true);
        }}>
          <Image src={src} alt={copy.masterplanAlt} fill sizes="(max-width: 800px) 90vw, 1200px" className="object-contain" onError={handleImageError} />
          <span className="proposal-masterplan-zoom" aria-hidden="true">{copy.masterplanOpen} ↗</span>
        </button>
      )}
      <figcaption className="proposal-note">{copy.siteNote}</figcaption>
      <dialog ref={dialog} className="proposal-masterplan-dialog" aria-label={copy.masterplanAlt} onClose={() => setOpen(false)}
        onKeyDown={(event) => {
          if (event.key === "+" || event.key === "=") changeZoom(zoom + zoomStep);
          else if (event.key === "-") changeZoom(zoom - zoomStep);
          else if (event.key === "0") changeZoom(1);
          else return;
          event.preventDefault();
        }}>
        <div className="proposal-masterplan-toolbar">
          <button type="button" className="proposal-masterplan-close" autoFocus onClick={() => dialog.current?.close()}>{copy.masterplanClose}</button>
          <div className="proposal-masterplan-controls">
            <button type="button" aria-label={copy.masterplanZoomOut} title={copy.masterplanZoomOut} disabled={zoom <= 1} onClick={() => changeZoom(zoom - zoomStep)}>−</button>
            <button type="button" aria-label={copy.masterplanFit} title={copy.masterplanFit} onClick={() => changeZoom(1)}>
              <bdi dir="ltr">{Math.round(zoom * 100)}%</bdi>
            </button>
            <button type="button" aria-label={copy.masterplanZoomIn} title={copy.masterplanZoomIn} disabled={zoom >= maxZoom} onClick={() => changeZoom(zoom + zoomStep)}>+</button>
          </div>
        </div>
        <div ref={viewport} className="proposal-masterplan-expanded" dir="ltr" tabIndex={0} aria-label={copy.masterplanAlt}>
          {open && (
            <div className="proposal-masterplan-canvas" style={{ width: `${zoom * 100}%`, height: `${zoom * 100}%` }}>
              <Image src={src} alt={copy.masterplanAlt} fill unoptimized className="object-contain" onError={handleImageError} />
            </div>
          )}
        </div>
      </dialog>
    </figure>
  );
}
