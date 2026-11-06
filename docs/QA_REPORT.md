# QA report

Updated 2026-11-06. This report records measured results and open checks; it does not certify a public launch.

## Homepage revision on 2026-11-06

The architecture demonstration was removed from AZ/RU/EN homepages. The corresponding scene pose was removed, and chapter numbers now run from 01 to 06. The AI architecture service detail route remains available. Typecheck, lint and production build passed after this change. Older architecture-demo checks below describe the previous revision.

Targeted Chromium checks passed for interactions and JavaScript-disabled AZ/RU/EN pages, the removed section's absence, the retained service page and FAQ, and layout at 320 px. Native 200% zoom passed on all three localized homepages and architecture service pages. The scene suite passed six ordered anchors, forward/reverse scrolling, hash/Back navigation, contact fade, visibility pause, reduced motion and WebGL fallbacks. Evidence: `work/home-cleanup-interaction.log`, `work/home-cleanup-zoom.log`, `work/home-cleanup-scene.log`. Updated test files also passed ESLint.

## Final motion verification

The 2026-11-06 production build passed lint, server tests and production compilation. At a 319 × 844 viewport, Chromium, Firefox and WebKit passed visible orbital-poster motion, heading and row reveals, hidden-tab pause, navigation entry transitions and manual/system reduced-motion behavior. Native cross-document transitions were observed in Chromium and WebKit. Firefox uses animated content entry. All three runs had zero page errors. Evidence is included in `docs/evidence/motion-handoff.json`.

The live in-app preview was inspected at 319 px and confirmed to use the former static mobile path. The source was corrected and the local production server restarted. Final automated tests used the same narrow viewport. A direct UI reload was unavailable because browser control was disabled in Work settings, so the user should refresh the open preview.


## Environment

Local macOS workspace, Node 24.21.0, pnpm 10.34.9, Next.js 16.4.5. Production preview: `http://127.0.0.1:4387`. Playwright 1.64.1 and Lighthouse 13.6.0. Browser automation uses local browser engines and emulated viewports, not physical mobile devices. Evidence paths below are relative to the enclosing project workspace; the source package contains this report and the reusable tests.

## Build and dependency checks

| Check | Result | Evidence |
| --- | --- | --- |
| `pnpm typecheck` | Pass | `work/qa-final-functional.md`; production compilation also completed TypeScript checking |
| `pnpm lint` | Pass | `work/lint-final.log` |
| `pnpm test` | 10 server tests passed | `work/functional-qa.md`, `work/contact-server-production.log` |
| `pnpm build` | Pass; 36 localized content pages, 41 static outputs including framework/support routes | `work/build-final.log` |
| `pnpm audit --prod --json` | 0 info/low/moderate/high/critical vulnerabilities across 161 production dependencies | `work/audit-production.json`; point-in-time audit from 2026-11-05, not a security penetration test |

Server tests cover Unicode limits, required consent, allowed fields/locales/services, Origin/content type/body size, idempotency and retry expiry, local test receipts, distributed rate limiting, privacy of hashed abuse keys, ambiguous provider outcomes and development Host normalization.

## Routes, browser behavior and accessibility

- **36 direct page loads, 216 layout combinations and 1,563 link/fragment checks passed with zero issues.** Tested widths were 320, 360, 390, 768, 1440 and 1920 CSS pixels. Six invalid route/locale/service paths returned HTTP 404. Evidence: `work/site-audit-final.log`, `work/site-audit-results.json`.
- Document language, one H1, unique titles/descriptions, canonical/hreflang, preview noindex, the 36-URL sitemap and the root redirect passed. Localized navigation, service-to-contact preselection, permitted query/hash preservation, Back navigation and keyboard FAQ controls passed.
- **Chromium 156, Firefox 157 and WebKit 27.2 passed the interaction suite.** It covers workflow run/pause/resume/replay, keyboard step and layer selection, visibility pause, scenario switching, manual/system motion settings, mobile menu focus trap/Escape/focus return/scroll unlock and language navigation. Final sequential runs had zero console errors or uncaught page errors. Evidence: `work/interaction-final-sequential.log`.
- Native Chromium page zoom at **200%** passed for AZ/RU/EN, including layout, menu and compact architecture controls. Other engines were not tested at native page zoom. Evidence: `work/zoom-production.log`.
- Contact UI passed all three engines and languages. It preserves fields and unchanged retry keys, rotates keys for changed payloads, focuses field errors, requires initially unchecked consent, distinguishes response states and retains direct contact alternatives. Browser submissions used intercepted responses; the actual unconfigured production endpoint separately returned **503**. No real email was sent. Evidence: `work/contact-smoke-production.log`, `work/contact-production.log`.
- JavaScript-disabled pages retain content, native navigation/FAQ, scenario choices, architecture descriptions and direct contacts. Interactive demonstrations and form submission require JavaScript.

