import type { ReactNode } from "react";
import Workflow from "./Workflow";
import { modulesCopy, type Locale } from "./copy";
import { Symbol } from "./Symbols";
import "./modules.css";

function Section({
  id,
  number,
  label,
  title,
  children,
}: {
  id: string;
  number: string;
  label: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={id + "-title"}
      className={"dm-section dm-" + id}
    >
      <div className="wrap dm-wrap">
        <div className="dm-kicker">
          <span className="dm-index">{number}</span>
          <span>{label}</span>
        </div>
        <h2 id={id + "-title"} className="dm-heading">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}

function More({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a className="dm-more" href={href}>
      {children}
      <Symbol name="link" size={17} />
    </a>
  );
}

export default function HomeModules({ locale }: { locale: Locale }) {
  const c = modulesCopy[locale];
  return (
    <>
      <Section
        id="automation"
        number="03"
        label={c.sections[0]}
        title={c.titles[0]}
      >
        <Workflow copy={c.workflow} />
        <div className="dm-foot">
          <p>{c.workflow.note}</p>
          <More href={"/" + locale + "/services/ai-automation"}>
            {c.links[0]}
          </More>
        </div>
      </Section>
      <Section
        id="scenarios"
        number="04"
        label={c.sections[2]}
        title={c.titles[2]}
      >
        <fieldset className="dm-industry-picker">
          <legend className="dm-sr">{c.sections[2]}</legend>
          <div className="dm-option-row">
            {c.scenarios.map((scenario, i) => (
              <div key={scenario.industry}>
                <input
                  className="dm-choice"
                  type="radio"
                  id={"industry-" + i}
                  name="skyx-industry"
                  value={i}
                  defaultChecked={i === 0}
                  aria-controls={"scenario-" + i}
                />
                <label htmlFor={"industry-" + i}>{scenario.industry}</label>
              </div>
            ))}
          </div>
          <div className="dm-scenario-panels">
            {c.scenarios.map((scenario, i) => (
              <div
                className="dm-case"
                id={"scenario-" + i}
                key={scenario.industry}
                role="region"
                aria-label={scenario.industry}
              >
                <div>
                  <span className="dm-tag">
                    <i />
                    {c.scenarioNote}
                  </span>
                  <h3>{scenario.task}</h3>
                </div>
                <ol className="dm-route">
                  {scenario.steps.map((name, step) => (
                    <li key={name}>
                      <span className="dm-route-index" aria-hidden="true">
                        0{step + 1}
                      </span>
                      {name}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </fieldset>
        <div className="dm-foot dm-links-only">
          <More href={"/" + locale + "/solutions"}>{c.links[2]}</More>
        </div>
      </Section>
      <Section
        id="process"
        number="05"
        label={c.sections[3]}
        title={c.titles[3]}
      >
        <ol className="dm-process-line">
          {c.stages.map(([name, desc], i) => (
            <li key={name}>
              <span aria-hidden="true" className="dm-stage-count">
                0{i + 1}
              </span>
              <h3>{name}</h3>
              <p>{desc}</p>
            </li>
          ))}
        </ol>
        <div className="dm-foot dm-links-only">
          <More href={"/" + locale + "/process"}>{c.links[3]}</More>
        </div>
      </Section>
    </>
  );
}
