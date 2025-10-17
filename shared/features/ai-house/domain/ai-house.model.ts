/* eslint-disable @typescript-eslint/no-explicit-any */

import { Image } from "../../image/domain/image.model";

export interface AIHouse {
  _id: string;
  name: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: number;
    country: string;
    apt?: string;
  };
  ownerId: string;
  rooms: number;
  area: number;
  price: number;
  available: boolean;
  features?: string[];
  images: Image[];
  builtYear: Date;
  lastRenovation?: Date;
  rating: number;
  metadata?: any;
  createdAt: Date;
  updatedAt: Date;
  likes?: string[];
}

export type KeysFromAIHouse<Fields extends keyof AIHouse, Extra = object> =
  Pick<AIHouse, Fields> & Extra;

export type AIHouseBasic = Pick<AIHouse, '_id' | 'name' | 'address' | 'price' | 'rooms' | 'area' | 'images' | 'rating' | 'available'>;

export type AIHouseCreate = Omit<AIHouse, '_id' | 'createdAt' | 'updatedAt' | 'rating' | 'likes'> & { ownerId: string };
export type AIHouseUpdate = Omit<AIHouse, 'createdAt' | 'updatedAt' | 'rating' | 'likes'> & { ownerId: string };

export type CreateAIHouseResponse = {
  success: boolean;
  data: AIHouse;
  message: string;
}