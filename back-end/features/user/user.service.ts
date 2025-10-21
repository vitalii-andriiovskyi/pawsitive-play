/* eslint-disable @typescript-eslint/no-explicit-any */

import { getEmptyAddress } from "@/shared/features/address/domain/address.repository";
import UserRepository from "./user.repository";
import { User, UserSignUpBE } from "@/shared/features/user/domain/user.model";
import CredentialsSchema from "@/shared/features/user/validation-schemas/user.credentials.schema";
import { auth } from "@/auth";
import generateHash from "@/back-end/utils/generateHash";
class UserService {
  static async authViaEmail(email: string, password: string): Promise<User | null> {
    try {
      await CredentialsSchema.validate({ email, password });
    } catch (error) {
      console.log("error", error);
      throw new Error("Wrong credentials")
    }

    const messages: Record<string, string> = {};
    try {
      const user = await UserRepository.getByEmail(email, { withPassword: true });
      if (!user) {
        return null;
      }
      if (user && user.isDeleted === true) {
        throw new Error(messages.errorMsgUserRemoved || "Sorry, it seems this user was deleted, please sign up again")
      }
      if (!user.validPassword(password)) {
        throw new Error(messages.errorMsgPassword || "Wrong password",)
      }
      delete user.password
      return user;
    } catch (error: any) {
      console.log('error', error)
      throw new Error(error.message);
    }
  }

  static async registerViaEmail({
    email,
    password,
    firstName,
    lastName,
    temporaryPassword,
  }: UserSignUpBE) {
    const messages: Record<string, string> = {};
    try {
      const user = await UserRepository.getByEmail(email, { withPassword: true, withIsDeleted: true });
      if (user) {
        if (!user.isDeleted) {
          return {
            code: 409,
            message:
              messages.errorMsgEmailTaken ||
              "Sorry, it seems this email is already taken",
          };
        }
        // to reactivate user with new password
        const userUpdated = await UserRepository.update({
          _id: user._id,
          password: generateHash(password),
          isDeleted: false,
        });
        return {
          code: 200,
          user: userUpdated,
          message: 'User is updated'
        }
      }

      const response: Omit<User, 'password'> & { password?: string } = await UserRepository.create({
        email,
        image: "/img/user.jpg",
        password,
        name: [firstName, lastName].filter(Boolean).join(" "),
        firstName: firstName || "",
        lastName: lastName || "",
        address: getEmptyAddress(),
        temporaryPassword: !!temporaryPassword,
      } as any);
      delete response.password
      return {
        code: 201,
        user: response,
        message: 'User is created'
      };
    } catch (error: any) {
      console.log(error);
      throw new Error('Something went wrong');
    }
  }

  static async getSessionUser() {
    let user: User | null = null;
    try {
      const session = await auth();
      const sessionEmail: string | null | undefined = session?.user?.email;
      if (!sessionEmail) {
        return null
      }
      user = await UserRepository.getByEmail(sessionEmail as string)?.lean() as unknown as User
      if (user) {
        user._id = user._id?.toString();
      }
      if (user?.address) {
        user.address._id = user.address._id?.toString();
      }
    } catch (error) {
      console.log("no active session error", error);
    }
    return user
  }

}

export default UserService;