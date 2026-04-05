import { z } from 'zod';

export const LocationCategorySchema = z.enum([
  'petshops',
  'veterinarios',
  'creches',
  'hoteis',
  'parques'
]);

export type LocationCategory = z.infer<typeof LocationCategorySchema>;

export const LocationSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  category: LocationCategorySchema,
  uf: z.string().length(2),
  city: z.string(),
  address: z.string(),
  phone: z.string().optional(),
  description: z.string().optional(),
  images: z.array(z.string()).optional(),
  rating: z.object({
    score: z.number().min(0).max(5),
    count: z.number().int().min(0),
  }).optional(),
  coordinates: z.object({
    lat: z.number(),
    lng: z.number(),
  }).optional(),
  businessHours: z.array(z.object({
    day: z.string(),
    open: z.string(),
    close: z.string(),
  })).optional(),
  googleMapsUrl: z.string().url().optional(),
  website: z.string().url().optional(),
  amenities: z.array(z.string()).optional(),
});

export type Location = z.infer<typeof LocationSchema>;

export interface CityHub {
  uf: string;
  city: string;
  category: LocationCategory;
  editorial: {
    title: string;
    description: string;
  };
}
