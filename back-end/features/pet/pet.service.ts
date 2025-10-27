import { Pet } from "@/shared/features/pet/domain/pet.model";
import PetRepository from "@/back-end/features/pet/pet.repository";
import UserService from "@/back-end/features/user/user.service";
import CustomError from "@/shared/features/error/domain/custom-error";
import convertObjectIds from "@/back-end/utils/convertObjectIds";

class PetService {
  static async getAll(): Promise<Pet[]> {
    const pets = await PetRepository.getAll();
    return convertObjectIds(pets);
  }

  static async getById(id: string): Promise<Pet | null> {
    const pet = await PetRepository.getById(id);
    if (!pet) {
      return null;
    }
    return convertObjectIds(pet);
  }

  static async createPet(data: Partial<Pet>): Promise<Pet> {
    const user = await UserService.getSessionUser();
    if (!user) {
      throw new CustomError("Please, sign in", { code: 401 });
    }
    if (!user.isAdmin) {
      throw new CustomError("You are not authorized to perform this action", { code: 403 });
    }

    const pet: Pet = {
      ...data,
    } as Pet;

    try {
      const entry = await PetRepository.create(pet);
      return convertObjectIds(entry);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async updatePet(id: string, data: Partial<Pet>): Promise<Pet | null> {
    const user = await UserService.getSessionUser();
    if (!user) {
      throw new CustomError("Please, sign in", { code: 401 });
    }
    if (!user.isAdmin) {
      throw new CustomError("You are not authorized to perform this action", { code: 403 });
    }

    const pet = await PetRepository.getById(id);
    if (!pet) {
      throw new CustomError("Pet not found", { code: 404 });
    }

    const updatedPet = await PetRepository.updateOne(id, data);
    if (!updatedPet) {
      throw new CustomError("Failed to update pet", { code: 500 });
    }
    return convertObjectIds(updatedPet);
  }

  static async removePet(id: string): Promise<void> {
    const user = await UserService.getSessionUser();
    if (!user) {
      throw new CustomError("Please, sign in", { code: 401 });
    }
    if (!user.isAdmin) {
      throw new CustomError("You are not authorized to perform this action", { code: 403 });
    }

    const pet = await PetRepository.getById(id);
    if (!pet) {
      throw new CustomError("Pet not found", { code: 404 });
    }

    await PetRepository.delete(id);
  }
}

export default PetService;
