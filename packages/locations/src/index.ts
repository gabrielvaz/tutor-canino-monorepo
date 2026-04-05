import fs from 'fs';
import path from 'path';
import type { Location, LocationCategory } from './types/location';

const LOCATIONS_DIR = path.join(__dirname, 'data');

export function getAllLocations(): Location[] {
  const locations: Location[] = [];
  
  const scanDir = (dir: string) => {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isDirectory()) {
        scanDir(fullPath);
      } else if (file.endsWith('.json')) {
        const content = fs.readFileSync(fullPath, 'utf-8');
        locations.push(JSON.parse(content));
      }
    }
  };

  if (fs.existsSync(LOCATIONS_DIR)) {
    scanDir(LOCATIONS_DIR);
  }
  
  return locations;
}

export function getLocationsByCity(uf: string, city: string, category?: LocationCategory): Location[] {
  const all = getAllLocations();
  return all.filter(l => 
    l.uf.toLowerCase() === uf.toLowerCase() && 
    l.city.toLowerCase() === city.toLowerCase() &&
    (!category || l.category === category)
  );
}

export function getLocationBySlug(slug: string): Location | undefined {
  return getAllLocations().find(l => l.slug === slug);
}

export * from './types/location';
