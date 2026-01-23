/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import AIHouseService from "@/back-end/features/ai-house/ai-house.service";
import AIHouseUpdateSchema from "@/shared/features/ai-house/validation-schemas/ai-house.update.schema";
import { AI_HOUSE_UPDATE_INVALID_DATA_ERR } from "@/shared/features/error/domain/error.constants";
import { FAILED_TO_DELETE_HOUSE, FAILED_TO_FETCH_HOUSE, FAILED_TO_UPDATE_HOUSE, HOUSE_DELETED_SUCCESSFULLY, HOUSE_NOT_FOUND } from "@/shared/features/ai-house/domain/ai-house.constants";
import sendErrorResponse from "@/back-end/utils/sendErrorResponse";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const house = await AIHouseService.getById(id);
    if (!house) {
      return NextResponse.json({ message: HOUSE_NOT_FOUND }, { status: 404 });
    }
    return NextResponse.json(house);
  } catch (error: any) {
    return sendErrorResponse(error, FAILED_TO_FETCH_HOUSE);
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await request.json();

  try {
    await AIHouseUpdateSchema.validate(data)
  } catch (error: any) {
    let errMsg = "Invalid params"
    if (error instanceof Error) {
      errMsg = error.message
    }
    return NextResponse.json({ message: errMsg, code: AI_HOUSE_UPDATE_INVALID_DATA_ERR }, { status: 400 })
  }

  try {
    const house = await AIHouseService.updateHouse(id, data);
    return NextResponse.json(house);
  } catch (error: any) {
    return sendErrorResponse(error, FAILED_TO_UPDATE_HOUSE);
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    await AIHouseService.removeHouse(id);
    return NextResponse.json({ message: HOUSE_DELETED_SUCCESSFULLY });
  } catch (error: any) {
    return sendErrorResponse(error, FAILED_TO_DELETE_HOUSE);
  }
}
