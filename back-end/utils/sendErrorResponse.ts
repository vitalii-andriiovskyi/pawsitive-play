/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import CustomError from "@/shared/features/error/domain/custom-error";

const sendErrorResponse = (error: any, defaultMessage = 'Opps, something went wrong.') => {
  if (error instanceof CustomError) {
    return NextResponse.json({ message: error.message }, { status: error.code as number || 500 });
  }
  return NextResponse.json({ message: error.message || defaultMessage }, { status: 500 });
}

export default sendErrorResponse;