/**
 * Types for content generation
 */

export interface BreedContent {
  name: string;
  description: string;
  history: string;
  temperament: string;
  physicalCharacteristics: string;
  careRequirements: string;
  health: string;
  training: string;
  socialization: string;
  nutrition: string;
  exercise: string;
  grooming: string;
  livingConditions: string;
  goodWith: {
    children: boolean;
    dogs: boolean;
    cats: boolean;
    otherPets: boolean;
  };
  faq: FAQItem[];
  sources: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BreedGenerationOptions {
  locale?: 'pt-BR' | 'en';
  includeFAQ?: boolean;
  includeSources?: boolean;
  maxLength?: number;
}

export interface GenerationResult {
  success: boolean;
  content?: BreedContent;
  error?: string;
  tokensUsed?: number;
}

export interface RateLimitConfig {
  maxRequests: number;
  perMilliseconds: number;
}

export interface RetryConfig {
  maxRetries: number;
  baseDelay: number;
  maxDelay: number;
}
