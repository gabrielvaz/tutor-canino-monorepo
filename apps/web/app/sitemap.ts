import { MetadataRoute } from 'next';
import { getAllBreeds } from '@tutorcanino/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://tutorcanino.com';
  const breeds = getAllBreeds();

  const breedUrls = breeds.map((breed) => ({
    url: `${baseUrl}/racas/${breed.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/racas`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...breedUrls,
  ];
}
