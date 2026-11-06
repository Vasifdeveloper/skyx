# SKYX · Digital Growth Studio

Multilingual studio website: 12 routes in Azerbaijani, Russian and English (36 pages). It includes a procedural scroll scene, a local automation demonstration, and a server contact endpoint.

**Status:** local preview. The [QA report](docs/QA_REPORT.md) records completed production checks, measured performance and the verification status of the latest animation revision. No public deployment, DNS change, real CRM integration or real email delivery has been performed. Higgsfield visuals remain pending; the included orbit is original procedural Three.js/SVG work. See the [launch checklist](LAUNCH_CHECKLIST.md) for external launch requirements.

## Homepage revision

On 2026-11-06, the architecture demonstration section (“AI üçün möhkəm təməl.”) was removed from all three homepages at the owner’s request. The six homepage chapters are hero, services, automation, scenarios, process and contact. The AI architecture service remains accessible through the services list and its own page.

## Runtime and dependencies

Verified runtime: Node.js **24.21.0**, pnpm **10.34.9**. The project requires Node 24 (`>=24 <25`). Exact dependency versions and integrity hashes are in `package.json` and `pnpm-lock.yaml`.

| Package | Version |
| --- | --- |
| Next.js | 16.4.5 |
| React / React DOM | 19.3.1 |
| next-intl | 4.14.9 |
| Three.js | 0.187.0 |
| React Three Fiber | 9.8.2 |
| React Hook Form | 7.91.0 |
| Zod | 4.6.7 |
| TypeScript | 6.0.3 |
| ESLint / eslint-config-next | 9.39.5 / 16.4.5 |
| Playwright / Lighthouse | 1.64.1 / 13.6.0 |

## Install and run

Run from this directory:

```sh
pnpm install --frozen-lockfile
pnpm dev --hostname 127.0.0.1 --port 4386
```

Open <http://127.0.0.1:4386/az>. `/ru` and `/en` provide the other languages. `/` redirects to `/az`.

For the production preview:

```sh
pnpm build
pnpm start --hostname 127.0.0.1 --port 4387
```

Open <http://127.0.0.1:4387/az>. Keep the server running in its terminal. This project needs a Node.js server for `/api/contact`; a static-only host cannot provide the form endpoint.

## Checks

```sh
pnpm typecheck
pnpm lint
pnpm test
pnpm audit --prod
pnpm build
```

Browser checks require the Playwright browsers (`pnpm exec playwright install chromium firefox webkit`) and a running preview:

```sh
node tests/interaction-smoke.mjs http://127.0.0.1:4387
node tests/zoom-smoke.mjs http://127.0.0.1:4387
node tests/contact-smoke.mjs http://127.0.0.1:4387
node tests/scene-smoke.mjs http://127.0.0.1:4387
```

Interaction browsers run sequentially to avoid software-renderer CPU contention in timed demo checks. Contact browser tests intercept submissions and do not send mail. Scene checks exercise both real WebGL geometry and fallback behavior; they do not measure physical-device GPU performance.

The test transport can be exercised locally without sending mail:

```sh
CONTACT_TRANSPORT=test pnpm dev --hostname 127.0.0.1 --port 4386
```

Its response explicitly identifies a test receipt. It is disabled in production. Never place credentials in source control.

## Contact configuration

Copy `.env.example` to `.env.local` and configure approved services only when live delivery is authorized. Recipient: `info@sky-x.az`. Phone: `+994 55 611 88 50`. WhatsApp: <https://wa.me/994556118850>.

| Variable | Purpose |
| --- | --- |
| `CONTACT_ORIGIN` | Exact browser origin; required in production |
| `CONTACT_TRANSPORT` | Blank / `resend` for the real adapter; `test` only in development/test |
| `RESEND_API_KEY` | Server-only Resend credential |
| `CONTACT_FROM` | Verified sender address |
| `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` | Distributed rate limiter; required in production |
| `CONTACT_TRUSTED_IP_HEADER` | Optional single-IP header overwritten by the trusted hosting proxy; otherwise one shared site-wide rate bucket |
| `SITE_INDEXABLE` | Defaults to non-indexable preview. Set exactly `true` and rebuild only for an approved launch |

Missing production configuration returns HTTP 503 and a localized unavailable message. Success is never simulated. Provider acceptance is distinct from confirmed inbox delivery.

## Project map

- `src/app/[locale]/[[...segments]]/page.tsx`: route validation, static generation, metadata and structured data.
- `src/i18n`, `src/inner`: route names, translations and inner pages.
- `src/ui`, `src/demos`, `src/scene`: shell, homepage, local demos, orbit and poster fallback.
- `src/contact`, `src/app/api/contact`: validation, form state and server transport.
- `public/brand`, `public/fonts`: local graphics, official supplied logo, self-hosted fonts and font licenses.
- `docs/TECH_DECISIONS.md`, `docs/ASSETS.md`, `docs/QA_REPORT.md`: implementation decisions, provenance and actual verification.

No analytics, advertising pixels, external AI or CRM requests are made by the local demonstrations. Motion preference is stored in `localStorage`; form fields are not persisted there.
