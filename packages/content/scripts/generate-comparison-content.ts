/**
 * Script to generate comparison content using Google Gemini 2.0
 */

import { ComparisonGenerator } from '../src/generators/comparison-generator';
import { getAllBreeds } from '@tutorcanino/data';
import fs from 'fs';
import path from 'path';
import dotenv from 'fs-extra'; // using fs for now as fallback

// Load environment variables
const envPath = path.join(__dirname, '../.env');
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, 'utf-8');
  envConfig.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) process.env[key.trim()] = value.trim();
  });
}

const CACHE_DIR = path.join(__dirname, '../src/data');
const CACHE_FILE = path.join(CACHE_DIR, 'comparison-cache.json');

async function main() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('❌ Error: GEMINI_API_KEY is not set');
    process.exit(1);
  }

  const breeds = getAllBreeds().sort((a, b) => (b.popularidade || 0) - (a.popularidade || 0));
  const topBreeds = breeds.slice(0, 20); // Top 20 for initial pre-generation

  const generator = new ComparisonGenerator(apiKey);
  
  if (!fs.existsSync(CACHE_DIR)) fs.mkdirSync(CACHE_DIR, { recursive: true });
  let cache: Record<string, any> = {};
  if (fs.existsSync(CACHE_FILE)) cache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'));

  console.log(`🚀 Starting comparison generation for top ${topBreeds.length} breeds...`);

  for (let i = 0; i < topBreeds.length; i++) {
    for (let j = i + 1; j < topBreeds.length; j++) {
      const b1 = topBreeds[i];
      const b2 = topBreeds[j];
      const pairKey = [b1.slug, b2.slug].sort().join('-vs-');

      if (cache[pairKey]) {
        console.log(`⏩ Skipping ${pairKey} (already in cache)`);
        continue;
      }

      console.log(`Generating: ${pairKey}...`);
      const result = await generator.generateComparisonVerdict(b1, b2);

      if (result.success && result.verdict) {
        cache[pairKey] = result.verdict;
        fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
        console.log(`✅ Success: ${pairKey}`);
      } else {
        console.error(`❌ Failed ${pairKey}: ${result.error}`);
      }
    }
  }

  console.log('✨ Generation complete!');
}

main().catch(console.error);
