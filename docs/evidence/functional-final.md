# Final functional verification — 2026-11-05

Target: final production build on `http://127.0.0.1:4387` (server restarted by root after the WebGL/fallback/mobile asset fixes).

## Full-route audit — PASS

- 36 pages: 12 routes × AZ/RU/EN, all direct requests 200.
- 216 layouts: widths 320, 360, 390, 768, 1440 and 1920px, no horizontal overflow.
- 1,563 links: known destinations and valid fragment targets.
- Correct document language, one H1, unique titles/descriptions, canonicals, hreflang/x-default and preview noindex.
- Complete 36-URL sitemap and root redirect to AZ.
- Service FAQ keyboard Enter/Space, service-specific contact CTA, language switching preserving valid service + fragment, Back navigation.
- No-JS FAQ, mobile menu and navigation work.
- All six tested invalid routes return HTTP 404.
- No uncaught page errors or reported issues.

Evidence: `work/site-audit-final.log`, `work/site-audit-results.json`.

## Final interaction suite — PASS (Chromium, Firefox, WebKit)

All three engines pass workflow run/pause/resume/replay, keyboard step and architecture selection, scenario keyboard navigation, visibility pause, manual motion persistence and system reduced motion, mobile menu focus/trap/Escape/navigation/scroll unlock, language/context navigation, and no-JS AZ/RU/EN homepages. Zero console errors and zero uncaught page errors.

Evidence: `work/interaction-final-sequential.log`. Targeted ESLint for the updated interaction suite passed.

The initial concurrent run with the full-route audit produced timing failures while multiple real WebGL engines were active: Chromium missed observation of the initial running state and WebKit missed the timed second step. All engines passed the subsequent sequential run with every assertion retained. The durable suite now executes browsers sequentially to avoid software-renderer CPU contention during real-time state assertions; no application behavior was changed.

Earlier validated unchanged contact/API behavior: all three engine contact suites, 10/10 server tests and native Chromium 200% zoom passed; details in `work/functional-qa.md`. Browser contact submissions are mocked; no real email was sent.
