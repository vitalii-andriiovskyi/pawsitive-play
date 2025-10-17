/* eslint-disable @typescript-eslint/no-explicit-any */
export interface CustomError extends Error {
  code?: string;
  info?: any;
}

export interface CustomErrorOptions {
  cause?: any;
  code?: string | number;
  info?: any;
}