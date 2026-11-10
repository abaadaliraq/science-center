"use client";

import { useLanguage } from "./LanguageProvider";
import LocalImage from "./LocalImage";

export default function Hero() {
  const { content } = useLanguage();
  return (
    <section id="cover" className="hero relative isolate w-full overflow-hidden" aria-labelledby="project-title">
      <div className="hero-parallax absolute inset-0" data-parallax aria-hidden="true">
        <div className="hero-visual absolute inset-0">
          <div className="cover-study absolute inset-0" />
          <LocalImage src="/images/planetarium-hero.jpg" alt="" available hero />
        </div>
      </div>
      <div className="hero-shade absolute inset-0" aria-hidden="true" />
      <div className="hero-content relative z-10 flex h-full flex-col">
        <div className="hero-titles">
          <h1 id="project-title">{content.title[0]}<span>{content.title[1]}</span></h1>
        </div>
        <div className="hero-bottom">
          <div className="hero-credits">
            <p className="credit-label">{content.creditsLabel}</p>
            <div className="credit-with-mark flex items-center">
              <div>{content.foundations.map((name) => <p key={name}>{name}</p>)}</div>
            </div>
          </div>
          <a className="scroll-cue" href="#history">
            <span className="scroll-line" aria-hidden="true" />
            <span>{content.historyLink}</span><span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}
