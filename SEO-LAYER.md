# SEO + SSR Layer Migration

The site moved from **Vite SPA → Next.js 15 App Router** to fix every issue flagged in `SEO-AUDIT-bepelican.md`.

> **Principle:** the user sees no change. Google sees everything.

Every line of visible copy — headings, paragraphs, button labels, dictionary keys — is the same as before. Only the framework plumbing changed.

---

## What changed (and why)

| Layer | Before (Vite SPA) | After (Next.js App Router) |
|---|---|---|
| Initial HTML | empty `<div id="root">` | full server-rendered HTML with h1s, content, links |
| Routing | `react-router-dom` `BrowserRouter` | App Router file-system routes under `app/` |
| Per-page meta | `react-helmet-async` (client-only) | `generateMetadata` (server) + Helmet kept as client fallback |
| Locale handling | `i18next-browser-languagedetector` (browser-only) | URL segment `[locale]` + `i18n.changeLanguage()` server-side |
| Sitemap | absent / static | `app/sitemap.ts` enumerates every locale × route × tour slug |
| Robots | `public/robots.txt` static | `app/robots.ts` dynamic |
| Schema | absent | `TravelAgency` (every page) + `TouristTrip` (every tour) JSON-LD |
| Bundle entry | `src/main.tsx` + `index.html` | `app/layout.tsx` (root) + `app/[locale]/layout.tsx` (locale) |

Every `src/components/*` and `src/pages/*` file is **byte-for-byte unchanged** except for two surgical plumbing edits:

- `src/components/Layout.tsx` — `<Outlet />` → `{children}` (App Router pattern). Visible UI identical.
- `src/hooks/useLang.ts` — accepts both `locale` (Next param name) and `lang` (legacy param name).
- `src/lib/i18n/index.ts` — removed `i18next-browser-languagedetector` (would crash on the server). Language is driven by the URL segment instead.

---

## How `react-router-dom` keeps working without source edits

[`src/lib/router-shim.tsx`](src/lib/router-shim.tsx) re-implements the parts of `react-router-dom` actually used (`Link`, `NavLink`, `useParams`, `useLocation`, `useNavigate`, `Navigate`, `Outlet`, `BrowserRouter`/`Routes`/`Route` no-ops) on top of `next/link` + `next/navigation`.

[`next.config.ts`](next.config.ts) aliases the package at the webpack layer:

```ts
config.resolve.alias["react-router-dom$"] = path.resolve(__dirname, "src/lib/router-shim.tsx");
```

→ Every existing `import { Link } from "react-router-dom"` in the codebase resolves to the shim at runtime. No file edits needed.

---

## How pages stay in their original `src/pages/*.tsx` location

Pages use React hooks (and therefore must run in the client graph in App Router). Rather than touch each file with a `"use client"` directive, the migration uses **client re-export wrappers** under `app/_clients/`:

```tsx
// app/_clients/Home.tsx
"use client";
export { default } from "@/pages/Home";
```

A `"use client"` boundary pulls the original page (and everything it imports) into the client graph. Server-rendered HTML is still produced — that's how RSC works — but client features (hooks, state, react-query, helmet) all run normally.

The actual route file in `app/[locale]/page.tsx` stays a **server** component so it can `export const metadata` / `generateMetadata`:

```tsx
// app/[locale]/page.tsx (server)
import HomeClient from "../_clients/Home";
export async function generateMetadata({ params }) { /* … */ }
export default function Page() { return <HomeClient />; }
```

---

## Routes wired

| URL | Source page | Static? |
|---|---|---|
| `/` | redirects to `/es` (`app/page.tsx`) | yes |
| `/es` and `/en` | `src/pages/Home.tsx` | force-static |
| `/es/destinos` and `/en/destinations` | `src/pages/Destinations.tsx` | force-static |
| `/es/tematicas` and `/en/themes` | `src/pages/Themes.tsx` | force-static |
| `/es/contacto` and `/en/contact` | `src/pages/Contact.tsx` | force-static |
| `/es/privacidad` and `/en/privacy` | `src/pages/Privacy.tsx` | force-static |
| `/es/tour/<slug>` and `/en/tour/<slug>` | `src/pages/ExperienceDetail.tsx` | `generateStaticParams` enumerates every slug × locale |
| `*` | `src/pages/NotFound.tsx` | n/a |

