# Genesis Interiors — Product Requirements Document

> **Version** 1.0 · **Last updated** October 2026
> **Product owner** Genesis Interiors LLC · Fort Lauderdale, FL / Viareggio, Italy

---

## 1. Product Overview

### 1.1 Vision

Genesis Interiors is a premium, single-page portfolio and private-inquiry web application for **Genesis Interiors LLC** — an international atelier specialising in bespoke superyacht interiors, residential millwork, and luxury furniture. The product replaces the static brochure site with an immersive, performance-first digital experience that converts high-net-worth visitors into qualified project inquiries while showcasing over 30 years and 150+ commissions.

### 1.2 Business Goals

| # | Goal | Success Metric |
| --- | ------ | ---------------- |
| 1 | Drive qualified project inquiries | ≥ 5 private consultations per month via the on-site form |
| 2 | Showcase craft and credibility | Complete, searchable project archive with real portfolio photography |
| 3 | Professional brand presence | Sub-3 s LCP on mobile; zero accessibility blockers |
| 4 | Data privacy for inquiries | Write-only submission path; no public read access to visitor data |

### 1.3 Target Audience

- Yacht owners and captains commissioning new builds or refits (48 ′–462 ′ vessels)
- Interior designers and naval architects seeking a fabrication partner
- High-net-worth homeowners looking for superyacht-grade residential millwork
- Yacht brokers and management companies evaluating subcontractors

---

## 2. Technology Stack

| Layer | Technology | Notes |
| ------- | ----------- | ------- |
| **Framework** | TanStack Start (React 19) | Full-stack SSR + server functions via Nitro |
| **Language** | TypeScript 5.8 | Strict mode; path aliases via `tsconfig.json` |
| **Routing** | TanStack Router | File-based route tree (`src/routes/`) |
| **Styling** | Tailwind CSS 4 | Design tokens via CSS variables; `tw-animate-css` for micro-animations |
| **UI Primitives** | shadcn/ui (New York style) | 46 Radix-based components in `src/components/ui/` |
| **State** | React hooks + TanStack Query | Server state caching for future data-fetched pages |
| **Backend** | Supabase (PostgreSQL) | `project_inquiries` table; insert-only RLS policy |
| **ORM** | Drizzle ORM + Drizzle Kit | Schema migrations in `drizzle/migrations/` |
| **Validation** | Zod | Server-side input validation on inquiry submissions |
| **Build tool** | Vite 8 | Custom Vite config with TanStack + Tailwind plugins |
| **Deployment target** | Cloudflare (via Nitro) | Edge SSR; configurable in `vite.config.ts` |

---

## 3. Information Architecture

```text
Landing page (single route: `/`)
├── Header — sticky nav, wordmark, CTA
├── Hero — full-bleed imagery, tagline, dual CTAs
├── Intro band — brand positioning statement
├── §01 Expertise — 3 service cards (yacht interiors, residential, furniture)
├── §02 Selected Work — 4-project visual gallery
├── §03 Fit-Lock® — engineering differentiator + detail cards
├── §04 Project Archive — filterable/searchable tabular list (3 categories)
├── §05 Private Consultation — validated inquiry form + direct contact
└── Footer — addresses, sister brands, social links, copyright
```

---

## 4. Feature Specifications

### 4.1 Responsive Navigation

| Requirement | Detail |
| ------------- | -------- |
| Desktop | Horizontal nav links + "Private Consultation" CTA button |
| Mobile | Hamburger toggle → full-width vertical nav overlay |
| Scroll behaviour | Sticky header with `backdrop-filter` blur; smooth anchor scrolling |
| Sections linked | Expertise · Selected Work · Fit-Lock® · Project Archive |

### 4.2 Hero Section

- Full-bleed background image loaded with `fetchPriority="high"` for optimal LCP
- Semi-transparent gradient overlay for text legibility
- Dual call-to-action: primary button ("Discuss your project") + text link ("Explore our work")
- Location eyebrow: Fort Lauderdale / Viareggio

### 4.3 Expertise Grid

Three service cards, each containing:

- Numbered index (01 / 02 / 03)
- Service title and two-line description
- Decorative directional arrow
- Hover micro-animation

Services covered:

1. **Superyacht interiors & refits** — 48 ′ to 462 ′
2. **Residential millwork** — kitchens, home theatres, architectural woodwork
3. **Bespoke furniture** — veneers, hand-painted finishes, leather, Italian marble

### 4.4 Selected Work Gallery

- 4 featured projects displayed in an asymmetric grid (1 large + 3 standard)
- Each card: image, project name, type tag, dimensions, year
- Images sourced from Genesis portfolio via asset pointer JSON files in `src/assets/`
- Photography attribution note below the grid

### 4.5 Fit-Lock® Section

- Split layout: image + copy
- Explains the patented **Fit-Lock® pressure-panel assembly system**
- Two detail cards (full-scale pre-assembly; Fit-Lock® system)
- External link to `genesisinteriors.com/fitlock`

### 4.6 Project Archive

