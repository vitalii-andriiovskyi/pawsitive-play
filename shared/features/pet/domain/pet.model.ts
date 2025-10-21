import { Image } from "@/shared/features/image/domain/image.model";
import { SEO } from "@/shared/features/seo/domain/seo.model";

export interface Pet {
  _id: string;
  species: string;
  breed: string;
  videos: string[];
  images: Image[];
  url: string;
  name: string;
  content: string;
  previewImage: Image;
  abilities: string[];  // "Catch", "Pull Wagon", "Purring", etc.
  age: number;
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