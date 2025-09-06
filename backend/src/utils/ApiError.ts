import { ErrorCode } from '../models/enums';

export class ApiError extends Error {
  statusCode: number;
  isOperational: boolean;
  code?: ErrorCode;

  constructor(
    statusCode: number, 
    message: string, 
    code?: ErrorCode,
    isOperational = true
  ) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = isOperational;
    this.name = 'ApiError';

    Error.captureStackTrace(this, this.constructor);
  }
}
