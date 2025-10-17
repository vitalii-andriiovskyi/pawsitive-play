import { FormInputFromUser, UserShort } from '@/shared/features/user/domain/user.model'
export type User = UserShort

export type UserSignUp = FormInputFromUser<'firstName' | 'lastName' | 'email' | 'password',
  { repeatPassword: string }>