Initial simultaneous multi-engine WebGL runs occasionally missed short-lived timed demo states under CPU contention. The final suite runs engines sequentially with every assertion retained; the subsequent sequential run passed. Page Visibility pause is exercised with deterministic visibility events in headless browsers.

## Scene and fallback

The real WebGL scene was exercised through Chromium software GL with one canvas. Checks passed for forward/reverse scroll, direct hash entry, locale navigation, resize/Back, contact fade, document visibility suspension/resume, context loss, reduced motion and unavailable WebGL. The supplied logo and hero were reviewed at desktop and mobile sizes. Evidence: `work/scene-final.log`, `work/scene-final.json`, `work/qa-final-functional.md`.

A separate capability guard selects the matching SVG/WebP poster before the first draw on recognized software rasterizers. This avoids expensive shader compilation on weak rendering paths. The scene test bypasses only renderer-name classification to exercise the real geometry in software GL, then separately checks software fallback. Hardware GPU performance remains unmeasured on a physical target device. The new animated poster and section/page transitions passed the final 319px checks described above.

## Performance

The following three runs were captured on **2026-11-05 before the subsequent mobile/poster and transition revision**. They include the software-renderer guard. The median performance score is **68**, with substantial run-to-run variation; this is not a consistently high performance result.

| Run | Performance | Accessibility | LCP | CLS | TBT |
| --- | ---: | ---: | ---: | ---: | ---: |
| Software fallback 1 | 68 | 100 | 1.090 s | 0.0583 | 949 ms |
| Software fallback 2 | 97 | 100 | 0.333 s | 0.0583 | 16 ms |
| Software fallback 3 | 66 | 100 | 1.080 s | 0.0583 | 2,613 ms |
| Median | **68** | **100** | **1.080 s** | **0.0583** | **949 ms** |

Conditions: Lighthouse 13.6.0, headless Chromium 156.0.8078.4, local production `/az`, desktop 1440 × 900 at DPR 1, simulated desktop throttling (40 ms RTT, 10,240 Kbps, CPU multiplier 1), fresh browser launch per run, SwiftShader software rendering. All three transferred 715,981 bytes (699.20 KiB). Evidence: `work/lighthouse-summary.jsonl`, `work/lh-1.json` through `work/lh-3.json`.

Before the software-renderer guard, the three valid baseline runs scored 78, 57 and 55, with a median LCP of 1.251 s and median TBT of 8,133 ms. The guard improved the measured blocking, but remaining variability requires further assessment on the deployment host and actual devices. The initial full-Chromium launch timed out before a report and is excluded. Baseline evidence is retained in `work/performance-baseline/`.

Resource measurements from the same pre-animation revision: initial JavaScript excluding the lazy scene **156.60 KiB gzip**; lazy scene chunk **238.64 KiB gzip**; poster **80.12 KiB**; loaded font subsets AZ **169.22 KiB**, RU **103.85 KiB**, EN **71.38 KiB**. JavaScript sizes use gzip level 9 on the minified build files; font figures use loaded WOFF2 resource bytes. Evidence: `work/resource-budget-summary.json`, `work/resource-budget-results.json`. Re-measure these values if the final revision changes the build.

INP and production p75 field metrics have not been measured. Lab LCP/CLS and automated accessibility scores do not establish real-device interaction performance or full accessibility conformance.

## Limits and external dependencies

- No Higgsfield-generated asset exists; the attempted plugin tools returned `Unknown tool` and were then unavailable. Current Three.js/SVG visuals are local work.
- Resend and Upstash are not configured for live production delivery. No real mail was sent or verified. Production unavailability is intentional until configured.
- No public deployment, DNS change, analytics integration or real CRM connection was performed.
- Physical devices, actual assistive technology and production field performance remain unverified.
- Legal/controller details, operational retention and hosting decisions remain in [LAUNCH_CHECKLIST.md](../LAUNCH_CHECKLIST.md).
