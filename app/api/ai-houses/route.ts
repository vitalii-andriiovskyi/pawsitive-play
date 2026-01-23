/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import AIHouseService from "@/back-end/features/ai-house/ai-house.service";
import { AIHouseCreate } from "@/shared/features/ai-house/domain/ai-house.model";
import AIHouseCreateSchema from "@/shared/features/ai-house/validation-schemas/ai-house.create.schema";
import { AI_HOUSE_CREATE_INVALID_DATA_ERR } from "@/shared/features/error/domain/error.constants";
import sendErrorResponse from "@/back-end/utils/sendErrorResponse";
import { FAILED_TO_CREATE_HOUSE, FAILED_TO_FETCH_HOUSES } from "@/shared/features/ai-house/domain/ai-house.constants";

export async function GET() {
  try {
    const houses = await AIHouseService.getAllHouses();
    return NextResponse.json(houses);
  } catch (error: any) {
    return sendErrorResponse(error, FAILED_TO_FETCH_HOUSES);
  }
}

export async function POST(request: NextRequest) {
  const data: AIHouseCreate = await request.json();

  try {
    await AIHouseCreateSchema.validate(data)
  } catch (error: any) {
    let errMsg = "Invalid params"
    if (error instanceof Error) {
      errMsg = error.message
    }
    return NextResponse.json({ message: errMsg, code: AI_HOUSE_CREATE_INVALID_DATA_ERR }, { status: 400 })
  }

  try {
    const house = await AIHouseService.createHouse(data);
    return NextResponse.json(house, { status: 201 });
  } catch (error: any) {
    return sendErrorResponse(error, FAILED_TO_CREATE_HOUSE);
  }
}
