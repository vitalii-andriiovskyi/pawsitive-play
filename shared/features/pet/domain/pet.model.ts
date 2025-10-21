import { Image } from "@/shared/features/image/domain/image.model";
import { SEO } from "@/shared/features/seo/domain/seo.model";

export interface Pet {
  _id: string;
  species: string; // dog, cat, rabbit, etc.
  breed: string; // Labrador, Siamese, etc.
  videos: string[];
  images: Image[];
  url: string; // Unique URL slug for the pet profile
  name: string; // Name of the pet
  content: string; // Description or story about the pet
  previewImage: Image; // Main image for previews
  abilities: string[];  // "Catch", "Pull Wagon", "Purring", etc.
  age: number; // Age in years
  createdAt: string;
  updatedAt: string;
  seo: SEO;
}

export type PetBasic = Pick<Pet, '_id' | 'name' | 'species' | 'breed' | 'age' | 'previewImage' | 'images' | 'abilities'>;

export type PetCreate = Omit<Pet, '_id' | 'createdAt' | 'updatedAt' | 'likes'>;
export type PetUpdate = Omit<Pet, 'createdAt' | 'updatedAt' | 'likes'>;

export type CreatePetResponse = {
  success: boolean;
  data: Pet;
  message: string;
}