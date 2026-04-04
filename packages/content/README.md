# @tutorcanino/content

Content generation package for TutorCanino using Google Gemini 2.0 API.

## Installation

```bash
npm install
```

## Setup

1. Copy the environment template:
   ```bash
   cp .env.example .env
   ```

2. Add your Gemini API key to `.env`:
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   ```

3. Get your API key from: https://makersuite.google.com/app/apikey

## Usage

### Generate Content for a Single Breed

```bash
npm run generate:breed "Golden Retriever"
```

### Generate Content for All Breeds

```bash
npm run generate:breed
```

## Programmatic Usage

```typescript
import { generateBreedContent } from '@tutorcanino/content';

const result = await generateBreedContent('Golden Retriever', apiKey, {
  locale: 'pt-BR',
  includeFAQ: true,
  includeSources: true,
});

if (result.success) {
  console.log(result.content);
}
```

## Features

- **Comprehensive Content Generation**: Generates detailed breed information including history, temperament, care requirements, health, training, and more
- **Rate Limiting**: Built-in rate limiting to avoid API limits
- **Retry Logic**: Automatic retries with exponential backoff
- **FAQ Generation**: Automatically generates relevant FAQ sections
- **Care Guides**: Detailed care instructions for each breed
- **Multiple Locales**: Support for Portuguese (Brazil) and English

## Content Structure

Generated content includes:

- Description
- History
- Temperament
- Physical Characteristics
- Care Requirements
- Health Information
- Training Guide
- Socialization Needs
- Nutrition Requirements
- Exercise Needs
- Grooming Guide
- Living Conditions
- Compatibility (children, dogs, cats, other pets)
- FAQ Section
- Authoritative Sources

## API Rate Limits

The generator includes built-in rate limiting:
- Default: 10 requests per minute
- Configurable via `RateLimitConfig`

## Development

Build the package:
```bash
npm run build
```

## License

MIT
