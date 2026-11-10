"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { proposalContent, proposalImages } from "@/content/proposal";
import { useLanguage } from "../LanguageProvider";
import ProposalImage from "./ProposalImage";

export default function ProposalMasterplan({ version }: { version?: string }) {
  const { language } = useLanguage();
  const copy = proposalContent[language];
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const [failed, setFailed] = useState(false);
  const src = `/images/proposal/${proposalImages.masterplan}?v=${version}`;

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
          setOpen(true);
        }}>
          <Image src={src} alt={copy.masterplanAlt} fill sizes="(max-width: 800px) 90vw, 1200px" className="object-contain" onError={handleImageError} />
          <span className="proposal-masterplan-zoom" aria-hidden="true">{copy.masterplanOpen} ↗</span>
        </button>
      )}
      <figcaption className="proposal-note">{copy.siteNote}</figcaption>
      <dialog ref={dialog} className="proposal-masterplan-dialog" aria-label={copy.masterplanAlt} onClose={() => setOpen(false)}>
        <button type="button" className="proposal-link" onClick={() => dialog.current?.close()}>{copy.masterplanClose}</button>
        <div className="proposal-masterplan-expanded">
          {open && <Image src={src} alt={copy.masterplanAlt} fill unoptimized className="object-contain" onError={handleImageError} />}
        </div>
      </dialog>
    </figure>
  );
}
