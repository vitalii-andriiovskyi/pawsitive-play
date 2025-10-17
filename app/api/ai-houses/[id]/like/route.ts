/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import AIHouseService from "@/back-end/features/ai-houses/ai-house.service";
import CustomError from "@/shared/features/error/domain/custom-error";

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const house = await AIHouseService.likeHouse(id);
    return NextResponse.json(house);
  } catch (error: any) {
    if (error instanceof CustomError) {
      return NextResponse.json({ message: error.message }, { status: error.code as number || 500 });
    }
    return NextResponse.json({ message: error.message || "Failed to like house" }, { status: 500 });
  }
}
