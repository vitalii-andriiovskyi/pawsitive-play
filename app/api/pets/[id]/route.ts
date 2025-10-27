/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import PetService from "@/back-end/features/pet/pet.service";
import CustomError from "@/shared/features/error/domain/custom-error";
import PetUpdateSchema from "@/shared/features/pet/validation-schemas/pet.update.schema";
import { PET_UPDATE_INVALID_DATA_ERR } from "@/shared/features/error/domain/error.constants";

// /api/pets/[id] or /api/pets/:id

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const pet = await PetService.getById(id);
    if (!pet) {
      return NextResponse.json({ message: "Pet not found" }, { status: 404 });
    }
    return NextResponse.json(pet);
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Failed to fetch pet" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await request.json();

  try {
    await PetUpdateSchema.validate(data);
  } catch (error: any) {
    let errMsg = "Invalid params";
    if (error instanceof Error) {
      errMsg = error.message;
    }
    return NextResponse.json({ message: errMsg, code: PET_UPDATE_INVALID_DATA_ERR }, { status: 400 });
  }

  try {
    const pet = await PetService.updatePet(id, data);
    return NextResponse.json(pet);
  } catch (error: any) {
    if (error instanceof CustomError) {
      return NextResponse.json({ message: error.message }, { status: error.code as number || 500 });
    }
    return NextResponse.json({ message: error.message || "Failed to update pet" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    await PetService.removePet(id);
    return NextResponse.json({ message: "Pet deleted successfully" });
  } catch (error: any) {
    if (error instanceof CustomError) {
      return NextResponse.json({ message: error.message }, { status: error.code as number || 500 });
    }
    return NextResponse.json({ message: error.message || "Failed to delete pet" }, { status: 500 });
  }
}
