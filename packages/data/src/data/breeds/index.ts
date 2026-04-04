import fs from 'fs';
import path from 'path';
import type { Breed } from '../../types';

// Get breeds directory - works from both root and apps/web
const getBreedsDir = () => {
  // When running from apps/web during build/dev
  const fromBuild = path.join(process.cwd(), '../../packages/data/src/data/breeds');
  if (fs.existsSync(fromBuild)) return fromBuild;

  // When running from root
  const fromRoot = path.join(process.cwd(), 'packages/data/src/data/breeds');
  if (fs.existsSync(fromRoot)) return fromRoot;

  // When running from packages/data
  const fromPackage = path.join(__dirname, '../data/breeds');
  if (fs.existsSync(fromPackage)) return fromPackage;

  // Absolute fallback
  return '/Users/vaz-mac-mini/dev-apps/tutor-canino/tutor-canino-monorepo/packages/data/src/data/breeds';
};

const BREEDS_DIR = getBreedsDir();

let breedsCache: Breed[] | null = null;

export function getAllBreeds(): Breed[] {
  if (breedsCache) return breedsCache;

  const files = fs.readdirSync(BREEDS_DIR).filter(f => f.endsWith('.json') && f !== 'index.ts');

  breedsCache = files.map(file => {
    const content = fs.readFileSync(path.join(BREEDS_DIR, file), 'utf-8');
    return JSON.parse(content) as Breed;
  });

  return breedsCache;
}

export function getBreedsBasic(): Breed[] {
  return getAllBreeds();
}

export function getBreedBySlug(slug: string): Breed | undefined {
  const breeds = getAllBreeds();
  return breeds.find(breed => {
    const breedSlug = breed.nome?.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return breedSlug === slug;
  });
}

export function getBreedsByCategory(porte: string): Breed[] {
  const breeds = getAllBreeds();
  return breeds.filter(b => b.caracteristicas?.fisico?.porte === porte);
}

export function searchBreeds(query: string): Breed[] {
  const breeds = getAllBreeds();
  const lowerQuery = query.toLowerCase();

  return breeds.filter(breed =>
    (breed.nome || breed.name || '').toLowerCase().includes(lowerQuery) ||
    breed.sobre?.descricao?.toLowerCase().includes(lowerQuery) ||
    breed.informacoes_basicas?.origem?.toLowerCase().includes(lowerQuery)
  );
}
