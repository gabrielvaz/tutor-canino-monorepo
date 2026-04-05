---
title: "feat: Geo-Categorical Pet Matrix (Directory)"
type: feat
status: active
date: 2026-04-04
origin: tutor-canino-monorepo/docs/brainstorms/2026-04-04-geo-categorical-matrix-requirements.md
---

# feat: Geo-Categorical Pet Matrix (Directory)

## Overview
Implement a massive programmatic SEO directory for pet services in Brazil, starting with 27 capitals and 5 categories. This involves a new data package, dynamic routing architecture, and rich profile UI components.

## Problem Frame
TutorCanino currently only provides breed information. Users need a reliable, pet-focused directory to find local services. Building a category-first directory (`/[categoria]/[uf]/[cidade]`) will capture high-intent local search traffic. (see origin: tutor-canino-monorepo/docs/brainstorms/2026-04-04-geo-categorical-matrix-requirements.md)

## Requirements Trace
- R1. Dynamic routing at `/[categoria]/[uf]/[cidade]`.
- R2. Detail pages at `/[categoria]/[uf]/[cidade]/[slug-estabelecimento]`.
- R3. Standardized slugs for capitals and categories.
- R4. Rich Profile data model (Hours, Maps, Reviews, etc.).
- R5. Editorial City Hubs with AI-assisted pros.
- R6. Custom crawler infrastructure (planned for `@tutorcanino/locations`).
- R8. Dynamic hierarchical sitemaps.
- R9. `LocalBusiness` and `VeterinaryCare` Schema.org integration.

## Scope Boundaries
- 27 Brazilian Capitals only.
- 5 Core Categories: Petshops, Veterinários, Creches, Hotéis, Parques.
- Static/JSON data approach mirroring `@tutorcanino/data`.

## Context & Research

### Relevant Code and Patterns
- `@tutorcanino/data`: Pattern for JSON-based static data persistence and utility functions.
- `apps/web/app/racas`: Pattern for dynamic routing and metadata generation.
- `apps/web/lib/seo.ts`: Pattern for Schema.org generation.

## Key Technical Decisions
- **New Package**: Create `@tutorcanino/locations` to handle establishment and geo data.
- **Next.js Catch-all**: Use catch-all routes `[...location]` sparingly or nested dynamic routes to maintain performance.
- **Data Structure**: `packages/locations/src/data/[uf]/[cidade]/[categoria]/[slug].json` for high horizontal scalability.

## Implementation Units

- [ ] **Unit 1: Locations Data Package**
  - **Goal**: Scaffold the new locations package.
  - **Files**:
    - Create: `packages/locations/package.json`
    - Create: `packages/locations/src/types/location.ts`
    - Create: `packages/locations/src/data/index.ts`
  - **Approach**: Mirror `@tutorcanino/data` structure. Define `Location` interface with rich profile fields.
  - **Verification**: `pnpm build` in the package root.

- [ ] **Unit 2: Directory Routing Architecture**
  - **Goal**: Implement the hierarchical directory routes in Next.js.
  - **Files**:
    - Create: `apps/web/app/[category]/[uf]/[city]/page.tsx` (Hub)
    - Create: `apps/web/app/[category]/[uf]/[city]/[slug]/page.tsx` (Detail)
  - **Approach**: Use nested dynamic segments. Implement `generateStaticParams` for top capital/category combinations.
  - **Verification**: Navigating to valid city/category URLs returns 200 OK.

- [ ] **Unit 3: UI Components - Listing & Detail**
  - **Goal**: Create components for the directory.
  - **Files**:
    - Create: `apps/web/components/locations/location-card.tsx`
    - Create: `apps/web/components/locations/location-detail.tsx`
    - Create: `apps/web/components/locations/city-editorial.tsx`
  - **Approach**: Design card with review scores and category badge. Detail view with Maps embed and business hours.
  - **Patterns**: Follow `breed-card.tsx` and `breed-detail.tsx` visual style.
  - **Verification**: Components render correctly with mock location data.

- [ ] **Unit 4: SEO & Sitemaps**
  - **Goal**: Integrate Schema.org and dynamic sitemaps.
  - **Files**:
    - Modify: `apps/web/lib/seo.ts`
    - Modify: `apps/web/app/sitemap.ts`
  - **Approach**: Add `generateLocationSchema`. Update sitemap to crawl the new location hierarchy.
  - **Verification**: View sitemap at `/sitemap.xml` and verify new entries.

- [ ] **Unit 5: Crawler Script Scaffold**
  - **Goal**: Create the foundation for data ingestion.
  - **Files**:
    - Create: `packages/locations/scripts/crawl-establishments.ts`
  - **Approach**: Setup a playwright or node-fetch script pattern to fetch data from Brazilian public sources.
  - **Verification**: Script can successfully fetch and parse a sample establishment from a test URL.

## System-Wide Impact
- **Navigation**: New top-level categories will appear in the URL space.
- **Build Time**: Thousands of new pages will increase build time; rely on ISR for detail pages.

## Risks & Dependencies
| Risk | Mitigation |
|------|------------|
| Data Accuracy | Implement a validation script before every build. |
| URL Collision | Reserve keywords like `racas`, `artigos` to prevent category overlap. |

## Sources & References
- **Origin document**: [tutor-canino-monorepo/docs/brainstorms/2026-04-04-geo-categorical-matrix-requirements.md](tutor-canino-monorepo/docs/brainstorms/2026-04-04-geo-categorical-matrix-requirements.md)