| Requirement | Detail |
| ------------- | -------- |
| Data source | Typed local catalogue in `src/lib/projects.ts` |
| Categories | New builds · Yacht interiors · Yacht refits |
| Category tabs | Tab bar with project count badges |
| Search | Real-time client-side text filter across name, length, year, location, collaborator |
| Pagination | Initial display of 8 rows; "View all N projects" toggle for full list |
| Row fields | Index · Name · Length · Year · Location · Collaborator |
| Total projects | 150+ across all categories |

#### Project Data Model

```typescript
type Project = {
  name: string        // e.g. "Dream 348′"
  length: string      // e.g. "106 m"
  year: string        // e.g. "2018"
  location: string    // e.g. "Greece"
  collaborator: string // e.g. "CQS"
}
```

### 4.7 Private Consultation Form

| Field | Type | Validation | Required |
| ------- | ------ | ----------- | ---------- |
| Name | text | 2–120 chars, trimmed | ✓ |
| Email | email | Valid format, max 254 chars | ✓ |
| Phone | tel | Max 40 chars | — |
| Project type | select | Enum: Yacht new build · Yacht refit · Residence · Furniture · Other | ✓ |
| Vessel / Property | text | Max 160 chars | — |
| Brief (message) | textarea | 20–4,000 chars | ✓ |
| Website (honeypot) | hidden | Auto-rejected if filled | — |

#### Submission Flow

1. Client-side HTML validation fires first
2. Form data sent via TanStack Start **server function** (`createServerFn`, POST)
3. Server-side Zod schema validates all fields
4. Honeypot check: if `website` field is populated, request is silently accepted and discarded
5. Supabase client inserts row into `project_inquiries` table
6. On success: form resets; success state rendered with confirmation message
7. On error: inline error alert with fallback contact details (phone + email)

#### Anti-Spam

- Hidden honeypot `<input>` with `tabIndex={-1}` and `aria-hidden="true"`
- No public read path for inquiry data — write-only insert via RLS

### 4.8 Footer

- Brand wordmark + tagline
- Fort Lauderdale office address with Google Maps directions link
- Genesis Group sister brands: Genesis Yachts · Cantiere Viareggio
- Social media links: Instagram · LinkedIn · Facebook · YouTube · Houzz · Pinterest · X
- Back-to-top button
- Copyright with dynamic year

---

## 5. Data Layer

### 5.1 Database Schema — `project_inquiries`

| Column | Type | Constraints |
| -------- | ------ | ------------ |
| `id` | `uuid` | Primary key, auto-generated |
| `created_at` | `timestamptz` | Default `now()` |
| `name` | `text` | NOT NULL |
| `email` | `text` | NOT NULL |
| `phone` | `text` | Nullable |
| `project_type` | `text` | NOT NULL |
| `project_name` | `text` | Nullable |
| `message` | `text` | NOT NULL |

### 5.2 Row-Level Security

- **Insert-only policy**: anonymous users can insert rows into `project_inquiries`
- **No SELECT / UPDATE / DELETE**: visitor briefs have no public read path
- Supabase client is initialised server-side only, with `persistSession: false` and `autoRefreshToken: false`

### 5.3 Static Data

The project catalogue is maintained as **typed local content** in `src/lib/projects.ts`. This is a deliberate architectural decision:

- Eliminates a database read on every page load
- Allows instant client-side filtering and search
- Keeps the portfolio data version-controlled in Git
- New projects are added by editing the pipe-delimited string constants

---

## 6. Asset Management

Portfolio images are referenced through **asset pointer JSON files** in `src/assets/`:

| Asset file | Subject |
| ----------- | --------- |
| `hero.asset.json` | Hero section background |
| `dream.asset.json` | M/Y Dream interior |
| `crescent.asset.json` | M/Y Crescent interior |
| `oceancay.asset.json` | Ocean Cay Villa exterior |
| `oceancay2.asset.json` | Ocean Cay Villa bedroom |
| `keybiscayne.asset.json` | Key Biscayne Residence |

Each JSON file contains a `url` field pointing to a hosted copy of the image. This avoids hot-linking originals while keeping imagery attributable to Genesis' own portfolio photography.

---

## 7. SEO & Meta

### 7.1 Page-Level Meta

| Tag | Content |
| ----- | --------- |
| `<title>` | Genesis Interiors · Luxury Yacht & Residential Millwork |
| `meta[description]` | Italian-crafted bespoke millwork, superyacht interiors and luxury residential installations. |
| `og:title` | Genesis Interiors · Luxury Yacht & Residential Millwork |
| `og:description` | Traditional Italian craftsmanship meets engineering precision for superyachts and private estates. |
| `og:type` | website |
| `twitter:card` | summary_large_image |

### 7.2 Semantic Structure

- Single `<h1>` per page: "Genesis *Interiors*"
- Proper heading hierarchy: `h1 → h2 → h3`
- Semantic landmarks: `<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`, `<article>`, `<figure>`, `<address>`
- ARIA labels on navigation regions, tab lists, and status messages
- Screen-reader-only text for icon-only controls

---

## 8. Performance Requirements

