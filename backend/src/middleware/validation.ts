import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

export const validateRegisterInput = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { email, password, name } = req.body;

  if (!email || !password) {
    throw new ApiError(400, 'Email and password are required');
  }

  if (!validateEmail(email)) {
    throw new ApiError(400, 'Please provide a valid email address');
  }

  if (!validatePassword(password)) {
    throw new ApiError(
      400,
      'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number'
    );
  }

  if (name && name.trim().length < 2) {
    throw new ApiError(400, 'Name must be at least 2 characters long');
  }

  next();
};

export const validateLoginInput = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, 'Email and password are required');
  }

  if (!validateEmail(email)) {
    throw new ApiError(400, 'Please provide a valid email address');
  }

  next();
};
