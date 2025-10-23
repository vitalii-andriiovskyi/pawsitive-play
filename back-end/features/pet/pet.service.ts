import { Pet } from "@/shared/features/pet/domain/pet.model";
import PetRepository from "@/back-end/features/pet/pet.repository";
import convertObjectIds from "@/back-end/utils/convertObjectIds";

class PetService {
  static async getAll(): Promise<Pet[]> {
    const pets = await PetRepository.getAll();
    return convertObjectIds(pets);
  }
}

export default PetService;
