import { Document, Types } from "mongoose";
import Model from "@/back-end/features/ai-house/ai-house.model";
import { AIHouse } from "@/shared/features/ai-house/domain/ai-house.model";

// Type for Mongoose Document
export type AIHouseDocument = AIHouse & Document;

class AIHouseRepository {
  static async create(data: AIHouse): Promise<AIHouseDocument> {
    const house = new Model(data);
    return house.save() as Promise<AIHouseDocument>;
  }

  static async getById(id: string, select = ""): Promise<AIHouseDocument | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    return Model.findById(id).select(select).lean() as Promise<AIHouseDocument | null>;
  }

  static async getByUrl(url: string): Promise<AIHouseDocument | null> {
    return Model.findOne({ url }).lean() as Promise<AIHouseDocument | null>;
  }

  static async getManyByOwnerId(ownerId: string): Promise<AIHouse[]> {
    return Model.find({ ownerId }).lean<AIHouse[]>();
  }

  static async getManyByCity(city: string): Promise<AIHouse[]> {
    return Model.find({ "address.city": city }).lean<AIHouse[]>();
  }

  static async getAll(): Promise<AIHouse[]> {
    return Model.find().lean<AIHouse[]>();
  }

  static async updateOne(id: string, data: Partial<AIHouse>): Promise<AIHouseDocument | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    return Model.findByIdAndUpdate(id, { $set: data }, { new: true }).lean() as Promise<AIHouseDocument | null>;
  }

  static async updateMany(ids: string[], data: Partial<AIHouse>) {
    return Model.updateMany({ _id: { $in: ids } }, { $set: data }, { new: true }).lean();
  }

  static async delete(id: string) {
    if (!Types.ObjectId.isValid(id)) return null;
    return Model.findByIdAndDelete(id).lean();
  }

  static async deleteMany(ids: string[]) {
    return Model.deleteMany({ _id: { $in: ids } }).lean();
  }
}

export default AIHouseRepository;
