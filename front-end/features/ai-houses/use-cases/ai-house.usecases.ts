import useSWR from 'swr';
import { useSession } from "next-auth/react"; // Import useSession

import { fetchAIHouses, fetchAIHouseById, likeAIHouse, unlikeAIHouse } from '@/front-end/features/ai-houses/infrastructure/ai-house.service';
import type { AIHouse } from '@/front-end/features/ai-houses/domain/ai-house.model';
import { getAIHousesSWRKey, getAIHouseSWRKey } from '@/front-end/features/ai-houses/use-cases/ai-house.swr.keys';


export function useAIHouses() {
  const { data, error, mutate, isLoading } = useSWR<AIHouse[]>(getAIHousesSWRKey(), fetchAIHouses);
  const { data: session } = useSession();

  const like = async (id: string) => {
    if (!data) return;
    if (!session?.user) {
      // Handle unauthenticated user (e.g., redirect to login)
      console.warn("User not authenticated. Cannot like pet.");
      return;
    }
    const house = data.find((el) => el._id === id);
    if (house?.ownerId === session.user.id) {
      console.warn("User is the owner of the house. Cannot like.");
      return;
    }

    const updatedHouses = data.map((el) => ({
      ...el,
      likes: el._id === id
        ? [...(new Set([...(el.likes || []), session?.user?.id || '']))]
        : el.likes,
    }));

    const callbackFn = async () => {
      await likeAIHouse(id);
      return updatedHouses;
    }

    mutate(callbackFn, {
      optimisticData: updatedHouses,
      populateCache: true,
      rollbackOnError: true,
      revalidate: false
    });

  };

  const unlike = async (id: string) => {
    if (!data) return;
    if (!session?.user) {
      // Handle unauthenticated user (e.g., redirect to login)
      console.warn("User not authenticated. Cannot like pet.");
      return;
    }
    const house = data.find((el) => el._id === id);
    if (house?.ownerId === session.user.id) {
      console.warn("User is the owner of the house. Cannot like.");
      return;
    }

    const updatedHouses = data.map((el) => ({
      ...el,
      likes: el._id === id ? (el.likes || []).filter((userId) => userId !== session?.user?.id) : el.likes,
    }));

    const callbackFn = async () => {
      await unlikeAIHouse(id);
      return updatedHouses;
    }

    mutate(callbackFn, {
      optimisticData: updatedHouses,
      populateCache: true,
      rollbackOnError: true,
      revalidate: false
    });
  };

  return {
    houses: data,
    error,
    isLoading,
    like,
    unlike,
    refresh: mutate,
  };
}

export function useAIHouse(id: string) {
  const { data, error, mutate, isLoading } = useSWR<AIHouse>(id ? getAIHouseSWRKey(id) : null, () => fetchAIHouseById(id));
  return {
    house: data,
    error,
    isLoading,
    refresh: mutate,
  };
}
