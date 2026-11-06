import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { industries, privacySections, storageSections } from "./applications";
import Diagram from "./Diagram";
import { services, type Service } from "./services";
import {
  labels,
  pages,
  principles,
  processSteps,
  tr,
  type Localized,
  type Locale,
} from "./text";
import "./inner.css";

export const innerPaths = [
  "about",
  "services",
  ...services.map((service) => `services/${service.slug}`),
  "solutions",
  "process",
  "privacy",
  "cookies",
];

type Landing = keyof typeof pages;
function isLanding(path: string): path is Landing {
  return Object.prototype.hasOwnProperty.call(pages, path);
}
function findService(path: string) {
  return services.find((service) => path === `services/${service.slug}`);
}
export function getInnerMeta(locale: Locale, path: string) {
  const service = findService(path);
  if (service)
    return {
      title: service.name[locale],
      description: service.summary[locale],
    };
  if (!isLanding(path)) return undefined;
  return {
    title: pages[path].label[locale],
    description: pages[path].lead[locale],
  };
}

const number = (index: number) => String(index + 1).padStart(2, "0");
const motionLabel = tr(
  "Hərəkət seçimini dəyişin",
  "Изменить настройку движения",
  "Change motion preference",
);

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d={diagonal ? "M6 18 18 6M6.5 6H18v11.5" : "M4 12h15m-6-6 6 6-6 6"}
      />
    </svg>
  );
}

function JumpLinks({
  links,
  locale,
}: {
  links: [string, string][];
  locale: Locale;
}) {
  return (
    <nav className="ip-jumps" aria-label={labels.contents[locale]}>
      {links.map(([id, label]) => (
        <a href={`#${id}`} key={id}>
          {label}
          <span aria-hidden="true">↓</span>
        </a>
      ))}
    </nav>
  );
}

function ContactCTA({ locale, service }: { locale: Locale; service?: string }) {
  const url = `/${locale}/contact${service ? `?service=${service}` : ""}`;
  return (
    <section className="ip-contact">
      <div>
        <h2>{labels.contactTitle[locale]}</h2>
        <p>{labels.contactLead[locale]}</p>
      </div>
      <a className="ip-button" href={url}>
        {labels.contact[locale]}
        <Arrow diagonal />
      </a>
    </section>
  );
}

function BulletList({ items, locale }: { items: Localized[]; locale: Locale }) {
  return (
    <ul className="ip-bullets">
      {items.map((item) => (
        <li key={item.en}>{item[locale]}</li>
      ))}
    </ul>
  );
}

