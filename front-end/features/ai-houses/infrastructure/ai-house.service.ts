import * as api from '@/front-end/features/ai-houses/infrastructure/ai-house.api';
import type { AIHouse, AIHouseCreate, AIHouseUpdate } from '@/front-end/features/ai-houses/domain/ai-house.model';

export const fetchAIHouses = async (): Promise<AIHouse[]> => {
  return api.getAIHouses();
};
export const fetchAIHouseById = async (id: string): Promise<AIHouse> => {
  return api.getAIHouseById(id);
};

export const createAIHouse = async (data: AIHouseCreate): Promise<AIHouse> => {
  return api.createAIHouse(data);
};

export const updateAIHouse = async (id: string, data: AIHouseUpdate): Promise<AIHouse> => {
  return api.updateAIHouse(id, data);
};

export const deleteAIHouse = async (id: string): Promise<void> => {
  return api.deleteAIHouse(id);
};

export const likeAIHouse = async (id: string): Promise<AIHouse> => {
  return api.likeAIHouse(id);
};

export const unlikeAIHouse = async (id: string): Promise<AIHouse> => {
  return api.unlikeAIHouse(id);
};
