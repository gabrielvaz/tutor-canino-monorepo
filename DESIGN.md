# TutorCanino — Design System & UI Analysis

## Current State Assessment

### What's Working
- Clean, functional breed listing and detail pages
- Responsive grid layout (1-4 columns)
- Image validation handles bad data gracefully
- Dark mode foundation exists
- Loading skeleton on detail pages

### Critical Design Gaps

#### 1. No Navigation / Header
**Impact:** Users can't navigate between pages easily. The site feels disjointed.
**Severity:** High

#### 2. Generic Visual Identity
**Impact:** No brand personality. Looks like a template, not a product.
**Severity:** Medium-High

#### 3. Weak Typography System
**Impact:** Inconsistent text sizes, no type scale, poor readability on longer content.
**Severity:** Medium

#### 4. No Design Tokens
**Impact:** Spacing, colors, and sizes are arbitrary. Hard to maintain consistency.
**Severity:** High

#### 5. Homepage is Default Template
**Impact:** Terrible first impression. No value proposition.
**Severity:** High

#### 6. Empty States Are Bare
**Impact:** "No results" is functional but not helpful or encouraging.
**Severity:** Low-Medium

---

## Design Proposal

### Color Palette

For a pet/breed site, we need warmth, trust, and energy. Not sterile blue-gray.

```css
/* Primary - Warm, trustworthy */
--primary: #E07A5F;       /* Terracotta/Coral */
--primary-dark: #C5664E;
--primary-light: #F4A991;

/* Secondary - Friendly, playful */
--secondary: #81B29A;     /* Sage green */
--secondary-dark: #6A9A82;

/* Accent - Energy */
--accent: #F2CC8F;        /* Warm gold */
--accent-dark: #E5B87D;

/* Neutral - Warm grays, not cold */
--gray-50: #FAF9F6;       /* Off-white */
--gray-100: #F5F3F0;
--gray-200: #E8E4DD;
--gray-300: #D4CFC5;
--gray-400: #A8A29C;
--gray-500: #78716C;
--gray-600: #57534E;
--gray-700: #44403C;
--gray-800: #292524;
--gray-900: #1C1917;

/* Semantic */
--success: #81B29A;
--warning: #F2CC8F;
--error: #E07A5F;
--info: #6CA5DC;
```

**Why:** Warm earth tones feel natural for a pet site. Terracotta is distinctive but trustworthy. The palette has good contrast and personality without being childish.

### Typography Scale

Geist is good (clean, modern), but we need a proper scale:

```css
/* Font sizes - Major Third scale (1.250) */
--text-xs: 0.75rem;      /* 12px */
--text-sm: 0.875rem;     /* 14px - base body */
--text-base: 1rem;       /* 16px */
--text-lg: 1.125rem;     /* 18px */
--text-xl: 1.25rem;      /* 20px */
--text-2xl: 1.563rem;    /* 25px */
--text-3xl: 1.953rem;    /* 31px */
--text-4xl: 2.441rem;    /* 39px */
--text-5xl: 3.052rem;    /* 49px */

/* Line heights */
--leading-tight: 1.25;
--leading-normal: 1.5;
--leading-relaxed: 1.75;

/* Font weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### Spacing Scale

```css
/* 4px base unit */
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
```

### Component Improvements

#### Card Design
Current: White box with basic shadow
Proposed:
- Subtle border (gray-200) for definition
- Larger images (aspect ratio 4:3 instead of 3:2)
- Better hover state (slight lift + image zoom)
- Tags for quick filters (size, energy level)
- "Favorite" heart icon
- Paw icon for popularity instead of generic stars

#### Button Styles
Add to existing variants:
- `primary-filled`: Terracotta background, white text
- `primary-outline`: Terracotta border, terracotta text
- `secondary-filled`: Sage background, white text
- `ghost-destructive`: For delete actions

#### Filter Component
- Use pill-shaped buttons instead of rectangular
- Add icon indicators
- Show active count (e.g., "42 raças")

### Navigation Structure

```tsx
<Header>
  <Logo>TutorCanino</Logo>
  <Nav>
    <Link to="/racas">Raças</Link>
    <Link to="/quiz">Quiz</Link>
    <Link to="/sobre">Sobre</Link>
  </Nav>
  <SearchTrigger />
</Header>

<Breadcrumbs>
  Home > Raças > Golden Retriever
</Breadcrumbs>
```

### Homepage Redesign

Hero section with:
- Headline: "Encontre o cão ideal para você"
- Subhead: "Descubra qual raça combina com seu estilo de vida"
- CTA: "Começar Quiz" + "Explorar Raças"
- Hero image: happy dog with person

Social proof below:
- "158 raças catalogadas"
- "Mais de 10.000 tutores encontraram seu cão ideal"

Featured breeds carousel.

### Empty States

```tsx
<EmptyState
  icon={<PawPrint />}
  title="Nenhuma raça encontrada"
  description="Tente outros filtros ou explore todas as raças"
  action={{
    label: "Limpar filtros",
    onClick: clearFilters
  }}
/>
```

### Loading States

- Add to main listing page (not just detail)
- Shimmer effect on cards
- Progressive loading (show content as it's ready)

### Dark Mode Polish

Current dark mode is inverted colors. Better approach:
- Slightly warmer black (#121212, not pure black)
- Reduce contrast slightly for comfort
- Keep accent colors vibrant

---

## Implementation Priority

### Phase 1 — Foundation (Do first)
1. Set up design tokens (colors, spacing, type)
2. Update globals.css with new palette
3. Create/use Navbar component
4. Fix homepage with proper hero

### Phase 2 — Component Polish
5. Redesign BreedCard with new styles
6. Improve filter UI
7. Add loading states to listing
8. Better empty states

### Phase 3 — Delight
9. Add micro-animations (Framer Motion)
10. Favorite/save breeds feature
11. Share breed cards
12. Accessibility audit

---

## Tech Considerations

### Keep
- Tailwind CSS 4 (great for rapid iteration)
- Radix UI (solid accessibility)
- Next.js Image optimization
- Current component structure

### Consider Adding
- Framer Motion for animations (lightweight)
- lucide-react for icons (already compatible with Radix)
- React Virtuoso for virtualization (if list gets long)
- React Hot Toast for notifications (better than browser alerts)

---

## A/B Test Ideas

Once core is solid:
1. Card layout: Grid vs List view preference
2. Filter placement: Sidebar vs Top bar
3. Image size: Larger vs More cards visible
4. Quiz flow: Multi-step vs Single page

---

**Status:** Ready for Phase 1 implementation
**Last updated:** 2025-04-04
