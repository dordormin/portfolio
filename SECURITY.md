# Security — dordor_portfolio

Hardening applied from the 2026-10-11 security audit
(`audit-portfolio-2026-10-11.md`).

## Transport (H-01) — open item for the site owner

The container serves plain HTTP on port 8085. TLS termination must be added
in front of it (reverse proxy with Let's Encrypt, e.g. Caddy like TradeOffStack
or Traefik), with HTTP→HTTPS redirect + HSTS. The Hostinger cloud firewall
currently seems to block port 8085 from the Internet, which limits real-world
exposure — confirm how visitors reach the site today (domain + reverse proxy?
VPN only?) to decide where TLS should live.

## HTTP security headers (H-02)

`nginx.conf` now sends: `X-Frame-Options: DENY`, `X-Content-Type-Options:
nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`,
`Permissions-Policy` (camera/microphone/geolocation/payment disabled) and a
strict `Content-Security-Policy` (all assets are local; `style-src
'unsafe-inline'` is required by Tailwind/inline styles).

## Privacy — CV download (M-01)

`src/utils/downloadCv.ts` previously called `https://ipapi.co/json/` to
geolocate the visitor by IP (Quebec vs rest of Canada) without consent.
Replaced by a 100% local heuristic: the browser timezone
(`Intl.DateTimeFormat().resolvedOptions().timeZone`); `America/Montreal`
selects the Quebec CV, anything else the Ontario CV, with the site language
(`fr`/`en`) as fallback. No network call, the visitor's IP is never disclosed.

## Container (M-02, M-03, M-04)

- `Dockerfile` runs nginx as the non-root `nginx` user (CIS 4.1).
- Base image pinned to `nginx:1.31.6-alpine` (no floating tags).
- `.dockerignore` keeps the build context minimal (`.git`, `node_modules`,
  `.env*`, …).

## SPA fallback (M-05)

`location ~ /\. { return 404; }` in `nginx.conf`: dotfiles (`/.env`,
`/.git/HEAD`, …) now return 404 instead of being served `index.html` with 200.

## Dependencies (L-02, L-03, L-04)

- Removed unused `express` + `dotenv` (+ `@types/express`); the deployed site
  is 100% static, no Node server in production.
- Removed the unused `GEMINI_API_KEY` reference from `.env.example`.
- CI (`deploy.yml`) now runs `npm audit --audit-level=high` before building;
  the pipeline fails on high/critical vulnerabilities.

## Accepted risks

- `mailto:`/`tel:` links expose email/phone to scrapers (L-01) — accepted,
  standard for a portfolio.
- No WAF/rate-limiting on the static site — acceptable given no backend.
