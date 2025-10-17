import bcrypt from "bcryptjs";

const generateHash = (password: string, saltRounds = 8): string => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(saltRounds));
};

export default generateHash;