/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import AIHouseService from "@/back-end/features/ai-house/ai-house.service";
import sendErrorResponse from "@/back-end/utils/sendErrorResponse";
import { FAILED_TO_LIKE_HOUSE } from "@/shared/features/ai-house/domain/ai-house.constants";

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const house = await AIHouseService.likeHouse(id);
    return NextResponse.json(house);
  } catch (error: any) {
    return sendErrorResponse(error, FAILED_TO_LIKE_HOUSE);
  }
}
