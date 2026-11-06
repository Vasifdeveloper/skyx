import { site, services, locales, type Locale } from "@/i18n/site";
import { Arrow } from "./Icons";
import { NavigationBehavior, MotionControl } from "./ShellClient";
import MotionExperience from "./MotionExperience";

const routes = ["about", "services", "solutions", "process"];
function Logo({ locale }: { locale: Locale }) {
  return (
    <a
      className="wordmark"
      href={"/" + locale}
      aria-label={"SKYX · " + site[locale].home}
    >
      <img src="/brand/skyx.png" width="1044" height="191" alt="SKYX" />
    </a>
  );
}
function Languages({ locale, path }: { locale: Locale; path: string }) {
  return (
    <>
      {locales.map((l) => (
        <a
          key={l}
          href={"/" + l + (path ? "/" + path : "")}
          lang={l}
          hrefLang={l}
          data-switch-lang={l}
          aria-current={locale === l ? "true" : undefined}
        >
          {l.toUpperCase()}
        </a>
      ))}
    </>
  );
}
export function Header({ locale, path }: { locale: Locale; path: string }) {
  const t = site[locale],
    base = "/" + locale;
  const links = routes.map((r, i) => (
    <a
      key={r}
      href={base + "/" + r}
      aria-current={path.split("/")[0] === r ? "page" : undefined}
    >
      {t.nav[i]}
    </a>
  ));
  return (
    <>
      <a className="skip" href="#main">
        {t.skip}
      </a>
      <header className="site-head" id="top">
        <div className="wrap head-in">
          <Logo locale={locale} />
          <nav className="desk-nav" aria-label={t.pages}>
            {links}
          </nav>
          <div className="head-actions">
            <details className="lang-switch" suppressHydrationWarning>
              <summary aria-label={t.lang + " · " + locale.toUpperCase()}>
                {locale.toUpperCase()}
                <svg
                  aria-hidden="true"
                  width="12"
                  height="8"
                  viewBox="0 0 12 8"
                >
                  <path d="m1 1 5 5 5-5" fill="none" stroke="currentColor" />
                </svg>
              </summary>
              <div className="lang-list">
                <Languages locale={locale} path={path} />
              </div>
            </details>
            <a className="head-cta" href={base + "/contact"}>
              {t.shortTalk}
              <Arrow size={15} />
            </a>
            <details className="mobile-menu" suppressHydrationWarning>
              <summary aria-label={t.menu}>
                <span />
                <span />
              </summary>
              <div className="menu-surface">
                <nav aria-label={t.pages}>
                  {links}
                  <a href={base + "/contact"}>{t.contact}</a>
                </nav>
                <div className="menu-langs">
                  <Languages locale={locale} path={path} />
                </div>
                <button type="button" data-menu-close>
                  {t.close} ×
                </button>
              </div>
            </details>
          </div>
        </div>
      </header>
      <NavigationBehavior />
      <MotionExperience />
    </>
  );
}
export function Footer({ locale, path }: { locale: Locale; path: string }) {
  const t = site[locale],
    base = "/" + locale;
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-main">
          <div>
            <Logo locale={locale} />
            <p>Digital Growth Studio</p>
          </div>
          <div>
            <strong>{t.pages}</strong>
            {routes.map((r, i) => (
              <a href={base + "/" + r} key={r}>
                {t.nav[i]}
              </a>
            ))}
            <a href={base + "/contact"}>{t.contact}</a>
          </div>
          <div>
            <strong>{t.nav[1]}</strong>
            {services.map((s, i) => (
              <a href={base + "/services/" + s} key={s}>
                {t.titles[i]}
              </a>
            ))}
          </div>
          <div>
            <strong>{t.contactGroup}</strong>
            <a href="mailto:info@sky-x.az">info@sky-x.az</a>
            <a href="tel:+994556118850">+994 55 611 88 50</a>
            <a href="https://wa.me/994556118850">WhatsApp ↗</a>
            <div className="foot-langs">
              <Languages locale={locale} path={path} />
            </div>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© {new Date().getUTCFullYear()} SKYX</span>
          <a href={base + "/privacy"}>{t.legal[0]}</a>
          <a href={base + "/cookies"}>{t.legal[1]}</a>
          <MotionControl label={t.motion} onLabel={t.on} offLabel={t.off} />
          <a className="to-top" href="#top" aria-label={t.top}>
            <Arrow dir="up" size={15} />
          </a>
        </div>
      </div>
    </footer>
  );
}
