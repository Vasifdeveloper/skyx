import { createTranslator } from "next-intl";
import { site, services, type Locale } from "@/i18n/site";
import { Arrow, Motif } from "./Icons";
import Scene from "@/scene/Scene";
import HomeModules from "@/demos/HomeModules";
import Contact from "@/contact/Contact";
export default function Home({ locale }: { locale: Locale }) {
  const t = site[locale];
  const tr = createTranslator({
    locale,
    messages: { explore: t.explore, intro: t.intro },
  });
  return (
    <div className="home">
      <section id="hero" className="hero">
        <div className="hero-field" aria-hidden="true" />
        <div className="hero-terrain" aria-hidden="true" />
        <Scene />
        <div className="wrap hero-body">
          <div className="hero-copy">
            <p className="hero-kicker">
              <span className="k-mark" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              Digital Growth Studio
            </p>
            <h1>
              {t.h1.map((s, i) => (
                <span key={s} className={i === 2 ? "accent-word" : ""}>
                  {s}
                  {i < 2 ? " " : ""}
                </span>
              ))}
            </h1>
            <p className="hero-intro">{tr("intro")}</p>
            <div className="hero-actions">
              <a className="button-primary" href="#contact">
                {t.talk}
                <Arrow />
              </a>
              <a className="button-plain" href="#services">
                {t.services}
                <Arrow dir="down" size={17} />
              </a>
            </div>
          </div>
          <div className="visual-label" aria-hidden="true">
            <span className="label-line" />{" "}
            <span>
              FIG. 01 <b>/</b> {t.orbit}
            </span>
          </div>
          <div className="axis-label" aria-hidden="true">
            X <span>×</span> Y <span>×</span> Z
          </div>
        </div>
        <div className="wrap hero-foot">
          <a href="#services" className="scroll-cue">
            <span className="round-arrow">
              <Arrow dir="down" size={14} />
            </span>
            {tr("explore")}
          </a>
          <div className="chapter-index" aria-hidden="true">
            <b>01</b>
            <span className="chapter-ticks">
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
            </span>
            <span>06</span>
          </div>
        </div>
      </section>
      <section id="services" className="services-home">
        <div className="wrap">
          <div className="section-code">
            <b>02</b>
            <span>/</span>
            {t.section}
          </div>
          <div className="services-title">
            <h2>
              {t.discipline[0]} <span>{t.discipline[1]}</span>
            </h2>
            <a href={"/" + locale + "/services"}>
              {t.all}
              <Arrow size={17} />
            </a>
          </div>
          <div className="service-list">
            {services.map((slug, i) => (
              <a
                href={"/" + locale + "/services/" + slug}
                key={slug}
                className="service-row"
              >
                <span className="service-num">0{i + 1}</span>
                <h3>{t.titles[i]}</h3>
                <p>{t.lines[i]}</p>
                <span className="service-motif">
                  <Motif index={i} />
                </span>
                <span className="service-link">
                  <Arrow size={19} />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
      <HomeModules locale={locale} />
      <Contact locale={locale} />
    </div>
  );
}
