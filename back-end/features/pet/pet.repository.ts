import { Document, Types } from "mongoose";
import Model from "@/back-end/features/pet/pet.model";
import { Pet } from "@/shared/features/pet/domain/pet.model";

// Type for Mongoose Document
export type PetDocument = Pet & Document;

class PetRepository {
  static async create(data: Pet): Promise<PetDocument> {
    const pet = new Model(data);
    return pet.save() as Promise<PetDocument>;
  }

  static async getById(id: string, select = ""): Promise<PetDocument | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    return Model.findById(id).select(select).lean() as Promise<PetDocument | null>;
  }

  static async getByUrl(url: string): Promise<PetDocument | null> {
    return Model.findOne({ url }).lean() as Promise<PetDocument | null>;
  }

  static async getManyBySpecies(species: string): Promise<Pet[]> {
    return Model.find({ species }).lean<Pet[]>();
  }

  static async getManyByBreed(breed: string): Promise<Pet[]> {
    return Model.find({ breed }).lean<Pet[]>();
  }

  static async getAll(): Promise<Pet[]> {
    return Model.find().lean<Pet[]>();
  }

  static async updateOne(id: string, data: Partial<Pet>): Promise<PetDocument | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    return Model.findByIdAndUpdate(id, { $set: data }, { new: true }).lean() as Promise<PetDocument | null>;
  }

  static async updateMany(ids: string[], data: Partial<Pet>) {
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

export default PetRepository;