function ServiceContent({
  locale,
  service,
}: {
  locale: Locale;
  service: Service;
}) {
  return (
    <>
      <JumpLinks
        locale={locale}
        links={[
          ["tasks", labels.issues[locale]],
          ["scope", labels.scope[locale]],
          ["applications", labels.use[locale]],
          ["faq", labels.faq[locale]],
        ]}
      />
      <section className="ip-split ip-block" id="tasks">
        <h2>{labels.issues[locale]}</h2>
        <BulletList items={service.problems} locale={locale} />
      </section>
      <section className="ip-work ip-block" id="scope">
        <div>
          <h2>{labels.scope[locale]}</h2>
          <BulletList items={service.scope} locale={locale} />
        </div>
        <div>
          <h2>{labels.deliverables[locale]}</h2>
          <BulletList items={service.handover} locale={locale} />
        </div>
      </section>
      <section className="ip-block" id="applications">
        <h2>{labels.use[locale]}</h2>
        <div className="ip-examples">
          {service.examples.map((example, i) => (
            <div key={example.title.en}>
              <span className="ip-index">{number(i)}</span>
              <h3>{example.title[locale]}</h3>
              <p>{example.description[locale]}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="ip-split ip-block" id="approach">
        <h2>{labels.approach[locale]}</h2>
        <div>
          <p>{service.approach[locale]}</p>
          <a className="ip-link" href={`/${locale}/process`}>
            {labels.processMore[locale]}
            <Arrow />
          </a>
        </div>
      </section>
      <section className="ip-split ip-block" id="faq">
        <h2>{labels.faq[locale]}</h2>
        {/* Native details may be opened before React hydrates. Preserve that browser-owned state. */}
        <div className="ip-faq">
          {service.faq.map(([question, answer]) => (
            <details key={question.en} suppressHydrationWarning>
              <summary>
                {question[locale]}
                <span aria-hidden="true" />
              </summary>
              <p>{answer[locale]}</p>
            </details>
          ))}
        </div>
      </section>
      <ContactCTA locale={locale} service={service.slug} />
    </>
  );
}

function Services({ locale }: { locale: Locale }) {
  return (
    <>
      <section className="ip-services" aria-label={labels.overview[locale]}>
        {services.map((service, i) => (
          <section className="ip-service" key={service.slug}>
            <span className="ip-index">
              {number(i)}
              <span className="ip-index-total"> / 04</span>
            </span>
            <div className="ip-service-main">
              <h2>
                <a href={`/${locale}/services/${service.slug}`}>
                  {service.name[locale]} <Arrow diagonal />
                </a>
              </h2>
              <p>{service.fit[locale]}</p>
              <p className="ip-service-result">
                <strong>{labels.deliverables[locale]}</strong>{" "}
                {service.handover[0][locale]}.
              </p>
            </div>
            <Diagram kind={service.slug} inset />
          </section>
        ))}
      </section>
      <ContactCTA locale={locale} />
    </>
  );
}

function About({ locale }: { locale: Locale }) {
  return (
    <>
      <section className="ip-block">
        <h2>{labels.principles[locale]}</h2>
        <ol className="ip-principles">
          {principles.map(([name, body], i) => (
            <li key={name.en}>
              <span className="ip-index">{number(i)}</span>
              <h3>{name[locale]}</h3>
              <p>{body[locale]}</p>
            </li>
          ))}
        </ol>
        <a className="ip-link" href={`/${locale}/services`}>
          {labels.servicesMore[locale]}
          <Arrow />
        </a>
      </section>
      <ContactCTA locale={locale} />
    </>
  );
}

function Solutions({ locale }: { locale: Locale }) {
  return (
    <>
      <JumpLinks
        locale={locale}
        links={industries.map((industry) => [
          industry.id,
          industry.name[locale],
        ])}
      />
      <div className="ip-industries">
        {industries.map((industry, i) => (
          <section
            className="ip-industry ip-block"
            id={industry.id}
            key={industry.id}
          >
            <header>
              <span className="ip-index">{number(i)}</span>
              <h2>{industry.name[locale]}</h2>
              <p>{industry.task[locale]}</p>
            </header>
            <div>
              <h3 className="ip-caption">{labels.chain[locale]}</h3>
              <ol className="ip-chain">
                {industry.workflow.map((step) => (
                  <li key={step.en}>{step[locale]}</li>
                ))}
              </ol>
              <h3 className="ip-caption">{labels.metrics[locale]}</h3>
              <p className="ip-metrics">{industry.metrics[locale]}</p>
            </div>
          </section>
        ))}
      </div>
      <ContactCTA locale={locale} />
    </>
  );
}

function Process({ locale }: { locale: Locale }) {
  return (
    <>
      <ol className="ip-process">
        {processSteps.map((step, i) => (
          <li key={step.title.en}>
            <span className="ip-step-number">{number(i)}</span>
            <div className="ip-step">
              <h2>{step.title[locale]}</h2>
              <p>{step.aim[locale]}</p>
              <dl>
                {(
                  [
                    [labels.activities, step.action],
                    [labels.input, step.input],
                    [labels.output, step.result],
                  ] as const
                ).map(([title, definition]) => (
                  <div key={title.en}>
                    <dt>{title[locale]}</dt>
                    <dd>{definition[locale]}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </li>
        ))}
      </ol>
      <ContactCTA locale={locale} />
    </>
  );
}

function Policy({ locale, storage }: { locale: Locale; storage?: boolean }) {
  const sections = storage ? storageSections : privacySections;
  return (
    <div className="ip-policy">
      {sections.map(([heading, body], i) => (
        <section key={heading.en} className="ip-policy-section">
          <span className="ip-index">{number(i)}</span>
          <div>
            <h2>{heading[locale]}</h2>
            <p>{body[locale]}</p>
            {i === sections.length - 1 &&
              (storage ? (
                <a className="ip-link" href="#motion-preference">
                  {motionLabel[locale]}
                  <Arrow />
                </a>
              ) : (
                <a className="ip-link" href="mailto:info@sky-x.az">
                  info@sky-x.az
                  <Arrow diagonal />
                </a>
              ))}
          </div>
        </section>
      ))}
      <a
        className="ip-link"
        href={`/${locale}/${storage ? "privacy" : "cookies"}`}
      >
        {(storage ? labels.privacy : labels.cookies)[locale]}
        <Arrow />
      </a>
    </div>
  );
}

const content: Record<Landing, (locale: Locale) => ReactNode> = {
  about: (locale) => <About locale={locale} />,
  services: (locale) => <Services locale={locale} />,
  solutions: (locale) => <Solutions locale={locale} />,
  process: (locale) => <Process locale={locale} />,
  privacy: (locale) => <Policy locale={locale} />,
  cookies: (locale) => <Policy locale={locale} storage />,
};

export default function InnerPage({
  locale,
  path,
}: {
  locale: Locale;
  path: string;
}) {
  const service = findService(path);
  const page = isLanding(path) ? pages[path] : undefined;
  if (!page && !service) notFound();
  const title = service ? service.name : page!.title;
  const lead = service ? service.summary : page!.lead;
  const label = service ? service.name : page!.label;
  const legal = path === "privacy" || path === "cookies";
  return (
    <article className={`ip-page${legal ? " ip-legal" : ""}`}>
      <div className="ip-shell">
        <nav className="ip-crumb" aria-label={labels.crumb[locale]}>
          <a href={`/${locale}`}>{labels.home[locale]}</a>
          <span aria-hidden="true">/</span>
          {service && (
            <>
              <a href={`/${locale}/services`}>{labels.services[locale]}</a>
              <span aria-hidden="true">/</span>
            </>
          )}
          <span aria-current="page">{label[locale]}</span>
        </nav>
        <header className="ip-hero">
          <div>
            {service && (
              <span className="ip-index ip-hero-kicker">
                {number(services.indexOf(service))} / 04
              </span>
            )}
            <h1>{title[locale]}</h1>
            <p>{lead[locale]}</p>
          </div>
          {!legal && (
            <div className="ip-hero-diagram">
              <Diagram
                kind={
                  service?.slug ??
                  (path === "process" ? "ai-automation" : "orbit")
                }
              />
            </div>
          )}
        </header>
        {service ? (
          <ServiceContent locale={locale} service={service} />
        ) : (
          isLanding(path) && content[path](locale)
        )}
      </div>
    </article>
  );
}
