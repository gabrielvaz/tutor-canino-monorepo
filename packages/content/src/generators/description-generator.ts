/**
 * Breed description generator - generates engaging breed descriptions
 */

import { ContentGenerator } from '../generator';
import type { GenerationResult } from '../types';

export interface DescriptionOptions {
  length?: 'short' | 'medium' | 'long';
  tone?: 'formal' | 'casual' | 'enthusiastic';
  focus?: string[];
}

/**
 * Generate a compelling breed description
 */
export async function generateBreedDescription(
  breedName: string,
  apiKey: string,
  options: DescriptionOptions = {}
): Promise<GenerationResult> {
  const generator = new ContentGenerator(apiKey);
  const genAI = generator['genAI'];
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

  const length = options.length || 'medium';
  const tone = options.tone || 'enthusiastic';
  const focus = options.focus || ['personality', 'appearance', 'purpose'];

  const prompt = `
Generate a ${length}, ${tone} description for the ${breedName} dog breed in Portuguese (Brazil).

Focus on: ${focus.join(', ')}

The description should be:
- Engaging and informative
- Highlight the breed's unique characteristics
- Appeal to potential dog owners
- Between 2-4 sentences for short, 4-6 for medium, or 8-12 for long

Format: Return ONLY the description text, no preamble or explanation.
`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return {
      success: true,
      content: {
        name: breedName,
        description: text.trim(),
        // Empty fields for compatibility
        history: '',
        temperament: '',
        physicalCharacteristics: '',
        careRequirements: '',
        health: '',
        training: '',
        socialization: '',
        nutrition: '',
        exercise: '',
        grooming: '',
        livingConditions: '',
        goodWith: {
          children: true,
          dogs: true,
          cats: true,
          otherPets: true
        },
        faq: [],
        sources: []
      },
      tokensUsed: result.response.usageMetadata?.totalTokenCount,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
