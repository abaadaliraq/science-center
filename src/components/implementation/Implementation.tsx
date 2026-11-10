"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  implementationContent, implementationImages, type ImplementationAssets, type ImplementationImage,
} from "@/content/implementation";
import { calculateFeasibility } from "@/lib/feasibility-model";
import HistoryLink from "../HistoryLink";
import HomeSectionBanner from "../HomeSectionBanner";
import { useLanguage } from "../LanguageProvider";
import useProposalMotion from "../proposal/useProposalMotion";
import "./Implementation.css";

const shortPartners = ["mismar", "masdar", "utopian"] as const;
const investment = new Intl.NumberFormat("en-US").format(calculateFeasibility().investment);
const indexLabel = (index: number) => String(index + 1).padStart(2, "0");

function ImplementationMedia({ asset, available }: { asset: ImplementationImage; available?: boolean }) {
  const { language } = useLanguage();
  const [failed, setFailed] = useState(false);
  const copy = implementationContent[language];
  const sizes = asset === "hero" ? "100vw" : "(max-width: 700px) 100vw, 40vw";

  return (
    <div className="implementation-photo">
      {available && !failed ? (
        <Image src={`/images/implementation/${implementationImages[asset]}`} alt="" fill sizes={sizes}
          preload={asset === "hero"} onError={() => setFailed(true)} />
      ) : (
        <span className="implementation-placeholder">{copy.missingImage}</span>
      )}
    </div>
  );
}

function PartnerHeading({ name, role }: { name: string; role: string }) {
  return (
    <header className="implementation-partner-heading">
      <h3>{name}</h3>
      <p>{role}</p>
    </header>
  );
}

function Responsibilities({ tasks }: { tasks: string[] }) {
  return <ul className="implementation-responsibilities">{tasks.map((task) => <li key={task}>{task}</li>)}</ul>;
}

export function ImplementationSection({ assets = {} }: { assets?: ImplementationAssets }) {
  const { language } = useLanguage();
  const copy = implementationContent[language];

  return (
    <HomeSectionBanner id="implementation-partnerships" titleId="implementation-section-title" theme="petrol"
      title={copy.title} summary={copy.summary} href="/implementation-partnerships" linkLabel={copy.explore}
      image={<ImplementationMedia asset="cover" available={assets.cover} />}
    />
  );
}

export function ImplementationDetails({ assets = {} }: { assets?: ImplementationAssets }) {
  const { language } = useLanguage();
  const copy = implementationContent[language];
  const root = useRef<HTMLElement>(null);
  useProposalMotion(root);
  useEffect(() => { document.title = copy.pageTitle; }, [copy.pageTitle]);

  return (
    <section ref={root} className="implementation-page" aria-labelledby="implementation-title" data-history-transition>
      <header className="implementation-hero">
        <ImplementationMedia asset="hero" available={assets.hero} />
        <div className="implementation-inner" data-proposal-reveal>
          <HistoryLink href="/#implementation-partnerships" className="implementation-back">
            <span aria-hidden="true">←</span>{copy.back}
          </HistoryLink>
          <h1 id="implementation-title">{copy.pageTitle}</h1>
        </div>
      </header>

      <div className="implementation-inner implementation-body">
        <p className="implementation-intro" data-proposal-reveal>{copy.intro}</p>

        <section className="implementation-block" aria-labelledby="implementation-partners">
          <div data-proposal-reveal>
            <h2 id="implementation-partners">{copy.partnersTitle}</h2>
            <p className="implementation-note">{copy.partnersNote}</p>
          </div>
          <div className="implementation-partner-grid">
            {shortPartners.map((key) => (
              <article className="implementation-card" key={key} data-proposal-reveal>
                <PartnerHeading name={copy[key].name} role={copy[key].role} />
                <Responsibilities tasks={copy[key].tasks} />
              </article>
            ))}
            <article className="implementation-card implementation-lead-partner" data-proposal-reveal>
              <PartnerHeading name={copy.abaad.name} role={copy.abaad.role} />
              <div className="implementation-tracks">
                {copy.abaad.tracks.map(({ title, tasks }) => (
                  <div key={title}><h4>{title}</h4><Responsibilities tasks={tasks} /></div>
                ))}
              </div>
              <div className="implementation-technical">
                <h4>{copy.abaad.deliveryTitle}</h4>
                <p>{copy.abaad.delivery}</p>
              </div>
            </article>
          </div>
        </section>

        <section className="implementation-block" aria-labelledby="implementation-international" data-proposal-reveal>
          <h2 id="implementation-international">{copy.internationalTitle}</h2>
          <p className="implementation-note">{copy.internationalIntro}</p>
          <ul className="implementation-technology-grid">{copy.technologies.map((item) => <li key={item}>{item}</li>)}</ul>
          <p className="implementation-note">{copy.procurement}</p>
        </section>

        <section className="implementation-block" aria-labelledby="implementation-structure" data-proposal-reveal>
          <h2 id="implementation-structure">{copy.structureTitle}</h2>
          <figure className="implementation-structure">
            <div className="implementation-org">
              <ol>
                {copy.structure.map(({ title, parties }) => (
                  <li key={title}><h3>{title}</h3><p>{parties}</p></li>
                ))}
              </ol>
              <div className="implementation-oversight">
                <h3>{copy.supervision}</h3><p>{copy.supervisionRole}</p>
              </div>
            </div>
            <figcaption>{copy.appointments}</figcaption>
          </figure>
        </section>

        <section className="implementation-block" aria-labelledby="implementation-timeline" data-proposal-reveal>
          <h2 id="implementation-timeline">{copy.timelineTitle}</h2>
          <ol className="implementation-timeline">
            {copy.phases.map(({ title, detail }, index) => (
              <li key={title}>
                <span className="implementation-index" aria-hidden="true" dir="ltr">{indexLabel(index)}</span>
                <div><h3>{title}</h3><p>{detail}</p></div>
              </li>
            ))}
          </ol>
        </section>

        <section className="implementation-block" aria-labelledby="implementation-funding" data-proposal-reveal>
          <h2 id="implementation-funding">{copy.fundingTitle}</h2>
          <div className="implementation-funding">
            <p><span>{copy.budgetLabel}</span><strong><bdi dir="ltr">{investment}</bdi></strong><span>{copy.currency}</span></p>
            <Responsibilities tasks={copy.funding} />
          </div>
          <p className="implementation-note">{copy.fundingNote}</p>
        </section>

        <section className="implementation-block" aria-labelledby="implementation-decisions" data-proposal-reveal>
          <h2 id="implementation-decisions">{copy.decisionsTitle}</h2>
          <ol className="implementation-decisions">
            {copy.decisions.map((item, index) => (
              <li key={item}><span className="implementation-index" aria-hidden="true" dir="ltr">{indexLabel(index)}</span><p>{item}</p></li>
            ))}
          </ol>
          <p className="implementation-closing">{copy.closing}</p>
        </section>
      </div>
    </section>
  );
}
