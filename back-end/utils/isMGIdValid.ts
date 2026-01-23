import { Types } from "mongoose";

const isMGIdValid = (id: string): boolean => {
  return Types.ObjectId.isValid(id)
};

export default isMGIdValid;