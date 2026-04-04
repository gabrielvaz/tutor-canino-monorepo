/**
 * FAQ generator - generates frequently asked questions for breeds
 */

import { ContentGenerator } from '../generator';
import type { FAQItem, GenerationResult } from '../types';

export interface FAQOptions {
  count?: number;
  topics?: string[];
  locale?: 'pt-BR' | 'en';
}

/**
 * Generate FAQ section for a breed
 */
export async function generateFAQSection(
  breedName: string,
  apiKey: string,
  options: FAQOptions = {}
): Promise<{ success: boolean; faq?: FAQItem[]; error?: string }> {
  const generator = new ContentGenerator(apiKey);
  const genAI = generator['genAI'];
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

  const count = options.count || 6;
  const topics = options.topics || [
    'suitability for first-time owners',
    'exercise needs',
    'health concerns',
    'compatibility with children and other pets',
    'grooming requirements',
    'barking tendencies',
    'apartment living',
    'training difficulty'
  ];
  const locale = options.locale || 'pt-BR';

  const language = locale === 'pt-BR' ? 'Portuguese (Brazil)' : 'English';

  const prompt = `
Generate ${count} frequently asked questions and detailed answers about the ${breedName} dog breed in ${language}.

Topics to cover: ${topics.slice(0, count).join(', ')}

Requirements:
- Questions should be specific to the ${breedName} breed
- Answers should be detailed, informative, and practical
- Include specific information about the breed's characteristics
- Answers should be 2-4 sentences each
- Make questions sound like they come from potential dog owners

Return the response as a JSON array:
[
  {
    "question": "...",
    "answer": "..."
  }
]

Return ONLY the JSON array, no preamble.
`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Extract JSON from response
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error('No JSON found in response');
    }

    const faq = JSON.parse(jsonMatch[0]) as FAQItem[];

    return {
      success: true,
      faq,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
