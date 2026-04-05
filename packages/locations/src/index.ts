import type { Location } from './types/location';

// Static import of locations data
import brasilData from './data/brazil.json';

let cachedLocations: Location[] | null = null;

export function getAllLocations(): Location[] {
  if (cachedLocations) {
    return cachedLocations;
  }
  cachedLocations = brasilData as Location[];
  return cachedLocations;
}

export function getLocationsByUF(uf: string): Location[] {
  return getAllLocations().filter(l => l.uf.toLowerCase() === uf.toLowerCase());
}

export function getLocationsByCity(uf: string, city: string): Location[] {
  return getAllLocations().filter(l =>
    l.uf.toLowerCase() === uf.toLowerCase() &&
    l.city.toLowerCase() === city.toLowerCase()
  );
}

export function getLocationBySlug(slug: string): Location | undefined {
  return getAllLocations().find(l => l.slug === slug);
}

export function getLocationCategories(): string[] {
  return getAllLocations().map(l => l.category).filter(Boolean);
}

export * from './types/location';
