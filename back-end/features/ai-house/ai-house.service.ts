import { AIHouse } from "@/shared/features/ai-house/domain/ai-house.model";
import AIHouseRepository from "@/back-end/features/ai-house/ai-house.repository";
import UserService from "@/back-end/features/user/user.service";
import CustomError from "@/shared/features/error/domain/custom-error";
import convertObjectIds from "@/back-end/utils/convertObjectIds";

class AIHouseService {
  static async createHouse(data: Partial<AIHouse>) {
    const user = await UserService.getSessionUser();
    if (!user) {
      throw new CustomError("Please, sign in", { code: 401 });
    }
    const house: AIHouse = {
      ...data,
      ownerId: user._id,
    } as AIHouse;
    try {
      const entry = await AIHouseRepository.create(house);
      return entry;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async updateHouse(id: string, data: Partial<AIHouse>) {
    const user = await UserService.getSessionUser();
    if (!user) {
      throw new CustomError("Please, sign in", { code: 401 });
    }
    const house = await AIHouseRepository.getById(id);
    if (!house) {
      throw new CustomError("House not found", { code: 404 });
    }
    if (house.ownerId?.toString() !== user._id) {
      throw new CustomError("You are not authorized to perform this action", { code: 403 });
    }
    const updatedHouse = await AIHouseRepository.updateOne(id, data);
    return updatedHouse;
  }

  static async markHouseSold(id: string) {
    const user = await UserService.getSessionUser();
    if (!user) {
      throw new CustomError("Please, sign in", { code: 401 });
    }
    const house = await AIHouseRepository.getById(id);
    if (!house) {
      throw new CustomError("House not found", { code: 404 });
    }
    if (house.ownerId?.toString() !== user._id) {
      throw new CustomError("You are not authorized to perform this action", { code: 403 });
    }
    const updatedHouse = await AIHouseRepository.updateOne(id, { available: false });
    return updatedHouse;
  }

  static async likeHouse(id: string) {
    const user = await UserService.getSessionUser();
    if (!user) {
      throw new CustomError("Please, sign in", { code: 401 });
    }
    const house = await AIHouseRepository.getById(id);
    if (!house) {
      throw new CustomError("House not found", { code: 404 });
    }

    if (house.ownerId?.toString() === user._id) {
      throw new CustomError("You cannot like your own house", { code: 403 });
    }

    // likes: array of user ids (add if not present) --- Ideally this should be a separate collection to avoid large arrays!!!
    let likes: string[] = Array.isArray(house.likes) ? house.likes : [];
    if (likes.includes(user._id)) {
      throw new CustomError("You already liked this house", { code: 409 });
    }
    likes = [...likes, user._id];
    const updatedHouse = await AIHouseRepository.updateOne(id, { likes });
    return updatedHouse;
  }

  static async unlikeHouse(id: string) {
    const user = await UserService.getSessionUser();
    if (!user) {
      throw new CustomError("Please, sign in", { code: 401 });
    }
    const house = await AIHouseRepository.getById(id);
    if (!house) {
      throw new CustomError("House not found", { code: 404 });
    }
    // likes: array of user ids (add if not present) --- Ideally this should be a separate collection to avoid large arrays!!!
    let likes: string[] = Array.isArray(house.likes) ? house.likes : [];
    likes = likes.filter((id) => id !== user._id);
    const updatedHouse = await AIHouseRepository.updateOne(id, { likes });
    return updatedHouse;
  }

  static async removeHouse(id: string) {
    const user = await UserService.getSessionUser();
    if (!user) {
      throw new CustomError("Please, sign in", { code: 401 });
    }
    const house = await AIHouseRepository.getById(id);
    if (!house) {
      throw new CustomError("House not found", { code: 404 });
    }
    if (house.ownerId?.toString() !== user._id) {
      throw new CustomError("You are not authorized to perform this action", { code: 403 });
    }
    await AIHouseRepository.delete(id);
    return;
  }

  static async getAllHouses(): Promise<AIHouse[]> {
    const houses = await AIHouseRepository.getAll();
    return convertObjectIds(houses);
  }

  static async getById(id: string): Promise<AIHouse | null> {
    const house = await AIHouseRepository.getById(id);
    if (!house) {
      return null;
    }
    return convertObjectIds(house);
  }
}

export default AIHouseService;
