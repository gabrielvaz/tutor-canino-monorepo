---
date: 2026-04-04
topic: geo-categorical-pet-matrix
---

# Geo-Categorical Pet Matrix (SEO Directory)

## Problem Frame
Users searching for pet services in Brazil currently land on generic directories (Yellow Pages style) or map views that lack specialized "pet parent" context. TutorCanino will create a massive, category-first SEO matrix starting with all 27 capitals, providing high-authority, editorial-rich hubs and detailed establishment profiles.

## Requirements

**URL Structure & Routing (Category First)**
- R1. Implement dynamic routing: `/[categoria]/[uf]/[cidade]`.
  - Example: `/petshops/sp/sao-paulo`
- R2. Implement listing detail pages: `/[categoria]/[uf]/[cidade]/[slug-estabelecimento]`.
  - Example: `/veterinarios/rj/rio-de-janeiro/hospital-veterinario-24h`
- R3. Standardize URL slugs for 27 Brazilian capitals and core categories (Petshops, Veterinários, Creches, Hotéis, Parques).

**Content & Data (Rich Profiles)**
- R4. Establish a "Rich Profile" data model for every location:
  - Business Name, Category, Phone, Full Address.
  - Google Maps integration (Coordinates + Embed).
  - Review Score & Review Count.
  - Business Hours (Open/Closed status).
  - Long Description (Editorial summary).
  - Image Gallery (Interior/Exterior).
- R5. Implement "Editorial City Hubs": City pages must include unique, AI-assisted descriptions about the pet culture and infrastructure in that specific capital.

**Data Pipeline (Custom Crawler)**
- R6. Build a custom crawler/scrapper infrastructure to ingest location data from major Brazilian public sources and local directories.
- R7. Implement a data-validation layer to deduplicate and clean crawled addresses and phone numbers.

**SEO & Discovery**
- R8. Generate dynamic hierarchical sitemaps: States -> Cities -> Categories -> Listings.
- R9. Implement `LocalBusiness` and `VeterinaryCare` Schema.org markup for maximum rich result visibility.

## Success Criteria
- Indexed URLs for 5 categories across 27 capitals (135 high-authority hubs).
- Capture 5x more local search traffic ("petshop em [cidade]") within 3 months of launch.
- 100% valid Schema.org markup across all location pages.

## Scope Boundaries
- Initial launch limited to **27 Brazilian Capitals**.
- Fixed Taxonomy: Only 5 core categories (Petshops, Vets, Daycare, Hotels, Parks).
- No user accounts or "My Favorites" in the initial directory launch.

## Key Decisions
- **URL Pattern**: Category first (`/petshops/...`) to emphasize the service intent over the geography.
- **Data Moat**: Prioritize "Rich Profiles" with deep data over a lean list to build authority and trust.
- **Editorial vs Data**: Hub pages will use an editorial approach (helpful prose) to avoid "thin content" flags.

## Next Steps
- → `/ce:plan` for technical implementation of the database schema and routing.
