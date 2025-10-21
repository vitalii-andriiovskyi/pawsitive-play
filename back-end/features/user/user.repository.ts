/* eslint-disable @typescript-eslint/no-explicit-any */
import Model from "./user.model";

import { User } from "@/shared/features/user/domain/user.model";


class UserRepository {
  /**
   * @param {User} params - input user data
   * @returns {Promise<User>} - user info
   */
  static create(params: User): Promise<User> {
    const user = new Model(params);
    return user.save();
  }

  static getByEmail(email: string, { withPassword = false, withIsDeleted = false }: { withPassword?: boolean, withIsDeleted?: boolean } = {}) {
    if (!email) {
      return null
    }
    let select = '_id firstName lastName email name image address'
    if (withPassword) {
      select = `${select} password`
    }
    if (withIsDeleted) {
      select = `${select} isDeleted`
    }
    return Model.findOne({ email: email.toLowerCase() }).select(select);
  }


  static getById(_id: string) {
    return Model.findById(_id)
      .select(
        "_id address email name firstName lastName"
      )
      .exec();
  }

  static async update(params: Partial<User> & { _id: string }): Promise<Omit<User, 'password'> & { password?: string } | null> {
    if (params?.email) {
      params.email = params?.email.toLowerCase();
    }
    const user = await Model.findOneAndUpdate(
      {
        _id: params._id,
      },
      {
        $set: params,
      },
      { new: true }
    );
    delete user.password
    return user;
  }

  static remove(params: Partial<User> & { _id: string }) {
    return Model.deleteOne(params);
  }

  static async disable(params: { _id: string }) {
    await Model.updateOne(
      {
        _id: params._id,
      },
      {
        $set: {
          isDeleted: true,
        },
      }
    );
    return "Sorry, it seems this user was deleted, please sign up again";
  }

}

export default UserRepository;
