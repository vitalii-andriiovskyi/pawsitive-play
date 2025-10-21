import { apiClient } from '@/shared/lib/api-client';
import type { AIHouse, AIHouseCreate, AIHouseUpdate } from '@/front-end/features/ai-house/domain/ai-house.model';

export const getAIHouses = () => apiClient.get<AIHouse[]>('/ai-houses');
export const getAIHouseById = (id: string) => apiClient.get<AIHouse>(`/ai-houses/${id}`);
export const createAIHouse = (data: AIHouseCreate) => apiClient.post<AIHouse, AIHouseCreate>('/ai-houses', data);
export const updateAIHouse = (id: string, data: AIHouseUpdate) => apiClient.put<AIHouse, AIHouseUpdate>(`/ai-houses/${id}`, data);
export const deleteAIHouse = (id: string) => apiClient.delete(`/ai-houses/${id}`);
export const likeAIHouse = (id: string) => apiClient.post<AIHouse, null>(`/ai-houses/${id}/like`, null);
export const unlikeAIHouse = (id: string) => apiClient.post<AIHouse, null>(`/ai-houses/${id}/unlike`, null);
