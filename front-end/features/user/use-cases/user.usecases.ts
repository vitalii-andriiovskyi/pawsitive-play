'use client'
import useSWR from 'swr';

import { getUser, createUser as serviceCreateUser } from '@/front-end/features/user/infrastructure/user.service';
import { User, UserSignUp } from '@/front-end/features/user/domain/user.model';
import { getUserSWRKey } from '@/front-end/features/user/use-cases/user.swr.keys';

export const useUser = () => {
  const { data, error, isLoading, mutate } = useSWR<User | null>(
    getUserSWRKey(),
    getUser
  );

  const createUser = async (userData: UserSignUp): Promise<User> => {
    try {
      const response = await serviceCreateUser(userData);
      // If user creation is successful and implies a login (which it does in your backend via signIn),
      // revalidate the current user data.
      await mutate();
      return response?.user;
    } catch (err) {
      // Rethrow the error to be handled by the component calling createUser
      throw err;
    }
  };

  return {
    user: data as User | null,
    isLoading,
    isError: !!error,
    mutate,
    createUser,
  };
};