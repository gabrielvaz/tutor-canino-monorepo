/**
 * Main content generator class with rate limiting and retry logic
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import type { BreedContent, BreedGenerationOptions, GenerationResult, RateLimitConfig, RetryConfig } from './types';

export class ContentGenerator {
  private genAI: GoogleGenerativeAI;
  private model: any;
  private requestQueue: Array<() => Promise<any>> = [];
  private isProcessing: boolean = false;
  private requestCount: number = 0;
  private requestTimestamps: number[] = [];

  constructor(
    apiKey: string,
    private rateLimitConfig: RateLimitConfig = { maxRequests: 10, perMilliseconds: 60000 },
    private retryConfig: RetryConfig = { maxRetries: 3, baseDelay: 1000, maxDelay: 10000 }
  ) {
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
  }

  /**
   * Generate complete breed content
   */
  async generateBreedContent(
    breedName: string,
    options: BreedGenerationOptions = {}
  ): Promise<GenerationResult> {
    try {
      await this.waitForRateLimit();

      const prompt = this.buildPrompt(breedName, options);
      const result = await this.executeWithRetry(() => this.model.generateContent(prompt)) as {
        response?: {
          text(): string;
          usageMetadata?: {
            totalTokenCount?: number;
          };
        };
      };

      if (!result.response) {
        return { success: false, error: 'No response from API' };
      }

      const text = result.response.text();
      const content = this.parseContent(text, breedName);

      return {
        success: true,
        content,
        tokensUsed: result.response.usageMetadata?.totalTokenCount,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  /**
   * Build prompt for breed content generation
   */
  private buildPrompt(breedName: string, options: BreedGenerationOptions): string {
    const locale = options.locale || 'pt-BR';
    const language = locale === 'pt-BR' ? 'Português do Brasil' : 'English';

    return `
You are an expert canine content writer specializing in dog breeds. Generate comprehensive, accurate, and engaging content about the ${breedName} breed in ${language}.

Please create detailed content covering the following aspects:

1. **Description**: A compelling overview of the breed's personality and characteristics
2. **History**: Origin and historical development of the breed
3. **Temperament**: Detailed personality traits, behavioral patterns, and typical behaviors
4. **Physical Characteristics**: Size, coat, colors, and distinctive features
5. **Care Requirements**: Daily care needs, maintenance, and attention required
6. **Health**: Common health issues, lifespan, and veterinary care considerations
7. **Training**: Trainability, learning style, and best training methods
8. **Socialization**: Social needs and compatibility with other animals
9. **Nutrition**: Dietary requirements, feeding schedules, and nutritional needs
10. **Exercise**: Activity requirements, exercise types, and intensity levels
11. **Grooming**: Coat care, bathing, and maintenance routines
12. **Living Conditions**: Suitable living environments and space requirements
13. **Compatibility**:
   - Good with children: (true/false with explanation)
   - Good with dogs: (true/false with explanation)
   - Good with cats: (true/false with explanation)
   - Good with other pets: (true/false with explanation)

${options.includeFAQ !== false ? `
14. **FAQ Section**: Generate 5-8 frequently asked questions with detailed answers about the breed, covering topics like:
   - Is this breed good for first-time owners?
   - How much exercise does it need?
   - What are common health problems?
   - Is it good with children/other pets?
   - Grooming requirements
   - Barking tendencies
   - Adaptability to apartments
   - Cost of ownership
` : ''}

${options.includeSources !== false ? `
15. **Sources**: List 3-5 authoritative sources for further reading ( kennel clubs, veterinary associations, breed clubs)
` : ''}

Format the response as structured JSON following this exact schema:
{
  "name": "${breedName}",
  "description": "...",
  "history": "...",
  "temperament": "...",
  "physicalCharacteristics": "...",
  "careRequirements": "...",
  "health": "...",
  "training": "...",
  "socialization": "...",
  "nutrition": "...",
  "exercise": "...",
  "grooming": "...",
  "livingConditions": "...",
  "goodWith": {
    "children": true/false,
    "dogs": true/false,
    "cats": true/false,
    "otherPets": true/false
  },
  "faq": [
    {
      "question": "...",
      "answer": "..."
    }
  ],
  "sources": ["..."]
}

Important guidelines:
- Write in an informative yet engaging tone
- Include specific details and numbers when available (height, weight, lifespan)
- Mention both positive aspects and considerations for potential owners
- Ensure all information is accurate and up-to-date
- Keep paragraphs concise and well-structured
- Use markdown formatting for readability within JSON strings
- Make sure the JSON is valid and properly escaped

${locale === 'pt-BR' ? 'Escreva todo o conteúdo em português do Brasil.' : ''}

Begin your response directly with the JSON object, no preamble.
`;
  }

  /**
   * Parse and validate the generated content
   */
  private parseContent(text: string, breedName: string): BreedContent {
    try {
      // Try to extract JSON from the response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }

      const content = JSON.parse(jsonMatch[0]);

      // Validate required fields
      if (!content.name) content.name = breedName;

      // Ensure goodWith is properly structured
      if (!content.goodWith) {
        content.goodWith = {
          children: true,
          dogs: true,
          cats: true,
          otherPets: true
        };
      }

      // Ensure FAQ array exists
      if (!content.faq || !Array.isArray(content.faq)) {
        content.faq = [];
      }

      // Ensure sources array exists
      if (!content.sources || !Array.isArray(content.sources)) {
        content.sources = [];
      }

      return content as BreedContent;
    } catch (error) {
      // If parsing fails, return a basic structure
      return {
        name: breedName,
        description: text.substring(0, 500),
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
      };
    }
  }

  /**
   * Execute request with retry logic
   */
  private async executeWithRetry<T>(fn: () => Promise<T>): Promise<T> {
    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= this.retryConfig.maxRetries; attempt++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error instanceof Error ? error : new Error('Unknown error');

        if (attempt < this.retryConfig.maxRetries) {
          const delay = Math.min(
            this.retryConfig.baseDelay * Math.pow(2, attempt),
            this.retryConfig.maxDelay
          );
          await this.sleep(delay);
        }
      }
    }

    throw lastError;
  }

  /**
   * Wait for rate limit availability
   */
  private async waitForRateLimit(): Promise<void> {
    const now = Date.now();

    // Remove old timestamps outside the rate limit window
    this.requestTimestamps = this.requestTimestamps.filter(
      timestamp => now - timestamp < this.rateLimitConfig.perMilliseconds
    );

    // If we've hit the limit, wait
    if (this.requestTimestamps.length >= this.rateLimitConfig.maxRequests) {
      const oldestTimestamp = this.requestTimestamps[0];
      const waitTime = this.rateLimitConfig.perMilliseconds - (now - oldestTimestamp);

      if (waitTime > 0) {
        await this.sleep(waitTime);
      }
    }

    // Add current request timestamp
    this.requestTimestamps.push(Date.now());
  }

  /**
   * Sleep utility
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
