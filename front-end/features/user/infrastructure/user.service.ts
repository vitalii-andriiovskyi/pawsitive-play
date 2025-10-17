import {
  fetchUser,
  createUser as apiCreateUser,
} from '@/front-end/features/user/infrastructure/user.api';
import { User, UserSignUp } from '@/front-end/features/user/domain/user.model';
import { CreateUserResponse } from '@/front-end/features/user/infrastructure/user.dto';

export const getUser = async (): Promise<User | null> => {
  // You can add transformation logic here if needed
  return fetchUser();
};

export const createUser = async (data: UserSignUp): Promise<CreateUserResponse> => {
  // Transformation logic for request or response can be added here if needed.
  return apiCreateUser(data);
};
