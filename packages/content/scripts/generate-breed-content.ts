/**
 * Script to generate breed content using Google Gemini 2.0
 * Usage: npx tsx scripts/generate-breed-content.ts <breed-name>
 */

import { generateBreedContent } from '../src/generators/breed-generator';
import { readFile, writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

interface BreedData {
  name: string;
  content?: any;
  lastGenerated?: string;
}

async function loadBreedList(): Promise<string[]> {
  try {
    // Try to load from data package
    const dataPath = join(process.cwd(), '../data/src/data/breeds.json');
    const data = await readFile(dataPath, 'utf-8');
    const breeds = JSON.parse(data);

    if (Array.isArray(breeds)) {
      return breeds;
    }

    if (breeds.breeds && Array.isArray(breeds.breeds)) {
      return breeds.breeds.map((b: any) => b.name || b);
    }

    return [];
  } catch (error) {
    console.warn('Could not load breed list, using empty array');
    return [];
  }
}

async function saveBreedContent(breedName: string, content: any): Promise<void> {
  const outputDir = join(process.cwd(), '../data/src/data/breeds');
  await mkdir(outputDir, { recursive: true });

  // Sanitize filename
  const filename = breedName
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-');

  const filepath = join(outputDir, `${filename}.json`);

  const data: BreedData = {
    name: breedName,
    content,
    lastGenerated: new Date().toISOString(),
  };

  await writeFile(filepath, JSON.stringify(data, null, 2));
  console.log(`✅ Saved content for ${breedName} to ${filepath}`);
}

async function generateSingleBreed(breedName: string, apiKey: string): Promise<void> {
  console.log(`\n🐕 Generating content for: ${breedName}`);
  console.log('─'.repeat(50));

  const result = await generateBreedContent(breedName, apiKey, {
    locale: 'pt-BR',
    includeFAQ: true,
    includeSources: true,
  });

  if (result.success && result.content) {
    console.log('✅ Content generated successfully');
    console.log(`   Tokens used: ${result.tokensUsed || 'unknown'}`);
    console.log(`   Description length: ${result.content.description?.length || 0} chars`);
    console.log(`   FAQ items: ${result.content.faq?.length || 0}`);
    console.log(`   Sources: ${result.content.sources?.length || 0}`);

    await saveBreedContent(breedName, result.content);
  } else {
    console.error(`❌ Failed to generate content for ${breedName}`);
    console.error(`   Error: ${result.error}`);
  }
}

async function generateAllBreeds(apiKey: string): Promise<void> {
  const breeds = await loadBreedList();

  if (breeds.length === 0) {
    console.log('⚠️  No breeds found in the breed list');
    console.log('   To generate content for a specific breed, run:');
    console.log('   npm run generate:breed <breed-name>');
    return;
  }

  console.log(`📋 Found ${breeds.length} breeds to generate content for`);
  console.log('⚠️  This will take a while due to rate limiting...\n');

  let successCount = 0;
  let failureCount = 0;

  for (let i = 0; i < breeds.length; i++) {
    const breedName = breeds[i];
    console.log(`\n[${i + 1}/${breeds.length}] 🐕 ${breedName}`);
    console.log('─'.repeat(50));

    const result = await generateBreedContent(breedName, apiKey, {
      locale: 'pt-BR',
      includeFAQ: true,
      includeSources: true,
    });

    if (result.success && result.content) {
      console.log(`✅ Success (${result.tokensUsed || '?'} tokens)`);
      await saveBreedContent(breedName, result.content);
      successCount++;
    } else {
      console.error(`❌ Failed: ${result.error}`);
      failureCount++;
    }

    // Add delay between requests to respect rate limits
    if (i < breeds.length - 1) {
      const delay = 2000; // 2 seconds between requests
      console.log(`⏳ Waiting ${delay}ms before next request...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log('📊 Generation Summary');
  console.log('='.repeat(50));
  console.log(`✅ Successful: ${successCount}`);
  console.log(`❌ Failed: ${failureCount}`);
  console.log(`📈 Total: ${breeds.length}`);
}

async function main() {
  // Load API key from environment
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.error('❌ Error: GEMINI_API_KEY environment variable is not set');
    console.log('\nTo set up your API key:');
    console.log('1. Copy .env.example to .env');
    console.log('2. Add your Gemini API key to the .env file');
    console.log('\nGet your API key at: https://makersuite.google.com/app/apikey');
    process.exit(1);
  }

  // Get breed name from command line or generate all
  const breedName = process.argv[2];

  if (breedName) {
    // Generate content for a specific breed
    await generateSingleBreed(breedName, apiKey);
  } else {
    // Generate content for all breeds
    await generateAllBreeds(apiKey);
  }
}

main().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
