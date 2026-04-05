/**
 * Comparison content generator class
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import type { ComparisonVerdict, ComparisonGenerationOptions, GenerationResult, RateLimitConfig, RetryConfig } from '../types';

export class ComparisonGenerator {
  private genAI: GoogleGenerativeAI;
  private model: any;
  private requestTimestamps: number[] = [];

  constructor(
    apiKey: string,
    private rateLimitConfig: RateLimitConfig = { maxRequests: 5, perMilliseconds: 60000 },
    private retryConfig: RetryConfig = { maxRetries: 3, baseDelay: 1000, maxDelay: 10000 }
  ) {
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
  }

  /**
   * Generate comparison verdict between two breeds
   */
  async generateComparisonVerdict(
    breed1: any,
    breed2: any,
    options: ComparisonGenerationOptions = {}
  ): Promise<GenerationResult> {
    try {
      await this.waitForRateLimit();

      const prompt = this.buildComparisonPrompt(breed1, breed2, options);
      const result = await this.executeWithRetry(() => this.model.generateContent(prompt)) as any;

      if (!result.response) {
        return { success: false, error: 'No response from API' };
      }

      const text = result.response.text();
      const verdict = this.parseVerdict(text, breed1.nome, breed2.nome);

      return {
        success: true,
        verdict,
        tokensUsed: result.response.usageMetadata?.totalTokenCount,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  private buildComparisonPrompt(breed1: any, breed2: any, options: ComparisonGenerationOptions): string {
    const locale = options.locale || 'pt-BR';
    const language = locale === 'pt-BR' ? 'Português do Brasil' : 'English';

    return `
You are an expert canine behaviorist. Compare the following two dog breeds: ${breed1.nome} and ${breed2.nome} in ${language}.

Data for ${breed1.nome}:
${JSON.stringify(breed1, null, 2)}

Data for ${breed2.nome}:
${JSON.stringify(breed2, null, 2)}

Generate a unique comparison verdict including:
1. **Summary**: A high-level overview of which breed fits which lifestyle.
2. **Temperament Comparison**: How their personalities differ.
3. **Maintenance Comparison**: Grooming, health, and exercise needs differences.
4. **Suitability**: Final recommendation.
5. **Winner Badges**: Assign which one is better for: Apartment, Family, Active Owner, First-time Owner.

Format the response as structured JSON:
{
  "breed1": "${breed1.nome}",
  "breed2": "${breed2.nome}",
  "summary": "...",
  "comparisons": {
    "temperament": "...",
    "maintenance": "...",
    "suitability": "..."
  },
  "winnerBadges": {
    "apartment": "Name of breed or 'Both' or 'Neither'",
    "family": "...",
    "activeOwner": "...",
    "firstTimeOwner": "..."
  }
}

Important: Use only the provided data. Be concise and helpful. Return ONLY valid JSON.
`;
  }

  private parseVerdict(text: string, name1: string, name2: string): ComparisonVerdict {
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error('No JSON found');
      return JSON.parse(jsonMatch[0]);
    } catch (error) {
      return {
        breed1: name1,
        breed2: name2,
        summary: "Detailed comparison unavailable.",
        comparisons: { temperament: "-", maintenance: "-", suitability: "-" },
        winnerBadges: {}
      };
    }
  }

  private async executeWithRetry<T>(fn: () => Promise<T>): Promise<T> {
    let lastError: Error | null = null;
    for (let attempt = 0; attempt <= this.retryConfig.maxRetries; attempt++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error instanceof Error ? error : new Error('Unknown error');
        if (attempt < this.retryConfig.maxRetries) {
          const delay = Math.min(this.retryConfig.baseDelay * Math.pow(2, attempt), this.retryConfig.maxDelay);
          await new Promise(r => setTimeout(resolve => r(resolve), delay));
        }
      }
    }
    throw lastError;
  }

  private async waitForRateLimit(): Promise<void> {
    const now = Date.now();
    this.requestTimestamps = this.requestTimestamps.filter(t => now - t < this.rateLimitConfig.perMilliseconds);
    if (this.requestTimestamps.length >= this.rateLimitConfig.maxRequests) {
      const waitTime = this.rateLimitConfig.perMilliseconds - (now - this.requestTimestamps[0]);
      if (waitTime > 0) await new Promise(r => setTimeout(resolve => r(resolve), waitTime));
    }
    this.requestTimestamps.push(Date.now());
  }
}
