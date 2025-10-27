/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import PetService from "@/back-end/features/pet/pet.service";
import CustomError from "@/shared/features/error/domain/custom-error";
import { Pet } from "@/shared/features/pet/domain/pet.model";
import PetCreateSchema from "@/shared/features/pet/validation-schemas/pet.create.schema";
import { PET_CREATE_INVALID_DATA_ERR } from "@/shared/features/error/domain/error.constants";

export async function GET() {
  try {
    const pets = await PetService.getAll();
    return NextResponse.json(pets);
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Failed to fetch pets" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const data: Partial<Pet> = await request.json();

  try {
    await PetCreateSchema.validate(data);
  } catch (error: any) {
    let errMsg = "Invalid params";
    if (error instanceof Error) {
      errMsg = error.message;
    }
    return NextResponse.json({ message: errMsg, code: PET_CREATE_INVALID_DATA_ERR }, { status: 400 });
  }

  try {
    const pet = await PetService.createPet(data);
    return NextResponse.json(pet, { status: 201 });
  } catch (error: any) {
    if (error instanceof CustomError) {
      return NextResponse.json({ message: error.message }, { status: error.code as number || 500 });
    }
    return NextResponse.json({ message: error.message || "Failed to create pet" }, { status: 500 });
  }
}
