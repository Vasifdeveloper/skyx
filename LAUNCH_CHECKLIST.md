# Public launch checklist

This is a local preview handoff. The brief requires a separate instruction before public publishing, DNS changes, real CRM integration or real email delivery. No such action has been performed.

- [ ] Approve the final design and AZ/RU/EN copy, including service claims and contact details.
- [ ] Resolve the requested Higgsfield visuals. No Higgsfield asset exists in this package; the current scene and SVGs are locally authored.
- [ ] Confirm publication rights for the supplied official logo and approval of the secondary favicon mark. The supplied logo is already integrated without changing its proportions.
- [ ] Confirm the actual legal controller name, address, applicable legal basis, mailbox/provider retention and deletion process; review all three privacy/storage pages. Do not invent missing legal facts.
- [ ] Choose an approved Node.js hosting environment and confirm `https://sky-x.az` is the canonical public domain. Check TLS, www/apex redirects, environment secret handling and operational access.
- [ ] Provision approved Resend and Upstash accounts; set `CONTACT_ORIGIN`, `CONTACT_FROM`, `RESEND_API_KEY`, `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`. Use a verified sender domain.
- [ ] Configure `CONTACT_TRUSTED_IP_HEADER` only for a trusted proxy that overwrites it with one client IP. Otherwise the conservative limit is shared site-wide.
- [ ] After explicit authorization, verify one real delivery to `info@sky-x.az`, reply-to, duplicates/retries, rate limits, timeout handling and provider outage behavior. Test receipts and mocked transport tests do not prove live delivery.
- [ ] Complete production verification of the final animation revision: visible phone/poster motion, section/page transitions, reduced motion, saved motion-off preference, hidden-tab behavior and keyboard/navigation regressions. Keep the exact tested revision and its results in the [QA report](docs/QA_REPORT.md).
- [ ] Review the measured performance variation and remaining browser/device limitations. Repeat lab measurements on the final build and chosen host; check actual target phones, desktop hardware and assistive technology before launch.
- [ ] Confirm the social preview image, canonical/hreflang, sitemap and true 404 behavior on the chosen host.
- [ ] Set `SITE_INDEXABLE=true` only at approved launch, rebuild, and verify metadata, `robots.txt` and response headers on the final host.
- [ ] Keep analytics/pixels off unless separately requested. If optional tracking is introduced, implement and review the required consent flow before loading it.
- [ ] Obtain explicit public launch authorization, then deploy and validate the live domain. Recheck email and core page metrics in that environment.

Production p75 goals (LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1) need field data after launch. Local Lighthouse measurements are lab evidence only.
