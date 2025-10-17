/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";

import CustomError from "@/shared/features/error/domain/custom-error";
import AIHouseService from "@/back-end/features/ai-houses/ai-house.service";

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const house = await AIHouseService.unlikeHouse(id);
    return NextResponse.json(house);
  } catch (error: any) {
    if (error instanceof CustomError) {
      return NextResponse.json({ message: error.message }, { status: error.code as number || 500 });
    }
    return NextResponse.json({ message: error.message || "Failed to unlike house" }, { status: 500 });
  }
}