The Spanish/English path duplications match the legacy `react-router-dom` setup verbatim, so existing inbound links still work.

---

## Schema markup

Both injected as plain `<script type="application/ld+json">` from server components — they appear in the initial HTML, no JS required.

- **Organization (`TravelAgency`)** — emitted once per request from `app/[locale]/layout.tsx`. Includes name, URL, logo, area served, contact point, social profiles.
- **TouristTrip** — emitted from `app/[locale]/tour/[slug]/page.tsx`. Per experience: `name`, `description`, `image`, `touristType` (themes), `provider` (refs the org), `offers` (price in COP) when `priceCOP !== null`.

Both helpers live in [`src/lib/seo.ts`](src/lib/seo.ts) and read directly from the existing `experiences.ts` catalog.

---

## Per-page metadata (verbatim from existing `<Seo>` calls)

Each page route's `generateMetadata` returns the **exact** title/description that the legacy `<Seo>` component was passing to `react-helmet-async`. Sources:

- `src/pages/Home.tsx` lines around the `<Seo>` call → `app/[locale]/page.tsx`
- `src/pages/Destinations.tsx` → `app/[locale]/destinos/page.tsx`
- `src/pages/Themes.tsx` → `app/[locale]/tematicas/page.tsx`
- `src/pages/Contact.tsx` → `app/[locale]/contacto/page.tsx`
- `src/pages/Privacy.tsx` → `app/[locale]/privacidad/page.tsx`
- `src/pages/ExperienceDetail.tsx` → `app/[locale]/tour/[slug]/page.tsx` (uses `e.name[lang] · zone.name[lang]` and `e.hook[lang]`)

`hreflang` alternates point each locale variant at the other (`/es/destinos` ↔ `/en/destinations`, etc.). `x-default` points at `/es`.

---

## Sitemap and robots

- **`/sitemap.xml`** — `app/sitemap.ts` enumerates 5 static paths × 2 locales + `EXPERIENCES.length` × 2 locales. Today that's `(5 × 2) + (n × 2)` URLs from a single source of truth (`experiences.ts`).
- **`/robots.txt`** — `app/robots.ts`, allows everything except `/api/`, references the sitemap. Replaced the static `public/robots.txt`.

---

## Performance

- All page routes have `export const dynamic = "force-static"` and `revalidate = false`. Every URL is rendered once at build time and served as static HTML — fastest possible response, no runtime SSR cost.
- `next/image` is configured for the existing remote hosts in `next.config.ts` (`images.unsplash.com`, `pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev`, `res.cloudinary.com`). Existing `<img>` tags continue to work unchanged.

---

## Running the site

```bash
cd webpage/pelican-trails-impact
npm install         # adds 'next' to existing deps
npm run dev         # http://localhost:3000  → redirects to /es
npm run build       # generates static HTML for every locale × route
npm start           # serve the build
```

---

## What was deleted (Vite-only artifacts)

- `index.html` — replaced by `app/layout.tsx`
- `src/main.tsx` — replaced by App Router entry
- `src/App.tsx` — replaced by `app/` file-system routing
- `src/vite-env.d.ts` — Vite-specific types
- `vite.config.ts` — Vite config
- `tsconfig.app.json`, `tsconfig.node.json` — replaced by single `tsconfig.json` for Next
- `eslint.config.js` — Next ships its own lint config; reintroduce if needed
- `public/robots.txt` — replaced by `app/robots.ts`

`react-router-dom` is **kept** in `package.json` so its TypeScript types are still available; the runtime alias swaps it for the shim.

---

## What's still TODO (not blocking SEO)

- Resolve www → apex 301 at the DNS / hosting layer (Vercel does this automatically when both domains are added; `vercel.json` includes a redirect as a safety net).
- Wire Google Analytics 4 / Search Console / Meta Pixel (env vars are reserved; drop a `<Script>` into `app/[locale]/layout.tsx` once you have the IDs).
- Concurrent build-time renders rely on i18next's shared singleton being mutated under `force-static` — works because Next emits each route serially. If you ever switch a route to `dynamic = "force-dynamic"`, migrate to `next-intl` or per-request i18n to avoid race conditions.
