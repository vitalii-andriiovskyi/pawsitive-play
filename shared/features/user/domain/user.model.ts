import { Address } from "@/shared/features/address/domain/address.model";
import { Image } from "@/shared/features/image/domain/image.model";

export interface User {
  _id: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  description?: string;
  image?: Image;
  verificationToken?: string;
  isDeleted?: boolean;
  isAdmin?: boolean;
  isRecovered?: boolean;
  temporaryPassword?: boolean;
  recovery?: string;
  address?: Address;
  emailVerified: Date;
  createdAt: Date;
  updatedAt: Date;
  blockBefore?: number;
  attempts?: { time: number }[];
}

export type FormInputFromUser<Fields extends keyof User, Extra = object> =
  Pick<User, Fields> & Extra;

export type UserSignUp = FormInputFromUser<'firstName' | 'lastName' | 'email' | 'password',
  { repeatPassword: string }>

export type UserSignUpBE = FormInputFromUser<'firstName' | 'lastName' | 'email' | 'password',
  { temporaryPassword?: boolean }>

export type Credentials = FormInputFromUser<'email' | 'password'>

export type UserShort = Pick<User, '_id' | 'firstName' | 'lastName' | 'email' | 'name' | 'image' | 'address'>

export type CreateUserResponse = {
  success: boolean;
  user: UserShort;
  message: string;
}





