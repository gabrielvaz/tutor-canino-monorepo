---
date: 2026-04-04
topic: breed-comparison-pages
---

# Programmatic Breed Comparisons (X vs Y)

## Problem Frame
Choosing between two similar dog breeds is a high-anxiety moment for potential owners. There is a massive SEO opportunity for "Raça X vs Raça Y" keywords in Brazil (e.g., "Golden Retriever vs Labrador"), which currently leads to low-quality or outdated content. TutorCanino can dominate this niche by programmatically generating high-quality, data-driven comparison pages.

## Requirements

**Core Navigation & Routes**
- R1. Implement dynamic routing at `/racas/comparar/[slug1]-vs-[slug2]`.
- R2. Create a central hub at `/racas/comparar` listing popular comparisons categorized by porte (e.g., "Duelos de Pequeno Porte").
- R3. Add a "Comparar" section to individual breed detail pages suggesting the top 3-5 similar competitors.

**Content & Data**
- R4. Display a comprehensive comparison table covering all available data points:
  - Technical Specs (Origin, Life expectancy, Height, Weight).
  - Temperament (Energy, Intelligence, Family affection, etc.).
  - Care & Health (Grooming needs, common issues).
- R5. Implement data-driven "Winner Badges" based on logical thresholds (e.g., "Melhor para Apartamento" if size is Small and Barking is Low).
- R6. Integrate Gemini 2.0 to generate a unique "Verdict" summary (2-3 paragraphs) comparing the two breeds' suitability for different lifestyles.

**SEO & Technical**
- R7. Implement `CompareAction` and Product comparison schema.org markup.
- R8. Ensure dynamic meta titles and descriptions (e.g., "Golden Retriever vs Labrador: Qual raça é a ideal para sua família?").
- R9. Implement a logic to prevent indexing of nonsensical pairs (e.g., extremely rare breeds vs extremely rare breeds) to maintain crawl budget.

## Success Criteria
- 10x increase in long-tail keyword rankings for "vs" and "comparar" queries.
- 20% increase in average session duration by providing deep comparison content.
- 0% "thin content" warnings in Google Search Console due to high-quality AI summaries and data tables.

## Scope Boundaries
- Only 1-vs-1 comparisons (no 3-way comparisons in v1).
- No user-generated votes or ratings on the comparison itself (v1 focus is purely data/AI).
- No "Compare with my lifestyle" quiz integration here (handled by the Wizard separately).

## Key Decisions
- **Static vs Dynamic**: Use Next.js Dynamic Routes with high `revalidate` or ISR for popular pairs to balance SEO speed and build time.
- **AI Summary**: AI summaries should be generated at build/request time and cached to avoid excessive API costs while ensuring unique content.

## Next Steps
- → `/ce:plan` for structured implementation planning.
