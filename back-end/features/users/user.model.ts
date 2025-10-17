/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint new-cap: off */

import { model, models, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import dbConnect from "@/back-end/lib/dbConnect";
import { Address } from "@/shared/features/address/domain/address.model";
import { User } from "@/shared/features/user/domain/user.model";

const AddressSchema = new Schema<Address>({
  address1: String,
  address2: String,
  city: String,
  state: String,
  zip: String,
  country: String,
  apt: String,
}, {
  timestamps: true
});

const userSchema = new Schema<User>(
  {
    address: AddressSchema,
    name: String,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    phone: String,
    description: String,
    image: String,
    emailVerified: Date,
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isRecovered: {
      type: Boolean,
      default: false,
    },
    temporaryPassword: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.statics.generateHash = function (password: string) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

userSchema.methods.validPassword = function (password: string) {
  if (!this.password || !password) {
    return false;
  }

  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.toJSON = function () {
  const obj = this.toObject(); //or var obj = this;
  delete obj.password;
  return obj;
};

userSchema.pre("save", function (next) {
  if (this.email) {
    this.email = this.email.toLowerCase();
  }
  if (this.password && this.isModified("password")) {
    this.password = (this.constructor as any).generateHash(this.password);
  }
  next();
});


// not using this automatic password hashing on update because if any update of a user has password field - it will be hashed
// this is not good if we want to update only other fields. 
// Image a hacker updates a name and adds own password to the request - it will be hashed and the hacker will be able to login
// unless the logic has the fields validation before update
// I hash password only in one place

// userSchema.pre("findOneAndUpdate", function (next) {
//   const update: any = this.getUpdate();

//   const { email, password } = update["$set"] || {};
//   if (email) {
//     this.set({ email: email.toLowerCase() });
//   }
//   if (password) {
//     this.set({ password: (this.model as any).generateHash(password) });
//   }
//   next();
// });
const fn = async () => {
  await dbConnect();
  return models.users || model("users", userSchema);
};

export default await fn();
