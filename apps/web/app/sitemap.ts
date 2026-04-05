import { MetadataRoute } from 'next';
import { getAllBreeds, getPopularBreeds, getBreedsByCategory } from '@tutorcanino/data';

const baseUrl = 'https://tutorcanino.com.br';

export default function sitemap(): MetadataRoute.Sitemap {
  const breeds = getAllBreeds();
  const popularBreeds = getPopularBreeds(20); // Top 20 for comparisons
  const categories = ['Pequeno', 'Médio', 'Grande', 'Gigante'] as const;

  // 1. MAIN PAGES - Highest priority
  const mainPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/racas`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/racas/comparar`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/quiz`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/sobre`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // 2. CATEGORY PAGES - High SEO value
  const categoryPages: MetadataRoute.Sitemap = categories.flatMap((category) => [
    {
      url: `${baseUrl}/racas?categoria=${category}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    // Category overview pages
    {
      url: `${baseUrl}/racas/${category.toLowerCase()}-porte`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.82,
    },
  ]);

  // 3. BREED PAGES - Core content
  const breedPages: MetadataRoute.Sitemap = breeds.map((breed) => ({
    url: `${baseUrl}/racas/${breed.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: breed.popularidade ? 0.8 + Math.min(0.1, breed.popularidade / 50000) : 0.75,
  }));

  // 4. BREED COMPARISON PAGES - Programmatic SEO
  // Generate comparisons for popular breeds
  const comparisonPages: MetadataRoute.Sitemap = [];
  for (let i = 0; i < popularBreeds.length; i++) {
    for (let j = i + 1; j < popularBreeds.length; j++) {
      comparisonPages.push({
        url: `${baseUrl}/racas/comparar/${popularBreeds[i].slug}-vs-${popularBreeds[j].slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.75,
      });
    }
  }

  // 5. CATEGORY-SPECIFIC COMPARISONS - Each category's top breeds compared
  const categoryComparisons: MetadataRoute.Sitemap = [];
  categories.forEach((category) => {
    const categoryBreeds = getBreedsByCategory(category).slice(0, 10); // Top 10 per category
    for (let i = 0; i < categoryBreeds.length; i++) {
      for (let j = i + 1; j < categoryBreeds.length; j++) {
        categoryComparisons.push({
          url: `${baseUrl}/racas/comparar/${categoryBreeds[i].slug}-vs-${categoryBreeds[j].slug}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.72,
        });
      }
    }
  });

  // 6. FAQ PAGES - Long-tail keywords
  const faqKeywords = [
    'melhor-raza-apartamento',
    'racas-para-criancas',
    'racas-hipoalergenicas',
    'racas-faceis-de-treinar',
    'racas-calmas',
    'racas-que-nao-latem-muito',
    'melhor-cachorro-primeiro-dono',
    'racas-pequenas-porte',
    'racas-media-porte',
    'racas-grande-porte',
  ];

  const faqPages: MetadataRoute.Sitemap = faqKeywords.map((keyword) => ({
    url: `${baseUrl}/faq/${keyword}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.65,
  }));

  // 7. GLOSSARY PAGES - Educational content
  const glossaryTerms = [
    'porte-cachorro',
    'temperamento-canino',
    'expectativa-vida-cachorro',
    'nivel-energia-cachorro',
    'inteligencia-cachorro',
    'queda-pelo-cachorro',
    'treinamento-cachorro',
    'socializacao-cachorro',
    'saude-cachorro',
    'nutricao-cachorro',
  ];

  const glossaryPages: MetadataRoute.Sitemap = glossaryTerms.map((term) => ({
    url: `${baseUrl}/glossario/${term}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  // 8. UTILITY PAGES - Conversion-focused
  const utilityPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/quiz/resultado`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/favoritos`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
  ];

  return [
    ...mainPages,
    ...categoryPages,
    ...breedPages,
    ...comparisonPages,
    ...categoryComparisons,
    ...faqPages,
    ...glossaryPages,
    ...utilityPages,
  ];
}
