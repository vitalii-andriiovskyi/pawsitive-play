import { AIHouse } from "@/shared/features/ai-house/domain/ai-house.model";
import AIHouseRepository from "@/back-end/features/ai-house/ai-house.repository";
import UserService from "@/back-end/features/user/user.service";
import CustomError from "@/shared/features/error/domain/custom-error";
import convertObjectIds from "@/back-end/utils/convertObjectIds";
import { NOT_AUTHORIZED_TO_PERFORM_ACTION, PLEASE_SIGN_IN } from "@/shared/features/user/domain/user.constants";
import { ALREADY_LIKED_HOUSE, CANNOT_LIKE_OWN_HOUSE, HOUSE_NOT_FOUND } from "@/shared/features/ai-house/domain/ai-house.constants";

class AIHouseService {
  static async createHouse(data: Partial<AIHouse>) {
    const user = await UserService.getSessionUser();
    if (!user) {
      throw new CustomError(PLEASE_SIGN_IN, { code: 401 });
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

  // it would be great to avoid repeating the same checks in updateHouse, removeHouse, likeHouse, unlikeHouse methods
  // cannot find the way I like
  // @authUser with error if not
  static async updateHouse(id: string, data: Partial<AIHouse>) {
    const user = await UserService.getSessionUser();
    if (!user) {
      throw new CustomError(PLEASE_SIGN_IN, { code: 401 });
    }
    const house = await AIHouseRepository.getById(id);
    if (!house) {
      throw new CustomError(HOUSE_NOT_FOUND, { code: 404 });
    }
    if (house.ownerId?.toString() !== user._id) {
      throw new CustomError(NOT_AUTHORIZED_TO_PERFORM_ACTION, { code: 403 });
    }
    const updatedHouse = await AIHouseRepository.updateOne(id, data);
    return updatedHouse;
  }

  static async markHouseSold(id: string) {
    const user = await UserService.getSessionUser();
    if (!user) {
      throw new CustomError(PLEASE_SIGN_IN, { code: 401 });
    }
    const house = await AIHouseRepository.getById(id);
    if (!house) {
      throw new CustomError(HOUSE_NOT_FOUND, { code: 404 });
    }
    if (house.ownerId?.toString() !== user._id) {
      throw new CustomError(NOT_AUTHORIZED_TO_PERFORM_ACTION, { code: 403 });
    }
    const updatedHouse = await AIHouseRepository.updateOne(id, { available: false });
    return updatedHouse;
  }

  static async likeHouse(id: string) {
    const user = await UserService.getSessionUser();
    if (!user) {
      throw new CustomError(PLEASE_SIGN_IN, { code: 401 });
    }
    const house = await AIHouseRepository.getById(id);
    if (!house) {
      throw new CustomError(HOUSE_NOT_FOUND, { code: 404 });
    }

    if (house.ownerId?.toString() === user._id) {
      throw new CustomError(CANNOT_LIKE_OWN_HOUSE, { code: 403 });
    }

    // likes: array of user ids (add if not present) --- Ideally this should be a separate collection to avoid large arrays!!!
    let likes: string[] = Array.isArray(house.likes) ? house.likes : [];
    if (likes.includes(user._id)) {
      throw new CustomError(ALREADY_LIKED_HOUSE, { code: 409 });
    }
    likes = [...likes, user._id];
    const updatedHouse = await AIHouseRepository.updateOne(id, { likes });
    return updatedHouse;
  }

  static async unlikeHouse(id: string) {
    const user = await UserService.getSessionUser();
    if (!user) {
      throw new CustomError(PLEASE_SIGN_IN, { code: 401 });
    }
    const house = await AIHouseRepository.getById(id);
    if (!house) {
      throw new CustomError(HOUSE_NOT_FOUND, { code: 404 });
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
      throw new CustomError(PLEASE_SIGN_IN, { code: 401 });
    }
    const house = await AIHouseRepository.getById(id);
    if (!house) {
      throw new CustomError(HOUSE_NOT_FOUND, { code: 404 });
    }
    if (house.ownerId?.toString() !== user._id) {
      throw new CustomError(NOT_AUTHORIZED_TO_PERFORM_ACTION, { code: 403 });
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