| Metric | Target |
| -------- | -------- |
| Largest Contentful Paint (LCP) | < 2.5 s |
| First Input Delay (FID) | < 100 ms |
| Cumulative Layout Shift (CLS) | < 0.1 |
| Hero image strategy | `fetchPriority="high"` |
| Below-fold images | `loading="lazy"` |
| CSS delivery | Single stylesheet, linked in `<head>` |
| JavaScript | SSR + hydration; code-split by route |

---

## 9. Accessibility Requirements

| Area | Requirement |
| ------ | ------------ |
| Keyboard navigation | All interactive elements focusable and operable via keyboard |
| ARIA | Roles on tabs, tab panels, alerts, status messages; `aria-expanded` on menu toggle |
| Colour contrast | WCAG 2.1 AA minimum for all text |
| Screen readers | `sr-only` labels on icon-only elements; descriptive `alt` text on all images |
| Motion | `prefers-reduced-motion` respected via Tailwind's `motion-safe` / `motion-reduce` utilities |
| Forms | Visible labels; meaningful error messages; autofill attributes |

---

## 10. Security Considerations

| Concern | Mitigation |
| --------- | ----------- |
| Spam submissions | Honeypot field; server-side validation |
| Data exposure | No public read path; insert-only RLS |
| XSS | React's default escaping; no `dangerouslySetInnerHTML` |
| CSRF | Server function runs server-side; no cookie-based auth exposed |
| Environment secrets | `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY` stored in `.env`, not committed |
| Error leakage | Custom error boundary + fallback error page; server errors return generic HTML |

---

## 11. Error Handling

| Scenario | Behaviour |
| ---------- | ---------- |
| Route not found | Custom 404 component with "Go home" link |
| Runtime error (client) | `ErrorComponent` boundary with "Try again" + "Go home" actions; error logged to console |
| SSR crash | `server.ts` wrapper catches exceptions and returns a static error HTML page |
| Nitro swallowed errors | Detection of h3's `{unhandled: true}` JSON body → replaced with error page |
| Inquiry submission failure | Inline error message with fallback contact details |

---

## 12. Development Setup

### Prerequisites

- **Node.js** ≥ 18 (recommended: install via [nvm](https://github.com/nvm-sh/nvm))
- **npm** (bundled with Node) or **Bun**

### Getting Started

```sh
git clone <repository-url>
cd Genesis-Interiors
npm install
npm run dev
```

### Environment Variables

Create a `.env` file in the project root:

```dotenv
SUPABASE_URL=<your-supabase-project-url>
SUPABASE_PUBLISHABLE_KEY=<your-supabase-anon-key>
```

### Available Scripts

| Script | Description |
| -------- | ------------ |
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Production build via Vite + Nitro |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the project |
| `npm run format` | Format code with Prettier |

### Project Structure

```text
Genesis Interiors/
├── drizzle/                  # Database schema & migrations
│   ├── schema.ts
│   └── migrations/
├── public/                   # Static assets (favicon, etc.)
├── src/
│   ├── assets/               # Portfolio image asset pointers (JSON)
│   ├── components/ui/        # shadcn/ui primitives (46 components)
│   ├── hooks/                # Custom React hooks (e.g. use-mobile)
│   ├── integrations/supabase/# Supabase client, auth, generated types
│   ├── lib/
│   │   ├── projects.ts       # Typed project catalogue (local data)
│   │   ├── inquiry.functions.ts  # Server function: inquiry submission
│   │   ├── utils.ts          # Shared utilities
│   │   ├── error-capture.ts  # Global error capture for SSR
│   │   └── error-page.ts     # Static fallback error HTML
│   ├── routes/
│   │   ├── __root.tsx        # Root layout, shell, error/404 components
│   │   └── index.tsx         # Landing page (all sections)
│   ├── router.tsx            # Router configuration
│   ├── server.ts             # SSR entry point with error wrapper
│   ├── start.ts              # TanStack Start entry
│   └── styles.css            # Global stylesheet (Tailwind + custom)
├── supabase/config.toml      # Supabase local config
├── components.json           # shadcn/ui configuration
├── drizzle.config.ts         # Drizzle Kit configuration
├── vite.config.ts            # Vite + TanStack Start build config
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies & scripts
```

---

## 13. Built With

- [TanStack Start](https://tanstack.com/start) — Full-stack React framework
- [TanStack Router](https://tanstack.com/router) — Type-safe file-based routing
- [React 19](https://react.dev) — UI library
- [TypeScript](https://www.typescriptlang.org) — Static typing
- [Tailwind CSS 4](https://tailwindcss.com) — Utility-first CSS
- [shadcn/ui](https://ui.shadcn.com) — Radix-based UI primitives
- [Supabase](https://supabase.com) — PostgreSQL backend with RLS
- [Drizzle ORM](https://orm.drizzle.team) — TypeScript ORM & migrations
- [Zod](https://zod.dev) — Runtime schema validation
- [Lucide React](https://lucide.dev) — Icon library
- [Vite](https://vite.dev) — Build tool & dev server
