/* eslint-disable @typescript-eslint/no-explicit-any */

import { CustomErrorOptions } from "@/shared/features/error/domain/error.model";

class CustomError extends Error {
  cause?: any;
  code?: string | number;
  info?: any;

  constructor(message: string, { cause, code, info }: CustomErrorOptions = {}) {
    super(message);
    this.name = 'CustomError';
    this.cause = cause;
    if (code) this.code = code;
    if (info) this.info = info;
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

export default CustomError;


