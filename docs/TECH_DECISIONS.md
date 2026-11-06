# Technical decisions

Updated 2026-11-06. Verification results and the tested revision are maintained separately in [QA_REPORT.md](QA_REPORT.md).

## Pages and navigation

Next.js App Router statically generates 12 page types in each of `az`, `ru`, `en`. Unknown languages and routes call `notFound()`. The route list is centralized in `src/i18n/site.ts`; translations are local typed objects. `next-intl` is pinned in the dependency set, while these pages use the local dictionaries directly.

Ordinary anchors preserve native Back/Forward, new tabs and navigation without JavaScript. The language switch preserves the hash and whitelisted service query value, avoiding propagation of unrelated query data. Mobile navigation uses native `details`, enhanced with focus trapping, Escape, focus return and scroll locking.

Native same-origin document view transitions add a short fade and vertical movement on browsers that support them, with a stable header. Navigation is not intercepted. An Intersection Observer separately reveals headings, section labels, service rows and hero introductory text once on entry using the Web Animations API; calls to action remain immediately available. Server-rendered content has no hidden state, so no-JavaScript rendering remains readable. Native anchor scrolling is smooth only when motion is enabled. The saved motion-off preference, system reduced motion and hidden documents cancel active decorative animations; unsupported browsers retain normal navigation and the content entry enhancement where available.

## Scene and demonstrations

The homepage alone mounts the scene controller. `React.lazy` isolates the WebGL implementation; an Error Boundary and a persistent local poster cover loading and failure. The orbit is deterministic geometry and shader code, with no downloaded model, HDR texture or post-processing pipeline. A single canvas uses DPR 1–1.5. Phones at 680 CSS pixels or below use the poster, as do reduced motion, the saved motion-off preference and Save-Data. SwiftShader, llvmpipe, softpipe and explicitly identified software renderers use the poster before the first draw; the scene code has already loaded at this point. This avoids the software shader-compilation stalls found in the baseline audit. If renderer identification is unavailable, the later frame-duration fallback remains active. Performance degradation and context loss also trigger fallback.

When motion is enabled, the poster has a lightweight local floating animation on narrow screens and fallback paths. An observer pauses it outside the hero or while the document is hidden. It stays within the mobile hero rather than travelling through later text. System reduced motion and the saved motion-off preference stop the poster animation and remove its transform. This uses the existing local poster asset without loading the WebGL scene on narrow screens.

Scroll position interpolates section anchors measured after fonts, resizing and observed content changes. Animation state lives outside React's per-frame state updates. Rendering stops when the document is hidden or the scene passes its final visible section. Listeners, observers, animation frames, geometry and materials are cleaned up on unmount.

The automation panel is a local demonstration with synthetic data. It does not call an LLM, CRM or external workflow service. The architecture demonstration was removed from the homepage at the owner’s request on 2026-11-06; the separate architecture service page remains. The six scene anchors and visible chapter labels now match the revised homepage. Reduced motion disables decorative transitions while keeping controls usable. Inner pages, contact links, native disclosures and static content remain available without JavaScript; form submission and interactive demonstrations need JavaScript.

## Contact delivery and abuse controls

The browser form and server enforce localized field validation. The server limits JSON bodies to 24 KiB, checks exact origin, requires the declared content type, rejects unknown fields and a populated honeypot, and validates consent. Email is plain text with a fixed recipient and verified configured sender; the visitor address is used for reply-to.

`src/contact/server.ts` isolates Resend behind an `EmailTransport` contract. A timestamped UUID is reused for an unchanged retry. The application retry window is 23 hours. Ambiguous provider responses are shown as unknown delivery, allowing a retry without falsely declaring success.

Production requires the Upstash limiter and fails closed if it is unavailable. An atomic Redis script increments a counter with a 15-minute expiry; the limit is five eligible attempts per bucket. Redis receives a keyed HMAC of the trusted client IP, or one shared bucket when a trustworthy header is unavailable. Configure the optional proxy header only when the host overwrites it with one validated client IP. Application code does not log form bodies or store their fields in browser storage.

The test adapter is limited to development/test and stores only a request fingerprint for deduplication. Missing email configuration produces an explicit unavailable response. Neither provider acceptance nor a test receipt proves real inbox delivery.

## SEO, storage and release

Each route supplies title/description, canonical, AZ/RU/EN alternates, Open Graph metadata and relevant Organization/WebSite/Service JSON-LD. Canonical URLs target `https://sky-x.az`; confirm that domain before release. Preview indexing is disabled in metadata, `robots.txt` and `X-Robots-Tag` unless `SITE_INDEXABLE=true` is set at build time.

Inter and Manrope are self-hosted WOFF2 subsets with local OFL notices. No third-party analytics or advertising cookies are enabled. The only persisted browser preference is the user's explicit motion choice; system reduced motion takes precedence. Legal pages describe the actual implementation. Unconfirmed controller identity, address, lawful basis and operational retention policy remain launch tasks.

Public deployment, DNS and live delivery require a separate instruction under the project brief. The missing Higgsfield generation is disclosed in [ASSETS.md](ASSETS.md) and remains a design delivery limitation.
