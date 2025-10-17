import { apiClient } from '@/shared/lib/api-client';
import { User, UserSignUp } from '@/front-end/features/user/domain/user.model';
import { CreateUserResponse } from '@/front-end/features/user/infrastructure/user.dto';

export const fetchUser = async (): Promise<User | null> => {
  const response = await apiClient.get<User | null>(`/user`);
  return response;
};

export const createUser = async (data: UserSignUp): Promise<CreateUserResponse> => {
  const response = await apiClient.post<CreateUserResponse, UserSignUp>(`/user`, data);
  return response;
};
