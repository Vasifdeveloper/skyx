import ContactForm from "./Form";
import { contactCopy } from "./copy";
import type { ContactLocale } from "./shared";
import "./contact.css";

export default function Contact({
  locale,
  standalone = false,
}: {
  locale: ContactLocale;
  standalone?: boolean;
}) {
  const t = contactCopy[locale];
  const Heading = standalone ? "h1" : "h2";
  return (
    <section
      id="contact"
      className={"sky-contact" + (standalone ? " sky-contact-standalone" : "")}
      aria-labelledby="contact-heading"
    >
      <svg
        className="sky-contact-horizon"
        viewBox="0 0 1600 390"
        preserveAspectRatio="xMidYMax slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id="contact-sky"
            x2="0"
            y2="1"
            gradientUnits="objectBoundingBox"
          >
            <stop stopColor="#1264d6" stopOpacity=".23" />
            <stop offset="1" stopColor="#02040d" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M-100 390Q700 60 1700 295V410H-100Z"
          fill="url(#contact-sky)"
          stroke="#3c9bff"
          strokeOpacity=".42"
        />
        <path
          d="M-100 403Q700 72 1700 307"
          fill="none"
          stroke="#348bcb"
          strokeOpacity=".25"
        />
      </svg>
      <div className="sky-contact-inner">
        <div className="sky-contact-intro">
          <p className="sky-contact-label">
            {!standalone && <span aria-hidden="true">06 / </span>}
            {t.label}
          </p>
          <Heading id="contact-heading">{t.title}</Heading>
          <p className="sky-contact-lede">{t.intro}</p>
          <address className="sky-contact-address">
            <a href="mailto:info@sky-x.az">
              info@sky-x.az <span aria-hidden="true">↗</span>
            </a>
            <a href="tel:+994556118850">
              +994 55 611 88 50 <span aria-hidden="true">↗</span>
            </a>
            <a href="https://wa.me/994556118850">
              WhatsApp <span aria-hidden="true">↗</span>
            </a>
          </address>
        </div>
        <ContactForm locale={locale} copy={t} standalone={standalone} />
        <noscript>
          <style>{".sky-contact-form{display:none}"}</style>
          <p>{t.noJs}</p>
        </noscript>
      </div>
    </section>
  );
}
