/**
 * Care guide generator - generates comprehensive care instructions
 */

import { ContentGenerator } from '../generator';
import type { GenerationResult } from '../types';

export interface CareGuideOptions {
  detailLevel?: 'basic' | 'comprehensive' | 'expert';
  sections?: string[];
  locale?: 'pt-BR' | 'en';
}

export interface CareGuide {
  dailyCare: string;
  nutrition: string;
  exercise: string;
  grooming: string;
  health: string;
  training: string;
  socialization: string;
  environment: string;
}

/**
 * Generate comprehensive care guide for a breed
 */
export async function generateCareGuide(
  breedName: string,
  apiKey: string,
  options: CareGuideOptions = {}
): Promise<{ success: boolean; guide?: CareGuide; error?: string }> {
  const generator = new ContentGenerator(apiKey);
  const genAI = generator['genAI'];
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

  const detailLevel = options.detailLevel || 'comprehensive';
  const sections = options.sections || [
    'dailyCare',
    'nutrition',
    'exercise',
    'grooming',
    'health',
    'training',
    'socialization',
    'environment'
  ];
  const locale = options.locale || 'pt-BR';

  const language = locale === 'pt-BR' ? 'Portuguese (Brazil)' : 'English';

  const prompt = `
Generate a ${detailLevel} care guide for the ${breedName} dog breed in ${language}.

Include detailed information for these sections: ${sections.join(', ')}

For each section, provide:
- Specific recommendations for the ${breedName} breed
- Practical, actionable advice
- Frequency and duration where applicable
- Special considerations for this breed
- Tips for new owners

Return the response as JSON:
{
  "dailyCare": "General daily routine and care requirements...",
  "nutrition": "Dietary needs, feeding schedule, recommended foods...",
  "exercise": "Activity requirements, exercise types, duration...",
  "grooming": "Coat care, bathing frequency, tools needed...",
  "health": "Common health issues, vet care schedule, preventive care...",
  "training": "Training approach, difficulty level, recommended methods...",
  "socialization": "Social needs, how to socialize, what to expose them to...",
  "environment": "Living conditions, space requirements, climate considerations..."
}

Make each section detailed and informative. Use markdown formatting for readability within the JSON strings.
Return ONLY the JSON object, no preamble.
`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON found in response');
    }

    const guide = JSON.parse(jsonMatch[0]) as CareGuide;

    return {
      success: true,
      guide,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
