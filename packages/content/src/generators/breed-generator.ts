/**
 * Breed content generator - generates comprehensive breed information
 */

import { ContentGenerator } from '../generator';
import type { BreedContent, BreedGenerationOptions, GenerationResult } from '../types';

/**
 * Generate complete breed content
 */
export async function generateBreedContent(
  breedName: string,
  apiKey: string,
  options: BreedGenerationOptions = {}
): Promise<GenerationResult> {
  const generator = new ContentGenerator(apiKey);
  return generator.generateBreedContent(breedName, options);
}

/**
 * Generate content for multiple breeds
 */
export async function generateMultipleBreeds(
  breedNames: string[],
  apiKey: string,
  options: BreedGenerationOptions = {},
  onProgress?: (current: number, total: number, breed: string) => void
): Promise<Map<string, GenerationResult>> {
  const results = new Map<string, GenerationResult>();
  const generator = new ContentGenerator(apiKey);

  for (let i = 0; i < breedNames.length; i++) {
    const breedName = breedNames[i];

    if (onProgress) {
      onProgress(i + 1, breedNames.length, breedName);
    }

    const result = await generator.generateBreedContent(breedName, options);
    results.set(breedName, result);

    // Add a small delay between requests to be safe
    if (i < breedNames.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  return results;
}
