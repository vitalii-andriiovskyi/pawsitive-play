/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import AIHouseService from "@/back-end/features/ai-houses/ai-house.service";
import AIHouseRepository from "@/back-end/features/ai-houses/ai-house.repository";
import CustomError from "@/shared/features/error/domain/custom-error";
import AIHouseUpdateSchema from "@/shared/features/ai-house/validation-schemas/ai-house.update.schema";
import { AI_HOUSE_UPDATE_INVALID_DATA_ERR } from "@/shared/features/error/domain/error.constants";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const house = await AIHouseRepository.getById(id);
    if (!house) {
      return NextResponse.json({ message: "House not found" }, { status: 404 });
    }
    return NextResponse.json(house);
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Failed to fetch house" }, { status: 500 });
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
    if (error instanceof CustomError) {
      return NextResponse.json({ message: error.message }, { status: error.code as number || 500 });
    }
    return NextResponse.json({ message: error.message || "Failed to update house" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    await AIHouseService.removeHouse(id);
    return NextResponse.json({ message: "House deleted successfully" });
  } catch (error: any) {
    if (error instanceof CustomError) {
      return NextResponse.json({ message: error.message }, { status: error.code as number || 500 });
    }
    return NextResponse.json({ message: error.message || "Failed to delete house" }, { status: 500 });
  }
}
