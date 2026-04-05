/**
 * Scaffold for crawling pet establishments across Brazil
 * Use this to fetch data from Google Places or other directories.
 */

import fs from 'fs';
import path from 'path';
import { Location } from '../src/types/location';

async function crawl(uf: string, city: string, category: string) {
  console.log(`🔍 Crawling ${category} in ${city}-${uf}...`);
  
  // Mocking results for the scaffold
  const mockResults: Location[] = [
    {
      id: `${category}-mock-1`,
      name: `Exemplo de ${category} em ${city}`,
      slug: `${category}-mock-1`,
      category: category as any,
      uf,
      city,
      address: `Rua Exemplo, 123 - Centro, ${city} - ${uf}`,
      phone: "(00) 0000-0000",
      rating: { score: 4.8, count: 100 }
    }
  ];

  const baseDir = path.join(__dirname, `../src/data/${uf.toLowerCase()}/${city.toLowerCase()}/${category.toLowerCase()}`);
  if (!fs.existsSync(baseDir)) fs.mkdirSync(baseDir, { recursive: true });

  for (const loc of mockResults) {
    const filePath = path.join(baseDir, `${loc.slug}.json`);
    fs.writeFileSync(filePath, JSON.stringify(loc, null, 2));
    console.log(`✅ Saved: ${loc.name}`);
  }
}

async function main() {
  const capitals = [
    { uf: 'SP', city: 'sao-paulo' },
    { uf: 'RJ', city: 'rio-de-janeiro' },
    { uf: 'PR', city: 'curitiba' },
    // ... add all 27 capitals
  ];

  const categories = ['petshops', 'veterinarios', 'creches', 'hoteis', 'parques'];

  for (const cap of capitals) {
    for (const cat of categories) {
      await crawl(cap.uf, cap.city, cat);
    }
  }
}

main().catch(console.error);
