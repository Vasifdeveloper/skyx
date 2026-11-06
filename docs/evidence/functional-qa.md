# Functional QA — 2026-11-05

Target: local production server `http://127.0.0.1:4387`, initial successful production build of this continuation. Re-run interaction and zoom suites if related UI changes before handoff.

## Passed

- `pnpm test`: **10/10** server tests (the previous note recorded 9; Host normalization now has a regression test). Covers local test transport, bounds/consent/service validation, origin/content type/body/id/timestamps, replay and payload mismatch, fallback and distributed rate limits, production fail-closed behavior, HMAC bucket privacy, provider idempotency, rejection/ambiguous results and development Host handling.
- `node tests/interaction-smoke.mjs http://127.0.0.1:4387`: **Chromium, Firefox, WebKit**. Workflow run, pause, keyboard step selection, resume, visibility pause, replay completion; keyboard architecture selection; scenario arrow navigation; manual motion persistence and system reduced motion; reduced-motion pulse suppression; mobile menu focus entry/trap/Escape/navigation and scroll unlock; language change retaining the valid service query and fragment; zero console errors or uncaught page errors. No-JS AZ/RU/EN homepages show the text workflow and architecture accordion, allow scenario selection and fit 320px.
- `node tests/contact-smoke.mjs http://127.0.0.1:4387`: **Chromium, Firefox, WebKit**, AZ/RU/EN contact validation and 320px no-JS alternatives. Verifies service preselection, explicit consent default, invalid-submit prevention, first-error focus, contact links. In EN exercises ambiguous response/retry stability and changed-payload key rotation, unavailable/limited/network/server-validation/tested results, focus on server validation, disabled successful submit, edit-after-success recovery, preserved fields and no form data in localStorage. No uncaught page errors. **All requests are intercepted; no real email is sent.**
- The original `work/contact-ui.cjs` additionally verified the actual unconfigured production API returns **503**, retaining field data, in Chromium/Firefox/WebKit. No provider credentials were configured and no email was sent.
- `node tests/zoom-smoke.mjs http://127.0.0.1:4387`: native Chromium desktop **200% page zoom**, 1440×900 physical viewport / 720 CSS pixels, AZ/RU/EN. No horizontal overflow; usable mobile menu open/Escape; compact architecture accordion.
- `pnpm lint`: passed after browser test additions.

## Test changes and diagnosis

- Earlier development interaction timeouts happened on the first run click and post-reload motion click; none reproduced in the production baseline (all engines passed even before the test changes).
- Interaction and zoom suites now await the navigation mount effect's observable normalization of language links before operating hydrated controls. This avoids treating SSR markup appearance as proof of client readiness. No fixed sleep, hidden assertion suppression or application code change was introduced.
- Contact readiness is demonstrated by its effect applying the requested service selection.
- Added the reusable `tests/contact-smoke.mjs`; it always intercepts submissions, so it can safely run without contacting a configured provider.

## Logs

- `work/interaction-production.log`
- `work/contact-smoke-production.log`
- `work/contact-production.log` (original contact suite including actual unconfigured 503)
- `work/contact-server-production.log`
- `work/zoom-production.log`

## Limits

No real email delivery, credentials, CRM, public domain/DNS, real physical devices or assistive-technology session was tested. Page Visibility pause is exercised by a deterministic document visibility event in headless browsers. Native zoom is Chromium only; responsive layout and other interactions cover all three engines. These checks are functional and do not replace the separate visual, Lighthouse or full-route audits.
